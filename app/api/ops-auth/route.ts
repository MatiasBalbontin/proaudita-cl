import { NextRequest, NextResponse } from 'next/server'
import { createHash } from 'crypto'

function hashPassword(password: string): string {
  return createHash('sha256').update(password + 'proaudita-ops-salt').digest('hex')
}

export async function POST(req: NextRequest) {
  const { password } = await req.json()
  const expected = process.env.OPS_PASSWORD

  if (!expected || password !== expected) {
    return NextResponse.json({ error: 'Contraseña incorrecta' }, { status: 401 })
  }

  const token = hashPassword(expected)
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
