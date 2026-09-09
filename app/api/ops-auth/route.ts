import { NextRequest, NextResponse } from 'next/server'
import { timingSafeEqual } from 'crypto'
import { issueToken } from '@/lib/ops-crypto'

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
