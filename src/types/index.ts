export type Category = 'cameras' | 'plan' | 'sensors' | 'accessories'

export interface Variant {
  variantId: string
  label: string
  swatchColor: string
}

export interface Product {
  productId: string
  category: Category
  step: number
  title: string
  description: string
  image: string
  badge?: string
  variants?: Variant[]
  price: number
  compareAtPrice?: number
  learnMoreUrl?: string
}

export interface BundleState {
  currentStep: number
  quantities: Record<string, number>
  activeVariants: Record<string, string>
}

export type BundleAction =
  | { type: 'SET_QUANTITY'; key: string; quantity: number }
  | { type: 'SET_STEP'; step: number }
  | { type: 'SET_ACTIVE_VARIANT'; productId: string; variantId: string }
  | { type: 'RESTORE'; state: BundleState }
