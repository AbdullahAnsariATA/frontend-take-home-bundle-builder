import { useContext } from 'react'
import { BundleContext } from '../context/bundleContextInstance'

export function useBundle() {
  const ctx = useContext(BundleContext)
  if (!ctx) throw new Error('useBundle must be used within BundleProvider')
  return ctx
}
