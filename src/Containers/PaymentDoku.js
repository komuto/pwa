import React, { Component } from 'react'
import { connect } from 'react-redux'
import NProgress from 'nprogress'
// component
import Content from '../Components/Content'
// actios
import * as paymentActions from '../actions/payment'
import * as cartActions from '../actions/cart'
// services
import { Status } from '../Services/Status'

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
  }

  async componentDidMount () {
    const { cart, invoice } = this.state
    if (!cart.isFound) {
      NProgress.start()
      await this.props.getCart()
    }
    if (!invoice.isFound) {
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
          if (!invoice.isFound) notification = {type: 'is-danger', status: true, message: 'Konfirmasi metode pembayaran gagal!'}
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
    // const { invoice } = this.state
    // if (typeof getForm !== 'undefined') {
    //   let data = {
    //     req_merchant_code: '4533', // mall id or merchant id
    //     req_chain_merchant: invoice.invoice.chain_merchant, // chain merchant id
    //     req_payment_channel: '04', // payment channel
    //     req_transaction_id: invoice.invoice.invoice, // invoice no
    //     req_amount: invoice.invoice.amount,
    //     req_currency: invoice.invoice.currency, // 360 for IDR
    //     req_words: invoice.invoice.words, // your merchant unique key
    //     req_session_id: new Date().getTime(), // your server timestamp
    //     req_form_type: 'full'
    //   }
    //   getForm(data)
    // }

    return (
      <Content>
        <div id='formPayment' />
        {/* <section className="section is-paddingless has-shadow">
          <div className="columns is-mobile no-margin-bottom notif-pay bg-white">
            <div className="column">
              <div className="is-left">
                <ul className="list-inline col2w">
                  <li className="label-text">
                    <span>Akun Doku Wallet Anda</span>
                  </li>
                  <li>
                    <div className="has-text-right img-method">
                      <img src="../images/norton.png" alt="" />
                      <img src="../images/doku-wallet.png" alt="" />
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="columns is-mobile no-margin-bottom notif-pay bg-white">
            <div className="column">
              <div className="form-pay">
                <div className="field">
                  <p className="control">
                    <input className="input" type="text" placeholder="User ID" />
                  </p>
                  <p class="control">
                    <input className="input" type="text" placeholder="Password" />
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="section is-paddingless has-shadow">
          <div className="payment-detail step-pay">
            <ul>
              <li>
                <div className="columns is-mobile is-multiline no-margin-bottom">
                  <div className="column">
                    <div className="label-text is-left">
                      <span>Rincian Harga</span>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <ul className="total-pay">
                  <li>
                    <div className="columns is-mobile is-multiline no-margin-bottom">
                      <div className="column">
                        <div className="label-text is-left">
                          <span>
                            Total Belanja
                          </span>
                        </div>
                      </div>
                      <div className="column is-one-third">
                        <div className="has-text-right">
                          <span>Rp 320.000</span>
                        </div>
                      </div>
                    </div>
                    <div className="columns is-mobile is-multiline no-margin-bottom">
                      <div className="column">
                        <div className="label-text is-left">
                          <span className="pay-code">
                            Kode Voucher BELANJAENAK
                          </span>
                        </div>
                      </div>
                      <div className="column is-one-third">
                        <div className="has-text-right">
                          <span className="pay-code"> - Rp 20.000</span>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="columns is-mobile is-multiline no-margin-bottom">
                      <div className="column">
                        <div className="label-text is-left">
                          <span>
                            Sisa Pembayaran
                          </span>
                        </div>
                      </div>
                      <div className="column is-one-third">
                        <div className="has-text-right">
                          <span>Rp 250.219</span>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </section>
        <section className="section is-paddingless">
          <div className="payment-detail action">
            <ul>
              <li>
                <span>Dengan menekan tombol "Lanjutkan" Anda telah menyetujui Syarat dan Ketentuan dari Komuto</span>
                <a className="button is-primary is-large is-fullwidth">Proses Pembayaran</a>
              </li>
            </ul>
          </div>
        </section> */}
      </Content>
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
