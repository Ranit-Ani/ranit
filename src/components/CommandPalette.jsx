import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowRight,
  Briefcase,
  Command,
  FileText,
  Github,
  GraduationCap,
  Home,
  Layers,
  Linkedin,
  Mail,
  Map,
  NotebookText,
  User,
} from 'lucide-react'

const COMMANDS = [
  { id: 'home', label: 'Go to Home', icon: Home, kind: 'section' },
  { id: 'about', label: 'Go to About', icon: User, kind: 'section' },
  { id: 'skills', label: 'Go to Skills', icon: Layers, kind: 'section' },
  { id: 'projects', label: 'Go to Projects', icon: Briefcase, kind: 'section' },
  { id: 'journey', label: 'Go to Journey', icon: Map, kind: 'section' },
  { id: 'notes', label: 'Go to Notes', icon: NotebookText, kind: 'section' },
  { id: 'github', label: 'Go to GitHub', icon: Github, kind: 'section' },
  { id: 'education', label: 'Go to Education', icon: GraduationCap, kind: 'section' },
  { id: 'contact', label: 'Go to Contact', icon: Mail, kind: 'section' },
  {
    id: 'resume',
    label: 'Download Resume',
    icon: FileText,
    kind: 'link',
    href: '/resume.pdf',
  },
  {
    id: 'github-profile',
    label: 'Open GitHub Profile',
    icon: Github,
    kind: 'link',
    href: 'https://github.com/Ranit-Ani',
  },
  {
    id: 'linkedin-profile',
    label: 'Open LinkedIn Profile',
    icon: Linkedin,
    kind: 'link',
    href: 'https://www.linkedin.com/in/ranit-ani',
  },
  {
    id: 'email',
    label: 'Send an Email',
    icon: Mail,
    kind: 'link',
    href: 'mailto:pramanickranit356@gmail.com',
  },
]

export default function CommandPalette() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [activeIndex, setActiveIndex] = useState(0)

  const filtered = useMemo(() => {
    if (!query.trim()) return COMMANDS
    const q = query.toLowerCase()
    return COMMANDS.filter((c) => c.label.toLowerCase().includes(q))
  }, [query])

  useEffect(() => {
    const onKey = (e) => {
      const isTypingField =
        e.target instanceof HTMLElement &&
        ['INPUT', 'TEXTAREA'].includes(e.target.tagName) &&
        !open

      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k' && !isTypingField) {
        e.preventDefault()
        setOpen((v) => !v)
        return
      }
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  useEffect(() => {
    if (!open) {
      setQuery('')
      setActiveIndex(0)
    } else {
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    setActiveIndex(0)
  }, [query])

  const runCommand = (cmd) => {
    if (cmd.kind === 'section') {
      document.getElementById(cmd.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    } else {
      window.open(cmd.href, cmd.href.startsWith('mailto:') ? '_self' : '_blank', 'noreferrer')
    }
    setOpen(false)
  }

  const handleKeyNav = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActiveIndex((i) => Math.min(i + 1, filtered.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActiveIndex((i) => Math.max(i - 1, 0))
    } else if (e.key === 'Enter' && filtered[activeIndex]) {
      e.preventDefault()
      runCommand(filtered[activeIndex])
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="glass fixed bottom-6 right-6 z-40 hidden items-center gap-2 rounded-full px-4 py-2.5 font-mono text-xs text-mist-light shadow-card transition-colors hover:text-white md:flex"
        aria-label="Open command palette"
      >
        <Command size={14} />
        <span className="rounded border border-white/15 px-1.5 py-0.5">&#8984;K</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] flex items-start justify-center bg-black/70 p-4 pt-24 backdrop-blur-sm"
            onClick={() => setOpen(false)}
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
          >
            <motion.div
              initial={{ opacity: 0, y: -12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.18, ease: 'easeOut' }}
              onClick={(e) => e.stopPropagation()}
              className="glass w-full max-w-lg overflow-hidden rounded-2xl shadow-card"
            >
              <div className="flex items-center gap-3 border-b border-white/[0.07] px-4 py-3">
                <Command size={16} className="text-mist-dim" />
                <input
                  autoFocus
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleKeyNav}
                  placeholder="Jump to a section or action..."
                  className="w-full bg-transparent text-sm text-white outline-none placeholder:text-mist-dim"
                  aria-label="Search commands"
                />
                <kbd className="rounded border border-white/10 px-1.5 py-0.5 font-mono text-[10px] text-mist-dim">
                  esc
                </kbd>
              </div>

              <ul className="max-h-80 overflow-y-auto overscroll-contain p-2">
                {filtered.length === 0 && (
                  <li className="px-3 py-6 text-center text-sm text-mist-dim">No matches.</li>
                )}
                {filtered.map((cmd, i) => (
                  <li key={cmd.id}>
                    <button
                      onClick={() => runCommand(cmd)}
                      onMouseEnter={() => setActiveIndex(i)}
                      className={`flex w-full items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition-colors ${
                        i === activeIndex ? 'bg-white/[0.07] text-white' : 'text-mist-light'
                      }`}
                    >
                      <span className="flex items-center gap-3">
                        <cmd.icon size={15} className="text-signal-violetSoft" />
                        {cmd.label}
                      </span>
                      {i === activeIndex && <ArrowRight size={14} className="text-mist-dim" />}
                    </button>
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}