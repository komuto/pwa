// @flow
import React from 'react'
import { connect } from 'react-redux'
import NProgress from 'nprogress'
// components
import Router from 'next/router'
import Wizard from '../Components/Wizard'
// actions
import * as actionTypes from '../actions/catalog'
import * as productActions from '../actions/product'
// services
import { Status } from '../Services/Status'
// lib
import RupiahFormat from '../Lib/RupiahFormat'
// themes

class CatalogAddProduct extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      productDetail: props.productDetail,
      listCatalog: props.listCatalog,
      submitting: false,
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

  handleNotification (e) {
    const { notification } = this.state
    const newState = { notification }
    newState.notification['status'] = !notification.status
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
      this.setState({ submitting: true })
    } else {
      this.setState({ validation: true })
    }
  }

  createProduct (e) {
    const { query, addDropshipProducts } = this.props
    const { selectedCatalog } = this.state
    let isValid = selectedCatalog !== null
    if (isValid) {
      this.setState({ submitting: true })
      addDropshipProducts({ id: query.id, catalog_id: selectedCatalog })
    } else {
      this.setState({ validation: true })
    }
  }

  componentDidMount () {
    const { query } = this.props
    this.props.getListCatalog()
    if (query.id !== '') {
      this.props.getProduct({ id: query.id })
    }
    NProgress.start()
  }

  componentWillReceiveProps (nextProps) {
    const { statusCreateCatalog, listCatalog, productDetail, statusAddDropshipProducts } = nextProps
    const { submitting, notification } = this.state
    if (listCatalog.isFound) {
      this.setState({ listCatalog: nextProps.listCatalog })
      NProgress.done()
    }
    if (productDetail.isFound) {
      this.setState({ productDetail: nextProps.productDetail })
    }
    if (!statusCreateCatalog.isLoading && submitting) {
      switch (statusCreateCatalog.status) {
        case Status.SUCCESS: {
          const newNotification = { notification, submitting: false, modalAddCatalog: false }
          newNotification.notification['status'] = true
          newNotification.notification['message'] = statusCreateCatalog.message
          newNotification.notification['color'] = 'is-success'
          this.setState(newNotification)
          this.props.getListCatalog()
          break
        }
        case Status.OFFLINE :
        case Status.FAILED : {
          const newNotif = { notification, submitting: false }
          newNotif.notification['status'] = true
          newNotif.notification['message'] = statusCreateCatalog.message
          newNotif.notification['color'] = 'is-danger'
          this.setState(newNotif)
          break
        }
        default:
          break
      }
      this.setState({ notification })
    }
    if (!statusAddDropshipProducts.isLoading && submitting) {
      switch (statusAddDropshipProducts.status) {
        case Status.SUCCESS: {
          this.setState({ submitting: false })
          Router.push('/product-add-success')
          break
        }
        case Status.OFFLINE :
        case Status.FAILED : {
          const newNotif = { notification, submitting: false }
          newNotif.notification['status'] = true
          newNotif.notification['message'] = statusAddDropshipProducts.message
          newNotif.notification['color'] = 'is-danger'
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
    const { productDetail, listCatalog, catalog, selectedCatalog, modalAddCatalog, validation, notification, submitting } = this.state
    return (
      <div>
        <div
          className={`notification ${notification.status && notification.color}`}
          style={{display: notification.status ? 'block' : 'none'}}>
          <button className='delete' onClick={(e) => this.handleNotification(e)} />
          {notification.message}
        </div>
        <section className='section is-paddingless has-shadow bg-white'>
          <Wizard total={3} active={2} />
          <ul className='product-view'>
            { !productDetail.isFound ? <p>Product Tidak ada</p> : <li>
              <div className='box is-paddingless'>
                <article className='media'>
                  <div className='media-left'>
                    <figure className='image product-pict'>
                      <img src={productDetail.detail.images[0].file}
                        style={{width: '50px', height: '50px'}} alt='pict' />
                    </figure>
                  </div>
                  <div className='media-content'>
                    <div className='content'>
                      <p className='products-name'>
                        <strong>{productDetail.detail.product.name}</strong>
                        <br />
                        Rp { RupiahFormat(productDetail.detail.product.price)} <span>- Komisi {this.props.query.commission}%</span>
                      </p>
                    </div>
                  </div>
                </article>
              </div>
            </li>}
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
                    <p className='control'>
                      { listCatalog.catalogs.length !== 0 ? listCatalog.catalogs.map(catalog => {
                        return (
                          <label
                            className={`radio ${selectedCatalog === catalog.id && 'checked'}`}
                            key={catalog.id}>
                            <input
                              type='radio'
                              name='report'
                              onClick={() => this.setState({ selectedCatalog: catalog.id })} />
                            {catalog.name}
                          </label>
                        )
                      }) : <p style={{textAlign: 'center', paddingTop: '20px'}}>
                        Katalog Kosong</p>
                      }
                    </p>
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
                <a className={`button is-primary is-large is-fullwidth ${submitting && 'is-loading'}`}
                  onClick={(e) => this.createProduct(e)} >Lanjutkan</a>
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
            <button className={`button is-primary is-large is-fullwidth ${submitting && 'is-loading'}`}
              onClick={(e) => this.postCatalog(e)}
              >Buat Katalog Baru
            </button>
          </div>
        </div>
      </div>
    )
  }
}

// const EmptyProduct = () => {
//   return (
//     <section className='content'>
//       <div className='container is-fluid'>
//         <div className='desc has-text-centered'>
//           <MyImage src={Images.notFound} alt='komuto' />
//           <p><strong>Produk tidak ditemukan</strong></p>
//           <p>Kami tidak bisa menemukan barang yang anda inginkan</p>
//         </div>
//       </div>
//     </section>
//   )
// }

const mapStateToProps = (state) => {
  return {
    listCatalog: state.getListCatalog,
    statusCreateCatalog: state.createCatalog,
    productDetail: state.productDetail,
    statusAddDropshipProducts: state.addDropshipProducts
  }
}

const mapDispatchToProps = dispatch => ({
  getListCatalog: () => dispatch(actionTypes.getListCatalog()),
  createCatalog: (params) => dispatch(actionTypes.createCatalog(params)),
  addDropshipProducts: (params) => dispatch(productActions.addDropshipProducts(params)),
  getProduct: (params) => dispatch(productActions.getProduct(params))
})

export default connect(mapStateToProps, mapDispatchToProps)(CatalogAddProduct)
