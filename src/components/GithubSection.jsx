import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { FolderGit2, Github, GitFork, Star, Users } from 'lucide-react'
import { projects } from '../data/projects.js'
import SectionIndex from './ui/SectionIndex.jsx'
import GlowCard from './ui/GlowCard.jsx'

const GITHUB_USERNAME = 'Ranit-Ani'
const GITHUB_URL = `https://github.com/${GITHUB_USERNAME}`

// Pulls { owner, repo } out of a github.com URL, or null if it's not a
// real repo link (e.g. the "YOUR_USERNAME" placeholders in projects.js).
function parseRepo(url) {
  if (!url) return null
  try {
    const u = new URL(url)
    if (u.hostname !== 'github.com') return null
    const [owner, repoRaw] = u.pathname.replace(/^\//, '').split('/')
    if (!owner || !repoRaw || owner === 'YOUR_USERNAME') return null
    return { owner, repo: repoRaw.replace(/\.git$/, '') }
  } catch {
    return null
  }
}

function timeAgo(dateString) {
  if (!dateString) return null
  const diffMs = Date.now() - new Date(dateString).getTime()
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24))
  if (days <= 0) return 'today'
  if (days === 1) return 'yesterday'
  if (days < 30) return `${days}d ago`
  const months = Math.floor(days / 30)
  if (months < 12) return `${months}mo ago`
  return `${Math.floor(months / 12)}y ago`
}

export default function GithubSection() {
  const [profile, setProfile] = useState(null)
  const [repoStats, setRepoStats] = useState({})
  const [status, setStatus] = useState('loading') // loading | ready | error

  useEffect(() => {
    let cancelled = false

    async function load() {
      try {
        const res = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`)
        if (!res.ok) throw new Error('profile fetch failed')
        const data = await res.json()
        if (!cancelled) setProfile(data)

        const targets = projects.map((p) => ({ id: p.id, ...parseRepo(p.github) })).filter((t) => t.owner)

        const results = await Promise.all(
          targets.map(async (t) => {
            try {
              const r = await fetch(`https://api.github.com/repos/${t.owner}/${t.repo}`)
              if (!r.ok) return [t.id, null]
              const json = await r.json()
              return [
                t.id,
                {
                  stars: json.stargazers_count,
                  forks: json.forks_count,
                  pushedAt: json.pushed_at,
                },
              ]
            } catch {
              return [t.id, null]
            }
          })
        )

        if (!cancelled) {
          setRepoStats(Object.fromEntries(results))
          setStatus('ready')
        }
      } catch {
        if (!cancelled) setStatus('error')
      }
    }

    load()
    return () => {
      cancelled = true
    }
  }, [])

  const totalStars = Object.values(repoStats).reduce((sum, r) => sum + (r?.stars ?? 0), 0)
  const latestPush = Object.values(repoStats)
    .map((r) => r?.pushedAt)
    .filter(Boolean)
    .sort()
    .pop()

  return (
    <section id="github" className="relative px-6 py-24 md:px-10">
      <SectionIndex number="05" label="GitHub" />
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5 }}
          className="card-surface flex flex-col gap-8 rounded-2xl p-8 md:flex-row md:items-center md:justify-between"
        >
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-signal-cyan">
              GitHub
            </p>
            <h2 className="font-display mt-3 text-2xl font-semibold text-white sm:text-3xl">
              Most of my code lives here.
            </h2>

            {status === 'error' ? (
              <p className="mt-3 max-w-md text-sm text-mist">
                Couldn&rsquo;t reach the GitHub API right now &mdash; check the profile directly.
              </p>
            ) : (
              <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3 font-mono text-xs text-mist-light">
                <span className="flex items-center gap-1.5">
                  <FolderGit2 size={14} className="text-signal-violetSoft" />
                  {profile ? `${profile.public_repos} public repos` : '— public repos'}
                </span>
                <span className="flex items-center gap-1.5">
                  <Users size={14} className="text-signal-violetSoft" />
                  {profile ? `${profile.followers} followers` : '— followers'}
                </span>
                <span className="flex items-center gap-1.5">
                  <Star size={14} className="text-signal-violetSoft" />
                  {status === 'ready' ? `${totalStars} stars (tracked repos)` : '— stars'}
                </span>
                {latestPush && (
                  <span className="flex items-center gap-1.5 text-mist-dim">
                    last push {timeAgo(latestPush)}
                  </span>
                )}
              </div>
            )}

            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-white/[0.06] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-white/[0.1]"
            >
              <Github size={16} />
              View GitHub Profile
            </a>
          </div>

          <div className="grid w-full max-w-xs grid-cols-1 gap-3 sm:grid-cols-2 md:w-auto">
            {projects.map((p) => {
              const stats = repoStats[p.id]
              return (
                <GlowCard
                  as="a"
                  key={p.id}
                  href={p.github}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-xl border border-white/10 p-4 transition-colors hover:border-signal-violet/40"
                >
                  <p className="truncate font-mono text-xs text-white">{p.name}</p>
                  <div className="mt-3 flex items-center gap-3 text-mist-dim">
                    <span className="flex items-center gap-1 text-[11px]">
                      <Star size={12} /> {stats ? stats.stars : '\u2014'}
                    </span>
                    <span className="flex items-center gap-1 text-[11px]">
                      <GitFork size={12} /> {stats ? stats.forks : '\u2014'}
                    </span>
                  </div>
                </GlowCard>
              )
            })}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
