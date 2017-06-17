import axios from 'axios'
import { serviceUrl, apiKomuto } from '../config'
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
    baseURL: apiKomuto + '/'
  })
}

export function authApiKomuto () {
  return axios.create({
    baseURL: apiKomuto + '/',
    headers: {'Authorization': token()}
  })
}
