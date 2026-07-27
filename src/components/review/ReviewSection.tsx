import type { FC, ReactNode } from 'react'
import { Text } from '../typography/Text'

interface Props {
  label: string
  children: ReactNode
}

const ReviewSection: FC<Props> = ({ label, children }) => {
  return (
    <div className="review-section flex flex-col gap-3 pt-[15px] border-t border-divider mt-3 first:mt-0">
      <Text as="h3" variant="reviewSectionLabel">
        {label}
      </Text>
      {children}
    </div>
  )
}

export default ReviewSection
