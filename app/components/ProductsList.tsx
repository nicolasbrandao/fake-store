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
    'lg:grid-cols-3',
    'lg:grid-rows-2',
    'gap-4',
    'w-full',
    isLoading ? 'flex items-center justify-center' : 'lg:grid'
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
