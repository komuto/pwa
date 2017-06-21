import { publicApiKomuto } from './api'

function product (action) {
  let axios = publicApiKomuto()
  let param = ''
  let check = [
    {value: action.page, string: 'page'},
    {value: action.limit, string: 'limit'},
    {value: action.category_id, string: 'category_id'}
  ]

  let indeksCheck = []
  let i
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
}

function search (action) {
  let axios = publicApiKomuto()
  return axios.get('products/search?q=' + action.query, {
    ...action
  })
}

function categoryList (action) {
  let axios = publicApiKomuto()
  return axios.get('categories', {
    ...action
  })
}

function subCategory (action) {
  let axios = publicApiKomuto()
  return axios.get('categories/' + action.id + '/sub-categories', {
    ...action
  })
}

export {
  product,
  search,
  categoryList,
  subCategory
}
