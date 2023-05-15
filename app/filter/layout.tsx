import React from 'react'
import classNames from 'classnames'
import Sidebar from '../components/Sidebar'

export const metadata = {
  title: 'FakeStore',
  description: 'FakeStore App with Fake Store API',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const filterContainerClass = classNames(
    'flex',
    'flex-col',
    'md:flex-row',
    'min-w-full',
    'min-h-[500px]'
  )

  return (
    <main className={filterContainerClass}>
      <Sidebar />
      {children}
    </main>
  )
}
