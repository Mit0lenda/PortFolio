# Workflow n8n — Blog CMS (mitolenda.dev)

Documentação de como montar, no n8n, o workflow que publica posts no blog do
mitolenda.dev através da API interna (`POST /api/blog/posts` e
`PATCH /api/blog/posts/[id]`).

Há dois workflows separados:

1. **Portfolio — Blog CMS**: formulário → upload de capa → criação do post.
2. **Portfolio — Blog Scheduler**: publica automaticamente posts agendados
   (`status = 'scheduled'`) quando a data chega.

---

## 1. Credentials no n8n

Antes de montar os workflows, cadastre duas Credentials em **n8n → Credentials**:

| Nome sugerido | Tipo | Valor |
|---|---|---|
| `Blog Webhook Secret` | Header Auth | Header `Authorization`, valor `Bearer <BLOG_WEBHOOK_SECRET>` |
| `Supabase Service Role` | Header Auth (ou Supabase, se o node nativo estiver disponível) | Header `Authorization: Bearer <SUPABASE_SERVICE_ROLE_KEY>` + header `apikey: <SUPABASE_SERVICE_ROLE_KEY>` |

Nunca cole esses valores diretamente em um node — sempre via Credentials, para
não aparecerem em logs de execução nem em exports do workflow.

---

## 2. Workflow "Portfolio — Blog CMS"

### 2.1 Form Trigger

Node: **Form Trigger** (`n8n-nodes-base.formTrigger`)

Campos do formulário:

| Campo | Tipo | Obrigatório |
|---|---|---|
| Título | Texto curto | Sim |
| Resumo | Texto curto (até 300 caracteres) | Sim |
| Conteúdo (Markdown) | Texto longo | Sim |
| Categoria | Texto curto | Sim |
| Tags | Texto curto (separado por vírgula) | Não |
| Imagem de capa | Upload de arquivo | Não |
| Texto alternativo da capa | Texto curto | Não (obrigatório se enviar capa) |
| Status | Dropdown: `draft` / `scheduled` / `published` | Sim |
| Data de agendamento | Data/hora | Só se status = scheduled |
| Destacar na home | Checkbox | Não |
| Conteúdo para LinkedIn | Texto longo | Não |
| Publicar no LinkedIn | Checkbox | Não (reservado para fase futura) |

### 2.2 Upload da capa no Supabase Storage (se houver imagem)

Node: **HTTP Request** — "Upload Cover Image"

- **Method**: `POST`
- **URL**: `{{ $env.SUPABASE_URL }}/storage/v1/object/blog-images/{{ $json.slugBase }}-{{ $now.toMillis() }}.{{ $json.fileExtension }}`
- **Authentication**: Credential `Supabase Service Role` (headers `Authorization` e `apikey`)
- **Headers adicionais**: `Content-Type` = mime type real do arquivo (ex. `image/webp`)
- **Body**: binário do arquivo enviado no formulário
- **Importante**: nunca envie `x-upsert: true` — isso preserva a regra de "sem
  sobrescrita acidental". Cada upload gera um nome novo (`slug-timestamp.ext`).

Resposta de sucesso (`200`):
```json
{ "Key": "blog-images/como-automatizei-1752345678.webp" }
```

A partir da resposta, monte a URL pública:
```
{{ $env.SUPABASE_URL }}/storage/v1/object/public/blog-images/{{ $json.Key.split('/')[1] }}
```

### 2.3 Montar payload (node Set ou Code)

Node: **Edit Fields (Set)** — "Montar Payload do Post"

Expressões (uma por campo, todas usando `{{ }}`):

