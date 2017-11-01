// @flow
import React from 'react'
import { connect } from 'react-redux'
import NProgress from 'nprogress'
// components
import Router from 'next/router'
import Notification from '../../Components/Notification'
import Wizard from '../../Components/Wizard'
import MyImage from '../../Components/MyImage'
// actions
import * as actionTypes from '../../actions/catalog'
import * as productActions from '../../actions/product'
// services
import { validateResponse, isFetching, Status } from '../../Services/Status'
// lib
import RupiahFormat from '../../Lib/RupiahFormat'
// themes

class CatalogAddProduct extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      id: props.query.id || null,
      productDetail: props.productDetail || null,
      listCatalog: props.listCatalog,
      submitting: {
        submitProduct: false,
        submitCatalog: false,
        submitChangeCatalog: false
      },
      validation: false,
      modalAddCatalog: false,
      selectedCatalog: null,
      catalog: '',
      notification: {
        status: false,
        color: 'is-success',
        message: 'Error, default message.'
      }
    }
  }

  handleInput (e) {
    const { value } = e.target
    let { catalog } = this.state
    const newState = { catalog }
    newState.catalog = value
    this.setState(newState)
  }

  renderValidation (name, textFailed) {
    const { selectedCatalog, catalog, validation } = this.state
    let catalogValid = name === 'catalog' && catalog.length > 0
    let selectedCatalogValid = name === 'selectCatalog' && selectedCatalog !== null
    let result = catalogValid || selectedCatalogValid
    return (
      <span style={{color: result ? '#23d160' : '#ef5656',
        display: validation ? 'block' : 'none',
        letterSpacing: '0.2px'}} >
        {!result && textFailed}
      </span>
    )
  }

  postCatalog (e) {
    e.preventDefault()
    const { createCatalog } = this.props
    const { catalog, submitting } = this.state
    let isValid = catalog.length > 0
    if (isValid) {
      createCatalog({ name: catalog })
      this.setState({ submitting: { ...submitting, submitCatalog: true } })
    } else {
      this.setState({ validation: true })
    }
  }

  createProduct (e) {
    e.preventDefault()
    const { query, addDropshipProducts } = this.props
    const { selectedCatalog, submitting } = this.state
    let isValid = selectedCatalog !== null
    if (isValid) {
      this.setState({ submitting: { ...submitting, submitProduct: true } })
      addDropshipProducts({ id: query.id, catalog_id: selectedCatalog })
    } else {
      this.setState({ validation: true })
    }
  }

  changeCatalogProduct (e) {
    e.preventDefault()
    const { query, changeCatalogProducts } = this.props
    const { selectedCatalog, submitting } = this.state
    let isValid = selectedCatalog !== null
    if (isValid) {
      this.setState({ submitting: { ...submitting, submitChangeCatalog: true } })
      changeCatalogProducts({ catalog_id: selectedCatalog, product_ids: [query.id.split('.')[0]] })
    } else {
      this.setState({ validation: true })
    }
  }

  async componentDidMount () {
    const { id, productDetail, listCatalog } = this.state
    if (!productDetail.isFound || (productDetail.isFound && String(productDetail.detail.product.id) !== String(id))) {
      NProgress.start()
      await this.props.getProduct({ id })
    }
    if (!listCatalog.isFound) {
      this.props.getListCatalog()
    }
  }

  async componentWillReceiveProps (nextProps) {
    const { submitting, notification } = this.state
    const { statusCreateCatalog, listCatalog, productDetail, statusAddDropshipProducts, alterProducts } = nextProps
    const nextId = nextProps.query.id

    if (!productDetail.isLoading) {
      NProgress.done()
      switch (productDetail.status) {
        case Status.SUCCESS :
          (productDetail.isFound)
          ? this.setState({ productDetail })
          : this.setState({ notification: {status: true, message: 'Data produk tidak ditemukan'} })

          if (String(productDetail.detail.product.id) !== String(nextId)) {
            NProgress.start()
            await this.props.getProduct({ id: nextId })
          }

          break
        case Status.OFFLINE :
        case Status.FAILED :
          this.setState({ notification: {status: true, message: productDetail.message} })
          break
        default:
          break
      }
    }
    if (!isFetching(listCatalog)) {
      this.setState({ listCatalog, notification: validateResponse(listCatalog, 'Daftar katalog tidak ditemukan') })
    }
    if (!statusCreateCatalog.isLoading && submitting.submitCatalog) {
      switch (statusCreateCatalog.status) {
        case Status.SUCCESS: {
          const newNotification = { notification, submitting, modalAddCatalog: false }
          newNotification.notification['status'] = true
          newNotification.notification['message'] = 'Berhasil menambahkan katalog'
          newNotification.notification['type'] = 'is-success'
          newNotification.submitting['submitCatalog'] = false
          this.setState(newNotification)
          this.props.getListCatalog()
          break
        }
        case Status.OFFLINE :
        case Status.FAILED : {
          const newNotif = { notification, submitting, modalAddCatalog: false }
          newNotif.notification['status'] = true
          newNotif.notification['message'] = 'Gagal menambahkan katalog'
          newNotif.notification['type'] = 'is-danger'
          newNotif.submitting['submitCatalog'] = false
          this.setState(newNotif)
          break
        }
        default:
          break
      }
      this.setState({ notification })
    }
    if (!statusAddDropshipProducts.isLoading && submitting.submitProduct) {
      switch (statusAddDropshipProducts.status) {
        case Status.SUCCESS: {
          this.setState({ submitting: { ...submitting, submitProduct: false } })
          Router.push('/product-add-success')
          break
        }
        case Status.OFFLINE :
        case Status.FAILED : {
          this.setState({ notification: {status: true, message: statusAddDropshipProducts.message, type: 'is-danger'}, submitting: { ...submitting, submitCatalog: false } })
          break
        }
        default:
          break
      }
      this.setState({ notification })
    }
    if (!alterProducts.isLoading && submitting.submitChangeCatalog) {
      switch (alterProducts.status) {
        case Status.SUCCESS: {
          const newNotification = { notification, submitting }
          newNotification.notification['status'] = true
          newNotification.notification['message'] = 'Berhasil memindahkan Barang'
          newNotification.notification['type'] = 'is-success'
          newNotification.submitting['submitChangeCatalog'] = false
          this.setState(newNotification)
          break
        }
        case Status.OFFLINE :
        case Status.FAILED : {
          const newNotif = { notification, submitting }
          newNotif.notification['status'] = true
          newNotif.notification['message'] = 'Gagal memindahkan Barang'
          newNotif.notification['type'] = 'is-danger'
          newNotif.submitting['submitChangeCatalog'] = false
          this.setState(newNotif)
          break
        }
        default:
          break
      }
      this.setState({ notification })
    }
  }

  renderProductDetail () {
    const { productDetail } = this.state
    if (productDetail.isFound) {
      return (
        <li>
          <div className='box is-paddingless'>
            <article className='media'>
              <div className='media-left'>
                <figure className='image user-pict'>
                  <MyImage src={productDetail.detail.images[0].file} alt='pict' />
                </figure>
              </div>
              <div className='media-content'>
                <div className='content'>
                  <p className='products-name'>
                    <strong>{productDetail.detail.product.name}</strong>
                    <br />
                    Rp { RupiahFormat(productDetail.detail.product.price)} <span>- Komisi {this.props.query.commission * 100}%</span>
                  </p>
                </div>
              </div>
            </article>
          </div>
        </li>
      )
    } else {
      return (
        <div style={{textAlign: 'center', paddingTop: '20px'}}>Product Tidak ada</div>
      )
    }
  }

  handleSelectedCatalog (e, id) {
    e.preventDefault()
    this.setState({ selectedCatalog: id })
  }

  renderListCatalog () {
    const { listCatalog, selectedCatalog } = this.state
    if (listCatalog.isFound && listCatalog.catalogs.length > 0) {
      return listCatalog.catalogs.map((catalog, i) => {
        return (
          <label
            className={`radio ${selectedCatalog === catalog.id && 'checked'}`}
            key={i}>
            <input
              type='radio'
              name='report'
              onClick={(e) => this.handleSelectedCatalog(e, catalog.id)} />
            {catalog.name}
          </label>
        )
      })
    } else {
      return (<p style={{textAlign: 'center', paddingTop: '20px'}}>Katalog Kosong</p>)
    }
  }

  handleButton () {
    const { submitting } = this.state
    const { query } = this.props
    if (query.type === 'detailDropship') {
      return (
        <a className={`button is-primary is-large is-fullwidth ${submitting.submitChangeCatalog && 'is-loading'}`}
          onClick={(e) => this.changeCatalogProduct(e)} >Simpan Perubahan</a>
      )
    } else {
      return (
        <a className={`button is-primary is-large is-fullwidth ${submitting.submitProduct && 'is-loading'}`}
          onClick={(e) => this.createProduct(e)} >Lanjutkan</a>
      )
    }
  }

  render () {
    const { catalog, modalAddCatalog, validation, notification, submitting } = this.state
    return (
      <div>
        <Notification
          type={notification.type}
          isShow={notification.status}
          activeClose
          onClose={() => this.setState({notification: {status: false, message: ''}})}
          message={notification.message} />
        <section className='section is-paddingless has-shadow bg-white'>
          { this.props.query.type === 'detailDropship' ? '' : <Wizard total={3} active={2} /> }
          <ul className='product-view'>
            {this.renderProductDetail()}
          </ul>
        </section>
        <section className='section is-paddingless has-shadow'>
          <div className='container is-fluid'>
            <div className='title'>
              <h3>Pilih Katalog yang sesuai dengan produk Anda</h3>
            </div>
          </div>
          <div className='catalog-option'>
            <a className='add-catalog js-option'
              onClick={() => this.setState({ modalAddCatalog: true })}>+ Buat Katalog Baru
            </a>
            <div className='add-discussion report'>
              <div className='field'>
                <form action='#' className='form'>
                  <div className='field'>
                    <div className='control'>
                      { this.renderListCatalog() }
                    </div>
                    {validation && this.renderValidation('selectCatalog', 'Mohon pilih katalog yang sesuai dengan produk Anda')}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
        <section className='section is-paddingless'>
          <div className='payment-detail action'>
            <ul>
              <li>
                {this.handleButton()}
              </li>
            </ul>
          </div>
        </section>
        <div className='sort-option' style={{ display: modalAddCatalog && 'block' }}>
          <div className='notif-report add-voucher'>
            <div className='header-notif'>
              <h3>Buat Katalog Baru</h3>
              <span className='icon-close' onClick={() => this.setState({ modalAddCatalog: false })} />
            </div>
            <div className='field'>
              <p className='control'>
                <input className='input'
                  type='text'
                  placeholder='Masukkan nama katalog'
                  value={catalog}
                  onChange={(e) => this.handleInput(e)} />
              </p>
              {validation && this.renderValidation('catalog', 'Mohon isi nama katalog')}
            </div>
            <button className={`button is-primary is-large is-fullwidth ${submitting.submitCatalog && 'is-loading'}`}
              onClick={(e) => this.postCatalog(e)}
              >Buat Katalog Baru
            </button>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    listCatalog: state.getListCatalog,
    statusCreateCatalog: state.createCatalog,
    productDetail: state.productDetail,
    alterProducts: state.alterProducts,
    statusAddDropshipProducts: state.addDropshipProducts
  }
}

const mapDispatchToProps = dispatch => ({
  getListCatalog: () => dispatch(actionTypes.getListCatalog()),
  createCatalog: (params) => dispatch(actionTypes.createCatalog(params)),
  addDropshipProducts: (params) => dispatch(productActions.addDropshipProducts(params)),
  changeCatalogProducts: (params) => dispatch(productActions.changeCatalogProducts(params)),
  getProduct: (params) => dispatch(productActions.getProduct(params))
})

export default connect(mapStateToProps, mapDispatchToProps)(CatalogAddProduct)
