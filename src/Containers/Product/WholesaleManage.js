import React, { Component } from 'react'
import { connect } from 'react-redux'
import NProgress from 'nprogress'
import Router from 'next/router'
// component
import Notification from '../../Components/Notification'
import MyImage from '../../Components/MyImage'
// actions
import * as productActions from '../../actions/product'
import * as storesActions from '../../actions/stores'

let errorDefault = {
  status: false
}

let errorMinOrder = {
  ...errorDefault,
  status: true,
  attribute: 'min',
  message: 'Min harap diisi'
}

let errorMaxOrder = {
  ...errorDefault,
  status: true,
  attribute: 'max',
  message: 'Max harap diisi'
}

let errorMaxLargeMin = {
  ...errorDefault,
  status: true,
  attribute: 'max',
  message: 'Max harus lebih besar dari Min'
}

let errorPriceOrder = {
  ...errorDefault,
  status: true,
  attribute: 'price',
  message: 'Harga Produk harap diisi'
}

class ProductWholesaleManage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      id: props.query.id || null,
      storeProductDetail: props.storeProductDetail || null,
      form: {
        is_wholesaler: false,
        wholesales: []
      },
      wholesalesError: {
        index: 0,
        attribute: 'min',
        status: false,
        message: 'Error, default message'
      },
      validation: false,
      notification: {
        status: false,
        type: 'is-success',
        message: 'Error, default message.'
      }
    }
    this.convertToForm = false
    this.submiting = false
  }

  wholesaleAddPress (e) {
    const { form } = this.state
    form.wholesales.push({
      id: 0,
      min: '',
      max: '',
      price: '',
      status: 1
    })
    this.setState({ form })
  }

  wholesaleRemovePress (id, index) {
    const { form } = this.state
    if (id) {
      let newWholsales = form.wholesales.map(val => {
        if (val.id === id) {
          val['status'] = 3
        }
        return val
      })
      this.setState({ form: { ...form, wholesales: newWholsales } })
    } else {
      let newWholsales = form.wholesales.filter((val, i) => index !== i)
      this.setState({ form: { ...form, wholesales: newWholsales } })
    }
  }

  wholesaleHandling (e, index) {
    e.preventDefault()
    let { form, wholesalesError } = this.state
    let { name, value } = e.target
    if (name === 'min') {
      form.wholesales[index].min = value
    }

    if (name === 'max') {
      form.wholesales[index].max = value
    }

    if (name === 'price') {
      form.wholesales[index].price = value
    }
    this.setState({ form, wholesalesError: { ...wholesalesError, status: false } })
  }

  wholesaleErrorHandling () {
    const { form } = this.state

    form.wholesales.every((val, index) => {
      if (!val.min) {
        this.setState({ wholesalesError: { index, ...errorMinOrder } })
        return false
      }
      if (!val.max) {
        this.setState({ wholesalesError: { index, ...errorMaxOrder } })
        return false
      }
      if (val.max <= val.min) {
        this.setState({ wholesalesError: { index, ...errorMaxLargeMin } })
        return false
      }
      if (!val.price) {
        this.setState({ wholesalesError: { index, ...errorPriceOrder } })
        return false
      }
      return true
    })
  }

  onSumbit (e) {
    e.preventDefault()
    let { form, storeProductDetail, id } = this.state
    let isValid = true
    form.wholesales.every((val, index) => {
      if (!val.min) {
        isValid = false
        return false
      }
      if (!val.max) {
        isValid = false
        return false
      }
      if (val.max <= val.min) {
        isValid = false
        return false
      }
      if (!val.price) {
        isValid = false
        return false
      }
      isValid = true
      return true
    })
    if (!isValid) {
      this.wholesaleErrorHandling()
    } else {
      this.submiting = true
      let params = {
        id: id.split('.')[0],
        is_wholesaler: JSON.parse(form.is_wholesaler),
        wholesales: form.wholesales,
        status: storeProductDetail.storeProductDetail.product.status
      }
      this.props.updateProduct(params)
    }
  }

  async componentDidMount () {
    const { storeProductDetail, id } = this.state
    if (!storeProductDetail.isFound || (storeProductDetail.isFound && String(storeProductDetail.storeProductDetail.product.id) !== String(id))) {
      NProgress.start()
      const productId = id.split('.')[0]
      this.convertToForm = true
      await this.props.getStoreProductDetail({ id: productId })
    }
  }

  async componentWillReceiveProps (nextProps) {
    const { form } = this.state
    const { alterProducts, storeProductDetail } = nextProps
    const { isFetching, isFound, isError, notifError, notifSuccess } = this.props

    if (!isFetching(storeProductDetail) && this.convertToForm) {
      this.convertToForm = false
      NProgress.done()
      if (isFound(storeProductDetail)) {
        const nextStoreProductDetail = storeProductDetail.storeProductDetail
        const newState = { form, storeProductDetail: storeProductDetail }
        newState.form['is_wholesaler'] = nextStoreProductDetail.product.is_wholesaler
        let addStatusUpdate = nextStoreProductDetail.wholesaler.map(val => {
          val['status'] = 2
          return val
        })
        newState.form['wholesales'] = addStatusUpdate
        this.setState(newState)
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
        }, 1000)
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
    const { form, wholesalesError, notification } = this.state
    const styleError = {
      borderBottomColor: '#ef5656',
      color: '#ef5656'
    }
    return (
      <div>
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
            <label className='switch right'>
              <input onClick={() => this.setState({ form: { is_wholesaler: !this.state.form.is_wholesaler, wholesales: [] } })} type='checkbox' checked={form.is_wholesaler} />
              <span className='slider round' />
            </label>
            <h3 className='title-content'>Aktifkan Harga Grosir</h3>
            <p>Memberikan harga spesial kepada pembeli untuk pembelian dalam jumlah tertentu</p>
          </div>
          <div style={{ display: form.is_wholesaler ? 'block' : 'none' }}>
            <div className='container is-fluid'>
              <div className='title'>
                <h3>Daftar Harga Grosir</h3>
              </div>
            </div>
            <div className='effect-display'>
              {
                form.wholesales.map((wholesale, index) => {
                  let errorStatus = wholesalesError.status && index === wholesalesError.index
                  let errorStatusMinOrder = errorStatus && wholesalesError.attribute === 'min'
                  let errorStatusMaxOrder = errorStatus && wholesalesError.attribute === 'max'
                  let errorStatusPriceOrder = errorStatus && wholesalesError.attribute === 'price'
                  if (wholesale.status !== 3) {
                    return (
                      <div className='spec-price effect-display' key={index}>
                        <div className='field'>
                          <div className='field-body columns'>
                            <div className='field column quarter'>
                              <label className='label' style={(errorStatusMinOrder || errorStatusMaxOrder) ? styleError : {}}>Jumlah Produk</label>
                              <p className='control is-expanded prod-qty'>
                                <input onChange={(e) => this.wholesaleHandling(e, index)} value={wholesale.min} style={errorStatusMinOrder ? styleError : {}} placeholder='0' name='min' className='input' type='number' />
                                <span>s/d</span>
                                <input onChange={(e) => this.wholesaleHandling(e, index)} value={wholesale.max} style={errorStatusMaxOrder ? styleError : {}} placeholder='0' name='max' className='input' type='number' />
                              </p>
                            </div>
                            <div className='field column'>
                              <label className='label' style={errorStatusPriceOrder ? styleError : {}}>Harga Produk</label>
                              <p className='control is-expanded price'>
                                <span className='currency'>Rp</span>
                                <input onChange={(e) => this.wholesaleHandling(e, index)} placeholder='0' name='price' className='input' type='number' value={wholesale.price} />
                              </p>
                            </div>
                          </div>
                        </div>
                        { errorStatus && <span style={styleError}> {wholesalesError.message} </span> }
                        <div className='remove-wrapp'>
                          <a onClick={() => this.wholesaleRemovePress(wholesale.id, index)} className='remove'>Hapus</a>
                        </div>
                      </div>
                    )
                  }
                })
              }
              <div className='spec-price'>
                <a onClick={(e) => this.wholesaleAddPress(e)}>+ Tambah Daftar Harga Grosir</a>
              </div>
            </div>
          </div>
        </section>
        <section className='section is-paddingless'>
          <div className='payment-detail action'>
            <ul>
              <li>
                <a onClick={(e) => this.onSumbit(e)} className={`button is-primary is-large is-fullwidth ${this.submiting && 'is-loading'}`}>Simpan Perubahan</a>
              </li>
            </ul>
          </div>
        </section>
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ProductWholesaleManage)
