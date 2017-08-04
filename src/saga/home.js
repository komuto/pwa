import { put } from 'redux-saga/effects'
import * as homeActions from '../actions/home'
import * as homeApi from '../api/home'
import { getProductBy } from '../api/product'
import { errorHandling, typeSucc, typeFail } from '../config'

function * product (action) {
  try {
    const {data} = yield getProductBy(action)
    yield put({ type: typeSucc(homeActions.HOME_PRODUCT), ...data })
  } catch (e) {
    yield errorHandling(typeFail(homeActions.HOME_PRODUCT), e)
  }
}

function * filterProduct (action) {
  try {
    const {data} = yield getProductBy(action)
    yield put({ type: typeSucc(homeActions.FILTER_PRODUCT), ...data })
  } catch (e) {
    yield errorHandling(typeFail(homeActions.FILTER_PRODUCT), e)
  }
}

function * search (action) {
  try {
    const {data} = yield homeApi.search(action)
    yield put({ type: typeSucc(homeActions.SEARCH_PRODUCT), ...data })
  } catch (e) {
    yield errorHandling(typeFail(homeActions.SEARCH_PRODUCT), e)
  }
}

function * allCategory (action) {
  try {
    const {data} = yield homeApi.allCategory(action)
    yield put({ type: typeSucc(homeActions.ALL_CATEGORY), ...data })
  } catch (e) {
    yield errorHandling(typeFail(homeActions.ALL_CATEGORY), e)
  }
}

function * categoryList (action) {
  try {
    const {data} = yield homeApi.categoryList(action)
    yield put({ type: typeSucc(homeActions.HOME_CATEGORY), ...data })
  } catch (e) {
    yield errorHandling(typeFail(homeActions.HOME_CATEGORY), e)
  }
}

function * subCategory (action) {
  try {
    const {data} = yield homeApi.subCategory(action)
    yield put({ type: typeSucc(homeActions.HOME_SUBCATEGORY), ...data })
  } catch (e) {
    yield errorHandling(typeFail(homeActions.HOME_SUBCATEGORY), e)
  }
}

export {
  product,
  search,
  allCategory,
  filterProduct,
  categoryList,
  subCategory
}
