'use client'

import Link from 'next/link'
import classNames from 'classnames'
import { useCategories, CategoriesProvider } from '@/app/context/categories'
import { SkeletonText } from '@chakra-ui/react'

function SidebarContent() {
  const { categories, isLoading } = useCategories()

  const categoriesListClass = classNames(
    'p-4',
    'w-[250px]',
    'flex',
    'flex-col',
    'gap-2'
  )

  const listTitleClass = classNames('font-bold', 'text-xl')

  return (
    <ul className={categoriesListClass}>
      <li className={listTitleClass}>Categories</li>
      <li>
        <Link href="/filter">all</Link>
      </li>
      <SkeletonText isLoaded={!isLoading}>
        {categories.map((category: string) => (
          <li key={category}>
            <Link href={`/filter/${category}`}>{category}</Link>
          </li>
        ))}
      </SkeletonText>
    </ul>
  )
}

export default function Sidebar() {
  return (
    <CategoriesProvider>
      <SidebarContent />
    </CategoriesProvider>
  )
}
