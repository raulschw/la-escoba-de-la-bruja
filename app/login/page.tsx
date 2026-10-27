'use client'

import { FormEvent, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function submit(event: FormEvent) {
    event.preventDefault()
    setLoading(true)
    setError('')
    const supabase = createClient()
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }
    router.replace(searchParams.get('next') || '/panel')
    router.refresh()
  }

  return (
    <main className="min-h-screen bg-witch-night px-6 py-16 text-witch-cream">
      <div className="mx-auto max-w-md rounded-2xl border border-witch-gold/20 bg-white/5 p-8 shadow-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-witch-gold">La Escoba de la Bruja</p>
        <h1 className="mt-3 text-4xl font-semibold">Iniciar sesión</h1>
        <form onSubmit={submit} className="mt-8 space-y-5">
          <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Correo electrónico" className="w-full rounded-xl bg-white/10 px-4 py-3 outline-none ring-witch-gold focus:ring-2" />
          <input required minLength={6} type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Contraseña" className="w-full rounded-xl bg-white/10 px-4 py-3 outline-none ring-witch-gold focus:ring-2" />
          {error && <p className="rounded-lg border border-red-400/30 bg-red-400/10 p-3 text-sm text-red-200">{error}</p>}
          <button disabled={loading} className="w-full rounded-xl bg-witch-gold px-5 py-3 font-bold text-witch-night disabled:opacity-50">{loading ? 'Entrando…' : 'Entrar'}</button>
        </form>
        <p className="mt-6 text-sm text-white/60">¿No tienes cuenta? <a className="text-witch-gold" href="/registro">Regístrate</a></p>
      </div>
    </main>
  )
}
