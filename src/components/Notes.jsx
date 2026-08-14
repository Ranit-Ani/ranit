import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { notes } from '../data/notes.js'
import SectionKicker from './SectionKicker.jsx'
import SpotlightCard from './SpotlightCard.jsx'

export default function Notes() {
  if (!notes || notes.length === 0) return null

  return (
    <section id="notes" className="relative px-6 py-28 md:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-xl">
          <SectionKicker index={5} label="Notes" />
          <h2 className="font-display mt-3 text-3xl font-semibold text-white sm:text-4xl">
            Short write-ups as I go.
          </h2>
          <p className="mt-4 text-mist">
            Not polished articles &mdash; just notes on what I actually ran into while building
            things, kept short on purpose.
          </p>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {notes.map((note, i) => (
            <SpotlightCard
              key={note.id}
              as={motion.article}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.45, delay: i * 0.07 }}
              className="flex flex-col p-6 transition-colors hover:border-white/20"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="rounded-full border border-white/10 px-2.5 py-1 font-mono text-[11px] text-mist-light">
                  {note.tag}
                </span>
                <span className="font-mono text-[11px] text-mist-dim">{note.date}</span>
              </div>
              <h3 className="font-display mt-4 text-base font-semibold leading-snug text-white">
                {note.title}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-mist">{note.excerpt}</p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-signal-violetSoft">
                Read note
                <ArrowUpRight size={14} />
              </span>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  )
}
