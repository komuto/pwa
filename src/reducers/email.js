import * as actions from '../actions/email'
import { buildReducer, buildType, initState } from '../config'

const initCheckEmail = {
  ...initState()
}

function checkEmail (state = initCheckEmail, action) {
  const type = buildType(action.type)
  switch (type) {
    case actions.CHECK_EMAIL_VALIDITY:
      return buildReducer(state, action, type)
    default:
      return state
  }
}

export {
  checkEmail
}
