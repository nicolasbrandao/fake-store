import { ProductType } from '@/types'
import React from 'react'
import Image from 'next/image'
import classNames from 'classnames'
import Link from 'next/link'
import makeImageSizes from '../lib/utils/makeImageSizes'
import makeTruncatedString from '../lib/utils/makeTruncatedString'

type PropsType = {
  product: ProductType
}

export default function CarouselCard({ product }: PropsType) {
  const { title, id } = product

  const cardContainerClass = classNames(
    'relative',
    'h-[30vh]',
    'w-1/2',
    'flex-none',
    'md:w-1/3',
    'flex',
    'items-center',
    'justify-center'
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
    'p-2',
    'font-semibold',
    'text-[white]'
  )

  const imageContainerClass = classNames('bg-[white]')

  const imageClass = classNames('w-auto', 'object-contain')

  const imageSizes = {
    small: '30vw',
    medium: '35vw',
    large: '20vw',
  }

  return (
    <article className={cardContainerClass}>
      <Link href={`/${id}`}>
        <figure className={imageContainerClass}>
          <Image
            className={imageClass}
            src={product.image}
            height={200}
            width={200}
            alt={title}
            priority
            sizes={makeImageSizes(imageSizes)}
          />
        </figure>
        <div className={titleContainerClass}>
          <span className={titleClass}>{makeTruncatedString(title, 15)}</span>
        </div>
      </Link>
    </article>
  )
}
