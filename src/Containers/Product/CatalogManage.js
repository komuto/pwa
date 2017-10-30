// @flow
import React from 'react'
import { connect } from 'react-redux'
import NProgress from 'nprogress'
// components
import MyImage from '../../Components/MyImage'
import Notification from '../../Components/Notification'
import Router from 'next/router'
// actions
import * as actionTypes from '../../actions/catalog'
import * as productActions from '../../actions/product'

class ProductCatalogManage extends React.Component {
  constructor (props) {
    super(props)
    const isFound = props.productDetail.isFound
    this.state = {
      id: props.query.id || null,
      productDetail: props.productDetail || null,
      listCatalog: props.listCatalog || null,
      validation: false,
      modalAddCatalog: false,
      selectedCatalog: isFound ? props.productDetail.detail.product.catalog_id : null,
      catalog: '',
      notification: {
        type: 'is-success',
        status: false,
        message: 'Error, default message.'
      }
    }
    this.fetchingFirst = { productDetail: false, listCatalog: false }
    this.submiting = { createCatalog: false, changeCatalogProducts: false }
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
      createCatalog({ name: catalog })
      this.submiting = { ...this.submiting, createCatalog: true }
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
      this.submiting = { ...this.submiting, changeCatalogProducts: true }
      changeCatalogProducts({ catalog_id: selectedCatalog, product_ids: [query.id.split('.')[0]] })
    } else {
      this.setState({ validation: true })
    }
  }

  async componentDidMount () {
    const { id, listCatalog } = this.state
    if (id) {
      NProgress.start()
      await this.props.getProduct({ id })
      this.fetchingFirst = { ...this.fetchingFirst, productDetail: true }
    }
    if (!listCatalog.isFound) {
      NProgress.start()
      this.fetchingFirst = { ...this.fetchingFirst, listCatalog: true }
      this.props.getListCatalog()
    }
  }

  async componentWillReceiveProps (nextProps) {
    const { statusCreateCatalog, listCatalog, productDetail, alterProducts } = nextProps
    const { isFetching, isFound, isError, notifError, notifSuccess } = this.props
    const nextId = nextProps.query.id

    if (!isFetching(productDetail) && this.fetchingFirst.productDetail) {
      NProgress.done()
      this.fetchingFirst = { ...this.fetchingFirst, productDetail: false }
      if (isFound(productDetail)) {
        this.setState({ productDetail: productDetail, selectCatalog: productDetail.detail.product.catalog_id })
        if (String(productDetail.detail.product.id) !== String(nextId)) {
          NProgress.start()
          this.fetchingFirst = true
          await this.props.getProduct({ id: nextId })
        }
      }
      if (isError(productDetail)) {
        this.setState({ notification: notifError(productDetail.message) })
      }
    }

    if (!isFetching(listCatalog) && this.fetchingFirst.listCatalog) {
      NProgress.done()
      this.fetchingFirst = { ...this.fetchingFirst, listCatalog: false }
      if (isFound(listCatalog)) {
        this.setState({ listCatalog })
      }
      if (isError(listCatalog)) {
        this.setState({ notification: notifError(listCatalog.message) })
      }
    }
    if (!isFetching(statusCreateCatalog) && this.submiting.createCatalog) {
      this.submiting = { ...this.submiting, createCatalog: false }
      if (isFound(statusCreateCatalog)) {
        let stateCatalog = this.state.listCatalog
        stateCatalog.catalogs.push(statusCreateCatalog.catalog)
        this.setState({ listCatalog: stateCatalog, modalAddCatalog: false, notification: notifSuccess(statusCreateCatalog.message) })
      }
      if (isError(statusCreateCatalog)) {
        this.setState({ notification: notifError(statusCreateCatalog.message) })
      }
    }
    if (!isFetching(alterProducts) && this.submiting.changeCatalogProducts) {
      this.submiting = { ...this.submiting, changeCatalogProducts: false }
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
    const { productDetail } = this.state
    if (productDetail.isFound) {
      return (
        <li>
          <div className='box is-paddingless'>
            <article className='media'>
              <div className='media-left is-bordered'>
                <figure className='image'>
                  <MyImage src={productDetail.detail.images[0].file} alt='pict' />
                </figure>
              </div>
              <div className='media-content middle'>
                <div className='content'>
                  <p className='products-name'>
                    <strong>{productDetail.detail.product.name}</strong>
                  </p>
                </div>
              </div>
            </article>
          </div>
        </li>
      )
    } else {
      return (
        <p style={{textAlign: 'center', paddingTop: '20px'}}>Product Tidak ada</p>
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

  render () {
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
                <a className={`button is-primary is-large is-fullwidth ${this.submiting.changeCatalogProducts && 'is-loading'}`}
                  onClick={(e) => this.changeCatalogProduct(e)} >Simpan Perubahan</a>
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
    productDetail: state.productDetail,
    alterProducts: state.alterProducts
  }
}

const mapDispatchToProps = dispatch => ({
  getListCatalog: () => dispatch(actionTypes.getListCatalog()),
  createCatalog: (params) => dispatch(actionTypes.createCatalog(params)),
  changeCatalogProducts: (params) => dispatch(productActions.changeCatalogProducts(params)),
  getProduct: (params) => dispatch(productActions.getProduct(params))
})

export default connect(mapStateToProps, mapDispatchToProps)(ProductCatalogManage)
