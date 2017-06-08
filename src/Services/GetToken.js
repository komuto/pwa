import localforage from 'localforage'

const getToken = () => {
  return localforage.getItem('access_token').then((value) => {
    return value
  }).catch(() => {

  })
}
export default {getToken}
