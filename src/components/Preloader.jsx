import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const BOOT_LINES = ['booting portfolio...', 'loading modules...', 'ready.']

export default function Preloader() {
  const [visible, setVisible] = useState(false)
  const [lineIndex, setLineIndex] = useState(0)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const alreadySeen = sessionStorage.getItem('preloader-seen')

    if (prefersReduced || alreadySeen) return

    setVisible(true)
    sessionStorage.setItem('preloader-seen', 'true')

    const interval = setInterval(() => {
      setLineIndex((i) => {
        if (i >= BOOT_LINES.length - 1) {
          clearInterval(interval)
          setTimeout(() => setVisible(false), 350)
          return i
        }
        return i + 1
      })
    }, 280)

    return () => clearInterval(interval)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-ink"
        >
          <div className="font-mono text-sm text-mist-light">
            {BOOT_LINES.slice(0, lineIndex + 1).map((line, i) => (
              <p key={line} className={i === lineIndex ? 'text-signal-cyan' : 'text-mist-dim'}>
                <span className="text-signal-violet">$</span> {line}
                {i === lineIndex && (
                  <span className="ml-1 inline-block h-3.5 w-1.5 animate-blink bg-signal-cyan align-middle" />
                )}
              </p>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
