'use client'

import { useContext, useEffect } from 'react'
import classNames from 'classnames'
import { ProductType } from '@/types'
import { v4 as uuidv4 } from 'uuid'
import { StoreContext, actionTypes } from '../context/store'
import CarouselCard from './CarouselCard'
import fetchProducts from '../lib/fetchProducts'

export default function Carousel() {
  const { state, dispatch } = useContext(StoreContext)

  useEffect(() => {
    fetchProducts({ limit: 8, sort: 'desc' }).then((data) => {
      dispatch({
        type: actionTypes.fetchCarouselProducts,
        payload: data,
      })
    })
  }, [dispatch])

  const caroulselContainerClass = classNames(
    'relative',
    'w-full',
    'overflow-hidden',
    'bg-[white]'
  )

  const carouselClass = classNames('flex', 'animate-carousel')

  return (
    <section className={caroulselContainerClass}>
      <div className={carouselClass}>
        {[...state.carouselProductsList].map((product: ProductType) => (
          <CarouselCard key={uuidv4()} product={product} />
        ))}
      </div>
    </section>
  )
}
