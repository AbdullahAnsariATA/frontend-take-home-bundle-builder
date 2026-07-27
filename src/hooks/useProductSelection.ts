import type { Product } from '../types'
import { quantityKey } from '../utils/quantityKey'
import { useBundle } from './useBundle'

export function useProductSelection(product: Product) {
  const { state, dispatch } = useBundle()

  const hasVariants = Boolean(product.variants && product.variants.length > 0)
  const activeVariantId = hasVariants
    ? state.activeVariants[product.productId] || product.variants![0].variantId
    : 'default'
  const key = quantityKey(product.productId, activeVariantId)
  const quantity = state.quantities[key] || 0
  const selected = quantity > 0

  const setQuantity = (q: number) =>
    dispatch({ type: 'SET_QUANTITY', key, quantity: q })

  const setActiveVariant = (variantId: string) =>
    dispatch({
      type: 'SET_ACTIVE_VARIANT',
      productId: product.productId,
      variantId,
    })

  return {
    hasVariants,
    activeVariantId,
    quantity,
    selected,
    setQuantity,
    setActiveVariant,
  }
}
