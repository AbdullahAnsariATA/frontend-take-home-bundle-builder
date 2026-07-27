import { useState } from 'react'
import { saveBundle } from '../context/bundleReducer'
import { useBundle } from './useBundle'

export function useSaveBundle(resetMs = 2500) {
  const { state } = useBundle()
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    saveBundle(state)
    setSaved(true)
    window.setTimeout(() => setSaved(false), resetMs)
  }

  return { saved, handleSave }
}
