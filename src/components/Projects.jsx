import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, ExternalLink, Github } from 'lucide-react'
import { projects } from '../data/projects.js'
import ProjectModal from './ProjectModal.jsx'

const ACCENTS = {
  violet: 'from-signal-violet/25 via-signal-violet/5',
  cyan: 'from-signal-cyan/25 via-signal-cyan/5',
  amber: 'from-signal-amber/25 via-signal-amber/5',
}

export default function Projects() {
  const [activeProject, setActiveProject] = useState(null)

  return (
    <section id="projects" className="relative px-6 py-28 md:px-10">
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
          {projects.map((project, i) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className="group card-surface relative flex flex-col overflow-hidden rounded-2xl transition-colors hover:border-white/20"
            >
              <div
                className={`relative flex h-40 items-center justify-center overflow-hidden bg-gradient-to-br ${ACCENTS[project.accent]} to-transparent`}
              >
                <div className="dot-pattern absolute inset-0 opacity-40 transition-transform duration-500 group-hover:scale-110" />
                <span className="font-mono text-4xl font-semibold text-white/20">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-6">
                <h3 className="font-display text-lg font-semibold text-white">{project.name}</h3>
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
                    className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full bg-white/[0.06] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-white/[0.1]"
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
            </motion.article>
          ))}
        </div>
      </div>

      <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
    </section>
  )
}