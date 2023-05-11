export type CategoriesPayloadType = string[]

export default async function fetchCategories() {
  try {
    const url = new URL('https://fakestoreapi.com/products/categories')

    const response = await fetch(url.toString())
    const data = (await response.json()) as CategoriesPayloadType

    return data as CategoriesPayloadType
  } catch (error) {
    console.error(`Error fetching categories: ${error}`)
    throw error
  }
}
