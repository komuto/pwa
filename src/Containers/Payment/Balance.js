import React, { Component } from 'react'
import { connect } from 'react-redux'
import Router from 'next/router'
import NProgress from 'nprogress'
// Component
import Content from '../../Components/Content'
import Notification from '../../Components/Notification'
// actions
import * as transactionActions from '../../actions/transaction'
import * as paymentActions from '../../actions/payment'
// libs
import RupiahFormat from '../../Lib/RupiahFormat'
import Promo from '../../Lib/Promo'

class PaymentBalance extends Component {
  constructor (props) {
    super(props)
    this.state = {
      transaction: props.transaction || null,
      paymentType: props.query.paymentType || null,
      idT: props.query.idT || null,
      notification: props.notification
    }
    this.submitting = {
      transaction: false,
      balancePayment: false
    }
  }

  async componentDidMount () {
    let { idT } = this.state

    NProgress.start()

    this.submitting = { ...this.submitting, transaction: true }
    await this.props.getTransaction({ id: idT })
  }

  paymentBalance () {
    let { idT } = this.state
    this.submitting = {...this.submitting, balancePayment: true}
    this.props.balancePayment({ id: idT })
  }

  componentWillReceiveProps (nextProps) {
    let { isFetching, isError, isFound, notifError } = this.props
    let { transaction, confirmation } = nextProps

    // handling state confirmation
    if (!isFetching(confirmation) && this.submitting.balancePayment) {
      this.submitting = {...this.submitting, balancePayment: false}
      if (isError(confirmation)) {
        this.setState({ notification: notifError(confirmation.message) })
      }
      if (isFound(confirmation)) {
        Router.push('/payment-success')
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
    let { transaction, notification } = this.state
    let status = false

    status = transaction.isFound

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
  let { transaction, submitting } = props
  let totalPayment = 0
  let promoCode = '-'
  let pricePromo = 0

  let { summary_transaction, bucket } = transaction.transaction

  totalPayment = summary_transaction.total_price

  if (bucket.promo) {
    pricePromo = Promo({...bucket, totalPayment})
    promoCode = bucket.promo.promo_code
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
              <a onClick={() => !submitting.balancePayment && props.paymentBalance()} className={`button is-primary is-large is-fullwidth ${submitting.balancePayment ? 'is-loading' : ''}`}>Bayar dengan Saldo</a>
            </li>
          </ul>
        </div>
      </section>
    </Content>
  )
}

const mapStateToProps = (state) => ({
  transaction: state.transaction,
  confirmation: state.confirmation
})

const mapDispatchToProps = (dispatch) => ({
  getTransaction: (params) => dispatch(transactionActions.getTransaction(params)),
  balancePayment: (params) => dispatch(paymentActions.balancePayment(params))
})

export default connect(mapStateToProps, mapDispatchToProps)(PaymentBalance)
