import { ProductType } from '@/types'
import React from 'react'
import Image from 'next/image'
import classNames from 'classnames'
import Link from 'next/link'

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

  const MAX_TITLE_LENGTH = 15
  const truncatedTitle =
    title.length > MAX_TITLE_LENGTH
      ? `${title.substring(0, MAX_TITLE_LENGTH)}...`
      : title

  return (
    <Link href={`/${id}`} className={cardContainerClass}>
      <div className={imageContainerClass}>
        <Image
          src={product.image}
          height={200}
          width={200}
          alt={title}
          style={{ objectFit: 'contain' }}
        />
      </div>
      <div className={titleContainerClass}>
        <div className={titleClass}>{truncatedTitle}</div>
      </div>
    </Link>
  )
}
