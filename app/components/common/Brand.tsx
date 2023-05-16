import classNames from 'classnames'
import Link from 'next/link'
import { BsTriangle } from 'react-icons/bs'

export default function Brand() {
  const mainContainerClass = classNames('flex', 'items-center', 'gap-2')

  const logoClass = classNames('border', 'rounded-full', 'h-10', 'w-10', 'p-1')

  const titleClass = classNames('font-bold')

  return (
    <Link href="/" className={mainContainerClass}>
      <BsTriangle className={logoClass} />
      <p className={titleClass}>FakeStore</p>
    </Link>
  )
}
