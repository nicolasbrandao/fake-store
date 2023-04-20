import { ProductType } from '@/types'
import React from 'react'
import Image from 'next/image'
import classNames from 'classnames'

type PropsType = {
  product: ProductType
}

export default function CarouselCard({ product }: PropsType) {
  const { title } = product

  const cardContainerClass = classNames(
    'relative',
    'h-[30vh]',
    'w-1/2',
    'flex-none',
    'md:w-1/3'
  )

  const titleContainerClass = classNames(
    'absolute',
    'inset-y-0',
    'right-0',
    'flex',
    'items-center',
    'justify-center'
  )

  const titleClass = classNames(
    'inline-flex',
    'bg-[black]',
    'p-4',
    'text-xl',
    'font-semibold',
    'text-[white]'
  )

  const imageContainerClass = classNames('bg-[white]')

  const imageClass = classNames('h-full', 'object-contain')

  return (
    <div className={cardContainerClass}>
      <div className={imageContainerClass}>
        <Image
          className={imageClass}
          src={product.image}
          height={500}
          width={500}
          alt={title}
        />
      </div>
      <div className={titleContainerClass}>
        <div className={titleClass}>{title}</div>
      </div>
    </div>
  )
}
