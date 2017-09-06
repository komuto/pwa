import axios from 'axios'
import { serviceUrl, apiKomuto, storage } from '../config'
import {token} from '../store'

export function authApi () {
  return axios.create({
    baseURL: serviceUrl + '/',
    headers: {'Authorization': token()}
  })
}

export function publicApi () {
  return axios.create({
    baseURL: serviceUrl + '/'
  })
}

export function publicApiKomuto () {
  return axios.create({
    baseURL: apiKomuto + '/',
    timeout: 10000
  })
}

export function uploadApi () {
  const api = axios.create({
    baseURL: apiKomuto + '/',
    headers: {
      'Accept': 'application/json',
      'enctype': 'multipart/form-data'
    }
  })
  api.interceptors.request.use(async config => {
    try {
      const token = await storage.getItem('token')
      if (token !== null) {
        config.headers['Authorization'] = 'JWT ' + token
      }
      return config
    } catch (err) {
      config.log('Error with message: ', err)
    }
  })
  return api
}

export function authApiKomuto (custToken) {
  const api = axios.create({
    baseURL: apiKomuto + '/',
    timeout: 10000
  })
  api.interceptors.request.use(async config => {
    try {
      const token = !custToken ? await storage.getItem('token') : custToken
      if (token !== null) {
        config.headers['Authorization'] = 'JWT ' + token
      }
      return config
    } catch (err) {
      config.log('Error with message: ', err)
    }
  })
  return api
}
