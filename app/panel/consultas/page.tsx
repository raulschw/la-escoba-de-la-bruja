import { redirect } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'

export default async function ConsultasPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: consultations } = await supabase
    .from('consultations')
    .select('id, type, status, scheduled_at, duration_sec, cost, tarotist_id')
    .eq('client_id', user.id)
    .order('scheduled_at', { ascending: false })
    .limit(20)

  return (
    <main className="min-h-screen bg-witch-night px-5 py-10 text-witch-cream md:px-8">
      <div className="mx-auto max-w-5xl">
        <Link href="/panel" className="text-sm text-witch-gold">← Volver al panel</Link>
        <p className="mt-8 text-xs font-bold uppercase tracking-[0.3em] text-witch-gold">Área privada</p>
        <h1 className="mt-3 font-serif text-4xl">Mis consultas</h1>
        <p className="mt-3 text-white/60">Aquí aparecerán tus consultas reservadas y tu historial.</p>
        <div className="mt-8 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03]">
          {(consultations ?? []).length === 0 ? (
            <div className="p-8 text-center"><p className="text-white/55">Todavía no tienes consultas.</p><Link href="/explorar" className="mt-5 inline-flex rounded-xl bg-witch-gold px-5 py-3 text-sm font-bold text-witch-night">Explorar profesionales</Link></div>
          ) : (
            <div className="divide-y divide-white/10">{consultations!.map((item) => <div key={item.id} className="grid gap-3 p-5 sm:grid-cols-[1fr_auto] sm:items-center"><div><p className="font-semibold capitalize">{item.type} · {item.status}</p><p className="mt-1 text-sm text-white/45">{item.scheduled_at ? new Date(item.scheduled_at).toLocaleString('es-CL') : 'Sin fecha programada'}</p></div><span className="text-sm text-witch-gold">{item.cost ? `${Number(item.cost).toLocaleString('es-CL')} CLP` : 'Pendiente'}</span></div>)}</div>
          )}
        </div>
      </div>
    </main>
  )
}
