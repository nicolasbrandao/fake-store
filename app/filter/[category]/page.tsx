'use client'

import { useContext, useEffect } from 'react'
import { StoreContext, actionTypes } from '@/app/context/store'
import fetchProductsByCategory from '@/app/lib/fetchProductsByCategory'
import ProductsList from '../components/ProductsList'

type Params = {
  params: {
    category: string
  }
}

export default function CategoryFilter({ params: { category } }: Params) {
  const { state, dispatch } = useContext(StoreContext)

  useEffect(() => {
    fetchProductsByCategory({ category }).then((data) => {
      dispatch({
        type: actionTypes.fetchProductsByCategory,
        payload: data,
      })
    })
  }, [dispatch, category])

  return <ProductsList products={state.productsByCategoryList} />
}