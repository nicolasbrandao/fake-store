export default async function fetchCategories() {
  try {
    const url = new URL('https://fakestoreapi.com/products/categories')

    const response = await fetch(url.toString())
    const data = await response.json()

    return data
  } catch (error) {
    console.error(`Error fetching products: ${error}`)
    throw error
  }
}
