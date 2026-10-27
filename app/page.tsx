import Link from 'next/link'

const categories = [
  { title: 'Tarot', text: 'Lecturas, amor, trabajo y decisiones.', icon: '✦' },
  { title: 'Videncia', text: 'Orientación intuitiva para tus preguntas.', icon: '◈' },
  { title: 'Astrología', text: 'Carta natal, tránsitos y compatibilidad.', icon: '☾' },
]

export default function HomePage() {
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
          <Link href="/registro" className="rounded-xl bg-witch-gold px-4 py-2.5 text-sm font-bold text-witch-night shadow-lg shadow-witch-gold/10 transition hover:-translate-y-0.5">
            Registrarse
          </Link>
        </div>
      </header>

      <section className="relative isolate">
        <div className="pointer-events-none absolute -right-32 -top-32 -z-10 h-80 w-80 rounded-full bg-purple-700/30 blur-3xl" />
        <div className="pointer-events-none absolute -left-40 top-40 -z-10 h-96 w-96 rounded-full bg-witch-gold/10 blur-3xl" />
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 pb-20 pt-14 md:grid-cols-[1.05fr_.95fr] md:px-8 md:pb-28 md:pt-20">
          <div>
            <p className="mb-5 text-xs font-bold uppercase tracking-[0.32em] text-witch-gold">Tarot · Videncia · Astrología</p>
            <h1 className="max-w-3xl font-serif text-5xl leading-[0.98] text-witch-cream md:text-7xl">
              Encuentra a la persona indicada para <span className="text-witch-gold">orientarte.</span>
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-white/70 md:text-xl">
              Un marketplace de profesionales reales para consultas de tarot, videncia y astrología. Explora perfiles, compara especialidades y elige cómo quieres recibir tu orientación.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href="/explorar" className="rounded-2xl bg-witch-gold px-7 py-4 text-center font-bold text-witch-night shadow-xl shadow-witch-gold/10 transition hover:-translate-y-0.5">Explorar profesionales</Link>
              <Link href="/registro" className="rounded-2xl border border-witch-gold/35 bg-white/[0.03] px-7 py-4 text-center font-semibold text-witch-cream transition hover:bg-white/[0.06]">Crear mi cuenta</Link>
            </div>
            <div className="mt-8 flex flex-wrap gap-5 text-xs text-white/50">
              <span>✓ Perfiles verificables</span>
              <span>✓ Pagos seguros</span>
              <span>✓ Chat y llamadas en la siguiente fase</span>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-md">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-witch-gold/25 bg-gradient-to-br from-purple-950 via-[#160b25] to-black shadow-2xl shadow-black/40">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_28%,rgba(217,173,85,.32),transparent_20%),radial-gradient(circle_at_35%_65%,rgba(124,58,237,.35),transparent_35%)]" />
              <div className="absolute left-7 top-7 rounded-full border border-witch-gold/30 bg-black/25 px-3 py-1.5 text-xs font-semibold text-witch-gold backdrop-blur">Tu consulta comienza aquí</div>
              <div className="absolute inset-x-10 top-28 grid aspect-square place-items-center rounded-full border border-witch-gold/20 bg-white/[0.025] shadow-[0_0_100px_rgba(217,173,85,.12)]">
                <div className="text-center">
                  <div className="text-7xl">☾</div>
                  <div className="mt-3 font-serif text-2xl text-witch-cream">La Escoba</div>
                  <div className="text-sm uppercase tracking-[0.28em] text-witch-gold">de la Bruja</div>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 border-t border-white/10 bg-black/35 p-6 backdrop-blur-xl">
                <p className="text-sm text-white/60">Una plataforma pensada para conectar</p>
                <p className="mt-1 text-xl font-semibold text-witch-cream">personas con profesionales.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/[0.025]">
        <div className="mx-auto max-w-6xl px-5 py-14 md:px-8 md:py-20">
          <div className="mb-9 max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-witch-gold">Elige tu camino</p>
            <h2 className="mt-3 font-serif text-3xl md:text-4xl">Una experiencia clara desde el primer minuto.</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {categories.map((category) => (
              <Link key={category.title} href="/explorar" className="group rounded-2xl border border-white/10 bg-black/15 p-6 transition hover:-translate-y-1 hover:border-witch-gold/35 hover:bg-white/[0.04]">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-witch-gold/10 text-xl text-witch-gold">{category.icon}</span>
                <h3 className="mt-5 text-xl font-semibold text-witch-cream">{category.title}</h3>
                <p className="mt-2 leading-7 text-white/60">{category.text}</p>
                <span className="mt-5 inline-block text-sm font-semibold text-witch-gold">Ver profesionales →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 text-center md:px-8 md:py-24">
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-witch-gold">Construida por etapas</p>
        <h2 className="mx-auto mt-4 max-w-3xl font-serif text-3xl md:text-5xl">Primero una base sólida. Después, todo lo demás.</h2>
        <p className="mx-auto mt-5 max-w-2xl text-white/60 leading-7">La cuenta y la base de datos ya están preparadas. Ahora estamos conectando el catálogo real para que los profesionales dejen de ser datos de maqueta.</p>
        <div className="mt-8 flex justify-center gap-3">
          <Link href="/explorar" className="rounded-xl border border-witch-gold/30 px-6 py-3 font-semibold text-witch-cream">Abrir catálogo</Link>
          <Link href="/registro" className="rounded-xl bg-witch-gold px-6 py-3 font-bold text-witch-night">Registrarme</Link>
        </div>
      </section>

      <footer className="border-t border-white/10 px-5 py-8 text-center text-xs text-white/40">
        © {new Date().getFullYear()} La Escoba de la Bruja · Tarot · Videncia · Astrología
      </footer>
    </main>
  )
}
