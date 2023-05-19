import './globals.css'
import React from 'react'
import classNames from 'classnames'
import { Montserrat } from 'next/font/google'
import Providers from './providers'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
})

export const metadata = {
  title: 'FakeStore',
  description: 'FakeStore App with Fake Store API',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const bodyClass = classNames(
    'bg-background',
    'text-foreground',
    'overflow-x-hidden',
    'min-w-screen',
    montserrat.className
  )

  const mainContainerClas = classNames(
    'min-h-screen',
    'flex',
    'flex-col',
    'pt-[6rem]',
    'max-w-[60rem]',
    'justify-between',
    'items-center',
    'mx-auto'
  )

  return (
    <html lang="en">
      <body className={bodyClass}>
        <Providers>
          <Navbar />
          <div className={mainContainerClas}>
            {children}
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  )
}
