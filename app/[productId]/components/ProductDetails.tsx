import { ProductType } from '@/types'
import Image from 'next/image'
import React, { useContext } from 'react'
import classNames from 'classnames'
import { Button } from '@chakra-ui/react'
import { AiOutlineStar } from 'react-icons/ai'
import { FaRegCommentDots } from 'react-icons/fa'
import Carousel from '@/app/components/Carousel'
import Link from 'next/link'
import { StoreContext, actionTypes } from '@/app/context/store'

type PropsType = {
  product: ProductType
}

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
})

export default function ProductDetails({ product }: PropsType) {
  const {
    description,
    image,
    title,
    category,
    price,
    rating: { rate, count },
  } = product

  const { dispatch } = useContext(StoreContext)

  const handleAddProductToCart = () => {
    dispatch({
      type: actionTypes.addProductToCart,
      payload: product,
    })
  }

  const mainContainerClass = classNames('flex', 'flex-col', 'gap-4')

  const productContainerClass = classNames('flex')

  const imageWrapperClass = classNames(
    'aspect-square',
    'w-full',
    'overflow-clip',
    'flex',
    'items-center',
    'justify-center',
    'object-cover',
    'bg-[white]'
  )

  const productInfoClass = classNames(
    'flex',
    'flex-col',
    'p-4',
    'w-1/2',
    'justify-between',
    'h-full'
  )

  const headerContainerClass = classNames('flex', 'flex-col', 'gap-2')

  const subtitleContainerClass = classNames('flex', 'gap-4')

  const titleClass = classNames('font-bold', 'text-3xl')

  const categoryClass = classNames(
    'border',
    'rounded',
    'w-fit',
    'p-1',
    'text-sm'
  )

  const ratingsContainerClass = classNames('flex', 'gap-2', 'items-center')

  const priceClass = classNames('font-bold', 'text-2xl')

  const relatedProductsTitle = classNames('text-2xl', 'font-bold')

  return (
    <div className={mainContainerClass}>
      <div className={productContainerClass}>
        <div className={imageWrapperClass}>
          <Image src={image} width={500} height={500} alt={title} />
        </div>
        <div className={productInfoClass}>
          <div className={headerContainerClass}>
            <h2 className={titleClass}>{title}</h2>
            <div className={subtitleContainerClass}>
              <Link href={`/filter/${category}`}>
                <p className={categoryClass}>{category}</p>
              </Link>
              <div className={ratingsContainerClass}>
                <AiOutlineStar />
                <p>{rate}</p>
                <FaRegCommentDots />
                <p>{count}</p>
              </div>
            </div>
          </div>
          <p className={priceClass}>{formatter.format(price)}</p>
          <p>{description}</p>
          <Button
            size="md"
            height="48px"
            width="200px"
            border="2px"
            borderColor="white"
            _hover={{
              bg: 'lightgray',
              textColor: 'black',
              borderColor: 'lightgray',
            }}
            onClick={handleAddProductToCart}
          >
            ADD TO CART
          </Button>
        </div>
      </div>
      <div>
        <h2 className={relatedProductsTitle}>Related Products</h2>
        <Carousel />
      </div>
    </div>
  )
}
