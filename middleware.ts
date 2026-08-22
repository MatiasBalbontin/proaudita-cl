import { NextRequest, NextResponse } from 'next/server'
import { createHash } from 'crypto'

function hashPassword(password: string): string {
  return createHash('sha256').update(password + 'proaudita-ops-salt').digest('hex')
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  if (
    pathname.startsWith('/ops/dashboard') ||
    pathname.startsWith('/api/ops-files')
  ) {
    const session = req.cookies.get('ops_session')
    const password = process.env.OPS_PASSWORD

    const valid =
      password &&
      session &&
      session.value === hashPassword(password)

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
