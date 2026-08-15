import { motion } from 'framer-motion'
import { skillGroups } from '../data/skills.js'
import SectionKicker from './SectionKicker.jsx'
import SpotlightCard from './SpotlightCard.jsx'

export default function Skills() {
  return (
    <section id="skills" className="relative px-6 py-28 md:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-xl">
          <SectionKicker index={2} label="Skills" />
          <h2 className="font-display mt-3 text-3xl font-semibold text-white sm:text-4xl">
            The toolbox I reach for.
          </h2>
          <p className="mt-4 text-mist">
            No arbitrary percentages &mdash; just the technologies I actually use, grouped by
            where they fit in a project.
          </p>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {skillGroups.map((group, gi) => (
            <SpotlightCard
              key={group.label}
              as={motion.div}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.45, delay: gi * 0.06 }}
              className={`p-6 ${group.exploring ? 'md:col-span-2' : ''}`}
            >
              <div className="flex items-center gap-2">
                <h3 className="font-display text-sm font-semibold text-white">{group.label}</h3>
                {group.exploring && (
                  <span className="rounded-full bg-signal-amber/10 px-2 py-0.5 font-mono text-[10px] text-signal-amber">
                    in progress
                  </span>
                )}
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 font-mono text-xs text-mist-light transition-colors hover:border-signal-violet/40 hover:text-white"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  )
}
