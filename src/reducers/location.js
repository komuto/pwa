import * as actions from '../actions/location'
import { buildReducer, buildType, initState, typeReq, typeSucc, typeFail, reqState, succState, failState } from '../config'

export const province = (state = initState({ provinces: [] }), action) => {
  switch (action.type) {
    case typeReq(actions.GET_PROVINCE):
      return reqState(state)
    case typeSucc(actions.GET_PROVINCE):
      return {
        ...state,
        provinces: action.data,
        length: action.data.length,
        ...succState(action)
      }
    case typeFail(actions.GET_PROVINCE):
      return {
        ...state,
        ...failState(action)
      }
    default:
      return state
  }
}

export const district = (state = initState({ districts: [] }), action) => {
  switch (action.type) {
    case typeReq(actions.GET_DISTRICT):
      return reqState(state)
    case typeSucc(actions.GET_DISTRICT):
      return {
        districts: action.data,
        length: action.data.length,
        ...succState(action)
      }
    case typeFail(actions.GET_DISTRICT):
      return {
        ...state,
        ...failState(action)
      }
    default:
      return state
  }
}

export const subdistrict = (state = initState({ subdistricts: [] }), action) => {
  switch (action.type) {
    case typeReq(actions.GET_SUBDISTRICT):
      return reqState(state)
    case typeSucc(actions.GET_SUBDISTRICT):
      return {
        ...state,
        subdistricts: action.data,
        length: action.data.length,
        ...succState(action)
      }
    case typeFail(actions.GET_SUBDISTRICT):
      return {
        ...state,
        ...failState(action)
      }
    default:
      return state
  }
}

export const village = (state = initState({ villages: [] }), action) => {
  const type = buildType(action.type)
  switch (type) {
    case actions.GET_VILLAGE:
      return buildReducer(state, action, type, 'villages')
    default:
      return state
  }
}
