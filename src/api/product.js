import { publicApiKomuto } from './api'

function getProduct (action) {
  let axios = publicApiKomuto()
  return axios.get('products/' + action.id, {
    ...action
  })
}

export {
    getProduct
}
