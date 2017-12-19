import React, { Component } from 'react'
import { connect } from 'react-redux'
import NProgress from 'nprogress'
import moment from 'moment'
import Router from 'next/router'
// actions
import * as transactionActions from '../../actions/transaction'
import * as storeActions from '../../actions/stores'
// component
import Content from '../../Components/Content'
import MyImage from '../../Components/MyImage'
import Notification from '../../Components/Notification'
import ResponsiveImage from '../../Components/ResponsiveImage'
// lib
import RupiahFormat from '../../Lib/RupiahFormat'
// services
import { INVOICE_TRANSACTION_CLASS, INVOICE_TRANSACTION_MESSAGE, SHIPPING_SENDER_STATUS } from './Detail'
import { PROBLEMS, SOLUTIONS } from './Confirmation'

export const TABS = ['status', 'data-pembelian']

class TransactionDetailStatus extends Component {
  constructor (props) {
    super(props)
    this.state = {
      id: props.query.id || null,
      invoiceId: props.query.idInv || null,
      tab: props.query.tab || TABS[0],
      buyerInvoiceDetail: props.buyerInvoiceDetail || null,
      sendMessageStore: null,
      showModalMessage: false,
      formMessage: {},
      notification: {
        status: false,
        message: 'Error, default message.'
      }
    }
    this.submitting = {
      message: false,
      buyerInvoiceDetail: false
    }
    moment.locale('id')
  }

  onChangeTab (tab) {
    const { id, invoiceId } = this.state
    Router.push(`/transaction-detail-status?id=${id}&idInv=${invoiceId}&tab=${tab}`)
    this.setState({ tab })
  }

  modalMessage () {
    this.setState({ showModalMessage: !this.state.showModalMessage })
  }

  componentDidMount () {
    const { id, invoiceId } = this.state
    NProgress.start()
    this.submitting = { ...this.submitting, buyerInvoiceDetail: true }
    this.props.getBuyerInvoiceDetail({ id, invoiceId })
  }

  componentWillReceiveProps (nextProps) {
    const { buyerInvoiceDetail, sendMessageStore } = nextProps
    const { isFetching, isError, isFound, notifError, notifSuccess } = this.props

    // handling state get invoices detail
    if (!isFetching(buyerInvoiceDetail) && this.submitting.buyerInvoiceDetail) {
      NProgress.done()
      this.submitting = { ...this.submitting, buyerInvoiceDetail: false }
      if (isError(buyerInvoiceDetail)) {
        this.setState({ notification: notifError(buyerInvoiceDetail.message) })
      }
      if (isFound(buyerInvoiceDetail)) {
        this.setState({ buyerInvoiceDetail })
      }
    }

    // handling state set message
    if (!isFetching(sendMessageStore) && this.submitting.message) {
      this.submitting = { ...this.submitting, message: false }
      if (isError(sendMessageStore)) {
        this.setState({ notification: notifError(sendMessageStore) })
      }
      if (isFound(sendMessageStore)) {
        this.setState({ sendMessageStore, showModalMessage: false, notification: notifSuccess('Berhasil mengirim pesan') })
      }
    }
  }

  onChangeMessageText (e) {
    e.preventDefault()
    let { value } = e.target
    let { invoice } = this.state.buyerInvoiceDetail
    let { formMessage } = this.state

    formMessage.id = invoice.store.id
    formMessage.subject = invoice.invoice_number
    formMessage.content = value
    this.setState({ formMessage })
  }

  onClickSendMessage (e) {
    e.preventDefault()
    let { formMessage } = this.state
    if (formMessage.content !== '' && formMessage.content !== undefined) {
      this.submitting = { ...this.submitting, message: true }
      this.props.setSendMessageStore(formMessage)
    }
  }

  render () {
    let { buyerInvoiceDetail, tab, notification } = this.state
    let { invoice } = buyerInvoiceDetail
    let invoiceStatus = invoice.transaction_status

    return (
      <Content>
        <div className='nav-tabs'>
          <a className={tab === TABS[0] ? 'active' : ''} onClick={() => this.onChangeTab(TABS[0])}><span className='text'>Status</span></a>
          <a className={tab === TABS[1] ? 'active' : ''} onClick={() => this.onChangeTab(TABS[1])}><span className='text'>Detail Pembelian</span></a>
        </div>
        <Notification
          type={notification.type}
          isShow={notification.status}
          activeClose
          onClose={() => this.setState({notification: {status: false, message: ''}})}
          message={notification.message} />
        {
          buyerInvoiceDetail.isFound &&
          <Content>
            {
            tab === TABS[0]
            ? <TabsStatusContent
              {...this.state}
              onClickModalMessage={() => this.modalMessage()}
              buyerInvoiceDetail={buyerInvoiceDetail}
              invoiceStatus={invoiceStatus} />
            : <TabsDataContent
              buyerInvoiceDetail={buyerInvoiceDetail}
              invoiceStatus={invoiceStatus} />
          }

            <ModalMessage
              {...this.state}
              submitting={this.submitting}
              onClose={() => this.modalMessage()}
              onChangeMessageText={(e) => this.onChangeMessageText(e)}
              onClickSendMessage={(e) => this.onClickSendMessage(e)} />
          </Content>
        }
      </Content>
    )
  }
}

