import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({ request })
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !anonKey) return response

  const supabase = createServerClient(url, anonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll()
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
        response = NextResponse.next({ request })
        cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options))
      },
    },
  })

  const { data: { user } } = await supabase.auth.getUser()
  const path = request.nextUrl.pathname
  const protectedArea = path.startsWith('/panel') || path.startsWith('/billetera') || path.startsWith('/consulta/') || path.startsWith('/admin')
  const tarotistArea = path.startsWith('/panel-tarotista')

  if (!user && protectedArea) {
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('next', path)
    return NextResponse.redirect(loginUrl)
  }

  if (user && (tarotistArea || path.startsWith('/admin'))) {
    const { data: profile } = await supabase.from('profiles').select('role, deleted_at').eq('id', user.id).single()
    const role = profile?.role

    if (profile?.deleted_at || (tarotistArea && role !== 'tarotist' && role !== 'admin') || (path.startsWith('/admin') && role !== 'admin')) {
      return NextResponse.redirect(new URL('/panel', request.url))
    }
  }

  return response
}

export const config = {
  matcher: ['/panel/:path*', '/panel-tarotista/:path*', '/admin/:path*', '/billetera/:path*', '/consulta/:path*'],
}
