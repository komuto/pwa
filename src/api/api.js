import axios from 'axios'
import { serviceUrl, apiKomuto } from '../config'
import {token} from '../store'
import localforage from 'localforage'

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

export function authApiKomuto () {
  const api = axios.create({
    baseURL: apiKomuto + '/',
    timeout: 10000
  })

  api.interceptors.request.use(async (config) => {
    try {
      const token = await localforage.getItem('token', (value) => {
        return value
      })

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
