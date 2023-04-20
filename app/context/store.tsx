'use client'

import React, { Dispatch, createContext, useReducer } from 'react'
import { ProductType } from '@/types'

export const actionTypes = {
  fetchAllProducts: 'fetchAllProducts',
}

type StateType = {
  productsList: ProductType[]
}

type ActionType = {
  type: string
  payload: any
}

const initialState: StateType = {
  productsList: [],
}

const reducer = (state: StateType, action: ActionType) => {
  switch (action.type) {
    case actionTypes.fetchAllProducts:
      return {
        ...state,
        productsList: action.payload,
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
