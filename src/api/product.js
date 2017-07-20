// import Router from 'next/router'
// import url from 'url'
// function productBy (action) {
//   let axios = publicApiKomuto()
//   let param = '' // params for api
//   let paramForUrl = '' // params for url
//   let tempPrice = action.price
//   if (tempPrice !== undefined) {
//     if (tempPrice[0] === 0 && tempPrice[1] === 0) {
//       tempPrice = ''
//     } else {
//       if (tempPrice[0] === 0) {
//         tempPrice[0] = 50
//         tempPrice = tempPrice[0] + '-' + tempPrice[1]
//       } else {
//         tempPrice[1] = 1000000000000
//         tempPrice = tempPrice[0] + '-' + tempPrice[1]
//       }
//     }
//   }
//   if (action.other !== undefined || action.brands !== undefined || action.services !== undefined) {
//     if (action.other !== undefined && action.other[0] === undefined) {
//       action.other = undefined
//     }
//     if (action.brands !== undefined && action.brands[0] === undefined) {
//       action.brands = undefined
//     }
//     if (action.services !== undefined && action.services[0] === undefined) {
//       action.services = undefined
//     }
//   }
//   action.price = tempPrice
//   let check = [
//     {value: action.page, string: 'page'},
//     {value: action.limit, string: 'limit'},
//     {value: action.category_id, string: 'category_id'},
//     // sort is filled with 'newest', 'cheapest', 'expensive', 'selling'
//     {value: action.sort, string: 'sort'},
//     // price is filled with array with default value is [0,0] first value is stand for min price
//     // and the second value is stand for max price
//     {value: action.price, string: 'price'},
//     // condition is filled with 'new' or 'used' or '' for both
//     {value: action.condition, string: 'condition'},
//     // other is filled with array and the values are 'discount', 'verified', 'wholesaler'
//     {value: action.other, string: 'other'},
//     // brands is filled with array and id brands as the value
//     {value: action.brands, string: 'brands'},
//     // services is same with brands
//     {value: action.services, string: 'services'},
//     // address is number of district_id
//     {value: action.address, string: 'address'},
//     {value: action.query, string: 'q'}
//   ]

//   let indexCheck = []
//   // let i = 0
//   // for (i = 0; i < check.length; i++) {
//   //   if (check[i].value !== undefined) {
//   //     indexCheck.push(i)
//   //   }
//   // }
//   check.map(function (obj, index) {
//     if (obj.value === undefined || obj.value === '') {
//       // do nothing
//     } else {
//       indexCheck.push(index)
//     }
//   })

//   if (indexCheck.length !== 0) {
//     param = '?'
//     paramForUrl = '?'
//   }

//   indexCheck.map(function (obj, index) {
//     if (index !== indexCheck.length - 1) {
//       // params for api
//       let valueApi = (check[obj].string === 'q') ? check[obj].value.replace(/-/g, ' ') : check[obj].value
//       param = param + check[obj].string + '=' + valueApi + '&'
//       // params for url
//       let valueUrl = (check[obj].string === 'q') ? check[obj].value.replace(/\s+/g, '-') : check[obj].value
//       paramForUrl = paramForUrl + check[obj].string + '=' + valueUrl + '&'
//     } else {
//       // params for api
//       let valueApi = (check[obj].string === 'q') ? check[obj].value.replace(/-/g, ' ') : check[obj].value
//       param = param + check[obj].string + '=' + valueApi
//       // params for url
//       let valueUrl = (check[obj].string === 'q') ? check[obj].value.replace(/\s+/g, '-') : check[obj].value
//       paramForUrl = paramForUrl + check[obj].string + '=' + valueUrl
//     }
//   })

//   // // setup url
//   // Router.push(
//   //   url.format({
//   //     pathname: '/product'
//   //   }),
//   //   `/p/${paramForUrl}`
//   // )

//   // console.log('ini nih paramnya: products' + param)
//   return axios.get('products' + param, {
//     ...action
//   })
//   .then(function (data) {
//     return data
//   })
//   .catch(function (err) {
//     throw (err)
//   })
// }

import localforage from 'localforage'
import { publicApiKomuto, authApiKomuto } from './api'

function getProduct (action) {
  let token = localforage.getItem('token')
  let axios
  if (token) {
    axios = authApiKomuto()
  } else {
    axios = publicApiKomuto()
  }
  return axios.get('products/' + action.id, {
    ...action
  })
}

function productBy (action) {
  let token = localforage.getItem('token')
  let axios
  if (token) {
    axios = authApiKomuto()
  } else {
    axios = publicApiKomuto()
  }
  let param = ''
  let tempPrice = action.price
  if (tempPrice !== undefined) {
    if (tempPrice[0] === 0 && tempPrice[1] === 0) {
      tempPrice = ''
    } else {
      if (tempPrice[0] === 0) {
        tempPrice[0] = 50
        if (tempPrice[1] === 0) {
          tempPrice[1] = 1000000000000
        }
        tempPrice = tempPrice[0] + '-' + tempPrice[1]
      } else if (tempPrice[1] === 0) {
        tempPrice[1] = 1000000000000
        tempPrice = tempPrice[0] + '-' + tempPrice[1]
      }
    }
  }
  if (action.other !== undefined || action.brands !== undefined || action.services !== undefined) {
    if (action.other !== undefined && action.other[0] === undefined) {
      action.other = undefined
    }
    if (action.brands !== undefined && action.brands[0] === undefined) {
      action.brands = undefined
    }
    if (action.services !== undefined && action.services[0] === undefined) {
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

function addToWishlist (action) {
  let axios = authApiKomuto()
  return axios.get('products/' + action.id + '/wishlist', {
    ...action
  })
  .then(function (data) {
    return data
  })
  .catch(function (err) {
    throw (err)
  })
}

function addToWishlistHome (action) {
  let axios = authApiKomuto()
  return axios.get('products/' + action.id + '/wishlist', {
    ...action
  })
  .then(function (data) {
    return data
  })
  .catch(function (err) {
    throw (err)
  })
}

function getDiscussion (action) {
  let axios = publicApiKomuto()
  let params = ''
  let check = [
    {value: action.page, string: 'page'},
    {value: action.limit, string: 'limit'}
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
  return axios.get('products/' + action.id + '/discussions' + params, {
    ...action
  })
  .then(function (data) {
    return data
  })
  .catch(function (err) {
    throw (err)
  })
}

function newDiscussion (action) {
  let axios = authApiKomuto()
  return axios.post('products/' + action.id + '/discussions', {
    ...action
  })
  .then(function (data) {
    return data
  })
  .catch(function (err) {
    throw (err)
  })
}

function getComment (action) {
  let axios = publicApiKomuto()
  let params = ''
  let check = [
    {value: action.page, string: 'page'},
    {value: action.limit, string: 'limit'}
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
  return axios.get('products/' + action.productId + '/discussions/' + action.id + '/comments' + params, {
    ...action
  })
  .then(function (data) {
    return data
  })
  .catch(function (err) {
    throw (err)
  })
}

function newComment (action) {
  let axios = authApiKomuto()
  return axios.post('products/' + action.productId + '/discussions/' + action.id + '/comments', {
    ...action
  })
  .then(function (data) {
    return data
  })
  .catch(function (err) {
    throw (err)
  })
}

function reportProduct (action) {
  let axios = authApiKomuto()
  return axios.post('products/' + action.id + '/report', {
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
    getProduct,
    productBy,
    addToWishlist,
    addToWishlistHome,
    getDiscussion,
    newDiscussion,
    getComment,
    newComment,
    reportProduct
}
