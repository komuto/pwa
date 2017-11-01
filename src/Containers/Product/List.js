import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Element, Link, Events } from 'react-scroll'
import Router from 'next/router'
import NProgress from 'nprogress'
// containers
import { Navbar } from '../Navbar'
// components
import Content from '../../Components/Content'
import MyImage from '../../Components/MyImage'
import Notification from '../../Components/Notification'
// actions
import * as storeActions from '../../actions/stores'
// services
import { Status } from '../../Services/Status'
// Lib
import RupiahFormat from '../../Lib/RupiahFormat'

const TAB_SHOW_IN_PAGE = 'TAB_SHOW_IN_PAGE'
const TAB_HIDDEN_IN_PAGE = 'TAB_HIDDEN_IN_PAGE'

class ProductList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      storeProducts: props.storeProducts || null,
      hiddenStoreProducts: props.hiddenStoreProducts || null,
      search: {
        status: false,
        value: '',
        results: []
      },
      tabs: TAB_SHOW_IN_PAGE,
      showListCatalog: false,
      dropdownSelected: '',
      notification: {
        status: false,
        message: 'Error, default message.'
      }
    }
  }

  handleDropdown (e, id) {
    e.preventDefault()
    const { dropdownSelected } = this.state
    const newState = { dropdownSelected }
    newState.dropdownSelected = id
    this.setState(newState)
  }

  productHidden (e, id) {
    e.preventDefault()
    Router.push(`/product-hidden?id=${id}`)
  }

  productDeleteInCatalog (e, id) {
    e.preventDefault()
    Router.push(`/product-delete-in-catalog?id=${id}`)
  }

  productMoveCatalogOther (e, id) {
    e.preventDefault()
    Router.push(`/product-move-catalog-other?id=${id}`)
  }

  productChangeDropship (e, id) {
    e.preventDefault()
    Router.push(`/product-change-dropship?id=${id}`)
  }

  productDetail (e, product) {
    e.preventDefault()
    if (product.hasOwnProperty('dropship_origin')) {
      Router.push(`/product-dropship-detail?id=${product.id}&commission=${product.dropship_origin.commission.percent}&type=detailDropship`)
    } else {
      Router.push(`/product-manage?id=${product.id}`)
    }
  }

  switchTab (e) {
    const { tabs } = this.state
    this.setState({ search: { status: false, value: '', results: [] } })
    this.setState({ tabs: (tabs === TAB_SHOW_IN_PAGE) ? TAB_HIDDEN_IN_PAGE : TAB_SHOW_IN_PAGE })
  }

  showListCatalogPress () { this.setState({ showListCatalog: !this.state.showListCatalog }) }

  componentDidMount () {
    NProgress.start()
    this.props.getStoreProducts({hidden: false})
    if (!this.props.hiddenStoreProducts.isFound) {
      this.props.getHiddenStoreProducts()
    }
    Events.scrollEvent.register('end', (to, element) => {
      this.setState({ showListCatalog: !this.state.showListCatalog })
    })
  }

  searchOnChange (event) {
    const { search, tabs, storeProducts, hiddenStoreProducts } = this.state
    search.status = true
    search.value = event.target.value.replace(/[^a-zA-Z0-9 ]/g, '')

    if (tabs === TAB_SHOW_IN_PAGE) {
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
    }
    if (tabs === TAB_HIDDEN_IN_PAGE) {
      if (search.value !== '') {
        let filteredData = hiddenStoreProducts.products.filter((x) => {
          let regex = new RegExp(search.value, 'gi')
          return regex.test(x.name)
        })
        search.results = filteredData
      } else {
        search.status = false
        search.results = []
      }
    }
    this.setState({ search })
  }

  componentWillReceiveProps (nextProps) {
    const { storeProducts, hiddenStoreProducts } = nextProps
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
    if (hiddenStoreProducts.isFound) {
      this.setState({ hiddenStoreProducts })
    }
  }

  render () {
    console.log('state', this.state)
    const { tabs, showListCatalog, storeProducts, hiddenStoreProducts, search, notification, dropdownSelected } = this.state
    const toManageStore = () => {
      Router.push('/manage-store')
    }
    let params = {
      navbar: {
        searchBoox: false,
        path: '/',
        callBack: () => toManageStore(),
        textPath: 'Daftar Produk'
      }
    }
    let catalogProducts = []
    let hiddenProducts = []
    if (tabs === TAB_SHOW_IN_PAGE) {
      if (search.status) {
        catalogProducts = search.results
      } else {
        catalogProducts = storeProducts.isFound ? storeProducts.storeProducts : []
      }
    }
    if (tabs === TAB_HIDDEN_IN_PAGE) {
      if (search.status) {
        hiddenProducts = search.results
      } else {
        hiddenProducts = hiddenStoreProducts.isFound ? hiddenStoreProducts.products : []
      }
    }
    return (
      <Content>
        <Navbar {...params} />
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
              <input className='input is-medium' type='text' placeholder='Cari barang ' onChange={(e) => this.searchOnChange(e)} />
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
            showListCatalogPress={() => this.showListCatalogPress()}
            handleDropdown={(e, id) => this.handleDropdown(e, id)}
            productDeleteInCatalog={(e, id) => this.productDeleteInCatalog(e, id)}
            productHidden={(e, id) => this.productHidden(e, id)}
            productMoveCatalogOther={(e, id) => this.productMoveCatalogOther(e, id)}
            productChangeDropship={(e, id) => this.productChangeDropship(e, id)}
            dropdownSelected={dropdownSelected}
            productDetail={(e, product) => this.productDetail(e, product)} />
          : <ContentHidden
            hiddenProducts={hiddenProducts}
            catalogProducts={catalogProducts}
            productDetail={(e, product) => this.productDetail(e, product)} />
        }
      </Content>
    )
  }
}

