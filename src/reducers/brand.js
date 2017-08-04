import * as actions from '../actions/brand'
import { buildReducer, buildType, initState } from '../config'

const initBrand = {
  brands: [],
  ...initState()
}

function brand (state = initBrand, action) {
  const type = buildType(action.type)
  switch (type) {
    case actions.GET_BRAND:
      return buildReducer(state, action, type, 'brands')
    default:
      return state
  }
}

function brandByCategory (state = initBrand, action) {
  const type = buildType(action.type)
  switch (type) {
    case actions.BRAND_BY_CATEGORY:
      return buildReducer(state, action, type, 'brands')
    default:
      return state
  }
}

export {
  brand,
  brandByCategory
}
