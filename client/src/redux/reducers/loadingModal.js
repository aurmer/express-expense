import { RECEIPT_IMAGE_LOADED } from '../actionTypes'
import { deepCopy } from '../../util-functions'

const initialState = {
  count: 0
}

export default function (state = initialState, action) {
  let newState = deepCopy(state)
  const {type} = action

  if (type === RECEIPT_IMAGE_LOADED) {
    const { receiptURL } = action.payload
    if(newState.receiptURL !== "") {
      URL.revokeObjectURL(newState.receiptURL)
    }
    newState.receiptURL = receiptURL
  }
  else if(type === "PLACEHOLDER_ACTION") {
    // ...
  }

  return newState
}
