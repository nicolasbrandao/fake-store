export type GithubStatsPayloadType = {
  stargazers_count: number
  forks_count: number
}

export default async function fetchGithubStats() {
  try {
    const url = new URL(
      'https://api.github.com/repos/nicolasbrandao/fake-store'
    )

    const response = await fetch(url.toString())
    const { stargazers_count, forks_count } =
      (await response.json()) as GithubStatsPayloadType

    return { stargazers_count, forks_count } as GithubStatsPayloadType
  } catch (error) {
    console.error(`Error fetching Github stats: ${error}`)
    throw error
  }
}
