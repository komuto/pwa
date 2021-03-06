// @flow
import React from 'react'
import { connect } from 'react-redux'
import NProgress from 'nprogress'
import moment from 'moment'
import Router from 'next/router'
// components
import Images from '../../Themes/Images'
import Notification from '../../Components/Notification'
import MyRating from '../../Components/MyRating'
import MyImage from '../../Components/MyImage'
import SaleDetail from '../../Components/SaleDetail'
// actions
import * as transactionAction from '../../actions/transaction'

const TAB_DELIVERY_STATUS = 'TAB_DELIVERY_STATUS'
const TAB_SALES_DETAIL = 'TAB_SALES_DETAIL'

class SalesDetail extends React.Component {
  constructor (props) {
    super(props)
    let receiptNumber = props.saleDetail.isFound ? props.saleDetail.sale.shipping.airway_bill : ''
    this.state = {
      id: props.query.id || null,
      saleDetail: props.saleDetail || null,
      tabs: TAB_DELIVERY_STATUS,
      receiptNumber,
      notification: {
        type: 'is-success',
        status: false,
        message: 'Error, default message.'
      },
      validation: false,
      showModal: false
    }
    this.submiting = false
  }

  modalEditReceiptNumber () {
    this.setState({ showModal: !this.state.showModal })
  }

  switchTab (e) {
    const { tabs } = this.state
    this.setState({ tabs: (tabs === TAB_DELIVERY_STATUS) ? TAB_SALES_DETAIL : TAB_DELIVERY_STATUS })
  }

  handleInput (e) {
    this.setState({ receiptNumber: e.target.value })
  }

  renderValidation (name, textFailed) {
    const { receiptNumber } = this.state
    let receiptNumberValid = name === 'receiptNumber' && receiptNumber !== ''
    return (
      <span className='error-msg'>
        {receiptNumberValid ? '' : textFailed}
      </span>
    )
  }

  submit () {
    const { receiptNumber, saleDetail } = this.state
    let receiptNumberValid = receiptNumber !== ''
    if (receiptNumberValid) {
      this.submiting = true
      this.props.inputAirwayBill({ id: saleDetail.sale.invoice.id, airway_bill: receiptNumber })
    } else {
      this.setState({ validation: true })
    }
  }

  /** Status Transaksi Invoice
  export const InvoiceTransactionStatus = {
    REJECTED: 0,
    WAITING: 1,
    PROCEED: 2,
    SENDING: 3,
    RECEIVED: 4,
    PROBLEM: 5,
    COMPLAINT_DONE: 6,
  } **/
  transactionType (type) {
    let className
    let status
    switch (type) {
      case 0:
        className = 'item-status md right has-trouble'
        status = 'Barang ditolak Reseller'
        break
      case 1:
        className = 'item-status md right delivered'
        status = 'Menunggu konfirmasi Pembeli'
        break
      case 2:
        className = 'item-status md right delivered'
        status = 'Pesanan telah diterima dan sedang diproses'
        break
      case 3:
        className = 'item-status md right delivered'
        status = 'Menunggu Konfirmasi Pembeli'
        break
      case 4:
        className = 'item-status md right accepted'
        status = 'Barang sudah diterima'
        break
      case 5:
        className = 'item-status md right has-trouble'
        status = 'Terdapat barang bermasalah'
        break
      case 6:
        className = 'item-status md right accepted'
        status = 'Komplain telah Selesai'
        break
      default:
        break
    }
    return (
      <div className={`${className}`}>{`${status}`}</div>
    )
  }

  /** status resi
  export const ShippingSenderStatus = {
    DEFAULT: 1,
    ACCEPT: 2,
    DECLINE: 3,
    SENT: 4,
  }
  export const ShippingReceiverStatus = {
    DEFAULT: 1,
    ACCEPT: 2,
    DECLINE: 3,
  }
  **/
  statusResi (type) {
    let status
    switch (type) {
      case 1:
        status = 'On Progress'
        break
      case 2:
        status = 'Pesanan telah diterima dan sedang diproses'
        break
      case 3:
        status = 'Pesanan di Tolak'
        break
      case 4:
        status = 'Pesanan telah dikirim'
        break
      default:
        status = 'On Progress'
    }
    return status
  }

