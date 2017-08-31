import * as actions from '../actions/location'
import { buildInitState, typeReq, typeSucc, typeFail, reqState, succState, failState, createReducer } from '../config'

export const province = (state = buildInitState({ provinces: [] }), action) => {
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

export const district = (state = buildInitState({ districts: [] }), action) => {
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

export const subdistrict = (state = buildInitState({ subdistricts: [] }), action) => {
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

export const village = createReducer(buildInitState({ villages: [] }))
  .addReducer({
    type: actions.GET_VILLAGE,
    resultName: 'villages'
  }).run()
