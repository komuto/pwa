import React, { Component } from 'react'
import { connect } from 'react-redux'
import NProgress from 'nprogress'
import Router from 'next/router'
// componnet
import Content from '../Components/Content'
import MyImage from '../Components/MyImage'
import Notification from '../Components/Notification'
// actions
import * as transactionActions from '../actions/transaction'
// images
import Images from '../Themes/Images'
// lib
import RupiahFormat from '../Lib/RupiahFormat'
import Promo from '../Lib/Promo'
// payment status
export const PAYMENT_STATUS = ['add', 'checkout', 'delete', 'Menunggu Pembayaran', 'Verifikasi', 'Kadaluarsa', 'Sudah dibayar', 'Cancel']
export const PAYMENT_ICON = [Images.paymentWaiting, Images.paymentVerification, Images.paymentExpired, Images.paymentDone]
export const PAYMENT_CLASS = ['notif-payment', 'notif-payment-waiting', 'notif-payment-expiry', 'notif-payment-success']
// invoce status
export const INVOICE_TRANSACTION_STATUS = ['REJECTED', 'WAITING', 'PROCEED', 'SENDING', 'RECEIVED', 'PROBLEM', 'COMPLAINT_DONE']
export const INVOICE_TRANSACTION_CLASS = ['reject', 'waiting', 'process', 'delivered', 'accepted', 'has-trouble', 'has-complaint']
export const INVOICE_TRANSACTION_MESSAGE = ['Ditolak oleh Seller', 'Menunggu Konfirmasi Seller', 'Diproses oleh Seller', 'Barang sudah dikirim', 'Barang sudah diterima', 'Terdapat barang bermasalah', 'Komplain telah selesai']
// shipping
export const SHIPPING_SENDER_STATUS = ['DEFAULT', 'ACCEPT', 'DECLINE', 'SENT']

class TransactionDetail extends Component {
  constructor (props) {
    super(props)
    this.state = {
      id: props.query.id || null,
      transaction: props.transaction || null,
      detailActive: false,
      notification: {
        status: false,
        message: 'Error, default message.'
      }
    }
    this.submitting = {
      transaction: false
    }
  }

  showDetail () {
    this.setState({ detailActive: !this.state.detailActive })
  }

  componentDidMount () {
    let { id } = this.state
    this.submitting = { ...this.submitting, transaction: true }
    NProgress.start()
    this.props.getTransaction({ id })
  }

  componentWillReceiveProps (nextProps) {
    let { transaction } = nextProps
    let { isFetching, isError, isFound, notifError } = this.props
    if (!isFetching(transaction) && this.submitting.transaction) {
      NProgress.done()
      this.submitting = { ...this.submitting, transaction: false }
      if (isError(transaction)) {
        this.setState({ notification: notifError(transaction.message) })
      }

      if (isFound) {
        this.setState({ transaction })
      }
    }
  }

  render () {
    let { transaction, notification } = this.state

    return (
      <Content>
        <Notification
          type='is-danger'
          isShow={notification.status}
          activeClose
          onClose={() => this.setState({notification: {status: false, message: ''}})}
          message={notification.message} />
        {
            transaction.isFound &&
              <TransactionDetailContent
                {...this.state}
                showDetail={() => this.showDetail()} />
          }
      </Content>
    )
  }
}

