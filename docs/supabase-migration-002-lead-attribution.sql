-- ─────────────────────────────────────────────────────────────────────────────
-- mitolenda.dev — Migração 002: atribuição completa de leads
-- Run this in: Supabase Dashboard → SQL Editor (projeto de produção real)
--
-- Contexto: o código do site (Next.js) estava gravando leads numa tabela
-- "portfolio_leads" solta (schema public), enquanto este arquivo (espelhando
-- docs/supabase-setup.sql) documenta "portfolio.leads" como o schema oficial.
-- Esta migração é IDEMPOTENTE — pode ser rodada mesmo que portfolio.leads já
-- exista ou não. Depois de aplicar, o código passa a gravar em portfolio.leads.
--
-- IMPORTANTE: aplique esta migração ANTES (ou junto) do deploy do código
-- atualizado — senão o insert do formulário de contato vai falhar em produção.
-- ─────────────────────────────────────────────────────────────────────────────

-- Portfolio schema (isolado)
CREATE SCHEMA IF NOT EXISTS portfolio;

-- Tabela de leads — cria do zero se ainda não existir
CREATE TABLE IF NOT EXISTS portfolio.leads (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at  timestamptz NOT NULL DEFAULT now(),
  name        text NOT NULL,
  email       text NOT NULL,
  message     text NOT NULL,
  source      text NOT NULL DEFAULT 'contact-form',
  status      text NOT NULL DEFAULT 'new'
                CHECK (status IN ('new', 'viewed', 'replied', 'archived')),
  ip_hash     text,
  user_agent  text
);

-- Colunas novas de atribuição — adiciona só se ainda não existirem
ALTER TABLE portfolio.leads ADD COLUMN IF NOT EXISTS page_url     text;
ALTER TABLE portfolio.leads ADD COLUMN IF NOT EXISTS utm_source   text;
ALTER TABLE portfolio.leads ADD COLUMN IF NOT EXISTS utm_medium   text;
ALTER TABLE portfolio.leads ADD COLUMN IF NOT EXISTS utm_campaign text;
ALTER TABLE portfolio.leads ADD COLUMN IF NOT EXISTS lang         text DEFAULT 'pt';

-- Índices para consultas de dashboard
CREATE INDEX IF NOT EXISTS idx_portfolio_leads_created_at ON portfolio.leads (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_portfolio_leads_status     ON portfolio.leads (status);

-- ─────────────────────────────────────────────────────────────────────────────
-- Row-Level Security (idempotente — seguro rodar de novo)
-- ─────────────────────────────────────────────────────────────────────────────
ALTER TABLE portfolio.leads ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "leads_insert" ON portfolio.leads;
CREATE POLICY "leads_insert" ON portfolio.leads
  FOR INSERT TO anon, authenticated
  WITH CHECK (true);

DROP POLICY IF EXISTS "leads_service_full" ON portfolio.leads;
CREATE POLICY "leads_service_full" ON portfolio.leads
  FOR ALL TO service_role
  USING (true) WITH CHECK (true);

COMMENT ON TABLE portfolio.leads IS
  'Contact form submissions from mitolenda.dev';

-- ─────────────────────────────────────────────────────────────────────────────
-- OPCIONAL — migrar leads antigos da tabela solta "portfolio_leads" (se existir)
-- Descomente e rode manualmente só se essa tabela realmente existir no seu
-- projeto e tiver dados que valem a pena preservar.
-- ─────────────────────────────────────────────────────────────────────────────
-- INSERT INTO portfolio.leads (name, email, message, source, ip_hash)
-- SELECT name, email, message, source, ip_hash
-- FROM public.portfolio_leads
-- ON CONFLICT DO NOTHING;
--
-- DROP TABLE IF EXISTS public.portfolio_leads;
