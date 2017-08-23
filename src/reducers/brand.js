import * as actions from '../actions/brand'
import { buildReducer, buildType, initState } from '../config'

export const brand = (state = initState({ brands: [] }), action) => {
  const type = buildType(action.type)
  switch (type) {
    case actions.GET_BRAND:
      return buildReducer(state, action, type, 'brands')
    default:
      return state
  }
}

export const brandByCategory = (state = initState({ brands: [] }), action) => {
  const type = buildType(action.type)
  switch (type) {
    case actions.BRAND_BY_CATEGORY:
      return buildReducer(state, action, type, 'brands')
    default:
      return state
  }
}
