import { RECEIPT_IMAGE_LOADED } from './actionTypes'

export const receiptLoaded = receiptURL => ({
  type: RECEIPT_IMAGE_LOADED,
  payload: { receiptURL }
})
