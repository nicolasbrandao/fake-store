'use client'

import { ProductType } from '@/types'
import classNames from 'classnames'
import ProductCard from './common/ProductCard'
import { ShowcaseProvider, useShowcaseProducts } from '../context/showcase'

function ShowcaseContent() {
  const { showcaseProducts } = useShowcaseProducts()

  const productsContainerClass = classNames(
    'lg:grid',
    'lg:grid-cols-3',
    'lg:grid-rows-2'
  )

  return (
    <section className={productsContainerClass}>
      {showcaseProducts.slice(0, 3).map((product: ProductType) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </section>
  )
}

export default function Showcase() {
  return (
    <ShowcaseProvider>
      <ShowcaseContent />
    </ShowcaseProvider>
  )
}
