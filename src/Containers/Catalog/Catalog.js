import React, { Component } from 'react'
import { connect } from 'react-redux'
import NProgress from 'nprogress'
import _ from 'lodash'
import InfiniteScroll from 'react-infinite-scroller'
import Router from 'next/router'
// containers
import { Navbar } from '../Navbar'
// components
import Notification from '../../Components/Notification'
import Content from '../../Components/Content'
import Loading from '../../Components/Loading'
import MyImage from '../../Components/MyImage'
// actions
import * as storeActions from '../../actions/stores'
// Lib
import RupiahFormat from '../../Lib/RupiahFormat'
/** including themes */
import Images from '../../Themes/Images'
/** including validations */
import * as inputValidations from '../../Validations/Input'

class Catalog extends Component {
  constructor (props) {
    super(props)
    this.state = {
      id: props.query.id || null,
      storeCatalogProducts: props.storeCatalogProducts || null,
      storeCatalogProductsSearch: props.storeCatalogProductsSearch || null,
      searchText: '',
      isEmpty: false,
      pagination: {
        page: 1,
        limit: 10
      },
      notification: {
        type: 'is-success',
        status: false,
        message: 'Error, default message.'
      }
    }
    this.hasMore = false
    this.fetching = { fetchingFirst: false, fetchingMore: false, searchItem: false }
  }

  productDetail (e, product) {
    e.preventDefault()
    if (product.hasOwnProperty('dropship_origin')) {
      Router.push(`/product-dropship-detail?id=${product.id}&commission=${product.dropship_origin.commission.percent}&type=detailDropship`)
    } else {
      Router.push(`/product-manage?id=${product.id}`)
    }
  }

  doSearch (e) {
    const { storeCatalogProductsSearch } = this.state
    let searchValue = inputValidations.inputNormal(e.target.value)
    const newState = { storeCatalogProductsSearch, searchText: searchValue }
    newState.storeCatalogProductsSearch['products'] = []
    this.setState(newState)
    if (this.timeout) clearTimeout(this.timeout)
    this.timeout = setTimeout(() => {
      if (searchValue) {
        this.fetching = { ...this.fetching, searchItem: true }
        NProgress.start()
        this.props.getStoreProductsByCatalogSearch({ catalog_id: this.state.id, q: searchValue })
      } else {
        this.setState({ isEmpty: false })
      }
    }, 1000)
  }

  async loadMore () {
    let { id, pagination } = this.state
    if (!this.fetching.fetchingMore) {
      const newState = { pagination }
      pagination['page'] = pagination.page + 1
      this.setState(newState)
      this.fetching = { ...this.fetching, fetchingMore: true }
      await this.props.getStoreCatalogProducts({ id, page: this.state.pagination.page, hidden: false })
    }
  }

  componentDidMount () {
    const { id } = this.state
    NProgress.start()
    this.fetching = { ...this.fetching, fetchingFirst: true }
    this.props.getStoreCatalogProducts({ id, page: 1, hidden: false })
  }

  componentWillReceiveProps (nextProps) {
    const { storeCatalogProducts, storeCatalogProductsSearch } = nextProps
    const { isFetching, isFound, isError, notifError } = this.props

    if (!isFetching(storeCatalogProducts) && this.fetching.fetchingFirst) {
      NProgress.done()
      this.fetching = { ...this.fetching, fetchingFirst: false }
      if (isFound(storeCatalogProducts)) {
        this.hasMore = storeCatalogProducts.storeCatalogProducts.products.length > 9
        let isEmpty = storeCatalogProducts.storeCatalogProducts.products.length < 1
        this.setState({ storeCatalogProducts, isEmpty })
      }
      if (isError(storeCatalogProducts)) {
        this.setState({ notification: notifError(storeCatalogProducts.message) })
      }
    }

    if (!isFetching(storeCatalogProducts) && this.fetching.fetchingMore) {
      this.fetching = { ...this.fetching, fetchingMore: false }
      if (isFound(storeCatalogProducts)) {
        let stateStoreCatalogProducts = this.state.storeCatalogProducts
        this.hasMore = storeCatalogProducts.storeCatalogProducts.products.length > 9
        stateStoreCatalogProducts.storeCatalogProducts.products = stateStoreCatalogProducts.storeCatalogProducts.products.concat(storeCatalogProducts.storeCatalogProducts.products)
        this.setState({ storeCatalogProducts: stateStoreCatalogProducts })
      }
      if (isError(storeCatalogProducts)) {
        this.setState({ notification: notifError(storeCatalogProducts.message) })
        this.hasMore = false
      }
    }
    // handling search
    if (!isFetching(storeCatalogProductsSearch) && this.fetching.searchItem) {
      NProgress.done()
      this.fetching = { ...this.fetching, searchItem: false }
      this.hasMore = false
      if (isFound(storeCatalogProductsSearch)) {
        let uniqData = storeCatalogProductsSearch.products.filter((data, index, self) =>
          self.findIndex((p) => { return p.id === data.id }) === index
        )
        let isEmpty = storeCatalogProductsSearch.products.length < 1
        let newState = { storeCatalogProductsSearch, isEmpty }
        newState.storeCatalogProductsSearch['products'] = uniqData
        this.setState(newState)
      }
      if (isError(storeCatalogProductsSearch)) {
        this.setState({ notification: notifError(storeCatalogProductsSearch.message) })
      }
    }
  }

