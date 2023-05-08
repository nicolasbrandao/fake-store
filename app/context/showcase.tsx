'use client'

import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  PropsWithChildren,
  Dispatch,
} from 'react'
import { ActionType, ProductType } from '@/types'
import fetchProducts, { ProductsPayloadType } from '@/app/lib/fetchProducts'

export const fetchShowcaselProductsAction = 'FETCH_SHOWCASE_PRODUCTS'

type StateType = {
  showcaseProducts: ProductType[]
}

const initialState: StateType = {
  showcaseProducts: [],
}

const reducer = (state: StateType, action: ActionType<ProductsPayloadType>) => {
  switch (action.type) {
    case fetchShowcaselProductsAction:
      return {
        ...state,
        showcaseProducts: action.payload,
      }
    default:
      return state
  }
}

export const makeShowcaseProducts = (products: ProductsPayloadType) => ({
  type: fetchShowcaselProductsAction,
  payload: products,
})

export const ShowcaseContext = createContext(initialState)

function makeActions(
  dispatch: Dispatch<ReturnType<typeof makeShowcaseProducts>>
) {
  return {
    fetchShowcaselProducts: async () => {
      const payload = await fetchProducts()
      dispatch(makeShowcaseProducts(payload))
    },
  }
}

export function ShowcaseProvider({ children }: PropsWithChildren) {
  const [showcaseProducts, dispatch] = useReducer(reducer, initialState)

  const actions = makeActions(dispatch)

  useEffect(() => {
    actions.fetchShowcaselProducts()
  }, [actions])
  return (
    <ShowcaseContext.Provider value={showcaseProducts}>
      {children}
    </ShowcaseContext.Provider>
  )
}

export function useShowcaseProducts() {
  return useContext(ShowcaseContext)
}
