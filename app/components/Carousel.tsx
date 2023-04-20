'use client'

import { useContext } from 'react'
import classNames from 'classnames'
import { ProductType } from '@/types'
import { StoreContext } from '../context/store'
import CarouselCard from './CarouselCard'

export default function Carousel() {
  const { state } = useContext(StoreContext)

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
        {[...state.productsList, ...state.productsList].map(
          (product: ProductType) => (
            <CarouselCard key={product.id} product={product} />
          )
        )}
      </div>
    </section>
  )
}
