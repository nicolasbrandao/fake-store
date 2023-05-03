'use client'

import { ProductType } from '@/types'
import classNames from 'classnames'
import ProductCard from '../../components/common/ProductCard'

type PropsType = {
  products: ProductType[]
}

export default function ProductsList({ products }: PropsType) {
  const productsContainerClass = classNames(
    'grid',
    'grid-cols-1',
    'lg:grid-cols-3',
    'gap-4'
  )

  return (
    <section className={productsContainerClass}>
      {products.map((product: ProductType) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </section>
  )
}
