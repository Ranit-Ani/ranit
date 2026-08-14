import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const BOOT_LINES = ['booting portfolio...', 'mounting sections...', 'ready.']

export default function Preloader({ onDone }) {
  const [visible, setVisible] = useState(true)
  const [lineIndex, setLineIndex] = useState(0)

  useEffect(() => {
    if (lineIndex >= BOOT_LINES.length - 1) {
      const exitTimer = setTimeout(() => setVisible(false), 350)
      return () => clearTimeout(exitTimer)
    }
    const t = setTimeout(() => setLineIndex((i) => i + 1), 260)
    return () => clearTimeout(t)
  }, [lineIndex])

  return (
    <AnimatePresence onExitComplete={onDone}>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: 'easeInOut' }}
          className="fixed inset-0 z-[300] flex items-center justify-center bg-ink"
        >
          <div className="flex flex-col items-center gap-3">
            <div className="card-surface flex min-w-[220px] items-center gap-1.5 rounded-xl px-4 py-3">
              <span className="h-2 w-2 rounded-full bg-[#ff5f57]" />
              <span className="h-2 w-2 rounded-full bg-[#febc2e]" />
              <span className="h-2 w-2 rounded-full bg-[#28c840]" />
              <span className="ml-2 font-mono text-xs text-mist-dim">ranit@dev</span>
            </div>
            <p className="min-h-[20px] font-mono text-sm text-signal-cyan">
              {BOOT_LINES[lineIndex]}
              <span className="ml-0.5 inline-block h-4 w-2 animate-blink bg-signal-cyan align-middle" />
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
