import os, { hostname } from 'os'
import DefaultHostName from './DefaultHostName'

const platform = os.platform()
const languages = 'ID' // ID , EN
const serviceUrl = 'https://private-f0902d-komuto.apiary-mock.com' // api ari
const hostNameDev = DefaultHostName
let baseURL = 'http://localhost:8889/'
let apiKomuto = `https://api.${hostNameDev}/`
let hostName = ''

if (platform === 'browser') {
  hostName = os.hostname()
} else {
  hostName = hostNameServer || hostname
}

if (!hostName.includes('localhost')) {
  baseURL = `https://${hostName}/`
  apiKomuto = `https://api.${hostName}/`
}

const midTrans = {
  production: {
    BASE_URL: 'https://app.midtrans.com/snap/snap.js',
    ACCESS_KEY: {
      CLIENT_KEY: '-',
      SERVER_KEY: '-'
    }
  },
  stagging: {
    BASE_URL: 'https://app.sandbox.midtrans.com/snap/snap.js',
    ACCESS_KEY: {
      CLIENT_KEY: '-',
      SERVER_KEY: '-'
    }
  }
}

const raven = {
  secretKey: '-',
  id: '-'
}

const AppConfig = {
  DEBUG: true,
  baseURL,
  serviceUrl,
  apiKomuto,
  languages,
  midTrans: midTrans.stagging,
  raven
}

export default AppConfig
