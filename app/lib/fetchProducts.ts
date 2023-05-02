interface FetchAllProductsParams {
  limit?: number
  sort?: string
}

export default async function fetchProducts(params?: FetchAllProductsParams) {
  try {
    const url = new URL('https://fakestoreapi.com/products')

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
