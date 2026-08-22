import { NextRequest, NextResponse } from 'next/server'
import { randomBytes, createHmac, timingSafeEqual } from 'crypto'

export function issueToken(password: string): string {
  const nonce = randomBytes(32).toString('hex')
  const hmac = createHmac('sha256', password).update(nonce).digest('hex')
  return `${nonce}.${hmac}`
}

export function verifyToken(token: string, password: string): boolean {
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

export async function POST(req: NextRequest) {
  const { password } = await req.json()
  const expected = process.env.OPS_PASSWORD

  if (!expected) {
    return NextResponse.json({ error: 'Contraseña incorrecta' }, { status: 401 })
  }
  const a = Buffer.from(password ?? '')
  const b = Buffer.from(expected)
  const match = a.length === b.length && timingSafeEqual(a, b)
  if (!match) {
    return NextResponse.json({ error: 'Contraseña incorrecta' }, { status: 401 })
  }

  const token = issueToken(expected)
  const response = NextResponse.json({ ok: true })
  response.cookies.set('ops_session', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 60 * 24 * 30,
    path: '/',
  })
  return response
}

export async function DELETE() {
  const response = NextResponse.json({ ok: true })
  response.cookies.delete('ops_session')
  return response
}
