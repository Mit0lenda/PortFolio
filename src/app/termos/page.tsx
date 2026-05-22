import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Termos de Serviço',
  description: 'Termos que regulam o uso do site mitolenda.dev e dos canais profissionais vinculados à marca DEV_MITOLENDA.',
}

export default function TermsPage() {
  return (
    <main className="legal-page">
      <div className="container">
        <div className="legal-back">
          <Link href="/">← Voltar ao site</Link>
        </div>
        <article className="legal-body">
          <header className="legal-header">
            <span className="eyebrow">// LEGAL</span>
            <h1>Termos de <span className="impact">Serviço</span></h1>
            <p className="legal-updated">Última atualização: 05/05/2026</p>
          </header>

          <p>
            Estes Termos de Serviço regulam o uso do site <code>mitolenda.dev</code> e dos canais profissionais
            vinculados à marca <strong>DEV_MITOLENDA</strong>.
          </p>
          <p>
            <strong>Nicollas Freitas</strong>, profissional autônomo com base em <strong>Porto Alegre/RS, Brasil</strong>,
            atua sob a marca <strong>DEV_MITOLENDA</strong> na oferta de serviços digitais, incluindo desenvolvimento
            de sites, sistemas, automações, integrações e soluções com inteligência artificial.
          </p>

          <h2>1. Finalidade do site</h2>
          <p>O site tem caráter institucional, informativo e comercial, com o objetivo de:</p>
          <ul>
            <li>apresentar portfólio, cases, serviços e formas de contato</li>
            <li>facilitar pedidos de orçamento e reuniões comerciais</li>
            <li>divulgar conteúdo relacionado aos serviços oferecidos</li>
          </ul>

          <h2>2. Aceite</h2>
          <p>
            Ao acessar o site ou utilizar seus canais de contato, você concorda com estes termos e com a{' '}
            <Link href="/politica-de-privacidade">Política de Privacidade</Link> aplicável.
          </p>
          <p>
            Se você não concordar com estas condições, deve interromper o uso do site e dos canais relacionados.
          </p>

          <h2>3. Uso permitido</h2>
          <p>Você concorda em utilizar o site e seus conteúdos de forma lícita e compatível com sua finalidade. Não é permitido:</p>
          <ul>
            <li>praticar atos que violem a legislação aplicável</li>
            <li>tentar acessar áreas, dados, contas ou sistemas sem autorização</li>
            <li>interferir na disponibilidade, segurança ou funcionamento do site</li>
            <li>utilizar o conteúdo para fraude, concorrência desleal, spam ou engenharia reversa indevida</li>
            <li>publicar ou transmitir conteúdo ofensivo, ilícito ou que viole direitos de terceiros por meio dos canais disponibilizados</li>
          </ul>

          <h2>4. Conteúdo e informações comerciais</h2>
          <p>
            As informações exibidas no site são apresentadas de boa-fé, mas podem ser atualizadas, ajustadas ou
            removidas a qualquer momento.
          </p>
          <p>Quando houver referência a preços, faixas de investimento, prazos, escopo, disponibilidade ou resultados esperados:</p>
          <ul>
            <li>tais informações terão caráter <strong>estimativo e informativo</strong></li>
            <li>a contratação dependerá de análise do projeto concreto</li>
            <li>proposta comercial, briefing aprovado e eventual contrato específico prevalecerão sobre qualquer informação geral do site</li>
          </ul>

          <h2>5. Contratação de serviços</h2>
          <p>
            A prestação de serviços da DEV_MITOLENDA não se forma apenas com a navegação no site ou com contato inicial.
          </p>
          <p>A contratação efetiva depende, conforme o caso, de:</p>
          <ul>
            <li>alinhamento de escopo</li>
            <li>aprovação de proposta</li>
            <li>aceite formal entre as partes</li>
            <li>eventual assinatura de contrato, ordem de serviço ou documento equivalente</li>
          </ul>
          <p>
            Prazos, entregas, revisões, responsabilidades, valores, forma de pagamento e propriedade de entregáveis
            podem ser detalhados em instrumento próprio.
          </p>

          <h2>6. Propriedade intelectual</h2>
          <p>
            Salvo indicação em contrário, textos, estrutura, marca, identidade visual, organização do portfólio e
            demais conteúdos do site pertencem à DEV_MITOLENDA ou são usados legitimamente.
          </p>
          <p>
            Você não pode copiar, redistribuir, republicar, adaptar ou explorar comercialmente tais materiais sem
            autorização prévia, exceto nos limites legais aplicáveis.
          </p>

          <h2>7. Conteúdos de terceiros</h2>
          <p>
            O site pode mencionar marcas, cases, tecnologias, links externos, embeds e ferramentas de terceiros.
            Esses elementos permanecem sujeitos aos direitos e termos de seus respectivos titulares.
          </p>
          <p>
            A existência de links externos não implica endosso integral de conteúdo, disponibilidade ou políticas de terceiros.
          </p>

          <h2>8. Disponibilidade do site</h2>
          <p>
            Busca-se manter o site disponível e funcional, mas não há garantia de operação contínua, ininterrupta
            ou livre de erros.
          </p>
          <p>
            O site poderá ser alterado, suspenso, limitado ou retirado do ar temporariamente para manutenção,
            atualização, segurança ou decisão operacional.
          </p>

          <h2>9. Limitação de responsabilidade</h2>
          <p>Na máxima medida permitida pela legislação aplicável, a DEV_MITOLENDA não será responsável por:</p>
          <ul>
            <li>indisponibilidade temporária do site</li>
            <li>falhas causadas por provedores, navegadores, redes, terceiros ou eventos fora de controle razoável</li>
            <li>decisões tomadas por usuários com base exclusivamente em conteúdo geral do site</li>
            <li>danos indiretos, lucros cessantes ou prejuízos decorrentes de uso inadequado dos materiais disponibilizados</li>
          </ul>
          <p>Nada nesta cláusula exclui responsabilidades que não possam ser afastadas por lei.</p>

          <h2>10. Privacidade e proteção de dados</h2>
          <p>
            O tratamento de dados pessoais relacionado ao uso do site e dos canais de contato segue a{' '}
            <Link href="/politica-de-privacidade">Política de Privacidade</Link>.
          </p>

          <h2>11. Medidas contra uso indevido</h2>
          <p>
            Poderão ser adotadas medidas razoáveis para restringir, bloquear ou registrar interações que indiquem
            abuso, tentativa de fraude, violação de segurança, automação maliciosa ou uso contrário a estes termos.
          </p>

          <h2>12. Alterações destes termos</h2>
          <p>
            Estes termos podem ser atualizados periodicamente. A versão aplicável será a mais recente publicada
            nesta página, com a respectiva data de atualização.
          </p>

          <h2>13. Idioma e interpretação</h2>
          <p>
            Caso existam versões em mais de um idioma, a versão em <strong>português do Brasil</strong> prevalecerá
            para fins de interpretação, salvo disposição expressa em contrário.
          </p>

          <h2>14. Legislação e foro</h2>
          <p>
            Estes termos são regidos pela legislação brasileira. Fica eleito o foro da comarca de{' '}
            <strong>Porto Alegre/RS</strong>, quando legalmente admissível, para dirimir controvérsias relacionadas
            a estes termos.
          </p>

          <h2>15. Contato</h2>
          <p>Para dúvidas, propostas ou solicitações relacionadas a estes termos:</p>
          <ul>
            <li>Email: <a href="mailto:devmitolenda@gmail.com">devmitolenda@gmail.com</a></li>
            <li>WhatsApp: <a href="https://wa.me/555131999319" target="_blank" rel="noreferrer">+55 51 3199-9319</a></li>
            <li>Instagram: <a href="https://instagram.com/dev_mitolenda" target="_blank" rel="noreferrer">@dev_mitolenda</a></li>
          </ul>
        </article>
      </div>
    </main>
  )
}
