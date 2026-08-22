import fs from 'fs'
import path from 'path'

const ROOT = process.cwd()

export const OPS_SECTIONS = {
  scripts: {
    label: 'Scripts',
    dir: path.join(ROOT, 'Scripts'),
  },
  marketing: {
    label: 'Marketing',
    dir: path.join(ROOT, 'marketing + ads'),
  },
  procedimientos: {
    label: 'Procedimientos',
    dir: path.join(ROOT, 'procedimientos y procesos'),
  },
} as const

export type Section = keyof typeof OPS_SECTIONS

const ALLOWED_EXTENSIONS = ['.md', '.py', '.csv', '.txt', '.yml', '.yaml', '.json']

export interface OpsFile {
  name: string
  path: string
  ext: string
  folder: string
}

export function listFiles(section: Section): OpsFile[] {
  const { dir } = OPS_SECTIONS[section]
  const result: OpsFile[] = []

  function walk(currentDir: string, relPrefix: string) {
    let entries: fs.Dirent[]
    try {
      entries = fs.readdirSync(currentDir, { withFileTypes: true })
    } catch {
      return
    }

    for (const entry of entries) {
      if (entry.name.startsWith('.')) continue
      const relPath = relPrefix ? `${relPrefix}/${entry.name}` : entry.name

      if (entry.isDirectory()) {
        walk(path.join(currentDir, entry.name), relPath)
      } else {
        const ext = path.extname(entry.name).toLowerCase()
        if (ALLOWED_EXTENSIONS.includes(ext)) {
          result.push({
            name: entry.name,
            path: relPath,
            ext,
            folder: relPrefix,
          })
        }
      }
    }
  }

  walk(dir, '')
  return result
}

export function readOpsFile(section: Section, filePath: string): string {
  const { dir } = OPS_SECTIONS[section]
  const fullPath = path.join(dir, filePath)
  const resolved = path.resolve(fullPath)
  const base = path.resolve(dir)

  if (!resolved.startsWith(base + path.sep) && resolved !== base) {
    throw new Error('Invalid path')
  }

  return fs.readFileSync(resolved, 'utf-8')
}
