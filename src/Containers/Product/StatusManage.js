// @flow
import React from 'react'
import { connect } from 'react-redux'
import NProgress from 'nprogress'
// components
import Notification from '../../Components/Notification'
// services
import { Status } from '../../Services/Status'
// actions
import * as productActions from '../../actions/product'

class ProductStatus extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      id: props.query.id || null,
      productDetail: props.productDetail || null,
      submitting: false,
      statusChecked: props.productDetail.detail.product.status,
      notification: {
        status: false,
        color: 'is-success',
        message: 'Error, default message.'
      }
    }
  }

  updateStatus (e, id) {
    e.preventDefault()
    this.setState({ submitting: true }, () => {
      if (this.state.submitting) {
        this.props.updateProduct({ status: this.state.statusChecked, id: this.state.id.split('.')[0] })
      }
    })
  }

  async componentDidMount () {
    const { id, productDetail } = this.state
    if (!productDetail.isFound || (productDetail.isFound && String(productDetail.detail.product.id) !== String(id))) {
      NProgress.start()
      await this.props.getProduct({ id })
    }
  }

  async componentWillReceiveProps (nextProps) {
    const { submitting, notification, productDetail } = this.state
    const { alterProducts } = nextProps
    const nextId = nextProps.query.id
    if (!nextProps.productDetail.isLoading) {
      NProgress.done()
      switch (nextProps.productDetail.status) {
        case Status.SUCCESS :
          const newState = { productDetail }
          newState.productDetail = nextProps.productDetail
          this.setState(newState)

          if (String(nextProps.productDetail.detail.product.id) !== String(nextId)) {
            NProgress.start()
            await this.props.getProduct({ id: nextId })
          }
          NProgress.done()
          break
        case Status.OFFLINE :
        case Status.FAILED :
          this.setState({ notification: {status: true, message: productDetail.message} })
          break
        default:
          break
      }
    }
    if (alterProducts.isFound && submitting) {
      switch (alterProducts.status) {
        case Status.SUCCESS: {
          this.setState({ statusChecked: alterProducts.product.status })
          const newNotification = { notification, submitting: false }
          newNotification.notification['status'] = true
          newNotification.notification['message'] = 'Berhasil mengubah Status Barang'
          newNotification.notification['type'] = 'is-success'
          this.setState(newNotification)
          break
        }
        case Status.OFFLINE :
        case Status.FAILED : {
          const newNotif = { notification, submitting: false }
          newNotif.notification['status'] = true
          newNotif.notification['message'] = 'Gagal mengubah Status Barang'
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

  renderProductDetail () {
    const { productDetail } = this.state
    if (productDetail.isFound) {
      return (
        <li>
          <div className='box is-paddingless'>
            <article className='media'>
              <div className='media-left'>
                <figure className='image product-pict'>
                  <img src={productDetail.detail.images[0].file}
                    style={{width: '50px', height: '50px'}} alt='pict' />
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

  renderStatusInput () {
    const { productDetail, statusChecked } = this.state
    if (productDetail.isFound) {
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
    const { notification, submitting } = this.state
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
            <a className={`button is-primary is-large is-fullwidth ${submitting && 'is-loading'}`}
              onClick={(e) => this.updateStatus(e)}>Simpan Perubahan</a>
          </div>
        </section>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    productDetail: state.productDetail,
    alterProducts: state.alterProducts
  }
}

const mapDispatchToProps = dispatch => ({
  getProduct: (params) => dispatch(productActions.getProduct(params)),
  updateProduct: (params) => dispatch(productActions.updateProduct(params))
})

export default connect(mapStateToProps, mapDispatchToProps)(ProductStatus)
