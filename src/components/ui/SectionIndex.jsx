/**
 * Small mono-font corner marker (e.g. "02 — Skills") used to reinforce
 * the terminal/dev identity and visually separate sections.
 */
export default function SectionIndex({ number, label }) {
  return (
    <span
      aria-hidden="true"
      className="pointer-events-none absolute right-6 top-8 hidden select-none font-mono text-[11px] tracking-[0.2em] text-mist-dim/60 md:right-10 lg:block"
    >
      {number} &mdash; {label}
    </span>
  )
}
