import { redirect } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'

export default async function PanelPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: profile } = await supabase.from('profiles').select('full_name, role').eq('id', user.id).single()
  if (profile?.role === 'admin') redirect('/admin')
  if (profile?.role === 'tarotist') redirect('/panel-tarotista')

  return (
    <main className="min-h-screen bg-witch-night px-6 py-12 text-witch-cream">
      <div className="mx-auto max-w-5xl">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-witch-gold">Área privada</p>
        <h1 className="mt-3 text-4xl font-semibold">Hola{profile?.full_name ? `, ${profile.full_name}` : ''}</h1>
        <p className="mt-3 text-white/70">Tu cuenta está conectada a Supabase y tu sesión está protegida.</p>
        <div className="mt-7 flex flex-wrap gap-3">
          <Link href="/explorar" className="inline-flex items-center gap-2 rounded-xl bg-witch-gold px-5 py-3 text-sm font-bold text-witch-night transition hover:brightness-110">
            ✦ Ver tarotistas y profesionales
          </Link>
          <Link href="/" className="inline-flex items-center rounded-xl border border-white/15 px-5 py-3 text-sm font-semibold text-witch-cream transition hover:bg-white/5">
            Volver al inicio
          </Link>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          <a href="/billetera" className="rounded-2xl border border-witch-gold/20 bg-white/5 p-6 hover:bg-white/10">Billetera</a>
          <a href="/panel/consultas" className="rounded-2xl border border-witch-gold/20 bg-white/5 p-6 hover:bg-white/10">Mis consultas</a>
          <a href="/panel/perfil" className="rounded-2xl border border-witch-gold/20 bg-white/5 p-6 hover:bg-white/10">Mi perfil</a>
        </div>
      </div>
    </main>
  )
}