const ModalMessage = (props) => {
  const { buyerInvoiceDetail, showModalMessage, submitting, onClose } = props
  const { invoice } = buyerInvoiceDetail
  return (
    <div className={`modal modal-filter modal-dropship ${showModalMessage ? 'is-active' : ''}`}>
      <div className='modal-background' />
      <div className='modal-card'>
        <header className='modal-card-head bg-red'>
          <p className='modal-card-title'>Kirim Pesan</p>
          <button onClick={() => onClose()} className='delete icon-close white' />
        </header>
        <section className='modal-card-body is-paddingless' style={{ marginBottom: 0 }}>
          <div className='profile-wrapp border-bottom'>
            <ul>
              <li>
                <div className='box is-paddingless'>
                  <article className='media'>
                    <div className='media-left'>
                      <figure className='image product-pict' style={{ width: 40 }}>
                        <ResponsiveImage image={invoice.store.logo} borderRadius={50} />
                      </figure>
                    </div>
                    <div className='media-content'>
                      <div className='content'>
                        <p className='products-name'>
                          <strong>{ invoice.store.name }</strong>
                          <br />
                          <span>Jakarta Selatan, DKI Jakarta</span>
                        </p>
                      </div>
                    </div>
                  </article>
                </div>
              </li>
            </ul>
          </div>
          <div className='add-discussion'>
            <div className='field'>
              <label>Judul Pesan</label>
              <p className='control'>
                <input defaultValue={invoice.invoice_number} readOnly type='text' className='input' placeholder='Tulis Judul' />
              </p>
            </div>
            <div className='field'>
              <label>Pertanyaan Anda</label>
              <p className='control'>
                <textarea onChange={(e) => props.onChangeMessageText(e)} className='textarea text-discus' placeholder='Tulis Pertanyaan' rows='1' />
              </p>
              <p className='control'>
                <button onClick={(e) => !submitting.message && props.onClickSendMessage(e)} className={`button is-primary is-large is-fullwidth ${submitting.message ? 'is-loading' : ''}`}>Kirim Pesan</button>
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

const TabsDataContent = (props) => {
  const { buyerInvoiceDetail } = props
  const { invoice } = buyerInvoiceDetail
  let subTotal = 0
  let insuranceFee = (invoice.shipping.is_insurance) ? invoice.insurance_fee : 0
  return (
    <Content>
      <section className='section is-paddingless has-shadow'>
        <div className='container is-fluid'>
          <div className='title'>
            <br />
            <h3>Daftar Barang yang dibeli</h3>
          </div>
        </div>
        <ul className='list-trans-product'>
          {
            invoice.items.map((item, index) => {
              subTotal += item.total_price
              return (
                <li key={index}>
                  <div className='box'>
                    <div className='media'>
                      <div className='media-left is-bordered top'>
                        <figure className='image list-transaction lg'>
                          <a>
                            <MyImage src={item.product.image} alt={item.product.name} />
                          </a>
                        </figure>
                      </div>
                      <div className='media-content'>
                        <div className='content'>
                          <h4>{item.product.name} </h4>
                          <strong>Harga : Rp { RupiahFormat(item.product.price) } / item</strong>
                          <strong>Jumlah : {item.qty}</strong>
                          <span>{item.note}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              )
            })
          }
        </ul>
      </section>
      <section className='section is-paddingless has-shadow'>
        <div className='container is-fluid'>
          <div className='title'>
            <h3>Informasi Pengiriman</h3>
          </div>
        </div>
        <div className='detail-purchase summary at-cart'>
          <div className='detail-result white'>
            <ul className='data-delivery'>
              <li>
                <div className='columns custom is-mobile'>
                  <div className='column'>
                    <strong>Alamat Pengiriman</strong>
                    <span className='address'>
                      {invoice.shipping.address.name}<br />
                      {invoice.shipping.address.address}, <br />
                      {invoice.shipping.address.postal_code}<br />
                      Telp: {invoice.shipping.address.phone_number}
                    </span>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className='column is-paddingless'>
          <div className='see-all'>
            <span className='link black js-option'>
              Kurir Pengiriman
              <span className='kurir'>{invoice.shipping.expedition_service.expedition.name}</span>
            </span>
          </div>
        </div>
        <div className='column is-paddingless'>
          <div className='see-all'>
            <span className='link black js-option'>
              Pilih Paket Pengiriman
              <span className='kurir'>{invoice.shipping.expedition_service.name}</span>
            </span>
          </div>
        </div>
        <div className='column is-paddingless'>
          <div className='see-all'>
            <span className='link black js-option'>
              Asuransi
              <span className='kurir'>{ invoice.shipping.insurance_fee ? 'Ya' : 'Tidak' }</span>
            </span>
          </div>
        </div>
      </section>
      <section className='section is-paddingless has-shadow'>
        <div className='container is-fluid'>
          <div className='title'>
            <h3>Detail Harga</h3>
          </div>
        </div>
        <div className='info-purchase'>
          <div className='detail-purchase summary trans-detail'>
            <div className='detail-result white'>
              <ul>
                <li>
                  <div className='columns custom is-mobile'>
                    <div className='column is-half'><span>Subtotal</span></div>
                    <div className='column is-half has-text-right'><span>Rp { RupiahFormat(subTotal) }</span></div>
                  </div>
                </li>
                <li>
                  <div className='columns custom is-mobile'>
                    <div className='column is-half'><span>Biaya Asuransi</span></div>
                    <div className='column is-half has-text-right'><span>
                      Rp { RupiahFormat(insuranceFee) }
                    </span></div>
                  </div>
                </li>
                <li>
                  <div className='columns custom is-mobile'>
                    <div className='column is-half'><span>Ongkos Kirim</span></div>
                    <div className='column is-half has-text-right'><span>Rp { RupiahFormat(invoice.shipping.delivery_cost) }</span></div>
                  </div>
                </li>
              </ul>
              <ul className='total'>
                <li>
                  <div className='columns custom is-mobile'>
                    <div className='column is-half'><strong>Total</strong></div>
                    <div className='column is-half has-text-right'><strong>Rp { RupiahFormat(invoice.total_price) }</strong></div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </Content>
  )
}

const TabsStatusContent = (props) => {
  const { buyerInvoiceDetail, invoiceStatus, id, invoiceId, onClickModalMessage } = props
  const { invoice } = buyerInvoiceDetail
  return (
    <Content>
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
                          <ResponsiveImage image={invoice.store.logo} borderRadius={50} />
                        </figure>
                      </div>
                      <div className='media-content middle is-right-content'>
                        <div className='content'>
                          <h4>{invoice.store.name}</h4>
                        </div>
                      </div>
                      <div className='right-top'>
                        <a onClick={() => onClickModalMessage()} className='button is-primary is-outlined'>Kirim Pesan</a>
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
                  <strong>Status</strong>
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
              <a onClick={() => Router.push(`/balance`)} className='button is-primary is-outlined is-large is-fullwidth'>Lihat Saldo</a>
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
      {
          // barang bermasalah
          invoiceStatus === 5 &&
          <div>
            <section className='section is-paddingless has-shadow'>
              <div className='container is-fluid'>
                <div className='title'>
                  <h3>Barang bermasalah</h3>
                </div>
              </div>
              {
                  invoice.dispute.dispute_products.map((p, index) => {
                    return <div className='info-purchase space-left' key={index}>
                      <div className='box'>
                        <div className='media'>
                          <div className='media-left is-full-bordered'>
                            <figure className='image list-transaction sm'>
                              <a><MyImage src={p.product.image} alt={p.product.name} /></a>
                            </figure>
                          </div>
                          <div className='media-content middle'>
                            <div className='content'>
                              <h4>{ p.product.name }</h4>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  })
                }
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
                        <div className='item-status md right'>{PROBLEMS[invoice.dispute.problems]}</div>
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
                        <div className='item-status md right'>{SOLUTIONS[invoice.dispute.solution]}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <section className='section is-paddingless'>
              <div className='container is-fluid'>
                <a onClick={() => Router.push(`/complaint?type=buyer&id=${invoice.dispute.id}`, `/complaint/buyer/${invoice.dispute.id}`)} className='button is-primary is-outlined is-large is-fullwidth'>Ke Detail Komplain</a>
              </div>
            </section>
            </div>
        }
    </Content>
  )
}

const mapStateToProps = (state) => ({
  buyerInvoiceDetail: state.buyerInvoiceDetail,
  sendMessageStore: state.sendMessageStore
})

const mapDispatchToProps = (dispatch) => ({
  getBuyerInvoiceDetail: (params) => dispatch(transactionActions.getBuyerInvoiceDetail(params)),
  setSendMessageStore: (params) => dispatch(storeActions.sendMessageStore(params))
})

export default connect(mapStateToProps, mapDispatchToProps)(TransactionDetailStatus)
