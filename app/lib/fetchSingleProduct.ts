export default async function fetchSingleProduct(productId: number) {
  try {
    const url = new URL(`https://fakestoreapi.com/products/${productId}`)

    const response = await fetch(url.toString())
    const data = await response.json()

    return data
  } catch (error) {
    console.error(`Error fetching products: ${error}`)
    throw error
  }
}
