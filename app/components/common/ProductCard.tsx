import { ProductType } from '@/types'
import classNames from 'classnames'
import Image from 'next/image'
import React from 'react'

type PropsType = {
  product: ProductType
}

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
})

export default function ProductCard({ product }: PropsType) {
  const { title, price, image } = product

  const productContainerClass = classNames(
    'lg:first:col-span-2',
    'lg:first:row-span-2',
    'relative'
  )

  const infoContainerClass = classNames('absolute')

  const titleClass = classNames(
    'bg-background',
    'm-w-full',
    'text-4xl',
    'font-bold'
  )

  const priceClass = classNames(
    'bg-background',
    'w-fit',
    'text-3xl',
    'font-bold',
    'p-2'
  )

  const imageContainerClass = classNames(
    'aspect-square',
    'w-full',
    'overflow-clip',
    'flex',
    'items-center',
    'justify-center',
    'object-cover',
    'bg-[white]'
  )

  const imageClass = classNames('flex', 'h-full', 'object-contain')

  return (
    <div className={productContainerClass}>
      <div className={infoContainerClass}>
        <h3>
          <span className={titleClass}>{title}</span>
        </h3>
        <div className={priceClass}>{formatter.format(price)}</div>
      </div>
      <div className={imageContainerClass}>
        <Image
          src={image}
          width={500}
          height={500}
          alt={title}
          className={imageClass}
        />
      </div>
    </div>
  )
}
