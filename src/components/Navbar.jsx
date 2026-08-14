import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Download, Menu, X } from 'lucide-react'
import { useActiveSection } from '../hooks/useActiveSection.js'

const LINKS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'journey', label: 'Journey' },
  { id: 'notes', label: 'Notes' },
  { id: 'contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const active = useActiveSection(LINKS.map((l) => l.id))

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleClick = (id) => (e) => {
    e.preventDefault()
    setOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? 'py-3' : 'py-5'
      }`}
    >
      <div
        className={`mx-auto flex max-w-6xl items-center justify-between rounded-2xl px-5 transition-all duration-300 ${
          scrolled ? 'glass shadow-card py-2.5' : 'py-1'
        }`}
      >
        <a
          href="#home"
          onClick={handleClick('home')}
          className="font-mono text-lg font-semibold tracking-tight text-white"
        >
          <span className="text-signal-violet">&lt;</span>Ranit
          <span className="text-signal-violet">/&gt;</span>
        </a>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {LINKS.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={handleClick(link.id)}
              aria-current={active === link.id ? 'true' : undefined}
              className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                active === link.id ? 'text-white' : 'text-mist hover:text-white'
              }`}
            >
              {active === link.id && (
                <motion.span
                  layoutId="nav-pill"
                  className="absolute inset-0 rounded-full bg-white/[0.06] ring-1 ring-white/10"
                  transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                />
              )}
              <span className="relative">{link.label}</span>
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <a
            href="/resume.pdf"
            download
            className="inline-flex items-center gap-1.5 rounded-full border border-white/10 px-4 py-2 text-sm font-medium text-white transition-colors hover:border-white/25 hover:bg-white/[0.04]"
          >
            <Download size={14} />
            Resume
          </a>
          <a
            href="#contact"
            onClick={handleClick('contact')}
            className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-medium text-white transition-colors hover:border-signal-violet/50 hover:bg-signal-violet/10"
          >
            Let&rsquo;s talk
          </a>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className="rounded-lg border border-white/10 p-2 text-white md:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="glass mx-4 mt-2 flex flex-col gap-1 rounded-2xl p-3 md:hidden"
            aria-label="Mobile"
          >
            {LINKS.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={handleClick(link.id)}
                className={`rounded-xl px-4 py-3 text-sm font-medium ${
                  active === link.id ? 'bg-white/[0.06] text-white' : 'text-mist'
                }`}
              >
                {link.label}
              </a>
            ))}
            <a
              href="/resume.pdf"
              download
              className="mt-1 flex items-center gap-1.5 rounded-xl border-t border-white/[0.06] px-4 py-3 text-sm font-medium text-mist"
            >
              <Download size={14} />
              Download Resume
            </a>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
