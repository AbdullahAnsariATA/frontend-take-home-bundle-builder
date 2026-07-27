import type { FC } from 'react'
import type { Product } from '../../types'
import { PlanShieldIcon } from '../icons'
import { Text } from '../typography/Text'
import { Price } from '../typography/Price'

interface Props {
  product: Product
}

const PlanRow: FC<Props> = ({ product }) => {
  return (
    <div className="plan-row grid grid-cols-[41px_1fr_auto] items-center gap-3">
      <div className="plan-icon flex w-[41px] h-[41px] items-center justify-center shrink-0 [&_svg]:w-7 [&_svg]:h-[33px] [&_svg]:block">
        <PlanShieldIcon />
      </div>
      <Text as="span" variant="planName">
        <span className="plan-name-cam text-black">Cam </span>
        <span className="plan-name-unlimited text-purple">Unlimited</span>
      </Text>
      <Price
        tone="plan"
        amount={product.price}
        compareAt={product.compareAtPrice}
        suffix="/mo"
        className="review-item-pricing"
      />
    </div>
  )
}

export default PlanRow
