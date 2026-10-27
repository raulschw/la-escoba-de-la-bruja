import { redirect } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'

export default async function BilleteraPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: wallet } = await supabase
    .from('wallets')
    .select('balance, currency, frozen_balance, lifetime_spent')
    .eq('user_id', user.id)
    .maybeSingle()

  const { data: transactions } = await supabase
    .from('wallet_transactions')
    .select('id, amount, type, description, created_at')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(10)

  const balance = Number(wallet?.balance ?? 0)
  const currency = wallet?.currency ?? 'CLP'

  return (
    <main className="min-h-screen bg-witch-night px-5 py-10 text-witch-cream md:px-8">
      <div className="mx-auto max-w-5xl">
        <Link href="/panel" className="text-sm text-witch-gold">← Volver al panel</Link>
        <div className="mt-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-witch-gold">Mi dinero</p>
            <h1 className="mt-3 font-serif text-4xl md:text-5xl">Billetera</h1>
          </div>
          <span className="rounded-full border border-white/10 px-4 py-2 text-xs text-white/50">Saldo protegido</span>
        </div>

        <section className="mt-8 rounded-3xl border border-witch-gold/20 bg-white/[0.035] p-7 shadow-2xl shadow-black/20">
          <p className="text-sm text-white/55">Saldo disponible</p>
          <p className="mt-2 text-4xl font-semibold text-witch-gold">{currency} {balance.toLocaleString('es-CL')}</p>
          <div className="mt-6 grid gap-3 text-sm text-white/60 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-black/10 p-4">En consultas: {Number(wallet?.frozen_balance ?? 0).toLocaleString('es-CL')} {currency}</div>
            <div className="rounded-2xl border border-white/10 bg-black/10 p-4">Gastado: {Number(wallet?.lifetime_spent ?? 0).toLocaleString('es-CL')} {currency}</div>
          </div>
        </section>

        <section className="mt-8">
          <div className="flex items-center justify-between"><h2 className="font-serif text-2xl">Últimos movimientos</h2><button disabled className="rounded-xl border border-white/10 px-4 py-2 text-xs text-white/35">Recargar · próximamente</button></div>
          <div className="mt-4 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.025]">
            {(transactions ?? []).length === 0 ? (
              <p className="p-6 text-sm text-white/50">Todavía no hay movimientos en tu billetera.</p>
            ) : (
              <div className="divide-y divide-white/10">{transactions!.map((transaction) => <div key={transaction.id} className="flex items-center justify-between gap-4 p-5"><div><p className="font-medium">{transaction.description || 'Movimiento'}</p><p className="mt-1 text-xs text-white/40">{new Date(transaction.created_at).toLocaleString('es-CL')}</p></div><span className={transaction.type === 'credit' ? 'font-semibold text-emerald-300' : 'font-semibold text-white/80'}>{transaction.type === 'credit' ? '+' : '-'}{Number(transaction.amount).toLocaleString('es-CL')} {currency}</span></div>)}</div>
            )}
          </div>
        </section>
      </div>
    </main>
  )
}
