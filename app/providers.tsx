'use client'

import React from 'react'
import { CacheProvider } from '@chakra-ui/next-js'
import { ChakraProvider } from '@chakra-ui/react'
import { StoreContextProvider } from './context/store'

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CacheProvider>
      <ChakraProvider>
        <StoreContextProvider>{children}</StoreContextProvider>
      </ChakraProvider>
    </CacheProvider>
  )
}
