import React, { Component } from 'react'
import { connect } from 'react-redux'
import Router from 'next/router'
import NProgress from 'nprogress'
// component
import Section from '../Components/Section'
import Loading from '../Components/Loading'
import Notification from '../Components/Notification'
// import Content from '../Components/Content'
import MyImage from '../Components/MyImage'
// actions
import * as cartActions from '../actions/cart'
// lib
import RupiahFormat from '../Lib/RupiahFormat'
// services
import { Status } from '../Services/Status'
// validations
import * as inputValidations from '../Validations/Input'

class ShoppingCart extends Component {
  constructor (props) {
    super(props)
    this.state = {
      cart: props.cart || null,
      promo: props.promo || null,
      rsAddToCart: {
        data: props.rsAddToCart || null,
        submitting: false,
        productClick: null
      },
      deleteCartId: null,
      cancelPromo: {
        data: props.cancelPromo || null,
        submitting: false
      },
      voucher: {
        data: null,
        invalid: false,
        message: '',
        show: false,
        code: '',
        submitting: false
      },
      notification: {
        type: 'is-danger',
        status: false,
        message: 'Error, default message.'
      }
    }

    this.cancelPromoPress = false
    this.addToCartPress = false
  }

  minPress = (myItem) => this.updateCart(myItem, 'min')

  plusPress = (myItem) => this.updateCart(myItem, 'plus')

  async updateCart (myItem, pressStatus) {
    let { cart } = this.state

    let item = cart.cart.items.filter((item) => {
      return item.id === myItem.id
    })[0]

    await this.props.addToCart({
      'destination_ro_id': item.shipping.address.district.ro_id,
      'origin_ro_id': item.product.store.district.ro_id,
      'service': item.shipping.expedition_service.name,
      'product_id': item.product.id,
      'expedition_id': item.shipping.expedition_service.expedition.id,
      'expedition_service_id': item.shipping.expedition_service.id,
      'qty': pressStatus === 'plus' ? item.qty + 1 : item.qty - 1,
      'note': item.note,
      'address_id': item.shipping.address.id,
      'is_insurance': item.shipping.is_insurance
    })

    this.setState({ rsAddToCart: { ...this.state.rsAddToCart, submitting: true, productClick: item.product.id } })
  }

  async deleteProductPress (item) {
    this.cancelPromoPress = true
    await this.props.deleteCart({ id: item.id })
    this.setState({ deleteCartId: item.id })
  }

  voucherShow = () => this.setState({ voucher: { ...this.state.voucher, show: !this.state.voucher.show } })

  voucherOnChange = (e) => this.setState({ voucher: { ...this.state.voucher, code: inputValidations.inputNormal(e.target.value), invalid: e.target.value === '' } })

  async voucherSubmit () {
    const { voucher } = this.state
    if (voucher.code === '') { this.setState({ voucher: { ...this.state.voucher, invalid: true } }) } else { await this.props.getPromo({ code: voucher.code }) }
    this.setState({ voucher: { ...this.state.voucher, submitting: true } })
  }

  async voucherCancel () {
    await this.props.cancelPromoPress()
    this.setState({ cancelPromo: { ...this.state.cancelPromo, submitting: true } })
  }

  async componentDidMount () {
    NProgress.start()
    await this.props.getCart()
  }

