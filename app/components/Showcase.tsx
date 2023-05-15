'use client'

import { ProductType } from '@/types'
import classNames from 'classnames'
import ProductCard from './common/ProductCard'
import { ShowcaseProvider, useShowcaseProducts } from '../context/showcase'
import LoadingSpinner from './common/LoadingSpinner'

function ShowcaseContent() {
  const { showcaseProducts, isLoading } = useShowcaseProducts()

  const productsContainerClass = classNames(
    'lg:grid-cols-3',
    'lg:grid-rows-2',
    'min-h-[300px]',
    'min-w-screen',
    isLoading ? 'flex items-center justify-center' : 'lg:grid'
  )

  const showcaseContent = showcaseProducts
    .slice(0, 3)
    .map((product: ProductType) => (
      <ProductCard key={product.id} product={product} />
    ))

  return (
    <section className={productsContainerClass}>
      {isLoading ? <LoadingSpinner /> : showcaseContent}
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
