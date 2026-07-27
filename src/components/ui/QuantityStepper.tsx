import type { FC } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { cn } from '../../utils/cn'
import { MAX_QUANTITY } from '../../constants/bundle'
import { springBouncy } from '../../constants/motion'

type StepperVariant = 'card' | 'review'

interface Props {
  quantity: number
  min?: number
  onChange: (q: number) => void
  disabled?: boolean
  variant?: StepperVariant
}

const btnBase =
  'stepper-btn flex items-center justify-center w-5 h-5 border-0 rounded cursor-pointer text-price-muted transition-colors duration-150 p-0 hover:enabled:bg-[#f5f5f5] disabled:opacity-30 disabled:cursor-default'

const btnByVariant: Record<StepperVariant, string> = {
  card:
    'bg-stepper-bg rounded text-price-muted disabled:opacity-100 disabled:bg-white disabled:border-2 disabled:border-stepper-disabled disabled:box-border',
  review: 'bg-white',
}

const QuantityStepper: FC<Props> = ({
  quantity,
  min = 0,
  onChange,
  disabled,
  variant = 'review',
}) => {
  const reduceMotion = useReducedMotion()

  return (
    <div className="stepper flex items-center justify-between w-[72px] py-1">
      <motion.button
        type="button"
        className={cn(btnBase, btnByVariant[variant])}
        disabled={disabled || quantity <= min}
        onClick={() => onChange(quantity - 1)}
        aria-label="Decrease quantity"
        whileTap={reduceMotion ? undefined : { scale: 0.85 }}
      >
        <svg width="8" height="1.6" viewBox="0 0 8 1.6" fill="none" aria-hidden="true">
          <path
            d="M7.33333 1.6H0.666667C0.489856 1.6 0.320286 1.51571 0.195262 1.36569C0.0702379 1.21566 0 1.01217 0 0.8C0 0.587827 0.0702379 0.384344 0.195262 0.234315C0.320286 0.0842856 0.489856 0 0.666667 0H7.33333C7.51014 0 7.67971 0.0842856 7.80474 0.234315C7.92976 0.384344 8 0.587827 8 0.8C8 1.01217 7.92976 1.21566 7.80474 1.36569C7.67971 1.51571 7.51014 1.6 7.33333 1.6Z"
            fill="#575757"
          />
        </svg>
      </motion.button>
      <motion.span
        key={quantity}
        className="stepper-value w-2 text-center text-sm font-gilroy-semibold text-[#0b0d10] leading-4 inline-block"
        initial={reduceMotion ? false : { scale: 0.6, y: 4, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        transition={springBouncy}
      >
        {quantity}
      </motion.span>
      <motion.button
        type="button"
        className={cn(btnBase, btnByVariant[variant])}
        disabled={disabled || quantity >= MAX_QUANTITY}
        onClick={() => onChange(quantity + 1)}
        aria-label="Increase quantity"
        whileTap={reduceMotion ? undefined : { scale: 0.85 }}
      >
        <svg width="8" height="8" viewBox="0 0 8 8" fill="none" aria-hidden="true">
          <path
            d="M7.33333 3.33333H4.66667V0.666667C4.66667 0.489856 4.59643 0.320286 4.4714 0.195262C4.34638 0.0702379 4.17681 0 4 0C3.82319 0 3.65362 0.0702379 3.5286 0.195262C3.40357 0.320286 3.33333 0.489856 3.33333 0.666667V3.33333H0.666667C0.489856 3.33333 0.320286 3.40357 0.195262 3.5286C0.0702379 3.65362 0 3.82319 0 4C0 4.17681 0.0702379 4.34638 0.195262 4.4714C0.320286 4.59643 0.489856 4.66667 0.666667 4.66667H3.33333V7.33333C3.33333 7.51014 3.40357 7.67971 3.5286 7.80474C3.65362 7.92976 3.82319 8 4 8C4.17681 8 4.34638 7.92976 4.4714 7.80474C4.59643 7.67971 4.66667 7.51014 4.66667 7.33333V4.66667H7.33333C7.51014 4.66667 7.67971 4.59643 7.80474 4.4714C7.92976 4.34638 8 4.17681 8 4C8 3.82319 7.92976 3.65362 7.80474 3.5286C7.67971 3.40357 7.51014 3.33333 7.33333 3.33333Z"
            fill="#575757"
          />
        </svg>
      </motion.button>
    </div>
  )
}

export default QuantityStepper
