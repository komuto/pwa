import * as locationActions from '../actions/location'

const initProvince = {
  provinces: [],
  message: '',
  status: 0,
  isLoading: false,
  isFound: false,
  isOnline: true
}

const initDistrict = {
  districts: [],
  message: '',
  status: 0,
  isLoading: false,
  isFound: false,
  isOnline: true
}

const initSubDistrict = {
  subdistricts: [],
  message: '',
  status: 0,
  isLoading: false,
  isFound: false,
  isOnline: true
}

const initVillage = {
  villages: [],
  message: '',
  status: 0,
  isLoading: false,
  isFound: false,
  isOnline: true
}

function province (state = initProvince, action) {
  switch (action.type) {
    case locationActions.GET_PROVINCE_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case locationActions.GET_PROVINCE_SUCCESS:
      return {
        ...state,
        provinces: action.data,
        length: action.data.length,
        message: action.message,
        status: action.code,
        isLoading: false,
        isOnline: true,
        isFound: true
      }
    case locationActions.GET_PROVINCE_FAILURE:
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

function district (state = initDistrict, action) {
  switch (action.type) {
    case locationActions.GET_DISTRICT_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case locationActions.GET_DISTRICT_SUCCESS:
      return {
        ...state,
        districts: action.data,
        length: action.data.length,
        message: action.message,
        status: action.code,
        isLoading: false,
        isOnline: true,
        isFound: true
      }
    case locationActions.GET_DISTRICT_FAILURE:
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

function subdistrict (state = initSubDistrict, action) {
  switch (action.type) {
    case locationActions.GET_SUBDISTRICT_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case locationActions.GET_SUBDISTRICT_SUCCESS:
      return {
        ...state,
        subdistricts: action.data,
        length: action.data.length,
        message: action.message,
        status: action.code,
        isOnline: true,
        isLoading: false,
        isFound: true
      }
    case locationActions.GET_SUBDISTRICT_FAILURE:
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

function village (state = initVillage, action) {
  switch (action.type) {
    case locationActions.GET_VILLAGE_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case locationActions.GET_VILLAGE_SUCCESS:
      return {
        ...state,
        villages: action.data,
        message: action.message,
        status: action.code,
        isOnline: true,
        isLoading: false,
        isFound: true
      }
    case locationActions.GET_VILLAGE_FAILURE:
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

export {
  province,
  district,
  subdistrict,
  village
}
