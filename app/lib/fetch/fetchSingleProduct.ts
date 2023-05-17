import { ProductType } from '@/types'

export type SingleProductPayloadType = ProductType

export default async function fetchSingleProduct(productId: number) {
  try {
    const url = new URL(`https://fakestoreapi.com/products/${productId}`)

    const response = await fetch(url.toString())
    const data = (await response.json()) as SingleProductPayloadType

    return data as SingleProductPayloadType
  } catch (error) {
    console.error(`Error fetching product: ${error}`)
    throw error
  }
}
