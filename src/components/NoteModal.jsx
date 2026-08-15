import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'

export default function NoteModal({ note, onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    if (note) {
      window.addEventListener('keydown', onKey)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [note, onClose])

  return (
    <AnimatePresence>
      {note && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-black/70 p-4 backdrop-blur-sm sm:items-center sm:p-6"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={`${note.title} note`}
        >
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            onClick={(e) => e.stopPropagation()}
            className="card-surface relative w-full max-w-xl rounded-2xl p-6 sm:p-8"
          >
            <button
              onClick={onClose}
              aria-label="Close note"
              className="absolute right-5 top-5 rounded-full border border-white/10 p-2 text-mist-light transition-colors hover:border-white/25 hover:text-white"
            >
              <X size={16} />
            </button>

            <div className="flex items-center gap-2 pr-10">
              <span className="rounded-full border border-white/10 px-2.5 py-1 font-mono text-[11px] text-mist-light">
                {note.tag}
              </span>
              <span className="font-mono text-[11px] text-mist-dim">{note.date}</span>
            </div>
            <h3 className="font-display mt-3 pr-10 text-xl font-semibold text-white sm:text-2xl">
              {note.title}
            </h3>

            <div className="mt-5 space-y-4">
              {(note.body ?? [note.excerpt]).map((paragraph, i) => (
                <p key={i} className="text-sm leading-relaxed text-mist">
                  {paragraph}
                </p>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