  /** Status Transaksi Invoice
  export const InvoiceTransactionStatus = {
    REJECTED: 0,
    WAITING: 1,
    PROCEED: 2,
    SENDING: 3,
    RECEIVED: 4,
    PROBLEM: 5,
    COMPLAINT_DONE: 6,
  } **/
  renderNotice (type) {
    let imageIcon
    let className
    let messageNotice
    switch (type) {
      case 0:
        imageIcon = Images.paymentExpired
        className = 'box notif-payment-expiry'
        messageNotice = 'Pesanan ditolak Seller'
        break
      case 3:
        imageIcon = Images.IconInfoBlue
        className = 'box notif-payment-waiting'
        messageNotice = 'Setelah buyer mengkonfirmasi telah menerima barang atau dalam jangka waktu 5 hari, saldo akan langsung kami kirimkan.'
        break
      case 4:
        imageIcon = Images.paymentDone
        className = 'box notif-payment-success'
        messageNotice = 'Barang telah diterima oleh pembeli. Uang penjualan telah kami kirimkan ke saldo Anda. Silahkan diperiksa.'
        break
      case 5:
        imageIcon = Images.paymentExpired
        className = 'box notif-payment-expiry'
        messageNotice = 'Terdapat barang yang bermasalah. Silahkan menyelesaikan masalah terlebih dahulu setelah masalah selesai, uang dari buyer akan kami kirimkan ke Anda.'
        break
      case 6:
        imageIcon = Images.paymentDone
        className = 'box notif-payment-success'
        messageNotice = 'Komplain telah selesai. Uang penjualan telah kami kirimkan ke saldo Anda. Silahkan diperiksa.'
        break
      default:
        break
    }
    return (
      <div className={className}>
        <article className='media'>
          <div className='media-left'>
            <figure className='image user-pict'>
              <MyImage src={imageIcon} alt='icon' />
            </figure>
          </div>
          <div className='media-content'>
            <div className='content'>
              <p>
                <strong>{messageNotice}</strong>
              </p>
            </div>
          </div>
        </article>
      </div>
    )
  }

  handleChangeReceiptNumber (data) {
    if (data.sale.invoice.type !== 'reseller') {
      if (data.sale.invoice.transaction_status === 2 || data.sale.invoice.transaction_status === 3) {
        return (
          <a className='js-option' onClick={() => this.modalEditReceiptNumber()}>Ubah</a>
        )
      }
    }
  }

  renderContentTabs (tabs) {
    const { saleDetail } = this.state
    const { sale } = saleDetail
    const newOrderDetail = { orderDetail: sale, ...saleDetail }
    if (tabs === TAB_DELIVERY_STATUS) {
      return (
        <DeliveryStatus
          saleDetail={saleDetail}
          transactionType={(type) => this.transactionType(type)}
          statusResi={(type) => this.statusResi(type)}
          renderNotice={(type) => this.renderNotice(type)}
          modalEditReceiptNumber={() => this.modalEditReceiptNumber()}
          handleChangeReceiptNumber={(data) => this.handleChangeReceiptNumber(data)} />
      )
    }
    if (tabs === TAB_SALES_DETAIL) {
      // delete newOrderDetail.sale
      return (
        <SaleDetail
          newOrderDetail={newOrderDetail}
          proccessOrder='sale' />
      )
    }
  }

  componentDidMount () {
    const { id } = this.state
    if (id) {
      NProgress.start()
      this.props.getSaleDetail({ id })
    }
  }

  componentWillReceiveProps (nextProps) {
    const { saleDetail, updateStatus } = nextProps
    const { isFetching, isFound, isError, notifError, notifSuccess } = this.props
    if (!isFetching(saleDetail) && !this.submiting) {
      if (isFound(saleDetail)) {
        NProgress.done()
        this.setState({ saleDetail })
        if ((saleDetail.sale.invoice.transaction_status === 2 || saleDetail.sale.invoice.transaction_status === 3)) {
          this.setState({ receiptNumber: saleDetail.sale.shipping.airway_bill })
        }
      }
      if (isError(saleDetail)) {
        this.setState({ notification: notifError(saleDetail.message) })
      }
    }
    if (!isFetching(updateStatus) && this.submiting) {
      this.submiting = false
      if (isFound(updateStatus)) {
        const { saleDetail, receiptNumber, showModal } = this.state
        const setReceiptNumber = { saleDetail, showModal: !showModal, notification: notifSuccess(updateStatus.message) }
        setReceiptNumber.saleDetail.sale.shipping['airway_bill'] = receiptNumber
        this.setState(setReceiptNumber)
      }
      if (isError(updateStatus)) {
        this.setState({ notification: notifError(updateStatus.message) })
      }
    }
  }

