'use client'

import fetchCategories, {
  CategoriesPayloadType,
} from '@/app/lib/fetch/fetchCategories'
import { ActionType } from '@/types'
import {
  Dispatch,
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from 'react'

export const fetchCategoriesAction = 'FETCH_CATEGORIES'

type StateType = {
  categories: string[]
  isLoading: boolean
}

const initialState: StateType = {
  categories: [],
  isLoading: true,
}

export const reducer = (
  state: StateType,
  action: ActionType<CategoriesPayloadType>
) => {
  switch (action.type) {
    case fetchCategoriesAction:
      return {
        ...state,
        categories: action.payload,
        isLoading: false,
      }
    default:
      return state
  }
}

export const makeCategories = (categories: CategoriesPayloadType) => ({
  type: fetchCategoriesAction,
  payload: categories,
})

export const CategoriesContext = createContext(initialState)

function makeActions(dispatch: Dispatch<ReturnType<typeof makeCategories>>) {
  return {
    fetchCategories: async () => {
      const payload = await fetchCategories()
      dispatch(makeCategories(payload))
    },
  }
}

export function CategoriesProvider({ children }: PropsWithChildren) {
  const [categories, dispatch] = useReducer(reducer, initialState)

  const actions = useMemo(() => makeActions(dispatch), [dispatch])

  useEffect(() => {
    actions.fetchCategories()
  }, [actions])

  return (
    <CategoriesContext.Provider value={categories}>
      {children}
    </CategoriesContext.Provider>
  )
}

export function useCategories() {
  return useContext(CategoriesContext)
}
