'use client'

import classNames from 'classnames'
import { ProductType } from '@/types'
import { v4 as uuidv4 } from 'uuid'
import CarouselCard from './CarouselCard'
import { CarouselProvider, useCarouselProducts } from '../context/carousel'
import LoadingSpinner from './common/LoadingSpinner'

function CarouselContent() {
  const { carouselProducts, isLoading } = useCarouselProducts()

  const caroulselContainerClass = classNames(
    'relative',
    'w-full',
    'overflow-hidden',
    isLoading ? 'flex p-4 items-center justify-center bg-[black]' : 'bg-[white]'
  )

  const carouselClass = classNames(
    'flex',
    'items-center',
    'justify-center',
    'animate-carousel'
  )

  const carouselContent = carouselProducts.map((product: ProductType) => (
    <CarouselCard key={uuidv4()} product={product} />
  ))

  return (
    <div className={caroulselContainerClass}>
      <div className={carouselClass}>
        {isLoading ? <LoadingSpinner /> : carouselContent}
      </div>
    </div>
  )
}

export default function Carousel() {
  return (
    <CarouselProvider>
      <CarouselContent />
    </CarouselProvider>
  )
}
