import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '../../utils/cn'

type ButtonVariant = 'checkout' | 'next' | 'save' | 'ghost'

const styles: Record<ButtonVariant, string> = {
  checkout:
    'checkout-btn flex items-center justify-center w-full p-4 mt-1 bg-purple text-white border-0 rounded-lg font-gilroy-semibold text-base leading-normal cursor-pointer transition-colors duration-150 hover:bg-purple-hover',
  next: 'step-next-btn inline-flex items-center gap-2 py-[5px] px-6 bg-transparent text-purple border border-purple rounded-[7px] font-gilroy-semibold text-lg leading-normal cursor-pointer self-center transition-[background,color] duration-150 hover:bg-purple-muted',
  save: 'save-link block w-full mt-3 bg-transparent border-0 font-gilroy-medium text-sm text-text-tertiary leading-4 underline cursor-pointer text-center transition-colors duration-150 hover:text-purple',
  ghost: 'bg-transparent border-0 cursor-pointer font-inherit',
}

type ButtonProps = {
  variant?: ButtonVariant
  children: ReactNode
  className?: string
} & ButtonHTMLAttributes<HTMLButtonElement>

export function Button({
  variant = 'ghost',
  children,
  className,
  type = 'button',
  ...rest
}: ButtonProps) {
  return (
    <button type={type} className={cn(styles[variant], className)} {...rest}>
      {children}
    </button>
  )
}
