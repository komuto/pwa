// @flow
import React from 'react'
import { connect } from 'react-redux'
import NProgress from 'nprogress'
// components
import Router from 'next/router'
import { Navbar } from '../Navbar'
import Notification from '../../Components/Notification'
import Wizard from '../../Components/Wizard'
import MyImage from '../../Components/MyImage'
import Images from '../../Themes/Images'
// actions
import * as actionTypes from '../../actions/catalog'
import * as productActions from '../../actions/product'
import * as storesActions from '../../actions/stores'
// lib
import RupiahFormat from '../../Lib/RupiahFormat'
// themes

class CatalogAddProduct extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      id: props.query.id || null,
      productDetail: props.productDetail || null,
      storeProductDetail: props.storeProductDetail || null,
      listCatalog: props.listCatalog || null,
      validation: false,
      modalAddCatalog: false,
      selectedCatalog: null,
      confirmDelete: false,
      catalog: '',
      isEmptyProduct: { productDetail: false, storeProductDetail: false },
      isEmpty: false,
      notification: {
        status: false,
        color: 'is-success',
        message: 'Error, default message.'
      }
    }
    this.submiting = { addDropshipProducts: false, createCatalog: false, changeCatalog: false, deleteDropship: false }
    this.fetching = { productDetail: false, storeProductDetail: false, listCatalog: false }
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
    let errorMsg = {
      fontSize: '12px',
      letterSpacing: '0.2px',
      color: '#ef5656',
      display: validation ? 'block' : 'none'
    }
    return (
      <span style={errorMsg}>
        {result ? '' : textFailed}
      </span>
    )
  }

  postCatalog (e) {
    e.preventDefault()
    const { createCatalog } = this.props
    const { catalog } = this.state
    let isValid = catalog.length > 0
    if (isValid) {
      this.submiting = { ...this.submiting, createCatalog: true }
      createCatalog({ name: catalog })
    } else {
      this.setState({ validation: true })
    }
  }

  createProduct (e) {
    e.preventDefault()
    const { query, addDropshipProducts } = this.props
    const { selectedCatalog } = this.state
    let isValid = selectedCatalog !== null
    if (isValid) {
      this.submiting = { ...this.submiting, addDropshipProducts: true }
      addDropshipProducts({ id: query.id, catalog_id: selectedCatalog })
    } else {
      this.setState({ validation: true })
    }
  }

  changeCatalogProduct (e) {
    e.preventDefault()
    const { query, changeCatalogProducts } = this.props
    const { selectedCatalog } = this.state
    let isValid = selectedCatalog !== null
    if (isValid) {
      this.submiting = { ...this.submiting, changeCatalog: true }
      changeCatalogProducts({ catalog_id: selectedCatalog, product_ids: [query.id.split('.')[0]] })
    } else {
      this.setState({ validation: true })
    }
  }

  async componentDidMount () {
    const { id, listCatalog } = this.state
    const isDetailDropship = this.props.query.type === 'detailDropship'
    if (id) {
      NProgress.start()
      if (isDetailDropship) {
        this.fetching = { ...this.fetching, storeProductDetail: true }
        this.props.getStoreProductDetail({ id })
      } else {
        this.fetching = { ...this.fetching, productDetail: true }
        this.props.getProduct({ id })
      }
    }
    if (!listCatalog.isFound) {
      this.fetching = { ...this.fetching, listCatalog: true }
      this.props.getListCatalog()
    }
  }

  async componentWillReceiveProps (nextProps) {
    const { statusCreateCatalog, listCatalog, productDetail, storeProductDetail, statusAddDropshipProducts, alterProducts } = nextProps
    const { isFetching, isFound, isError, notifError, notifSuccess } = this.props

    if (!isFetching(productDetail) && this.fetching.productDetail) {
      NProgress.done()
      this.fetching = { ...this.fetching, productDetail: false }
      if (isFound(productDetail)) {
        let isEmpty = !isFound(productDetail)
        this.setState({ productDetail, isEmptyProduct: { ...this.state.isEmptyProduct, productDetail: isEmpty } })
      }
      if (isError(productDetail)) {
        this.setState({ notification: notifError(productDetail.message) })
      }
    }

    if (!isFetching(storeProductDetail) && this.fetching.storeProductDetail) {
      NProgress.done()
      this.fetching = { ...this.fetching, storeProductDetail: false }
      if (isFound(storeProductDetail)) {
        let isEmpty = !isFound(storeProductDetail)
        this.setState({ storeProductDetail, isEmptyProduct: { ...this.state.isEmptyProduct, storeProductDetail: isEmpty } })
      }
      if (isError(storeProductDetail)) {
        this.setState({ notification: notifError(storeProductDetail.message) })
      }
    }

    if (!isFetching(listCatalog) && this.fetching.listCatalog) {
      NProgress.done()
      this.fetching = { ...this.fetching, listCatalog: false }
      if (isFound(listCatalog)) {
        let isEmpty = listCatalog.catalogs.length < 1
        this.setState({ listCatalog, isEmpty })
      }
      if (isError(listCatalog)) {
        this.setState({ notification: notifError(listCatalog.message) })
      }
    }

    if (!isFetching(statusCreateCatalog) && this.submiting.createCatalog) {
      this.setState({ modalAddCatalog: false })
      this.submiting = { ...this.submiting, createCatalog: false }
      if (isFound(statusCreateCatalog)) {
        this.setState({ notification: notifSuccess(statusCreateCatalog.message) })
        this.fetching = { ...this.fetching, listCatalog: true }
        this.props.getListCatalog()
      }
      if (isError(statusCreateCatalog)) {
        this.setState({ notification: notifError(statusCreateCatalog.message) })
      }
    }

    if (!isFetching(statusAddDropshipProducts) && this.submiting.addDropshipProducts) {
      this.setState({ modalAddCatalog: false })
      this.submiting = { ...this.submiting, addDropshipProducts: false }
      if (isFound(statusAddDropshipProducts)) {
        Router.push('/product-add-success')
      }
      if (isError(statusAddDropshipProducts)) {
        this.setState({ notification: notifError(statusAddDropshipProducts.message) })
      }
    }

    if (!isFetching(alterProducts) && (this.submiting.changeCatalog || this.submiting.deleteDropship)) {
      this.submiting = { ...this.submiting, changeCatalog: false, deleteDropship: false }
      this.setState({ confirmDelete: false })
      if (isFound(alterProducts)) {
        this.setState({ notification: notifSuccess(alterProducts.message) })
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

  renderProductDetail () {
    const { productDetail, storeProductDetail, isEmptyProduct } = this.state
    const isDetailDropship = this.props.query.type === 'detailDropship'
    if (productDetail.isFound || storeProductDetail.isFound) {
      let price = isDetailDropship ? storeProductDetail.storeProductDetail.product.price : productDetail.detail.product.price
      if (isEmptyProduct.productDetail || isEmptyProduct.storeProductDetail) {
        return (
          <ProductEmpty />
        )
      } else {
        return (
          <li>
            <div className='box is-paddingless'>
              <article className='media'>
                <div className='media-left'>
                  <figure className='image product-pict img-catalog'>
                    <MyImage src={isDetailDropship ? storeProductDetail.storeProductDetail.images[0].file : productDetail.detail.images[0].file} alt='pict' />
                  </figure>
                </div>
                <div className='media-content'>
                  <div className='content'>
                    <p className='products-name'>
                      <strong>{isDetailDropship ? storeProductDetail.storeProductDetail.product.name : productDetail.detail.product.name}</strong>
                      <br />
                      Rp { RupiahFormat(price)} <span>- Komisi {this.props.query.commission }%</span>
                    </p>
                  </div>
                </div>
              </article>
            </div>
          </li>
        )
      }
    }
  }

  handleSelectedCatalog (e, id) {
    e.preventDefault()
    this.setState({ selectedCatalog: id })
  }

  renderListCatalog () {
    const { listCatalog, selectedCatalog, isEmpty } = this.state
    if (!isEmpty) {
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
      return <CatalogEmpty />
    }
  }

  handleButton () {
    const { query } = this.props
    if (query.type === 'detailDropship') {
      return (
        <a className={`button is-primary is-large is-fullwidth ${this.submiting.changeCatalog && 'is-loading'}`}
          onClick={(e) => this.changeCatalogProduct(e)} >Simpan Perubahan</a>
      )
    } else {
      return (
        <a className={`button is-primary is-large is-fullwidth ${this.submiting.addDropshipProducts && 'is-loading'}`}
          onClick={(e) => this.createProduct(e)} >Lanjutkan</a>
      )
    }
  }

  deleteDropship () {
    this.setState({ confirmDelete: !this.state.confirmDelete })
  }

  deleteProductDropship () {
    this.submiting = { ...this.submiting, deleteDropship: true }
    this.props.deleteDropship({ product_ids: [this.state.id] })
  }

  render () {
    const { catalog, modalAddCatalog, validation, notification, confirmDelete } = this.state
    const isDetailDropship = this.props.query.type === 'detailDropship'
    const params = {
      navbar: {
        searchBoox: false,
        path: '/',
        callBack: () => isDetailDropship ? Router.back() : Router.push('/dropship'),
        textPath: isDetailDropship ? 'Detail Barang Dropshipper' : 'Tempatkan di Katalog'
      },
      deleteButton: isDetailDropship,
      deleteDropship: () => this.deleteDropship()
    }
    return (
      <div>
        <Navbar {...params} />
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
            <button className={`button is-primary is-large is-fullwidth ${this.submiting.createCatalog && 'is-loading'}`}
              onClick={(e) => this.postCatalog(e)}
              >Buat Katalog Baru
            </button>
          </div>
        </div>

        <div className='sort-option' style={{display: confirmDelete && 'block'}}>
          <div className='notif-report'>
            <h3>Anda yakin akan menghapus Barang ini?</h3>
            <button
              className={`button is-primary is-large is-fullwidth ${this.submiting.deleteDropship && 'is-loading'}`}
              onClick={(e) => this.deleteProductDropship(e)}>Ya, Hapus Barang</button>
            <a className='cancel' onClick={(e) => this.setState({ confirmDelete: false })}>Batal</a>
          </div>
        </div>
      </div>
    )
  }
}

/** orders empty content */
const CatalogEmpty = () => {
  return (
    <section className='content'>
      <div className='container is-fluid'>
        <div className='desc has-text-centered'>
          <MyImage src={Images.emptyKatalog} alt='notFound' />
          <p><strong>Katalog kosong</strong></p>
          <p>Silahkan tambah katalog baru</p>
        </div>
      </div>
    </section>
  )
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
    listCatalog: state.getListCatalog,
    statusCreateCatalog: state.createCatalog,
    storeProductDetail: state.storeProductDetail,
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
  getStoreProductDetail: (params) => dispatch(storesActions.getStoreProductDetail(params)),
  getProduct: (params) => dispatch(productActions.getProduct(params)),
  deleteDropship: (params) => dispatch(productActions.deleteDropship(params))
})

export default connect(mapStateToProps, mapDispatchToProps)(CatalogAddProduct)
