import type { FC } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import type { Product } from '../../types'
import { useProductSelection } from '../../hooks/useProductSelection'
import { getVariantImage } from '../../data/variantImages'
import { springSnappy, springSoft } from '../../constants/motion'
import { cn } from '../../utils/cn'
import { Text } from '../typography/Text'
import { Price } from '../typography/Price'
import VariantSelector from '../ui/VariantSelector'
import QuantityStepper from '../ui/QuantityStepper'

interface Props {
  product: Product
  index?: number
}

const ProductCard: FC<Props> = ({ product, index = 0 }) => {
  const {
    hasVariants,
    activeVariantId,
    quantity,
    selected,
    setQuantity,
    setActiveVariant,
  } = useProductSelection(product)
  const reduceMotion = useReducedMotion()
  const imageSrc = getVariantImage(product.productId, activeVariantId) || product.image

  return (
    <motion.div
      layout={!reduceMotion}
      className={cn(
        'product-card relative flex items-center gap-[13px] p-[11px] border border-card-border rounded-[10px] bg-white flex-1 max-w-[360px] min-w-0 max-[900px]:w-full max-[900px]:max-w-full',
        selected && 'selected border-purple shadow-[0_0_0_1px_var(--color-purple)]',
      )}
      initial={reduceMotion ? false : { opacity: 0, y: 16, scale: 0.96 }}
      animate={{
        opacity: 1,
        y: 0,
        scale: selected ? 1.01 : 1,
        boxShadow: selected
          ? '0 0 0 1px var(--color-purple), 0 10px 28px rgba(78, 47, 210, 0.14)'
          : '0 0 0 0 rgba(78, 47, 210, 0)',
      }}
      whileHover={
        reduceMotion
          ? undefined
          : {
              y: -3,
              boxShadow: selected
                ? '0 0 0 1px var(--color-purple), 0 14px 32px rgba(78, 47, 210, 0.18)'
                : '0 8px 22px rgba(11, 13, 16, 0.08)',
            }
      }
      whileTap={reduceMotion ? undefined : { scale: 0.985 }}
      transition={{ ...springSoft, delay: index * 0.04 }}
    >
      {product.badge && (
        <motion.span
          className="product-badge absolute top-1.5 left-1.5 z-[1] flex justify-center items-center py-0.5 px-1.5 w-[65px] h-[19px] bg-purple rounded-[10px] text-white text-[11px] font-gilroy-medium leading-normal whitespace-nowrap"
          initial={reduceMotion ? false : { scale: 0, rotate: -12 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ ...springSnappy, delay: 0.15 + index * 0.04 }}
        >
          {product.badge}
        </motion.span>
      )}
      <div className="product-image-wrap relative shrink-0 w-[101px] h-[101px] overflow-hidden rounded-[5px] bg-white">
        <motion.img
          key={imageSrc}
          src={imageSrc}
          alt={product.title}
          className="product-image block w-[101px] h-[101px] object-contain rounded-[5px]"
          width={101}
          height={101}
          decoding="async"
          animate={
            reduceMotion
              ? undefined
              : { y: selected ? [0, -3, 0] : 0 }
          }
          transition={
            selected && !reduceMotion
              ? { duration: 2.4, repeat: Infinity, ease: 'easeInOut' }
              : springSoft
          }
        />
      </div>
      <div className="product-info flex flex-1 min-w-0 flex-col gap-1.5">
        <Text as="div" variant="productTitle">
          {product.title}
        </Text>
        <Text as="div" variant="productDesc">
          {product.description}
        </Text>
        {product.learnMoreUrl && (
          <Text as="a" variant="learnMore" href={product.learnMoreUrl}>
            Learn More
          </Text>
        )}
        {hasVariants && (
          <VariantSelector
            productId={product.productId}
            variants={product.variants!}
            activeVariantId={activeVariantId}
            onChange={setActiveVariant}
          />
        )}
        <div className="product-bottom flex items-center justify-between mt-auto gap-2">
          <QuantityStepper variant="card" quantity={quantity} onChange={setQuantity} />
          <Price
            tone="card"
            amount={product.price}
            compareAt={product.compareAtPrice}
            className="product-pricing"
          />
        </div>
      </div>
    </motion.div>
  )
}

export default ProductCard
