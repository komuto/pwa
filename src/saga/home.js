import * as actions from '../actions/home'
import * as apis from '../api/home'
import { getProductBy } from '../api/product'
import { buildSaga, buildSagaDelay } from '../config'

export const product = buildSagaDelay(getProductBy, actions.HOME_PRODUCT)
export const filterProduct = buildSagaDelay(getProductBy, actions.FILTER_PRODUCT)
export const search = buildSagaDelay(apis.search, actions.SEARCH_PRODUCT)
export const allCategory = buildSaga(apis.allCategory, actions.ALL_CATEGORY)
export const categoryList = buildSaga(apis.getCategories, actions.GET_CATEGORIES_1)
export const subCategory = buildSaga(apis.getCategories, actions.GET_CATEGORIES_2)
export const subCategory2 = buildSaga(apis.getCategories, actions.GET_CATEGORIES_3)
export const subCategory3 = buildSaga(apis.getCategories, actions.GET_CATEGORIES_4)

