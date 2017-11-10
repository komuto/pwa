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
import * as storesActions from '../actions/stores'

class DropshippingOption extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      id: props.query.id || null,
      storeProductDetail: props.storeProductDetail || null,
      isDropship: props.storeProductDetail.isFound ? props.storeProductDetail.storeProductDetail.product.is_dropship : false,
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
    this.props.updateProduct({ id: this.state.id, is_dropship: this.state.isDropship })
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
        this.setState({ storeProductDetail: storeProductDetail, isDropship: storeProductDetail.storeProductDetail.product.is_dropship })
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
    storeProductDetail: state.storeProductDetail,
    alterProducts: state.alterProducts
  }
}

const mapDispatchToProps = dispatch => ({
  getStoreProductDetail: (params) => dispatch(storesActions.getStoreProductDetail(params)),
  updateProduct: (params) => dispatch(productActions.updateProduct(params))
})

export default connect(mapStateToProps, mapDispatchToProps)(DropshippingOption)
