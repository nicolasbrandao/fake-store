import axios from 'axios'

export default async function fetchSingleProduct(productId: number) {
  try {
    const url = new URL(`https://fakestoreapi.com/products/${productId}`)

    const { data } = await axios.get(url.toString())
    return data
  } catch (error) {
    console.error(`Error fetching products: ${error}`)
    throw error
  }
}
