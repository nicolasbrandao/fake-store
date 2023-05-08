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

export const fetchCarouselProductsAction = 'FETCH_CAROUSEL_PRODUCTS'

type StateType = {
  carouselProducts: ProductType[]
}

const initialState: StateType = {
  carouselProducts: [],
}

const reducer = (state: StateType, action: ActionType<ProductsPayloadType>) => {
  switch (action.type) {
    case fetchCarouselProductsAction:
      return {
        ...state,
        carouselProducts: action.payload,
      }
    default:
      return state
  }
}

export const makeCarouselProducts = (products: ProductsPayloadType) => ({
  type: fetchCarouselProductsAction,
  payload: products,
})

export const CarouselContext = createContext(initialState)

function makeActions(
  dispatch: Dispatch<ReturnType<typeof makeCarouselProducts>>
) {
  return {
    fetchCarouselProducts: async () => {
      const payload = await fetchProducts({ limit: 8 })
      dispatch(makeCarouselProducts(payload))
    },
  }
}

export function CorouselProvider({ children }: PropsWithChildren) {
  const [carouselProducts, dispatch] = useReducer(reducer, initialState)

  const actions = makeActions(dispatch)

  useEffect(() => {
    actions.fetchCarouselProducts()
  }, [actions])

  return (
    <CarouselContext.Provider value={carouselProducts}>
      {children}
    </CarouselContext.Provider>
  )
}

export function useCarouselProducts() {
  return useContext(CarouselContext)
}
