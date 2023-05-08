import { ProductType } from '@/types'

interface Params {
  limit?: number
  sort?: string
  category: string
}

export type ProductsPayloadType = ProductType[]

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
    const data = (await response.json()) as ProductsPayloadType

    return data as ProductsPayloadType
  } catch (error) {
    console.error(`Error fetching products: ${error}`)
    throw error
  }
}
