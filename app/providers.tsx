'use client'

import React from 'react'
import { CacheProvider } from '@chakra-ui/next-js'
import { ChakraProvider } from '@chakra-ui/react'
import { CartProvider } from './context/cart'

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CacheProvider>
      <ChakraProvider>
        <CartProvider>{children}</CartProvider>
      </ChakraProvider>
    </CacheProvider>
  )
}
