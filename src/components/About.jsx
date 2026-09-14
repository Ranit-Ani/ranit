import { motion } from 'framer-motion'
import { FolderGit2, GraduationCap, Layers } from 'lucide-react'
import SectionKicker from './SectionKicker.jsx'
import { skillGroups } from '../data/skills.js'

// Started coding/learning to build in 2024 — years learning is derived
// from this so it stays accurate automatically as time passes.
const CODING_START_YEAR = 2024
const yearsLearning = Math.max(1, new Date().getFullYear() - CODING_START_YEAR)

// Total distinct technologies across all skill groups (including
// "Currently Exploring") — pulled straight from data/skills.js so this
// number updates itself whenever the skills list changes.
const techCount = new Set(skillGroups.flatMap((g) => g.items)).size

const STATS = [
  { icon: GraduationCap, label: 'Years Learning', value: `${yearsLearning}+` },
  { icon: FolderGit2, label: 'Projects Built', value: '3+' },
  { icon: Layers, label: 'Technologies', value: `${techCount}+` },
]

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
}

export default function About() {
  return (
    <section id="about" className="relative px-6 py-28 md:px-10">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          variants={fadeUp}
          transition={{ duration: 0.5 }}
          className="grid gap-14 md:grid-cols-[1fr_1.1fr] md:gap-16"
        >
          <div>
            <SectionKicker index={1} label="About Me" />
            <h2 className="font-display mt-3 text-3xl font-semibold text-white sm:text-4xl">
              Still a student.{' '}
              <span className="text-mist">Already building for real.</span>
            </h2>

            <blockquote className="mt-8 border-l-2 border-signal-violet/60 pl-4 font-mono text-sm text-mist-light">
              Learn. Build. Break. Fix. Repeat.
            </blockquote>
          </div>

          <div className="space-y-5 text-base leading-relaxed text-mist">
            <p>
              I&rsquo;m a BCA student based in West Bengal, India, working toward becoming a
              software developer. Most of my time goes into building practical applications
              rather than just studying theory &mdash; I&rsquo;d rather understand a concept by
              shipping something with it.
            </p>
            <p>
              I work across the stack: React on the frontend, Node.js and Python on the backend,
              and MongoDB for data. I&rsquo;m also spending time on database design and slowly
              getting into AI/ML and NLP, because I want to understand how intelligent systems
              are actually built, not just how to use them.
            </p>
            <p>
              I don&rsquo;t treat any of this as finished. New tools, new patterns, new problems
              &mdash; I&rsquo;m continuously learning, and this portfolio grows as I do.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-3"
        >
          {STATS.map(({ icon: Icon, label, value }) => (
            <div
              key={label}
              className="card-surface rounded-2xl p-5 transition-colors hover:border-signal-violet/30"
            >
              <Icon size={18} className="text-signal-violetSoft" />
              <p className="font-display mt-4 text-lg font-semibold text-white">{value}</p>
              <p className="mt-1 text-xs text-mist-dim">{label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}