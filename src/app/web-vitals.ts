/**
 * Web Vitals reporting (OPT-03)
 * Reports Core Web Vitals to Cloudflare Analytics (if beacon URL is set)
 * or to the console in development.
 *
 * Usage: import in layout.tsx or a Client Component and call reportWebVitals
 */
import type { Metric } from 'web-vitals'

const CF_ANALYTICS_BEACON = process.env.NEXT_PUBLIC_CF_ANALYTICS_BEACON

export function reportWebVitals(metric: Metric) {
  // Development: log to console
  if (process.env.NODE_ENV === 'development') {
    console.log(`[web-vitals] ${metric.name}:`, metric.value, metric)
    return
  }

  // Production: send to Cloudflare Analytics custom event endpoint
  if (CF_ANALYTICS_BEACON) {
    const body = JSON.stringify({
      type: 'web-vitals',
      name: metric.name,
      value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
      id: metric.id,
      page: window.location.pathname,
    })

    if (navigator.sendBeacon) {
      navigator.sendBeacon(CF_ANALYTICS_BEACON, body)
    } else {
      fetch(CF_ANALYTICS_BEACON, {
        method: 'POST',
        body,
        keepalive: true,
      }).catch(() => {})
    }
  }
}
