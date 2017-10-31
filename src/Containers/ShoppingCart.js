import React, { Component } from 'react'
import { connect } from 'react-redux'
import Router from 'next/router'
import NProgress from 'nprogress'
// component
import Section from '../Components/Section'
import Loading from '../Components/Loading'
import Notification from '../Components/Notification'
import MyImage from '../Components/MyImage'
import Content from '../Components/Content'
// import Content from '../Components/Content'
// actions
import * as cartActions from '../actions/cart'
// lib
import RupiahFormat from '../Lib/RupiahFormat'
import Promo from '../Lib/Promo'
// services
import { isFetching, isError, isFound, notifError } from '../Services/Status'
// validations
import * as inputValidations from '../Validations/Input'
// themes
import Images from '../Themes/Images'

class ShoppingCart extends Component {
  constructor (props) {
    super(props)
    this.state = {
      localize: props.localize,
      cart: {
        data: props.cart || null,
        submitting: false,
        emptyCart: false
      },
      promo: props.promo || null,
      deleteItem: {
        data: props.deleteItem || null,
        submitting: false,
        productClick: null
      },
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
      submitting: false,
      notification: props.notification
    }

    this.cancelPromoPress = false
    this.addToCartPress = false
  }

  minPress (myItem) {
    this.updateCart(myItem, 'min')
  }

  plusPress (myItem) {
    this.updateCart(myItem, 'plus')
  }

