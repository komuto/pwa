import * as actions from '../actions/location'
import { buildReducer, buildType, initState, typeReq, typeSucc, typeFail, reqState, succState, failState } from '../config'

const initProvince = {
  provinces: [],
  ...initState()
}

const initDistrict = {
  districts: [],
  ...initState()
}

const initSubDistrict = {
  subdistricts: [],
  ...initState()
}

const initVillage = {
  villages: [],
  ...initState()
}

function province (state = initProvince, action) {
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

function district (state = initDistrict, action) {
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

function subdistrict (state = initSubDistrict, action) {
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

function village (state = initVillage, action) {
  const type = buildType(action.type)
  switch (type) {
    case actions.GET_VILLAGE:
      return buildReducer(state, action, type, 'villages')
    default:
      return state
  }
}

export {
  province,
  district,
  subdistrict,
  village
}
