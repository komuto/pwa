import BannerActions, { BannerTypes } from '../Redux/BannerRedux'
import {baseListen, baseFetchNoToken} from './BaseSaga'

// listen to action
export function * fetchBannerServer (api) {
  yield baseListen(BannerTypes.BANNER_SERVER,
    fetchBannerAPI,
    api)
}

// attempts to fetch Banner
export function * fetchBannerAPI (api, data) {
  yield baseFetchNoToken(api.getBanner,
    data,
    BannerActions.bannerSuccess,
    BannerActions.bannerFailure)
}