const ContentHidden = (props) => {
  if (props.hiddenProducts === undefined) return null
  console.log('test', props.catalogProducts[0])
  return (
    <div>
      {
        props.hiddenProducts.map((p, i) => {
          let priceAfterDiscount = (p.is_discount) ? p.price - ((p.price * p.discount) / 100) : p.price
          return (
            <Element name={String(p.id)} className={`section is-paddingless detail`} key={i} style={{ marginBottom: 20 }}>
              <div className='detail-product' key={i} onClick={(e) => props.productDetail(e, p)}>
                <div className='remove rightTop'>
                  { p.is_discount && <span className='icon-discount-sign' /> }
                  { p.is_wholesaler && <span className='icon-grosir-sign' /> }
                </div>
                <div className='purchase'>
                  <figure className='img-item xx'>
                    <MyImage src={p.image} alt='image' />
                  </figure>
                  <div className='content-product'>
                    <h3>{ p.name }</h3>
                    { (p.dropship_origin !== undefined) && <p className='dropship-worldsports'>Dropship dari {p.dropship_origin.name}</p> }
                    { (!p.hasOwnProperty('dropship_origin') && p.is_dropship) && <p className='dropship-item'>Terbuka untuk dropshipper</p> }
                    <p>Jumlah Stok : { p.stock }</p>
                    <p>Harga jual setelah diskon : Rp { RupiahFormat(priceAfterDiscount) }</p>
                  </div>
                </div>
              </div>
            </Element>
          )
        })
      }
    </div>
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
                    <div className='column is-half' onClick={(e) => props.handleDropdown(e, sp.catalog.id)}>
                      <div className={`rating-content has-text-right menu-top ${props.dropdownSelected === sp.catalog.id && 'open'}`}>
                        <a className='option-content'><span /><span /><span /></a>
                        <ul className='option-dropdown'>
                          <li><a className='js-option' onClick={(e) => props.productHidden(e, sp.catalog.id)} >Sembunyikan Barang</a></li>
                          <li><a className='js-option' onClick={(e) => props.productDeleteInCatalog(e, sp.catalog.id)} >Hapus Barang di Katalog</a></li>
                          <li><a className='js-option' onClick={(e) => props.productMoveCatalogOther(e, sp.catalog.id)} >Pindahkan Barang ke Katalog Lain</a></li>
                          <li><a className='js-option' onClick={(e) => props.productChangeDropship(e, sp.catalog.id)} >Pindahkan Barang ke Dropshipping</a></li>
                        </ul>
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
                        { p.is_discount && <span className='icon-discount-sign' /> }
                        { p.is_wholesaler && <span className='icon-grosir-sign' /> }
                      </div>
                      <div className='purchase' onClick={(e) => props.productDetail(e, p)}>
                        <figure className='img-item xx'>
                          <MyImage src={p.image} alt='image' />
                        </figure>
                        <div className='content-product'>
                          <h3>{ p.name }</h3>
                          { (p.dropship_origin !== undefined) && <p className='dropship-worldsports'>Dropship dari {p.dropship_origin.name}</p> }
                          { (!p.hasOwnProperty('dropship_origin') && p.is_dropship) && <p className='dropship-item'>Terbuka untuk dropshipper</p> }
                          <p>Jumlah Stok : { p.stock }</p>
                          { p.is_discount && <p>Harga jual setelah diskon : Rp { RupiahFormat(priceAfterDiscount) }</p> }
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

      <a className='catalog-button js-option' onClick={() => props.showListCatalogPress()}>
        <span className='icon-catalog' /> Daftar Katalog
      </a>
      <a className='sticky-button' onClick={() => Router.push('/product-add')}><span className='txt'>+</span></a>

      <div className='sort-option' style={{ display: props.showListCatalog && 'block' }}>
        <div className='sort-list catalog-list' style={{ overflowY: 'inherit' }}>
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
  storeProducts: state.storeProducts,
  hiddenStoreProducts: state.hiddenStoreProducts
})

const mapDispatchToProps = (dispatch) => ({
  getStoreProducts: (params) => dispatch(storeActions.getStoreProducts(params)),
  getHiddenStoreProducts: (params) => dispatch(storeActions.getHiddenStoreProducts(params))
})

export default connect(mapStateToProps, mapDispatchToProps)(ProductList)
