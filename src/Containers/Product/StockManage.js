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
// validation
import { inputNumber } from '../../Validations/Input'

class ProductStockManage extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      id: props.query.id || null,
      productDetail: props.productDetail || null,
      stock: props.productDetail.isFound ? props.productDetail.detail.product.stock : '',
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
    const { value } = e.target
    let { stock } = this.state
    const newState = { stock }
    newState.stock = inputNumber(value)
    this.setState(newState)
  }

  updateStock (e, id) {
    e.preventDefault()
    this.submiting = true
    this.props.updateProduct({ stock: this.state.stock, id: this.state.id.split('.')[0] })
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
    const { alterProducts, productDetail } = nextProps
    const { isFetching, isFound, isError, notifError, notifSuccess } = this.props
    const nextId = nextProps.query.id

    if (!isFetching(productDetail) && this.fetchingFirst) {
      NProgress.done()
      this.fetchingFirst = false
      if (isFound(productDetail)) {
        this.setState({ productDetail: productDetail, stock: productDetail.detail.product.stock })
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
    const { notification, stock } = this.state
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

              <a className={`button is-primary is-large is-fullwidth ${this.submiting && 'is-loading'}`}
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
