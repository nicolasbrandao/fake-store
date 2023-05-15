'use client'

import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  PropsWithChildren,
  Dispatch,
  useMemo,
} from 'react'
import { ActionType, ProductType } from '@/types'
import fetchSingleProduct, {
  SingleProductPayloadType,
} from '@/app/lib/fetchSingleProduct'

export const fetchSingleProductAction = 'FETCH_SINGLE_PRODUCT'

type StateType = {
  singleProduct: ProductType
  isLoading: boolean
}

const initialState: StateType = {
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
  isLoading: true,
}

const reducer = (
  state: StateType,
  action: ActionType<SingleProductPayloadType>
) => {
  switch (action.type) {
    case fetchSingleProductAction:
      return {
        ...state,
        singleProduct: action.payload,
        isLoading: false,
      }
    default:
      return state
  }
}

export const makeSingleProduct = (product: SingleProductPayloadType) => ({
  type: fetchSingleProductAction,
  payload: product,
})

export const SingleProductContext = createContext(initialState)

function makeActions(
  dispatch: Dispatch<ReturnType<typeof makeSingleProduct>>,
  productId: number
) {
  return {
    fetchSingleProduct: async () => {
      const payload = await fetchSingleProduct(productId)
      dispatch(makeSingleProduct(payload))
    },
  }
}

type SingleProductProviderProps = PropsWithChildren<{ productId: number }>

export function SingleProductProvider({
  productId,
  children,
}: SingleProductProviderProps) {
  const [singleProduct, dispatch] = useReducer(reducer, initialState)

  const actions = useMemo(
    () => makeActions(dispatch, productId),
    [dispatch, productId]
  )

  useEffect(() => {
    actions.fetchSingleProduct()
  }, [actions])

  return (
    <SingleProductContext.Provider value={singleProduct}>
      {children}
    </SingleProductContext.Provider>
  )
}

export function useSingleProduct() {
  return useContext(SingleProductContext)
}
