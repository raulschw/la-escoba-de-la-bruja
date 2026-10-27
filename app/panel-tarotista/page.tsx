import { redirect } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'

export default async function TarotistPanelPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: profile } = await supabase.from('profiles').select('full_name, role').eq('id', user.id).single()
  if (profile?.role !== 'tarotist' && profile?.role !== 'admin') redirect('/panel')

  const { data: tarotist } = await supabase
    .from('tarotist_profiles')
    .select('name, specialty, price_per_minute, online, verified, rating, reviews_count, bio')
    .eq('user_id', user.id)
    .maybeSingle()

  return (
    <main className="min-h-screen bg-witch-night px-5 py-10 text-witch-cream md:px-8">
      <div className="mx-auto max-w-6xl">
        <Link href="/" className="text-sm text-witch-gold">← Ir al inicio</Link>
        <div className="mt-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div><p className="text-xs font-bold uppercase tracking-[0.3em] text-witch-gold">Panel profesional</p><h1 className="mt-3 font-serif text-4xl">Hola{profile?.full_name ? `, ${profile.full_name}` : ''}</h1><p className="mt-3 text-white/60">Administra tu perfil, disponibilidad y futuras consultas desde aquí.</p></div>
          <span className={`rounded-full px-4 py-2 text-sm font-semibold ${tarotist?.online ? 'bg-emerald-400 text-black' : 'border border-white/15 text-white/60'}`}>{tarotist?.online ? '● En línea' : '○ No disponible'}</span>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5"><p className="text-xs text-white/45">Valoración</p><p className="mt-2 text-2xl text-witch-gold">★ {Number(tarotist?.rating ?? 0).toFixed(1)}</p><p className="mt-1 text-xs text-white/40">{tarotist?.reviews_count ?? 0} reseñas</p></div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5"><p className="text-xs text-white/45">Precio</p><p className="mt-2 text-2xl">${tarotist?.price_per_minute ?? 0}</p><p className="mt-1 text-xs text-white/40">por minuto</p></div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5"><p className="text-xs text-white/45">Verificación</p><p className="mt-2 text-lg">{tarotist?.verified ? '✓ Verificada' : 'Pendiente'}</p></div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5"><p className="text-xs text-white/45">Especialidad</p><p className="mt-2 text-lg">{tarotist?.specialty || 'Por configurar'}</p></div>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <Link href="/explorar" className="rounded-2xl border border-witch-gold/20 bg-white/[0.03] p-6 transition hover:bg-white/[0.06]"><h2 className="font-semibold">Ver mi perfil público</h2><p className="mt-2 text-sm text-white/50">Comprueba cómo te ven los clientes.</p></Link>
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6"><h2 className="font-semibold">Disponibilidad</h2><p className="mt-2 text-sm text-white/50">La agenda y estado online se conectarán aquí.</p></div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6"><h2 className="font-semibold">Consultas</h2><p className="mt-2 text-sm text-white/50">Tu historial y próximas consultas aparecerán aquí.</p></div>
        </div>
      </div>
    </main>
  )
}
