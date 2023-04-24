'use client'

import classNames from 'classnames'
import { useContext, useEffect } from 'react'
import ProductDetails from './components/ProductDetails'
import fetchSingleProduct from '../lib/fetchSingleProduct'
import { actionTypes, StoreContext } from '../context/store'

type Params = {
  params: {
    productId: number
  }
}

export default function Product({ params: { productId } }: Params) {
  const { state, dispatch } = useContext(StoreContext)

  useEffect(() => {
    fetchSingleProduct(productId).then((data) => {
      dispatch({
        type: actionTypes.fetchSingleProduct,
        payload: data,
      })
    })
  }, [dispatch, productId])

  const filterContainerClass = classNames('flex')
  return (
    <main className={filterContainerClass}>
      <ProductDetails product={state.singleProduct} />
    </main>
  )
}
