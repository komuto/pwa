import React, { Component } from 'react'
import { connect } from 'react-redux'
import Router from 'next/router'
// Components
import MyImage from '../Components/MyImage'
// import Notification from '../Components/Notification'
import NProgress from 'nprogress'
// Themes
// import Images from '../Themes/Images'
// actions
import * as userActions from '../actions/user'
import * as paymentActions from '../actions/payment'
import * as cartActions from '../actions/cart'
// lib
import RupiahFormat from '../Lib/RupiahFormat'
// services
import { Status } from '../Services/Status'

class Payment extends Component {
  constructor (props) {
    super(props)
    this.state = {
      cart: props.cart || null,
      balance: props.balance || null,
      paymentMethods: props.paymentMethods || null,
      snapToken: props.snapToken || null,
      submiting: false,
      notification: {
        type: 'is-danger',
        status: false,
        message: 'Error, default message.'
      }
    }
  }

  async componentWillMount () {
    await this.props.getBalance()
    await this.props.getPaymentMethods()
    await this.props.getCart()
    await this.props.getMidtransToken()
  }

  paymentRedirect (pm) {
    pm.id === 1 && Router.push(`/payment-bank-transfer?type=${pm.id}`)
    pm.id === 13 && Router.push(`/payment-doku?type=${pm.id}`)
  }

  paymentMidtrans () {
    const { snapToken } = this.state
    if (snapToken.isFound) {
      snap.pay(snapToken.token, {
        onSuccess: (result) => {
          console.log('success')
          console.log(result)
        },
        onPending: (result) => {
          console.log('pending')
          console.log(result)
        },
        onError: (result) => {
          console.log('error')
          console.log(result)
        },
        onClose: () => {
          console.log('customer closed the popup without finishing the payment')
        }
      })
    } else {
      console.log('Token not found!')
    }
  }

  componentWillReceiveProps (nextProps) {
    const { balance, paymentMethods, cart, snapToken } = nextProps
    let { notification } = this.state
    notification = {status: false, message: 'Error, default message.'}

    if (!snapToken.isLoading) {
      switch (snapToken.status) {
        case Status.SUCCESS :
          if (!snapToken.isFound) notification = {type: 'is-danger', status: true, message: 'Token tidak ditemukan'}
          break
        case Status.OFFLINE :
        case Status.FAILED :
          notification = {type: 'is-danger', status: true, message: balance.message}
          break
        default:
          break
      }
      this.setState({ snapToken, notification })
    }

    if (!balance.isLoading) {
      switch (balance.status) {
        case Status.SUCCESS :
          if (!balance.isFound) notification = {type: 'is-danger', status: true, message: 'Data produk tidak ditemukan'}
          break
        case Status.OFFLINE :
        case Status.FAILED :
          notification = {type: 'is-danger', status: true, message: balance.message}
          break
        default:
          break
      }
      this.setState({ balance, notification })
    }

    if (!paymentMethods.isLoading) {
      switch (paymentMethods.status) {
        case Status.SUCCESS :
          if (!paymentMethods.isFound) notification = {type: 'is-danger', status: true, message: 'Data payment method tidak ditemukan'}
          break
        case Status.OFFLINE :
        case Status.FAILED :
          notification = {type: 'is-danger', status: true, message: paymentMethods.message}
          break
        default:
          break
      }
      this.setState({ paymentMethods, notification })
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
  }

  render () {
    const { balance, paymentMethods, cart } = this.state
    const { promo } = cart.cart
    let totalPayment = 0

    console.log(paymentMethods)

    if (!paymentMethods.isFound) return null

    if (cart.cart.items) {
      cart.cart.items.map((item) => {
        totalPayment += item.total_price
      })
    }

    if (promo) totalPayment = totalPayment - promo.nominal

    return (
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
        <div className='box-rounded' onClick={() => this.paymentMidtrans()}>
          <div className='payment-method'>
            paymentMidtrans()
            <span className='icon-arrow-right' />
          </div>
        </div>
        {
          paymentMethods.paymentMethods.map((pm) => {
            return (
              <div className='box-rounded' key={pm.id} onClick={() => this.paymentRedirect(pm)}>
                <div className='payment-method'>
                  { pm.name }
                  <span className='icon-arrow-right' />
                </div>
                <ul className='list-inline pay-method-option'>
                  <li><a><MyImage src={pm.logo} alt='' style={{ width: '70%' }} /></a></li>
                </ul>
              </div>
            )
          })
        }
      </section>
    )
  }
}

const mapStateToProps = (state) => ({
  cart: state.cart,
  balance: state.balance,
  paymentMethods: state.paymentMethods,
  snapToken: state.snapToken
})

const mapDiaptchToProps = (dispatch) => ({
  getCart: () => dispatch(cartActions.getCart()),
  getBalance: () => dispatch(userActions.getBalance()),
  getPaymentMethods: () => dispatch(paymentActions.getPaymentMethods()),
  getMidtransToken: () => dispatch(paymentActions.getMidtransToken())
})

export default connect(mapStateToProps, mapDiaptchToProps)(Payment)
