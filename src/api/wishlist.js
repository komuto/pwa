import { authApiKomuto } from './api'

function wishlist (action) {
  let axios = authApiKomuto()
  return axios.get('users/wishlist', {
    ...action
  })
}

export {
    wishlist
}
