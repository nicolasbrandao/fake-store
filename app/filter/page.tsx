'use client'

import { useContext, useEffect } from 'react'
import { StoreContext, actionTypes } from '@/app/context/store'
import fetchProducts from '@/app/lib/fetchProducts'
import ProductsList from './components/ProductsList'

export default function Filter() {
  const { state, dispatch } = useContext(StoreContext)

  useEffect(() => {
    fetchProducts().then((data) => {
      dispatch({
        type: actionTypes.fetchAllProducts,
        payload: data,
      })
    })
  }, [dispatch])

  return <ProductsList products={state.productsList} />
}
