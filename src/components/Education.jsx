import { motion } from 'framer-motion'
import { GraduationCap } from 'lucide-react'

// Edit freely — add/remove entries here and the section updates automatically.
const EDUCATION = [
  {
    title: 'Bachelor of Computer Applications (BCA) Honours',
    school: 'Brainware University · West Bengal, India',
    meta: 'CGPA: 9.3',
    status: 'In progress',
    period: '2024 — 2028',
  },
  {
    title: 'Class XII (Higher Secondary)',
    school: 'Nandanpur Rupchand Academy · WBCHSE',
    meta: '80%',
    status: 'Completed',
    period: '2024',
  },
  {
    title: 'Class X (Secondary)',
    school: 'Harishchak High School · WBBSE',
    meta: '62.3%',
    status: 'Completed',
    period: '2022',
  },
]

export default function Education() {
  return (
    <section id="education" className="relative px-6 pb-4 pt-4 md:px-10">
      <div className="mx-auto max-w-6xl space-y-4">
        {EDUCATION.map((edu, i) => (
          <motion.div
            key={edu.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.4, delay: i * 0.06 }}
            className="card-surface flex flex-col gap-4 rounded-2xl p-6 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="flex items-start gap-4">
              <span className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-signal-violet/30 bg-signal-violet/10 text-signal-violetSoft">
                <GraduationCap size={18} />
              </span>
              <div>
                <h3 className="font-display text-base font-semibold text-white">{edu.title}</h3>
                <p className="mt-1 text-sm text-mist">{edu.school}</p>
                <p className="mt-1 font-mono text-xs text-mist-dim">{edu.meta}</p>
              </div>
            </div>
            <span
              className={`inline-flex w-fit items-center rounded-full border px-3 py-1.5 font-mono text-xs ${
                edu.status === 'In progress'
                  ? 'border-emerald-400/25 bg-emerald-400/10 text-emerald-400'
                  : 'border-white/10 bg-white/[0.04] text-mist-light'
              }`}
            >
              {edu.status} · {edu.period}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  )
}