import { ProductType } from '@/types'
import classNames from 'classnames'
import Image from 'next/image'
import React from 'react'
import Link from 'next/link'

type PropsType = {
  product: ProductType
}

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
})

export default function ProductCard({ product }: PropsType) {
  const { title, price, image, id } = product

  const productContainerClass = classNames(
    'lg:first:col-span-2',
    'lg:first:row-span-2',
    'relative'
  )

  const infoContainerClass = classNames('absolute')

  const titleClass = classNames(
    'bg-background',
    'w-fit',
    'text-4xl',
    'font-bold',
    'p-2'
  )

  const priceClass = classNames(
    'bg-background',
    'w-fit',
    'text-2xl',
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

  const MAX_TITLE_LENGTH = 15
  const truncatedTitle =
    title.length > MAX_TITLE_LENGTH
      ? `${title.substring(0, MAX_TITLE_LENGTH)}...`
      : title

  return (
    <Link href={`/${id}`} className={productContainerClass}>
      <div className={infoContainerClass}>
        <h3>
          <span className={titleClass}>{truncatedTitle}</span>
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
    </Link>
  )
}
