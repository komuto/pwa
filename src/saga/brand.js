import * as apis from '../api/brand'
import * as actions from '../actions/brand'
import { buildSaga, getState } from '../config'

export const getBrand = buildSaga(apis.getBrand, actions.GET_BRAND)
export const getBrandByCategory = buildSaga(apis.getBrandByCategory, actions.BRAND_BY_CATEGORY,
  getState({ from: (state) => state.brands.brands, get: 'all', match: 'category_id' }))
