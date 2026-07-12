import Markdown, { type Components } from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeSanitize from 'rehype-sanitize'
import rehypeSlug from 'rehype-slug'

// Componentes mapeados manualmente (sem `node`, que o react-markdown injeta
// mas não deve ir para o DOM) — cada elemento Markdown recebe uma classe
// `.article-*` própria, estilizada em globals.css reaproveitando os tokens
// do design system.
const components: Components = {
  h1: ({ node: _node, ...props }) => <h1 className="article-h1" {...props} />,
  h2: ({ node: _node, ...props }) => <h2 className="article-h2" {...props} />,
  h3: ({ node: _node, ...props }) => <h3 className="article-h3" {...props} />,
  h4: ({ node: _node, ...props }) => <h4 className="article-h4" {...props} />,
  p: ({ node: _node, ...props }) => <p className="article-p" {...props} />,
  ul: ({ node: _node, ...props }) => <ul className="article-list" {...props} />,
  ol: ({ node: _node, ...props }) => <ol className="article-list article-list-ordered" {...props} />,
  li: ({ node: _node, ...props }) => <li className="article-li" {...props} />,
  blockquote: ({ node: _node, ...props }) => <blockquote className="article-quote" {...props} />,
  a: ({ node: _node, ...props }) => (
    <a className="article-link" target="_blank" rel="noopener noreferrer" {...props} />
  ),
  code: ({ node: _node, className, ...props }) => (
    <code className={className ? `article-code ${className}` : 'article-inline-code'} {...props} />
  ),
  pre: ({ node: _node, ...props }) => <pre className="article-pre" {...props} />,
  // Markdown de conteúdo variável não tem largura/altura conhecidas de
  // antemão, então usa <img> nativo em vez de next/image aqui.
  img: ({ node: _node, src, alt }) => (
    <img className="article-img" src={typeof src === 'string' ? src : undefined} alt={alt ?? ''} loading="lazy" />
  ),
  hr: ({ node: _node, ...props }) => <hr className="article-hr" {...props} />,
}

// Server Component: react-markdown gera a árvore React diretamente a partir
// do AST sanitizado — nunca passa por dangerouslySetInnerHTML. rehypeSanitize
// roda ANTES de rehypeSlug para que os `id` gerados nos headings (por nós,
// confiáveis) não sejam removidos pela sanitização do conteúdo do n8n.
export const ArticleBody: React.FC<{ markdown: string }> = ({ markdown }) => (
  <div className="article">
    <Markdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeSanitize, rehypeSlug]}
      components={components}
    >
      {markdown}
    </Markdown>
  </div>
)
