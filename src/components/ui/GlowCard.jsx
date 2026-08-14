import { useRef } from 'react'

/**
 * Wraps children in a card that tracks the cursor and renders a soft
 * radial glow beneath the pointer on hover. Mouse position is written
 * straight to CSS custom properties (no React state) so it stays cheap
 * even with many cards on screen.
 */
export default function GlowCard({ as: Tag = 'div', color = '124,92,252', className = '', children, ...rest }) {
  const ref = useRef(null)

  const handleMouseMove = (e) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    el.style.setProperty('--glow-x', `${e.clientX - rect.left}px`)
    el.style.setProperty('--glow-y', `${e.clientY - rect.top}px`)
  }

  return (
    <Tag
      ref={ref}
      onMouseMove={handleMouseMove}
      className={`group/glow relative ${className}`}
      style={{ '--glow-color': color }}
      {...rest}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover/glow:opacity-100"
        style={{
          background:
            'radial-gradient(420px circle at var(--glow-x, 50%) var(--glow-y, 50%), rgba(var(--glow-color), 0.14), transparent 65%)',
        }}
      />
      <div className="relative z-[1] flex h-full flex-col">{children}</div>
    </Tag>
  )
}
