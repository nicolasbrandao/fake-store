import Image from 'next/image'
import React from 'react'
import classNames from 'classnames'
import { Button, Skeleton, SkeletonText } from '@chakra-ui/react'
import { AiOutlineStar } from 'react-icons/ai'
import { FaRegCommentDots } from 'react-icons/fa'
import Carousel from '@/app/components/Carousel'
import Link from 'next/link'
import { ProductType } from '@/types'
import { actionTypes, useCart } from '@/app/context/cart'
import { useSingleProduct } from '@/app/context/singleProduct'

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
})

export default function ProductDetails() {
  const { singleProduct, isLoading } = useSingleProduct()

  const { dispatch } = useCart()

  const handleAddProductToCart = (product: ProductType) => {
    dispatch({
      type: actionTypes.addProductToCart,
      payload: product,
    })
  }

  const mainContainerClass = classNames('flex', 'flex-col', 'gap-4')

  const productContainerClass = classNames('flex', 'flex-col', 'md:flex-row')

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
    'w-full',
    'md:w-1/2',
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

  const relatedProductsTitleClass = classNames('text-2xl', 'font-bold')

  return (
    <div className={mainContainerClass}>
      <div className={productContainerClass}>
        <div className={imageWrapperClass}>
          <Skeleton isLoaded={!isLoading}>
            <Image
              src={singleProduct.image}
              alt={singleProduct.title}
              width={500}
              height={500}
              style={{ width: 500, height: 'auto' }}
              priority
            />
          </Skeleton>
        </div>
        <div className={productInfoClass}>
          <div className={headerContainerClass}>
            <Skeleton isLoaded={!isLoading}>
              <h2 className={titleClass}>{singleProduct.title}</h2>
            </Skeleton>
            <Skeleton isLoaded={!isLoading}>
              <div className={subtitleContainerClass}>
                <Link href={`/filter/${singleProduct.category}`}>
                  <p className={categoryClass}>{singleProduct.category}</p>
                </Link>
                <div className={ratingsContainerClass}>
                  <AiOutlineStar />
                  <p>{singleProduct.rating.rate}</p>
                  <FaRegCommentDots />
                  <p>{singleProduct.rating.count}</p>
                </div>
              </div>
            </Skeleton>
          </div>
          <Skeleton isLoaded={!isLoading}>
            <p className={priceClass}>
              {formatter.format(singleProduct.price)}
            </p>
          </Skeleton>
          <SkeletonText isLoaded={!isLoading}>
            <p>{singleProduct.description}</p>
          </SkeletonText>
          <Skeleton isLoaded={!isLoading}>
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
              onClick={() => handleAddProductToCart(singleProduct)}
            >
              ADD TO CART
            </Button>
          </Skeleton>
        </div>
      </div>
      <div>
        <Skeleton isLoaded={!isLoading}>
          <h2 className={relatedProductsTitleClass}>Related Products</h2>
        </Skeleton>
        <Carousel />
      </div>
    </div>
  )
}
