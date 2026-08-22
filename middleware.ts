import { NextRequest, NextResponse } from 'next/server'
import { createHmac, timingSafeEqual } from 'crypto'

function verifyToken(token: string, password: string): boolean {
  const dot = token.indexOf('.')
  if (dot === -1) return false
  const nonce = token.slice(0, dot)
  const providedHmac = token.slice(dot + 1)
  const expected = createHmac('sha256', password).update(nonce).digest('hex')
  try {
    const a = Buffer.from(providedHmac, 'hex')
    const b = Buffer.from(expected, 'hex')
    return a.length === b.length && timingSafeEqual(a, b)
  } catch {
    return false
  }
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  if (
    pathname.startsWith('/ops/dashboard') ||
    pathname.startsWith('/api/ops-files')
  ) {
    const session = req.cookies.get('ops_session')
    const password = process.env.OPS_PASSWORD

    const valid = password && session && verifyToken(session.value, password)

    if (!valid) {
      if (pathname.startsWith('/api/')) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
      }
      return NextResponse.redirect(new URL('/ops', req.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/ops/dashboard/:path*', '/api/ops-files/:path*'],
}
