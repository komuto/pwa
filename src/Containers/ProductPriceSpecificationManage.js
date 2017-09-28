import React, { Component } from 'react'
import { connect } from 'react-redux'
import NProgress from 'nprogress'
// component
import Content from '../Components/Content'
import Notification from '../Components/Notification'
// libs
import RupiahFormat from '../Lib/RupiahFormat'
// actions
import * as productActions from '../actions/product'
import * as storesActions from '../actions/stores'
// services
import { Status, isFetching, validateResponseAlter } from '../Services/Status'

class ProductPriceSpecificationManage extends Component {
  constructor (props) {
    super(props)
    const { storeProductDetail } = props.storeProductDetail
    let discount = props.storeProductDetail.isFound ? storeProductDetail.product.discount : ''
    let condition = props.storeProductDetail.isFound ? storeProductDetail.product.condition : ''
    let isInsurance = props.storeProductDetail.isFound ? storeProductDetail.product.is_insurance : ''
    let price = props.storeProductDetail.isFound ? storeProductDetail.product.price : ''
    let stock = props.storeProductDetail.isFound ? storeProductDetail.product.stock : ''
    let weight = props.storeProductDetail.isFound ? storeProductDetail.product.weight : ''
    this.state = {
      storeProductDetail: props.storeProductDetail || null,
      id: props.query.id || null,
      form: {
        discount,
        condition,
        is_insurance: isInsurance,
        price,
        stock,
        weight
      },
      error: null,
      notification: {
        status: false,
        type: 'is-success',
        message: 'Error, default message.'
      }
    }
    this.submiting = false
  }

  formHandling (e) {
    let { form, error } = this.state
    let { name, value } = e.target
    form[name] = value
    error = null
    if (name === 'discount' && value > 100) {
      error = 'discount'
    }
    this.setState({ form, error })
  }

  onSumbit () {
    let { form, id } = this.state

    if (form.price === undefined || form.price === '') {
      this.setState({ error: 'name' })
      return
    }

    if (form.weight === undefined || form.weight === '') {
      this.setState({ error: 'weight' })
      return
    }

    if (form.stock === undefined || form.stock === '') {
      this.setState({ error: 'stock' })
      return
    }

    this.submiting = true
    let params = {
      discount: Number.parseInt(form.discount),
      condition: Number.parseInt(form.condition),
      is_insurance: JSON.parse(form.is_insurance),
      price: Number.parseInt(form.price),
      stock: Number.parseInt(form.stock),
      weight: form.weight
    }
    this.props.updateProduct({ id: id.split('.')[0], ...params })
  }

  async componentDidMount () {
    const { storeProductDetail, id } = this.state
    if (!storeProductDetail.isFound || (storeProductDetail.isFound && String(storeProductDetail.storeProductDetail.product.id) !== String(id))) {
      NProgress.start()
      const productId = id.split('.')[0]
      this.setState({convertToForm: true})
      await this.props.getStoreProductDetail({ id: productId })
    }
  }

