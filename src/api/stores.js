import { authApiKomuto } from './api'
import { buildQuery } from '../config'

export const getStores = ({ id }) => {
  const axios = authApiKomuto()
  return axios.get(`stores/${id}`)
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
  return axios.post('users/store', action)
}

export const storeExpeditionList = () => {
  const axios = authApiKomuto()
  return axios.get('users/store/expeditions')
}

export const photoUpload = ({ data }) => {
  const axios = authApiKomuto()
  return axios.post('images', data)
}

export const storeExpeditionManage = () => {
  const axios = authApiKomuto()
  return axios.get('users/store/expeditions/manage')
}

export const storeUpdateExpedition = (action) => {
  const axios = authApiKomuto()
  return axios.put('users/store/expeditions', action)
}

export const verifyStore = ({ code }) => {
  const axios = authApiKomuto()
  return axios.post('users/store/verify', { code })
}

export const sendMessageStore = ({ id, ...action }) => {
  const axios = authApiKomuto()
  return axios.post(`stores/${id}/message`, action)
}

export const getOwnStore = () => {
  const axios = authApiKomuto()
  return axios.get('users/profile')
}

export const getStoreProducts = (params) => {
  const axios = authApiKomuto()
  const query = buildQuery(params)
  return axios.get(`users/store/products?${query}`)
}

export const getStoreCatalogProducts = ({ id = '', ...params }) => {
  const axios = authApiKomuto()
  const query = buildQuery(params)
  return axios.get(`users/store/products/catalogs/${id}?${query}`)
}

export const updateInformation = (data) => {
  const axios = authApiKomuto()
  return axios.put('users/store', data)
}

export const updateTerm = (data) => {
  const axios = authApiKomuto()
  return axios.put('users/store/term-condition', data)
}

export const getStoreAddress = () => {
  const axios = authApiKomuto()
  return axios.get('users/store/address')
}

export const updateStoreAddress = (data) => {
  const axios = authApiKomuto()
  return axios.put('users/store/address', data)
}

export const getHiddenStoreProducts = (data) => {
  const axios = authApiKomuto()
  const query = buildQuery(data)
  return axios.get(`users/store/products/hidden?${query}`)
}

export const getStoreDiscussions = (params) => {
  const axios = authApiKomuto()
  const query = buildQuery(params)
  return axios.get(`users/store/discussions?${query}`)
}

export const getStoreProductDetail = ({ id }) => {
  const axios = authApiKomuto()
  return axios.get(`users/store/products/${id}`)
}

export const getStoreProductsByCatalog = ({ id, ...data }) => {
  const axios = authApiKomuto()
  const query = buildQuery(data)
  return axios.get(`users/store/products/catalogs/${id}/list?${query}`)
}

export const getUnreadDisputeStore = () => {
  const axios = authApiKomuto()
  return axios.get('pages/store')
}

export const getStoreProductsByCatalogSearch = (params) => {
  const axios = authApiKomuto()
  const query = buildQuery(params)
  return axios.get(`/users/store/products/search?${query}`)
}

export const getDropshipperFaq = () => {
  const axios = authApiKomuto()
  return axios.get('dropship/faq')
}
