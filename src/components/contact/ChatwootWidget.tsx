'use client'

import { useEffect } from 'react'

declare global {
  interface Window {
    chatwootSettings?: {
      position: string
      type: string
      launcherTitle: string
    }
    chatwootSDK?: {
      run: (config: { websiteToken: string; baseUrl: string }) => void
    }
    chatwootInitialized?: boolean
  }
}

export function ChatwootWidget() {
  useEffect(() => {
    // Evitar carregamento duplicado do SDK em navegações client-side
    if (window.chatwootInitialized || document.getElementById('chatwoot-sdk')) {
      return;
    }
    window.chatwootInitialized = true;

    // Configurações do Chatwoot carregadas no client-side
    window.chatwootSettings = {
      position: 'right',
      type: 'standard',
      launcherTitle: 'FALAR COM DEV_MITOLENDA',
    };

    // Script do SDK adicionado dinamicamente para evitar bloqueio de renderização
    const BASE_URL = 'https://n8n-chatwoot.qzqlae.easypanel.host';
    const script = document.createElement('script');
    script.id = 'chatwoot-sdk';
    script.src = `${BASE_URL}/packs/js/sdk.js`;
    script.async = true;
    
    script.onload = () => {
      if (window.chatwootSDK) {
        // Inicialização do Chatwoot SDK (O websiteToken é público)
        window.chatwootSDK.run({
          websiteToken: 'ACNH2QjoY2PzNYnBivC16smK',
          baseUrl: BASE_URL,
        });
      }
    };

    document.body.appendChild(script);

    // Sem função de limpeza (cleanup) intencionalmente
    // O widget permanece persistente e global durante toda a sessão (não some no hot-reload ou troca de páginas)
  }, []);

  return null;
}
