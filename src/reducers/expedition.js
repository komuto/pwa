import * as expeditionActions from '../actions/expedition'

const initExpedition = {
  expeditions: [],
  message: '',
  status: 0,
  isLoading: false,
  isFound: false,
  isError: false
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
        isLoading: false,
        isFound: true
      }
    case expeditionActions.GET_EXPEDITION_FAILURE:
      return {
        ...state,
        message: action.message,
        status: action.code,
        isLoading: false,
        isError: true
      }
    default:
      return state
  }
}

export {
  expedition
}
