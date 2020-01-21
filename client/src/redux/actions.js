import {
  RECEIPT_IMAGE_LOADED,
  NEXT_LOADING,
} from './actionTypes'

export const receiptLoaded = receiptURL => ({
  type: RECEIPT_IMAGE_LOADED,
  payload: { receiptURL }
})

export const nextLoadingModalRender = () => ({
  type: NEXT_LOADING
})
