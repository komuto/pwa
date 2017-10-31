/**
 * Safei Muslim
 * Yogyakarta , revamp: 16 Oktober 2017
 * PT Skyshi Digital Indonesa
 */

/** including dependencies */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import Router from 'next/router'
import url from 'url'
/** including actions */
import * as homeActions from '../actions/home'
/** including components */
import Notification from '../Components/Notification'
import MyImage from '../Components/MyImage'
/** including validations */
import * as inputValidations from '../Validations/Input'
/** including themes */
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

  /** handling input search */
  doSearch ({value}) {
    var searchText = inputValidations.inputNormal(value)
    if (this.timeout) clearTimeout(this.timeout)
    this.timeout = setTimeout(() => {
      if (searchText) {
        this.submitting = { ...this.submitting, searchProduct: true }
        this.props.search({q: searchText})
      }
    }, 500)
  }

  /** focusing to input search */
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

    /** handling state get search product */
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
    let { isFound } = this.props
    return (
      <div className='on-search slide'>
        <InputSearchContent
          submitting={this.submitting}
          doSearch={e => this.doSearch(e.target)}
          refInput={(input) => this.refInput(input)} />
        <Notification
          type='is-danger'
          isShow={notification.status}
          activeClose
          onClose={() => this.setState({notification: {status: false, message: ''}})}
          message={notification.message} />
        <div className='body-search' style={{height: '100%', overflowY: 'auto'}}>
          <div className='search-list'>
            { notFound && <EmptySearch changeSearchPress={() => this.changeSearchPress()} /> }
            { isFound(searchProduct) && <SearchContent {...this.state} /> }
          </div>
        </div>
      </div>
    )
  }
}

/** define input search */
const InputSearchContent = ({submitting, doSearch, refInput}) => (
  <div className='header-search'>
    <a className='back back-on-seacrh' onClick={() => Router.back()}><span className='icon-arrow-left black' /></a>
    <div className='field'>
      <p className={`control has-icons-left`}>
        <span className={`${submitting.searchProduct && 'button self is-loading right'}`} />
        <input
          onChange={doSearch}
          ref={refInput}
          className='input is-medium' type='text' placeholder='Cari barang' />
      </p>
    </div>
  </div>
)

/** define search content */
const SearchContent = ({searchProduct}) => (
  <ul>
    {
      searchProduct.products.map((product, index) => (
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
      ))
    }
  </ul>
)

/** define empty content */
const EmptySearch = ({changeSearchPress}) => (
  <section className='content'>
    <div className='container is-fluid'>
      <div className='desc has-text-centered'>
        <MyImage src={Images.notFound} alt='notFound' />
        <p><strong>Hasil Pencarian tidak ditemukan</strong></p>
        <p>Kami tidak bisa menemukan barang dari kata kunci yang Anda masukkan</p>
      </div>
      <a onClick={() => changeSearchPress()} className='button is-primary is-large is-fullwidth'>Ubah Pencarian</a>
    </div>
  </section>
)

const mapStateToProps = (state) => ({
  searchProduct: state.searchProduct
})

const mapDispatchToProps = (dispatch) => ({
  search: (params) => dispatch(homeActions.search(params))
})

export default connect(mapStateToProps, mapDispatchToProps)(MySearch)
