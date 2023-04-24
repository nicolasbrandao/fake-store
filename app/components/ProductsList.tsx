'use client'

import { useEffect, useContext } from 'react'
import { ProductType } from '@/types'
import classNames from 'classnames'
import fetchProducts from '../lib/fetchProducts'
import { actionTypes, StoreContext } from '../context/store'
import ProductCard from './common/ProductCard'

export default function Showcase() {
  const { state, dispatch } = useContext(StoreContext)

  useEffect(() => {
    fetchProducts().then((data) => {
      dispatch({
        type: actionTypes.fetchAllProducts,
        payload: data,
      })
    })
  }, [dispatch])

  const productsContainerClass = classNames(
    'grid',
    'grid-cols-1',
    'lg:grid-cols-3',
    'gap-4'
  )

  return (
    <section className={productsContainerClass}>
      {state.productsList.map((product: ProductType) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </section>
  )
}
