import { createClient } from '@supabase/supabase-js'

const url = process.env.NEXT_PUBLIC_SUPABASE_URL
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!url || !anonKey) {
  console.warn('[supabase/client] NEXT_PUBLIC_SUPABASE_URL/ANON_KEY não configuradas')
}

// Client anon singleton — leitura pública, sujeita a RLS. Seguro para uso em
// Server Components (nunca expõe nada além do que as policies já permitem).
export const supabasePublic = createClient(url ?? '', anonKey ?? '', {
  auth: { persistSession: false },
})
