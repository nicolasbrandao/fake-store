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
import fetchProductsByCategory, {
  ProductsPayloadType,
} from '@/app/lib/fetchProductsByCategory'

export const fetchProductsByCategoryAction = 'FETCH_PRODUCTS_BY_CATEGORY'

type StateType = {
  productsByCategory: ProductType[]
}

const initialState: StateType = {
  productsByCategory: [],
}

const reducer = (state: StateType, action: ActionType<ProductsPayloadType>) => {
  switch (action.type) {
    case fetchProductsByCategoryAction:
      return {
        ...state,
        productsByCategory: action.payload,
      }
    default:
      return state
  }
}

export const makeProductsByCategory = (products: ProductsPayloadType) => ({
  type: fetchProductsByCategoryAction,
  payload: products,
})

export const ProductsByCategoryContext = createContext(initialState)

type ProductsByCategoryProviderProps = PropsWithChildren<{ category: string }>

function makeActions(
  dispatch: Dispatch<ReturnType<typeof makeProductsByCategory>>,
  category: string
) {
  return {
    fetchProductsByCategory: async () => {
      const payload = await fetchProductsByCategory({ category })
      dispatch(makeProductsByCategory(payload))
    },
  }
}

export function ProductsByCategoryProvider({
  category,
  children,
}: ProductsByCategoryProviderProps) {
  const [productsByCategory, dispatch] = useReducer(reducer, initialState)

  const actions = makeActions(dispatch, category)

  useEffect(() => {
    actions.fetchProductsByCategory()
  })
  return (
    <ProductsByCategoryContext.Provider value={productsByCategory}>
      {children}
    </ProductsByCategoryContext.Provider>
  )
}

export function useProductsByCategory() {
  return useContext(ProductsByCategoryContext)
}
