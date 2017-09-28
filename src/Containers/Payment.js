import React, { Component } from 'react'
import { connect } from 'react-redux'
import Router from 'next/router'
// import NProgress from 'nprogress'
// Components
import MyImage from '../Components/MyImage'
import Loading from '../Components/Loading'
import Notification from '../Components/Notification'
import Content from '../Components/Content'
// Themes
// import Images from '../Themes/Images'
// actions
import * as userActions from '../actions/user'
import * as paymentActions from '../actions/payment'
import * as cartActions from '../actions/cart'
// lib
import RupiahFormat from '../Lib/RupiahFormat'
// services
import { isFetching, isError, isFound, notifError } from '../Services/Status'

class Payment extends Component {
  constructor (props) {
    super(props)
    this.state = {
      cart: props.cart || null,
      type: props.query.type || false,
      balance: props.balance || null,
      snapToken: props.snapToken || null,
      notification: props.notification || null,
      failTransaction: false
    }
    this.submiting = {
      balance: false,
      cart: false,
      snapToken: false,
      checkoutMidtrans: false,
      checkoutBalance: false
    }
  }

  async componentWillMount () {
    this.submiting = {
      ...this.submiting,
      balance: true,
      cart: true
    }
    await this.props.getBalance()
    await this.props.getCart()
  }

  paymentMidtrans () {
    this.submiting = {...this.submiting, checkoutMidtrans: true}
    this.props.setCheckout({'is_wallet': false})
  }

  paymentBalance () {
    this.submiting = {...this.submiting, checkoutBalance: true}
    this.props.setCheckout({'is_wallet': true})
    // Router.push('/pay-with-balance')
  }

  loadMidtransPayment (token) {
    snap.pay(token, {
      onSuccess: (result) => {
        Router.push('/payment?type=finish')
      },
      onPending: (result) => {
        Router.push('/payment?type=unfinish')
      },
      onError: (result) => {
        Router.push('/payment?type=error')
      },
      onClose: () => {
        Router.push('/transaction')
      }
    })
  }

  componentWillReceiveProps (nextProps) {
    let { balance, cart, snapToken, checkout } = nextProps

    // handling state set checkout
    if (!isFetching(checkout) && this.submiting.checkoutMidtrans) {
      if (isError(checkout)) {
        this.setState({ notification: notifError(checkout.message) })
      }
      if (isFound(checkout)) {
        this.submiting = {...this.submiting, checkoutMidtrans: false}
        this.loadMidtransPayment(snapToken.token)
      }
    }

    // handling state get snapToken
    if (!isFetching(snapToken) && this.submiting.snapToken) {
      console.log(snapToken)
      if (isError(snapToken)) {
        this.setState({ notification: notifError(snapToken.message) })
      }
      if (isFound(snapToken)) {
        this.submiting = {...this.submiting, snapToken: false}
        this.setState({ snapToken })
      }
    }

    // handling state get balance
    if (!isFetching(balance) && this.submiting.balance) {
      if (isError(balance)) {
        this.setState({ notification: notifError(balance.message) })
      }
      if (isFound(balance)) {
        this.submiting = {...this.submiting, balance: false}
        this.setState({ balance })
      }
    }

    // handling state get cart
    if (!isFetching(cart) && this.submiting.cart) {
      if (isError(cart)) {
        this.setState({ notification: notifError(cart.message) })
      }
      if (isFound(cart)) {
        this.submiting = { ...this.submiting, cart: false, snapToken: true }
        this.props.getMidtransToken({ id: cart.cart.id, platform: 'pwa' })
        this.setState({ cart })
      }
    }
  }

  render () {
    let { balance, cart, snapToken, failTransaction, type, notification } = this.state
    let { promo } = cart.cart
    let totalPayment = 0
    console.log(snapToken)
    if (cart.cart.items) {
      cart.cart.items.map((item) => {
        totalPayment += item.total_price
      })
    }

    if (promo) totalPayment = totalPayment - promo.nominal

    if (type && type === 'error') {
      failTransaction = true
    }

    return (
      <Content>
        <Notification
          type={notification.type}
          isShow={notification.status}
          activeClose
          onClose={() => this.setState({notification: {status: false, message: ''}})}
          message={notification.message} />
        <section className='section payment'>
          <div className='box-rounded'>
            <div className='total-detail'>
              <ul className='list-inline col2'>
                <li>
                  <span>Total Pembayaran</span>
                  <span className='price'>Rp { RupiahFormat(totalPayment) }</span>
                </li>
                <li className='has-text-right'>
                  <a onClick={() => Router.push('/shopping-cart')} className='button is-primary is-outlined full-rounded'>Detail</a>
                </li>
              </ul>
              <div className='text-msg'>
                Harga sudah termasuk pajak dan biaya lainnya
              </div>
            </div>
          </div>

          <div className='title-content'>
            <h3>Pilih Metode Pembayaran</h3>
          </div>
          <div className='box-rounded' onClick={() => this.paymentBalance()}>
            <div className='payment-method'>
              Saldo (Rp { RupiahFormat(balance.balance.user_balance) })
              <span className='icon-arrow-right' />
            </div>
          </div>
          <div className='box-rounded' onClick={() => !this.submiting.snapToken && snapToken.isFound && this.paymentMidtrans()}>
            <div className='payment-method'>
              Metode Pembayaran Lainnya
              {
                this.submiting.snapToken
                ? <span className='has-text-right' style={{ position: 'absolute', right: 20 }}><Loading size={14} type='ovals' color='#ef5656' /></span>
                : <span className='icon-arrow-right' />
              }
            </div>
          </div>
        </section>
        <div className='sort-option' style={{ display: failTransaction ? 'block' : 'none' }}>
          <div className='notif-report'>
            <MyImage src='../images/reg-success.svg' />
            <h3>Pembayaran gagal</h3>
            <p>Mohon maaf kami tidak berhasil melakukan pembayaran anda!</p>
            <button className='button is-primary is-large is-fullwidth'>Coba lagi</button>
            <button onClick={() => !this.submiting.snapToken && snapToken.data.isFound && this.paymentMidtrans()} className='button is-primary is-large is-fullwidth is-outlined'>Pilih metode pembayaran lainya</button>
          </div>
        </div>
      </Content>
    )
  }
}

const mapStateToProps = (state) => ({
  cart: state.cart,
  balance: state.balance,
  snapToken: state.snapToken,
  checkout: state.checkout
})

const mapDiaptchToProps = (dispatch) => ({
  getCart: () => dispatch(cartActions.getCart()),
  getBalance: () => dispatch(userActions.getBalance()),
  getMidtransToken: (params) => dispatch(paymentActions.getMidtransToken(params)),
  setCheckout: (params) => dispatch(cartActions.checkout(params))
})

export default connect(mapStateToProps, mapDiaptchToProps)(Payment)
