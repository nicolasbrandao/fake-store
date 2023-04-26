'use client'

import classNames from 'classnames'
import { FiShoppingBag } from 'react-icons/fi'
import Link from 'next/link'
import React from 'react'
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
} from '@chakra-ui/react'
import Brand from './common/Brand'

function Cart() {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const handleClick = () => {
    onOpen()
  }

  return (
    <>
      <FiShoppingBag onClick={() => handleClick()} />

      <Drawer onClose={onClose} isOpen={isOpen} size="xs">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>My Cart</DrawerHeader>
          <DrawerBody>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Consequat nisl vel pretium lectus quam id. Semper quis lectus
              nulla at volutpat diam ut venenatis. Dolor morbi non arcu risus
              quis varius quam quisque. Massa ultricies mi quis hendrerit dolor
              magna eget est lorem. Erat imperdiet sed euismod nisi porta.
              Lectus vestibulum mattis ullamcorper velit.
            </p>
          </DrawerBody>
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
