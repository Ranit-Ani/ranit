import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowRight,
  Download,
  ExternalLink,
  Github,
  Linkedin,
  Mail,
  Search,
  Terminal as TerminalIcon,
} from 'lucide-react'

const SECTION_COMMANDS = [
  { id: 'home', label: 'Home', hint: 'Back to top' },
  { id: 'about', label: 'About', hint: 'Who I am' },
  { id: 'skills', label: 'Skills', hint: 'Toolbox' },
  { id: 'projects', label: 'Projects', hint: 'Things I\u2019ve built' },
  { id: 'journey', label: 'Journey', hint: 'Where I\u2019m headed' },
  { id: 'github', label: 'GitHub Activity', hint: 'Live stats' },
  { id: 'education', label: 'Education', hint: 'BCA' },
  { id: 'contact', label: 'Contact', hint: 'Get in touch' },
]

const LINK_COMMANDS = [
  {
    id: 'link-github',
    label: 'Open GitHub Profile',
    hint: 'github.com/Ranit-Ani',
    icon: Github,
    href: 'https://github.com/Ranit-Ani',
  },
  {
    id: 'link-linkedin',
    label: 'Open LinkedIn',
    hint: 'linkedin.com/in/ranit-ani',
    icon: Linkedin,
    href: 'https://www.linkedin.com/in/ranit-ani',
  },
  {
    id: 'link-email',
    label: 'Email Me',
    hint: 'pramanickranit356@gmail.com',
    icon: Mail,
    href: 'mailto:pramanickranit356@gmail.com',
  },
  {
    id: 'link-resume',
    label: 'Download Resume',
    hint: '/resume.pdf',
    icon: Download,
    href: '/resume.pdf',
    download: true,
  },
]

export default function CommandPalette() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [highlight, setHighlight] = useState(0)
  const inputRef = useRef(null)

  useEffect(() => {
    const onKeyDown = (e) => {
      const isToggle = (e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k'
      if (isToggle) {
        e.preventDefault()
        setOpen((v) => !v)
        return
      }
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  useEffect(() => {
    if (open) {
      setQuery('')
      setHighlight(0)
      const t = setTimeout(() => inputRef.current?.focus(), 30)
      document.body.style.overflow = 'hidden'
      return () => {
        clearTimeout(t)
        document.body.style.overflow = ''
      }
    }
  }, [open])

  const results = useMemo(() => {
    const all = [
      ...SECTION_COMMANDS.map((c) => ({ ...c, type: 'section' })),
      ...LINK_COMMANDS.map((c) => ({ ...c, type: 'link' })),
    ]
    if (!query.trim()) return all
    const q = query.toLowerCase()
    return all.filter(
      (c) => c.label.toLowerCase().includes(q) || c.hint?.toLowerCase().includes(q)
    )
  }, [query])

  useEffect(() => {
    setHighlight(0)
  }, [query])

  const runCommand = (cmd) => {
    if (cmd.type === 'section') {
      document.getElementById(cmd.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    } else if (cmd.type === 'link') {
      const a = document.createElement('a')
      a.href = cmd.href
      if (cmd.href.startsWith('http') || cmd.href.startsWith('mailto')) {
        a.target = '_blank'
        a.rel = 'noreferrer'
      }
      if (cmd.download) a.setAttribute('download', '')
      document.body.appendChild(a)
      a.click()
      a.remove()
    }
    setOpen(false)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setHighlight((h) => Math.min(h + 1, results.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setHighlight((h) => Math.max(h - 1, 0))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      if (results[highlight]) runCommand(results[highlight])
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label="Open command palette"
        className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 font-mono text-xs text-mist-dim transition-colors hover:border-white/20 hover:text-white md:inline-flex"
      >
        <Search size={13} />
        Jump to
        <kbd className="ml-1 rounded border border-white/10 bg-white/[0.05] px-1.5 py-0.5 text-[10px] text-mist-light">
          &#8984;K
        </kbd>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-[200] flex items-start justify-center bg-black/70 p-4 pt-24 backdrop-blur-sm sm:pt-32"
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
              className="card-surface shadow-card w-full max-w-lg overflow-hidden rounded-2xl"
            >
              <div className="flex items-center gap-3 border-b border-white/[0.06] px-4 py-3.5">
                <TerminalIcon size={16} className="shrink-0 text-signal-cyan" />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type a command or search..."
                  className="w-full bg-transparent font-mono text-sm text-white outline-none placeholder:text-mist-dim"
                />
                <kbd className="hidden rounded border border-white/10 px-1.5 py-0.5 text-[10px] text-mist-dim sm:block">
                  esc
                </kbd>
              </div>

              <div className="max-h-80 overflow-y-auto p-2">
                {results.length === 0 && (
                  <p className="px-3 py-8 text-center text-sm text-mist-dim">No matches.</p>
                )}
                {results.map((cmd, i) => {
                  const Icon = cmd.icon ?? ArrowRight
                  return (
                    <button
                      key={cmd.id}
                      onClick={() => runCommand(cmd)}
                      onMouseEnter={() => setHighlight(i)}
                      className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors ${
                        highlight === i ? 'bg-white/[0.07] text-white' : 'text-mist-light'
                      }`}
                    >
                      <Icon size={15} className="shrink-0 text-signal-violetSoft" />
                      <span className="flex-1 text-sm">{cmd.label}</span>
                      <span className="font-mono text-xs text-mist-dim">{cmd.hint}</span>
                      {cmd.type === 'link' && !cmd.download && (
                        <ExternalLink size={13} className="text-mist-dim" />
                      )}
                    </button>
                  )
                })}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
