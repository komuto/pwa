import React, { Component } from 'react'
import { connect } from 'react-redux'
import Router from 'next/router'
import url from 'url'
// actions
import * as homeActions from '../actions/home'
// components
import Notification from '../Components/Notification'
import MyImage from '../Components/MyImage'
// validations
import * as inputValidations from '../Validations/Input'
// themes
import Images from '../Themes/Images'

class MySearch extends Component {
  constructor (props) {
    super(props)
    this.state = {
      searchProduct: props.searchProduct || null,
      notFound: false,
      notification: props.notification
    }

    this.submitting = {
      searchProduct: false
    }
  }

  doSearch (evt) {
    var searchText = inputValidations.inputNormal(evt.target.value)
    if (this.timeout) clearTimeout(this.timeout)
    this.timeout = setTimeout(() => {
      if (searchText) {
        this.submitting = { ...this.submitting, searchProduct: true }
        this.props.search({query: searchText})
      }
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
    let { isFetching, isError, isFound, notifError } = this.props
    let { searchProduct } = nextProps

    // handling state get search product
    if (!isFetching(searchProduct) && this.submitting.searchProduct) {
      this.submitting = { ...this.submitting, searchProduct: false }
      if (isError(searchProduct)) {
        this.setState({ notification: notifError(searchProduct.message) })
      }
      if (isFound(searchProduct)) {
        this.setState({ searchProduct, notFound: searchProduct.products.length < 1 })
      }
    }
  }

  render () {
    let { searchProduct, notFound, notification } = this.state
    return (
      <div className='on-search slide'>
        <div className='header-search'>
          <a className='back back-on-seacrh' onClick={() => Router.back()}><span className='icon-arrow-left black' /></a>
          <div className='field'>
            <p className={`control has-icons-left`}>
              <span className={`${this.submitting.searchProduct && 'button self is-loading right'}`} />
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
            {
            searchProduct.products && <SearchContent {...this.state} />
          }
          </div>
        </div>
      </div>
    )
  }
}

const SearchContent = (props) => {
  let { searchProduct } = props
  return (
    <ul>
      {
        searchProduct.products.map((product, index) => {
          return (
            <li
              key={index}
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
      }
    </ul>
  )
}

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
