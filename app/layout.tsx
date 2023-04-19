import './globals.css'
import React from 'react'
import classNames from 'classnames'
import Providers from './providers'
import Navbar from './components/Navbar'

export const metadata = {
  title: 'FakeStore',
  description: 'FakeStore App with Fake Store API',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const bodyClass = classNames('bg-background', 'text-foreground')
  return (
    <html lang="en">
      <body className={bodyClass}>
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  )
}
