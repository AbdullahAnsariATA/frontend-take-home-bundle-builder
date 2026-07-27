import type { FC, ReactNode } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { TOTAL_STEPS } from '../../constants/bundle'
import { accordionTransition, springSnappy } from '../../constants/motion'
import { cn } from '../../utils/cn'
import { Text } from '../typography/Text'
import { Button } from '../ui/Button'
import { ChevronUp } from '../icons'

interface Props {
  step: number
  title: string
  icon: ReactNode
  isOpen: boolean
  selectedCount: number
  onToggle: () => void
  children: ReactNode
  nextLabel?: string
  onNext?: () => void
  showNext?: boolean
  index?: number
}

const BuilderStep: FC<Props> = ({
  step,
  title,
  icon,
  isOpen,
  selectedCount,
  onToggle,
  children,
  nextLabel,
  onNext,
  showNext,
  index = 0,
}) => {
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      className={cn(
        'builder-step transition-colors duration-200',
        isOpen
          ? // Figma desktop: open accordion fills soft purple (#EDF4FF); mobile stays white
            'open overflow-hidden rounded-[10px] bg-bg-soft max-[900px]:rounded-none max-[900px]:bg-white'
          : 'bg-white',
      )}
      initial={reduceMotion ? false : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
    >
      <Text as="div" variant="stepCounter">
        Step {step} of {TOTAL_STEPS}
      </Text>
      <button
        type="button"
        className={cn(
          'step-header flex items-center justify-between w-full py-5 px-[15px] border-0 border-t border-b border-step-border bg-transparent cursor-pointer text-left max-[900px]:p-4 max-[600px]:p-5',
          isOpen && 'border-b-0',
        )}
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <div className="step-header-left flex items-center gap-2">
          <motion.span
            className="step-icon flex items-center justify-center"
            animate={isOpen && !reduceMotion ? { scale: [1, 1.12, 1], rotate: [0, -6, 0] } : { scale: 1 }}
            transition={springSnappy}
          >
            {icon}
          </motion.span>
          <Text as="span" variant="stepTitle">
            {title}
          </Text>
        </div>
        <div className="step-header-right flex items-center gap-1 shrink-0">
          <Text as="span" variant="stepCount">
            <motion.span
              key={selectedCount}
              className="inline-block"
              initial={reduceMotion ? false : { scale: 0.85, opacity: 0.5 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={springSnappy}
            >
              {selectedCount} selected
            </motion.span>
          </Text>
          <motion.span
            className={cn('step-chevron flex', !isOpen && 'collapsed')}
            animate={{ rotate: isOpen ? 0 : 180 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          >
            <ChevronUp />
          </motion.span>
        </div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={reduceMotion ? false : { height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={reduceMotion ? undefined : { height: 0, opacity: 0 }}
            transition={accordionTransition}
            className="overflow-hidden"
          >
            <div className="step-content flex flex-col gap-3 pt-1 px-[22px] pb-5 max-[900px]:px-4 max-[900px]:pb-4 max-[600px]:px-4">
              {children}
              {showNext && nextLabel && onNext && (
                <motion.div
                  initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15, duration: 0.3 }}
                  className="self-center"
                >
                  <Button variant="next" onClick={onNext}>
                    Next: {nextLabel}
                  </Button>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default BuilderStep