| Campo do payload | Expressão n8n |
|---|---|
| `title` | `{{ $('Form Trigger').item.json['Título'] }}` |
| `excerpt` | `{{ $('Form Trigger').item.json['Resumo'] }}` |
| `content` | `{{ $('Form Trigger').item.json['Conteúdo (Markdown)'] }}` |
| `category` | `{{ $('Form Trigger').item.json['Categoria'] }}` |
| `tags` | `{{ $('Form Trigger').item.json['Tags'].split(',').map(t => t.trim()).filter(Boolean) }}` |
| `coverImageUrl` | `{{ $json.publicUrl }}` (da etapa 2.2, se houver) |
| `coverImageAlt` | `{{ $('Form Trigger').item.json['Texto alternativo da capa'] }}` |
| `status` | `{{ $('Form Trigger').item.json['Status'] }}` |
| `featured` | `{{ $('Form Trigger').item.json['Destacar na home'] }}` |
| `publishedAt` | `{{ $('Form Trigger').item.json['Status'] === 'published' ? $now.toISO() : undefined }}` |
| `scheduledAt` | `{{ $('Form Trigger').item.json['Status'] === 'scheduled' ? $('Form Trigger').item.json['Data de agendamento'] : undefined }}` |
| `publishOnLinkedIn` | `{{ $('Form Trigger').item.json['Publicar no LinkedIn'] }}` |
| `linkedinContent` | `{{ $('Form Trigger').item.json['Conteúdo para LinkedIn'] }}` |

**Não envie o campo `slug`** — a API gera automaticamente a partir do título
(sem acentos, kebab-case) e resolve colisões sozinha (sufixo `-2`, `-3`...).

### 2.4 Criar o post — HTTP Request

Node: **HTTP Request** — "Criar Post"

- **Method**: `POST`
- **URL**: `https://mitolenda.dev/api/blog/posts`
- **Authentication**: Credential `Blog Webhook Secret`
- **Headers**: `Content-Type: application/json`
- **Body** (JSON, a partir do node anterior):

```json
{
  "title": "Como automatizei meu portfólio com n8n",
  "excerpt": "Uma automação para publicar conteúdos no meu site.",
  "content": "## Introdução\n\nConteúdo completo em Markdown...",
  "category": "Automação",
  "tags": ["n8n", "automação", "desenvolvimento"],
  "coverImageUrl": "https://xxxx.supabase.co/storage/v1/object/public/blog-images/como-automatizei-1752345678.webp",
  "coverImageAlt": "Workflow de automação no n8n",
  "status": "published",
  "featured": false,
  "publishOnLinkedIn": false,
  "publishedAt": "2026-07-12T18:00:00-03:00"
}
```

Resposta de sucesso (`201`):
```json
{
  "success": true,
  "id": "a1b2c3d4-...",
  "slug": "como-automatizei-meu-portfolio-com-n8n",
  "url": "https://mitolenda.dev/blog/como-automatizei-meu-portfolio-com-n8n"
}
```

Respostas de erro possíveis (ver tabela completa no código,
`src/app/api/blog/posts/route.ts`):

| Status | `code` | Causa |
|---|---|---|
| 400 | `VALIDATION_ERROR` | Campo obrigatório ausente/inválido — `fields[]` traz o detalhe |
| 400 | `INVALID_JSON` | Corpo da requisição não é JSON válido |
| 401 | `UNAUTHORIZED` | Secret ausente ou incorreto |
| 409 | `SLUG_CONFLICT` | Colisão de slug que a resolução automática não conseguiu evitar (raro) |
| 413 | `PAYLOAD_TOO_LARGE` | Corpo maior que 256 KB |
| 429 | `RATE_LIMITED` | Muitas requisições na janela de 15 min |
| 500 | `INTERNAL_ERROR` | Falha inesperada no servidor/banco |

### 2.5 IF — sucesso?

Node: **IF** — condição `{{ $json.success }} === true`

- **Branch verdadeiro**: segue para 2.7 (resposta ao formulário).
- **Branch falso**: node de notificação (ex.: mensagem no Chatwoot/Telegram/e-mail
  para revisão manual, incluindo `{{ $json.code }}` e `{{ $json.message }}`).

### 2.6 (Reservado) Publicar no LinkedIn

