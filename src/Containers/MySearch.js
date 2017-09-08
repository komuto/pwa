import React, { Component } from 'react'
import { connect } from 'react-redux'
import Router from 'next/router'
import url from 'url'
// import _ from 'lodash'
// actions
import * as homeActions from '../actions/home'
// components
import Notification from '../Components/Notification'
import MyImage from '../Components/MyImage'
// utils
import { Status } from '../Services/Status'
// validations
import * as inputValidations from '../Validations/Input'
// themes
import Images from '../Themes/Images'

class MySearch extends Component {
  constructor (props) {
    super(props)
    this.state = {
      searchProduct: props.searchProduct || [],
      submitting: false,
      notFound: false,
      notification: {
        status: false,
        message: 'Error, default message.'
      }
    }
  }

  doSearch (evt) {
    var searchText = inputValidations.inputNormal(evt.target.value) // this is the search text
    if (this.timeout) clearTimeout(this.timeout)
    this.timeout = setTimeout(() => {
      searchText && this.props.search({query: searchText}) && this.setState({ submitting: true })
    }, 1000)
  }

  changeSearchPress () {
    this.searchInput.focus()
  }

  componentDidMount () {
    this.searchInput.focus()
  }

  refInput (input) {
    this.searchInput = input
  }

  componentWillReceiveProps (nextProps) {
    const { searchProduct } = nextProps
    let { notification, notFound } = this.state
    // reset notification
    notification = { status: false, message: 'Error, default message.' }

    if (!searchProduct.isLoading) {
      switch (searchProduct.status) {
        case Status.SUCCESS :
          notFound = (!searchProduct.isFound || searchProduct.products.length < 1)
          break
        case Status.OFFLINE :
        case Status.FAILED :
          notification = {status: true, message: searchProduct.message}
          break
        default:
          break
      }
    }

    this.setState({ searchProduct, submitting: false, notification, notFound })
  }

  render () {
    console.log('state ', this.state)
    console.log('props ', this.props)
    const { submitting, searchProduct, notification, notFound } = this.state
    let key = 0
    return (
      <div className='on-search slide'>
        <div className='header-search'>
          <a className='back back-on-seacrh' onClick={() => Router.back()}><span className='icon-arrow-left black' /></a>
          <div className='field'>
            <p className={`control has-icons-left`}>
              <span className={`${submitting && 'button self is-loading right'}`} />
              <input
                onChange={e => this.doSearch(e)}
                ref={(input) => this.refInput(input)}
                className='input is-medium' type='text' placeholder='Cari barang atau toko' />
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
            {
              notFound && <EmptySearch changeSearchPress={() => this.changeSearchPress()} />
            }
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

// .replace(/\s+/g, '-').toLowerCase()

const EmptySearch = (props) => {
  return (
    <section className='content'>
      <div className='container is-fluid'>
        <div className='desc has-text-centered'>
          <MyImage src={Images.notFound} alt='komuto' />
          <p><strong>Hasil Pencarian tidak ditemukan</strong></p>
          <p>Kami tidak bisa menemukan barang dari kata kunci yang Anda masukkan</p>
        </div>
        <a onClick={() => props.changeSearchPress()} className='button is-primary is-large is-fullwidth'>Ubah Pencarian</a>
      </div>
    </section>
  )
}

const mapStateToProps = (state) => ({
  searchProduct: state.searchProduct
})

const mapDispatchToProps = (dispatch) => ({
  search: (params) => dispatch(homeActions.search(params))
})

export default connect(mapStateToProps, mapDispatchToProps)(MySearch)
