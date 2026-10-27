export default function HomePage() {
  return (
    <main className="min-h-screen bg-witch-night text-witch-cream">
      <section className="mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center px-6 py-20 text-center">
        <p className="mb-5 text-sm font-semibold uppercase tracking-[0.35em] text-witch-gold">
          Tarot · Videncia · Astrología
        </p>
        <h1 className="max-w-4xl text-5xl font-semibold leading-tight md:text-7xl">
          La Escoba de la Bruja
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-white/75 md:text-xl">
          Conecta con tarotistas, videntes y astrólogos. Una nueva plataforma construida
          sobre una base real, segura y preparada para crecer.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <a className="rounded-xl bg-witch-gold px-7 py-4 font-bold text-witch-night" href="/registro">
            Registrarse
          </a>
          <a className="rounded-xl border border-witch-gold/50 px-7 py-4 font-semibold" href="/login">
            Iniciar sesión
          </a>
        </div>
      </section>
    </main>
  )
}
