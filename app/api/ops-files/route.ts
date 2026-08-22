import { NextRequest, NextResponse } from 'next/server'
import { createHash } from 'crypto'
import { cookies } from 'next/headers'
import { listFiles, readOpsFile, OPS_SECTIONS, Section } from '@/lib/ops'

function hashPassword(password: string): string {
  return createHash('sha256').update(password + 'proaudita-ops-salt').digest('hex')
}

async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies()
  const session = cookieStore.get('ops_session')
  const password = process.env.OPS_PASSWORD
  if (!password || !session) return false
  return session.value === hashPassword(password)
}

export async function GET(req: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { searchParams } = req.nextUrl
  const section = searchParams.get('section') as Section | null
  const file = searchParams.get('file')

  if (!section || !OPS_SECTIONS[section]) {
    return NextResponse.json({ error: 'Invalid section' }, { status: 400 })
  }

  if (file) {
    try {
      const content = readOpsFile(section, file)
      return NextResponse.json({ content })
    } catch {
      return NextResponse.json({ error: 'File not found' }, { status: 404 })
    }
  }

  const files = listFiles(section)
  return NextResponse.json({ files })
}
