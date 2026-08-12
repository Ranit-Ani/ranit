import { Github, Linkedin, Mail } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="relative border-t border-white/[0.06] px-6 py-10 md:px-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 text-center sm:flex-row sm:justify-between sm:text-left">
        <div>
          <p className="font-mono text-sm font-semibold text-white">Ranit Pramanick</p>
          <p className="mt-1 text-xs text-mist-dim">Designed &amp; built with code.</p>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="https://github.com/YOUR_USERNAME"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="rounded-lg p-2 text-mist-light transition-colors hover:bg-white/[0.06] hover:text-white"
          >
            <Github size={17} />
          </a>
          <a
            href="https://linkedin.com/in/YOUR_USERNAME"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="rounded-lg p-2 text-mist-light transition-colors hover:bg-white/[0.06] hover:text-white"
          >
            <Linkedin size={17} />
          </a>
          <a
            href="mailto:ranit@example.com"
            aria-label="Email"
            className="rounded-lg p-2 text-mist-light transition-colors hover:bg-white/[0.06] hover:text-white"
          >
            <Mail size={17} />
          </a>
        </div>

        <p className="text-xs text-mist-dim">&copy; 2026 Ranit Pramanick</p>
      </div>
    </footer>
  )
}
