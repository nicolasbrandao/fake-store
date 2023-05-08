import { ProductType } from '@/types'

interface Params {
  limit?: number
  sort?: string
}

export type ProductsPayloadType = ProductType[]

export default async function fetchProducts(params?: Params) {
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
    const data = (await response.json()) as ProductsPayloadType

    return data as ProductsPayloadType
  } catch (error) {
    console.error(`Error fetching products: ${error}`)
    throw error
  }
}
