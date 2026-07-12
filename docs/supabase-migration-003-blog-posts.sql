-- ─────────────────────────────────────────────────────────────────────────────
-- mitolenda.dev — Blog (migration 003)
-- Run this in: Supabase Dashboard → SQL Editor (projeto dedicado do portfolio)
--
-- Cria a tabela portfolio.posts (CMS operacional via n8n, leitura pública via
-- Next.js), o bucket de Storage `blog-images` e as políticas de RLS de ambos.
-- Segue a mesma convenção de docs/supabase-setup.sql (schema `portfolio`,
-- RLS por policy, service_role com acesso total).
-- ─────────────────────────────────────────────────────────────────────────────

-- ─────────────────────────────────────────────────────────────────────────────
-- Tabela portfolio.posts
-- ─────────────────────────────────────────────────────────────────────────────
CREATE TABLE portfolio.posts (
  id                    uuid PRIMARY KEY DEFAULT gen_random_uuid(),

  title                 text NOT NULL CHECK (char_length(title) BETWEEN 3 AND 200),
  slug                  text NOT NULL UNIQUE CHECK (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  excerpt               text NOT NULL CHECK (char_length(excerpt) BETWEEN 10 AND 300),
  content               text NOT NULL CHECK (char_length(content) >= 20),

  cover_image_url       text,
  cover_image_alt       text,

  category              text NOT NULL,
  tags                  text[] NOT NULL DEFAULT '{}',

  status                text NOT NULL DEFAULT 'draft'
                          CHECK (status IN ('draft', 'scheduled', 'published', 'archived')),

  featured              boolean NOT NULL DEFAULT false,

  linkedin_content      text,
  publish_on_linkedin   boolean NOT NULL DEFAULT false,
  linkedin_post_id      text,

  published_at          timestamptz,
  scheduled_at          timestamptz,

  created_at            timestamptz NOT NULL DEFAULT now(),
  updated_at            timestamptz NOT NULL DEFAULT now(),

  -- Coerência de estado: published exige published_at; scheduled exige scheduled_at.
  -- Evita posts "publicados" sem data (quebraria ordenação/RLS) ou "agendados"
  -- sem data (o scheduler do n8n não teria o que consultar).
  CONSTRAINT posts_published_requires_date
    CHECK (status <> 'published' OR published_at IS NOT NULL),
  CONSTRAINT posts_scheduled_requires_date
    CHECK (status <> 'scheduled' OR scheduled_at IS NOT NULL)
);

-- ─────────────────────────────────────────────────────────────────────────────
-- Índices
-- ─────────────────────────────────────────────────────────────────────────────
CREATE UNIQUE INDEX idx_portfolio_posts_slug         ON portfolio.posts (slug);
CREATE INDEX        idx_portfolio_posts_status       ON portfolio.posts (status);
CREATE INDEX        idx_portfolio_posts_published_at ON portfolio.posts (published_at DESC);
CREATE INDEX        idx_portfolio_posts_category     ON portfolio.posts (category);

-- Índice composto para a query mais comum (listagem pública, mais recentes primeiro)
CREATE INDEX idx_portfolio_posts_status_published_at
  ON portfolio.posts (status, published_at DESC)
  WHERE status = 'published';

-- ─────────────────────────────────────────────────────────────────────────────
-- Trigger: atualiza updated_at automaticamente em qualquer UPDATE
-- ─────────────────────────────────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION portfolio.set_updated_at()
RETURNS trigger AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_posts_updated_at
  BEFORE UPDATE ON portfolio.posts
  FOR EACH ROW
  EXECUTE FUNCTION portfolio.set_updated_at();

-- ─────────────────────────────────────────────────────────────────────────────
-- Row-Level Security — portfolio.posts
-- ─────────────────────────────────────────────────────────────────────────────
ALTER TABLE portfolio.posts ENABLE ROW LEVEL SECURITY;

-- Leitura pública: SOMENTE posts publicados e cuja data já passou (defesa extra
-- caso um post fique com status='published' e published_at no futuro por engano).
CREATE POLICY "posts_select_published" ON portfolio.posts
  FOR SELECT TO anon, authenticated
  USING (status = 'published' AND published_at <= now());

-- Nenhuma policy de INSERT/UPDATE/DELETE para anon/authenticated: com RLS
-- habilitado, a ausência de policy nega a operação por padrão. Todas as
-- escritas acontecem exclusivamente via service_role, usado apenas pelas API
-- routes do Next.js (nunca exposto ao navegador).
CREATE POLICY "posts_service_full" ON portfolio.posts
  FOR ALL TO service_role
  USING (true) WITH CHECK (true);

COMMENT ON TABLE portfolio.posts IS
  'Blog posts do mitolenda.dev — CMS operacional via n8n (POST/PATCH autenticado), leitura pública via Next.js (RLS restrita a status=published)';

-- ─────────────────────────────────────────────────────────────────────────────
-- Storage bucket: blog-images
-- ─────────────────────────────────────────────────────────────────────────────
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'blog-images',
  'blog-images',
  true,                                              -- leitura pública (imagens de capa)
  5242880,                                           -- 5 MB
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/avif']
)
ON CONFLICT (id) DO NOTHING;

-- Leitura pública do bucket (necessário para as imagens de capa aparecerem no site)
CREATE POLICY "blog_images_public_read" ON storage.objects
  FOR SELECT TO anon, authenticated
  USING (bucket_id = 'blog-images');

-- Escrita (upload/update/delete) restrita a service_role — o n8n usa a
-- service_role key para fazer upload direto no Storage, sem passar pelo Next.js.
CREATE POLICY "blog_images_service_write" ON storage.objects
  FOR INSERT TO service_role
  WITH CHECK (bucket_id = 'blog-images');

CREATE POLICY "blog_images_service_update" ON storage.objects
  FOR UPDATE TO service_role
  USING (bucket_id = 'blog-images');

CREATE POLICY "blog_images_service_delete" ON storage.objects
  FOR DELETE TO service_role
  USING (bucket_id = 'blog-images');

-- ─────────────────────────────────────────────────────────────────────────────
-- Convenção de nomes de arquivo (aplicada pelo workflow n8n, não pelo banco):
--   blog-images/{slug-do-post}-{timestamp}.{ext}
-- O n8n NUNCA deve usar upsert:true no upload — isso evita sobrescrita
-- acidental de uma imagem de capa existente. Nomes únicos por timestamp
-- garantem que cada upload gera um objeto novo no bucket.
-- ─────────────────────────────────────────────────────────────────────────────
