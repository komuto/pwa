// @flow
import React from 'react'
import { connect } from 'react-redux'
import NProgress from 'nprogress'
// components
import Notification from '../Components/Notification'
// services
import { Status } from '../Services/Status'
// actions
import * as productActions from '../actions/product'
// validation
import { inputNumber } from '../Validations/Input'

class ProductStockManage extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      id: props.query.id || null,
      productDetail: props.productDetail || null,
      submitting: false,
      stock: props.productDetail.isFound ? props.productDetail.detail.product.stock : '',
      notification: {
        status: false,
        color: 'is-success',
        message: 'Error, default message.'
      }
    }
  }

  handleInput (e) {
    const { value } = e.target
    let { stock } = this.state
    const newState = { stock }
    newState.stock = inputNumber(value)
    this.setState(newState)
  }

  updateStock (e, id) {
    e.preventDefault()
    this.setState({ submitting: true }, () => {
      if (this.state.submitting) {
        this.props.updateProduct({ stock: this.state.stock, id: this.state.id.split('.')[0] })
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
          this.setState({ stock: alterProducts.product.stock })
          const newNotification = { notification, submitting: false }
          newNotification.notification['status'] = true
          newNotification.notification['message'] = 'Berhasil mengubah Stock Barang'
          newNotification.notification['type'] = 'is-success'
          this.setState(newNotification)
          break
        }
        case Status.OFFLINE :
        case Status.FAILED : {
          const newNotif = { notification, submitting: false }
          newNotif.notification['status'] = true
          newNotif.notification['message'] = 'Gagal mengubah Stock Barang'
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
              <div className='media-left is-bordered'>
                <figure className='image'>
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

  render () {
    const { notification, stock, submitting } = this.state
    return (
      <div>
        <Notification
          type={notification.type}
          isShow={notification.status}
          activeClose
          onClose={() => this.setState({notification: {status: false, message: ''}})}
          message={notification.message} />
        <section className='section is-paddingless'>
          <div className='profile-content rating'>
            <div className='profile-wrapp is-paddingless'>
              <ul className='detail-seller left-margin'>
                {this.renderProductDetail()}
              </ul>
            </div>
          </div>
          <div className='container is-fluid'>
            <form action='#' className='form edit stock-item'>
              <div className='field '>
                <label className='label'>Stok saat ini</label>
                <p className='control'>
                  <input className='input' type='text' name='stock'
                    onChange={(e) => this.handleInput(e)}
                    value={stock} />
                </p>
              </div>

              <a className={`button is-primary is-large is-fullwidth ${submitting && 'is-loading'}`}
                onClick={(e) => this.updateStock(e)}>Simpan Perubahan</a>
            </form>
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

export default connect(mapStateToProps, mapDispatchToProps)(ProductStockManage)
