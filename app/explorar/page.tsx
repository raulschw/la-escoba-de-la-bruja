import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'

type Tarotist = {
  id: string
  name: string
  specialty: string
  bio: string | null
  avatar_url: string | null
  rating: number
  reviews_count: number
  price_per_minute: number
  online: boolean
  featured: boolean
}

export default async function ExplorarPage() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('tarotist_profiles')
    .select('id,name,specialty,bio,avatar_url,rating,reviews_count,price_per_minute,online,featured')
    .eq('active', true)
    .order('featured', { ascending: false })
    .order('online', { ascending: false })
    .order('rating', { ascending: false })

  const tarotists = (data ?? []) as Tarotist[]

  return (
    <main className="min-h-screen bg-witch-night text-witch-cream">
      <header className="border-b border-white/10 bg-witch-night/95">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 md:px-8">
          <Link href="/" className="font-serif text-lg">La Escoba <span className="text-witch-gold">de la Bruja</span></Link>
          <div className="flex items-center gap-3">
            <Link href="/login" className="hidden rounded-xl px-4 py-2 text-sm text-white/70 hover:text-witch-cream sm:block">Iniciar sesión</Link>
            <Link href="/registro" className="rounded-xl bg-witch-gold px-4 py-2 text-sm font-bold text-witch-night">Registrarse</Link>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-5 pb-12 pt-12 md:px-8 md:pt-16">
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-witch-gold">Directorio</p>
        <h1 className="mt-3 font-serif text-4xl md:text-6xl">Explora profesionales</h1>
        <p className="mt-4 max-w-2xl text-white/60 leading-7">Perfiles reales conectados a Supabase. Aquí aparecerán disponibilidad, especialidad, valoración y precio cuando el profesional publique su perfil.</p>

        {error ? (
          <div className="mt-10 rounded-2xl border border-red-400/20 bg-red-400/10 p-5 text-red-100">
            No pudimos cargar el catálogo en este momento. La base está conectada, pero debemos revisar la configuración de acceso.
          </div>
        ) : tarotists.length === 0 ? (
          <div className="mt-10 rounded-3xl border border-witch-gold/20 bg-white/[0.03] p-8 md:p-12">
            <div className="grid h-14 w-14 place-items-center rounded-2xl bg-witch-gold/10 text-2xl text-witch-gold">✦</div>
            <h2 className="mt-6 font-serif text-3xl">El catálogo está listo para recibir a los primeros profesionales.</h2>
            <p className="mt-4 max-w-2xl leading-7 text-white/60">No estamos inventando perfiles para llenar la pantalla. La consulta está apuntando a la base real y actualmente no hay profesionales publicados.</p>
            <Link href="/registro" className="mt-7 inline-flex rounded-xl bg-witch-gold px-5 py-3 font-bold text-witch-night">Quiero ser profesional</Link>
          </div>
        ) : (
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {tarotists.map((tarotist) => (
              <article key={tarotist.id} className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03]">
                <div className="relative aspect-[4/3] bg-gradient-to-br from-purple-950 via-[#180b25] to-black">
                  {tarotist.avatar_url ? <img src={tarotist.avatar_url} alt={tarotist.name} className="h-full w-full object-cover" /> : <div className="grid h-full place-items-center text-6xl text-witch-gold/70">✦</div>}
                  {tarotist.online && <span className="absolute left-4 top-4 rounded-full bg-emerald-400 px-3 py-1 text-xs font-bold text-black">En línea</span>}
                </div>
                <div className="p-5">
                  <p className="text-xs font-bold uppercase tracking-wider text-witch-gold">{tarotist.specialty}</p>
                  <h2 className="mt-2 text-xl font-semibold">{tarotist.name}</h2>
                  <p className="mt-2 line-clamp-3 text-sm leading-6 text-white/60">{tarotist.bio || 'Perfil profesional en preparación.'}</p>
                  <div className="mt-5 flex items-center justify-between text-sm">
                    <span>★ {Number(tarotist.rating).toFixed(1)} ({tarotist.reviews_count})</span>
                    <span className="font-semibold text-witch-gold">${tarotist.price_per_minute}/min</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  )
}
