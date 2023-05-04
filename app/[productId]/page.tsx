'use client'

import classNames from 'classnames'
import { useContext } from 'react'
import ProductDetails from './components/ProductDetails'
import fetchSingleProduct from '../lib/fetchSingleProduct'
import { actionTypes, StoreContext } from '../context/store'

type PropsType = {
  params: {
    productId: number
  }
}

export default function Product({ params: { productId } }: PropsType) {
  const { state, dispatch } = useContext(StoreContext)

  fetchSingleProduct(productId).then((data) => {
    dispatch({
      type: actionTypes.fetchSingleProduct,
      payload: data,
    })
  })

  const filterContainerClass = classNames('flex')
  return (
    <main className={filterContainerClass}>
      <ProductDetails product={state.singleProduct} />
    </main>
  )
}
