import type { FC } from 'react'
import { SHIPPING_COMPARE } from '../../constants/bundle'
import { formatPrice } from '../../utils/formatPrice'
import { ShippingIcon } from '../icons'
import { Text } from '../typography/Text'
import { FreePrice } from '../typography/Price'

const ShippingRow: FC = () => {
  return (
    <div className="shipping-row grid grid-cols-[41px_1fr_auto] items-center gap-3">
      <div className="shipping-icon flex w-[41px] h-[41px] items-center justify-center bg-white rounded-[5px] shrink-0">
        <ShippingIcon />
      </div>
      <Text as="span" variant="shippingName">
        Fast Shipping
      </Text>
      <div className="review-item-pricing flex flex-col items-end whitespace-nowrap shrink-0">
        <span className="price-compare font-gilroy-medium text-xs leading-4 text-text-tertiary line-through">
          {formatPrice(SHIPPING_COMPARE)}
        </span>
        <FreePrice />
      </div>
    </div>
  )
}

export default ShippingRow
