'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { marked } from 'marked'

marked.use({ breaks: true, gfm: true })

type Section = 'scripts' | 'marketing' | 'procedimientos'

const SECTIONS: { id: Section; label: string }[] = [
  { id: 'procedimientos', label: 'Procedimientos' },
  { id: 'marketing', label: 'Marketing' },
  { id: 'scripts', label: 'Scripts' },
]

interface OpsFile {
  name: string
  path: string
  ext: string
  folder: string
}

function displayName(name: string): string {
  return name
    .replace(/\.(md|py|csv|txt|yml|yaml|json)$/i, '')
    .replace(/[-_]/g, ' ')
}

export default function OpsDashboard() {
  const router = useRouter()
  const [section, setSection] = useState<Section>('procedimientos')
  const [files, setFiles] = useState<OpsFile[]>([])
  const [active, setActive] = useState<OpsFile | null>(null)
  const [content, setContent] = useState('')
  const [loadingFiles, setLoadingFiles] = useState(false)
  const [loadingContent, setLoadingContent] = useState(false)
  const [copied, setCopied] = useState(false)

  const fetchFiles = useCallback(
    async (s: Section) => {
      setLoadingFiles(true)
      setActive(null)
      setContent('')
      try {
        const res = await fetch(`/api/ops-files?section=${s}`)
        if (res.status === 401) {
          router.push('/ops')
          return
        }
        const data = await res.json()
        setFiles(data.files || [])
      } finally {
        setLoadingFiles(false)
      }
    },
    [router],
  )

  const fetchContent = useCallback(
    async (file: OpsFile) => {
      setActive(file)
      setContent('')
      setLoadingContent(true)
      try {
        const res = await fetch(
          `/api/ops-files?section=${section}&file=${encodeURIComponent(file.path)}`,
        )
        if (res.status === 401) {
          router.push('/ops')
          return
        }
        const data = await res.json()
        setContent(data.content || '')
      } finally {
        setLoadingContent(false)
      }
    },
    [section, router],
  )

  useEffect(() => {
    fetchFiles(section)
  }, [section, fetchFiles])

  async function logout() {
    await fetch('/api/ops-auth', { method: 'DELETE' })
    router.push('/ops')
  }

  function copy() {
    navigator.clipboard.writeText(content)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // Group files by immediate folder
  const grouped: Record<string, OpsFile[]> = {}
  for (const f of files) {
    const key = f.folder || ''
    if (!grouped[key]) grouped[key] = []
    grouped[key].push(f)
  }
  const sortedGroups = Object.entries(grouped).sort(([a], [b]) =>
    a.localeCompare(b),
  )

  const isMarkdown = active?.ext === '.md'
  const renderedHtml =
    isMarkdown && content ? (marked(content) as string) : null

  return (
    <div
      className="flex h-screen overflow-hidden text-white"
      style={{ background: '#08081F' }}
    >
      {/* ── Sidebar ─────────────────────────────────────── */}
      <aside
        className="w-52 flex-shrink-0 flex flex-col"
        style={{ borderRight: '1px solid rgba(255,255,255,0.05)' }}
      >
        {/* Brand bar */}
        <div
          className="h-11 flex items-center justify-between px-4 flex-shrink-0"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}
        >
          <div className="flex items-center gap-2">
            <div
              className="w-4 h-4 rounded"
              style={{ background: '#0019FF' }}
            />
            <span
              className="text-[10px] font-semibold uppercase tracking-widest"
              style={{ color: 'rgba(255,255,255,0.3)' }}
            >
              Ops
            </span>
          </div>
          <button
            onClick={logout}
            title="Cerrar sesión"
            className="text-xs transition-colors"
            style={{ color: 'rgba(255,255,255,0.2)' }}
            onMouseOver={(e) =>
              (e.currentTarget.style.color = 'rgba(255,255,255,0.5)')
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.color = 'rgba(255,255,255,0.2)')
            }
          >
            ↪
          </button>
        </div>

        {/* Section tabs */}
        <div
          className="flex flex-col gap-0.5 p-2 flex-shrink-0"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}
        >
          {SECTIONS.map((s) => (
            <button
              key={s.id}
              onClick={() => setSection(s.id)}
              className="text-left px-3 py-2 rounded-lg text-sm transition-colors"
              style={
                section === s.id
                  ? {
                      background: 'rgba(0,25,255,0.15)',
                      color: '#7B8FFF',
                    }
                  : {
                      color: 'rgba(255,255,255,0.35)',
                    }
              }
            >
              {s.label}
            </button>
          ))}
        </div>

        {/* File tree */}
        <div className="flex-1 overflow-y-auto p-2">
          {loadingFiles ? (
            <p
              className="text-xs px-3 py-2"
              style={{ color: 'rgba(255,255,255,0.15)' }}
            >
              Cargando...
            </p>
          ) : sortedGroups.length === 0 ? (
            <p
              className="text-xs px-3 py-2"
              style={{ color: 'rgba(255,255,255,0.15)' }}
            >
              Sin archivos
            </p>
          ) : (
            sortedGroups.map(([folder, folderFiles]) => (
              <div key={folder || '_root'} className="mb-3">
                {folder && (
                  <p
                    className="text-[10px] uppercase tracking-widest px-3 py-1 font-semibold"
                    style={{ color: 'rgba(255,255,255,0.18)' }}
                  >
                    {folder}
                  </p>
                )}
                {folderFiles.map((file) => (
                  <button
                    key={file.path}
                    onClick={() => fetchContent(file)}
                    title={file.name}
                    className="w-full text-left px-3 py-1.5 rounded-lg text-[13px] transition-colors truncate block"
                    style={
                      active?.path === file.path
                        ? {
                            background: 'rgba(255,255,255,0.07)',
                            color: 'rgba(255,255,255,0.9)',
                          }
                        : {
                            color: 'rgba(255,255,255,0.38)',
                          }
                    }
                  >
                    {displayName(file.name)}
                  </button>
                ))}
              </div>
            ))
          )}
        </div>
      </aside>

      {/* ── Content ─────────────────────────────────────── */}
      <main
        className="flex-1 flex flex-col overflow-hidden"
        style={{ background: '#0D0D2B' }}
      >
        {active ? (
          <>
            {/* File header bar */}
            <div
              className="h-11 flex items-center justify-between px-6 flex-shrink-0"
              style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}
            >
              <div className="flex items-center gap-3 min-w-0">
                <span
                  className="text-[11px] font-mono flex-shrink-0 px-1.5 py-0.5 rounded"
                  style={{
                    color: 'rgba(255,255,255,0.35)',
                    background: 'rgba(255,255,255,0.05)',
                  }}
                >
                  {active.ext}
                </span>
                <span
                  className="text-sm truncate"
                  style={{ color: 'rgba(255,255,255,0.5)' }}
                >
                  {active.path}
                </span>
              </div>
              <button
                onClick={copy}
                className="text-xs px-3 py-1.5 rounded-lg transition-colors flex-shrink-0 ml-4"
                style={{
                  border: '1px solid rgba(255,255,255,0.08)',
                  color: copied
                    ? 'rgba(100,255,150,0.8)'
                    : 'rgba(255,255,255,0.35)',
                }}
              >
                {copied ? '✓ Copiado' : 'Copiar'}
              </button>
            </div>

            {/* Document content */}
            <div className="flex-1 overflow-y-auto">
              {loadingContent ? (
                <div
                  className="p-8 text-sm"
                  style={{ color: 'rgba(255,255,255,0.15)' }}
                >
                  ...
                </div>
              ) : renderedHtml ? (
                <div
                  className="ops-prose p-8 max-w-3xl"
                  dangerouslySetInnerHTML={{ __html: renderedHtml }}
                />
              ) : (
                <pre
                  className="p-8 text-[13px] font-mono leading-relaxed whitespace-pre-wrap break-words max-w-4xl"
                  style={{ color: 'rgba(255,255,255,0.55)' }}
                >
                  {content}
                </pre>
              )}
            </div>
          </>
        ) : (
          <div
            className="flex-1 flex items-center justify-center text-sm select-none"
            style={{ color: 'rgba(255,255,255,0.12)' }}
          >
            Selecciona un archivo
          </div>
        )}
      </main>
    </div>
  )
}
