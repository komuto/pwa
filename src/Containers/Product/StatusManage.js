// @flow
import React from 'react'
import { connect } from 'react-redux'
import NProgress from 'nprogress'
import Router from 'next/router'
// components
import Notification from '../../Components/Notification'
import MyImage from '../../Components/MyImage'
// actions
import * as productActions from '../../actions/product'
import * as storesActions from '../../actions/stores'

class ProductStatus extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      id: props.query.id || null,
      storeProductDetail: props.storeProductDetail || null,
      statusChecked: props.storeProductDetail.isFound ? props.storeProductDetail.storeProductDetail.product.status : false,
      notification: {
        type: 'is-success',
        status: false,
        message: 'Error, default message.'
      }
    }
    this.fetchingFirst = false
    this.submiting = false
  }

  updateStatus (e, id) {
    e.preventDefault()
    this.submiting = true
    this.props.updateProduct({ status: this.state.statusChecked, id: this.state.id })
  }

  async componentDidMount () {
    const { id } = this.state
    if (id) {
      NProgress.start()
      await this.props.getStoreProductDetail({ id })
      this.fetchingFirst = true
    }
  }

  async componentWillReceiveProps (nextProps) {
    const { alterProducts, storeProductDetail } = nextProps
    const { isFetching, isFound, isError, notifError, notifSuccess } = this.props

    if (!isFetching(storeProductDetail) && this.fetchingFirst) {
      NProgress.done()
      this.fetchingFirst = false
      if (isFound(storeProductDetail)) {
        this.setState({ storeProductDetail: storeProductDetail, statusChecked: storeProductDetail.storeProductDetail.product.status })
      }
      if (isError(storeProductDetail)) {
        this.setState({ notification: notifError(storeProductDetail.message) })
      }
    }
    if (!isFetching(alterProducts) && this.submiting) {
      this.submiting = false
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
    const { storeProductDetail } = this.state
    if (storeProductDetail.isFound) {
      return (
        <li>
          <div className='box is-paddingless'>
            <article className='media'>
              <div className='media-left is-bordered'>
                <figure className='image'>
                  <MyImage src={storeProductDetail.storeProductDetail.images[0].file} alt='pict' />
                </figure>
              </div>
              <div className='media-content middle'>
                <div className='content'>
                  <p className='products-name'>
                    <strong>{storeProductDetail.storeProductDetail.product.name}</strong>
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

  renderStatusInput () {
    const { storeProductDetail, statusChecked } = this.state
    if (storeProductDetail.isFound) {
      return (
        <div>
          <label className={`radio ${statusChecked === 1 && 'checked'}`}>
            <input type='radio' name='status'
              onClick={() => this.setState({ statusChecked: 1 })} />
            Ditampilkan di Toko
          </label>
          <label className={`radio ${statusChecked === 0 && 'checked'}`}>
            <input type='radio' name='status'
              onClick={() => this.setState({ statusChecked: 0 })} />
            Disembunyikan
          </label>
          <p style={{paddingTop: '10px', marginLeft: '33px', color: '#404852', fontSize: '13px'}}>Barang yang disembunyikan tidak akan muncul di toko Anda. Barang Anda yang terbuka untuk dropshipping tetap dapat di dropship oleh toko lain dan tetap bisa dijual seperti biasa oleh toko lain.</p>
        </div>
      )
    }
  }

  render () {
    const { notification } = this.state
    return (
      <div>
        <Notification
          type={notification.type}
          isShow={notification.status}
          activeClose
          onClose={() => this.setState({notification: {status: false, message: ''}})}
          message={notification.message} />
        <section className='section is-paddingless has-shadow bg-white'>
          <div className='profile-content rating'>
            <div className='profile-wrapp is-paddingless'>
              <ul className='detail-seller left-margin'>
                {this.renderProductDetail()}
              </ul>
            </div>
          </div>
        </section>
        <section className='section is-paddingless has-shadow'>
          <div className='container is-fluid'>
            <div className='title'>
              <h3>Status Barang ini</h3>
            </div>
          </div>
          <div className='catalog-option'>
            <div className='add-discussion report'>
              <div className='field'>
                <form action='#' className='form'>
                  <div className='field'>
                    <p className='control'>
                      {this.renderStatusInput()}
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
        <section className='section is-paddingless'>
          <div className='payment-detail action'>
            <a className={`button is-primary is-large is-fullwidth ${this.submiting && 'is-loading'}`}
              onClick={(e) => this.updateStatus(e)}>Simpan Perubahan</a>
          </div>
        </section>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    storeProductDetail: state.storeProductDetail,
    alterProducts: state.alterProducts
  }
}

const mapDispatchToProps = dispatch => ({
  getStoreProductDetail: (params) => dispatch(storesActions.getStoreProductDetail(params)),
  updateProduct: (params) => dispatch(productActions.updateProduct(params))
})

export default connect(mapStateToProps, mapDispatchToProps)(ProductStatus)
