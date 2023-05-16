'use client'

import classNames from 'classnames'
import Link from 'next/link'
import Brand from './common/Brand'
import Cart from './Cart'

export default function Navbar() {
  const navClass = classNames(
    'flex',
    'justify-between',
    'p-6',
    'fixed',
    'top-0',
    'w-full',
    'z-20',
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
