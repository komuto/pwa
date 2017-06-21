export const GET_PROVINCE_REQUEST = 'GET_PROVINCE_REQUEST'
export const GET_PROVINCE_SUCCESS = 'GET_PROVINCE_SUCCESS'
export const GET_PROVINCE_FAILURE = 'GET_PROVINCE_FAILURE'

export const GET_DISTRICT_REQUEST = 'GET_DISTRICT_REQUEST'
export const GET_DISTRICT_SUCCESS = 'GET_DISTRICT_SUCCESS'
export const GET_DISTRICT_FAILURE = 'GET_DISTRICT_FAILURE'

export const GET_SUBDISTRICT_REQUEST = 'GET_SUBDISTRICT_REQUEST'
export const GET_SUBDISTRICT_SUCCESS = 'GET_SUBDISTRICT_SUCCESS'
export const GET_SUBDISTRICT_FAILURE = 'GET_SUBDISTRICT_FAILURE'

export const GET_VILLAGE_REQUEST = 'GET_VILLAGE_REQUEST'
export const GET_VILLAGE_SUCCESS = 'GET_VILLAGE_SUCCESS'
export const GET_VILLAGE_FAILURE = 'GET_VILLAGE_FAILURE'

function getProvince () {
  return {
    type: GET_PROVINCE_REQUEST
  }
}

function getDistrict (params) {
  return {
    type: GET_DISTRICT_REQUEST,
    ...params
  }
}

function getSubDistrict (params) {
  return {
    type: GET_SUBDISTRICT_REQUEST,
    ...params
  }
}

function getVillage (params) {
  return {
    type: GET_VILLAGE_REQUEST,
    ...params
  }
}

export {
  getProvince,
  getDistrict,
  getSubDistrict,
  getVillage
}