const TransactionDetailContent = (props) => {
  let { transaction, detailActive, id } = props
  let { bucket, invoices, summary_transaction } = transaction.transaction
  let paymentStatus = bucket.status
  let paymentIcon = PAYMENT_ICON[paymentStatus - 3]
  let paymentClass = PAYMENT_CLASS[paymentStatus - 3]
  let { days, hours, minutes } = summary_transaction.time_left

  let totalPayment = summary_transaction.total_price
  let promoCode = '-'
  let pricePromo = 0

  if (bucket.promo) {
    promoCode = bucket.promo.promo_code
    pricePromo = Promo({ ...bucket, totalPayment })
  }

  return (
    <Content>
      <section className='section is-paddingless has-shadow'>
        <div className={`box ${paymentClass}`}>
          <article className='media'>
            <div className='media-left'>
              <figure className='image user-pict' style={paymentIcon === undefined ? { width: 50 } : {}}>
                <MyImage src={paymentIcon} alt='paymentIcon' />
              </figure>
            </div>
            <div className='media-content'>
              <div className='content'>
                <p>
                  <strong>{ PAYMENT_STATUS[paymentStatus] }</strong>
                  <br />
                  {
                    paymentStatus === 3 &&
                    <span>
                      {days} hari  :
                      {hours} jam  :
                      {minutes} menit
                    </span>
                  }
                  </p>
              </div>
            </div>
          </article>
        </div>
        <div className='payment-detail'>
          <ul>
            <li>
              <div className='columns is-mobile is-multiline no-margin-bottom'>
                <div className='column is-one-third'>
                  <div className='rating-content is-left'>
                    <span>Total Tagihan</span>
                  </div>
                </div>
                <div className='column'>
                  <div className='rating-content is-left has-text-right'>
                    <span>Rp { RupiahFormat(totalPayment) }</span>
                    <a onClick={() => props.showDetail()} className='detail-collapsed'>Detail <span className={`icon-arrow-down blue ${detailActive ? 'top' : ''}`} /></a>
                  </div>
                </div>
              </div>
            </li>
            <li className='collapsed' style={{ display: detailActive ? 'block' : 'none' }}>
              <div className='payment-detail step-pay'>
                <ul className='detail-transaction'>
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
                              <span>Rp { RupiahFormat(totalPayment) }</span>
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
                              <span className='pay-code'> - Rp { RupiahFormat(pricePromo) }</span>
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
            </li>
          </ul>
        </div>
      </section>
      {
          invoices.map((invoice, index) => {
            let { store } = invoice
            return (
              <section className='section is-paddingless has-shadow' key={index}>
                {
                  index === 0 &&
                  <div className='container is-fluid'>
                    <div className='title'>
                      <h3>Daftar Barang Yang Dibeli</h3>
                    </div>
                  </div>
                }
                <div className='payment-detail step-pay'>
                  <ul>
                    <li onClick={() => Router.push(`/transaction-detail-status?id=${bucket.id}&idInv=${invoice.id}`)}>
                      <div className='columns is-mobile is-multiline no-margin-bottom'>
                        <div className='column'>
                          <div className='label-text is-left top-middle'>
                            <span>{ store.name }</span>
                          </div>
                        </div>
                      </div>
                      <div className='columns is-mobile is-multiline no-margin-bottom'>
                        <div className='column'>
                          <div className='box'>
                            <div className='media'>
                              {
                                invoice.items.map((item, index) => {
                                  return index < 4
                                        ? <div key={item.id} className='media-left'>
                                          <figure className='image list-transaction sm'>
                                            <a><MyImage src={item.product.image} alt='Image' /></a>
                                          </figure>
                                        </div>
                                          : index === 4
                                            ? <div className='media-left' key={index}>
                                              <figure className='image list-transaction plus3'>
                                                <span>+3</span>
                                                <a><MyImage src={item.product.image} alt='Image' /></a>
                                              </figure>
                                            </div>
                                          : null
                                })
                              }
                              <div className='media-content is-right-content'>
                                <div className='content'>
                                  { invoice.items.length < 2 && <h4>{ invoice.items[0].product.name }</h4> }
                                  <div className='right-top'>
                                    <span className='icon-arrow-right' />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
                {
                  paymentStatus === 6 &&
                  <div className='block-status has-text-right'>
                    <div className={`item-status md ${INVOICE_TRANSACTION_CLASS[invoice.transaction_status]}`}>{INVOICE_TRANSACTION_MESSAGE[invoice.transaction_status]}</div>
                  </div>
                }
              </section>
            )
          })
        }
      {
          paymentStatus === 3 &&
          <section className='section is-paddingless'>
            <div className='payment-detail action' style={{ backgroundColor: '#f4f5f6' }}>
              <ul>
                <li>
                  <a onClick={() => Router.push(`/payment?paymentType=transaction&idT=${id}`)} className={`button is-primary is-large is-fullwidth`}>Bayar Sekarang</a>
                </li>
              </ul>
            </div>
          </section>
        }
    </Content>
  )
}

const mapStateToProps = (state) => ({
  transaction: state.transaction
})

const mapDispatchToProps = (dispatch) => ({
  getTransaction: (params) => dispatch(transactionActions.getTransaction(params))
})

export default connect(mapStateToProps, mapDispatchToProps)(TransactionDetail)
