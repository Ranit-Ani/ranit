export default function Background() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-ink">
      {/* Base grid */}
      <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-60 [mask-image:radial-gradient(ellipse_80%_60%_at_50%_0%,#000_40%,transparent_100%)]" />

      {/* Top radial glow */}
      <div className="absolute inset-0 bg-radial-fade" />

      {/* Drifting blobs — the "antigravity" visual language */}
      <div className="animate-driftSlow absolute left-[8%] top-[18%] h-72 w-72 rounded-full bg-signal-violet/10 blur-[110px]" />
      <div className="animate-drift absolute right-[6%] top-[45%] h-96 w-96 rounded-full bg-signal-cyan/10 blur-[130px]" />
      <div className="animate-driftSlow absolute bottom-[8%] left-[30%] h-80 w-80 rounded-full bg-signal-violet/8 blur-[120px]" />

      {/* Bottom vignette to keep footer calm */}
      <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-ink to-transparent" />
    </div>
  )
}
