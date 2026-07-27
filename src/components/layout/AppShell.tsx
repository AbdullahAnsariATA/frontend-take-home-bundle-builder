import type { FC, ReactNode } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Text } from '../typography/Text'
import { fadeUp, staggerContainer } from '../../constants/motion'

interface Props {
  children: ReactNode
  heading?: string
}

const AppShell: FC<Props> = ({ children, heading = "Let's get started!" }) => {
  const reduceMotion = useReducedMotion()

  return (
    <div className="app relative min-h-screen overflow-x-hidden">
      <div className="app-ambient" aria-hidden="true" />
      <motion.div
        className="relative z-[1]"
        variants={reduceMotion ? undefined : staggerContainer}
        initial={reduceMotion ? false : 'hidden'}
        animate="show"
      >
        <motion.div variants={reduceMotion ? undefined : fadeUp}>
          <Text as="h1" variant="mobileHeading">
            {heading}
          </Text>
        </motion.div>
        <motion.div
          variants={reduceMotion ? undefined : fadeUp}
          className="app-layout flex justify-center gap-[29px] py-[49px] px-5 items-start max-[1200px]:py-8 max-[1200px]:gap-6 max-[900px]:flex-col max-[900px]:p-0 max-[900px]:gap-0 max-[600px]:p-0 max-[600px]:gap-0"
        >
          {children}
        </motion.div>
      </motion.div>
    </div>
  )
}

export default AppShell
