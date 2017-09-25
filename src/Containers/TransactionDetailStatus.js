import React, { Component } from 'react'
import { connect } from 'react-redux'
import NProgress from 'nprogress'
import moment from 'moment'
import Router from 'next/router'
// actions
import * as transactionActions from '../actions/transaction'
// component
import Content from '../Components/Content'
import MyImage from '../Components/MyImage'
import Notification from '../Components/Notification'
// services
import { validateResponse, isFetching } from '../Services/Status'
import { INVOICE_TRANSACTION_CLASS, INVOICE_TRANSACTION_MESSAGE, SHIPPING_SENDER_STATUS } from './TransactionDetail'

class TransactionDetailStatus extends Component {
  constructor (props) {
    super(props)
    this.state = {
      id: props.query.id || null,
      invoiceId: props.query.idInv || null,
      buyerInvoiceDetail: props.buyerInvoiceDetail || null,
      notification: {
        status: false,
        message: 'Error, default message.'
      }
    }
    moment.locale('id')
  }

  componentDidMount () {
    const { id, invoiceId } = this.state
    NProgress.start()
    this.props.getBuyerInvoiceDetail({ id, invoiceId })
  }

  componentWillReceiveProps (nextProps) {
    const { buyerInvoiceDetail } = nextProps
    if (!isFetching(buyerInvoiceDetail)) {
      NProgress.done()
      this.setState({ buyerInvoiceDetail, notification: validateResponse(buyerInvoiceDetail, 'Data transaksi dengan invoice tersebut tidak ditemukan') })
    }
  }

