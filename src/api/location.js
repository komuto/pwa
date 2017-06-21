import { publicApiKomuto } from './api'

function getProvince (action) {
  let axios = publicApiKomuto()
  return axios.get('locations/provinces', {
    ...action
  })
}

function getDistrict (action) {
  let axios = publicApiKomuto()
  return axios.get('locations/districts?province_id=' + action.province_id, {
    ...action
  })
}

function getSubDistrict (action) {
  let axios = publicApiKomuto()
  console.log(action.district_id)
  return axios.get('locations/sub-districts?district_id=' + action.district_id, {
    ...action
  })
}

function getVillage (action) {
  let axios = publicApiKomuto()
  return axios.get('locations/villages?sub_district_id=' + action.sub_district_id, {
    ...action
  })
}

export {
  getProvince,
  getDistrict,
  getSubDistrict,
  getVillage
}
