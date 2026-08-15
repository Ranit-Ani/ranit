export default function SectionKicker({ index, label, className = '' }) {
  return (
    <p
      className={`flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-signal-cyan ${className}`}
    >
      {typeof index === 'number' && (
        <span className="text-mist-dim">{String(index).padStart(2, '0')} —</span>
      )}
      {label}
    </p>
  )
}