  componentWillReceiveProps (nextProps) {
    let { cart, promo, cancelPromo, rsAddToCart } = nextProps
    let { notification, voucher } = this.state
    let stateRsAddToCart = this.state.rsAddToCart
    notification = {status: false, message: 'Error, default message.'}

    voucher.message = ''

    if (!rsAddToCart.isLoading) {
      switch (rsAddToCart.status) {
        case Status.SUCCESS :
          if (!rsAddToCart.isFound) {
            notification = {type: 'is-danger', status: true, message: 'Keranjang belanja kosong!'}
          } else if (stateRsAddToCart.submitting) {
            cart.cart.items.map((item) => {
              if (item.id === rsAddToCart.cart.id) {
                item.qty = rsAddToCart.cart.qty
                item.total_price = rsAddToCart.cart.total_price
              }
            })
            stateRsAddToCart.data = rsAddToCart
            stateRsAddToCart.submitting = false
            stateRsAddToCart.productClick = null
            this.setState({ addToCartPress: stateRsAddToCart, cart })
          }
          break
        case Status.OFFLINE :
        case Status.FAILED :
          notification = {type: 'is-danger', status: true, message: rsAddToCart.message}
          break
        default:
          break
      }
      this.setState({ notification })
    }

    if (!cart.isLoading) {
      NProgress.done()
      switch (cart.status) {
        case Status.SUCCESS :
          if (!cart.isFound) notification = {type: 'is-danger', status: true, message: 'Keranjang belanja kosong!'}
          break
        case Status.OFFLINE :
        case Status.FAILED :
          notification = {type: 'is-danger', status: true, message: cart.message}
          break
        default:
          break
      }
      this.setState({ cart, notification })
    }

    if (!promo.isLoading) {
      switch (promo.status) {
        case Status.SUCCESS :
          if (!promo.isFound) {
            voucher.message = 'Promo tidak ditemukan'
          } else {
            voucher.show = false
            cart.cart.promo = promo.promo
          }
          break
        case Status.OFFLINE :
        case Status.FAILED :
          voucher.message = 'Promo tidak ditemukan atau sudah tidak valid'
          break
        default:
          break
      }
      voucher.submitting = false
      this.setState({ promo, cart, voucher })
    }

    if (!cancelPromo.isLoading) {
      switch (cancelPromo.status) {
        case Status.SUCCESS :
          if (!cancelPromo.isFound) {
            notification = {type: 'is-danger', status: true, message: 'Hapus promo gagal!'}
          } else {
            if (this.state.cancelPromo.submitting) {
              cart.cart.promo = null
            }
          }
          break
        case Status.OFFLINE :
        case Status.FAILED :
          notification = {type: 'is-danger', status: true, message: cart.message}
          break
        default:
          break
      }
      this.setState({ cancelPromo: { ...this.state.cancelPromo, submitting: false }, cart, notification })
    }
  }

