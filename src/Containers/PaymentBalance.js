import React, { Component } from 'react'
import { connect } from 'react-redux'
import Router from 'next/router'
// Component
import Content from '../Components/Content'
import Notification from '../Components/Notification'
// actions
import * as cartActions from '../actions/cart'
import * as userActions from '../actions/user'
// libs
import RupiahFormat from '../Lib/RupiahFormat'
import Promo from '../Lib/Promo'

class PaymentBalance extends Component {
  constructor (props) {
    super(props)
    this.state = {
      cart: props.cart || null,
      balance: props.balance || null,
      checkout: props.checkout || null,
      notification: props.notification
    }
    this.submitting = {
      balance: false,
      cart: false,
      checkout: false
    }
  }

  async componentWillMount () {
    this.submitting = { ...this.submitting, balance: true, cart: true }
    await this.props.getBalance()
    await this.props.getCart()
  }

  paymentBalance () {
    this.submitting = {...this.submitting, checkout: true}
    this.props.setCheckout({'is_wallet': true})
  }

  componentWillReceiveProps (nextProps) {
    let { isFetching, isError, isFound, notifError } = this.props
    let { cart, balance, checkout } = nextProps

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
  }

  render () {
    let { cart, balance, notification } = this.state
    return (
      <Content>
        <Notification
          type={notification.type}
          isShow={notification.status}
          activeClose
          onClose={() => this.setState({notification: {status: false, message: ''}})}
          message={notification.message} />
        {
            cart.isFound &&
              <PaymentBalanceContent
                {...cart}
                {...balance}
                submitting={this.submitting}
                paymentBalance={() => this.paymentBalance()} />
          }
      </Content>
    )
  }
}

const PaymentBalanceContent = (props) => {
  let { cart, submitting } = props
  let totalPayment = 0
  let promoCode = '-'
  let pricePromo = 0

  cart.items.map((item) => {
    totalPayment += item.total_price
  })

  if (cart.promo) {
    pricePromo = Promo({...cart, totalPayment})
    promoCode = cart.promo.promo_code
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
  balance: state.balance,
  checkout: state.checkout
})

const mapDispatchToProps = (dispatch) => ({
  getCart: () => dispatch(cartActions.getCart()),
  getBalance: () => dispatch(userActions.getBalance()),
  setCheckout: (params) => dispatch(cartActions.checkout(params))
})

export default connect(mapStateToProps, mapDispatchToProps)(PaymentBalance)
