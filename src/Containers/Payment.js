import React, { Component } from 'react'
import { connect } from 'react-redux'
import Router from 'next/router'
import NProgress from 'nprogress'
// Components
import MyImage from '../Components/MyImage'
import Loading from '../Components/Loading'
import Notification from '../Components/Notification'
import Content from '../Components/Content'
// actions
import * as userActions from '../actions/user'
import * as paymentActions from '../actions/payment'
import * as cartActions from '../actions/cart'
import * as transactionActions from '../actions/transaction'
// lib
import RupiahFormat from '../Lib/RupiahFormat'

/**
 * paymentType=[bucket, transaction]
 */

class Payment extends Component {
  constructor (props) {
    super(props)
    this.state = {
      cart: props.cart || null,
      transaction: props.transaction || null,
      type: props.query.type || false,
      paymentType: props.query.paymentType || null,
      idT: props.query.idT || null,
      balance: props.balance || null,
      snapToken: props.snapToken || null,
      notification: props.notification,
      failTransaction: false
    }
    this.submitting = {
      balance: false,
      cart: false,
      snapToken: false,
      checkout: false,
      transaction: false
    }
  }

  async componentDidMount () {
    let { paymentType, idT } = this.state

    NProgress.start()

    if (paymentType === 'bucket') {
      this.submitting = { ...this.submitting, cart: true }
      await this.props.getCart()
    }

    if (paymentType === 'transaction') {
      this.submitting = { ...this.submitting, transaction: true }
      await this.props.getTransaction({ id: idT })
    }

    this.submitting = { ...this.submitting, balance: true }
    await this.props.getBalance()
  }

  paymentMidtrans () {
    this.submitting = {...this.submitting, checkout: true}
    this.props.setCheckout({'is_wallet': false})
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
    let { balance, cart, transaction, snapToken, checkout } = nextProps
    let { isFetching, isError, isFound, notifError } = this.props

    // handling state set checkout
    if (!isFetching(checkout) && this.submitting.checkout) {
      if (isError(checkout)) {
        this.setState({ notification: notifError(checkout.message) })
      }
      if (isFound(checkout)) {
        this.submitting = {...this.submitting, checkout: false}
        this.loadMidtransPayment(snapToken.token)
      }
    }

    // handling state get snapToken
    if (!isFetching(snapToken) && this.submitting.snapToken) {
      if (isError(snapToken)) {
        this.setState({ notification: notifError(snapToken.message) })
      }
      if (isFound(snapToken)) {
        this.submitting = {...this.submitting, snapToken: false}
        this.setState({ snapToken })
      }
    }

    // handling state get balance
    if (!isFetching(balance) && this.submitting.balance) {
      if (isError(balance)) {
        this.setState({ notification: notifError(balance.message) })
      }
      if (isFound(balance)) {
        this.submitting = {...this.submitting, balance: false}
        this.setState({ balance })
      }
    }

    // handling state get cart
    if (!isFetching(cart) && this.submitting.cart) {
      NProgress.done()
      if (isError(cart)) {
        this.setState({ notification: notifError(cart.message) })
      }
      if (isFound(cart)) {
        this.submitting = { ...this.submitting, cart: false, snapToken: true }
        this.props.getMidtransToken({ id: cart.cart.id, platform: 'pwa' })
        this.setState({ cart })
      }
    }

    // handling state get transaction
    if (!isFetching(transaction) && this.submitting.transaction) {
      NProgress.done()
      if (isError(transaction)) {
        this.setState({ notification: notifError(transaction.message) })
      }
      if (isFound(transaction)) {
        this.submitting = { ...this.submitting, transaction: false, snapToken: true }
        this.props.getMidtransToken({ id: transaction.transaction.bucket.id, platform: 'pwa' })
        this.setState({ transaction })
      }
    }
  }

