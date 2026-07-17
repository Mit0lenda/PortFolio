"use client";

import React from "react";
import type { ProjectFlowStep } from "../../lib/types";
import { Reveal } from "../motion";

/**
 * Diagrama de fluxo construído com o design system (bordas retas, mono,
 * setas) — usado só quando o projeto não tem interface própria pra
 * capturar (automação/backend). Nunca representa uma tela que o produto
 * não tem, nunca ícone abstrato de "IA" — só as etapas reais do sistema,
 * marcadas por estágio (entrada/processamento/integração/saída).
 *
 * `compact` = versão reduzida para caber no card da home (empilhada,
 * sem borda própria — herda o fundo do `.feat-shot` que a contém).
 */
export const FlowDiagram: React.FC<{
  steps: ProjectFlowStep[];
  labelPrefix: string;
  compact?: boolean;
}> = ({ steps, labelPrefix, compact = false }) => {
  if (steps.length === 0) return null;

  if (compact) {
    return (
      <div className="flow-diagram flow-diagram--compact">
        <span className="flow-diagram-label">// {labelPrefix} · fluxo real</span>
        <Reveal as="div" className="flow-diagram-col" stagger staggerDelay={0.1}>
          {steps.map((step) => (
            <Reveal.Item as="div" className="flow-diagram-step" key={step.label}>
              <span className="flow-diagram-stage">{step.stage}</span>
              <span className="flow-diagram-step-label">{step.label}</span>
            </Reveal.Item>
          ))}
        </Reveal>
      </div>
    );
  }

  return (
    <div className="flow-diagram">
      <span className="flow-diagram-label">// {labelPrefix} — como o sistema funciona</span>
      <Reveal as="div" className="flow-diagram-row" stagger staggerDelay={0.12}>
        {steps.map((step, i) => (
          <React.Fragment key={step.label}>
            <Reveal.Item as="div" className="flow-diagram-step">
              <span className="flow-diagram-stage">{step.stage}</span>
              <span className="flow-diagram-step-label">{step.label}</span>
              {step.sub && <span className="flow-diagram-step-sub">{step.sub}</span>}
            </Reveal.Item>
            {i < steps.length - 1 && (
              <span className="flow-diagram-arrow" aria-hidden="true">
                →
              </span>
            )}
          </React.Fragment>
        ))}
      </Reveal>
    </div>
  );
};
