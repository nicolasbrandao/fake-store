import axios from 'axios'

interface FetchAllProductsParams {
  limit?: number
  sort?: string
}

export default async function fetchAllProducts(
  params?: FetchAllProductsParams
) {
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

    const { data } = await axios.get(url.toString())
    return data
  } catch (error) {
    console.error(`Error fetching products: ${error}`)
    throw error
  }
}
