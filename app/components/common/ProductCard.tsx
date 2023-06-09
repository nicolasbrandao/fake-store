import { ProductType } from '@/types'
import classNames from 'classnames'
import Image from 'next/image'
import React from 'react'
import Link from 'next/link'
import makeImageSizes from '@/app/lib/utils/makeImageSizes'
import makeTruncatedString from '@/app/lib/utils/makeTruncatedString'
import formatter from '@/app/lib/utils/currencyFormatter'

type PropsType = {
  product: ProductType
}

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
    'text-3xl',
    'font-bold',
    'p-2',
    'leading-8',
    'relative',
    'top-0'
  )

  const priceClass = classNames(
    'bg-background',
    'w-fit',
    'text-3xl',
    'font-bold',
    'p-2',
    'leading-[55px]'
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

  return (
    <article className={productContainerClass}>
      <Link href={`/${id}`}>
        <header className={infoContainerClass}>
          <h2>
            <span className={titleClass}>{makeTruncatedString(title, 15)}</span>
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
