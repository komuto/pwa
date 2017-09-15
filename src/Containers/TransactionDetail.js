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
// services
import { validateResponse, isFetching } from '../Services/Status'
// lib
import RupiahFormat from '../Lib/RupiahFormat'
// payment status
export const PAYMENT_STATUS = ['add', 'checkout', 'delete', 'Menunggu Pembayaran', 'Verifikasi', 'Kadaluarsa', 'Sudah dibayar', 'Cancel']
export const PAYMENT_ICON = [Images.paymentWaiting, Images.paymentVerification, Images.paymentExpired, Images.paymentDone]
export const PAYMENT_CLASS = ['notif-payment', 'notif-payment-waiting', 'notif-payment-expiry', 'notif-payment-success']
// invoce status
export const INVOICE_STATUS = ['REJECTED', 'WAITING', 'PROCEED', 'SENDING', 'RECEIVED', 'PROBLEM', 'COMPLAINT_DONE']
export const INVOICE_CLASS = ['reject', 'waiting', 'process', 'sending', 'accepted', 'has-trouble', 'has-complaint']
export const INVOICE_MESSAGE = ['Ditolak oleh Seller', 'Menunggu Konfirmasi Seller', 'Diproses oleh Seller', 'Barang sudah dikirim', 'Barang sudah diterima', 'Terdapat barang bermasalah', 'Komplain telah selesai']

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
  }

  componentDidMount () {
    const { id } = this.state
    NProgress.start()
    this.props.getTransaction({ id })
  }

  componentWillReceiveProps (nextProps) {
    const { transaction } = nextProps
    if (!isFetching(transaction)) {
      NProgress.done()
      this.setState({ transaction, notification: validateResponse(transaction, 'Data transaksi tidak ditemukan!') })
    }
  }

  render () {
    let { transaction, notification, detailActive } = this.state
    if (!transaction.isFound) return null
    let { bucket, invoices, summary_transaction } = transaction.transaction
    let paymentStatus = bucket.status
    let paymentIcon = PAYMENT_ICON[paymentStatus - 3]
    let paymentClass = PAYMENT_CLASS[paymentStatus - 3]
    let priceAfterPromo = 0
    let discount = 0
    if (bucket.promo) {
      let price = summary_transaction.total_price
      let percentage = bucket.promo.percentage / 100
      let nominal = bucket.promo.nominal
      if (bucket.promo.type === 0) {
        discount = ((price * (percentage)))
        priceAfterPromo = price - discount
      }
      if (bucket.promo.type === 1) {
        discount = nominal
        priceAfterPromo = price - discount
      }
    }

    return (
      <Content>
        <Notification
          type='is-danger'
          isShow={notification.status}
          activeClose
          onClose={() => this.setState({notification: {status: false, message: ''}})}
          message={notification.message} />
        <section className='section is-paddingless has-shadow'>
          <div className={`box ${paymentClass}`}>
            <article className='media'>
              <div className='media-left'>
                <figure className='image user-pict' style={paymentIcon === undefined ? { width: 50 } : {}}>
                  <MyImage src={paymentIcon} />
                </figure>
              </div>
              <div className='media-content'>
                <div className='content'>
                  <p>
                    <strong>{ PAYMENT_STATUS[paymentStatus] }</strong>
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
                      <span>Rp { RupiahFormat(summary_transaction.total_price) }</span>
                      <a onClick={() => this.setState({ detailActive: !this.state.detailActive })} className='detail-collapsed'>Detail <span className={`icon-arrow-down blue ${detailActive ? 'top' : ''}`} /></a>
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
                                <span>Rp { RupiahFormat(summary_transaction.total_price) }</span>
                              </div>
                            </div>
                          </div>
                          <div className='columns is-mobile is-multiline no-margin-bottom'>
                            <div className='column'>
                              <div className='label-text is-left'>
                                <span className='pay-code'>
                                  Kode Voucher { bucket.promo ? bucket.promo.promo_code : '-' }
                                </span>
                              </div>
                            </div>
                            <div className='column is-one-third'>
                              <div className='has-text-right'>
                                <span className='pay-code'> - Rp { RupiahFormat(discount) }</span>
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
                                <span>Rp {RupiahFormat(priceAfterPromo)}</span>
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
                    <div className={`item-status md ${INVOICE_CLASS[paymentStatus]}`}>{INVOICE_MESSAGE[paymentStatus]}</div>
                  </div>
                }
              </section>
            )
          })
        }
      </Content>
    )
  }
}

const mapStateToProps = (state) => ({
  transaction: state.transaction
})

const mapDispatchToProps = (dispatch) => ({
  getTransaction: (params) => dispatch(transactionActions.getTransaction(params))
})

export default connect(mapStateToProps, mapDispatchToProps)(TransactionDetail)
