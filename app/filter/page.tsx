'use client'

import ProductsList from './components/ProductsList'
import { ShowcaseProvider, useShowcaseProducts } from '../context/showcase'

function FilterContent() {
  const { showcaseProducts } = useShowcaseProducts()

  return <ProductsList products={showcaseProducts} />
}

export default function Filter() {
  return (
    <ShowcaseProvider>
      <FilterContent />
    </ShowcaseProvider>
  )
}
