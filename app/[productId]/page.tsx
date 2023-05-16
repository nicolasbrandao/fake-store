'use client'

import classNames from 'classnames'
import ProductDetails from '../components/ProductDetails'
import { SingleProductProvider } from '../context/singleProduct'

type PropsType = {
  params: {
    productId: number
  }
}

function ProductContent() {
  const filterContainerClass = classNames('flex')

  return (
    <main className={filterContainerClass}>
      <ProductDetails />
    </main>
  )
}

export default function Product({ params: { productId } }: PropsType) {
  return (
    <SingleProductProvider productId={productId}>
      <ProductContent />
    </SingleProductProvider>
  )
}
