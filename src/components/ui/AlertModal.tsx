import type { FC } from 'react'
import { useEffect } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import type { AlertPayload, AlertTone } from '../../types/alert'
import { springBouncy, springSoft } from '../../constants/motion'
import { Button } from './Button'

interface Props {
  alert: AlertPayload | null
  onClose: () => void
}

const toneStyles: Record<
  AlertTone,
  { accent: string; iconBg: string; ring: string }
> = {
  info: {
    accent: 'text-purple',
    iconBg: 'bg-purple/10',
    ring: 'ring-purple/20',
  },
  warning: {
    accent: 'text-[#c45a12]',
    iconBg: 'bg-[#fff4e8]',
    ring: 'ring-[#c45a12]/20',
  },
  success: {
    accent: 'text-savings',
    iconBg: 'bg-savings/10',
    ring: 'ring-savings/20',
  },
}

function AlertIcon({ tone }: { tone: AlertTone }) {
  if (tone === 'success') {
    return (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <path
          d="M8 14.5L12.2 18.5L20 10"
          stroke="#0AA288"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )
  }
  if (tone === 'warning') {
    return (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <path
          d="M14 9v7"
          stroke="#C45A12"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
        <circle cx="14" cy="19.5" r="1.4" fill="#C45A12" />
      </svg>
    )
  }
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <path
        d="M14 9v7.5"
        stroke="#4E2FD2"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <circle cx="14" cy="19.5" r="1.4" fill="#4E2FD2" />
    </svg>
  )
}

const AlertModal: FC<Props> = ({ alert, onClose }) => {
  const reduceMotion = useReducedMotion()
  const tone = alert?.tone ?? 'info'
  const styles = toneStyles[tone]

  useEffect(() => {
    if (!alert) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [alert, onClose])

  return (
    <AnimatePresence>
      {alert && (
        <motion.div
          className="alert-overlay fixed inset-0 z-[100] flex items-center justify-center p-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          role="presentation"
          onClick={onClose}
        >
          <div
            className="absolute inset-0 bg-[#0b0d10]/45 backdrop-blur-[6px]"
            aria-hidden="true"
          />
          <motion.div
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="alert-title"
            aria-describedby="alert-message"
            className={`alert-modal relative w-full max-w-[380px] rounded-[14px] bg-white p-6 shadow-[0_24px_60px_rgba(11,13,16,0.22)] ring-1 ${styles.ring}`}
            initial={reduceMotion ? false : { opacity: 0, y: 28, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: 12, scale: 0.96 }}
            transition={springBouncy}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className={`mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full ${styles.iconBg}`}
            >
              <motion.div
                initial={reduceMotion ? false : { scale: 0.5, rotate: -20 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={springSoft}
              >
                <AlertIcon tone={tone} />
              </motion.div>
            </div>

            <h2
              id="alert-title"
              className={`mb-2 text-center font-gilroy-semibold text-[20px] leading-tight tracking-[0.3px] ${styles.accent}`}
            >
              {alert.title}
            </h2>
            <p
              id="alert-message"
              className="mb-6 text-center font-gilroy-medium text-sm leading-[140%] tracking-[0.3px] text-text-tertiary"
            >
              {alert.message}
            </p>

            <motion.div whileTap={reduceMotion ? undefined : { scale: 0.98 }}>
              <Button
                variant="checkout"
                className="alert-confirm mt-0"
                onClick={onClose}
              >
                {alert.confirmLabel ?? 'Got it'}
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default AlertModal
