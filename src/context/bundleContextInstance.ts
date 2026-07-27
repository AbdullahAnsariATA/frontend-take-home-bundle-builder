import { createContext } from 'react'
import type { BundleAction, BundleState } from '../types'

export interface BundleContextValue {
  state: BundleState
  dispatch: React.Dispatch<BundleAction>
}

export const BundleContext = createContext<BundleContextValue | null>(null)
