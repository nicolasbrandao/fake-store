'use client'

import fetchCategories, {
  CategoriesPayloadType,
} from '@/app/lib/fetchCategories'
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
}

const initialState: StateType = {
  categories: [],
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
