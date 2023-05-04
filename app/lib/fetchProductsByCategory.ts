interface Params {
  limit?: number
  sort?: string
  category: string
}

export default async function fetchProductsByCategory(params: Params) {
  try {
    const url = new URL(
      `https://fakestoreapi.com/products/category/${params.category}`
    )

    if (params) {
      if (params.limit) {
        url.searchParams.append('limit', params.limit.toString())
      }
      if (params.sort) {
        url.searchParams.append('sort', params.sort)
      }
    }

    const response = await fetch(url.toString())
    const data = await response.json()

    return data
  } catch (error) {
    console.error(`Error fetching products: ${error}`)
    throw error
  }
}
