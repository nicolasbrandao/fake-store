export default async function fetchGithubStats() {
  try {
    const url = new URL(
      'https://api.github.com/repos/nicolasbrandao/fake-store'
    )

    const response = await fetch(url.toString())
    const data = await response.json()

    return data
  } catch (error) {
    console.error(`Error fetching Github stats: ${error}`)
    throw error
  }
}
