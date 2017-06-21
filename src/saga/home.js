import { put } from 'redux-saga/effects'
import * as homeActions from '../actions/home'
import * as homeApi from '../api/home'

function * product (action) {
  try {
    const {data} = yield homeApi.product(action)
    yield put({ type: homeActions.HOME_PRODUCT_SUCCESS, ...data })
  } catch (e) {
    const {data} = e.response
    yield put({ type: homeActions.HOME_PRODUCT_FAILURE, ...data })
  }
}

function * search (action) {
  try {
    const {data} = yield homeApi.search(action)
    yield put({ type: homeActions.SEARCH_PRODUCT_SUCCESS, ...data })
  } catch (e) {
    const {data} = e.response
    yield put({ type: homeActions.SEARCH_PRODUCT_FAILURE, ...data })
  }
}

function * categoryList (action) {
  try {
    const {data} = yield homeApi.categoryList(action)
    yield put({ type: homeActions.HOME_CATEGORY_SUCCESS, ...data })
  } catch (e) {
    const {data} = e.response
    yield put({ type: homeActions.HOME_CATEGORY_FAILURE, ...data })
  }
}

function * subCategory (action) {
  try {
    const {data} = yield homeApi.subCategory(action)
    yield put({ type: homeActions.HOME_SUBCATEGORY_SUCCESS, ...data })
  } catch (e) {
    const {data} = e.response
    yield put({ type: homeActions.HOME_SUBCATEGORY_FAILURE, ...data })
  }
}

export {
  product,
  search,
  categoryList,
  subCategory
}
