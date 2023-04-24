'use client'

import React, { Dispatch, createContext, useReducer } from 'react'
import { ProductType } from '@/types'

export const actionTypes = {
  fetchAllProducts: 'fetchAllProducts',
  fetchGithubStats: 'fetchGithubStats',
}

type StateType = {
  productsList: ProductType[]
  githubStats: {
    stars: number
    forks: number
  }
}

type ActionType = {
  type: string
  payload: any
}

const initialState: StateType = {
  productsList: [],
  githubStats: {
    stars: 0,
    forks: 0,
  },
}

const reducer = (state: StateType, action: ActionType) => {
  switch (action.type) {
    case actionTypes.fetchAllProducts:
      return {
        ...state,
        productsList: action.payload,
      }
    case actionTypes.fetchGithubStats:
      return {
        ...state,
        githubStats: {
          stars: action.payload.stargazers_count,
          forks: action.payload.forks_count,
        },
      }
    default:
      return state
  }
}

export const StoreContext = createContext<{
  state: StateType
  dispatch: Dispatch<ActionType>
}>({ state: initialState, dispatch: () => null })

export function StoreContextProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  )
}
