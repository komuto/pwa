import React, { Component } from 'react'
import { connect } from 'react-redux'
import Router from 'next/router'
import url from 'url'
// import NProgress from 'nprogress'
// import _ from 'lodash'
// actions
import * as homeActions from '../actions/home'
// components
import Notification from '../Components/Notification'
// utils
import { Status } from '../Services/Status'

class Search extends Component {
  constructor (props) {
    super(props)
    this.state = {
      searchProduct: props.searchProduct || [],
      searchValue: '',
      notification: {
        status: false,
        message: 'Error, default message.'
      }
    }

    this.onChange = this.onChange.bind(this)
  }

  onChange (event) {
    const searchValue = event.target.value.replace(/[^a-zA-Z0-9 ]/g, '')

    if (searchValue !== '') {
      // _.debounce(() => {
      this.props.dispatch(homeActions.search({query: searchValue}))
      // }, 1000)
    }
    this.setState({ searchValue })
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

    this.setState({ searchProduct, notification })
  }

  render () {
    const { active } = this.props
    const { searchValue, searchProduct, notification } = this.state
    let key = 0
    return (
      <div className={`on-search ${active ? 'slide' : ''}`}>
        <div className='header-search'>
          <a className='back back-on-seacrh' onClick={() => this.props.backPress()}><span className='icon-arrow-left black' /></a>
          <div className='field'>
            <p className='control has-icons-left'>
              <input className='input is-medium' type='text' placeholder='Cari barang atau toko' onChange={(event) => this.onChange(event)} value={searchValue} />
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
                              query: {q: product.name}
                            }),
                            `/p?q=${product.name}`
                        )
                        this.props.activeSearch(false)
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

export default connect(mapStateToProps)(Search)
