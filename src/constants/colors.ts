/** Design tokens — keep in sync with `@theme` in `src/index.css`. */
export const colors = {
  white: '#ffffff',
  black: '#000000',
  bgSoft: '#edf4ff',
  textPrimary: '#0b0d10',
  textSecondary: '#484848',
  textTertiary: '#6f7882',
  textDark: '#1f1f1f',
  purple: '#4e2fd2',
  purpleHover: '#3f24a8',
  purpleMuted: 'rgba(78, 47, 210, 0.06)',
  border: '#e0e5ec',
  cardBorder: '#e0e5ec',
  savings: '#0aa288',
  strike: '#d8392b',
  priceMuted: '#575757',
  sectionLabel: '#a8b2bd',
  divider: '#ced6de',
  stepperBg: '#f0f4f7',
  stepperDisabledBorder: '#e6ebf0',
  variantBorder: '#cccccc',
  variantActiveBg: 'rgba(29, 240, 187, 0.04)',
  stepBorder: 'rgba(31, 31, 31, 0.5)',
  subtitle: 'rgba(31, 31, 31, 0.75)',
} as const

export type ColorToken = keyof typeof colors