  render () {
    const { storeCatalogProducts, storeCatalogProductsSearch, searchText, notification, isEmpty } = this.state
    let { catalog, products } = storeCatalogProducts.storeCatalogProducts
    let productSearch = storeCatalogProductsSearch.isFound ? storeCatalogProductsSearch.products : []
    let catalogProducts
    let params = {
      navbar: {
        searchBoox: false,
        path: '/',
        textPath: storeCatalogProducts.isFound ? catalog.name : ''
      }
    }
    if (!searchText) {
      catalogProducts = products
    } else {
      catalogProducts = productSearch
    }
    return (
      <Content>
        <Navbar {...params} />
        <Notification
          type={notification.type}
          isShow={notification.status}
          activeClose
          onClose={() => this.setState({notification: {status: false, message: ''}})}
          message={notification.message} />
        <section className='section is-paddingless'>
          <div className='field search-form paddingless'>
            <p className='control has-icons-left'>
              <input className='input is-medium' type='text' value={searchText} placeholder='Cari barang ' onChange={(e) => this.doSearch(e)} />
              <span className='icon is-left'>
                <span className='icon-search' />
              </span>
            </p>
          </div>
        </section>
        <section className='section is-paddingless detail'>
          {
            isEmpty ? <ProductEmpty />
            : storeCatalogProducts.isFound && <InfiniteScroll
              pageStart={0}
              loadMore={_.debounce(this.loadMore.bind(this), 500)}
              hasMore={this.hasMore}
              loader={<Loading size={12} color='#ef5656' className='is-fullwidth has-text-centered' />}>
              {
                catalogProducts.map((p, index) => {
                  let priceAfterDiscount = (p.is_discount) ? p.price - ((p.price * p.discount) / 100) : p.price
                  return (
                    <div className='detail-product' key={index} onClick={(e) => this.productDetail(e, p)}>
                      <div className='remove rightTop'>
                        { p.is_discount && <span className='icon-discount-sign' /> }
                        { p.is_wholesaler && <span className='icon-grosir-sign' /> }
                      </div>
                      <div className='purchase'>
                        <figure className='img-item xx'>
                          <MyImage src={p.image} alt='pict' />
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
                  )
                })
            }
            </InfiniteScroll>
          }
        </section>
      </Content>

    )
  }
}

/** product empty content */
const ProductEmpty = () => {
  return (
    <section className='content'>
      <div className='container is-fluid'>
        <div className='desc has-text-centered'>
          <MyImage src={Images.notFound} alt='notFound' />
          <p><strong>Produk tidak ditemukan</strong></p>
          <p>Kami tidak bisa menemukan barang yang anda inginkan</p>
        </div>
      </div>
    </section>
  )
}

const mapStateToProps = (state) => ({
  storeCatalogProducts: state.storeCatalogProducts,
  storeCatalogProductsSearch: state.storeCatalogProductsSearch
})

const mapDispatchToProps = (dispatch) => ({
  getStoreCatalogProducts: (params) => dispatch(storeActions.getStoreCatalogProducts(params)),
  getStoreProductsByCatalogSearch: (params) => dispatch(storeActions.getStoreProductsByCatalogSearch(params))
})

export default connect(mapStateToProps, mapDispatchToProps)(Catalog)
