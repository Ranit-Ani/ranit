import { useRef, useState } from 'react'

/**
 * Wraps children in a card-surface element with a soft radial glow that
 * follows the cursor on hover — extends the Hero terminal's tilt/glow
 * language to Project and Skill cards for a more unified feel.
 */
export default function SpotlightCard({ children, className = '', as: Tag = 'div', ...rest }) {
  const ref = useRef(null)
  const [pos, setPos] = useState({ x: 50, y: 50 })
  const [active, setActive] = useState(false)

  const handleMove = (e) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    setPos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    })
  }

  return (
    <Tag
      ref={ref}
      onMouseMove={handleMove}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      className={`card-surface group/spotlight relative overflow-hidden rounded-2xl ${className}`}
      {...rest}
    >
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-300 group-hover/spotlight:opacity-100"
        style={{
          opacity: active ? 1 : 0,
          background: `radial-gradient(280px circle at ${pos.x}% ${pos.y}%, rgba(124,92,252,0.14), transparent 70%)`,
        }}
      />
      <div className="relative z-10 flex h-full flex-col">{children}</div>
    </Tag>
  )
}
