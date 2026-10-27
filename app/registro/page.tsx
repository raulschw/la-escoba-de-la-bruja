'use client'

import { FormEvent, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export default function RegistroPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState<'client' | 'tarotist'>('client')
  const [terms, setTerms] = useState(false)
  const [privacy, setPrivacy] = useState(false)
  const [age, setAge] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function submit(event: FormEvent) {
    event.preventDefault()
    setError('')
    setMessage('')
    if (!terms || !privacy || !age) return setError('Debes aceptar los tres consentimientos para continuar.')
    setLoading(true)
    const supabase = createClient()
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: name, requested_role: role } },
    })
    if (error) setError(error.message)
    else setMessage('Cuenta creada. Revisa tu correo para confirmar tu dirección.')
    setLoading(false)
  }

  return (
    <main className="min-h-screen bg-witch-night px-6 py-12 text-witch-cream">
      <div className="mx-auto max-w-xl rounded-2xl border border-witch-gold/20 bg-white/5 p-8 shadow-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-witch-gold">La Escoba de la Bruja</p>
        <h1 className="mt-3 text-4xl font-semibold">Crear cuenta</h1>
        <form onSubmit={submit} className="mt-8 space-y-5">
          <input required value={name} onChange={(e) => setName(e.target.value)} placeholder="Nombre completo" className="w-full rounded-xl bg-white/10 px-4 py-3 outline-none focus:ring-2 focus:ring-witch-gold" />
          <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Correo electrónico" className="w-full rounded-xl bg-white/10 px-4 py-3 outline-none focus:ring-2 focus:ring-witch-gold" />
          <input required minLength={8} type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Contraseña (mínimo 8 caracteres)" className="w-full rounded-xl bg-white/10 px-4 py-3 outline-none focus:ring-2 focus:ring-witch-gold" />
          <select value={role} onChange={(e) => setRole(e.target.value as 'client' | 'tarotist')} className="w-full rounded-xl bg-witch-night px-4 py-3 outline-none focus:ring-2 focus:ring-witch-gold">
            <option value="client">Quiero consultar</option>
            <option value="tarotist">Quiero ser tarotista</option>
          </select>
          <label className="flex gap-3 text-sm text-white/80"><input type="checkbox" checked={terms} onChange={(e) => setTerms(e.target.checked)} /> Acepto los términos y condiciones.</label>
          <label className="flex gap-3 text-sm text-white/80"><input type="checkbox" checked={privacy} onChange={(e) => setPrivacy(e.target.checked)} /> Acepto la política de privacidad.</label>
          <label className="flex gap-3 text-sm text-white/80"><input type="checkbox" checked={age} onChange={(e) => setAge(e.target.checked)} /> Declaro que soy mayor de 18 años.</label>
          {error && <p className="rounded-lg border border-red-400/30 bg-red-400/10 p-3 text-sm text-red-200">{error}</p>}
          {message && <p className="rounded-lg border border-green-400/30 bg-green-400/10 p-3 text-sm text-green-200">{message}</p>}
          <button disabled={loading} className="w-full rounded-xl bg-witch-gold px-5 py-3 font-bold text-witch-night disabled:opacity-50">{loading ? 'Creando…' : 'Crear cuenta'}</button>
        </form>
      </div>
    </main>
  )
}
