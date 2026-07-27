/** Font family tokens — keep in sync with `@theme` / `@font-face`. */
export const fonts = {
  regular: 'Gilroy-Regular, sans-serif',
  medium: 'Gilroy-Medium, sans-serif',
  semibold: 'Gilroy-SemiBold, sans-serif',
  bold: 'Gilroy-Bold, sans-serif',
} as const

export const fontClass = {
  regular: 'font-gilroy-regular',
  medium: 'font-gilroy-medium',
  semibold: 'font-gilroy-semibold',
  bold: 'font-gilroy-bold',
} as const

export type FontWeight = keyof typeof fontClass
