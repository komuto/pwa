import { authApiKomuto, publicApiKomuto } from './api'
import { buildQuery } from '../config'

export const register = (action) => {
  const axios = publicApiKomuto()
  return axios.post('users', action)
}

export const verification = ({ token }) => {
  const axios = publicApiKomuto()
  return axios.get(`signup-verification?token=${token}`)
}

export const login = (action) => {
  const axios = publicApiKomuto()
  return axios.post('users/login', action)
}

export const loginSocial = (action) => {
  const axios = publicApiKomuto()
  return axios.post('users/social-login', action)
}

export const forgetPassword = (email) => {
  const axios = publicApiKomuto()
  return axios.post('passwords/forgot', email)
}

export const newPassword = (action) => {
  const axios = publicApiKomuto()
  return axios.put('passwords/new', action)
}

export const changePassword = (action) => {
  const axios = authApiKomuto()
  return axios.put('users/password', action)
}

export const getProfile = () => {
  const axios = authApiKomuto()
  return axios.get('users/profile')
}

export const getProfileManage = () => {
  const axios = authApiKomuto()
  return axios.get('accounts/profile')
}

export const validateToken = ({ token }) => {
  const axios = publicApiKomuto()
  return axios.get(`passwords/new?token=${token}`)
}

export const getBalance = () => {
  const axios = authApiKomuto()
  return axios.get('users/balance')
}

export const updateProfile = (action) => {
  const axios = authApiKomuto()
  return axios.put('accounts/profile', action)
}

export const favoriteStore = ({ id }) => {
  const axios = authApiKomuto()
  return axios.put(`stores/${id}/favorite`)
}

export const getPhone = () => {
  const axios = authApiKomuto()
  return axios.get('accounts/phone')
}

export const updatePhone = (action) => {
  const axios = authApiKomuto()
  return axios.put('accounts/phone', action)
}

export const getDiscussion = (params) => {
  const axios = authApiKomuto()
  const query = buildQuery(params)
  return axios.get(`users/discussions?${query}`)
}

export const listFavoriteStore = (params) => {
  const axios = authApiKomuto()
  const query = buildQuery(params)
  return axios.get(`users/store/favorites?${query}`)
}

export const sendOTPPhone = () => {
  const axios = authApiKomuto()
  return axios.post('accounts/otp/phone', {})
}

export const verifyPhone = ({ code }) => {
  const axios = authApiKomuto()
  return axios.post('accounts/phone/verify', { code })
}

export const wishlist = (data) => {
  const axios = authApiKomuto()
  const query = buildQuery(data)
  return axios.get(`users/wishlist?${query}`)
}

export const sendOTPBank = () => {
  const axios = authApiKomuto()
  return axios.post('accounts/otp/bank', {})
}

export const updateFirebaseToken = (data) => {
  const axios = authApiKomuto()
  return axios.put('users/registration-token', data)
}

export const getNotifSettings = () => {
  const axios = authApiKomuto()
  return axios.get('users/notifications')
}

export const updateNotifSettings = (data) => {
  const axios = authApiKomuto()
  return axios.post('users/notifications', data)
}

export const getResolvedResolutions = (data) => {
  const axios = authApiKomuto()
  const query = buildQuery(data)
  return axios.get(`users/resolutions?is_closed=true&${query}`)
}

export const getUnresolvedResolutions = (data) => {
  const axios = authApiKomuto()
  const query = buildQuery(data)
  return axios.get(`users/resolutions?is_closed=false&${query}`)
}

export const getResolutionDetail = ({ id }) => {
  const axios = authApiKomuto()
  return axios.get(`users/resolutions/${id}`)
}

export const createResolution = (data) => {
  const axios = authApiKomuto()
  return axios.post('users/resolutions', data)
}

export const replyResolution = ({ id, ...data }) => {
  const axios = authApiKomuto()
  return axios.post(`users/resolutions/${id}`, data)
}

export const logout = () => ({ message: 'LOGOUT SUCCESS', code: 0 })
