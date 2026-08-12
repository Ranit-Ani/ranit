import { motion } from 'framer-motion'
import { Github, GitFork, Star } from 'lucide-react'
import { projects } from '../data/projects.js'

const GITHUB_URL = 'https://github.com/YOUR_USERNAME'

export default function GithubSection() {
  return (
    <section className="relative px-6 py-24 md:px-10">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5 }}
          className="card-surface flex flex-col gap-8 rounded-2xl p-8 md:flex-row md:items-center md:justify-between"
        >
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-signal-cyan">
              GitHub
            </p>
            <h2 className="font-display mt-3 text-2xl font-semibold text-white sm:text-3xl">
              Most of my code lives here.
            </h2>
            <p className="mt-3 max-w-md text-sm text-mist">
              Repository counts and contribution activity are intentionally left out until this
              section is connected to the live GitHub API &mdash; no invented statistics.
            </p>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-white/[0.06] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-white/[0.1]"
            >
              <Github size={16} />
              View GitHub Profile
            </a>
          </div>

          <div className="grid w-full max-w-xs grid-cols-1 gap-3 sm:grid-cols-2 md:w-auto">
            {projects.map((p) => (
              <a
                key={p.id}
                href={p.github}
                target="_blank"
                rel="noreferrer"
                className="rounded-xl border border-white/10 p-4 transition-colors hover:border-signal-violet/40"
              >
                <p className="truncate font-mono text-xs text-white">{p.name}</p>
                <div className="mt-3 flex items-center gap-3 text-mist-dim">
                  <span className="flex items-center gap-1 text-[11px]">
                    <Star size={12} /> &mdash;
                  </span>
                  <span className="flex items-center gap-1 text-[11px]">
                    <GitFork size={12} /> &mdash;
                  </span>
                </div>
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
