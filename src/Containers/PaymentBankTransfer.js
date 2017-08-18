import React, { Component } from 'react'
import { connect } from 'react-redux'
import Router from 'next/router'
import NProgress from 'nprogress'
// component
import Content from '../Components/Content'
// actions
import * as cartActions from '../actions/cart'
import * as paymentActions from '../actions/payment'
// lib
import RupiahFormat from '../Lib/RupiahFormat'
// services
import { Status } from '../Services/Status'

class PayWithBankTransfer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      cart: props.cart || null,
      checkout: props.checkout || null,
      type: props.query.type,
      submiting: false,
      notification: {
        type: 'is-danger',
        status: false,
        message: 'Error, default message.'
      }
    }
  }

  async componentDidMount () {
    const { cart } = this.state
    if (!cart.isFound) {
      NProgress.start()
      await this.props.getCart()
    }
  }

  async payNow () {
    const { type } = this.state
    await this.props.setCheckout({ payment_method_id: Number(type) })
    this.setState({ submiting: true })
  }

  componentWillReceiveProps (nextProps) {
    const { cart, checkout } = nextProps
    let { notification } = this.state
    notification = {status: false, message: 'Error, default message.'}
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

    if (!checkout.isLoading) {
      NProgress.done()
      switch (checkout.status) {
        case Status.SUCCESS :
          if (!checkout.isFound) { notification = {type: 'is-danger', status: true, message: 'Konfirmasi metode pembayaran gagal!'} } else { (cart.cart.id === checkout.checkout.id) && Router.push(`/payment-bank-transfer-detail?id=${checkout.checkout.id}`) }
          break
        case Status.OFFLINE :
        case Status.FAILED :
          notification = {type: 'is-danger', status: true, message: checkout.message}
          break
        default:
          break
      }
      this.setState({ checkout, notification })
    }
  }

  render () {
    const { cart, submiting, checkout } = this.state
    console.log(cart)
    console.log(checkout)

    if (!cart.isFound) return null

    let isPromo = cart.cart.promo
    let promoCode = isPromo ? isPromo.promo_code : '-'
    let promoNominal = isPromo ? isPromo.nominal : 0
    let totalPrice = 0
    cart.cart.items.map((item) => {
      totalPrice += item.total_price
    })

    return (
      <Content>
        <section className='section is-paddingless has-shadow'>
          <div className='columns is-mobile no-margin-bottom notif-alfa'>
            <div className='column'>
              <div className='is-left'>
                <ul className='list-inline col2'>
                  <li className='label-text'>
                    <span>Batas Pembayaran</span>
                  </li>
                  <li>
                    <span>1 hari  :  20 jam  :  30 menit</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className='payment-detail other'>
            <ul>
              <li>
                <div className='columns is-mobile is-multiline no-margin-bottom'>
                  <div className='column'>
                    <div className='label-text is-left'>
                      <span><i className='icon-info-blue' /> Informasi Penting</span>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <ul className='list-bullet'>
                  <li>Transfer beda bank akan dikenakan biaya sebesar Rp 6.500</li>
                  <li>Setelah menekan tombol "Bayar", Anda tidak bisa mengubah metode pembayaran untuk transaksi ini</li>
                </ul>
              </li>
            </ul>
          </div>
        </section>
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
                          <span>Rp {RupiahFormat(totalPrice)}</span>
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
                          <span className='pay-code'> - Rp { RupiahFormat(promoNominal)}</span>
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
                          <span>Rp {RupiahFormat(totalPrice - promoNominal)}</span>
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
          <div className='payment-detail action'>
            <ul>
              <li>
                <span>Dengan menekan tombol "Lanjutkan" Anda telah menyetujui Syarat dan Ketentuan dari Komuto</span>
                <a onClick={() => !submiting && this.payNow()} className={`button is-primary is-large is-fullwidth ${submiting && 'is-loading'}`}>Bayar dengan Transfer Bank</a>
              </li>
            </ul>
          </div>
        </section>
      </Content>
    )
  }
}

const mapStateToProps = (state) => ({
  checkout: state.checkout,
  cart: state.cart,
  confirmPaymentMethod: state.confirmPaymentMethod
})

const mapDiaptchToProps = (dispatch) => ({
  getCart: () => dispatch(cartActions.getCart()),
  setCheckout: (params) => dispatch(cartActions.checkout(params)),
  setConfirmPaymentMethod: (params) => dispatch(paymentActions.confirmPaymentMethod(params))
})

export default connect(mapStateToProps, mapDiaptchToProps)(PayWithBankTransfer)
