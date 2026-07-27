export type AlertTone = 'info' | 'warning' | 'success'

export interface AlertPayload {
  title: string
  message: string
  tone?: AlertTone
  confirmLabel?: string
}
