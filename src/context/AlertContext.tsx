import { useCallback, useMemo, useState, type ReactNode } from 'react'
import { AlertContext } from './alertContextInstance'
import type { AlertPayload } from '../types/alert'
import AlertModal from '../components/ui/AlertModal'

export function AlertProvider({ children }: { children: ReactNode }) {
  const [alert, setAlert] = useState<AlertPayload | null>(null)

  const showAlert = useCallback((payload: AlertPayload) => {
    setAlert(payload)
  }, [])

  const dismissAlert = useCallback(() => {
    setAlert(null)
  }, [])

  const value = useMemo(
    () => ({ showAlert, dismissAlert }),
    [showAlert, dismissAlert],
  )

  return (
    <AlertContext.Provider value={value}>
      {children}
      <AlertModal alert={alert} onClose={dismissAlert} />
    </AlertContext.Provider>
  )
}
