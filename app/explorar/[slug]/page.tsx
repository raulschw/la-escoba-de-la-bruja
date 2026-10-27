import Link from 'next/link'
import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

type Props = { params: Promise<{ slug: string }> }

export default async function ProfessionalPage({ params }: Props) {
  const { slug } = await params
  const supabase = await createClient()

  const { data: tarotist } = await supabase
    .from('tarotist_profiles')
    .select('id,slug,name,specialty,bio,bio_long,avatar_url,cover_url,rating,reviews_count,rating_avg,total_reviews,total_consultations,price_per_minute,online,available,featured,verified,experience_years,languages')
    .eq('slug', slug)
    .eq('active', true)
    .maybeSingle()

  if (!tarotist) notFound()

  const rating = Number(tarotist.rating_avg ?? tarotist.rating ?? 0)
  const reviews = Number(tarotist.total_reviews ?? tarotist.reviews_count ?? 0)
  const languages = Array.isArray(tarotist.languages) && tarotist.languages.length ? tarotist.languages : ['Español']

  return (
    <main className="min-h-screen bg-witch-night text-witch-cream">
      <header className="sticky top-0 z-20 border-b border-white/10 bg-witch-night/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-4 md:px-8">
          <Link href="/explorar" className="text-sm text-white/65 hover:text-witch-cream">← Volver al catálogo</Link>
          <Link href="/registro" className="rounded-xl bg-witch-gold px-4 py-2 text-sm font-bold text-witch-night">Registrarse</Link>
        </div>
      </header>

      <section className="mx-auto max-w-5xl px-5 py-8 md:px-8 md:py-12">
        <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03]">
          <div className="relative h-48 bg-gradient-to-br from-purple-950 via-[#190b28] to-black md:h-64">
            {tarotist.cover_url && <img src={tarotist.cover_url} alt="" className="h-full w-full object-cover opacity-80" />}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          </div>

          <div className="relative px-5 pb-8 md:px-10 md:pb-10">
            <div className="-mt-16 flex flex-col gap-5 md:-mt-20 md:flex-row md:items-end md:justify-between">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
                <div className="grid h-32 w-32 shrink-0 place-items-center overflow-hidden rounded-3xl border-4 border-witch-night bg-[#180b25] text-5xl text-witch-gold shadow-2xl">
                  {tarotist.avatar_url ? <img src={tarotist.avatar_url} alt={tarotist.name} className="h-full w-full object-cover" /> : '✦'}
                </div>
                <div className="pb-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-xs font-bold uppercase tracking-[0.25em] text-witch-gold">{tarotist.specialty}</p>
                    {tarotist.verified && <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2.5 py-1 text-xs font-semibold text-emerald-300">Verificado</span>}
                  </div>
                  <h1 className="mt-2 font-serif text-4xl md:text-5xl">{tarotist.name}</h1>
                  <p className="mt-2 text-sm text-white/55">{tarotist.online ? '● En línea ahora' : '○ Fuera de línea'} · {languages.join(' · ')}</p>
                </div>
              </div>
              <div className="rounded-2xl border border-witch-gold/20 bg-witch-gold/5 px-5 py-4 md:min-w-44">
                <div className="text-sm text-white/55">Desde</div>
                <div className="mt-1 text-2xl font-bold text-witch-gold">${tarotist.price_per_minute}/min</div>
              </div>
            </div>

            <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_320px]">
              <div>
                <h2 className="font-serif text-2xl">Sobre {tarotist.name}</h2>
                <p className="mt-4 whitespace-pre-line leading-8 text-white/65">{tarotist.bio_long || tarotist.bio || 'Este profesional todavía está completando su presentación.'}</p>

                <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  <div className="rounded-2xl border border-white/10 p-4"><div className="text-xl font-bold">★ {rating.toFixed(1)}</div><div className="mt-1 text-xs text-white/45">Valoración</div></div>
                  <div className="rounded-2xl border border-white/10 p-4"><div className="text-xl font-bold">{reviews}</div><div className="mt-1 text-xs text-white/45">Opiniones</div></div>
                  <div className="rounded-2xl border border-white/10 p-4"><div className="text-xl font-bold">{tarotist.experience_years ?? '—'}</div><div className="mt-1 text-xs text-white/45">Años experiencia</div></div>
                  <div className="rounded-2xl border border-white/10 p-4"><div className="text-xl font-bold">{tarotist.total_consultations ?? 0}</div><div className="mt-1 text-xs text-white/45">Consultas</div></div>
                </div>
              </div>

              <aside className="h-fit rounded-3xl border border-witch-gold/20 bg-black/20 p-6">
                <h2 className="text-lg font-semibold">¿Quieres consultar?</h2>
                <p className="mt-2 text-sm leading-6 text-white/55">El siguiente paso será conectar esta ficha con reservas, saldo y chat en tiempo real.</p>
                <Link href="/registro" className="mt-6 flex w-full justify-center rounded-xl bg-witch-gold px-5 py-3 font-bold text-witch-night">Crear cuenta</Link>
                <Link href="/login" className="mt-3 flex w-full justify-center rounded-xl border border-white/10 px-5 py-3 text-sm font-semibold">Ya tengo cuenta</Link>
              </aside>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
