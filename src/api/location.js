import { publicApiKomuto } from './api'

function getProvince (action) {
  let axios = publicApiKomuto()
  return axios.get('locations/provinces', {
    ...action
  })
  .then(function (data) {
    return data
  })
  .catch(function (err) {
    throw (err)
  })
}

function getDistrict (action) {
  let axios = publicApiKomuto()
  return axios.get('locations/districts?province_id=' + action.province_id, {
    ...action
  })
  .then(function (data) {
    return data
  })
  .catch(function (err) {
    throw (err)
  })
}

function getSubDistrict (action) {
  let axios = publicApiKomuto()
  console.log(action.district_id)
  return axios.get('locations/sub-districts?district_id=' + action.district_id, {
    ...action
  })
  .then(function (data) {
    return data
  })
  .catch(function (err) {
    throw (err)
  })
}

function getVillage (action) {
  let axios = publicApiKomuto()
  return axios.get('locations/villages?sub_district_id=' + action.sub_district_id, {
    ...action
  })
  .then(function (data) {
    return data
  })
  .catch(function (err) {
    throw (err)
  })
}

export {
  getProvince,
  getDistrict,
  getSubDistrict,
  getVillage
}
