import { motion } from 'framer-motion'
import { GraduationCap } from 'lucide-react'
import SectionIndex from './ui/SectionIndex.jsx'

export default function Education() {
  return (
    <section id="education" className="relative px-6 pb-4 pt-4 md:px-10">
      <SectionIndex number="06" label="Education" />
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.4 }}
          className="card-surface flex flex-col gap-4 rounded-2xl p-6 sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="flex items-start gap-4">
            <span className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-signal-violet/30 bg-signal-violet/10 text-signal-violetSoft">
              <GraduationCap size={18} />
            </span>
            <div>
              <h3 className="font-display text-base font-semibold text-white">
                Bachelor of Computer Applications (BCA)
              </h3>
              <p className="mt-1 text-sm text-mist">
                College / University name — Brainware University · West Bengal, India
              </p>
            </div>
          </div>
          <span className="inline-flex w-fit items-center rounded-full border border-emerald-400/25 bg-emerald-400/10 px-3 py-1.5 font-mono text-xs text-emerald-400">
            In progress · 2024 — 2028
          </span>
        </motion.div>
      </div>
    </section>
  )
}
