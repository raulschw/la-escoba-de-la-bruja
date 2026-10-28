import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'

const categories = [
  { title: 'Tarot', text: 'Lecturas, amor, trabajo y decisiones.', icon: '✦' },
  { title: 'Videncia', text: 'Orientación intuitiva para tus preguntas.', icon: '◈' },
  { title: 'Astrología', text: 'Carta natal, tránsitos y compatibilidad.', icon: '☾' },
]

type Tarotist = {
  id: string
  slug: string
  name: string
  specialty: string
  bio: string | null
  avatar_url: string | null
  rating: number | null
  reviews_count: number | null
  price_per_minute: number | null
  online: boolean | null
  featured: boolean | null
  verified: boolean | null
  specialties: string[] | null
}

export default async function HomePage() {
  const supabase = await createClient()
  const { data } = await supabase
    .from('tarotist_profiles')
    .select('id,slug,name,specialty,bio,avatar_url,rating,reviews_count,price_per_minute,online,featured,verified,specialties')
    .eq('active', true)
    .order('online', { ascending: false })
    .order('featured', { ascending: false })
    .order('rating', { ascending: false })
    .limit(6)

  const tarotists = (data ?? []) as Tarotist[]
  const onlineTarotists = tarotists.filter((tarotist) => tarotist.online)
  const offlineTarotists = tarotists.filter((tarotist) => !tarotist.online)

  return (
    <main className="min-h-screen overflow-hidden bg-witch-night text-witch-cream">
      <header className="sticky top-0 z-20 border-b border-white/10 bg-witch-night/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 md:px-8">
          <Link href="/" className="flex items-center gap-3" aria-label="La Escoba de la Bruja">
            <span className="grid h-10 w-10 place-items-center rounded-full border border-witch-gold/50 bg-witch-gold/10 text-xl text-witch-gold">✦</span>
            <span className="font-serif text-lg tracking-wide text-witch-cream">La Escoba <span className="text-witch-gold">de la Bruja</span></span>
          </Link>
          <nav className="hidden items-center gap-7 text-sm text-white/75 md:flex">
            <Link href="/explorar" className="transition hover:text-witch-gold">Explorar</Link>
            <Link href="/login" className="transition hover:text-witch-gold">Iniciar sesión</Link>
          </nav>
          <Link href="/registro" className="rounded-xl bg-witch-gold px-4 py-2.5 text-sm font-bold text-witch-night shadow-lg shadow-witch-gold/10 transition hover:-translate-y-0.5">Registrarse</Link>
        </div>
      </header>

      <section className="relative isolate">
        <div className="pointer-events-none absolute -right-32 -top-32 -z-10 h-80 w-80 rounded-full bg-purple-700/30 blur-3xl" />
        <div className="pointer-events-none absolute -left-40 top-40 -z-10 h-96 w-96 rounded-full bg-witch-gold/10 blur-3xl" />
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 pb-16 pt-14 md:grid-cols-[1.05fr_.95fr] md:px-8 md:pb-20 md:pt-20">
          <div>
            <p className="mb-5 text-xs font-bold uppercase tracking-[0.32em] text-witch-gold">Tarot · Videncia · Astrología</p>
            <h1 className="max-w-3xl font-serif text-5xl leading-[0.98] text-witch-cream md:text-7xl">Encuentra a la persona indicada para <span className="text-witch-gold">orientarte.</span></h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-white/70 md:text-xl">Un marketplace de profesionales reales para consultas de tarot, videncia y astrología. Explora perfiles, compara especialidades y elige cómo quieres recibir tu orientación.</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href="/explorar" className="rounded-2xl bg-witch-gold px-7 py-4 text-center font-bold text-witch-night shadow-xl shadow-witch-gold/10 transition hover:-translate-y-0.5">Explorar profesionales</Link>
              <Link href="/registro" className="rounded-2xl border border-witch-gold/35 bg-white/[0.03] px-7 py-4 text-center font-semibold text-witch-cream transition hover:bg-white/[0.06]">Crear mi cuenta</Link>
            </div>
            <div className="mt-8 flex flex-wrap gap-5 text-xs text-white/50"><span>✓ Perfiles verificables</span><span>✓ Pagos seguros</span><span>✓ Chat y llamadas en la siguiente fase</span></div>
          </div>

          <div className="relative mx-auto w-full max-w-md">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] border border-witch-gold/25 bg-black shadow-2xl shadow-black/40">
              <img src="/assets/la-escoba-hero.webp" onError={(event) => { event.currentTarget.onerror = null; event.currentTarget.src = "https://images.pexels.com/photos/7222090/pexels-photo-7222090.jpeg?auto=compress&cs=tinysrgb&w=1200"; }} alt="La Escoba de la Bruja — Tarot, Videncia y Astrología" className="h-full w-full object-cover" />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-black/10" />
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-black/10">
        <div className="mx-auto max-w-6xl px-5 py-14 md:px-8">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div><p className="text-xs font-bold uppercase tracking-[0.3em] text-witch-gold">Ahora mismo</p><h2 className="mt-3 font-serif text-3xl md:text-4xl">Profesionales disponibles</h2><p className="mt-3 text-white/55">Mira quién está conectado y qué ofrece antes de entrar a su perfil.</p></div>
            <Link href="/explorar" className="text-sm font-semibold text-witch-gold">Ver todo el directorio →</Link>
          </div>

          {tarotists.length === 0 ? (
            <div className="mt-8 rounded-3xl border border-white/10 bg-white/[0.03] p-7 text-white/60">Estamos incorporando a los primeros profesionales. El catálogo está conectado a la base real.</div>
          ) : (
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {[...onlineTarotists, ...offlineTarotists].slice(0, 6).map((tarotist) => (
                <Link key={tarotist.id} href={`/explorar/${tarotist.slug}`} className="group overflow-hidden rounded-3xl border border-white/10 bg-white/[0.035] transition hover:-translate-y-1 hover:border-witch-gold/35">
                  <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-purple-950 via-[#180b25] to-black">
                    {tarotist.avatar_url ? <img src={tarotist.avatar_url} alt={tarotist.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" /> : <div className="grid h-full place-items-center text-6xl text-witch-gold/70">✦</div>}
                    <span className={`absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-bold ${tarotist.online ? 'bg-emerald-400 text-black' : 'border border-white/20 bg-black/60 text-white/70 backdrop-blur'}`}>{tarotist.online ? '● En línea' : '○ No disponible'}</span>
                    {tarotist.verified && <span className="absolute right-4 top-4 rounded-full border border-witch-gold/40 bg-black/55 px-3 py-1 text-xs font-bold text-witch-gold backdrop-blur">✓ Verificada</span>}
                  </div>
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-3"><div><p className="text-xs font-bold uppercase tracking-wider text-witch-gold">{tarotist.specialty}</p><h3 className="mt-2 text-xl font-semibold">{tarotist.name}</h3></div><span className="text-xs text-white/50">★ {Number(tarotist.rating ?? 0).toFixed(1)}</span></div>
                    <p className="mt-3 line-clamp-2 text-sm leading-6 text-white/60">{tarotist.bio || 'Perfil profesional en preparación.'}</p>
                    <div className="mt-4 flex flex-wrap gap-2">{(tarotist.specialties ?? []).slice(0, 3).map((item) => <span key={item} className="rounded-full border border-white/10 px-2.5 py-1 text-[11px] text-white/55">{item}</span>)}</div>
                    <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4 text-sm"><span className="text-white/50">{tarotist.reviews_count ?? 0} reseñas</span><span className="font-semibold text-witch-gold">${tarotist.price_per_minute ?? 0}/min</span></div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="border-b border-white/10 bg-white/[0.025]">
        <div className="mx-auto max-w-6xl px-5 py-14 md:px-8 md:py-20">
          <div className="mb-9 max-w-2xl"><p className="text-xs font-bold uppercase tracking-[0.3em] text-witch-gold">Elige tu camino</p><h2 className="mt-3 font-serif text-3xl md:text-4xl">Una experiencia clara desde el primer minuto.</h2></div>
          <div className="grid gap-4 md:grid-cols-3">{categories.map((category) => <Link key={category.title} href="/explorar" className="group rounded-2xl border border-white/10 bg-black/15 p-6 transition hover:-translate-y-1 hover:border-witch-gold/35 hover:bg-white/[0.04]"><span className="grid h-11 w-11 place-items-center rounded-xl bg-witch-gold/10 text-xl text-witch-gold">{category.icon}</span><h3 className="mt-5 text-xl font-semibold text-witch-cream">{category.title}</h3><p className="mt-2 leading-7 text-white/60">{category.text}</p><span className="mt-5 inline-block text-sm font-semibold text-witch-gold">Ver profesionales →</span></Link>)}</div>
        </div>
      </section>

      <footer className="border-t border-white/10 px-5 py-8 text-center text-xs text-white/40">© {new Date().getFullYear()} La Escoba de la Bruja · Tarot · Videncia · Astrología</footer>
    </main>
  )
}
