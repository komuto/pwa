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
import * as storesActions from '../../actions/stores'
// lib
import RupiahFormat from '../../Lib/RupiahFormat'
// themes

class CatalogAddProduct extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      id: props.query.id || null,
      storeProductDetail: props.storeProductDetail || null,
      listCatalog: props.listCatalog,
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
    this.submiting = { addDropshipProducts: false, createCatalog: false, changeCatalog: false }
    this.fetching = { fetchingFirst: false, listCatalog: false }
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
    const { selectedCatalog, submiting } = this.state
    let isValid = selectedCatalog !== null
    if (isValid) {
      this.setState({ submiting: { ...submiting, addDropshipProducts: true } })
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
    if (id) {
      NProgress.start()
      this.fetching = { ...this.fetching, fetchingFirst: true }
      this.props.getStoreProductDetail({ id })
    }
    if (!listCatalog.isFound) {
      this.fetching = { ...this.fetching, listCatalog: true }
      this.props.getListCatalog()
    }
  }

  async componentWillReceiveProps (nextProps) {
    const { statusCreateCatalog, listCatalog, storeProductDetail, statusAddDropshipProducts, alterProducts } = nextProps
    const { isFetching, isFound, isError, notifError, notifSuccess } = this.props

    if (!isFetching(storeProductDetail) && this.fetching.fetchingFirst) {
      NProgress.done()
      this.fetching = { ...this.fetching, fetchingFirst: false }
      if (isFound(storeProductDetail)) {
        this.setState({ storeProductDetail })
      }
      if (isError(storeProductDetail)) {
        this.setState({ notification: notifError(storeProductDetail.message) })
      }
    }

    if (!isFetching(listCatalog) && this.fetching.listCatalog) {
      NProgress.done()
      this.fetching = { ...this.fetching, listCatalog: false }
      if (isFound(listCatalog)) {
        this.setState({ listCatalog })
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

    if (!isFetching(alterProducts) && this.submiting.changeCatalog) {
      this.submiting = { ...this.submiting, changeCatalog: false }
      if (isFound(alterProducts)) {
        this.setState({ notification: notifSuccess(alterProducts.message) })
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

  renderProductDetail () {
    const { storeProductDetail } = this.state
    if (storeProductDetail.isFound) {
      return (
        <li>
          <div className='box is-paddingless'>
            <article className='media'>
              <div className='media-left'>
                <figure className='image user-pict'>
                  <MyImage src={storeProductDetail.storeProductDetail.images[0].file} alt='pict' />
                </figure>
              </div>
              <div className='media-content'>
                <div className='content'>
                  <p className='products-name'>
                    <strong>{storeProductDetail.storeProductDetail.product.name}</strong>
                    <br />
                    Rp { RupiahFormat(storeProductDetail.storeProductDetail.product.price)} <span>- Komisi {this.props.query.commission * 100}%</span>
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

  render () {
    console.log('state', this.state)
    const { catalog, modalAddCatalog, validation, notification } = this.state
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
            <button className={`button is-primary is-large is-fullwidth ${this.submiting.createCatalog && 'is-loading'}`}
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
    storeProductDetail: state.storeProductDetail,
    alterProducts: state.alterProducts,
    statusAddDropshipProducts: state.addDropshipProducts
  }
}

const mapDispatchToProps = dispatch => ({
  getListCatalog: () => dispatch(actionTypes.getListCatalog()),
  createCatalog: (params) => dispatch(actionTypes.createCatalog(params)),
  addDropshipProducts: (params) => dispatch(productActions.addDropshipProducts(params)),
  changeCatalogProducts: (params) => dispatch(productActions.changeCatalogProducts(params)),
  getStoreProductDetail: (params) => dispatch(storesActions.getStoreProductDetail(params))
})

export default connect(mapStateToProps, mapDispatchToProps)(CatalogAddProduct)
