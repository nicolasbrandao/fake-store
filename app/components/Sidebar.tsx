'use client'

import React, { useEffect, useContext } from 'react'
import { actionTypes, StoreContext } from '../context/store'
import fetchCategories from '../lib/fetchCategories'

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
        <li>All</li>
        {state.categories.map((category: string) => (
          <li key={category}>{category}</li>
        ))}
      </ul>
    </div>
  )
}
