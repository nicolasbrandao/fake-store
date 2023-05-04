'use client'

import React, { useEffect, useContext } from 'react'
import Link from 'next/link'
import classNames from 'classnames'
import { actionTypes, StoreContext } from '../../context/store'
import fetchCategories from '../../lib/fetchCategories'

export default function Sidebar() {
  const { state, dispatch } = useContext(StoreContext)

  useEffect(() => {
    fetchCategories().then((data) => {
      dispatch({
        type: actionTypes.fetchCategories,
        payload: data,
      })
    })
  }, [dispatch])

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
      {state.categories.map((category: string) => (
        <li key={category}>
          <Link href={`/filter/${category}`}>{category}</Link>
        </li>
      ))}
    </ul>
  )
}
