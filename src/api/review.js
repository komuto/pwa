import { authApiKomuto, publicApiKomuto } from './api'

function getReview (action) {
  let axios = publicApiKomuto()
  let params = ''
  let check = [
    {value: action.page, string: 'page'},
    {value: action.limit, string: 'string'}
  ]
  let indexCheck = []
  check.map(function (obj, index) {
    if (obj.value === undefined || obj.value === '') {
      // do nothing
    } else {
      indexCheck.push(index)
    }
  })
  if (indexCheck.length !== 0) {
    params = '?'
  }
  indexCheck.map(function (obj, index) {
    if (index !== indexCheck.length - 1) {
      params = params + check[obj].string + '=' + check[obj].value + '&'
    } else {
      params = params + check[obj].string + '=' + check[obj].value
    }
  })

  return axios.get('products/' + action.id + '/reviews' + params, {
    ...action
  })
  .then(function (data) {
    return data
  })
  .catch(function (err) {
    throw (err)
  })
}

function addReview (action) {
  let axios = authApiKomuto()
  return axios.post('products/' + action.id + '/reviews', {
    ...action
  })
  .then(function (data) {
    return data
  })
  .catch(function (err) {
    throw (err)
  })
}

function listReviewPagination (action) {
  let axios = publicApiKomuto()
  let params = ''
  let check = [
    {value: action.page, string: 'page'},
    {value: action.limit, string: 'limit'}
  ]
  let indexCheck = []
  check.map(function (obj, index) {
    if (obj.value === '' || obj.value === undefined) {
      // do nothing
    } else {
      indexCheck.push(index)
    }
  })

  if (indexCheck.length !== 0) {
    params = '?'
  }

  indexCheck.map(function (obj, index) {
    if (index !== indexCheck.length - 1) {
      params = params + check[obj].string + '=' + check[obj].value + '&'
    } else {
      params = params + check[obj].string + '=' + check[obj].value
    }
  })
  return axios.get('products/' + action.id + '/reviews' + params, {
    ...action
  })
  .then(function (data) {
    return data
  })
  .catch(function (err) {
    throw (err)
  })
}

export {
  getReview,
  listReviewPagination,
  addReview
}
