import { put } from 'redux-saga/effects'

export const serviceUrl = 'https://private-f0902d-komuto.apiary-mock.com'
export const apiKomuto = 'https://api.komuto.skyshi.com'

export function errorHandling (actionType, res) {
  const errorOffline = {
    message: 'Your device is offline',
    code: 'ENOENT',
    isOnline: false
  }

  const data = res.response
  if (data !== undefined) {
    if (data.status !== 502) {
      const {data} = res.response
      data.isOnline = true
      return put({ type: actionType, ...data })
    } else {
      let errorBadGateway = {
        message: res.response.statusText,
        code: res.response.status,
        isOnline: true
      }
      return put({ type: actionType, ...errorBadGateway })
    }
  } else {
    return put({ type: actionType, ...errorOffline })
  }
}
