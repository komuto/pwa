// @flow
import React from 'react'
import { connect } from 'react-redux'
import NProgress from 'nprogress'
import _ from 'lodash'
// components
import Notification from '../Components/Notification'
import SelectProduct from '../Components/SelectProduct'
// actions
import * as storeActions from '../actions/stores'
import * as productActions from '../actions/product'
// services
import { validateResponse, isFetching, Status } from '../Services/Status'

class ProductDeleteInCatalog extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      submitting: false,
      id: props.query.id || null,
      storeCatalogProducts: props.storeCatalogProducts || null,
      selectedProducts: [],
      selectAllProduct: false,
      confirmDelete: false,
      notification: {
        type: 'is-success',
        status: false,
        message: 'Error, default message.'
      }
    }
  }

  modalShowDelete (e, address) {
    e.preventDefault()
    const { confirmDelete, selectedProducts } = this.state
    if (selectedProducts.length === 0) {
      this.setState({ notification: { type: 'is-danger', status: true, message: 'Mohon pilih barang yang akan dihapus' } })
    } else {
      this.setState({ confirmDelete: !confirmDelete })
    }
  }

  deleteProduct (e) {
    e.preventDefault()
    this.setState({ submitting: true })
    this.props.deleteProducts({ product_ids: this.state.selectedProducts })
  }

  handleSelectedProducts (e, id) {
    e.preventDefault()
    const { selectedProducts, storeCatalogProducts } = this.state
    let newSelectedProducts
    if (selectedProducts.includes(id)) {
      let filterId = selectedProducts.filter(val => val !== id)
      newSelectedProducts = [...filterId]
    } else {
      newSelectedProducts = [...selectedProducts, id]
    }
    this.setState({selectedProducts: newSelectedProducts}, () => {
      // cek all checked
      const { products } = storeCatalogProducts.storeCatalogProducts
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
    const { selectAllProduct, storeCatalogProducts } = this.state
    const { products } = storeCatalogProducts.storeCatalogProducts
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
    NProgress.start()
    this.props.getStoreCatalogProducts({ id })
  }

  componentWillReceiveProps (nextProps) {
    const { storeCatalogProducts, alterProducts } = nextProps
    const { notification, submitting, id } = this.state
    if (!isFetching(storeCatalogProducts)) {
      NProgress.done()
      this.setState({ storeCatalogProducts, notification: validateResponse(storeCatalogProducts, 'Data katalog tidak ditemukan!') })
    }
    if (alterProducts.isFound && submitting) {
      switch (alterProducts.status) {
        case Status.SUCCESS: {
          this.props.getStoreCatalogProducts({ id })
          this.setState({ notification: { status: true, message: 'Berhasil menghapus Barang', type: 'is-success' }, submitting: false, selectAllProduct: false, confirmDelete: false })
          break
        }
        case Status.OFFLINE :
        case Status.FAILED : {
          this.setState({ notification: { status: true, message: 'Gagal menghapus Barang', type: 'is-danger' }, submitting: false, selectAllProduct: false, confirmDelete: false })
          break
        }
        default:
          break
      }
      this.setState({ notification })
    }
  }

  render () {
    const { storeCatalogProducts, selectedProducts, selectAllProduct, notification, confirmDelete, submitting } = this.state
    const { products } = storeCatalogProducts.storeCatalogProducts
    return (
      <div>
        <Notification
          type={notification.type}
          isShow={notification.status}
          activeClose
          onClose={() => this.setState({notification: {status: false, message: ''}})}
          message={notification.message} />
        <section className='section is-paddingless'>
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
              storeCatalogProducts.isFound && products.map((product) => {
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
          <a className='button is-primary is-m-lg is-fullwidth btn-add-cart js-option'
            onClick={(e) => this.modalShowDelete(e)}> Hapus Barang Terpilih
          </a>
        </div>

        <div className='sort-option' style={{display: confirmDelete && 'block'}}>
          <div className='notif-report'>
            <h3>Anda yakin akan menghapus Barang terpilih?</h3>
            <button
              className={`button is-primary is-large is-fullwidth ${submitting && 'is-loading'}`}
              onClick={(e) => this.deleteProduct(e)}>Ya, Hapus Barang</button>
            <a className='cancel' onClick={(e) => this.modalShowDelete(e)}>Batal</a>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    storeCatalogProducts: state.storeCatalogProducts,
    alterProducts: state.alterProducts
  }
}

const mapDispatchToProps = dispatch => ({
  getStoreCatalogProducts: (params) => dispatch(storeActions.getStoreCatalogProducts(params)),
  deleteProducts: (params) => dispatch(productActions.deleteProducts(params))
})

export default connect(mapStateToProps, mapDispatchToProps)(ProductDeleteInCatalog)
