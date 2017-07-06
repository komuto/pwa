import { publicApiKomuto } from './api'

function product (action) {
  let axios = publicApiKomuto()
  let param = ''
  let tempPrice = action.price
  if (tempPrice !== undefined) {
    if (tempPrice[0] === 0 && tempPrice[1] === 0) {
      tempPrice = ''
    } else {
      if (tempPrice[0] === 0) {
        tempPrice[0] = 50
        tempPrice = tempPrice[0] + '-' + tempPrice[1]
      } else {
        tempPrice[1] = 1000000000000
        tempPrice = tempPrice[0] + '-' + tempPrice[1]
      }
    }
  }
  if (action.other !== undefined || action.brands !== undefined || action.services !== undefined) {
    if (action.other[0] === undefined) {
      action.other = undefined
    }
    if (action.brands[0] === undefined) {
      action.brands = undefined
    }
    if (action.services[0] === undefined) {
      action.services = undefined
    }
  }
  action.price = tempPrice
  let check = [
    {value: action.page, string: 'page'},
    {value: action.limit, string: 'limit'},
    {value: action.category_id, string: 'category_id'},
    // sort is filled with 'newest', 'cheapest', 'expensive', 'selling'
    {value: action.sort, string: 'sort'},
    // price is filled with array with default value is [0,0] first value is stand for min price
    // and the second value is stand for max price
    {value: action.price, string: 'price'},
    // condition is filled with 'new' or 'used' or '' for both
    {value: action.condition, string: 'condition'},
    // other is filled with array and the values are 'discount', 'verified', 'wholesaler'
    {value: action.other, string: 'other'},
    // brands is filled with array and id brands as the value
    {value: action.brands, string: 'brands'},
    // services is same with brands
    {value: action.services, string: 'services'},
    // address is number of district_id
    {value: action.address, string: 'address'},
    {value: action.query, string: 'q'}
  ]

  let indexCheck = []
  // let i = 0
  // for (i = 0; i < check.length; i++) {
  //   if (check[i].value !== undefined) {
  //     indexCheck.push(i)
  //   }
  // }
  check.map(function (obj, index) {
    if (obj.value === undefined || obj.value === '') {
      // do nothing
    } else {
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
  return axios.get('categories/' + action.id, {
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
