'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function OpsLogin() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await fetch('/api/ops-auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })
      if (!res.ok) {
        setError('Contraseña incorrecta')
        return
      }
      router.push('/ops/dashboard')
    } catch {
      setError('Error de conexión')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <form onSubmit={handleSubmit} className="w-full max-w-[280px]">
        <div className="mb-8 flex items-center gap-3">
          <div className="w-6 h-6 rounded-md bg-[#0019FF] flex-shrink-0" />
          <span className="text-[11px] font-semibold text-white/30 uppercase tracking-widest">
            Proaudita Ops
          </span>
        </div>

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Contraseña"
          autoFocus
          autoComplete="current-password"
          className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 focus:outline-none focus:border-[#0019FF]/50 focus:bg-white/[0.06] transition mb-3"
        />

        {error && (
          <p className="text-red-400/80 text-xs mb-3">{error}</p>
        )}

        <button
          type="submit"
          disabled={loading || !password}
          className="w-full bg-[#0019FF] text-white text-sm font-semibold py-3 rounded-xl hover:bg-[#1A1A5E] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        >
          {loading ? '...' : 'Entrar'}
        </button>
      </form>
    </div>
  )
}
