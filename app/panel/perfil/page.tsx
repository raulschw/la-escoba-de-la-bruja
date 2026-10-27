import { redirect } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'

export default async function PerfilPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: profile } = await supabase.from('profiles').select('full_name, phone, country, locale, avatar_url').eq('id', user.id).single()

  return (
    <main className="min-h-screen bg-witch-night px-5 py-10 text-witch-cream md:px-8">
      <div className="mx-auto max-w-3xl">
        <Link href="/panel" className="text-sm text-witch-gold">← Volver al panel</Link>
        <p className="mt-8 text-xs font-bold uppercase tracking-[0.3em] text-witch-gold">Mi cuenta</p>
        <h1 className="mt-3 font-serif text-4xl">Mi perfil</h1>
        <p className="mt-3 text-white/60">Estos son los datos asociados a tu cuenta. La edición del perfil será el siguiente paso.</p>
        <section className="mt-8 space-y-4 rounded-3xl border border-white/10 bg-white/[0.03] p-6">
          <div><p className="text-xs uppercase tracking-wider text-white/40">Nombre</p><p className="mt-1 text-lg">{profile?.full_name || 'Sin nombre'}</p></div>
          <div><p className="text-xs uppercase tracking-wider text-white/40">Correo</p><p className="mt-1 text-lg break-all">{user.email}</p></div>
          <div><p className="text-xs uppercase tracking-wider text-white/40">Teléfono</p><p className="mt-1 text-lg">{profile?.phone || 'No informado'}</p></div>
          <div><p className="text-xs uppercase tracking-wider text-white/40">País</p><p className="mt-1 text-lg">{profile?.country || 'No informado'}</p></div>
        </section>
      </div>
    </main>
  )
}
