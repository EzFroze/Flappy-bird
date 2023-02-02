import { useDispatch, useSelector } from 'react-redux'
import type { TypedUseSelectorHook } from 'react-redux'
import type { RootState, AppDispatch } from './store'

export const useSet: () => AppDispatch = useDispatch
export const useStore: TypedUseSelectorHook<RootState> = useSelector