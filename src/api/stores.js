import { publicApiKomuto, authApiKomuto } from './api'

function getStores (action) {
  let axios = publicApiKomuto()
  return axios.get('stores/' + action.id, {
    ...action
  })
  .then(function (data) {
    return data
  })
  .catch(function (err) {
    return (err)
  })
}

function createStore (action) {
  let axios = authApiKomuto()
  // store is filled with default array with 4 element e.g. store = ['Toko Makmur', 'Maju Terus', 'Toko yang asik', 'https://dimana']
  // first element is store name, second slogan, third description, fourth logo url
  let storeTemp = {
    name: action.store[0],
    slogan: action.store[1],
    description: action.store[2],
    logo: action.store[3]
  }
  action.store = storeTemp
  // user is filled with default array with 2 element e.g. user = ['10213231', 'Mother Diane']
  // first element represent id_number, second mother_name
  let userTemp = {
    id_number: action.user[0],
    mother_name: action.user[1]
  }
  action.user = userTemp
  // address is filled with default array with 9 element e.g. address = [32,3273,1111110,1111111073,'name','email','phone_number', 'postal_code', 'address']
  let addressTemp = {
    province_id: action.address[0],
    district_id: action.address[1],
    sub_district_id: action.address[2],
    village_id: action.address[3],
    name: action.address[4],
    email: action.address[5],
    phone_number: action.address[6],
    postal_code: action.address[7],
    address: action.address[8]
  }
  action.address = addressTemp
  return axios.post('users/store', {
    ...action
  })
  .then(function (data) {
    return data
  })
  .catch(function (err) {
    throw (err)
  })
}

function storeExpeditionList (action) {
  let axios = authApiKomuto()
  return axios.get('users/store/expeditions', {
    ...action
  })
  .then(function (data) {
    return data
  })
  .catch(function (err) {
    throw (err)
  })
}

function photoUpload (action) {
  let axios = authApiKomuto()
  return axios.post('images', {
    ...action
  })
  .then(function (data) {
    return data
  })
  .catch(function (err) {
    throw (err)
  })
}

function storeExpeditionManage (action) {
  let axios = authApiKomuto()
  return axios.get('users/store/expeditions/manage', {
    ...action
  })
  .then(function (data) {
    return data
  })
  .catch(function (err) {
    throw (err)
  })
}

function storeUpdateExpedition (action) {
  let axios = authApiKomuto()
  return axios.put('users/store/expeditions', {
    ...action
  })
  .then(function (data) {
    return data
  })
  .catch(function (err) {
    throw (err)
  })
}

function verifyStore (action) {
  let axios = authApiKomuto()
  return axios.post('users/store/verify', {
    ...action
  })
  .then(function (data) {
    return data
  })
  .catch(function (err) {
    throw (err)
  })
}

function sendMessageStore (action) {
  let axios = authApiKomuto()
  return axios.post('stores/' + action.id + '/message', {
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
    getStores,
    createStore,
    photoUpload,
    storeExpeditionList,
    storeExpeditionManage,
    storeUpdateExpedition,
    verifyStore,
    sendMessageStore
}
