import * as actions from '../actions/home'
import { buildReducer, buildType, initState } from '../config'

const initCategory = {
  categories: [],
  ...initState()
}

const initAllCategory = {
  allCategory: [],
  ...initState()
}

function product (state = initState({ products: [] }, true), action) {
  const type = buildType(action.type)
  switch (type) {
    case actions.HOME_PRODUCT:
      return buildReducer(state, action, type, 'products', true)
    default:
      return state
  }
}

function searchProduct (state = initState({ products: [] }), action) {
  const type = buildType(action.type)
  switch (type) {
    case actions.SEARCH_PRODUCT:
      return buildReducer(state, action, type, 'products')
    default:
      return state
  }
}

function filterProduct (state = initState({ products: [] }, true), action) {
  const type = buildType(action.type)
  switch (type) {
    case actions.FILTER_PRODUCT:
      return buildReducer(state, action, type, 'products', true)
    default:
      return state
  }
}

function allCategory (state = initAllCategory, action) {
  const type = buildType(action.type)
  switch (type) {
    case actions.ALL_CATEGORY:
      return buildReducer(state, action, type, 'allCategory')
    default:
      return state
  }
}

function categoryList (state = initCategory, action) {
  const type = buildType(action.type)
  switch (type) {
    case actions.HOME_CATEGORY:
      return buildReducer(state, action, type, 'categories')
    default:
      return state
  }
}

function subCategory (state = initCategory, action) {
  const type = buildType(action.type)
  switch (type) {
    case actions.STATUS_SUBCATEGORY_RESET:
      return initCategory
    case actions.HOME_SUBCATEGORY:
      return buildReducer(state, action, type, 'categories')
    default:
      return state
  }
}

export {
  product,
  searchProduct,
  filterProduct,
  allCategory,
  categoryList,
  subCategory
}
