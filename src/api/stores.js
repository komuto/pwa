import { publicApiKomuto, authApiKomuto } from './api'

export const getStores = ({ id }) => {
  const axios = publicApiKomuto()
  return axios.get(`stores/${id}`).catch((err) => { throw err })
}

export const createStore = (action) => {
  const axios = authApiKomuto()
  // store is filled with default array with 4 element e.g. store = ['Toko Makmur', 'Maju Terus', 'Toko yang asik', 'https://dimana']
  // first element is store name, second slogan, third description, fourth logo url
  const storeTemp = {
    name: action.store[0],
    slogan: action.store[1],
    description: action.store[2],
    logo: action.store[3]
  }
  action.store = storeTemp
  // user is filled with default array with 2 element e.g. user = ['10213231', 'Mother Diane']
  // first element represent id_number, second mother_name
  const userTemp = {
    id_number: action.user[0],
    mother_name: action.user[1]
  }
  action.user = userTemp
  // address is filled with default array with 9 element e.g. address = [32,3273,1111110,1111111073,'name','email','phone_number', 'postal_code', 'address']
  const addressTemp = {
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
  return axios.post('users/store', action).catch((err) => { throw err })
}

export const storeExpeditionList = () => {
  const axios = authApiKomuto()
  return axios.get('users/store/expeditions').catch((err) => { throw err })
}

export const photoUpload = ({ data }) => {
  const axios = authApiKomuto()
  return axios.post('images', data).catch((err) => { throw err })
}

export const storeExpeditionManage = () => {
  const axios = authApiKomuto()
  return axios.get('users/store/expeditions/manage').catch((err) => { throw err })
}

export const storeUpdateExpedition = (action) => {
  const axios = authApiKomuto()
  return axios.put('users/store/expeditions', action).catch((err) => { throw err })
}

export const verifyStore = ({ code }) => {
  const axios = authApiKomuto()
  return axios.post('users/store/verify', { code }).catch((err) => { throw err })
}

export const sendMessageStore = ({ id, ...action }) => {
  const axios = authApiKomuto()
  return axios.post(`stores/${id}/message`, action).catch((err) => { throw err })
}

export const getOwnStore = () => {
  const axios = authApiKomuto()
  return axios.get('users/profile').catch((err) => { throw err })
}

export const getStoreProducts = ({ hidden = false } = {}) => {
  const axios = authApiKomuto()
  return axios.get(`users/store/products?hidden=${hidden}`).catch((err) => { throw err })
}

export const getStoreCatalogProducts = ({ id }) => {
  const axios = authApiKomuto()
  return axios.get(`users/store/products/catalogs/${id}`).catch((err) => { throw err })
}

export const updateInformation = (data) => {
  const axios = authApiKomuto()
  return axios.put('users/store', data).catch((err) => { throw err })
}

export const updateTerm = (data) => {
  const axios = authApiKomuto()
  return axios.put('users/store/term-condition', data).catch((err) => { throw err })
}

export const getStoreAddress = () => {
  const axios = authApiKomuto()
  return axios.get('users/store/address').catch((err) => { throw err })
}

export const updateStoreAddress = (data) => {
  const axios = authApiKomuto()
  return axios.put('users/store/address', data).catch((err) => { throw err })
}
