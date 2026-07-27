import { cn } from '../../utils/cn'
import { formatPrice } from '../../utils/formatPrice'

type PriceTone = 'card' | 'review' | 'plan' | 'total'

const compareStyles: Record<PriceTone, string> = {
  card: 'price-compare font-gilroy-regular text-base leading-none tracking-[0.6px] line-through text-strike',
  review: 'price-compare font-gilroy-medium text-xs leading-4 text-text-tertiary line-through',
  plan: 'price-compare font-gilroy-medium text-xs leading-4 text-text-tertiary line-through',
  total:
    'total-compare font-gilroy-medium text-lg leading-5 tracking-[0.0025em] line-through text-text-tertiary',
}

const activeStyles: Record<PriceTone, string> = {
  card: 'price-active font-gilroy-semibold text-base leading-none tracking-[0.6px] text-text-primary',
  review: 'price-active font-gilroy-semibold text-xs leading-4 text-purple',
  plan: 'price-active font-gilroy-bold text-xs leading-4 text-purple',
  total: 'total-active font-gilroy-bold text-2xl leading-8 tracking-[-0.00125em] text-purple',
}

type PriceProps = {
  amount: number
  compareAt?: number
  tone?: PriceTone
  suffix?: string
  freeLabel?: string
  className?: string
  showCompare?: boolean
}

export function Price({
  amount,
  compareAt,
  tone = 'review',
  suffix = '',
  freeLabel = 'FREE',
  className,
  showCompare = true,
}: PriceProps) {
  const isFree = amount === 0

  return (
    <div className={cn('flex flex-col items-end whitespace-nowrap shrink-0', className)}>
      {showCompare && compareAt != null && (
        <span className={compareStyles[tone]}>
          {formatPrice(compareAt)}
          {suffix}
        </span>
      )}
      <span className={cn(activeStyles[tone], isFree && tone === 'card' && 'text-base')}>
        {isFree ? freeLabel : `${formatPrice(amount)}${suffix}`}
      </span>
    </div>
  )
}

export function FreePrice({ className }: { className?: string }) {
  return (
    <span className={cn('price-free font-gilroy-semibold text-xs text-purple leading-4', className)}>
      FREE
    </span>
  )
}
