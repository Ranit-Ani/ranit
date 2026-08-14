import { useEffect, useState } from 'react'

/**
 * Fetches live public stats for a GitHub user via the unauthenticated
 * GitHub REST API. Falls back gracefully (status: 'error') if the request
 * fails or the API rate-limit is hit — never blocks rendering.
 */
export function useGithubStats(username) {
  const [state, setState] = useState({ status: 'loading', data: null })

  useEffect(() => {
    if (!username) return
    let cancelled = false

    async function run() {
      try {
        const res = await fetch(`https://api.github.com/users/${username}`)
        if (!res.ok) throw new Error(`GitHub API responded ${res.status}`)
        const data = await res.json()
        if (!cancelled) {
          setState({
            status: 'success',
            data: {
              publicRepos: data.public_repos,
              followers: data.followers,
              following: data.following,
              createdAt: data.created_at,
              avatarUrl: data.avatar_url,
              bio: data.bio,
            },
          })
        }
      } catch (err) {
        if (!cancelled) setState({ status: 'error', data: null })
      }
    }

    run()
    return () => {
      cancelled = true
    }
  }, [username])

  return state
}
