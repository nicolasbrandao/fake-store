'use client'

import classNames from 'classnames'
import { ProductType } from '@/types'
import { v4 as uuidv4 } from 'uuid'
import CarouselCard from './CarouselCard'
import { CorouselProvider, useCarouselProducts } from '../context/carousel'

function CarouselContent() {
  const { carouselProducts } = useCarouselProducts()
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
        {carouselProducts.map((product: ProductType) => (
          <CarouselCard key={uuidv4()} product={product} />
        ))}
      </div>
    </section>
  )
}

export default function Carousel() {
  return (
    <CorouselProvider>
      <CarouselContent />
    </CorouselProvider>
  )
}