  render () {
    let { cart, transaction, paymentType, failTransaction, type, notification } = this.state
    let status = false

    if (type && type === 'error') {
      failTransaction = true
    }

    if (paymentType === 'bucket') {
      status = cart.isFound
    }

    if (paymentType === 'transaction') {
      status = transaction.isFound
    }

    return (
      <Content>
        <Notification
          type={notification.type}
          isShow={notification.status}
          activeClose
          onClose={() => this.setState({notification: {status: false, message: ''}})}
          message={notification.message} />
        { status &&
        <Paymentcontent
          {...this.state}
          failTransaction={failTransaction}
          submitting={this.submitting}
          paymentMidtrans={() => this.paymentMidtrans()} />
        }
      </Content>
    )
  }
}

const Paymentcontent = (props) => {
  let { cart, transaction, paymentType, idT, snapToken, balance, submitting, failTransaction } = props
  let totalPayment = 0

  if (paymentType === 'bucket') {
    cart.cart.items.map((item) => {
      totalPayment += item.total_price
    })
  }

  if (paymentType === 'transaction') {
    totalPayment = transaction.transaction.summary_transaction.total_price
  }

  return (
    <Content>
      <section className='section payment'>
        <div className='box-rounded'>
          <div className='total-detail'>
            <ul className='list-inline col2'>
              <li>
                <span>Total Pembayaran</span>
                <span className='price'>Rp { RupiahFormat(totalPayment) }</span>
              </li>
              <li className='has-text-right'>
                <a onClick={() => paymentType === 'bucket' ? Router.push('/shopping-cart') : Router.push(`/transaction-detail?id=${idT}`)} className='button is-primary is-outlined full-rounded'>Detail</a>
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
        <div className='box-rounded' onClick={() => !submitting.balance && balance.isFound && Router.push(`/payment-balance?paymentType=${paymentType}&idT=${idT}`)}>
          <div className='payment-method'>
            Saldo (Rp { RupiahFormat(balance.balance.user_balance) })
            {
              submitting.balance
              ? <span className='has-text-right' style={{ position: 'absolute', right: 20 }}><Loading size={14} type='ovals' color='#ef5656' /></span>
              : <span className='icon-arrow-right' />
            }
          </div>
        </div>
        <div className='box-rounded' onClick={() => !submitting.snapToken && snapToken.isFound && props.paymentMidtrans()}>
          <div className='payment-method'>
            Metode Pembayaran Lainnya
            {
              submitting.snapToken
              ? <span className='has-text-right' style={{ position: 'absolute', right: 20 }}><Loading size={14} type='ovals' color='#ef5656' /></span>
              : <span className='icon-arrow-right' />
            }
          </div>
        </div>
      </section>
      <div className='sort-option' style={{ display: failTransaction ? 'block' : 'none' }}>
        <div className='notif-report'>
          <MyImage src='../images/reg-success.svg' alt='regSuccess' />
          <h3>Pembayaran gagal</h3>
          <p>Mohon maaf kami tidak berhasil melakukan pembayaran anda!</p>
          <button className='button is-primary is-large is-fullwidth'>Coba lagi</button>
          <button onClick={() => !this.submitting.snapToken && snapToken.data.isFound && this.paymentMidtrans()} className='button is-primary is-large is-fullwidth is-outlined'>Pilih metode pembayaran lainya</button>
        </div>
      </div>
    </Content>
  )
}

const mapStateToProps = (state) => ({
  cart: state.cart,
  transaction: state.transaction,
  balance: state.balance,
  snapToken: state.snapToken,
  checkout: state.checkout
})

const mapDiaptchToProps = (dispatch) => ({
  getCart: () => dispatch(cartActions.getCart()),
  getTransaction: (params) => dispatch(transactionActions.getTransaction(params)),
  getBalance: () => dispatch(userActions.getBalance()),
  getMidtransToken: (params) => dispatch(paymentActions.getMidtransToken(params)),
  setCheckout: (params) => dispatch(cartActions.checkout(params))
})

export default connect(mapStateToProps, mapDiaptchToProps)(Payment)
