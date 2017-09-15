import React, { Component } from 'react'
import { connect } from 'react-redux'
import NProgress from 'nprogress'
import moment from 'moment'
// actions
import * as transactionActions from '../actions/transaction'
// component
import Content from '../Components/Content'
import MyImage from '../Components/MyImage'
import Notification from '../Components/Notification'
// services
import { validateResponse, isFetching } from '../Services/Status'
import { INVOICE_MESSAGE } from './TransactionDetail'

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
    const { buyerInvoiceDetail, notification } = this.state
    const { invoice } = buyerInvoiceDetail
    console.log(invoice)
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
            buyerInvoiceDetail.isFound &&
            <div>
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
                          <div className='item-status md right reject'>{INVOICE_MESSAGE[invoice.status]}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
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
              </section>
              <section className='section is-paddingless'>
                <div className='container is-fluid'>
                  <a className='button is-primary is-outlined is-large is-fullwidth'>Lihat Saldo</a>
                </div>
              </section>
            </div>
          }
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
