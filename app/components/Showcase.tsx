'use client'

import { useState, useEffect, useContext } from 'react'
import { ProductType } from '@/types'
import classNames from 'classnames'
import fetchAllProducts from '../lib/fetchAllProducts'
import { actionTypes, StoreContext } from '../context/store'
import ProductCard from './ProductCard'

export default function Showcase() {
  const { state, dispatch } = useContext(StoreContext)
  const [productsList, setProductsList] = useState<ProductType[]>([])

  useEffect(() => {
    fetchAllProducts({ limit: 3 }).then((data) => setProductsList(data))
  }, [])

  useEffect(() => {
    dispatch({
      type: actionTypes.fetchAllProducts,
      payload: productsList,
    })
  }, [dispatch, productsList])

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
