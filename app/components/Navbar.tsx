'use client'

import classNames from 'classnames'
import { FiShoppingBag } from 'react-icons/fi'
import { GiGameConsole } from 'react-icons/gi'
import { AiOutlineMinus, AiOutlinePlus, AiOutlineClose } from 'react-icons/ai'
import Link from 'next/link'
import React from 'react'
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
import Brand from './common/Brand'

function CartProductCard() {
  const mainContainerClass = classNames(
    'flex',
    'flex-col',
    'text-black',
    'w-full'
  )

  const headerContainerClass = classNames('flex', 'gap-4', 'items-center')

  const titleClass = classNames('font-bold')

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

  return (
    <div className={mainContainerClass}>
      <div className={headerContainerClass}>
        <GiGameConsole className="text-8xl" />
        <p className={titleClass}>Product Title</p>
        <p>$59.90</p>
      </div>
      <div className={footerContainerClass}>
        <AiOutlineClose className={buttonsClass} />
        <div className={quantityContainerClass}>
          <p className={quantityNumberClass}>2</p>
          <AiOutlineMinus className={buttonsClass} />
          <AiOutlinePlus className={buttonsClass} />
        </div>
      </div>
    </div>
  )
}

function Cart() {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const handleClick = () => {
    onOpen()
  }

  const drawerBodyClass = classNames('flex', 'flex-col', 'gap-4')

  const drawerFooterClass = classNames('flex', 'flex-col')

  const footerTableClass = classNames('w-full', 'text-[black]','flex', 'flex-col', 'gap-1')

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
      <FiShoppingBag onClick={() => handleClick()} />

      <Drawer onClose={onClose} isOpen={isOpen} size="xs">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton color="black" />
          <DrawerHeader color="black">My Cart</DrawerHeader>
          <DrawerBody className={drawerBodyClass}>
            <CartProductCard />
            <CartProductCard />
            <CartProductCard />
          </DrawerBody>
          <DrawerFooter className={drawerFooterClass}>
            <div className={footerTableClass}>
              <div className={tableRowClass}>
                <p>Subtotal</p>
                <p>$159.00</p>
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
                <p>$159.00</p>
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
            <Link href="/filter">All</Link>
          </li>
          <li>New Arrivals</li>
          <li>Featured</li>
        </ul>
      </div>
      <div className={cartProfileContainerClass}>
        <Cart />
      </div>
    </nav>
  )
}
