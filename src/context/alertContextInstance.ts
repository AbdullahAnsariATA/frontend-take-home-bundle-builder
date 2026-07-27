import { createContext } from 'react'
import type { AlertPayload } from '../types/alert'

export interface AlertContextValue {
  showAlert: (payload: AlertPayload) => void
  dismissAlert: () => void
}

export const AlertContext = createContext<AlertContextValue | null>(null)