  render () {
    const { notification, tabs, saleDetail, receiptNumber, validation, showModal } = this.state
    return (
      <div>
        <div className='nav-tabs'>
          <a onClick={(e) => this.switchTab(e)} className={tabs === TAB_DELIVERY_STATUS && 'active'}>Status Pengiriman</a>
          <a onClick={(e) => this.switchTab(e)} className={tabs === TAB_SALES_DETAIL && 'active'}>Detail</a>
        </div>
        <Notification
          type={notification.type}
          isShow={notification.status}
          activeClose
          onClose={() => this.setState({notification: {status: false, message: ''}})}
          message={notification.message} />
        { saleDetail.isFound && this.renderContentTabs(tabs) }
        <div className='sort-option' style={{ display: showModal && 'block' }}>
          <div className='notif-report add-voucher'>
            <div className='header-notif'>
              <h3>Masukan Nomor Resi Baru</h3>
              <span className='icon-close' onClick={() => this.modalEditReceiptNumber()} />
            </div>
            <div className='field'>
              <p className={`control ${validation && 'is-error'}`}>
                <input type='text' className='input' value={receiptNumber} placeholder='Masukkan nomor resi disini'
                  onChange={(e) => this.handleInput(e)} />
                {validation && this.renderValidation('receiptNumber', 'Mohon isi no Resi')}
              </p>
            </div>
            <button className={`button is-primary is-large is-fullwidth ${this.submiting && 'is-loading'}`} onClick={() => this.submit()}>Perbarui No Resi</button>
          </div>
        </div>
      </div>
    )
  }
}

