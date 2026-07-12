import 'server-only'
import { createClient } from '@supabase/supabase-js'

const url = process.env.NEXT_PUBLIC_SUPABASE_URL
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

// Falha cedo e com mensagem clara em vez de deixar o erro genérico do
// supabase-js aparecer em runtime — importante para diagnosticar rápido um
// build/CI sem a env configurada.
if (!url || !serviceRoleKey) {
  throw new Error(
    '[supabase/admin] NEXT_PUBLIC_SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY são obrigatórias para o client admin. ' +
      'SUPABASE_SERVICE_ROLE_KEY nunca deve ser prefixada com NEXT_PUBLIC_ e deve existir apenas no ambiente do servidor.',
  )
}

// Client service_role singleton — bypassa RLS. Importado exclusivamente por
// código server-only (route handlers). O import 'server-only' acima faz o
// build falhar se este módulo for importado por um Client Component.
export const supabaseAdmin = createClient(url, serviceRoleKey, {
  auth: { persistSession: false, autoRefreshToken: false },
})
