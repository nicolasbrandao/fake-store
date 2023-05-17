import classNames from 'classnames'
import { FiShoppingBag } from 'react-icons/fi'
import { AiOutlineMinus, AiOutlinePlus, AiOutlineClose } from 'react-icons/ai'
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
import Image from 'next/image'
import Link from 'next/link'
import { KeyboardEvent } from 'react'
import { actionTypes, useCart } from '../context/cart'
import makeImageSizes from '../lib/utils/makeImageSizes'

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
})

type CartProductPropsType = {
  product: ProductType
}

const actions = {
  clear: 'CLEAR',
  remove: 'REMOVE',
  add: 'ADD',
}

type ActionType<T> = {
  type: string
  payload: T
}

function CartProductCard({ product }: CartProductPropsType) {
  const { id, title, price, image } = product
  const { cartProducts, dispatch } = useCart()

  const quantity = cartProducts.filter(
    (productObj) => productObj.id === id
  ).length

  const handleClearProductInCart = (productId: number) => {
    dispatch({
      type: actionTypes.clearProductInCart,
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

  const handleKeyDown = (
    event: KeyboardEvent,
    action: ActionType<ProductType | number>
  ) => {
    if (event.key === 'Enter') {
      switch (action.type) {
        case actions.clear:
          handleClearProductInCart(action.payload as number)
          break
        case actions.remove:
          handleRemoveProductFromCart(action.payload as number)
          break
        case actions.add:
          handleAddProductToCart(action.payload as ProductType)
          break
        default:
          break
      }
    }
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

  const imageClass = classNames('w-auto', 'object-contain')

  const imageSizes = {
    small: '20vw',
    medium: '20vw',
    large: '20vw',
  }

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
    <article className={mainContainerClass}>
      <Link href={`/${id}`}>
        <header className={headerContainerClass}>
          <figure className={imageContainerClass}>
            <Image
              src={image}
              alt={title}
              height={50}
              width={50}
              className={imageClass}
              sizes={makeImageSizes(imageSizes)}
            />
          </figure>
          <h3 className={titleClass}>{truncatedTitle}</h3>
          <span className={priceClass}>
            {formatter.format(price * quantity)}
          </span>
        </header>
      </Link>
      <div className={footerContainerClass}>
        <AiOutlineClose
          className={buttonsClass}
          onClick={() => handleClearProductInCart(id)}
          onKeyDown={(event) =>
            handleKeyDown(event, { type: actions.clear, payload: id })
          }
          tabIndex={0}
        />
        <div className={quantityContainerClass}>
          <p className={quantityNumberClass}>{quantity}</p>
          <AiOutlineMinus
            className={buttonsClass}
            onClick={() => handleRemoveProductFromCart(id)}
            onKeyDown={(event) =>
              handleKeyDown(event, { type: actions.remove, payload: id })
            }
            tabIndex={0}
          />
          <AiOutlinePlus
            className={buttonsClass}
            onClick={() => handleAddProductToCart(product)}
            onKeyDown={(event) =>
              handleKeyDown(event, { type: actions.add, payload: product })
            }
            tabIndex={0}
          />
        </div>
      </div>
    </article>
  )
}

export default function Cart() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { cartProducts } = useCart()

  const cartUniqueProductsList: ProductType[] = Object.values(
    cartProducts.reduce((acc: Record<number, ProductType>, obj) => {
      acc[obj.id] = obj
      return acc
    }, {})
  )

  const totalPrice = cartProducts.reduce((acc, item) => acc + item.price, 0)

  const handleClick = () => {
    onOpen()
  }

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      onOpen()
    }
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
    cartProducts.length === 0 ? 'hidden' : 'flex',
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
        <FiShoppingBag
          onClick={() => handleClick()}
          tabIndex={0}
          onKeyDown={(event) => handleKeyDown(event)}
        />
        <p className={cartLengthContainerClass}>{cartProducts.length}</p>
      </div>

      <Drawer onClose={onClose} isOpen={isOpen} size="xs">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton color="black" />
          <DrawerHeader color="black">My Cart</DrawerHeader>
          <DrawerBody className={drawerBodyClass}>
            {cartUniqueProductsList.map((product: ProductType) => (
              <CartProductCard product={product} key={product.title} />
            ))}
          </DrawerBody>
          <DrawerFooter className={drawerFooterClass}>
            <footer className={footerTableClass}>
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
            </footer>
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
              tabIndex={0}
            >
              PROCEED TO CHECKOUT
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}
