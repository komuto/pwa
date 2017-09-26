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
import { validateResponse, isFetching } from '../Services/Status'

class Payment extends Component {
  constructor (props) {
    super(props)
    this.state = {
      cart: props.cart || null,
      balance: props.balance || null,
      snapToken: {
        data: props.snapToken || null,
        submiting: true
      },
      submiting: false,
      notification: {
        type: 'is-danger',
        status: false,
        message: 'Error, default message.'
      },
      failTransaction: false
    }
    this.checkoutMidtrans = false
    this.loadingSpan = <span className='has-text-right' style={{ position: 'absolute', right: 20 }}><Loading size={14} type='ovals' color='#ef5656' /></span>
    this.submiting = {
      balance: false,
      cart: false
    }
  }

  async componentWillMount () {
    this.submiting = {
      balance: true,
      cart: true
    }
    await this.props.getBalance()
    await this.props.getCart()
  }

  paymentMidtrans () {
    this.props.setCheckout({'is_wallet': false})
    this.checkoutMidtrans = true
  }

  loadMidtransPayment (token) {
    snap.pay(token, {
      onSuccess: (result) => {
        Router.push('/payment?type=success')
      },
      onPending: (result) => {
        Router.push('/payment?type=pending')
      },
      onError: (result) => {
        this.setState({ failTransaction: true })
      },
      onClose: () => {
        Router.push('/transaction')
      }
    })
  }

  componentWillReceiveProps (nextProps) {
    const { balance, cart, snapToken, checkout } = nextProps
    if (!isFetching(checkout)) {
      if (checkout.isFound && this.checkoutMidtrans) {
        this.checkoutMidtrans = false
        this.loadMidtransPayment(snapToken.token)
      } else {
        this.setState({ notification: validateResponse(checkout, 'Checkout gagal!') })
      }
    }

    if (!isFetching(snapToken)) {
      this.setState({ snapToken: { data: snapToken, submiting: snapToken.isLoading }, notification: validateResponse(snapToken, 'Snap token tidak ditemukan!') })
    }

    if (!isFetching(balance)) {
      this.setState({ balance, notification: validateResponse(balance, 'Balance tidak ditemukan!') })
    }

    if (this.submiting.cart && !isFetching(cart)) {
      if (cart.isFound) {
        this.submiting = {
          ...this.submiting,
          cart: false
        }
        this.props.getMidtransToken({ id: cart.cart.id })
      }
      this.setState({ cart, notification: validateResponse(cart, 'Keranjang belanja tidak ditemukan!') })
    }
  }

  render () {
    const { balance, cart, snapToken, failTransaction, notification } = this.state
    const { promo } = cart.cart
    let totalPayment = 0

    if (cart.cart.items) {
      cart.cart.items.map((item) => {
        totalPayment += item.total_price
      })
    }

    if (promo) totalPayment = totalPayment - promo.nominal

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
          <div className='box-rounded' onClick={() => Router.push('/pay-with-balance')}>
            <div className='payment-method'>
              Saldo (Rp { RupiahFormat(balance.balance.user_balance) })
              <span className='icon-arrow-right' />
            </div>
          </div>
          <div className='box-rounded' onClick={() => !snapToken.submiting && snapToken.data.isFound && this.paymentMidtrans()}>
            <div className='payment-method'>
              Metode Pembayaran Lainnya
              {
                snapToken.submiting
                ? this.loadingSpan
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
            <button onClick={() => !snapToken.submiting && snapToken.data.isFound && this.paymentMidtrans()} className='button is-primary is-large is-fullwidth is-outlined'>Pilih metode pembayaran lainya</button>
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
