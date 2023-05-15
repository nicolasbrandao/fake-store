'use client'

import fetchGithubStats, {
  GithubStatsPayloadType,
} from '@/app/lib/fetchGithubStats'
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

const fetchGithubStatsAction = 'FETCH_GITHUB_STATS'

const initialState = {
  stars: 0,
  forks: 0,
  isLoading: true,
}

type StateType = typeof initialState

export const reducer = (
  state: StateType,
  action: ActionType<GithubStatsPayloadType>
) => {
  switch (action.type) {
    case fetchGithubStatsAction:
      return {
        ...state,
        stars: action.payload.stargazers_count,
        forks: action.payload.forks_count,
        isLoading: false,
      }
    default:
      return state
  }
}

export const makeGithubStats = (githubStats: GithubStatsPayloadType) => ({
  type: fetchGithubStatsAction,
  payload: githubStats,
})

export const GithubStatsContext = createContext(initialState)

function makeActions(dispatch: Dispatch<ReturnType<typeof makeGithubStats>>) {
  return {
    fetchGithubStats: async () => {
      const payload = await fetchGithubStats()
      dispatch(makeGithubStats(payload))
    },
  }
}

export function GithubStatsProvider({ children }: PropsWithChildren) {
  const [githubStats, dispatch] = useReducer(reducer, initialState)

  const actions = useMemo(() => makeActions(dispatch), [dispatch])

  useEffect(() => {
    actions.fetchGithubStats()
  }, [actions])

  return (
    <GithubStatsContext.Provider value={githubStats}>
      {children}
    </GithubStatsContext.Provider>
  )
}

export function useGithubStats() {
  return useContext(GithubStatsContext)
}
