import { motion } from 'framer-motion'
import { BookOpen, Braces, Cpu, Hammer } from 'lucide-react'
import SectionKicker from './SectionKicker.jsx'

const STEPS = [
  {
    icon: BookOpen,
    title: 'BCA',
    body: 'Currently pursuing a Bachelor of Computer Applications, building the foundations of computer science and software engineering.',
  },
  {
    icon: Braces,
    title: 'Full-Stack Development',
    body: 'Learning and building applications using React, Node.js, Express, MongoDB and Python across the full stack.',
  },
  {
    icon: Hammer,
    title: 'Projects',
    body: 'Building real-world academic and personal projects to turn concepts into working software.',
  },
  {
    icon: Cpu,
    title: 'AI / ML Exploration',
    body: 'Exploring Machine Learning, NLP, AI and data-related technologies alongside core development work.',
  },
]

export default function Journey() {
  return (
    <section id="journey" className="relative px-6 py-28 md:px-10">
      <div className="mx-auto max-w-4xl">
        <SectionKicker index={4} label="My Journey" />
        <h2 className="font-display mt-3 text-3xl font-semibold text-white sm:text-4xl">
          Where I&rsquo;m at, and where I&rsquo;m headed.
        </h2>

        <div className="relative mt-14 pl-8">
          <div className="absolute bottom-2 left-[13px] top-2 w-px bg-gradient-to-b from-signal-violet/60 via-white/10 to-transparent" />

          <div className="space-y-10">
            {STEPS.map(({ icon: Icon, title, body }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                className="relative"
              >
                <span className="absolute -left-8 flex h-7 w-7 items-center justify-center rounded-full border border-signal-violet/40 bg-ink-900 text-signal-violetSoft">
                  <Icon size={14} />
                </span>
                <h3 className="font-display text-base font-semibold text-white">{title}</h3>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-mist">{body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
