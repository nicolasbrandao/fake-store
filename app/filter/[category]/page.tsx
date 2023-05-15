'use client'

import {
  ProductsByCategoryProvider,
  useProductsByCategory,
} from '@/app/context/productsByCategory'
import ProductsList from '../../components/ProductsList'

type PropsType = {
  params: {
    category: string
  }
}

function CategoryFilterContent() {
  const { productsByCategory, isLoading } = useProductsByCategory()

  return <ProductsList products={productsByCategory} isLoading={isLoading} />
}

export default function CategoryFilter({ params: { category } }: PropsType) {
  return (
    <ProductsByCategoryProvider category={category}>
      <CategoryFilterContent />
    </ProductsByCategoryProvider>
  )
}