  componentWillReceiveProps (nextProps) {
    const { storeProductDetail, form, convertToForm } = this.state
    const { alterProducts } = nextProps
    if (!nextProps.storeProductDetail.isLoading && convertToForm) {
      switch (nextProps.storeProductDetail.status) {
        case Status.SUCCESS :
          const newState = { storeProductDetail, form, convertToForm: false }
          newState.form['discount'] = nextProps.storeProductDetail.storeProductDetail.product.discount
          newState.form['condition'] = nextProps.storeProductDetail.storeProductDetail.product.condition
          newState.form['is_insurance'] = nextProps.storeProductDetail.storeProductDetail.product.is_insurance
          newState.form['price'] = nextProps.storeProductDetail.storeProductDetail.product.price
          newState.form['stock'] = nextProps.storeProductDetail.storeProductDetail.product.stock
          newState.form['weight'] = nextProps.storeProductDetail.storeProductDetail.product.weight
          newState.storeProductDetail = nextProps.storeProductDetail
          this.setState(newState)
          NProgress.done()
          break
        case Status.OFFLINE :
        case Status.FAILED :
          this.setState({ notification: {status: true, message: nextProps.storeProductDetail.message} })
          break
        default:
          break
      }
    }
    if (!isFetching(alterProducts) && this.submiting) {
      this.submiting = false
      this.setState({ notification: validateResponseAlter(alterProducts, 'Berhasil memperbarui Harga dan Spesifikasi', 'Gagal memperbarui Harga dan Spesifikasi') })
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
                  <img src={storeProductDetail.storeProductDetail.images[0].file}
                    style={{width: '50px', height: '50px'}} alt='pict' />
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
    const { form, error, notification } = this.state
    const styleError = {
      borderBottomColor: '#ef5656',
      color: '#ef5656'
    }

    let price = form.price !== undefined ? form.price : 0
    let discount = form.discount !== undefined ? form.discount : 0
    let priceAfterDiscount = price - (price * (discount / 100))
    let commision = priceAfterDiscount * (10 / 100)

    let nameError = error === 'name' ? styleError : {}
    let discountError = error === 'discount' ? styleError : {}
    let weightError = error === 'weight' ? styleError : {}
    let stockError = error === 'stock' ? styleError : {}

    return (
      <Content>
        <Notification
          type={notification.type}
          isShow={notification.status}
          activeClose
          onClose={() => this.setState({notification: {status: false, message: ''}})}
          message={notification.message} />
        <section className='section is-paddingless has-shadow'>
          <div className='profile-content rating'>
            <div className='profile-wrapp is-paddingless'>
              <ul className='detail-seller left-margin'>
                {this.renderProductDetail()}
              </ul>
            </div>
          </div>
          <div className='spec-price'>
            <div className='field is-horizontal'>
              <div className='field-body columns is-mobile'>
                <div className='field column'>
                  <label className='label' style={nameError}>Harga Produk</label>
                  <p className='control is-expanded price'>
                    <span className='currency' style={nameError}>Rp</span>
                    <input onChange={(e) => this.formHandling(e)} value={form.price !== undefined && form.price} placeholder='0' name='price' className='input' type='number' style={nameError} />
                  </p>
                </div>
                <div className='field column is-one-quarter'>
                  <label className='label' style={discountError}>Diskon</label>
                  <p className='control is-expanded discount'>
                    <span className='disc' style={discountError}>%</span>
                    <input onChange={(e) => this.formHandling(e)} value={form.discount !== undefined && form.discount} placeholder='0' name='discount' className='input' type='number' style={discountError} />
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className='detail spec'>
            <div className='detail-result'>
              <h3>Rincian Penerimaan</h3>
              <ul>
                <li>
                  <div className='columns custom is-mobile'>
                    <div className='column is-half'>Harga Jual</div>
                    <div className='column is-half has-text-right'><strong>Rp { RupiahFormat(priceAfterDiscount) }</strong></div>
                  </div>
                </li>
                <li>
                  <div className='columns custom is-mobile'>
                    <div className='column is-half'>Komisi  (10%  dari Rp { RupiahFormat(priceAfterDiscount)} )</div>
                    <div className='column is-half has-text-right'><strong>Rp { RupiahFormat(commision) }</strong></div>
                  </div>
                </li>
                <li>
                  <div className='columns custom is-mobile'>
                    <div className='column is-half'>Uang yang akan Anda terima</div>
                    <div className='column is-half has-text-right'><strong className='total'>Rp { RupiahFormat(priceAfterDiscount - commision) }</strong></div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className='spec-price'>
            <div className='field'>
              <label className='label' style={weightError}>Berat Produk</label>
              <p className='control is-expanded discount'>
                <span className='disc' style={weightError}>Kg</span>
                <input onChange={(e) => this.formHandling(e)} value={form.weight !== undefined && form.weight} placeholder='0' name='weight' className='input' type='number' style={weightError} />
              </p>
            </div>
            <div className='field'>
              <label className='label' style={stockError}>Stock Produk</label>
              <p className='control is-expanded'>
                <input onChange={(e) => this.formHandling(e)} value={form.stock !== undefined && form.stock} placeholder='0' name='stock' className='input' type='number' style={stockError} />
              </p>
            </div>
            <div className='field radio-horizontal'>
              <label className='label'>Jenis Produk</label>
              <p className='control'>
                <label className={`radio primary ${String(form.condition) === '1' ? 'checked' : ''}`}>
                  <input onClick={(e) => this.formHandling(e)} name='condition' value='1' type='radio' />
                  <strong>Baru</strong>
                </label>
                <label className={`radio primary ${String(form.condition) === '0' ? 'checked' : ''}`}>
                  <input onClick={(e) => this.formHandling(e)} name='condition' value='0' type='radio' />
                  <strong>Bekas</strong>
                </label>
              </p>
            </div>
            <div className='field'>
              <label className='label'>Asuransi Produk</label>
              <p className='control'>
                <label className={`radio primary ${String(form.is_insurance) === 'true' ? 'checked' : ''}`}>
                  <input onClick={(e) => this.formHandling(e)} name='is_insurance' value type='radio' />
                  <strong>Wajib</strong>
                </label>
                <label className={`radio primary ${String(form.is_insurance) === 'false' ? 'checked' : ''}`}>
                  <input onClick={(e) => this.formHandling(e)} name='is_insurance' value={false} type='radio' />
                  <strong>Optional</strong>
                </label>
              </p>
            </div>
            <div className='field'>
              <p className='control'>
                <button onClick={() => this.onSumbit()}
                  className={`button is-primary is-large is-fullwidth ${this.submiting && 'is-loading'}`}>
                  Simpan Perubahan
                </button>
              </p>
            </div>
          </div>
        </section>
      </Content>
    )
  }
}

const mapStateToProps = (state) => ({
  storeProductDetail: state.storeProductDetail,
  alterProducts: state.alterProducts
})

const mapDispatchToProps = (dispatch) => ({
  getStoreProductDetail: (params) => dispatch(storesActions.getStoreProductDetail(params)),
  updateProduct: (params) => dispatch(productActions.updateProduct(params))
})

export default connect(mapStateToProps, mapDispatchToProps)(ProductPriceSpecificationManage)