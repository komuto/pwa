import * as actions from '../actions/home'
import { buildInitState, createReducer } from '../config'

export const product = createReducer(buildInitState({ products: [] }, true))
  .addReducer({
    type: actions.HOME_PRODUCT,
    resultName: 'products'
  }).run()

export const searchProduct = createReducer(buildInitState({ products: [] }))
  .addReducer({
    type: actions.SEARCH_PRODUCT,
    resultName: 'products'
  }).run()

export const filterProduct = createReducer(buildInitState({ products: [] }, true))
  .addReducer({
    type: actions.FILTER_PRODUCT,
    resultName: 'products'
  }).run()

export const allCategory = createReducer(buildInitState({ allCategory: [] }))
  .addReducer({
    type: actions.ALL_CATEGORY,
    resultName: 'allCategory'
  }).run()

export const categoryList = createReducer(buildInitState({ categories: [] }))
  .addReducer({
    type: actions.GET_CATEGORIES_1,
    resultName: 'categories'
  }).run()

export const subCategory = createReducer(buildInitState({ categories: [] }))
  .addReducer({
    type: actions.GET_CATEGORIES_2,
    resultName: 'categories',
    includeNonSaga: true
  }).run()

export const subCategory2 = createReducer(buildInitState({ categories: [] }))
  .addReducer({
    type: actions.GET_CATEGORIES_3,
    resultName: 'categories'
  }).run()

export const subCategory3 = createReducer(buildInitState({ categories: [] }))
  .addReducer({
    type: actions.GET_CATEGORIES_4,
    resultName: 'categories'
  }).run()
