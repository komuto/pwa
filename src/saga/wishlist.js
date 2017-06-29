import { put } from 'redux-saga/effects'
import * as wishlistActions from '../actions/wishlist'
import * as wishlistApi from '../api/wishlist'
import { errorHandling } from '../config'

function * wishlist (action) {
  try {
    const {data} = yield wishlistApi.wishlist(action)
    console.log(data)
    yield put({ type: wishlistActions.GET_WISHLIST_SUCCESS, ...data })
  } catch (e) {
    yield errorHandling(wishlistActions.GET_WISHLIST_FAILURE, e)
  }
}

export {
    wishlist
}
