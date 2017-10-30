// @flow
import React from 'react'
import { connect } from 'react-redux'
import NProgress from 'nprogress'
import Router from 'next/router'
// components
import Notification from '../Components/Notification'
import MyImage from '../Components/MyImage'
// actions
import * as productActions from '../actions/product'

class DropshippingOption extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      id: props.query.id || null,
      productDetail: props.productDetail || null,
      isDropship: props.productDetail.isFound ? props.productDetail.detail.product.is_dropship : false,
      notification: {
        type: 'is-success',
        status: false,
        message: 'Error, default message.'
      }
    }
    this.fetchingFirst = false
    this.submiting = false
  }

  handleInput (e) {
    let { isDropship } = this.state
    const newState = { isDropship }
    newState.isDropship = !isDropship
    this.setState(newState)
  }

  changeDropship (e, id) {
    e.preventDefault()
    this.submiting = true
    this.props.updateProduct({ id: this.state.id.split('.')[0], is_dropship: this.state.isDropship })
  }

  async componentDidMount () {
    const { id } = this.state
    if (id) {
      NProgress.start()
      await this.props.getProduct({ id })
      this.fetchingFirst = true
    }
  }

  async componentWillReceiveProps (nextProps) {
    const { alterProducts, productDetail, query } = nextProps
    const { isFetching, isFound, isError, notifError, notifSuccess } = this.props

    if (!isFetching(productDetail) && this.fetchingFirst) {
      NProgress.done()
      this.fetchingFirst = false
      if (isFound(productDetail)) {
        this.setState({ productDetail: productDetail, isDropship: productDetail.detail.product.is_dropship })
        if (String(productDetail.detail.product.id) !== String(query.id)) {
          NProgress.start()
          this.fetchingFirst = true
          await this.props.getProduct({ id: query.id })
        }
      }
      if (isError(productDetail)) {
        this.setState({ notification: notifError(productDetail.message) })
      }
    }
    if (!isFetching(alterProducts) && this.submiting) {
      this.submiting = false
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

  render () {
    const { notification, isDropship } = this.state
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
              <a className={`button is-primary is-large is-fullwidth ${this.submiting && 'is-loading'}`}
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
  updateProduct: (params) => dispatch(productActions.updateProduct(params))
})

export default connect(mapStateToProps, mapDispatchToProps)(DropshippingOption)
