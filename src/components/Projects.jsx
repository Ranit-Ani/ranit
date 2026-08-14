import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, ExternalLink, Github } from 'lucide-react'
import { projects } from '../data/projects.js'
import ProjectModal from './ProjectModal.jsx'
import SectionIndex from './ui/SectionIndex.jsx'
import GlowCard from './ui/GlowCard.jsx'

const ACCENTS = {
  violet: {
    header: 'from-signal-violet/25 via-signal-violet/5',
    border: 'hover:border-signal-violet/50 hover:shadow-[0_0_40px_-14px_rgba(124,92,252,0.55)]',
    button: 'hover:bg-signal-violet/20 hover:text-white',
    rgb: '124,92,252',
  },
  cyan: {
    header: 'from-signal-cyan/25 via-signal-cyan/5',
    border: 'hover:border-signal-cyan/50 hover:shadow-[0_0_40px_-14px_rgba(34,211,238,0.55)]',
    button: 'hover:bg-signal-cyan/20 hover:text-white',
    rgb: '34,211,238',
  },
  amber: {
    header: 'from-signal-amber/25 via-signal-amber/5',
    border: 'hover:border-signal-amber/50 hover:shadow-[0_0_40px_-14px_rgba(245,165,36,0.55)]',
    button: 'hover:bg-signal-amber/20 hover:text-white',
    rgb: '245,165,36',
  },
}

export default function Projects() {
  const [activeProject, setActiveProject] = useState(null)

  return (
    <section id="projects" className="relative px-6 py-28 md:px-10">
      <SectionIndex number="03" label="Projects" />
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-signal-cyan">
              Projects
            </p>
            <h2 className="font-display mt-3 text-3xl font-semibold text-white sm:text-4xl">
              Things I&rsquo;ve built.
            </h2>
          </div>
          <p className="max-w-sm text-sm text-mist">
            A mix of academic and personal projects across the stack &mdash; more get added as
            I ship them.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => {
            const accent = ACCENTS[project.accent]
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
              >
                <GlowCard
                  as="article"
                  color={accent.rgb}
                  className={`group card-surface overflow-hidden rounded-2xl border border-transparent transition-all duration-300 ${accent.border}`}
                >
                  <div
                    className={`relative flex h-40 items-center justify-center overflow-hidden bg-gradient-to-br ${accent.header} to-transparent`}
                  >
                    <div className="dot-pattern absolute inset-0 opacity-40 transition-transform duration-500 group-hover:scale-110" />
                    <span className="font-mono text-4xl font-semibold text-white/20">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="font-display text-lg font-semibold text-white">
                      {project.name}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-mist">{project.tagline}</p>

                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {project.stack.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-full border border-white/10 px-2.5 py-1 font-mono text-[11px] text-mist-light"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="mt-auto flex items-center gap-2 pt-6">
                      <button
                        onClick={() => setActiveProject(project)}
                        className={`inline-flex flex-1 items-center justify-center gap-1.5 rounded-full bg-white/[0.06] px-4 py-2.5 text-sm font-medium text-white transition-colors ${accent.button}`}
                      >
                        View Details
                        <ArrowUpRight size={15} />
                      </button>
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`${project.name} GitHub repository`}
                        className="rounded-full border border-white/10 p-2.5 text-mist-light transition-colors hover:border-white/25 hover:text-white"
                      >
                        <Github size={16} />
                      </a>
                      {project.demo && (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noreferrer"
                          aria-label={`${project.name} live demo`}
                          className="rounded-full border border-white/10 p-2.5 text-mist-light transition-colors hover:border-white/25 hover:text-white"
                        >
                          <ExternalLink size={16} />
                        </a>
                      )}
                    </div>
                  </div>
                </GlowCard>
              </motion.div>
            )
          })}
        </div>
      </div>

      <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
    </section>
  )
}