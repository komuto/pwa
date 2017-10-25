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
    BASE_URL: 'https://app.midtrans.com/snap/snap.js',
    ACCESS_KEY: {
      CLIENT_KEY: 'VT-client-Y6pK1V-G7F4a1YgU',
      SERVER_KEY: 'VT-server-eSA2HQ1rSJOqGnIn4ow9wW6j'
    }
  },
  stagging: {
    BASE_URL: 'https://app.sandbox.midtrans.com/snap/snap.js',
    ACCESS_KEY: {
      CLIENT_KEY: 'VT-client-hH6v_I1Ycb8ph8O_',
      SERVER_KEY: 'VT-server-_wU53Pb9SBY_D3ARkrYr_5bD'
    }
  }
}

const AppConfig = {
  DEBUG: true,
  baseURL,
  serviceUrl,
  apiKomuto,
  languages,
  midTrans: midTrans.stagging
}

export default AppConfig
