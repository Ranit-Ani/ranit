import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle2, ExternalLink, Github, X } from 'lucide-react'

export default function ProjectModal({ project, onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    if (project) {
      window.addEventListener('keydown', onKey)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [project, onClose])

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm sm:p-6"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={`${project.name} details`}
        >
          {/* Card is height-capped to the viewport; only this element's body scrolls,
              so the overlay itself never needs to scroll and the close button stays put. */}
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            onClick={(e) => e.stopPropagation()}
            className="card-surface relative flex max-h-[85dvh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl"
          >
            <button
              onClick={onClose}
              aria-label="Close project details"
              className="absolute right-5 top-5 z-20 rounded-full border border-white/10 bg-ink/60 p-2 text-mist-light backdrop-blur-sm transition-colors hover:border-white/25 hover:text-white"
            >
              <X size={16} />
            </button>

            {/* Scrollable body — everything below (image + text) scrolls inside the
                card while the card itself stays fixed and fully on-screen. */}
            <div className="overflow-y-auto">
              {project.image && (
                <img
                  src={project.image}
                  alt={`${project.name} screenshot`}
                  className="h-48 w-full object-cover object-top sm:h-56"
                  loading="lazy"
                />
              )}

              <div className="p-6 sm:p-8">
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-signal-cyan">
                  Project
                </p>
                <h3 className="font-display mt-2 pr-10 text-2xl font-semibold text-white">
                  {project.name}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-mist">{project.description}</p>

                <div className="mt-5 flex flex-wrap gap-1.5">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-white/10 px-2.5 py-1 font-mono text-[11px] text-mist-light"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="mt-7 grid gap-6 sm:grid-cols-2">
                  <div>
                    <h4 className="font-display text-xs font-semibold uppercase tracking-wide text-mist-light">
                      Problem
                    </h4>
                    <p className="mt-2 text-sm leading-relaxed text-mist">{project.problem}</p>
                  </div>
                  <div>
                    <h4 className="font-display text-xs font-semibold uppercase tracking-wide text-mist-light">
                      Solution
                    </h4>
                    <p className="mt-2 text-sm leading-relaxed text-mist">{project.solution}</p>
                  </div>
                </div>

                <div className="mt-6">
                  <h4 className="font-display text-xs font-semibold uppercase tracking-wide text-mist-light">
                    Key Features
                  </h4>
                  <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                    {project.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm text-mist">
                        <CheckCircle2 size={15} className="mt-0.5 shrink-0 text-signal-violetSoft" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6">
                  <h4 className="font-display text-xs font-semibold uppercase tracking-wide text-mist-light">
                    Architecture
                  </h4>
                  <p className="mt-2 text-sm leading-relaxed text-mist">{project.architecture}</p>
                </div>

                <div className="mt-6 grid gap-6 sm:grid-cols-2">
                  <div>
                    <h4 className="font-display text-xs font-semibold uppercase tracking-wide text-mist-light">
                      Challenges
                    </h4>
                    <p className="mt-2 text-sm leading-relaxed text-mist">{project.challenges}</p>
                  </div>
                  <div>
                    <h4 className="font-display text-xs font-semibold uppercase tracking-wide text-mist-light">
                      What I Learned
                    </h4>
                    <p className="mt-2 text-sm leading-relaxed text-mist">{project.learned}</p>
                  </div>
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-white/[0.06] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-white/[0.1]"
                  >
                    <Github size={16} />
                    View on GitHub
                  </a>
                  {project.demo ? (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:border-white/25"
                    >
                      <ExternalLink size={16} />
                      Live Demo
                    </a>
                  ) : (
                    <span className="inline-flex items-center gap-2 rounded-full border border-white/5 px-4 py-2.5 text-sm font-medium text-mist-dim">
                      Live demo coming soon
                    </span>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}