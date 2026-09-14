import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Download, Github, Linkedin, Mail, Sparkles } from 'lucide-react'
import { useMagnetic } from '../hooks/useMagnetic.js'

const TERMINAL_LINES = [
  { text: '$ whoami', type: 'cmd' },
  { text: 'ranit_pramanick — software developer', type: 'out' },
  { text: '$ cat focus.json', type: 'cmd' },
  {
    text: '{ "stack": ["React", "Node.js", "Python", "MongoDB"], "status": "building" }',
    type: 'out',
  },
  { text: '$ npm run ship', type: 'cmd' },
  { text: '✓ compiled successfully', type: 'success' },
]

const BADGES = [
  { label: 'React', style: '-top-5 -left-6', delay: 0 },
  { label: 'Node.js', style: '-top-6 -right-8', delay: 0.6 },
  { label: 'MongoDB', style: '-bottom-6 -left-8', delay: 1.1 },
  { label: 'Python', style: '-bottom-5 -right-6', delay: 1.6 },
]

function Terminal() {
  const [lineIndex, setLineIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const cardRef = useRef(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })

  useEffect(() => {
    if (lineIndex >= TERMINAL_LINES.length) return
    const current = TERMINAL_LINES[lineIndex].text
    if (charIndex < current.length) {
      const t = setTimeout(() => setCharIndex((c) => c + 1), 18)
      return () => clearTimeout(t)
    }
    const t = setTimeout(() => {
      setLineIndex((l) => l + 1)
      setCharIndex(0)
    }, 420)
    return () => clearTimeout(t)
  }, [charIndex, lineIndex])

  const handleMouseMove = (e) => {
    const rect = cardRef.current?.getBoundingClientRect()
    if (!rect) return
    const px = (e.clientX - rect.left) / rect.width - 0.5
    const py = (e.clientY - rect.top) / rect.height - 0.5
    setTilt({ x: py * -6, y: px * 8 })
  }

  const colorFor = (type) =>
    type === 'cmd' ? 'text-signal-cyan' : type === 'success' ? 'text-emerald-400' : 'text-mist-light'

  return (
    <div className="relative mx-auto w-full max-w-md md:mx-0" onMouseLeave={() => setTilt({ x: 0, y: 0 })}>
      {BADGES.map((b) => (
        <motion.div
          key={b.label}
          className={`absolute z-20 hidden select-none rounded-full border border-white/10 bg-ink-800/80 px-3 py-1.5 font-mono text-xs text-mist-light shadow-glow backdrop-blur md:block ${b.style}`}
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 5, delay: b.delay, repeat: Infinity, ease: 'easeInOut' }}
        >
          {b.label}
        </motion.div>
      ))}

      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        style={{ transform: `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` }}
        className="card-surface shadow-card relative z-10 overflow-hidden rounded-2xl transition-transform duration-200 ease-out"
      >
        <div className="flex items-center gap-1.5 border-b border-white/[0.06] px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
          <span className="ml-3 font-mono text-xs text-mist-dim">ranit@dev — zsh</span>
        </div>
        <div className="min-h-[220px] space-y-2 p-5 font-mono text-[13px] leading-relaxed">
          {TERMINAL_LINES.slice(0, lineIndex).map((line, i) => (
            <p key={i} className={colorFor(line.type)}>
              {line.text}
            </p>
          ))}
          {lineIndex < TERMINAL_LINES.length && (
            <p className={colorFor(TERMINAL_LINES[lineIndex].type)}>
              {TERMINAL_LINES[lineIndex].text.slice(0, charIndex)}
              <span className="ml-0.5 inline-block h-4 w-2 animate-blink bg-signal-cyan align-middle" />
            </p>
          )}
        </div>
      </motion.div>
    </div>
  )
}

function MagneticLink({ className, children, ...rest }) {
  const ref = useMagnetic(0.25)
  return (
    <a ref={ref} className={className} {...rest}>
      {children}
    </a>
  )
}

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center px-6 pb-16 pt-32 md:px-10"
    >
      <div className="mx-auto grid w-full max-w-6xl items-center gap-14 md:grid-cols-2 md:gap-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 font-mono text-xs text-signal-violetSoft">
            <Sparkles size={13} />
            Available for opportunities
          </span>

          <h1 className="font-display mt-6 text-4xl font-semibold leading-[1.08] text-white sm:text-5xl lg:text-6xl">
            Building digital experiences with{' '}
            <span className="text-gradient">code &amp; creativity.</span>
          </h1>

          <p className="mt-6 max-w-lg text-base leading-relaxed text-mist sm:text-lg">
            I&rsquo;m Ranit Pramanick, a BCA student and aspiring software developer. I build
            real-world web applications, explore backend systems and databases, and I&rsquo;m
            slowly getting my hands dirty with AI/ML along the way.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <MagneticLink
              href="#projects"
              onClick={(e) => {
                e.preventDefault()
                document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="group inline-flex items-center gap-2 rounded-full bg-signal-violet px-5 py-3 text-sm font-semibold text-white shadow-glow transition-transform hover:-translate-y-0.5"
            >
              View My Projects
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
            </MagneticLink>
            <MagneticLink
              href="#contact"
              onClick={(e) => {
                e.preventDefault()
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="rounded-full border border-white/10 px-5 py-3 text-sm font-semibold text-white transition-colors hover:border-white/25 hover:bg-white/[0.04]"
            >
              Contact Me
            </MagneticLink>
            <MagneticLink
              href="/resume.pdf"
              download
              className="inline-flex items-center gap-2 rounded-full border border-white/10 px-5 py-3 text-sm font-semibold text-mist-light transition-colors hover:border-white/25 hover:bg-white/[0.04] hover:text-white"
            >
              <Download size={16} />
              Resume
            </MagneticLink>
          </div>

          <div className="mt-8 flex items-center gap-4 text-mist">
            <a
              href="https://github.com/Ranit-Ani"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub profile"
              className="rounded-lg p-2 transition-colors hover:bg-white/[0.06] hover:text-white"
            >
              <Github size={19} />
            </a>
            <a
              href="https://www.linkedin.com/in/ranit-ani"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn profile"
              className="rounded-lg p-2 transition-colors hover:bg-white/[0.06] hover:text-white"
            >
              <Linkedin size={19} />
            </a>
            <a
              href="mailto:pramanickranit356@gmail.com"
              aria-label="Send an email"
              className="rounded-lg p-2 transition-colors hover:bg-white/[0.06] hover:text-white"
            >
              <Mail size={19} />
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
        >
          <Terminal />
        </motion.div>
      </div>
    </section>
  )
}