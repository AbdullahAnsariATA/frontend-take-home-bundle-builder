import type { Product } from '../types'
import { isProductSelected } from '../utils/lineItems'
import { useBundle } from './useBundle'

export function useStepSelection(products: Product[]) {
  const { state, dispatch } = useBundle()

  const selectedCount = (step: number) =>
    products
      .filter((p) => p.step === step)
      .filter((p) => isProductSelected(p, state.quantities)).length

  const setStep = (step: number) => dispatch({ type: 'SET_STEP', step })

  return {
    currentStep: state.currentStep,
    selectedCount,
    setStep,
  }
}
