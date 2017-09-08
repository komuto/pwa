import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Element, Link } from 'react-scroll'
import Router from 'next/router'
import NProgress from 'nprogress'
// containers
import { Navbar } from './Navbar'
// components
import Content from '../Components/Content'
import MyImage from '../Components/MyImage'
import Notification from '../Components/Notification'
// actions
import * as storeActions from '../actions/stores'
// services
import { Status } from '../Services/Status'
// Lib
import RupiahFormat from '../Lib/RupiahFormat'

const TAB_SHOW_IN_PAGE = 'TAB_SHOW_IN_PAGE'
const TAB_HIDDEN_IN_PAGE = 'TAB_HIDDEN_IN_PAGE'

class ProductList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      storeProducts: props.storeProducts || null,
      search: {
        status: false,
        value: '',
        results: []
      },
      tabs: TAB_SHOW_IN_PAGE,
      showListCatalog: false,
      notification: {
        status: false,
        message: 'Error, default message.'
      }
    }
  }

  switchTab (e) {
    const { tabs } = this.state
    this.setState({ tabs: (tabs === TAB_SHOW_IN_PAGE) ? TAB_HIDDEN_IN_PAGE : TAB_SHOW_IN_PAGE })
  }

  showListCatalogPress = () => { this.setState({ showListCatalog: !this.state.showListCatalog }) }

  componentDidMount () {
    NProgress.start()
    this.props.getStoreProducts({hidden: false})
  }

  searchOnChange (event) {
    const { search, storeProducts } = this.state
    search.status = true
    search.value = event.target.value.replace(/[^a-zA-Z0-9 ]/g, '')

    if (search.value !== '') {
      search.status = true
      search.results = []
      storeProducts.storeProducts.map((sp) => {
        let tamProducts = []
        sp.products.map((product) => {
          (product.name.toLowerCase().indexOf(search.value) > -1) && tamProducts.push(product)
        })
        if (tamProducts.length > 0) {
          sp.products = tamProducts
          search.results.push(sp)
        }
      })
    } else {
      search.status = false
      search.results = []
    }

    this.setState({ search })
  }

  componentWillReceiveProps (nextProps) {
    const { storeProducts } = nextProps
    let { notification } = this.state
    notification = {status: false, message: 'Error, default message.'}
    if (!storeProducts.isLoading) {
      NProgress.done()
      switch (storeProducts.status) {
        case Status.SUCCESS :
          if (!storeProducts.isFound) notification = {status: true, message: 'Data produk tidak ditemukan'}
          break
        case Status.OFFLINE :
        case Status.FAILED :
          notification = {status: true, message: storeProducts.message}
          break
        default:
          break
      }
      this.setState({ storeProducts, notification })
    }
  }

  render () {
    const { tabs, showListCatalog, storeProducts, search, notification } = this.state
    let navbar = {
      searchBoox: false,
      path: '/',
      textPath: 'Daftar Produk'
    }
    let catalogProducts = []
    if (search.status) {
      catalogProducts = search.results
    } else {
      catalogProducts = storeProducts.isFound ? storeProducts.storeProducts : []
    }
    return (
      <Content>
        <Navbar params={navbar} />
        <div className='nav-tabs'>
          <a onClick={(e) => this.switchTab(e)} className={tabs === TAB_SHOW_IN_PAGE && 'active'}>Ditampilkan di Toko</a>
          <a onClick={(e) => this.switchTab(e)} className={tabs === TAB_HIDDEN_IN_PAGE && 'active'}>Disembunyikan</a>
        </div>
        <Notification
          type='is-danger'
          isShow={notification.status}
          activeClose
          onClose={() => this.setState({notification: {status: false, message: ''}})}
          message={notification.message} />
        <section className='section is-paddingless'>
          <div className='field search-form paddingless'>
            <p className='control has-icons-left'>
              <input className='input is-medium' type='text' placeholder='Cari barang atau toko' onChange={(e) => this.searchOnChange(e)} />
              <span className='icon is-left'>
                <span className='icon-search' />
              </span>
            </p>
          </div>
        </section>
        {
          tabs === TAB_SHOW_IN_PAGE
          ? <ContentShow
            catalogProducts={catalogProducts}
            showListCatalog={showListCatalog}
            showListCatalogPress={() => this.showListCatalogPress()} />
          : <ContentHidden />
        }
      </Content>
    )
  }
}

const ContentHidden = (props) => {
  return (
    <h1>Content Hidden</h1>
  )
}

const ContentShow = (props) => {
  return (
    <div>
      {
        props.catalogProducts.map((sp, index) => {
          return (
            <Element name={String(sp.catalog.id)} className={`section is-paddingless detail`} key={index} style={{ marginBottom: 20 }}>
              <div className='info-purchase'>
                <div className='detail-rate is-purchase'>
                  <div className='columns total-items is-mobile is-multiline no-margin-bottom'>
                    <div className='column is-half'>
                      <div className='rating-content is-left'>
                        <strong>{sp.catalog.name} ({sp.products.length})</strong>
                      </div>
                    </div>
                    <div className='column is-half'>
                      <div className='rating-content has-text-right'>
                        <a className='option-content'><span /><span /><span /></a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {
                sp.products.map((p, i) => {
                  let priceAfterDiscount = (p.is_discount) ? p.price - ((p.price * p.discount) / 100) : p.price
                  return (
                    <div className='detail-product' key={i}>
                      <div className='remove rightTop'>
                        <span className='icon-discount-sign' />
                        <span className='icon-grosir-sign' />
                      </div>
                      <div className='purchase'>
                        <figure className='img-item xx'>
                          <MyImage src='../images/pict.jpg' alt='pict' />
                        </figure>
                        <div className='content-product'>
                          <h3>{ p.name }</h3>
                          { (p.dropship_origin !== undefined) && <p className='dropship-worldsports'>Dropship dari {p.dropship_origin.name}</p> }
                          { (p.is_dropshipper) && <p className='dropship-item'>Terbuka untuk dropshipper</p> }
                          <p>Jumlah Stok : { p.stock }</p>
                          <p>Harga jual setelah diskon : Rp { RupiahFormat(priceAfterDiscount) }</p>
                        </div>
                      </div>
                    </div>
                  )
                })
              }
              <div className='see-all'>
                <span className='link' onClick={() => Router.push(`/catalog?id=${sp.catalog.id}`)}>Lihat semua produk di katalog ini
                  <span className='icon-arrow-right' />
                </span>
              </div>
            </Element>
          )
        })
      }

      <a className='catalog-button js-option' onClick={() => this.showListCatalogPress()}>
        <span className='icon-catalog' /> Daftar Katalog
      </a>
      <a className='sticky-button' onClick={() => Router.push('/product-add')}><span className='txt'>+</span></a>

      <div className='sort-option' style={{ display: props.showListCatalog && 'block' }}>
        <div className='sort-list catalog-list'>
          <ul>
            {
              props.catalogProducts.map((sp, index) => {
                return <li key={index}>
                  <Link activeClass='active' className={String(sp.catalog.id)} to={String(sp.catalog.id)} spy smooth duration={500}>{ sp.catalog.name }</Link>
                </li>
              })
          }
          </ul>
        </div>
        <a className='close-option js-close' onClick={() => props.showListCatalogPress()}>
          <span className='icon-close white' />
        </a>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  storeProducts: state.storeProducts
})

const mapDispatchToProps = (dispatch) => ({
  getStoreProducts: (params) => dispatch(storeActions.getStoreProducts(params))
})

export default connect(mapStateToProps, mapDispatchToProps)(ProductList)
