import type { FC } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import type { Product } from '../../types'
import { useBundle } from '../../hooks/useBundle'
import { quantityKey } from '../../utils/quantityKey'
import { getVariantImage } from '../../data/variantImages'
import { springSnappy } from '../../constants/motion'
import QuantityStepper from '../ui/QuantityStepper'
import { Text } from '../typography/Text'
import { Price } from '../typography/Price'

interface Props {
  product: Product
  variantId: string
  quantity: number
}

const ReviewLineItem: FC<Props> = ({ product, variantId, quantity }) => {
  const { dispatch } = useBundle()
  const reduceMotion = useReducedMotion()
  const key = quantityKey(product.productId, variantId)
  const imgSrc = getVariantImage(product.productId, variantId) || product.image

  return (
    <motion.div
      layout={!reduceMotion}
      className="review-item grid grid-cols-[41px_1fr_72px_auto] items-center gap-3 max-[600px]:grid-cols-[41px_minmax(0,1fr)_72px_auto]"
      initial={reduceMotion ? false : { opacity: 0, x: 20, scale: 0.96 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={reduceMotion ? undefined : { opacity: 0, x: -16, scale: 0.96 }}
      transition={springSnappy}
    >
      <img
        src={imgSrc}
        alt={product.title}
        className="review-item-img w-[41px] h-[41px] rounded-[5px] object-contain shrink-0 bg-white"
        width={41}
        height={41}
        decoding="async"
      />
      <Text as="span" variant="reviewItemName">
        {product.title}
      </Text>
      <QuantityStepper
        quantity={quantity}
        onChange={(q) => dispatch({ type: 'SET_QUANTITY', key, quantity: q })}
      />
      <Price
        tone="review"
        amount={product.price * quantity}
        compareAt={
          product.compareAtPrice != null ? product.compareAtPrice * quantity : undefined
        }
        className="review-item-pricing"
      />
    </motion.div>
  )
}

export default ReviewLineItem
