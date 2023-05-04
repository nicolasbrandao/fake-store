'use client'

import classNames from 'classnames'
import { FiShoppingBag } from 'react-icons/fi'
import { AiOutlineMinus, AiOutlinePlus, AiOutlineClose } from 'react-icons/ai'
import Link from 'next/link'
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
} from '@chakra-ui/react'
import { ProductType } from '@/types'
import { useContext } from 'react'
import Image from 'next/image'
import Brand from './common/Brand'
import { StoreContext, actionTypes } from '../context/store'

type CartProductPropsType = {
  product: ProductType
}

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
})

function CartProductCard({ product }: CartProductPropsType) {
  const { id, title, price, image } = product
  const { state, dispatch } = useContext(StoreContext)

  const quantity = state.cartProductsList.filter(
    (productObj) => productObj.id === id
  ).length

  const handleRemoveAllProductOcurrencesFromCart = (productId: number) => {
    dispatch({
      type: actionTypes.removeAllProductOcurrencesFromCart,
      payload: productId,
    })
  }

  const handleRemoveProductFromCart = (productId: number) => {
    dispatch({
      type: actionTypes.removeProductFromCart,
      payload: productId,
    })
  }

  const handleAddProductToCart = (productObj: ProductType) => {
    dispatch({
      type: actionTypes.addProductToCart,
      payload: productObj,
    })
  }

  const mainContainerClass = classNames(
    'flex',
    'flex-col',
    'text-black',
    'w-full'
  )

  const headerContainerClass = classNames('flex', 'gap-4', 'items-center')

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

  const titleClass = classNames('font-bold')

  const priceClass = classNames(
    'w-[320px]',
    'flex',
    'items-center',
    'justify-end'
  )

  const footerContainerClass = classNames('flex', 'items-center', 'gap-4')

  const quantityContainerClass = classNames('flex', 'items-center', 'w-full')

  const quantityNumberClass = classNames(
    'border',
    'border-[black]',
    'h-[1.5rem]',
    'w-full',
    'px-2'
  )

  const buttonsClass = classNames(
    'border',
    'border-[black]',
    'text-2xl',
    'h-[1.5rem]',
    'w-[1.5rem]'
  )

  const MAX_TITLE_LENGTH = 15
  const truncatedTitle =
    title.length > MAX_TITLE_LENGTH
      ? `${title.substring(0, MAX_TITLE_LENGTH)}...`
      : title

  return (
    <div className={mainContainerClass}>
      <div className={headerContainerClass}>
        <div className={imageContainerClass}>
          <Image src={image} alt={title} height={50} width={50} />
        </div>
        <p className={titleClass}>{truncatedTitle}</p>
        <p className={priceClass}>{formatter.format(price * quantity)}</p>
      </div>
      <div className={footerContainerClass}>
        <AiOutlineClose
          className={buttonsClass}
          onClick={() => handleRemoveAllProductOcurrencesFromCart(id)}
        />
        <div className={quantityContainerClass}>
          <p className={quantityNumberClass}>{quantity}</p>
          <AiOutlineMinus
            className={buttonsClass}
            onClick={() => handleRemoveProductFromCart(id)}
          />
          <AiOutlinePlus
            className={buttonsClass}
            onClick={() => handleAddProductToCart(product)}
          />
        </div>
      </div>
    </div>
  )
}

function Cart() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { state } = useContext(StoreContext)

  const cartUniqueProductsList: ProductType[] = Object.values(
    state.cartProductsList.reduce((acc: Record<number, ProductType>, obj) => {
      acc[obj.id] = obj
      return acc
    }, {})
  )

  const totalPrice = state.cartProductsList.reduce(
    (acc, item) => acc + item.price,
    0
  )

  const handleClick = () => {
    onOpen()
  }

  const cartIconContainerClass = classNames('flex', 'relative')

  const cartLengthContainerClass = classNames(
    'text-black',
    'bg-white',
    'rounded-full',
    'text-xs',
    'w-[1rem]',
    'h-[1rem]',
    'text-center',
    'absolute',
    'top-4',
    'left-3',
    state.cartProductsList.length === 0 ? 'hidden' : 'flex',
    'items-center',
    'justify-center'
  )

  const drawerBodyClass = classNames('flex', 'flex-col', 'gap-4')

  const drawerFooterClass = classNames('flex', 'flex-col')

  const footerTableClass = classNames(
    'w-full',
    'text-[black]',
    'flex',
    'flex-col',
    'gap-1'
  )

  const tableRowClass = classNames(
    'flex',
    'justify-between',
    'first:border-t-[black]',
    'first:border-t',
    'last:border-t-[black]',
    'last:border-t',
    'last:font-bold'
  )

  return (
    <>
      <div className={cartIconContainerClass}>
        <FiShoppingBag onClick={() => handleClick()} />
        <p className={cartLengthContainerClass}>
          {state.cartProductsList.length}
        </p>
      </div>

      <Drawer onClose={onClose} isOpen={isOpen} size="xs">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton color="black" />
          <DrawerHeader color="black">My Cart</DrawerHeader>
          <DrawerBody className={drawerBodyClass}>
            {cartUniqueProductsList.map((product: ProductType) => (
              <CartProductCard product={product} />
            ))}
          </DrawerBody>
          <DrawerFooter className={drawerFooterClass}>
            <div className={footerTableClass}>
              <div className={tableRowClass}>
                <p>Subtotal</p>
                <p>{formatter.format(totalPrice)}</p>
              </div>
              <div className={tableRowClass}>
                <p>Taxes</p>
                <p>$0.00</p>
              </div>
              <div className={tableRowClass}>
                <p>Shipping</p>
                <p>Calculated at checkout</p>
              </div>
              <div className={tableRowClass}>
                <p>Total</p>
                <p>{formatter.format(totalPrice)}</p>
              </div>
            </div>
            <Button
              size="md"
              height="48px"
              border="2px"
              textColor="black"
              borderColor="black"
              marginTop="10px"
              _hover={{
                bg: 'black',
                textColor: 'white',
                borderColor: 'black',
              }}
            >
              PROCEED TO CHECKOUT
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default function Navbar() {
  const navClass = classNames(
    'flex',
    'justify-between',
    'p-6',
    'fixed',
    'top-0',
    'w-full',
    'z-10',
    'bg-background'
  )
  const navListClass = classNames('flex', 'gap-4', 'items-center')
  const mainLinksContainerClass = classNames('flex', 'gap-4')
  const cartProfileContainerClass = classNames('flex', 'gap-6', 'text-2xl')

  return (
    <nav className={navClass}>
      <div className={navListClass}>
        <Brand />
        <ul className={mainLinksContainerClass}>
          <li>
            <Link href="/filter">Filters</Link>
          </li>
        </ul>
      </div>
      <div className={cartProfileContainerClass}>
        <Cart />
      </div>
    </nav>
  )
}
