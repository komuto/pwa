/**
 * Safei Muslim
 * Updated : Yogyakarta , 3 Oktober 2017
 * PT Skyshi Digital Indonesa
 */

 /** including depedencies */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import Router from 'next/router'
import NProgress from 'nprogress'
/** including components */
import MyImage from '../Components/MyImage'
import Loading from '../Components/Loading'
import Notification from '../Components/Notification'
import Content from '../Components/Content'
/** including actions */
import * as userActions from '../actions/user'
import * as paymentActions from '../actions/payment'
import * as cartActions from '../actions/cart'
import * as transactionActions from '../actions/transaction'
/** including lib */
import RupiahFormat from '../Lib/RupiahFormat'
import Midtrans from '../Lib/Midtrans'

/**
 * paymentType=[bucket, transaction]
 * flow checkout->get snapToken->showPayment
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
      transaction: false,
      balancePayment: false
    }
  }

  componentDidMount () {
    let { idT } = this.state

    NProgress.start()

    /** get cart when payment type bucket  */
    if (this.isBucketPayment()) {
      this.submitting = { ...this.submitting, cart: true }
      this.props.getCart()
    }

    /** get transaction when payment type transaction  */
    if (this.isTransactionPayment()) {
      this.submitting = { ...this.submitting, transaction: true }
      this.props.getTransaction({ id: idT })
    }

    /** get balance */
    this.submitting = { ...this.submitting, balance: true }
    this.props.getBalance()
  }

  /** payment with midtrans */
  paymentMidtrans () {
    /** call midtrans from bucket/shopping cart */
    this.setCheckout()
    /** call midtrans from bucket/shopping cart */
    this.getMidtransTokenTrans()
  }

  /** payment with balance */
  paymentBalance () {
    this.submitting = {...this.submitting, balancePayment: true, checkout: true}

    this.setCheckout()

    if (this.isTransactionPayment()) {
      this.redirectToPaymentBalance()
    }
  }

  /** checkout */
  setCheckout () {
    if (this.isBucketPayment()) {
      this.submitting = {...this.submitting, checkout: true}
      this.props.setCheckout({'is_wallet': false})
    }
  }

  /** get mindtrans token for transaction */
  getMidtransTokenTrans () {
    let { transaction } = this.state
    let { isFound } = this.props
    if (this.isTransactionPayment() && isFound(transaction)) {
      this.submitting = { ...this.submitting, snapToken: true }
      this.props.getMidtransToken({ id: transaction.transaction.bucket.id, platform: 'pwa' })
    }
  }

  /** is payment for bucket */
  isBucketPayment () {
    return this.state.paymentType === 'bucket'
  }

  /** is payment for transaction */
  isTransactionPayment () {
    return this.state.paymentType === 'transaction'
  }

  /** redirect to payment balance page */
  redirectToPaymentBalance () {
    let { paymentType, idT } = this.state
    Router.push(`/payment-balance?paymentType=${paymentType}&idT=${idT}`)
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
        if (this.submitting.balancePayment) {
          this.submitting = {...this.submitting, checkout: false, balancePayment: false}
          this.redirectToPaymentBalance()
        } else if (isFound(cart)) {
          this.submitting = {...this.submitting, checkout: false, snapToken: true}
          this.props.getMidtransToken({ id: cart.cart.id, platform: 'pwa' })
        }
      }
    }

    // handling state get snapToken
    if (!isFetching(snapToken) && this.submitting.snapToken) {
      if (isError(snapToken)) {
        this.setState({ notification: notifError(snapToken.message) })
      }
      if (isFound(snapToken)) {
        // this.loadMidtransPayment(snapToken.token)
        Midtrans({...snapToken})
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
      this.submitting = { ...this.submitting, cart: false }
      if (isError(cart)) {
        this.setState({ notification: notifError(cart.message) })
      }
      if (isFound(cart)) {
        this.setState({ cart })
      }
    }

    // handling state get transaction
    if (!isFetching(transaction) && this.submitting.transaction) {
      NProgress.done()
      this.submitting = { ...this.submitting, transaction: false }
      if (isError(transaction)) {
        this.setState({ notification: notifError(transaction.message) })
      }
      if (isFound(transaction)) {
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
          paymentBalance={() => this.paymentBalance()}
          isBucketPayment={() => this.isBucketPayment()}
          isTransactionPayment={() => this.isTransactionPayment()}
          paymentMidtrans={() => this.paymentMidtrans()} />
        }
      </Content>
    )
  }
}

const Paymentcontent = (props) => {
  let { cart, transaction, paymentType, idT, snapToken, balance, submitting, paymentBalance, failTransaction, isBucketPayment, isTransactionPayment } = props
  let totalPayment = 0

  /** count total payment when type is bucket */
  if (isBucketPayment()) {
    cart.cart.items.map((item) => {
      totalPayment += item.total_price
    })
  }

  /** count total payment when type is transaction */
  if (isTransactionPayment()) {
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
        <div className='box-rounded' onClick={() => !submitting.balance && balance.isFound && paymentBalance()}>
          <div className='payment-method'>
            Saldo (Rp { RupiahFormat(balance.balance.user_balance) })
            {
              submitting.balance
              ? <span className='has-text-right' style={{ position: 'absolute', right: 20 }}><Loading size={14} type='ovals' color='#ef5656' /></span>
              : <span className='icon-arrow-right' />
            }
          </div>
        </div>
        <div className='box-rounded' onClick={() => (!submitting.snapToken || !submitting.checkout) && props.paymentMidtrans()}>
          <div className='payment-method'>
            Metode Pembayaran Lainnya
            {
              submitting.snapToken || submitting.checkout
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
