import type { Category, Product } from '../types'
import { parseQuantityKey } from './quantityKey'
import { SHIPPING_COMPARE } from '../constants/bundle'

export interface LineItem {
  productId: string
  variantId: string
  quantity: number
}

export type ProductCategory = Exclude<Category, 'plan'>

export const categoryLabel: Record<ProductCategory, string> = {
  cameras: 'Cameras',
  sensors: 'Sensors',
  accessories: 'Accessories',
}

export const categoryOrder: ProductCategory[] = ['cameras', 'sensors', 'accessories']

export function buildLineItems(quantities: Record<string, number>): LineItem[] {
  return Object.entries(quantities)
    .filter(([, qty]) => qty > 0)
    .map(([key, quantity]) => {
      const { productId, variantId } = parseQuantityKey(key)
      return { productId, variantId, quantity }
    })
}

export function groupByCategory(
  lineItems: LineItem[],
  products: Product[],
): Map<ProductCategory, LineItem[]> {
  return lineItems.reduce((map, item) => {
    const product = products.find((p) => p.productId === item.productId)
    if (!product || product.category === 'plan') return map
    const cat = product.category as ProductCategory
    if (!map.has(cat)) map.set(cat, [])
    map.get(cat)!.push(item)
    return map
  }, new Map<ProductCategory, LineItem[]>())
}

export function sumLineItems(lineItems: LineItem[], products: Product[]) {
  return lineItems.reduce(
    (acc, item) => {
      const product = products.find((p) => p.productId === item.productId)
      if (!product) return acc
      return {
        compare: acc.compare + (product.compareAtPrice ?? product.price) * item.quantity,
        active: acc.active + product.price * item.quantity,
      }
    },
    { compare: 0, active: 0 },
  )
}

export function computeTotals(itemsCompare: number, itemsActive: number, hasItems: boolean) {
  const finalSubtotal = hasItems ? itemsCompare + SHIPPING_COMPARE : 0
  const finalTotal = itemsActive
  const totalSavings = hasItems ? Math.max(0, finalSubtotal - finalTotal) : 0
  const monthly = finalTotal > 0 ? finalTotal / 12 : 0
  return { finalSubtotal, finalTotal, totalSavings, monthly }
}

export function isProductSelected(
  product: Product,
  quantities: Record<string, number>,
): boolean {
  if (product.variants && product.variants.length > 0) {
    return product.variants.some(
      (v) => (quantities[`${product.productId}::${v.variantId}`] || 0) > 0,
    )
  }
  return (quantities[`${product.productId}::default`] || 0) > 0
}
