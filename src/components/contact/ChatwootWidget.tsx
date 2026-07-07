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
  }
}

export function ChatwootWidget() {
  useEffect(() => {
    // Add Chatwoot settings
    window.chatwootSettings = {
      position: 'right',
      type: 'standard',
      launcherTitle: '',
    }

    // Load Chatwoot SDK
    const BASE_URL = 'https://n8n-chatwoot.qzqlae.easypanel.host'
    const script = document.createElement('script')
    script.src = `${BASE_URL}/packs/js/sdk.js`
    script.async = true
    
    script.onload = () => {
      if (window.chatwootSDK) {
        window.chatwootSDK.run({
          websiteToken: 'ACNH2QjoY2PzNYnBivC16smK',
          baseUrl: BASE_URL,
        })
      }
    }

    document.body.appendChild(script)

    return () => {
      // Clean up script if component unmounts
      if (script.parentNode) {
        script.parentNode.removeChild(script)
      }
      // Also, we can optionally clean up the chatwoot widget element
      const widget = document.querySelector('.woot-widget-holder')
      if (widget && widget.parentNode) {
        widget.parentNode.removeChild(widget)
      }
    }
  }, [])

  return null
}
