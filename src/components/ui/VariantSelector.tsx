import type { FC } from 'react'
import type { Variant } from '../../types'
import { getVariantChipImage } from '../../data/variantImages'
import { cn } from '../../utils/cn'

interface Props {
  productId: string
  variants: Variant[]
  activeVariantId: string
  onChange: (variantId: string) => void
}

const VariantSelector: FC<Props> = ({ productId, variants, activeVariantId, onChange }) => {
  return (
    <div className="variant-selector flex gap-2 flex-nowrap max-[600px]:flex-wrap">
      {variants.map((v) => {
        const img = getVariantChipImage(productId, v.variantId)
        const active = v.variantId === activeVariantId
        return (
          <button
            key={v.variantId}
            type="button"
            className={cn(
              'variant-chip box-border flex flex-row justify-center items-center gap-1 py-px px-[5px] w-[63px] h-[26px] bg-white border-[0.5px] border-[#ccc] rounded-sm cursor-pointer font-gilroy-medium text-xs text-text-tertiary transition-[border-color,color,background] duration-150 shrink-0',
              active &&
                'active py-px px-[3px] w-[65px] bg-variant-active border-[0.5px] border-savings text-purple',
            )}
            onClick={() => onChange(v.variantId)}
            aria-pressed={active}
          >
            {img ? (
              <img
                src={img}
                alt=""
                className="variant-chip-img w-[18px] h-[18px] object-contain rounded-sm shrink-0 bg-white"
                width={18}
                height={18}
                decoding="async"
              />
            ) : (
              <span
                className="variant-swatch w-[18px] h-[18px] rounded-[3px] border border-black/10 shrink-0"
                style={{ backgroundColor: v.swatchColor }}
              />
            )}
            <span className="variant-label font-medium">{v.label}</span>
          </button>
        )
      })}
    </div>
  )
}

export default VariantSelector
