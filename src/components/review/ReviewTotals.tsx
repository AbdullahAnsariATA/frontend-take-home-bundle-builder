import type { FC } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { formatPrice } from '../../utils/formatPrice'
import { springBouncy, springSnappy } from '../../constants/motion'
import { Text } from '../typography/Text'
import { Button } from '../ui/Button'

interface Props {
  monthly: number
  finalSubtotal: number
  finalTotal: number
  totalSavings: number
  hasItems: boolean
  saved: boolean
  onCheckout: () => void
  onSave: () => void
}

const ReviewTotals: FC<Props> = ({
  monthly,
  finalSubtotal,
  finalTotal,
  totalSavings,
  hasItems,
  saved,
  onCheckout,
  onSave,
}) => {
  const reduceMotion = useReducedMotion()
  const showSavings = hasItems && totalSavings > 0

  return (
    <>
      <div className="review-badge-row flex items-center justify-between mt-6">
        <motion.img
          src="/images/satisfaction-badge.svg"
          alt="Satisfaction Guarantee"
          className="badge-icon w-[78px] h-[78px] object-contain"
          width={78}
          height={78}
          decoding="async"
          animate={
            reduceMotion
              ? undefined
              : { y: [0, -5, 0], rotate: [0, -3, 3, 0] }
          }
          transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
        />
        <div className="badge-col flex flex-col items-end gap-2">
          <motion.div
            className="badge-pill flex justify-center items-center py-0.5 px-[5px] bg-purple rounded-[3px] whitespace-nowrap"
            key={monthly}
            initial={reduceMotion ? false : { scale: 0.9, opacity: 0.6 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={springSnappy}
          >
            <Text as="span" variant="badgePillText">
              as low as {formatPrice(monthly)}/mo
            </Text>
          </motion.div>
          <div className="total-row flex flex-row items-baseline gap-2">
            <AnimatePresence>
              {hasItems && finalSubtotal > finalTotal && (
                <motion.span
                  key="compare"
                  initial={reduceMotion ? false : { opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                >
                  <Text as="span" variant="totalCompare">
                    {formatPrice(finalSubtotal)}
                  </Text>
                </motion.span>
              )}
            </AnimatePresence>
            <motion.span
              key={finalTotal}
              initial={reduceMotion ? false : { scale: 0.88, opacity: 0.5, y: 4 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={springBouncy}
            >
              <Text as="span" variant="totalActive">
                {formatPrice(finalTotal)}
              </Text>
            </motion.span>
          </div>
        </div>
      </div>

      <motion.div
        className={showSavings ? undefined : 'invisible'}
        aria-hidden={!showSavings}
        animate={
          showSavings && !reduceMotion
            ? { scale: [0.92, 1.04, 1], opacity: 1 }
            : { scale: 1, opacity: showSavings ? 1 : 0 }
        }
        transition={springBouncy}
      >
        <Text as="div" variant="savings">
          {showSavings
            ? `Congrats! You're saving ${formatPrice(totalSavings)} on your security bundle!`
            : '\u00a0'}
        </Text>
      </motion.div>

      <motion.div
        whileHover={reduceMotion ? undefined : { scale: 1.015 }}
        whileTap={reduceMotion ? undefined : { scale: 0.98 }}
        animate={
          hasItems && !reduceMotion
            ? {
                boxShadow: [
                  '0 0 0 0 rgba(78, 47, 210, 0)',
                  '0 0 0 6px rgba(78, 47, 210, 0.12)',
                  '0 0 0 0 rgba(78, 47, 210, 0)',
                ],
              }
            : undefined
        }
        transition={
          hasItems && !reduceMotion
            ? { duration: 2.2, repeat: Infinity, ease: 'easeInOut' }
            : undefined
        }
        className="rounded-lg mt-1"
      >
        <Button variant="checkout" className="mt-0" onClick={onCheckout}>
          Checkout
        </Button>
      </motion.div>

      <motion.div
        animate={saved && !reduceMotion ? { scale: [1, 1.06, 1] } : { scale: 1 }}
        transition={springBouncy}
      >
        <Button variant="save" onClick={onSave}>
          {saved ? 'Saved!' : 'Save my system for later'}
        </Button>
      </motion.div>
    </>
  )
}

export default ReviewTotals
