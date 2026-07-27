import { useReducer, type ReactNode } from 'react'
import { BundleContext } from './bundleContextInstance'
import { bundleReducer, loadInitialState } from './bundleReducer'

export function BundleProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(bundleReducer, undefined, loadInitialState)

  return (
    <BundleContext.Provider value={{ state, dispatch }}>
      {children}
    </BundleContext.Provider>
  )
}

export { BundleContext } from './bundleContextInstance'
