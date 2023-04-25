import classNames from 'classnames'
import { FiShoppingBag } from 'react-icons/fi'
import { BsPersonCircle } from 'react-icons/bs'
import Link from 'next/link'
import Brand from './common/Brand'

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
        <FiShoppingBag />
        <BsPersonCircle />
      </div>
    </nav>
  )
}
