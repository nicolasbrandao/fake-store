import { ProductType } from '@/types'
import classNames from 'classnames'
import Image from 'next/image'
import React from 'react'
import Link from 'next/link'
import makeImageSizes from '@/app/lib/utils/makeImageSizes'

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

  const infoContainerClass = classNames('absolute', 'top-2', 'z-10')

  const titleClass = classNames(
    'bg-background',
    'w-fit',
    'text-4xl',
    'font-bold',
    'p-2',
    'leading-10',
    'relative',
    'top-0'
  )

  const priceClass = classNames(
    'bg-background',
    'w-fit',
    'text-2xl',
    'font-bold',
    'p-2',
    'leading-[60px]'
  )

  const imageContainerClass = classNames(
    'aspect-square',
    'w-full',
    'overflow-clip',
    'flex',
    'items-center',
    'justify-center',
    'object-cover',
    'bg-[white]',
    'relative'
  )

  const imageClass = classNames('w-auto', 'object-contain')

  const imageSizes = {
    small: '100vw',
    medium: '50vw',
    large: '100vw',
  }

  const MAX_TITLE_LENGTH = 15
  const truncatedTitle =
    title.length > MAX_TITLE_LENGTH
      ? `${title.substring(0, MAX_TITLE_LENGTH)}...`
      : title

  return (
    <article className={productContainerClass}>
      <Link href={`/${id}`}>
        <header className={infoContainerClass}>
          <h2>
            <span className={titleClass}>{truncatedTitle}</span>
          </h2>
          <span className={priceClass}>{formatter.format(price)}</span>
        </header>
        <figure className={imageContainerClass}>
          <Image
            className={imageClass}
            src={image}
            fill
            alt={title}
            priority
            sizes={makeImageSizes(imageSizes)}
          />
        </figure>
      </Link>
    </article>
  )
}
