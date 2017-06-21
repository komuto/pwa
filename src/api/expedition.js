import { publicApiKomuto } from './api'

function getExpedition (action) {
  let axios = publicApiKomuto()
  return axios.get('expeditions', {
    ...action
  })
}

export {
  getExpedition
}
