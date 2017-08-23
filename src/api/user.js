import { authApiKomuto, publicApiKomuto } from './api'
import { buildQuery } from '../config'

export const register = (action) => {
  const axios = publicApiKomuto()
  return axios.post('users', action).catch((err) => { throw err })
}

export const verification = ({ token }) => {
  const axios = publicApiKomuto()
  return axios.get(`signup-verification?token=${token}`).catch((err) => { throw err })
}

export const login = (action) => {
  const axios = publicApiKomuto()
  return axios.post('users/login', action).catch((err) => { throw err })
}

export const loginSocial = (action) => {
  const axios = publicApiKomuto()
  return axios.post('users/social-login', action).catch((err) => { throw err })
}

export const forgetPassword = (email) => {
  const axios = publicApiKomuto()
  return axios.post('passwords/forgot', email).catch((err) => { throw err })
}

export const newPassword = (action) => {
  const axios = publicApiKomuto()
  return axios.put('passwords/new', action).catch((err) => { throw err })
}

export const changePassword = (action) => {
  const axios = authApiKomuto()
  return axios.put('users/password', action).catch((err) => { throw err })
}

export const getProfile = () => {
  const axios = authApiKomuto()
  return axios.get('users/profile').catch((err) => { throw err })
}

export const getProfileManage = () => {
  const axios = authApiKomuto()
  return axios.get('accounts/profile').catch((err) => { throw err })
}

export const validateToken = ({ token }) => {
  const axios = publicApiKomuto()
  return axios.get(`passwords/new?token=${token}`).catch((err) => { throw err })
}

export const getBalance = () => {
  const axios = authApiKomuto()
  return axios.get('users/balance').catch((err) => { throw err })
}

export const updateProfile = (action) => {
  const axios = authApiKomuto()
  return axios.put('accounts/profile', action).catch((err) => { throw err })
}

export const favoriteStore = ({ id }) => {
  const axios = authApiKomuto()
  return axios.post(`stores/${id}/favorite`).catch((err) => { throw err })
}

export const getPhone = () => {
  const axios = authApiKomuto()
  return axios.get('accounts/phone').catch((err) => { throw err })
}

export const updatePhone = (action) => {
  const axios = authApiKomuto()
  return axios.put('accounts/phone', action).catch((err) => { throw err })
}

export const getDiscussion = (params) => {
  const axios = authApiKomuto()
  const query = buildQuery(params)
  return axios.get(`users/discussions?${query}`).catch((err) => { throw err })
}

export const listFavoriteStore = (params) => {
  const axios = authApiKomuto()
  const query = buildQuery(params)
  return axios.get(`users/store/favorites?${query}`).catch((err) => { throw err })
}

export const sendOTPPhone = () => {
  const axios = authApiKomuto()
  return axios.post('accounts/otp/phone', {}).catch((err) => { throw err })
}

export const verifyPhone = ({ code }) => {
  const axios = authApiKomuto()
  return axios.post('accounts/phone/verify', { code }).catch((err) => { throw err })
}

export const wishlist = () => {
  const axios = authApiKomuto()
  return axios.get('users/wishlist').catch((err) => { throw err })
}

export const sendOTPBank = () => {
  const axios = authApiKomuto()
  return axios.post('accounts/otp/bank', {}).catch((err) => { throw err })
}

export const logout = () => ({ message: 'LOGOUT SUCCESS', code: 0 })
