import axios from 'axios'
import { serviceUrl, apiKomuto } from '../config'
import {token} from '../store'
import localForage from 'localforage'

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
    timeout: 2000
  })
}

export function authApiKomuto () {
  const api = axios.create({
    baseURL: apiKomuto + '/',
    timeout: 5000
  })

  api.interceptors.request.use(config => {
    try {
      let token = null
      localForage.getItem('token', (value) => {
        token = value
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
