import type { ElementType, ComponentPropsWithoutRef, ReactNode } from 'react'
import { cn } from '../../utils/cn'
import { fontClass, type FontWeight } from '../../constants/typography'

const variants = {
  mobileHeading:
    'mobile-heading hidden max-[900px]:flex max-[900px]:items-center max-[900px]:justify-center max-[900px]:text-center max-[900px]:w-full max-[900px]:font-gilroy-bold max-[900px]:text-[31.875px] max-[900px]:leading-[110%] max-[900px]:tracking-[-0.064px] max-[900px]:text-text-dark max-[900px]:m-0 max-[900px]:px-4 max-[900px]:pt-5 max-[900px]:pb-3 max-[900px]:box-border',
  stepCounter:
    'step-counter font-gilroy-medium text-[10px] tracking-[1.6px] uppercase text-text-secondary pt-2 px-[15px] pb-1 leading-none max-[900px]:px-4',
  stepTitle: 'step-title font-gilroy-semibold text-[18px] text-[#0b0d10] leading-none',
  stepCount:
    'step-count font-gilroy-medium text-sm text-purple leading-4 whitespace-nowrap',
  productTitle: 'product-title font-gilroy-semibold text-base leading-normal text-text-primary',
  productDesc: 'product-desc text-sm text-text-tertiary leading-[1.4] font-gilroy-medium',
  learnMore:
    'product-learn-more text-purple underline font-medium text-sm leading-[1.4] whitespace-nowrap font-gilroy-medium self-start -mt-0.5',
  reviewStepLabel:
    'review-step-label font-gilroy-medium text-xs leading-none tracking-[1.6px] uppercase text-text-secondary mb-2',
  reviewTitle:
    'review-title font-gilroy-semibold text-[22px] leading-none tracking-[0.6px] text-text-dark mb-1 pt-4',
  reviewSubtitle:
    'review-subtitle font-gilroy-medium text-sm leading-[130%] tracking-[0.6px] text-[rgba(31,31,31,0.75)] mb-4 pt-2',
  reviewEmpty:
    'review-empty font-gilroy-medium text-sm leading-[130%] tracking-[0.6px] text-[rgba(31,31,31,0.75)] py-2',
  reviewSectionLabel:
    'review-section-label font-gilroy-regular text-xs leading-4 tracking-[0.03em] uppercase text-section-label',
  reviewItemName:
    'review-item-name font-gilroy-medium text-xs text-[#0b0d10] leading-4 tracking-[0.06px]',
  planName:
    'plan-name min-w-0 font-gilroy-bold text-base leading-none tracking-[-0.002em] text-black',
  shippingName: 'shipping-name min-w-0 font-gilroy-semibold text-sm text-[#0b0d10] leading-4',
  savings:
    'savings-banner font-gilroy-semibold text-xs text-savings leading-4 text-center mt-3',
  badgePillText: 'badge-pill-text font-gilroy-medium text-xs text-white leading-4',
  totalCompare:
    'total-compare font-gilroy-medium text-lg leading-5 tracking-[0.0025em] line-through text-text-tertiary',
  totalActive:
    'total-active font-gilroy-bold text-2xl leading-8 tracking-[-0.00125em] text-purple',
  body: 'font-gilroy-medium text-sm text-text-primary',
} as const

export type TextVariant = keyof typeof variants

type TextProps<T extends ElementType = 'p'> = {
  as?: T
  variant: TextVariant
  weight?: FontWeight
  className?: string
  children: ReactNode
} & Omit<ComponentPropsWithoutRef<T>, 'as' | 'children' | 'className'>

export function Text<T extends ElementType = 'p'>({
  as,
  variant,
  weight,
  className,
  children,
  ...rest
}: TextProps<T>) {
  const Component = as || 'p'
  return (
    <Component
      className={cn(variants[variant], weight && fontClass[weight], className)}
      {...rest}
    >
      {children}
    </Component>
  )
}
