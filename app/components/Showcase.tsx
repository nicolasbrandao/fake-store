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
    fetchProducts({ limit: 3 }).then((data) => {
      dispatch({
        type: actionTypes.fetchAllProducts,
        payload: data,
      })
    })
  }, [dispatch])

  const productsContainerClass = classNames(
    'lg:grid',
    'lg:grid-cols-3',
    'lg:grid-rows-2'
  )

  return (
    <section className={productsContainerClass}>
      {state.productsList.map((product: ProductType) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </section>
  )
}
