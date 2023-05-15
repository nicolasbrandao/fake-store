'use client'

import { ProductType } from '@/types'
import classNames from 'classnames'
import ProductCard from './common/ProductCard'
import LoadingSpinner from './common/LoadingSpinner'

type PropsType = {
  products: ProductType[]
  isLoading: boolean
}

export default function ProductsList({ products, isLoading }: PropsType) {
  const productsContainerClass = classNames(
    'grid',
    'grid-cols-1',
    'lg:grid-cols-3',
    'gap-4',
    'mx-auto',
    'my-auto',
    isLoading ? 'flex items-center justify-center' : ''
  )

  const productsList = products.map((product: ProductType) => (
    <ProductCard key={product.id} product={product} />
  ))

  return (
    <section className={productsContainerClass}>
      {isLoading ? <LoadingSpinner /> : productsList}
    </section>
  )
}
