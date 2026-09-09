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