const DeliveryStatus = (props) => {
  const { saleDetail } = props
  if (saleDetail === undefined) return null
  moment.locale('id')
  return (
    <div>
      <section className='section is-paddingless has-shadow'>
        { props.renderNotice(saleDetail.sale.invoice.transaction_status) }
        <div className='info-purchase'>
          <div className='detail-rate is-purchase'>
            <div className='columns total-items is-mobile is-multiline no-margin-bottom'>
              <div className='column'>
                <div className='rating-content is-left'>
                  <strong>{saleDetail.sale.invoice.type === 'seller' ? saleDetail.sale.reseller.store.name : saleDetail.sale.buyer.name}</strong>
                </div>
              </div>
              <ul className='seller-items' style={{paddingRight: '16px'}}>
                {
                  saleDetail.sale.items.map((p, i) => {
                    if (i < 3) {
                      return (
                        <li style={{paddingLeft: 0, paddingRight: 5}} key={i}>
                          <a><MyImage src={p.product.image} alt='Pict' /></a>
                        </li>
                      )
                    } else {
                      return (
                        <li style={{paddingLeft: 0}}>
                          <figure className='list-transaction xs plus3'>
                            <span>+{i++}</span>
                            <a><MyImage src={p.product.image} alt='Pict' /></a>
                          </figure>
                        </li>
                      )
                    }
                  })
                }
              </ul>
            </div>
          </div>
        </div>
      </section>
      <section className='section is-paddingless has-shadow'>
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
                  <span className='has-text-left'>{saleDetail.sale.invoice.invoice_number}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='info-purchase'>
          <div className='detail-rate is-purchase'>
            <div className='columns total-items is-mobile is-multiline no-margin-bottom'>
              <div className='column is-one-quarter'>
                <div className='rating-content is-left'>
                  <strong>Status</strong>
                </div>
              </div>
              <div className='column'>
                <div className='rating-content item-qty has-text-right'>
                  { props.transactionType(saleDetail.sale.invoice.transaction_status)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className='section is-paddingless has-shadow'>
        <div className='info-purchase'>
          <div className='detail-rate is-purchase'>
            <div className='columns total-items is-mobile is-multiline no-margin-bottom'>
              <div className='column is-half'>
                <div className='rating-content is-left'>
                  <strong>Nomor Resi</strong>
                </div>
              </div>
              <div className='column is-half'>
                <div className='rating-content item-qty has-text-right'>
                  <span className='has-text-left'>{saleDetail.sale.shipping.airway_bill}</span> &nbsp;
                  { props.handleChangeReceiptNumber(saleDetail) }
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
                  <span className='has-text-left'>{props.statusResi(saleDetail.sale.shipping.sender_status)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      { (saleDetail.sale.invoice.transaction_status === 4 || saleDetail.sale.invoice.transaction_status === 6) && saleDetail.sale.invoice.type === 'buyer' && <ReviewProduct
        items={saleDetail.sale.items} />
      }
      { (saleDetail.sale.invoice.transaction_status === 4 || saleDetail.sale.invoice.transaction_status === 6) && saleDetail.sale.invoice.type === 'seller' && <section className='section is-paddingless has-shadow'>
        <div className='container is-fluid'>
          <div className='title'>
            <h3>Review Produk</h3>
          </div>
        </div>
        <div className='info-purchase'>
          <div className='detail-rate is-purchase'>
            <div className='columns total-items is-mobile is-multiline no-margin-bottom'>
              <div className='column'>
                <div className='rating-content is-left'>
                  <span className='text-grey'>Review menjadi milik Reseller</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      }
      { saleDetail.sale.invoice.transaction_status === 5 && <div>
        <section className='section is-paddingless has-shadow'>
          <div className='container is-fluid'>
            <div className='title'>
              <h3>Barang bermasalah</h3>
            </div>
          </div>
          {
            saleDetail.sale.items.map((p, i) => {
              return (
                <div className='info-purchase space-left' key={i}>
                  <div className='box'>
                    <div className='media'>
                      <div className='media-left is-full-bordered'>
                        <figure className='image list-transaction sm'>
                          <a><MyImage src={p.product.image} alt='Image' /></a>
                        </figure>
                      </div>
                      <div className='media-content middle'>
                        <div className='content'>
                          <h4>{p.product.name} </h4>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
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
                    <div className='item-status md right'>{saleDetail.sale.dispute.problems}</div>
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
                    <div className='item-status md right'>{saleDetail.sale.dispute.solution === 1 ? 'Refund Dana' : 'Barang ditukar'}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className='section is-paddingless'>
          <div className='container is-fluid'>
            <a className='button is-primary is-outlined is-large is-fullwidth' onClick={() => Router.push(`/complain-seller-detail?id=${saleDetail.sale.dispute.id}`)}>Ke Detail Komplain</a>
          </div>
        </section>
        </div>
      }
    </div>
  )
}

const ReviewProduct = (props) => {
  const { items } = props
  if (items[0].review === undefined || items[0].review === null) return null
  return (
    <div>
      {
        items.map((item, i) => {
          return (
            <section key={i}>
              <div className='profile-content rating'>
                <div className='profile-wrapp is-paddingless'>
                  <ul className='detail-seller left-margin'>
                    <li>
                      <div className='box is-paddingless'>
                        <article className='media'>
                          <div className='media-left is-bordered'>
                            <figure className='image'>
                              <MyImage src={item.product.image} alt='pict' />
                            </figure>
                          </div>
                          <div className='media-content middle'>
                            <div className='content'>
                              <p>
                                <strong>{item.product.name}</strong>
                              </p>
                            </div>
                          </div>
                        </article>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <div className='columns detail-rating is-mobile is-multiline no-margin-bottom'>
                <div className='column is-half'>
                  <div className='rating-content is-left'>
                    <h3>Kualitas Produk</h3>
                    <span className='star-rating'>
                      <MyRating
                        readonly
                        initialRate={item.review.quality}
                        start={0}
                        stop={5} />
                    </span>
                  </div>
                </div>
                <div className='column is-half'>
                  <div className='rating-content is-left'>
                    <h3>Akurasi Produk</h3>
                    <span className='star-rating'>
                      <MyRating
                        readonly
                        initialRate={item.review.accuracy}
                        start={0}
                        stop={5} />
                    </span>
                  </div>
                </div>
                <div className='column'>
                  <p className='desc'>{item.review.review}</p>
                </div>
              </div>
            </section>
          )
        })
      }
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    saleDetail: state.saleDetail,
    updateStatus: state.updateStatus
  }
}

const mapDispatchToProps = dispatch => ({
  getSaleDetail: (params) => dispatch(transactionAction.getSaleDetail(params)),
  inputAirwayBill: (params) => dispatch(transactionAction.inputAirwayBill(params))
})

export default connect(mapStateToProps, mapDispatchToProps)(SalesDetail)
