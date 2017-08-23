import React, { Component } from 'react'
import { connect } from 'react-redux'
import NProgress from 'nprogress'
// component
// import Content from '../Components/Content'
// actios
import * as paymentActions from '../actions/payment'
import * as cartActions from '../actions/cart'
// import AppConfig from '../Config/AppConfig'
// services
import { Status } from '../Services/Status'
// import '../../static/dist/css/doku.css'

class PaymentDoku extends Component {
  constructor (props) {
    super(props)
    this.state = {
      cart: props.cart || null,
      invoice: props.invoice || null,
      submiting: false,
      notification: {
        type: 'is-danger',
        status: false,
        message: 'Error, default message.'
      }
    }

    this.dokuIsRendered = false
  }

  async componentDidMount () {
    const { cart, invoice } = this.state
    if (!cart.isFound) {
      NProgress.start()
      await this.props.getCart()
    }
    if (!invoice.isFound) {
      console.log('Load Invoice')
      NProgress.start()
      await this.props.getDokuInvoice()
    }
  }

  componentWillReceiveProps (nextProps) {
    const { cart, invoice } = nextProps
    let { notification } = this.state
    notification = {status: false, message: 'Error, default message.'}
    if (!cart.isLoading) {
      NProgress.done()
      switch (cart.status) {
        case Status.SUCCESS :
          if (!cart.isFound) { notification = {type: 'is-danger', status: true, message: 'Keranjang belanja kosong!'} }
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

    if (!invoice.isLoading) {
      NProgress.done()
      switch (invoice.status) {
        case Status.SUCCESS :
          if (!invoice.isFound) {
            notification = {type: 'is-danger', status: true, message: 'Konfirmasi metode pembayaran gagal!'}
          } else {
            if (typeof getForm !== 'undefined' && invoice.isFound && !this.dokuIsRendered) {
              var data = {
                req_merchant_code: '4533',
                req_chain_merchant: 'NA',
                req_payment_channel: '04',
                req_transaction_id: invoice.invoice.invoice,
                req_currency: '360',
                req_amount: invoice.invoice.amount,
                req_words: invoice.invoice.words,
                req_form_type: 'full'
              }
              this.dokuIsRendered = true
              getForm(data)
            }
          }
          break
        case Status.OFFLINE :
        case Status.FAILED :
          notification = {type: 'is-danger', status: true, message: invoice.message}
          break
        default:
          break
      }
      this.setState({ invoice, notification })
    }
  }

  render () {
    const { invoice } = this.state
    if (!invoice.isFound) return null
    return (
      <div id='formPayment' style={{ marginTop: 10 }}>
        <input id='doku-token' name='doku-token' type='hidden' />
        <input id=' doku-pairing-code' name='doku-pairing-code' type='hidden' />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  cart: state.cart,
  invoice: state.invoice,
  payment: state.payment
})

const mapDispathToProps = (dispatch) => ({
  getCart: () => { dispatch(cartActions.getCart()) },
  getDokuInvoice: () => { dispatch(paymentActions.getDokuInvoice()) },
  payDoku: (params) => { dispatch(paymentActions.payDoku(params)) }
})

export default connect(mapStateToProps, mapDispathToProps)(PaymentDoku)
