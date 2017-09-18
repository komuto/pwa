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
      storeProductsByCatalog: props.storeProductsByCatalog || null,
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
    NProgress.start()
    this.props.getStoreProductsByCatalog({ id, hidden: false })
  }

  componentWillReceiveProps (nextProps) {
    const { storeProductsByCatalog, alterProducts } = nextProps
    const { notification, submitting, selectedProducts } = this.state
    if (!isFetching(storeProductsByCatalog)) {
      NProgress.done()
      this.setState({ storeProductsByCatalog, notification: validateResponse(storeProductsByCatalog, 'Data katalog tidak ditemukan!') })
    }
    if (!alterProducts.isLoading && submitting) {
      switch (alterProducts.status) {
        case Status.SUCCESS: {
          let newData = storeProductsByCatalog.products.filter(data => selectedProducts.indexOf(data.id) < 0)
          let newListProduct = {
            ...storeProductsByCatalog, products: newData
          }
          const newNotification = { storeProductsByCatalog: newListProduct, notification, submitting: false, selectAllProduct: false, confirmDelete: false }
          newNotification.notification['status'] = true
          newNotification.notification['message'] = 'Berhasil menghapus Barang'
          newNotification.notification['type'] = 'is-success'
          this.setState(newNotification)
          break
        }
        case Status.OFFLINE :
        case Status.FAILED : {
          const newNotif = { notification, submitting: false, selectAllProduct: false, confirmDelete: false }
          newNotif.notification['status'] = true
          newNotif.notification['message'] = 'Gagal menghapus Barang'
          newNotif.notification['type'] = 'is-danger'
          this.setState(newNotif)
          break
        }
        default:
          break
      }
      this.setState({ notification })
    }
  }

  render () {
    const { storeProductsByCatalog, selectedProducts, selectAllProduct, notification, confirmDelete, submitting } = this.state
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
            <div className='filter-option active'>
              <div className='sort-list check-all top bg-grey'>
                <label className='checkbox' onClick={(e) => this.handleSelectAll(e)}>
                  <span className='sort-text'>Pilih Semua Produk</span>
                  <span className={`input-wrapper ${selectAllProduct && 'checked'}`}>
                    <input type='checkbox' />
                  </span>
                </label>
              </div>
              { products.map((product) => {
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
        </div>
        : <p style={{textAlign: 'center', paddingTop: '20px'}}>Tidak ada barang di katalog ini</p>
        }

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
    storeProductsByCatalog: state.storeProductsByCatalog,
    alterProducts: state.alterProducts
  }
}

const mapDispatchToProps = dispatch => ({
  getStoreProductsByCatalog: (params) => dispatch(storeActions.getStoreProductsByCatalog(params)),
  deleteProducts: (params) => dispatch(productActions.deleteProducts(params))
})

export default connect(mapStateToProps, mapDispatchToProps)(ProductDeleteInCatalog)
