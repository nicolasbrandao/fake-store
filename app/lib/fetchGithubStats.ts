import axios from 'axios'

export default async function fetchGithubStats() {
  try {
    const url = new URL(
      'https://api.github.com/repos/nicolasbrandao/fake-store'
    )

    const { data } = await axios.get(url.toString())
    return data
  } catch (error) {
    console.error(`Error fetching Github stats: ${error}`)
    throw error
  }
}
