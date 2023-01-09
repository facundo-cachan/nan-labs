import { useReducer } from "react"

export const useUpdateState = (initialState: any) => useReducer((state: any, newState: any) => {
  const value = Object.values(newState)[0]
  if (value === 0) {
    const key = Object.keys(newState)[0]
    delete state[key]
    return ({
      ...state
    })
  } else {
    return ({
      ...state,
      ...newState
    })
  }
}, initialState)

