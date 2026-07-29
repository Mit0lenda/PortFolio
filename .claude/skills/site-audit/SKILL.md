---
name: site-audit
description: Varre o repositório do portfólio (mitolenda.dev) e produz um catálogo consolidado do que falta fazer — deploy pendente, SEO, i18n, backend, testes, dependências, processo. Use quando o usuário pedir para auditar, catalogar ou revisar o estado geral do site/repositório.
---

# Site Audit — mitolenda.dev

Produz um catálogo consolidado de pendências do repositório, no mesmo
formato usado na issue "Auditoria do site: backlog consolidado". Rode isto
quando o usuário pedir uma varredura geral do site/repo, não para pedidos de
uma feature específica.

## Passos

1. **Memória persistente do projeto** — ler por completo:
   - `.specs/project/ROADMAP.md` (milestones e features, coluna Status)
   - `.specs/project/STATE.md` (seções Todos, Blockers, Deferred Ideas)

2. **Código e comentários pendentes**
   - `grep -rn "TODO\|FIXME" src/ docs/ .specs/`

3. **Dependências**
   - Ler `package.json` e comparar majors instalados vs. o que é razoável
     esperar estar atualizado (Next.js, React, Supabase JS, Tailwind, Zod).
   - Checar se existe `.github/dependabot.yml` ou `renovate.json`; se não,
     catalogar como pendência de processo.

4. **CI/CD e qualidade**
   - Conferir `.github/workflows/*.yml` (o que já roda: lint, typecheck,
     testes, build, Playwright smoke, Lighthouse).
   - Levantar cobertura de testes: `find src -name "*.test.ts*"` e comparar
     com as áreas do código que NÃO têm teste (ex.: seções de UI, libs sem
     `*.test.ts` correspondente).

5. **Conteúdo dinâmico vs. hardcoded**
   - Verificar se projetos (`src/content/copy.*.ts` → `projects.list`,
     `src/content/projectAssets.ts`) e certificados (`certificates.list`)
     continuam hardcoded ou já migraram para uma fonte dinâmica
     (Supabase/API). Se ainda hardcoded, catalogar como pendência de CMS.

6. **Processo de repositório**
   - Checar ausência de `.github/ISSUE_TEMPLATE/`, `CONTRIBUTING.md`,
     `PULL_REQUEST_TEMPLATE.md`.

7. **SEO/i18n**
   - Confirmar em `src/app/` se existem rotas de sitemap/robots/OG e se o
     roteamento de locale (`/en`, `/es`) existe, comparando com os arquivos
     de tradução em `src/content/`.

## Saída

Um catálogo em markdown agrupado por área (Deploy, SEO, i18n, Backend,
Deferred ideas, CMS/conteúdo, Processo/repositório, Testes), cada item como
checkbox `- [ ]` com referência ao arquivo-fonte entre parênteses. Não
proponha implementação nesta skill — o objetivo é só catalogar; abrir
issues ou implementar é um passo separado, a combinar com o usuário.
