import * as expeditionActions from '../actions/expedition'

const initExpedition = {
  expeditions: [],
  message: '',
  status: 0,
  isLoading: false,
  isFound: false,
  isOnline: true
}

const initCharge = {
  charges: [],
  message: '',
  status: 0,
  isLoading: false,
  isFound: false,
  isOnline: true
}

function expedition (state = initExpedition, action) {
  switch (action.type) {
    case expeditionActions.GET_EXPEDITION_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case expeditionActions.GET_EXPEDITION_SUCCESS:
      return {
        ...state,
        expeditions: action.data,
        message: action.message,
        status: action.code,
        isOnline: true,
        isLoading: false,
        isFound: true
      }
    case expeditionActions.GET_EXPEDITION_FAILURE:
      return {
        ...state,
        message: action.message,
        status: action.code,
        isLoading: false,
        isOnline: action.isOnline
      }
    default:
      return state
  }
}

function expeditionServices (state = initExpedition, action) {
  switch (action.type) {
    case expeditionActions.GET_EXPEDITIONSERVICES_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case expeditionActions.GET_EXPEDITIONSERVICES_SUCCESS:
      return {
        ...state,
        expeditions: action.data,
        message: action.message,
        status: action.code,
        isOnline: true,
        isLoading: false,
        isFound: true
      }
    case expeditionActions.GET_EXPEDITIONSERVICES_FAILURE:
      return {
        ...state,
        message: action.message,
        status: action.code,
        isLoading: false,
        isOnline: action.isOnline
      }
    default:
      return state
  }
}

function shippingCharge (state = initCharge, action) {
  switch (action.type) {
    case expeditionActions.GET_SHIPPINGCHARGE_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case expeditionActions.GET_SHIPPINGCHARGE_SUCCESS:
      return {
        ...state,
        charges: action.data,
        message: action.message,
        status: action.code,
        isLoading: false,
        isOnline: true,
        isFound: true
      }
    case expeditionActions.GET_SHIPPINGCHARGE_FAILURE:
      return {
        ...state,
        message: action.message,
        status: action.code,
        isLoading: false,
        isOnline: action.isOnline,
        isFound: false
      }
    default:
      return state
  }
}

export {
  expedition,
  expeditionServices,
  shippingCharge
}
