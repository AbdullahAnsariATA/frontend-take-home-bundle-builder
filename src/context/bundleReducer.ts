import type { BundleAction, BundleState } from '../types'
import { STORAGE_KEY } from '../constants/bundle'

/** Starts empty — items appear in review only after the shopper selects them. */
export const initialState: BundleState = {
  currentStep: 1,
  quantities: {},
  activeVariants: {
    'wyze-cam-v4': 'white',
    'wyze-cam-pan-v3': 'white',
    'wyze-cam-floodlight-v2': 'white',
    'wyze-battery-cam-pro': 'white',
  },
}

export function bundleReducer(state: BundleState, action: BundleAction): BundleState {
  switch (action.type) {
    case 'SET_QUANTITY': {
      const quantities = { ...state.quantities }
      if (action.quantity > 0) quantities[action.key] = action.quantity
      else delete quantities[action.key]
      return { ...state, quantities }
    }
    case 'SET_STEP':
      return { ...state, currentStep: action.step }
    case 'SET_ACTIVE_VARIANT':
      return {
        ...state,
        activeVariants: {
          ...state.activeVariants,
          [action.productId]: action.variantId,
        },
      }
    case 'RESTORE':
      return action.state
    default:
      return state
  }
}

export function loadInitialState(): BundleState {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) return JSON.parse(saved) as BundleState
  } catch {
    /* ignore corrupt storage */
  }
  return initialState
}

export function saveBundle(state: BundleState) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
}
