import { publicApiKomuto } from './api'

function product (action) {
  let axios = publicApiKomuto()
  let param = ''
  let check = [
    {value: action.page, string: 'page'},
    {value: action.limit, string: 'limit'},
    {value: action.category_id, string: 'category_id'},
    {value: action.sort, string: 'sort'}
  ]

  let indeksCheck = []
  let i = 0
  for (i = 0; i < check.length; i++) {
    if (check[i].value !== undefined) {
      indeksCheck.push(i)
    }
  }

  if (indeksCheck.length !== 0) {
    param = '?'
  }

  for (i = 0; i < indeksCheck.length; i++) {
    if (i !== indeksCheck.length - 1) {
      param = param + check[indeksCheck[i]].string + '=' + check[indeksCheck[i]].value + '&'
    } else {
      param = param + check[indeksCheck[i]].string + '=' + check[indeksCheck[i]].value
    }
  }
  // console.log('ini nih paramnya: products' + param)
  return axios.get('products' + param, {
    ...action
  })
  .then(function (data) {
    return data
  })
  .catch(function (err) {
    throw (err)
  })
}

function search (action) {
  let axios = publicApiKomuto()
  return axios.get('products/search?q=' + action.query, {
    ...action
  })
  .then(function (data) {
    return data
  })
  .catch(function (err) {
    throw (err)
  })
}

function categoryList (action) {
  let axios = publicApiKomuto()
  return axios.get('categories', {
    ...action
  })
  .then(function (data) {
    return data
  })
  .catch(function (err) {
    throw (err)
  })
}

function subCategory (action) {
  let axios = publicApiKomuto()
  return axios.get('categories/' + action.id + '/sub-categories', {
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
  product,
  search,
  categoryList,
  subCategory
}
