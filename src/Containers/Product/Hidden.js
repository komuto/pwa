// @flow
import React from 'react'
import { connect } from 'react-redux'
import NProgress from 'nprogress'
import _ from 'lodash'
import Router from 'next/router'
import InfiniteScroll from 'react-infinite-scroller'
// components
import Notification from '../../Components/Notification'
import Loading from '../../Components/Loading'
import SelectProduct from '../../Components/SelectProduct'
import MyImage from '../../Components/MyImage'
// actions
import * as storeActions from '../../actions/stores'
import * as productActions from '../../actions/product'
/** including themes */
import Images from '../../Themes/Images'

class ProductHidden extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      id: props.query.id || null,
      storeProductsByCatalog: props.storeProductsByCatalog || null,
      selectedProducts: [],
      selectAllProduct: false,
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
    this.submiting = false
    this.fetching = { fetchingFirst: false, fetchingMore: false }
  }

  handleNotification (e) {
    e.preventDefault()
    const { selectedProducts } = this.state
    if (selectedProducts.length === 0) {
      this.setState({ notification: { type: 'is-danger', status: true, message: 'Mohon pilih barang yang akan disembunyikan' } })
    } else {
      this.submiting = true
      this.props.hideProducts({ product_ids: this.state.selectedProducts })
    }
  }

  handleSelectedProducts (e, id) {
    e.preventDefault()
    const { selectedProducts, storeProductsByCatalog } = this.state
    let newSelectedProducts
    if (selectedProducts.includes(id)) {
      let filterId = selectedProducts.filter(val => val !== id)
      newSelectedProducts = [...filterId]
    } else {
      newSelectedProducts = [...selectedProducts, id]
    }
    this.setState({selectedProducts: newSelectedProducts}, () => {
      // cek all checked
      const { products } = storeProductsByCatalog
      let idProducts = products.map(product => product.id)
      let isAllSelected = _.isEqual(idProducts.sort(), this.state.selectedProducts.sort())
      if (isAllSelected) {
        this.setState({ selectAllProduct: true })
      } else {
        this.setState({ selectAllProduct: false })
      }
    })
  }

  handleSelectAll (e) {
    e.preventDefault()
    const { selectAllProduct, storeProductsByCatalog } = this.state
    const { products } = storeProductsByCatalog
    this.setState({ selectAllProduct: !selectAllProduct })
    if (selectAllProduct) {
      this.setState({ selectedProducts: [] })
    } else {
      let getAllIdProducts = products.map(product => product.id)
      this.setState({ selectedProducts: getAllIdProducts })
    }
  }

  async loadMore () {
    let { id, pagination } = this.state
    if (!this.fetching.fetchingMore) {
      const newState = { pagination }
      pagination['page'] = pagination.page + 1
      this.setState(newState)
      this.fetching = { ...this.fetching, fetchingMore: true }
      await this.props.getStoreProductsByCatalog({ id, page: this.state.pagination.page, hidden: false })
    }
  }

  componentDidMount () {
    const { id } = this.state
    if (id) {
      NProgress.start()
      this.fetching = { ...this.fetching, fetchingFirst: true }
      this.props.getStoreProductsByCatalog({ id, hidden: false })
    }
  }

  componentWillReceiveProps (nextProps) {
    const { storeProductsByCatalog, alterProducts } = nextProps
    const { isFetching, isFound, isError, notifError, notifSuccess } = this.props

    if (!isFetching(storeProductsByCatalog) && this.fetching.fetchingFirst) {
      NProgress.done()
      this.fetching = { ...this.fetching, fetchingFirst: false }
      if (isFound(storeProductsByCatalog)) {
        this.hasMore = storeProductsByCatalog.products.length > 9
        let isEmpty = storeProductsByCatalog.products.length < 1
        this.setState({ storeProductsByCatalog, isEmpty })
      }
      if (isError(storeProductsByCatalog)) {
        this.setState({ notification: notifError(storeProductsByCatalog.message) })
      }
    }

    if (!isFetching(storeProductsByCatalog) && this.fetching.fetchingMore) {
      this.fetching = { ...this.fetching, fetchingMore: false }
      if (isFound(storeProductsByCatalog)) {
        let stateStoreProductsByCatalog = this.state.storeProductsByCatalog
        this.hasMore = storeProductsByCatalog.products.length > 9
        stateStoreProductsByCatalog.products = stateStoreProductsByCatalog.products.concat(storeProductsByCatalog.products)
        this.setState({ storeProductsByCatalog: stateStoreProductsByCatalog })
      }
      if (isError(storeProductsByCatalog)) {
        this.setState({ notification: notifError(storeProductsByCatalog.message) })
        this.hasMore = false
      }
    }

    if (!isFetching(alterProducts) && this.submiting) {
      this.submiting = false
      if (isFound(alterProducts)) {
        let newData = storeProductsByCatalog.products.filter(data => this.state.selectedProducts.indexOf(data.id) < 0)
        let newListProduct = {
          ...storeProductsByCatalog, products: newData
        }
        this.setState({ storeProductsByCatalog: newListProduct, notification: notifSuccess(alterProducts.message) })
        if (this.timeout) clearTimeout(this.timeout)
        this.timeout = setTimeout(() => {
          Router.back()
        }, 3000)
      }
      if (isError(alterProducts)) {
        this.setState({ notification: notifError(alterProducts.message) })
      }
    }
  }

  render () {
    const { storeProductsByCatalog, selectedProducts, selectAllProduct, notification, isEmpty } = this.state
    const { products } = storeProductsByCatalog
    return (
      <div>
        <Notification
          type={notification.type}
          isShow={notification.status}
          activeClose
          onClose={() => this.setState({notification: {status: false, message: ''}})}
          message={notification.message} />

        { isEmpty ? <ProductEmpty /> : <div>
          <section className='section is-paddingless'>
            <div className='note'>
              Barang yang disembunyikan tidak akan muncul di toko Anda. Barang Anda yang terbuka untuk dropshipping tetap dapat di dropship oleh toko lain dan tetap bisa dijual seperti biasa oleh toko lain.
            </div>
            <div className='filter-option active'>
              <div className='sort-list check-all top bg-grey'>
                <label className='checkbox' onClick={(e) => this.handleSelectAll(e)}>
                  <span className='sort-text'>Pilih Semua Produk</span>
                  <span className={`input-wrapper ${selectAllProduct && 'checked'}`}>
                    <input type='checkbox' />
                  </span>
                </label>
              </div>
              {
                <InfiniteScroll
                  pageStart={0}
                  loadMore={_.debounce(this.loadMore.bind(this), 500)}
                  hasMore={this.hasMore}
                  loader={<Loading size={30} color='#ef5656' className='is-fullwidth has-text-centered' />}>
                  {
                    products.map((product) => {
                      let isSelected = selectedProducts.filter((id) => {
                        return id === product.id
                      }).length > 0
                      return (
                        <SelectProduct
                          key={product.id}
                          isSelected={isSelected}
                          product={product}
                          handleSelectedProducts={(e, id) => this.handleSelectedProducts(e, id)}
                        />
                      )
                    })
                  }
                </InfiniteScroll>
              }
            </div>
          </section>

          <div className='level nav-bottom nav-button purchase is-mobile'>
            <a className={`button is-primary is-m-lg is-fullwidth btn-add-cart js-option ${this.submiting && 'is-loading'}`}
              onClick={(e) => this.handleNotification(e)}> Sembunyikan Barang Terpilih
            </a>
          </div>
        </div>
        }
      </div>
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

const mapStateToProps = (state) => {
  return {
    storeProductsByCatalog: state.storeProductsByCatalog,
    alterProducts: state.alterProducts
  }
}

const mapDispatchToProps = dispatch => ({
  getStoreProductsByCatalog: (params) => dispatch(storeActions.getStoreProductsByCatalog(params)),
  hideProducts: (params) => dispatch(productActions.hideProducts(params))
})

export default connect(mapStateToProps, mapDispatchToProps)(ProductHidden)
