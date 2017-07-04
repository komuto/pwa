import { publicApiKomuto } from './api'

function product (action) {
  let axios = publicApiKomuto()
  let param = ''
  let check = [
    {value: action.page, string: 'page'},
    {value: action.size, string: 'size'},
    {value: action.category_id, string: 'category_id'},
    // sort is filled with 'newest', 'cheapest', 'expensive', 'selling'
    {value: action.sort, string: 'sort'},
    // price is filled with range, e.g. 500-1000
    {value: action.price, string: 'price'},
    // condition is filled with 'new' or 'used' or '' for both
    {value: action.condition, string: 'condition'},
    // other is filled with 'discount', 'verified', 'wholesaler'
    {value: action.other, string: 'other'},
    // brands is filled with number separated by comma if more than one, e.g. 2,5,3
    {value: action.brands, string: 'brands'},
    // services is same with brands
    {value: action.services, string: 'services'},
    // address is number of district_id
    {value: action.address, string: 'address'}
  ]

  let indexCheck = []
  // let i = 0
  // for (i = 0; i < check.length; i++) {
  //   if (check[i].value !== undefined) {
  //     indexCheck.push(i)
  //   }
  // }
  check.map(function (obj, index) {
    if (obj.value !== undefined) {
      indexCheck.push(index)
    }
  })

  if (indexCheck.length !== 0) {
    param = '?'
  }

  indexCheck.map(function (obj, index) {
    if (index !== indexCheck.length - 1) {
      param = param + check[obj].string + '=' + check[obj].value + '&'
    } else {
      param = param + check[obj].string + '=' + check[obj].value
    }
  })
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

function allCategory (action) {
  let axios = publicApiKomuto()
  return axios.get('categories/sub', {
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
  allCategory,
  categoryList,
  subCategory
}
