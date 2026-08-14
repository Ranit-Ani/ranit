import { useEffect, useState } from 'react'

/**
 * Extracts { owner, repo } from a github.com repo URL, e.g.
 * "https://github.com/user/repo.git" -> { owner: 'user', repo: 'repo' }.
 * Returns null if the URL isn't a recognizable GitHub repo link
 * (e.g. still a YOUR_USERNAME placeholder).
 */
function parseGithubUrl(url) {
  try {
    const clean = url.replace(/\.git$/, '')
    const match = clean.match(/github\.com\/([^/]+)\/([^/]+)\/?$/)
    if (!match) return null
    const [, owner, repo] = match
    if (owner === 'YOUR_USERNAME') return null
    return { owner, repo }
  } catch {
    return null
  }
}

/** Fetches live stargazer/fork counts for a single GitHub repo. */
export function useGithubRepo(url) {
  const [state, setState] = useState({ status: 'loading', data: null })

  useEffect(() => {
    const parsed = parseGithubUrl(url)
    if (!parsed) {
      setState({ status: 'unavailable', data: null })
      return
    }

    let cancelled = false
    async function run() {
      try {
        const res = await fetch(`https://api.github.com/repos/${parsed.owner}/${parsed.repo}`)
        if (!res.ok) throw new Error(`GitHub API responded ${res.status}`)
        const data = await res.json()
        if (!cancelled) {
          setState({
            status: 'success',
            data: { stars: data.stargazers_count, forks: data.forks_count },
          })
        }
      } catch {
        if (!cancelled) setState({ status: 'error', data: null })
      }
    }
    run()
    return () => {
      cancelled = true
    }
  }, [url])

  return state
}
