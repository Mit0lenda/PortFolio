# Dev Mitolenda — mitolenda.dev

Site institucional/portfólio da Dev Mitolenda. Next.js 15 (App Router) + Supabase, deploy via Docker no Easypanel atrás de um Cloudflare Tunnel.

## Stack

- **Framework**: Next.js 15 (App Router, TypeScript, React 19)
- **Estilo**: CSS puro (`src/app/globals.css`), Tailwind disponível via PostCSS
- **Banco**: Supabase (Postgres) — schema `portfolio`, tabela `leads` (formulário de contato)
- **Automação**: webhook n8n disparado no envio do formulário (classificação/auto-resposta)
- **Chat**: widget Chatwoot embutido
- **Analytics**: Cloudflare Web Analytics (cookieless) + Facebook Pixel (opcional, via env var)
- **Testes**: Playwright (smoke e2e)
- **CI**: GitHub Actions — lint, typecheck, build, testes (`.github/workflows/ci.yml`) + Lighthouse CI contra produção (`.github/workflows/lighthouse.yml`)
- **Deploy**: Docker (build standalone, non-root, multi-stage) → Easypanel → Cloudflare Tunnel

## Rodando localmente

```bash
npm install
cp .env.example .env.local   # preencher com valores reais (ver seção abaixo)
npm run dev                  # http://localhost:3000
```

Outros comandos:

```bash
npm run build      # build de produção
npm run start      # roda o build de produção localmente
npm run lint       # ESLint
npm run test:e2e   # Playwright (sobe build+start automaticamente se preciso)
```

## Variáveis de ambiente

Ver `.env.example` para a lista completa e comentada. Resumo:

| Variável | Obrigatória? | Descrição |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Sim | Projeto Supabase dedicado do portfólio (schema `portfolio`) |
| `N8N_CONTACT_WEBHOOK_URL` | Não | Webhook do fluxo n8n de notificação de lead |
| `NEXT_PUBLIC_CF_ANALYTICS_TOKEN` | Não | Cloudflare Web Analytics |
| `NEXT_PUBLIC_FB_PIXEL_ID` | Não | Facebook Pixel (pageview + eventos de CTA) |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | Não | Verificação de propriedade no Search Console |

## Banco de dados (Supabase)

Schema oficial em `docs/supabase-setup.sql`. Se a tabela `portfolio.leads` ainda não tiver as colunas de atribuição (`page_url`, `utm_source`, `utm_medium`, `utm_campaign`, `lang`), rode `docs/supabase-migration-002-lead-attribution.sql` no SQL Editor do projeto **antes** de fazer deploy do código atual — a rota `/api/contact` já espera esse schema.

## Deploy

1. Build da imagem Docker (`Dockerfile`, multi-stage, non-root, `HEALTHCHECK` embutido).
2. Deploy no Easypanel apontando pra porta `3000`.
3. Tunnel Cloudflare (`cloudflared`) faz o ingress `https://mitolenda.dev` → `http://<service-name>:3000`.
4. Variáveis de ambiente configuradas direto no Easypanel (não versionadas).

### Smoke test pós-deploy

Depois de todo deploy, checar manualmente:

- [ ] Home carrega (`https://mitolenda.dev/`)
- [ ] `https://www.mitolenda.dev/` redireciona corretamente pro domínio raiz
- [ ] `http://` redireciona pra `https://`
- [ ] Formulário de contato envia e mostra mensagem de sucesso
- [ ] CTA de WhatsApp abre o link certo
- [ ] `/sitemap.xml` e `/robots.txt` respondem 200
- [ ] Nenhum erro novo no console do navegador

### Rollback

Deploy é feito via imagem Docker versionada no Easypanel — para reverter, redeploy do commit/tag anterior que já estava em produção antes da mudança problemática.

## Testes

`e2e/smoke.spec.ts` cobre: home sem erro de console, menu mobile (abrir/fechar/navegação por teclado), CTA de WhatsApp, formulário de contato (caso válido e inválido), página 404, e uma página de serviço. Roda em dois projetos (`desktop`/`mobile`) via `playwright.config.ts`.

```bash
npx playwright install --with-deps chromium   # primeira vez
npm run test:e2e
```