  render () {
    const { buyerInvoiceDetail, id, invoiceId, notification } = this.state
    const { invoice } = buyerInvoiceDetail
    if (!buyerInvoiceDetail.isFound) return null
    let invoiceStatus = invoice.transaction_status
    console.log('buyerInvoiceDetail', buyerInvoiceDetail)
    return (
      <Content>
        <div className='nav-tabs'>
          <a className='active'><span className='text'>Status</span></a>
          <a><span className='text'>Data Pembelian</span></a>
        </div>
        <Notification
          type='is-danger'
          isShow={notification.status}
          activeClose
          onClose={() => this.setState({notification: {status: false, message: ''}})}
          message={notification.message} />
        {
          // barang sudah dikirim
          invoiceStatus === 3 &&
          <div className='box notif-payment-waiting'>
            <article className='media'>
              <div className='media-left top'>
                <i className='icon-info-blue' />
              </div>
              <div className='media-content'>
                <div className='content'>
                  <p>
                    <strong>Barang sudah dikirim oleh Seller. Jika dalam waktu 14 hari Anda tidak mengkonfirmasi menerima barang. Maka otomatis uang Anda akan diteruskan ke Seller.</strong>
                  </p>
                </div>
              </div>
            </article>
            </div>
        }
        <section className='section is-paddingless has-shadow'>
          <div className='container is-fluid'>
            <div className='title'>
              <br />
              <h3>Info Penjual</h3>
            </div>
          </div>
          <div className='payment-detail step-pay'>
            <ul>
              <li>
                <div className='columns is-mobile is-multiline no-margin-bottom'>
                  <div className='column'>
                    <div className='box'>
                      <div className='media'>
                        <div className='media-left is-full-bordered'>
                          <figure className='image list-transaction sm'>
                            <a><MyImage src={invoice.store.logo} alt='Image' /></a>
                          </figure>
                        </div>
                        <div className='media-content middle is-right-content'>
                          <div className='content'>
                            <h4>{invoice.store.name}</h4>
                          </div>
                        </div>
                        <div className='right-top'>
                          <a className='button is-primary is-outlined'>Kirim Pesan</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </section>
        <section className='section is-paddingless has-shadow'>
          <div className='container is-fluid'>
            <div className='title'>
              <h3>Info Status</h3>
            </div>
          </div>
          <div className='info-purchase'>
            <div className='detail-rate is-purchase'>
              <div className='columns total-items is-mobile is-multiline no-margin-bottom'>
                <div className='column is-half'>
                  <div className='rating-content is-left'>
                    <strong>No Invoice</strong>
                  </div>
                </div>
                <div className='column is-half'>
                  <div className='rating-content item-qty has-text-right'>
                    <span className='has-text-left'>{invoice.invoice_number}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='info-purchase'>
            <div className='detail-rate is-purchase'>
              <div className='columns total-items is-mobile is-multiline no-margin-bottom'>
                <div className='column is-half'>
                  <div className='rating-content is-left'>
                    <strong>Tanggal Transaksi</strong>
                  </div>
                </div>
                <div className='column is-half'>
                  <div className='rating-content item-qty has-text-right'>
                    <span className='has-text-left'>{moment.unix(invoice.created_at).format('Do MMMM YYYY')}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='info-purchase'>
            <div className='detail-rate is-purchase'>
              <div className='columns total-items is-mobile is-multiline no-margin-bottom'>
                <div className='column is-half'>
                  <div className='rating-content is-left'>
                    <strong>Status Barang</strong>
                  </div>
                </div>
                <div className='column is-half'>
                  <div className='rating-content item-qty has-text-right'>
                    <div className={`item-status md right ${INVOICE_TRANSACTION_CLASS[invoice.transaction_status]}`}>{INVOICE_TRANSACTION_MESSAGE[invoice.transaction_status]}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {
            // barang reejected
            invoiceStatus === 0 &&
            <div className='info-purchase'>
              <div className='detail-rate is-purchase'>
                <div className='columns total-items is-mobile is-multiline no-margin-bottom'>
                  <div className='column'>
                    <div className='rating-content is-left'>
                      <span>Dana untuk pembelian barang ini telah dikembalikan ke saldo Anda. Silahkan memeriksa Saldo Anda.</span>
                    </div>
                  </div>
                </div>
              </div>
              </div>
          }
        </section>
        {
          // barang reejected
          invoiceStatus === 0 &&
          <section className='section is-paddingless'>
            <div className='container is-fluid'>
              <a className='button is-primary is-outlined is-large is-fullwidth'>Lihat Saldo</a>
            </div>
            </section>
        }
        {
          invoiceStatus === 3 &&
          <div>
            <section className='section is-paddingless'>
              <div className='info-purchase'>
                <div className='detail-rate is-purchase'>
                  <div className='columns total-items is-mobile is-multiline no-margin-bottom'>
                    <div className='column is-half'>
                      <div className='rating-content is-left'>
                        <strong>No Resi</strong>
                      </div>
                    </div>
                    <div className='column is-half'>
                      <div className='rating-content item-qty has-text-right'>
                        <span className='no-resi is-delivered'>{invoice.shipping.airway_bill}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='info-purchase'>
                <div className='detail-rate is-purchase'>
                  <div className='columns total-items is-mobile is-multiline no-margin-bottom'>
                    <div className='column is-half'>
                      <div className='rating-content is-left'>
                        <strong>Status Resi</strong>
                      </div>
                    </div>
                    <div className='column is-half'>
                      <div className='rating-content item-qty has-text-right'>
                        <span>{SHIPPING_SENDER_STATUS[invoice.shipping.sender_status]}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <section className='section is-paddingless'>
              <div className='payment-detail action'>
                <ul>
                  <li>
                    <a onClick={() => Router.push(`/transaction-confirmation?id=${id}&idInv=${invoiceId}`)} className='button is-primary is-large is-fullwidth'>Barang sudah saya terima</a>
                  </li>
                </ul>
              </div>
            </section>
            </div>
        }
        <section className='section is-paddingless has-shadow'>
          <div className='container is-fluid'>
            <div className='title'>
              <h3>Barang bermasalah</h3>
            </div>
          </div>
          <div className='info-purchase space-left'>
            <div className='box'>
              <div className='media'>
                <div className='media-left is-full-bordered'>
                  <figure className='image list-transaction sm'>
                    <a><img src='../images/thumb.jpg' alt='Image' /></a>
                  </figure>
                </div>
                <div className='media-content middle'>
                  <div className='content'>
                    <h4>Sepatu Jogging Nike Hitam </h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='info-purchase space-left'>
            <div className='box'>
              <div className='media'>
                <div className='media-left is-full-bordered'>
                  <figure className='image list-transaction sm'>
                    <a><img src='../images/thumb.jpg' alt='Image' /></a>
                  </figure>
                </div>
                <div className='media-content middle'>
                  <div className='content'>
                    <h4>Sepatu Jogging Nike Hitam </h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='info-purchase space-left'>
            <div className='detail-rate is-purchase'>
              <div className='columns total-items is-mobile is-multiline no-margin-bottom'>
                <div className='column is-one-quarter'>
                  <div className='rating-content is-left'>
                    <strong>Masalah</strong>
                  </div>
                </div>
                <div className='column'>
                  <div className='rating-content item-qty has-text-right'>
                    <div className='item-status md right'>Barang tidak sesuai deskripsi, Produk tidak lengkap, Barang rusak</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='info-purchase space-left'>
            <div className='detail-rate is-purchase'>
              <div className='columns total-items is-mobile is-multiline no-margin-bottom'>
                <div className='column is-half'>
                  <div className='rating-content is-left'>
                    <strong>Pilihan Solusi</strong>
                  </div>
                </div>
                <div className='column'>
                  <div className='rating-content item-qty has-text-right'>
                    <div className='item-status md right'>Refund Dana</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Content>
    )
  }
}

const mapStateToProps = (state) => ({
  buyerInvoiceDetail: state.buyerInvoiceDetail
})

const mapDispatchToProps = (dispatch) => ({
  getBuyerInvoiceDetail: (params) => dispatch(transactionActions.getBuyerInvoiceDetail(params))
})

export default connect(mapStateToProps, mapDispatchToProps)(TransactionDetailStatus)
