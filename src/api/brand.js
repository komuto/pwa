import { publicApiKomuto } from './api'

function getBrand (action) {
  let axios = publicApiKomuto()
  return axios.get('brands', {
    ...action
  })
}

export {
  getBrand
}
