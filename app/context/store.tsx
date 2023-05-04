'use client'

import React, { Dispatch, createContext, useReducer } from 'react'
import { ProductType } from '@/types'

export const actionTypes = {
  fetchAllProducts: 'fetchAllProducts',
  fetchProductsByCategory: 'fetchProductsByCategory',
  fetchShowcaseProducts: 'fetchShowcaseProducts',
  fetchCarouselProducts: 'fetchCarouselProducts',
  fetchSingleProduct: 'fetchSingleProduct',
  fetchCategories: 'fetchCategories',
  fetchGithubStats: 'fetchGithubStats',
  addProductToCart: 'addProductToCart',
  removeProductFromCart: 'removeProductFromCart',
  removeAllProductOcurrencesFromCart: 'removeAllProductOcurrencesFromCart',
}

type StateType = {
  productsList: ProductType[]
  productsByCategoryList: ProductType[]
  showcaseProductsList: ProductType[]
  carouselProductsList: ProductType[]
  singleProduct: ProductType
  categories: string[]
  githubStats: {
    stars: number
    forks: number
  }
  cartProductsList: ProductType[]
}

type ActionType = {
  type: string
  payload: any
}

const initialState: StateType = {
  productsList: [],
  productsByCategoryList: [],
  showcaseProductsList: [],
  carouselProductsList: [],
  singleProduct: {
    id: 0,
    title: '',
    price: 0,
    description: '',
    category: '',
    image: '',
    rating: {
      rate: 0,
      count: 0,
    },
  },
  categories: [],
  githubStats: {
    stars: 0,
    forks: 0,
  },
  cartProductsList: [],
}

const reducer = (state: StateType, action: ActionType) => {
  switch (action.type) {
    case actionTypes.fetchAllProducts:
      return {
        ...state,
        productsList: action.payload,
      }
    case actionTypes.fetchProductsByCategory:
      return {
        ...state,
        productsByCategoryList: action.payload,
      }
    case actionTypes.fetchShowcaseProducts:
      return {
        ...state,
        showcaseProductsList: action.payload,
      }
    case actionTypes.fetchCarouselProducts:
      return {
        ...state,
        carouselProductsList: action.payload,
      }
    case actionTypes.fetchCategories:
      return {
        ...state,
        categories: action.payload,
      }
    case actionTypes.fetchGithubStats:
      return {
        ...state,
        githubStats: {
          stars: action.payload.stargazers_count,
          forks: action.payload.forks_count,
        },
      }
    case actionTypes.fetchSingleProduct:
      return {
        ...state,
        singleProduct: action.payload,
      }
    case actionTypes.addProductToCart:
      return {
        ...state,
        cartProductsList: [action.payload, ...state.cartProductsList],
      }
    case actionTypes.removeProductFromCart:
      if (
        state.cartProductsList.findIndex(
          (product) => product.id === action.payload
        ) !== -1
      ) {
        return {
          ...state,
          cartProductsList: [
            ...state.cartProductsList.slice(
              0,
              state.cartProductsList.findIndex(
                (product) => product.id === action.payload
              )
            ),
            ...state.cartProductsList.slice(
              state.cartProductsList.findIndex(
                (product) => product.id === action.payload
              ) + 1
            ),
          ],
        }
      }
      return state
    case actionTypes.removeAllProductOcurrencesFromCart:
      return {
        ...state,
        cartProductsList: state.cartProductsList.filter(
          (product) => product.id !== action.payload
        ),
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
