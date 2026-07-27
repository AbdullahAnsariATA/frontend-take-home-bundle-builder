import type { FC, ReactNode } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import type { Product } from '../../types'
import productsData from '../../data/products.json'
import { TOTAL_STEPS } from '../../constants/bundle'
import { useStepSelection } from '../../hooks/useStepSelection'
import BuilderStep from './BuilderStep'
import ProductCard from './ProductCard'
import { CameraIcon, PlanIcon, SensorIcon, ProtectionIcon } from '../icons'

const products = productsData as Product[]

interface StepMeta {
  step: number
  title: string
  nextLabel: string
  icon: ReactNode
}

const steps: StepMeta[] = [
  { step: 1, title: 'Choose your cameras', nextLabel: 'Choose your plan', icon: <CameraIcon /> },
  { step: 2, title: 'Choose your plan', nextLabel: 'Choose your sensors', icon: <PlanIcon /> },
  { step: 3, title: 'Choose your sensors', nextLabel: 'Add extra protection', icon: <SensorIcon /> },
  { step: 4, title: 'Add extra protection', nextLabel: '', icon: <ProtectionIcon /> },
]

function getStepProducts(step: number) {
  return products.filter((p) => p.step === step)
}

function ProductGridRow({
  children,
  single = false,
}: {
  children: ReactNode
  single?: boolean
}) {
  return (
    <div
      className={`product-grid-row flex gap-[14px] max-[900px]:flex-col max-[900px]:items-stretch max-[900px]:gap-3${single ? ' product-grid-row-single justify-center' : ''}`}
    >
      {children}
    </div>
  )
}

function StepProducts({ step }: { step: number }) {
  const productsForStep = getStepProducts(step)

  if (step === 1) {
    return (
      <>
        <ProductGridRow>
          {productsForStep.slice(0, 2).map((p, i) => (
            <ProductCard key={p.productId} product={p} index={i} />
          ))}
        </ProductGridRow>
        <ProductGridRow>
          {productsForStep.slice(2, 4).map((p, i) => (
            <ProductCard key={p.productId} product={p} index={i + 2} />
          ))}
        </ProductGridRow>
        <ProductGridRow single>
          <ProductCard product={productsForStep[4]} index={4} />
        </ProductGridRow>
      </>
    )
  }

  return (
    <div className="product-single-list flex flex-col items-center gap-[14px]">
      {productsForStep.map((p, i) => (
        <ProductCard key={p.productId} product={p} index={i} />
      ))}
    </div>
  )
}

const Builder: FC = () => {
  const { currentStep, selectedCount, setStep } = useStepSelection(products)
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      className="builder flex flex-col gap-4 flex-[0_0_768px] max-[1200px]:flex-1 max-[1200px]:min-w-0 max-[900px]:flex-none max-[900px]:w-full max-[900px]:gap-0"
      initial={reduceMotion ? false : { opacity: 0, x: -24 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
    >
      {steps.map((meta, index) => {
        const isOpen = currentStep === meta.step
        return (
          <BuilderStep
            key={meta.step}
            step={meta.step}
            title={meta.title}
            icon={meta.icon}
            isOpen={isOpen}
            selectedCount={selectedCount(meta.step)}
            onToggle={() => setStep(isOpen ? 0 : meta.step)}
            nextLabel={meta.nextLabel}
            showNext={isOpen && meta.step < TOTAL_STEPS}
            onNext={() => setStep(meta.step + 1)}
            index={index}
          >
            <StepProducts step={meta.step} />
          </BuilderStep>
        )
      })}
    </motion.div>
  )
}

export default Builder
