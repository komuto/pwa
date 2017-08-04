import React, { Component } from 'react'
import { connect } from 'react-redux'
import Router from 'next/router'
import url from 'url'
// import _ from 'lodash'
// actions
import * as homeActions from '../actions/home'
// components
import Notification from '../Components/Notification'
// utils
import { Status } from '../Services/Status'
// validations
import * as inputValidations from '../Validations/Input'

class MySearch extends Component {
  constructor (props) {
    super(props)
    this.state = {
      searchProduct: props.searchProduct || [],
      submitting: false,
      notification: {
        status: false,
        message: 'Error, default message.'
      }
    }
  }

  doSearch (evt) {
    var searchText = inputValidations.inputNormal(evt.target.value) // this is the search text
    // _.debounce(() => {
    //    console.log(searchText)
    // }, 500)
    if (this.timeout) clearTimeout(this.timeout)
    this.timeout = setTimeout(() => {
      searchText && this.props.dispatch(homeActions.search({query: searchText})) && this.setState({ submitting: true })
    }, 1000)
  }

  componentWillReceiveProps (nextProps) {
    const { searchProduct } = nextProps
    let { notification } = this.state

    // reset notification
    notification = { status: false, message: 'Error, default message.' }

    if (!searchProduct.isLoading) {
      switch (searchProduct.status) {
        case Status.SUCCESS :
          if (!searchProduct.isFound || searchProduct.products.length < 1) notification = {status: true, message: 'Data produk tidak ditemukan'}
          break
        case Status.OFFLINE :
        case Status.FAILED :
          notification = {status: true, message: searchProduct.message}
          break
        default:
          break
      }
    }

    this.setState({ searchProduct, submitting: false, notification })
  }

  render () {
    const { submitting, searchProduct, notification } = this.state
    let key = 0
    return (
      <div className='on-search slide'>
        <div className='header-search'>
          <a className='back back-on-seacrh' onClick={() => Router.back()}><span className='icon-arrow-left black' /></a>
          <div className='field'>
            <p className={`control has-icons-left`}>
              <span className={`${!submitting && 'button self is-loading right'}`} />
              <input className='input is-medium' type='text' placeholder='Cari barang atau toko' onChange={evt => this.doSearch(evt)} />
            </p>
          </div>
        </div>
        <Notification
          type='is-danger'
          isShow={notification.status}
          activeClose
          onClose={() => this.setState({notification: {status: false, message: ''}})}
          message={notification.message} />
        <div className='body-search' style={{height: '100%', overflowY: 'auto'}}>
          <div className='search-list'>
            <ul>
              {
                searchProduct.products
                ? searchProduct.products.map((product) => {
                  key++
                  return (
                    <li
                      key={key}
                      onClick={() => {
                        Router.push(
                            url.format({
                              pathname: '/product',
                              query: {q: product.name.replace(/\s+/g, '-').toLowerCase()}
                            }),
                            `/p?q=${product.name.replace(/\s+/g, '-').toLowerCase()}`
                        )
                      }} >{ product.name }</li>
                  )
                })
                : null
              }
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    searchProduct: state.searchProduct
  }
}

export default connect(mapStateToProps)(MySearch)
