import os from 'os'

let hostName = 'localhost'
// for server rendering
if (typeof hostNameServer !== 'undefined') {
  hostName = hostNameServer
} else {
  hostName = os.hostname()
}
const isLocalhost = hostName.includes('localhost')

console.log('hostName: ', hostName)
console.log('isLocalhost: ', isLocalhost)

const baseURL = isLocalhost ? 'http://localhost:8889/' : `https://${hostName}/`
const serviceUrl = 'https://private-f0902d-komuto.apiary-mock.com'
const languages = 'ID' // ID , EN
const apiKomuto = isLocalhost ? `https://api.komuto.skyshi.com/` : `https://api.${hostName}/`

const midTrans = {
  production: {
    BASE_URL: '',
    ACCESS_KEY: {
      CLIENT_KEY: '',
      SERVER_KEY: ''
    }
  },
  stagging: {
    BASE_URL: '',
    ACCESS_KEY: {
      CLIENT_KEY: '',
      SERVER_KEY: ''
    }
  }
}

const raven = {
  secretKey: '',
  id: ''
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
