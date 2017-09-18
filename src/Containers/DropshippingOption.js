// @flow
import React from 'react'
import { connect } from 'react-redux'
import NProgress from 'nprogress'
// components
import Router from 'next/router'
import Notification from '../Components/Notification'
// services
import { Status } from '../Services/Status'
// actions
import * as productActions from '../actions/product'

class DropshippingOption extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      id: props.query.id || null,
      productDetail: props.productDetail || null,
      submitting: false,
      isDropship: props.productDetail.isFound ? props.productDetail.detail.product.is_dropship : false,
      notification: {
        status: false,
        color: 'is-success',
        message: 'Error, default message.'
      }
    }
  }

  handleInput (e) {
    let { isDropship } = this.state
    const newState = { isDropship }
    newState.isDropship = !isDropship
    this.setState(newState)
  }

  changeDropship (e, id) {
    e.preventDefault()
    this.setState({ submitting: true }, () => {
      if (this.state.submitting) {
        this.props.updateDropshipStatus({ product_ids: [this.state.id.split('.')[0]] })
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
          let newState = { productDetail }
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
          const newNotification = { notification, submitting: false }
          newNotification.notification['status'] = true
          newNotification.notification['message'] = 'Berhasil menjadikan Barang sebagai dropship'
          newNotification.notification['type'] = 'is-success'
          this.setState(newNotification)
          break
        }
        case Status.OFFLINE :
        case Status.FAILED : {
          const newNotif = { notification, submitting: false }
          newNotif.notification['status'] = true
          newNotif.notification['message'] = 'Gagal menjadikan Barang sebagai dropship'
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
    const { notification, isDropship, submitting } = this.state
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
          <div className='data-wrapper'>
            <ul className='set-notify opsiDropShip'>
              <li>
                <span>Dropshipping untuk barang ini</span>
                <label className='switch middle grey-style'>
                  <input
                    type='checkbox'
                    name='isDropship'
                    onChange={(e) => this.handleInput(e)}
                    checked={isDropship && true} />
                  <span className='slider round' />
                </label>
              </li>
            </ul>
            <div className='field'>
              <a className='link' onClick={() => Router.push('/about-dropshipping?type=dropshipOption')}>
                Pelajari Lebih Lanjut tentang Dropshipping
              </a>
            </div>
            <div className='field'>
              <a className={`button is-primary is-large is-fullwidth ${submitting && 'is-loading'}`}
                onClick={(e) => this.changeDropship(e)}>
                Simpan Perubahan
              </a>
            </div>
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
  updateDropshipStatus: (params) => dispatch(productActions.updateDropshipStatus(params))
})

export default connect(mapStateToProps, mapDispatchToProps)(DropshippingOption)
