import localforage from 'localforage'

const getToken = () => {
  return localforage.getItem('token').then((value) => {
    return value
  }).catch(() => {
    return null
  })
}
export default {getToken}
