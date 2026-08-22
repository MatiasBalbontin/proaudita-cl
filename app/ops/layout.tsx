export default function OpsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#08081F]" style={{ fontFamily: 'var(--font-inter), sans-serif' }}>
      {children}
    </div>
  )
}