  render () {
    const { cart, voucher, notification, rsAddToCart, cancelPromo, deleteCartId } = this.state
    const { promo } = cart.cart
    let totalPayment = 0

    const errorStyle = {
      color: 'red',
      borderBottomColor: 'red'
    }

    if (!cart.isFound) return null

    if (cart.cart.items && cart.cart.items.length < 1) { return <h1>Tidak ada barang di keranjang belanja!</h1> }

    if (cart.cart.items) {
      cart.cart.items.map((item) => {
        totalPayment += item.total_price
      })
    }

    if (promo) totalPayment = totalPayment - promo.nominal

    return (
      <Section>
        <Notification
          type={notification.type}
          isShow={notification.status}
          activeClose
          onClose={() => this.setState({notification: {status: false, message: ''}})}
          message={notification.message} />
        {
          // field items by default not found
          cart.cart.items && cart.cart.items.map((item) => {
            let isSubmitting = rsAddToCart.submitting && (rsAddToCart.productClick === item.product.id)
            return (
              <section className='section is-paddingless has-shadow' key={item.id}>
                <div className='detail-product'>
                  <div className='purchase'>
                    <figure className='img-item' style={{ width: 50 }}>
                      <MyImage src={item.product.image} alt='pict' />
                    </figure>
                    <h3>{item.product.name}</h3>
                    <span className='price'>{item.product.store.name}</span>
                  </div>
                  {
                    cart.isLoading && cart.type === 'delete' && deleteCartId === item.id
                    ? <Loading size={14} type='ovals' color='#ef5656' className='remove-item' />
                    : <a onClick={() => this.deleteProductPress(item)} className='remove-item'>Hapus</a>
                  }
                </div>
                <div className='info-purchase'>
                  <div className='detail-rate is-purchase'>
                    <div className='columns total-items is-mobile is-multiline no-margin-bottom'>
                      <div className='column is-half'>
                        <div className='rating-content is-left'>
                          <strong>Harga Satuan</strong>
                        </div>
                      </div>
                      <div className='column is-half'>
                        <div className='rating-content item-qty has-text-right'>
                          <span>Rp {RupiahFormat(item.product.price)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='info-purchase'>
                  <div className='detail-rate is-purchase'>
                    <div className='columns detail-rating is-mobile is-multiline no-margin-bottom'>
                      <div className='column is-half is-paddingless'>
                        <div className='rating-content is-left'>
                          <strong>Jumlah</strong>
                        </div>
                      </div>
                      <div className='column is-half is-paddingless'>
                        <div className='rating-content item-qty'>
                          <a onClick={() => !isSubmitting && this.minPress(item)}><span className='icon-qty-min' /></a>
                          <span className='qty'>{ isSubmitting ? <Loading size={14} type='ovals' color='#ef5656' className='remove-item' /> : item.qty }</span>
                          <a onClick={() => !isSubmitting && this.plusPress(item)}><span className='icon-qty-plus' /></a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='see-all' onClick={() => Router.push('/shipping-detail?id=' + item.id)}>
                  <span className='link'>Detail Pengiriman <span className='icon-arrow-right' /></span>
                </div>
                <div className='info-purchase'>
                  <div className='detail-rate is-purchase'>
                    <div className='columns total-items is-mobile is-multiline no-margin-bottom'>
                      <div className='column is-half'>
                        <div className='rating-content is-left'>
                          <strong>Subtotal</strong>
                        </div>
                      </div>
                      <div className='column is-half'>
                        <div className='rating-content item-qty has-text-right'>
                          <span> { isSubmitting ? <Loading size={14} type='ovals' color='#ef5656' className='remove-item' /> : `Rp ${RupiahFormat(item.total_price)}` } </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            )
          })
        }
        <section className='section is-paddingless has-shadow bg-white'>
          <div className='info-purchase'>
            <div className='detail-rate is-purchase'>
              <div className='columns code-voucher is-mobile is-multiline no-margin-bottom'>
                <div className='column is-half is-paddingless'>
                  <p>Punya Kode Voucher?</p>
                </div>
                <div className='column is-half is-paddingless has-text-right'>
                  <a onClick={() => this.voucherShow()} className='js-option' data-target='#voucherCode'>Gunakan Kode</a>
                </div>
              </div>
            </div>
          </div>
          {
            promo &&
            <div className='detail-purchase summary'>
              <div className='detail-result cancel-voucher'>
                <ul>
                  <li>
                    <div className='columns custom is-mobile'>
                      <div className='column is-half'>
                        <span>{ promo.promo_code }</span>
                        <br />
                        <span className='voucher-credit'>- Rp { RupiahFormat(promo.nominal) }</span></div>
                      <div className='column is-half has-text-right'><a onClick={() => this.voucherCancel()} className='cancel'> { cancelPromo.submitting ? <Loading size={14} type='ovals' color='#ef5656' className='is-fullwidth' /> : 'Batal' } </a></div>
                    </div>
                  </li>
                </ul>
              </div>
              </div>
          }
        </section>
        <section className='section is-paddingless has-shadow bg-white'>
          <div className='info-purchase'>
            <div className='detail-rate is-purchase'>
              <div className='columns total-pay is-mobile is-multiline no-margin-bottom'>
                <div className='column is-half is-paddingless'>
                  <p>Total Pembayaran</p>
                  <p className='price-pay'>Rp { RupiahFormat(totalPayment) }</p>
                </div>
                <div className='column is-half is-paddingless has-text-right'>
                  <button className='button is-primary is-large is-fullwidth'>Bayar Sekarang</button>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className='sort-option' style={{ display: voucher.show && 'block' }}>
          <div className='notif-report add-voucher'>
            <div className='header-notif'>
              <h3>Gunakan Kode Voucher</h3>
              <span onClick={() => this.voucherShow()} className='icon-close' />
            </div>
            <div className='field'>
              <label className='label' style={voucher.invalid ? errorStyle : {}}>Masukan Kode Voucher</label>
              <p className='control'>
                <input style={voucher.invalid ? errorStyle : {}} className='input' type='text' onChange={(e) => this.voucherOnChange(e)} value={voucher.code} />
                <br />
                <br />
                <span style={errorStyle}>{ voucher.message }</span>
              </p>
            </div>
            <button onClick={() => !voucher.submitting && this.voucherSubmit()} className={`button is-primary is-large is-fullwidth ${voucher.submitting && 'is-loading'}`}>Gunakan Kode Voucher</button>
          </div>
        </div>
      </Section>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    rsAddToCart: state.addToCart,
    cart: state.cart,
    promo: state.promo,
    cancelPromo: state.cancelPromo,
    countCart: state.countCart
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (params) => dispatch(cartActions.addToCart(params)),
    getCart: () => dispatch(cartActions.getCart()),
    deleteCart: (id) => dispatch(cartActions.deleteItem(id)),
    getPromo: (code) => dispatch(cartActions.getPromo(code)),
    cancelPromoPress: () => dispatch(cartActions.cancelPromo())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCart)