  async updateCart (myItem, pressStatus) {
    let { cart } = this.state

    let item = cart.data.cart.items.filter((item) => {
      return item.id === myItem.id
    })[0]

    await this.props.addToCart({
      'destination_ro_id': item.shipping.address.district.ro_id,
      'origin_ro_id': item.product.location.district.ro_id,
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
    await this.props.deleteCart({ id: item.id })
    this.setState({ deleteItem: { ...this.state.deleteItem, productClick: item.id, submitting: true } })
  }

  voucherShow () {
    this.setState({ voucher: { ...this.state.voucher, show: !this.state.voucher.show } })
  }

  voucherOnChange (e) {
    this.setState({ voucher: { ...this.state.voucher, code: inputValidations.inputNormal(e.target.value), invalid: e.target.value === '' } })
  }

  async voucherSubmit () {
    const { voucher } = this.state
    if (voucher.code === '') { this.setState({ voucher: { ...this.state.voucher, invalid: true } }) } else { await this.props.getPromo({ code: voucher.code }) }
    this.setState({ voucher: { ...this.state.voucher, submitting: true } })
  }

  async voucherCancel () {
    await this.props.cancelPromoPress()
    this.setState({ cancelPromo: { ...this.state.cancelPromo, submitting: true } })
  }

  payNow () {
    let { cart } = this.state
    if (isFound(cart.data)) {
      let idT = cart.data.cart.id
      Router.push(`/payment?paymentType=bucket&idT=${idT}`)
      this.setState({ submitting: true })
    }
  }

  componentDidMount () {
    NProgress.start()
    this.props.getCart()
    this.setState({ cart: { ...this.state.cart, submitting: true } })
  }

  componentWillReceiveProps (nextProps) {
    let { cart, promo, cancelPromo, rsAddToCart, deleteItem } = nextProps

    // handling state remove product from cart
    if (!isFetching(deleteItem) && this.state.deleteItem.submitting) {
      if (isError(deleteItem)) {
        this.setState({
          deleteItem: {...this.state.deleteItem, submitting: false},
          notification: notifError(deleteItem.message)
        })
      }

      if (isFound(deleteItem) && isFound(cart)) {
        if (this.state.deleteItem.productClick) {
          cart.cart.items = cart.cart.items.filter((item) => {
            return item.id !== this.state.deleteItem.productClick
          })
          this.setState({
            deleteItem: { ...this.state.deleteItem, productClick: null, submitting: false },
            cart: { ...this.state.cart, data: cart, emptyCart: cart.cart.items < 1 }
          })
        }
      }
    }

    // handling update cart
    if (!isFetching(rsAddToCart) && this.state.rsAddToCart.submitting) {
      if (isError(rsAddToCart)) {
        this.setState({
          rsAddToCart: { ...this.state.rsAddToCart, submitting: false },
          notification: notifError(rsAddToCart.message)
        })
      }
      if (isFound(rsAddToCart)) {
        cart.cart.items.some((item) => {
          if (item.id === rsAddToCart.cart.id) {
            item.qty = rsAddToCart.cart.qty
            item.total_price = rsAddToCart.cart.total_price
            return true
          }
        })
        this.setState({
          rsAddToCart: { ...this.state.rsAddToCart, data: rsAddToCart, submitting: false, productClick: null },
          cart: { ...this.state.cart, data: cart }
        })
      }
    }

    // handling state cart
    if (!isFetching(cart) && this.state.cart.submitting) {
      NProgress.done()
      if (isError(cart)) {
        this.setState({ cart: { ...this.state.cart, emptyCart: true, submitting: false }, notification: notifError(cart.message) })
      }
      if (isFound(cart)) {
        this.setState({ cart: { ...this.state.cart, data: cart, emptyCart: cart.cart.items < 1, submitting: false } })
      }
    }

    // handling state promo
    if (!isFetching(promo) && this.state.voucher.submitting) {
      if (isError(promo)) {
        this.setState({ voucher: { ...this.state.voucher, message: promo.message, submitting: false } })
      }
      if (isFound(promo)) {
        cart.cart.promo = promo.promo
        this.setState({
          promo,
          cart: { ...this.state.cart, data: cart },
          voucher: { ...this.state.voucher, message: null, show: false, submitting: false }
        })
      }
    }

    // handling state cancel promo
    if (!isFetching(cancelPromo) && this.state.cancelPromo.submitting) {
      if (isError(cancelPromo)) {
        this.setState({
          cancelPromo: { ...this.state.cancelPromo, submitting: false },
          notification: notifError(cart.message)
        })
      }
      if (isFound(cancelPromo)) {
        cart.cart.promo = null
        this.setState({
          cancelPromo: { ...this.state.cancelPromo, submitting: false },
          cart: {...this.state.cart, data: cart}
        })
      }
    }
  }

  render () {
    let { cart, notification } = this.state
    return (
      <Section className={`${cart.emptyCart && 'content'}`}>
        {
          !cart.emptyCart &&
          <Notification
            type={notification.type}
            isShow={notification.status}
            activeClose
            onClose={() => this.setState({notification: {status: false, message: ''}})}
            message={notification.message} />
        }
        { cart.emptyCart && <EmptyCart /> }
        { !cart.emptyCart && cart.data.isFound &&
          <Cart
            {...this.state}
            deleteProductPress={(p) => this.deleteProductPress(p)}
            minPress={(p) => this.minPress(p)}
            plusPress={(p) => this.plusPress(p)}
            voucherShow={() => this.voucherShow()}
            voucherCancel={() => this.voucherCancel()}
            payNow={() => this.payNow()}
            voucherOnChange={(e) => this.voucherOnChange(e)}
            voucherSubmit={() => this.voucherSubmit()} />
        }
      </Section>
    )
  }
}

const Cart = (props) => {
  let { localize, cart, voucher, rsAddToCart, cancelPromo, deleteItem, submitting } = props
  console.log(cart)
  let data = cart.data
  let totalPayment = 0
  let promoCode = '-'
  let pricePromo = 0
  let errorStyle = {
    color: 'red',
    borderBottomColor: 'red'
  }

  data.cart.items.map((item) => {
    totalPayment += item.total_price
  })

  totalPayment += data.cart.unique_code

  if (data.cart.promo) {
    pricePromo = Promo({ ...data.cart, totalPayment })
    promoCode = data.cart.promo.promo_code
  }

  return (
    <Content>
      {
          // field items by default not found
          data.cart.items.map((item) => {
            let isSubmitting = rsAddToCart.submitting && (rsAddToCart.productClick === item.product.id)
            return (
              <section className='section is-paddingless has-shadow' key={item.id}>
                <div className='detail-product'>
                  <div className='purchase'>
                    <figure className='img-item' style={{ width: 50 }}>
                      <MyImage src={item.product.image} alt={item.product.store.name} />
                    </figure>
                    <h3>{item.product.name}</h3>
                    <span className='price'>{item.product.store.name}</span>
                  </div>
                  {
                    deleteItem.submitting && deleteItem.productClick === item.id
                    ? <Loading size={14} type='ovals' color='#ef5656' className='remove-item' />
                    : <a onClick={() => props.deleteProductPress(item)} className='remove-item'>{localize.delete}</a>
                  }
                </div>
                <div className='info-purchase'>
                  <div className='detail-rate is-purchase'>
                    <div className='columns total-items is-mobile is-multiline no-margin-bottom'>
                      <div className='column is-half'>
                        <div className='rating-content is-left'>
                          <strong>{localize.price_piece}</strong>
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
                          <strong>{localize.amount}</strong>
                        </div>
                      </div>
                      <div className='column is-half is-paddingless'>
                        <div className='rating-content item-qty'>
                          <a onClick={() => !isSubmitting && props.minPress(item)}><span className='icon-qty-min' /></a>
                          <span className='qty'>{ isSubmitting ? <Loading size={14} type='ovals' color='#ef5656' className='remove-item' /> : item.qty }</span>
                          <a onClick={() => !isSubmitting && props.plusPress(item)}><span className='icon-qty-plus' /></a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='see-all' onClick={() => Router.push('/shipping-detail?id=' + item.id)}>
                  <span className='link'>{localize.delivery} <span className='icon-arrow-right' /></span>
                </div>
                <div className='info-purchase'>
                  <div className='detail-rate is-purchase'>
                    <div className='columns total-items is-mobile is-multiline no-margin-bottom'>
                      <div className='column is-half'>
                        <div className='rating-content is-left'>
                          <strong>{localize.sub_total}</strong>
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
                <p>{localize.have_voucher_code}</p>
              </div>
              <div className='column is-half is-paddingless has-text-right'>
                <a onClick={() => props.voucherShow()} className='js-option' data-target='#voucherCode'>{localize.use_voucher_code}</a>
              </div>
            </div>
          </div>
        </div>
        {
          promoCode !== '-' &&
          <div className='detail-purchase summary'>
            <div className='detail-result cancel-voucher'>
              <ul>
                <li>
                  <div className='columns custom is-mobile'>
                    <div className='column is-half'>
                      <span>{ promoCode }</span>
                      <br />
                      <span className='voucher-credit'>- Rp { RupiahFormat(pricePromo) }</span></div>
                    <div className='column is-half has-text-right'><a onClick={() => props.voucherCancel()} className='cancel'> { cancelPromo.submitting ? <Loading size={14} type='ovals' color='#ef5656' className='is-fullwidth' /> : 'Batal' } </a></div>
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
                <p>{localize.total_payment}</p>
                <p className='price-pay'>Rp { RupiahFormat(totalPayment - pricePromo) }</p>
              </div>
              <div className='column is-half is-paddingless has-text-right'>
                <button onClick={() => !submitting && props.payNow()} className={`button is-primary is-large is-fullwidth ${submitting && 'is-loading'}`}>Bayar Sekarang</button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className='sort-option' style={{ display: voucher.show && 'block' }}>
        <div className='notif-report add-voucher'>
          <div className='header-notif'>
            <h3>{localize.use_voucher_code}</h3>
            <span onClick={() => props.voucherShow()} className='icon-close' />
          </div>
          <div className='field'>
            <label className='label' style={voucher.invalid ? errorStyle : {}}>{localize.input_voucher_code}</label>
            <p className='control'>
              <input style={voucher.invalid ? errorStyle : {}} className='input' type='text' onChange={(e) => props.voucherOnChange(e)} value={voucher.code} />
              <br />
              <br />
              <span style={errorStyle}>{ voucher.message }</span>
            </p>
          </div>
          <button onClick={() => !voucher.submitting && props.voucherSubmit()} className={`button is-primary is-large is-fullwidth ${voucher.submitting && 'is-loading'}`}>{localize.use_voucher_code}</button>
        </div>
      </div>
    </Content>
  )
}

const EmptyCart = () => {
  return (
    <div style={{ width: '100%', height: '100%', backgroundColor: '#fff', position: 'fixed' }}>
      <section className='content' style={{ position: 'absolute', top: '40%', left: 0, width: '100%', transform: 'translateY(-50%)' }}>
        <div className='container is-fluid'>
          <div className='desc has-text-centered'>
            <MyImage src={Images.cart} alt='notFound' />
            <p><strong>Belum ada barang di Keranjang Belanja</strong></p>
            <p>Anda belum memasukkan barang ke keranjang belanja Anda</p>
          </div>
          <a
            onClick={(e) => {
              e.preventDefault()
              Router.push('/product')
            }}
            className='button is-primary is-large is-fullwidth'>
            Belanja Sekarang
          </a>
        </div>
      </section>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    rsAddToCart: state.addToCart,
    deleteItem: state.deleteItem,
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
    cancelPromoPress: () => dispatch(cartActions.cancelPromo()),
    checkout: (params) => dispatch(cartActions.checkout(params))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCart)
