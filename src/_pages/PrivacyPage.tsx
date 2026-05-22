import React from "react";
import { Link } from "react-router-dom";

export const PrivacyPage: React.FC = () => (
  <main className="legal-page">
    <div className="container">
      <div className="legal-back">
        <Link to="/">← Voltar ao site</Link>
      </div>
      <article className="legal-body">
        <header className="legal-header">
          <span className="eyebrow">// PRIVACIDADE</span>
          <h1>Política de <span className="impact">Privacidade</span></h1>
          <p className="legal-updated">Última atualização: 05/05/2026</p>
        </header>

        <p>
          Esta Política de Privacidade descreve como <code>mitolenda.dev</code> e os canais vinculados à marca{" "}
          <strong>DEV_MITOLENDA</strong> tratam dados pessoais de visitantes, leads, clientes e parceiros.
        </p>
        <p>
          O responsável pelo tratamento dos dados é <strong>Nicollas Freitas</strong>, profissional autônomo que atua
          sob a marca <strong>DEV_MITOLENDA</strong>, com base em <strong>Porto Alegre/RS, Brasil</strong>.
        </p>

        <h2>1. Escopo</h2>
        <p>Esta política se aplica a:</p>
        <ul>
          <li>navegação no site <code>mitolenda.dev</code></li>
          <li>formulários de contato, orçamento e briefing</li>
          <li>interações por email, WhatsApp, Instagram e outros canais profissionais vinculados à marca</li>
          <li>propostas, reuniões e atendimentos comerciais relacionados aos serviços oferecidos</li>
        </ul>

        <h2>2. Dados que podem ser coletados</h2>
        <p>Os dados tratados podem incluir:</p>
        <ul>
          <li>nome, empresa, cargo e meios de contato</li>
          <li>email, telefone e WhatsApp</li>
          <li>informações enviadas em mensagens, formulários, briefings e pedidos de orçamento</li>
          <li>dados técnicos de navegação, como endereço IP, tipo de dispositivo, navegador, páginas acessadas, data e hora de acesso</li>
          <li>preferências de uso, como idioma selecionado no site, inclusive por meio de <code>localStorage</code> e recursos técnicos equivalentes</li>
        </ul>

        <h2>3. Como os dados são coletados</h2>
        <p>Os dados podem ser coletados:</p>
        <ul>
          <li>diretamente, quando você preenche formulários ou entra em contato</li>
          <li>durante reuniões, trocas de mensagens e negociações comerciais</li>
          <li>automaticamente, durante a navegação no site, por logs técnicos, cookies estritamente necessários e armazenamento local do navegador</li>
        </ul>

        <h2>4. Finalidades do tratamento</h2>
        <p>Os dados podem ser utilizados para:</p>
        <ul>
          <li>responder contatos, dúvidas e pedidos de orçamento</li>
          <li>analisar escopo, elaborar propostas e conduzir etapa pré-contratual</li>
          <li>executar projetos, prestar suporte e manter comunicação com clientes</li>
          <li>organizar agenda, histórico de atendimento e documentação de projeto</li>
          <li>melhorar a experiência do site, incluindo preferência de idioma e estabilidade técnica</li>
          <li>cumprir obrigações legais, regulatórias, fiscais e contábeis</li>
          <li>proteger direitos, prevenir abuso, fraude ou uso indevido dos canais e serviços</li>
        </ul>

        <h2>5. Bases legais</h2>
        <p>Quando aplicável, o tratamento é realizado com fundamento nas bases legais previstas na LGPD, especialmente:</p>
        <ul>
          <li>execução de procedimentos preliminares relacionados a contrato</li>
          <li>execução de contrato</li>
          <li>cumprimento de obrigação legal ou regulatória</li>
          <li>exercício regular de direitos em processo judicial, administrativo ou arbitral</li>
          <li>legítimo interesse, quando necessário para operação, segurança e melhoria dos serviços</li>
          <li>consentimento, quando exigido para finalidades opcionais</li>
        </ul>

        <h2>6. Compartilhamento de dados</h2>
        <p>Os dados poderão ser compartilhados, quando necessário, com:</p>
        <ul>
          <li>provedores de hospedagem, infraestrutura, email, armazenamento em nuvem e ferramentas de produtividade</li>
          <li>plataformas de comunicação e atendimento, como WhatsApp, Instagram, Meta e serviços correlatos</li>
          <li>prestadores de serviços financeiros, contábeis, fiscais ou jurídicos</li>
          <li>autoridades públicas, quando houver obrigação legal ou requisição válida</li>
        </ul>
        <p>Os dados <strong>não são comercializados</strong> como produto.</p>

        <h2>7. Transferências internacionais</h2>
        <p>
          Alguns fornecedores de tecnologia podem armazenar ou processar dados fora do Brasil. Nesses casos, serão
          adotadas medidas razoáveis para selecionar provedores com padrões adequados de segurança e conformidade.
        </p>

        <h2>8. Cookies e armazenamento local</h2>
        <p>
          O site pode utilizar recursos técnicos como cookies estritamente necessários e <code>localStorage</code> para:
        </p>
        <ul>
          <li>lembrar preferências de idioma</li>
          <li>manter estabilidade, desempenho e funcionamento da navegação</li>
        </ul>
        <p>
          Você pode gerenciar ou limpar esses dados diretamente no seu navegador, sabendo que certas preferências
          podem ser perdidas após a remoção.
        </p>

        <h2>9. Retenção e descarte</h2>
        <p>Os dados serão mantidos pelo tempo necessário para cumprir as finalidades desta política, inclusive para:</p>
        <ul>
          <li>atendimento e relacionamento comercial</li>
          <li>execução e suporte dos serviços contratados</li>
          <li>cumprimento de obrigações legais, fiscais e contábeis</li>
          <li>resguardo de direitos e prevenção de disputas</li>
        </ul>
        <p>
          Após esse período, os dados poderão ser eliminados, anonimizados ou mantidos de forma legalmente permitida.
        </p>

        <h2>10. Segurança da informação</h2>
        <p>
          São adotadas medidas administrativas e técnicas razoáveis para reduzir risco de acesso não autorizado,
          perda, alteração ou uso indevido de dados. Ainda assim, nenhum ambiente digital é completamente imune a
          falhas ou incidentes.
        </p>

        <h2>11. Direitos do titular</h2>
        <p>Nos termos da LGPD, você pode solicitar, quando aplicável:</p>
        <ul>
          <li>confirmação da existência de tratamento</li>
          <li>acesso aos dados</li>
          <li>correção de dados incompletos, inexatos ou desatualizados</li>
          <li>anonimização, bloqueio ou eliminação de dados desnecessários ou tratados em desconformidade</li>
          <li>portabilidade, quando cabível</li>
          <li>informações sobre compartilhamento</li>
          <li>eliminação de dados tratados com base em consentimento</li>
          <li>revogação do consentimento</li>
          <li>oposição a tratamentos realizados com fundamento legal aplicável</li>
        </ul>

        <h2>12. Canal de contato</h2>
        <p>Solicitações relacionadas a privacidade e proteção de dados podem ser enviadas para:</p>
        <ul>
          <li>Email: <a href="mailto:devmitolenda@gmail.com">devmitolenda@gmail.com</a></li>
          <li>WhatsApp: <a href="https://wa.me/555131999319" target="_blank" rel="noreferrer">+55 51 3199-9319</a></li>
        </ul>
        <p>Sempre que possível, informe o contexto da solicitação para agilizar o atendimento.</p>

        <h2>13. Links de terceiros</h2>
        <p>
          O site pode conter links para plataformas e sites de terceiros. Cada serviço externo possui suas próprias
          políticas e práticas de privacidade, não sendo esta política aplicável a esses ambientes.
        </p>

        <h2>14. Alterações desta política</h2>
        <p>
          Esta política pode ser atualizada periodicamente para refletir mudanças operacionais, técnicas ou legais.
          A versão vigente será a publicada nesta página, com indicação da data de atualização.
        </p>

        <h2>15. Legislação aplicável</h2>
        <p>
          Esta política será interpretada conforme a legislação brasileira, especialmente a{" "}
          <strong>Lei Geral de Proteção de Dados Pessoais (Lei nº 13.709/2018)</strong>.
        </p>
      </article>
    </div>
  </main>
);
