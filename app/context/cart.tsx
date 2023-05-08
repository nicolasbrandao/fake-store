'use client'

import React, {
  createContext,
  useContext,
  useReducer,
  PropsWithChildren,
  Dispatch,
} from 'react'
import { ActionType, ProductType } from '@/types'

export const actionTypes = {
  addProductToCart: 'ADD_PRODUCT_TO_CART',
  removeProductFromCart: 'REMOVE_PRODUCT_FROM_CART',
  removeAllProductOcurrencesFromCart: 'REMOVE_ALL_PRODUCT_OCURRENCES_FROM_CART',
}

type StateType = {
  cartProducts: ProductType[]
}

const initialState: StateType = {
  cartProducts: [],
}

const reducer = (
  state: StateType,
  action: ActionType<ProductType | number>
) => {
  switch (action.type) {
    case actionTypes.addProductToCart:
      return {
        ...state,
        cartProducts: [action.payload as ProductType, ...state.cartProducts],
      }
    case actionTypes.removeProductFromCart:
      if (
        state.cartProducts.findIndex(
          (product) => product.id === (action.payload as number)
        ) !== -1
      ) {
        return {
          ...state,
          cartProducts: [
            ...state.cartProducts.slice(
              0,
              state.cartProducts.findIndex(
                (product) => product.id === (action.payload as number)
              )
            ),
            ...state.cartProducts.slice(
              state.cartProducts.findIndex(
                (product) => product.id === (action.payload as number)
              ) + 1
            ),
          ],
        }
      }
      return state
    case actionTypes.removeAllProductOcurrencesFromCart:
      return {
        ...state,
        cartProducts: state.cartProducts.filter(
          (product) => product.id !== (action.payload as number)
        ),
      }
    default:
      return state
  }
}

export const CartProductsContext = createContext(initialState)

type CartDispatchContextType = Dispatch<ActionType<ProductType | number>>
export const CartDispatchContext = createContext<CartDispatchContextType>(
  () => {}
)

export function CartProvider({ children }: PropsWithChildren) {
  const [cartProducts, dispatch] = useReducer(reducer, initialState)

  return (
    <CartProductsContext.Provider value={cartProducts}>
      <CartDispatchContext.Provider value={dispatch}>
        {children}
      </CartDispatchContext.Provider>
    </CartProductsContext.Provider>
  )
}

export function useCart() {
  const { cartProducts } = useContext(CartProductsContext)
  const dispatch = useContext(CartDispatchContext)
  return { cartProducts, dispatch }
}