Não implementado nesta fase — o site já grava `linkedin_content`,
`publish_on_linkedin` e tem a coluna `linkedin_post_id` pronta. Quando essa
integração for implementada, o padrão será: chamar a API do LinkedIn aqui e,
em caso de sucesso, disparar um **PATCH `/api/blog/posts/{id}`** com
`{ "linkedinPostId": "..." }` para registrar o ID do post publicado.

### 2.7 Resposta ao formulário

Node: **Respond to Form** (ou **Set** + resposta padrão do Form Trigger)

Mensagem de sucesso sugerida:
```
Post publicado! {{ $('Criar Post').item.json.url }}
```

Mensagem de erro sugerida:
```
Não foi possível publicar: {{ $('Criar Post').item.json.message }}
```

---

## 3. Workflow "Portfolio — Blog Scheduler"

Publica automaticamente posts com `status = 'scheduled'` cuja `scheduled_at`
já chegou. Toda a lógica de "quando publicar" fica no n8n — o Next.js só
expõe o `PATCH` e confia na RLS (`published_at <= now()`) como segunda camada
de proteção.

### 3.1 Schedule Trigger

Node: **Schedule Trigger** — intervalo sugerido: a cada 15 minutos.

### 3.2 Buscar posts agendados vencidos

Node: **HTTP Request** (ou **Postgres**/**Supabase** node, se disponível) —
"Buscar Posts Agendados"

Via Supabase REST diretamente (usando a credential `Supabase Service Role`):

- **Method**: `GET`
- **URL**: `{{ $env.SUPABASE_URL }}/rest/v1/posts?select=id,scheduled_at&status=eq.scheduled&scheduled_at=lte.{{ $now.toISO() }}`
- **Headers**: `Accept-Profile: portfolio` (schema `portfolio`, não `public`)

### 3.3 Loop — Split in Batches

Node: **Split in Batches** — processa um post por vez.

### 3.4 Publicar — HTTP Request

Node: **HTTP Request** — "Publicar Post"

- **Method**: `PATCH`
- **URL**: `https://mitolenda.dev/api/blog/posts/{{ $json.id }}`
- **Authentication**: Credential `Blog Webhook Secret`
- **Body**:
```json
{
  "status": "published",
  "publishedAt": "{{ $now.toISO() }}"
}
```

### 3.5 Log

Node: **Set** ou **NoOp** — registra quantos posts foram publicados na execução
(útil para auditoria via histórico de execuções do n8n).

---

## 4. Evitando posts duplicados

O endpoint `POST /api/blog/posts` **não tem idempotency key**. Se o mesmo
formulário for reenviado manualmente duas vezes com o mesmo título, o segundo
envio cria um post novo com slug sufixado (`-2`) em vez de falhar — isso é
intencional (evita bloquear o autor por engano), mas significa que:

- O formulário deve ser resetado/limpo após um envio bem-sucedido (comportamento
  padrão do Form Trigger do n8n).
- Se notar duplicidade, arquive o post extra via
  `PATCH /api/blog/posts/{id}` com `{ "status": "archived" }`.

---

## 5. Exemplo completo de chamada (curl)

```bash
curl -X POST https://mitolenda.dev/api/blog/posts \
  -H "Authorization: Bearer $BLOG_WEBHOOK_SECRET" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Como automatizei meu portfólio com n8n",
    "excerpt": "Uma automação para publicar conteúdos no meu site.",
    "content": "## Introdução\n\nConteúdo completo em Markdown...",
    "category": "Automação",
    "tags": ["n8n", "automação", "desenvolvimento"],
    "coverImageUrl": "https://xxxx.supabase.co/storage/v1/object/public/blog-images/capa.webp",
    "coverImageAlt": "Workflow de automação no n8n",
    "status": "published",
    "featured": false,
    "publishOnLinkedIn": false,
    "publishedAt": "2026-07-12T18:00:00-03:00"
  }'
```

Um arquivo de workflow importável (sem credenciais reais) está em
[`docs/n8n-blog-cms-workflow.json`](./n8n-blog-cms-workflow.json) — importe via
**n8n → Workflows → Import from File** e configure as Credentials descritas na
seção 1 antes de ativar.
