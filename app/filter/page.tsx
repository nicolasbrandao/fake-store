'use client'

import ProductsList from '../components/ProductsList'
import { ShowcaseProvider, useShowcaseProducts } from '../context/showcase'

function FilterContent() {
  const { showcaseProducts, isLoading } = useShowcaseProducts()

  return <ProductsList products={showcaseProducts} isLoading={isLoading} />
}

export default function Filter() {
  return (
    <ShowcaseProvider>
      <FilterContent />
    </ShowcaseProvider>
  )
}
