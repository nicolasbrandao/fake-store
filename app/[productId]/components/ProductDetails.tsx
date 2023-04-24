import { ProductType } from '@/types'
import ProductCard from '@/app/components/common/ProductCard'
import React from 'react'

type PropsType = {
  product: ProductType
}
export default function ProductDetails({ product }: PropsType) {
  return (
    <div>
      <ProductCard product={product} />
    </div>
  )
}
