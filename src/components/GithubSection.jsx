import { motion } from 'framer-motion'
import { Github, GitFork, Star, Users } from 'lucide-react'
import { projects } from '../data/projects.js'
import { useGithubStats } from '../hooks/useGithubStats.js'
import { useGithubRepo } from '../hooks/useGithubRepo.js'
import SectionKicker from './SectionKicker.jsx'

const GITHUB_USERNAME = 'Ranit-Ani'
const GITHUB_URL = `https://github.com/${GITHUB_USERNAME}`

function RepoStats({ url }) {
  const { status, data } = useGithubRepo(url)

  if (status === 'success') {
    return (
      <>
        <span className="flex items-center gap-1 text-[11px]">
          <Star size={12} /> {data.stars}
        </span>
        <span className="flex items-center gap-1 text-[11px]">
          <GitFork size={12} /> {data.forks}
        </span>
      </>
    )
  }

  if (status === 'loading') {
    return (
      <>
        <span className="flex items-center gap-1 text-[11px] text-mist-dim/60">
          <Star size={12} /> &middot;&middot;
        </span>
        <span className="flex items-center gap-1 text-[11px] text-mist-dim/60">
          <GitFork size={12} /> &middot;&middot;
        </span>
      </>
    )
  }

  return (
    <>
      <span className="flex items-center gap-1 text-[11px]">
        <Star size={12} /> &mdash;
      </span>
      <span className="flex items-center gap-1 text-[11px]">
        <GitFork size={12} /> &mdash;
      </span>
    </>
  )
}

function StatBlock({ icon: Icon, label, value, status }) {
  return (
    <div className="min-w-0 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-3 sm:px-4">
      <div className="flex items-center gap-1.5 text-mist-dim">
        <Icon size={13} className="shrink-0" />
        <p className="truncate text-[10px] uppercase tracking-wide sm:text-[11px]">{label}</p>
      </div>
      <p className="font-display mt-1.5 text-lg font-semibold text-white sm:text-xl">
        {status === 'loading' ? (
          <span className="inline-block h-5 w-10 animate-pulse rounded bg-white/10 align-middle" />
        ) : status === 'success' ? (
          value
        ) : (
          '—'
        )}
      </p>
    </div>
  )
}

export default function GithubSection() {
  const { status, data } = useGithubStats(GITHUB_USERNAME)

  return (
    <section id="github" className="relative px-6 py-24 md:px-10">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5 }}
          className="card-surface flex flex-col gap-8 rounded-2xl p-8 md:flex-row md:items-center md:justify-between"
        >
          <div className="flex-1">
            <SectionKicker index={6} label="GitHub" />
            <h2 className="font-display mt-3 text-2xl font-semibold text-white sm:text-3xl">
              Most of my code lives here.
            </h2>
            <p className="mt-3 max-w-md text-sm text-mist">
              {status === 'error'
                ? "Live stats couldn't be loaded right now — GitHub's API may be rate-limiting or unreachable. Try again shortly."
                : 'Live from the GitHub API — public repositories, followers and repo activity, pulled in real time.'}
            </p>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-white/[0.06] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-white/[0.1]"
            >
              <Github size={16} />
              View GitHub Profile
            </a>

            <div className="mt-6 grid grid-cols-3 gap-2 sm:gap-2.5">
              <StatBlock
                icon={Github}
                label="Repos"
                value={data?.publicRepos}
                status={status}
              />
              <StatBlock
                icon={Users}
                label="Followers"
                value={data?.followers}
                status={status}
              />
              <StatBlock
                icon={Star}
                label="Following"
                value={data?.following}
                status={status}
              />
            </div>
          </div>

          <div className="grid w-full max-w-xs grid-cols-1 gap-3 sm:grid-cols-2 md:w-auto">
            {projects.map((p) => (
              <a
                key={p.id}
                href={p.github}
                target="_blank"
                rel="noreferrer"
                className="rounded-xl border border-white/10 p-4 transition-colors hover:border-signal-violet/40"
              >
                <p className="truncate font-mono text-xs text-white">{p.name}</p>
                <div className="mt-3 flex items-center gap-3 text-mist-dim">
                  <RepoStats url={p.github} />
                </div>
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
