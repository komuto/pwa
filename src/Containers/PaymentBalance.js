import React, { Component } from 'react'
import { connect } from 'react-redux'
import Router from 'next/router'
import NProgress from 'nprogress'
// Component
import Content from '../Components/Content'
import Notification from '../Components/Notification'
// actions
import * as cartActions from '../actions/cart'
import * as userActions from '../actions/user'
import * as transactionActions from '../actions/transaction'
// libs
import RupiahFormat from '../Lib/RupiahFormat'
import Promo from '../Lib/Promo'

class PaymentBalance extends Component {
  constructor (props) {
    super(props)
    this.state = {
      cart: props.cart || null,
      transaction: props.transaction || null,
      paymentType: props.query.paymentType || null,
      idT: props.query.idT || null,
      balance: props.balance || null,
      checkout: props.checkout || null,
      notification: props.notification
    }
    this.submitting = {
      balance: false,
      cart: false,
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

  paymentBalance () {
    this.submitting = {...this.submitting, checkout: true}
    this.props.setCheckout({'is_wallet': true})
  }

  componentWillReceiveProps (nextProps) {
    let { isFetching, isError, isFound, notifError } = this.props
    let { cart, transaction, balance, checkout } = nextProps

    // handling state set checkout
    if (!isFetching(checkout) && this.submitting.checkout) {
      this.submitting = {...this.submitting, checkout: false}
      if (isError(checkout)) {
        this.setState({ notification: notifError(checkout.message) })
      }
      if (isFound(checkout)) {
        Router.push('/payment-success')
      }
    }

    // handling state get cart
    if (!isFetching(cart) && this.submitting.cart) {
      NProgress.done()
      this.submitting = {...this.submitting, cart: false}
      if (isError(cart)) {
        this.setState({ notification: notifError(cart.message) })
      }
      if (isFound(cart)) {
        this.setState({ cart })
      }
    }
    // handling state get balance
    if (!isFetching(balance) && this.submitting.balance) {
      this.submitting = {...this.submitting, balance: false}
      if (isError(balance)) {
        this.setState({ notification: notifError(balance.message) })
      }
      if (isFound(balance)) {
        this.setState({ balance })
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
    let { cart, paymentType, transaction, notification } = this.state
    let status = false

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
        {
            status &&
              <PaymentBalanceContent
                {...this.state}
                submitting={this.submitting}
                paymentBalance={() => this.paymentBalance()} />
          }
      </Content>
    )
  }
}

const PaymentBalanceContent = (props) => {
  let { cart, transaction, paymentType, submitting } = props
  let totalPayment = 0
  let promoCode = '-'
  let pricePromo = 0

  if (paymentType === 'bucket') {
    let myCart = cart.cart

    myCart.items.map((item) => {
      totalPayment += item.total_price
    })

    if (myCart.promo) {
      pricePromo = Promo({...myCart, totalPayment})
      promoCode = myCart.promo.promo_code
    }
  }

  if (paymentType === 'transaction') {
    let { summary_transaction, bucket } = transaction.transaction

    totalPayment = summary_transaction.total_price

    if (bucket.promo) {
      pricePromo = Promo({...bucket, totalPayment})
      promoCode = bucket.promo.promo_code
    }
  }

  return (
    <Content>
      <section className='section is-paddingless has-shadow'>
        <div className='payment-detail step-pay'>
          <ul>
            <li>
              <div className='columns is-mobile is-multiline no-margin-bottom'>
                <div className='column'>
                  <div className='label-text is-left'>
                    <span>Rincian Harga</span>
                  </div>
                </div>
              </div>
            </li>
            <li>
              <ul className='total-pay'>
                <li>
                  <div className='columns is-mobile is-multiline no-margin-bottom'>
                    <div className='column'>
                      <div className='label-text is-left'>
                        <span>
                            Total Belanja
                          </span>
                      </div>
                    </div>
                    <div className='column is-one-third'>
                      <div className='has-text-right'>
                        <span>Rp {RupiahFormat(totalPayment)}</span>
                      </div>
                    </div>
                  </div>
                  <div className='columns is-mobile is-multiline no-margin-bottom'>
                    <div className='column'>
                      <div className='label-text is-left'>
                        <span className='pay-code'>
                            Kode Voucher { promoCode }
                        </span>
                      </div>
                    </div>
                    <div className='column is-one-third'>
                      <div className='has-text-right'>
                        <span className='pay-code'> Rp -{RupiahFormat(pricePromo)}</span>
                      </div>
                    </div>
                  </div>
                </li>
                <li>
                  <div className='columns is-mobile is-multiline no-margin-bottom'>
                    <div className='column'>
                      <div className='label-text is-left'>
                        <span>
                            Sisa Pembayaran
                          </span>
                      </div>
                    </div>
                    <div className='column is-one-third'>
                      <div className='has-text-right'>
                        <span>Rp {RupiahFormat(totalPayment - pricePromo)}</span>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </section>
      <section className='section is-paddingless'>
        <div className='payment-detail action' style={{ backgroundColor: '#f4f5f6' }}>
          <ul>
            <li>
              <span>Dengan menekan tombol "Lanjutkan" Anda telah menyetujui Syarat dan Ketentuan dari Komuto</span>
              <a onClick={() => !submitting.checkout && props.paymentBalance()} className={`button is-primary is-large is-fullwidth ${submitting.checkout ? 'is-loading' : ''}`}>Bayar dengan Saldo</a>
            </li>
          </ul>
        </div>
      </section>
    </Content>
  )
}

const mapStateToProps = (state) => ({
  cart: state.cart,
  transaction: state.transaction,
  balance: state.balance,
  checkout: state.checkout
})

const mapDispatchToProps = (dispatch) => ({
  getCart: () => dispatch(cartActions.getCart()),
  getTransaction: (params) => dispatch(transactionActions.getTransaction(params)),
  getBalance: () => dispatch(userActions.getBalance()),
  setCheckout: (params) => dispatch(cartActions.checkout(params))
})

export default connect(mapStateToProps, mapDispatchToProps)(PaymentBalance)
