import type { FC } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useBundlePricing } from '../../hooks/useBundlePricing'
import { useSaveBundle } from '../../hooks/useSaveBundle'
import { useAlert } from '../../hooks/useAlert'
import { categoryLabel, categoryOrder } from '../../utils/lineItems'
import { springSoft } from '../../constants/motion'
import { Text } from '../typography/Text'
import ReviewLineItem from './ReviewLineItem'
import ReviewSection from './ReviewSection'
import PlanRow from './PlanRow'
import ShippingRow from './ShippingRow'
import ReviewTotals from './ReviewTotals'

const ReviewPanel: FC = () => {
  const {
    products,
    grouped,
    planProduct,
    planQty,
    hasItems,
    finalSubtotal,
    finalTotal,
    totalSavings,
    monthly,
  } = useBundlePricing()
  const { saved, handleSave } = useSaveBundle()
  const { showAlert } = useAlert()
  const reduceMotion = useReducedMotion()

  const handleCheckout = () => {
    if (!hasItems) {
      showAlert({
        title: 'Nothing selected yet',
        message: 'Select products to build your system before checkout.',
        tone: 'warning',
        confirmLabel: 'Keep building',
      })
      return
    }
    showAlert({
      title: 'Checkout coming soon',
      message: 'Checkout is a placeholder in this prototype.',
      tone: 'info',
      confirmLabel: 'Sounds good',
    })
  }

  return (
    <motion.aside
      className="review-panel flex-[0_0_399px] bg-bg-soft rounded-[10px] p-5 sticky top-5 max-[1200px]:flex-[0_0_340px] max-[900px]:flex-none max-[900px]:w-full max-[900px]:static max-[900px]:rounded-none max-[900px]:px-4 max-[900px]:pt-5 max-[900px]:pb-6 max-[600px]:p-5 max-[600px]:rounded-none"
      initial={reduceMotion ? false : { opacity: 0, x: 28 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.55, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
    >
      <Text as="p" variant="reviewStepLabel">
        Review
      </Text>
      <Text as="h2" variant="reviewTitle">
        Your security system
      </Text>
      <Text as="p" variant="reviewSubtitle">
        Review your personalized protection system designed to keep what matters most safe.
      </Text>

      <div className="review-sections flex flex-col">
        <AnimatePresence mode="popLayout" initial={false}>
          {!hasItems && (
            <motion.div
              key="empty"
              initial={reduceMotion ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={springSoft}
            >
              <Text as="p" variant="reviewEmpty">
                No items selected yet. Add products from the steps on the left.
              </Text>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence initial={false}>
          {categoryOrder.map((cat) => {
            const items = grouped.get(cat)
            if (!items || items.length === 0) return null
            return (
              <motion.div
                key={cat}
                layout={!reduceMotion}
                initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8, height: 0 }}
                transition={springSoft}
              >
                <ReviewSection label={categoryLabel[cat]}>
                  <AnimatePresence initial={false}>
                    {items.map((item) => {
                      const p = products.find((pr) => pr.productId === item.productId)!
                      return (
                        <ReviewLineItem
                          key={`${item.productId}::${item.variantId}`}
                          product={p}
                          variantId={item.variantId}
                          quantity={item.quantity}
                        />
                      )
                    })}
                  </AnimatePresence>
                </ReviewSection>
              </motion.div>
            )
          })}

          {planProduct && planQty > 0 && (
            <motion.div
              key="plan"
              layout={!reduceMotion}
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, height: 0 }}
              transition={springSoft}
            >
              <ReviewSection label="Home Monitoring Plan">
                <PlanRow product={planProduct} />
              </ReviewSection>
            </motion.div>
          )}

          {hasItems && (
            <motion.div
              key="shipping"
              layout={!reduceMotion}
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, height: 0 }}
              transition={springSoft}
            >
              <ReviewSection label="Shipping">
                <ShippingRow />
              </ReviewSection>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <ReviewTotals
        monthly={monthly}
        finalSubtotal={finalSubtotal}
        finalTotal={finalTotal}
        totalSavings={totalSavings}
        hasItems={hasItems}
        saved={saved}
        onCheckout={handleCheckout}
        onSave={handleSave}
      />
    </motion.aside>
  )
}

export default ReviewPanel
