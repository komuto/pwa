// @flow
import React from 'react'
import { connect } from 'react-redux'
import NProgress from 'nprogress'
import _ from 'lodash'
import Router from 'next/router'
// components
import Notification from '../../Components/Notification'
import SelectProduct from '../../Components/SelectProduct'
// actions
import * as storeActions from '../../actions/stores'
import * as productActions from '../../actions/product'

class ProductHidden extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      id: props.query.id || null,
      storeProductsByCatalog: props.storeProductsByCatalog || null,
      selectedProducts: [],
      selectAllProduct: false,
      modalListCatalog: false,
      notification: {
        type: 'is-success',
        status: false,
        message: 'Error, default message.'
      }
    }
    this.fetchingFirst = false
    this.submiting = false
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

  componentDidMount () {
    const { id } = this.state
    if (id) {
      NProgress.start()
      this.fetchingFirst = true
      this.props.getStoreProductsByCatalog({ id, hidden: false })
    }
  }

  componentWillReceiveProps (nextProps) {
    const { storeProductsByCatalog, alterProducts } = nextProps
    const { isFetching, isFound, isError, notifError, notifSuccess } = this.props

    if (!isFetching(storeProductsByCatalog) && this.fetchingFirst) {
      NProgress.done()
      this.fetchingFirst = false
      if (isFound(storeProductsByCatalog)) {
        this.setState({ storeProductsByCatalog })
      }
      if (isError(storeProductsByCatalog)) {
        this.setState({ notification: notifError(storeProductsByCatalog.message) })
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
        }, 1000)
      }
      if (isError(alterProducts)) {
        this.setState({ notification: notifError(alterProducts.message) })
      }
    }
  }

  render () {
    const { storeProductsByCatalog, selectedProducts, selectAllProduct, notification } = this.state
    const { products } = storeProductsByCatalog
    return (
      <div>
        <Notification
          type={notification.type}
          isShow={notification.status}
          activeClose
          onClose={() => this.setState({notification: {status: false, message: ''}})}
          message={notification.message} />

        { storeProductsByCatalog.products.length !== 0 ? <div>
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
                storeProductsByCatalog.isFound && products.map((product) => {
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
            </div>
          </section>

          <div className='level nav-bottom nav-button purchase is-mobile'>
            <a className={`button is-primary is-m-lg is-fullwidth btn-add-cart js-option ${this.submiting && 'is-loading'}`}
              onClick={(e) => this.handleNotification(e)}> Sembunyikan Barang Terpilih
            </a>
          </div>
        </div>
        : <p style={{textAlign: 'center', paddingTop: '20px'}}>Tidak ada barang di katalog ini</p>
        }
      </div>
    )
  }
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
