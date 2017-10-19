import React, { Component } from 'react'
import { connect } from 'react-redux'
import NProgress from 'nprogress'
// component
import Notification from '../../Components/Notification'
// actions
import * as productActions from '../../actions/product'
import * as storesActions from '../../actions/stores'
// services
import { Status, isFetching, validateResponseAlter } from '../../Services/Status'

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
    this.submiting = false
  }

  wholesaleAddPress (e) {
    const { form } = this.state
    form.wholesales.push({
      min: '',
      max: '',
      price: ''
    })
    this.setState({ form })
  }

  wholesaleRemovePress (index) {
    const { form } = this.state
    delete form.wholesales[index]
    this.setState({ form })
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
    wholesalesError = this.wholesaleErrorHandling(form.wholesales, index, name)
    this.setState({ form, wholesalesError })
  }

  wholesaleErrorHandling (wholesales, myIndex = null, attribute = null) {
    let errorDefault = {
      status: false
    }

    let errorMinOrder = {
      ...errorDefault,
      status: true,
      attribute: 'min',
      message: 'Min order tidak valid'
    }

    let errorMaxOrder = {
      ...errorDefault,
      status: true,
      attribute: 'max',
      message: 'Max order tidak valid'
    }

    for (let index = 0; index < wholesales.length; index++) {
      /**
       * before wholesales
       */
      let bw = wholesales[index - 1]
      let bwStatus = bw !== undefined
      let bwMaxOrder = ''
      if (bwStatus) {
        bwMaxOrder = bw.max !== '' ? Number(bw.max) : ''
      }
      /**
       * wholesales
       */
      let w = wholesales[index]
      let wMinOrder = w.min !== '' ? Number(w.min) : ''
      let wMaxOrder = w.max !== '' ? Number(w.max) : ''
      /**
       * after wholesales
       */
      let aw = wholesales[index + 1]
      let awStatus = aw !== undefined
      let awMinOrder = ''
      if (awStatus) {
        awMinOrder = aw.min !== '' ? Number(aw.min) : ''
      }
      /**
       * validate min order
       * jika min order lebih besar dari max order
       * jika min order kurang dari maxorder(bwMaxOrder) list data sebelumny
       */

      if ((attribute === 'min') && ((wMaxOrder !== '' && wMinOrder >= wMaxOrder) || ((bwStatus && bwMaxOrder !== '') && (wMinOrder < bwMaxOrder)))) {
        return {
          index,
          ...errorMinOrder
        }
      }

      /**
       * validate max order
       * jika max order lebih kecil dari min order
       * jika max order lebih besar dari min order(awMinOrder) list data setelahnya
       */
      if ((attribute === 'max') && ((wMinOrder !== '' && wMaxOrder <= wMinOrder) || ((awStatus && awMinOrder !== '') && (wMaxOrder > awMinOrder)))) {
        return {
          index,
          ...errorMaxOrder
        }
      }
    }

    return errorDefault
  }

  onSumbit () {
    let { form, storeProductDetail, id } = this.state
    this.submiting = true
    let params = {
      id: id.split('.')[0],
      is_wholesaler: JSON.parse(form.is_wholesaler),
      wholesaler: form.wholesales,
      status: storeProductDetail.storeProductDetail.product.status
    }
    console.log(params)
    this.props.updateProduct(params)
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

  async componentWillReceiveProps (nextProps) {
    const { storeProductDetail, form, convertToForm } = this.state
    const { alterProducts } = nextProps
    if (!nextProps.storeProductDetail.isLoading && convertToForm) {
      switch (nextProps.storeProductDetail.status) {
        case Status.SUCCESS :
          const newState = { storeProductDetail, form, convertToForm: false }
          newState.form['is_wholesaler'] = nextProps.storeProductDetail.storeProductDetail.product.is_wholesaler
          newState.form['wholesales'] = nextProps.storeProductDetail.storeProductDetail.wholesaler
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
      this.setState({ notification: validateResponseAlter(alterProducts, 'Berhasil memperbarui Harga Grosir', 'Gagal memperbarui Harga Grosir') })
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
              <input onClick={() => this.setState({ form: {...this.state.form, is_wholesaler: !this.state.form.is_wholesaler} })} type='checkbox' checked={form.is_wholesaler} />
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
                  return (
                    <div className='spec-price effect-display' key={index}>
                      <div className='field'>
                        <div className='field-body columns'>
                          <div className='field column quarter'>
                            <label className='label' style={errorStatus ? styleError : {}}>Jumlah Produk</label>
                            <p className='control is-expanded prod-qty'>
                              <input onChange={(e) => this.wholesaleHandling(e, index)} value={wholesale.min} style={errorStatusMinOrder ? styleError : {}} placeholder='0' name='min' className='input' type='number' />
                              <span>s/d</span>
                              <input onChange={(e) => this.wholesaleHandling(e, index)} value={wholesale.max} style={errorStatusMaxOrder ? styleError : {}} placeholder='0' name='max' className='input' type='number' />
                            </p>
                          </div>
                          <div className='field column'>
                            <label className='label'>Harga Produk</label>
                            <p className='control is-expanded price'>
                              <span className='currency'>Rp</span>
                              <input onChange={(e) => this.wholesaleHandling(e, index)} placeholder='0' name='price' className='input' type='number' value={wholesale.price} />
                            </p>
                          </div>
                        </div>
                      </div>
                      { errorStatus && <span style={styleError}> {wholesalesError.message} </span> }
                      <div className='remove-wrapp'>
                        <a onClick={() => this.wholesaleRemovePress(index)} className='remove'>Hapus</a>
                      </div>
                    </div>
                  )
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
                <a onClick={() => this.onSumbit()} className={`button is-primary is-large is-fullwidth ${this.submiting && 'is-loading'}`}>Simpan Perubahan</a>
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
