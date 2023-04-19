import classNames from 'classnames'
import { FiShoppingBag } from 'react-icons/fi'
import { BsPersonCircle } from 'react-icons/bs'
import Brand from './common/Brand'

export default function Navbar() {
  const navClass = classNames(
    'flex',
    'justify-between',
    'p-6',
    'sticky',
    'top-0',
    'z-10'
  )
  const navListClass = classNames('flex', 'gap-4', 'items-center')
  const mainLinksContainerClass = classNames('flex', 'gap-4')
  const cartProfileContainerClass = classNames('flex', 'gap-6', 'text-2xl')

  return (
    <nav className={navClass}>
      <div className={navListClass}>
        <Brand />
        <ul className={mainLinksContainerClass}>
          <li>All</li>
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
