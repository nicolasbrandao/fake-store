'use client'

import React, { useEffect, useContext } from 'react'
import Link from 'next/link'
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

  return (
    <div>
      <ul>
        <li>Categories</li>
        <li>
          <Link href="/filter">All</Link>
        </li>
        {state.categories.map((category: string) => (
          <li key={category}>
            <Link href={`/filter/${category}`}>{category}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
