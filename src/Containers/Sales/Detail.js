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
// lib
import RupiahFormat from '../../Lib/RupiahFormat'
// actions
import * as transactionAction from '../../actions/transaction'
// services
import { isFetching, validateResponse, validateResponseAlter, isError, isFound } from '../../Services/Status'

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
        status = 'Menunggu konfirmasi Seller'
        break
      case 2:
        className = 'item-status md right delivered'
        status = 'Barang sudah dikirim'
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

  renderNotice (type) {
    let imageIcon
    let className
    let messageNotice
    switch (type) {
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
              <img src={imageIcon} alt='icon' />
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

  renderContentTabs (tabs) {
    const { saleDetail } = this.state
    if (tabs === TAB_DELIVERY_STATUS) {
      return (
        <DeliveryStatus
          saleDetail={saleDetail}
          transactionType={(type) => this.transactionType(type)}
          statusResi={(type) => this.statusResi(type)}
          renderNotice={(type) => this.renderNotice(type)}
          modalEditReceiptNumber={() => this.modalEditReceiptNumber()} />
      )
    }
    if (tabs === TAB_SALES_DETAIL) {
      if (saleDetail.sale.invoice.type === 'reseller') {
        return (
          <OrderDetailDropship
            saleDetail={saleDetail} />
        )
      } else {
        return (
          <OrderDetail
            saleDetail={saleDetail} />
        )
      }
    }
  }

  componentDidMount () {
    const { id } = this.state
    if (id !== '') {
      NProgress.start()
      this.props.getSaleDetail({ id })
    }
  }

  componentWillReceiveProps (nextProps) {
    const { saleDetail, updateStatus } = nextProps
    if (!isFetching(saleDetail) && !this.submiting) {
      if (isFound(saleDetail)) {
        NProgress.done()
        this.setState({ saleDetail })
        if ((saleDetail.sale.invoice.transaction_status === 2 || saleDetail.sale.invoice.transaction_status === 3)) {
          this.setState({ receiptNumber: saleDetail.sale.shipping.airway_bill })
        }
      }
      if (isError(saleDetail)) {
        this.setState({ notification: validateResponse(saleDetail, saleDetail.message) })
      }
    }
    if (!isFetching(updateStatus) && this.submiting) {
      if (isFound(updateStatus)) {
        this.submiting = false
        const { saleDetail, receiptNumber, showModal } = this.state
        const setReceiptNumber = { saleDetail, showModal: !showModal, notification: validateResponseAlter(updateStatus, updateStatus.message, updateStatus.message) }
        setReceiptNumber.saleDetail.sale.shipping['airway_bill'] = receiptNumber
        this.setState(setReceiptNumber)
      }
      if (isError(updateStatus)) {
        this.submiting = false
        this.setState({ notification: validateResponse(updateStatus, 'Gagal mengubah No Resi') })
      }
    }
  }

  render () {
    const { notification, tabs, saleDetail, receiptNumber, validation, showModal } = this.state
    if (!saleDetail.isFound) return null
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
        <section className='section is-paddingless'>
          <div className='discuss'>
            <ul className='notif-detail conversation bordered'>
              { this.renderContentTabs(tabs) }
            </ul>
          </div>
        </section>
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
                          <a><img src={p.product.image} alt='Pict' /></a>
                        </li>
                      )
                    } else {
                      return (
                        <li style={{paddingLeft: 0}}>
                          <figure className='list-transaction xs plus3'>
                            <span>+{i++}</span>
                            <a><img src={p.product.image} alt='Pict' /></a>
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
                  <strong>Status Barang</strong>
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
                  {(saleDetail.sale.invoice.transaction_status === 2 || saleDetail.sale.invoice.transaction_status === 3) ? <a className='js-option' onClick={() => props.modalEditReceiptNumber()}>Ubah</a> : ''}
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
                          <a><img src={p.product.image} alt='Image' /></a>
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
            <a className='button is-primary is-outlined is-large is-fullwidth'>Ke Detail Komplain</a>
          </div>
        </section>
        </div>
      }
    </div>
  )
}

const OrderDetail = (props) => {
  const { saleDetail } = props
  if (saleDetail === undefined) return null
  moment.locale('id')
  return (
    <div>
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
                  <strong>Tanggal Transaksi</strong>
                </div>
              </div>
              <div className='column'>
                <div className='rating-content item-qty has-text-right'>
                  <span className='has-text-left'>{moment.unix(saleDetail.sale.invoice.created_at).format('ddd, DD MMMM YYYY')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className='section is-paddingless has-shadow'>
        <div className='container is-fluid'>
          <div className='title'>
            <br />
            <h3>{saleDetail.sale.invoice.type === 'seller' ? 'Info Reseller' : 'Info Pembeli'}</h3>
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
                          <a><img src={saleDetail.sale.invoice.type === 'seller' ? saleDetail.sale.reseller.store.logo : saleDetail.sale.buyer.photo} alt='Image' /></a>
                        </figure>
                      </div>
                      <div className='media-content middle is-right-content'>
                        <div className='content'>
                          <h4>{saleDetail.sale.invoice.type === 'seller' ? saleDetail.sale.reseller.store.name : saleDetail.sale.buyer.name}</h4>
                        </div>
                      </div>
                      <div className='right-top' style={{paddingRight: '16px'}}>
                        {
                          saleDetail.sale.invoice.type === 'seller'
                          ? <a className='button is-primary is-outlined' onClick={() => Router.push(`/send-message-sales?id=${saleDetail.sale.invoice.id}&type=reseller`)}>Kirim Pesan</a>
                          : <a className='button is-primary is-outlined' onClick={() => Router.push(`/send-message-sales?id=${saleDetail.sale.invoice.id}&type=buyer`)}>Kirim Pesan</a>
                        }
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
            <br />
            <h3>Daftar Barang yang dibeli</h3>
          </div>
        </div>
        <ul className='list-trans-product'>
          { saleDetail.sale.items.map((item, i) => {
            return (
              <li key={i}>
                <div className='box'>
                  <div className='media'>
                    <div className='media-left is-bordered top'>
                      <figure className='image list-transaction lg'>
                        <a><img src={item.product.image} alt='Image' /></a>
                      </figure>
                    </div>
                    <div className='media-content'>
                      <div className='content'>
                        <h4>{item.product.name} </h4>
                        <strong>Harga : Rp { RupiahFormat(item.product.price) }</strong>
                        <strong>Jumlah : {item.qty}</strong>
                        <span>{item.note !== '' && `'${item.note}'`}</span>
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
                    <strong>Alamat Pengirim</strong>
                    <span className='address'>
                      {saleDetail.sale.buyer.name}<br />
                      {saleDetail.sale.buyer.address.address}<br />
                      {saleDetail.sale.buyer.address.village.name}, {saleDetail.sale.buyer.address.subdistrict.name}, {saleDetail.sale.buyer.address.district.name}<br />
                      {saleDetail.sale.buyer.address.province.name}, {saleDetail.sale.buyer.address.postal_code}<br />
                      Telp: {saleDetail.sale.buyer.phone_number.replace(/(\d{4})(\d{4})(\d+)/, '$1-$2-$3')}
                    </span>
                    <div className='right-top topR'>
                      <a className='button is-primary is-outlined'>Cetak Alamat</a>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        {
          saleDetail.sale.invoice.type === 'seller' && <div className='notif-inside'>
            <div className='notif-info'>
              <span>Barang ini terjual dari reseller. Sehingga nama toko reseller disertakan.</span>
            </div>
          </div>
        }
        { saleDetail.sale.invoice.type === 'seller'
          ? <div className='detail-purchase summary at-cart'>
            <div className='detail-result white'>
              <ul className='data-delivery'>
                <li>
                  <div className='columns custom is-mobile'>
                    <div className='column'>
                      <strong>Info Alamat Penjual</strong>
                      <span className='address'>
                        {saleDetail.sale.seller.name} ({saleDetail.sale.reseller.store.name})<br />
                        {saleDetail.sale.seller.address.address}<br />
                        {saleDetail.sale.seller.address.village.name}, {saleDetail.sale.seller.address.subdistrict.name}, {saleDetail.sale.seller.address.district.name}<br />
                        {saleDetail.sale.seller.address.province.name}, {saleDetail.sale.seller.address.postal_code}<br />
                        Telp: {saleDetail.sale.seller.phone_number.replace(/(\d{4})(\d{4})(\d+)/, '$1-$2-$3')}
                      </span>
                      <div className='right-top topR'>
                        <a className='button is-primary is-outlined'>Cetak Alamat</a>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          : <div className='detail-purchase summary at-cart'>
            <div className='detail-result white'>
              <ul className='data-delivery'>
                <li>
                  <div className='columns custom is-mobile'>
                    <div className='column'>
                      <strong>Info Alamat Penjual</strong>
                      <span className='address'>
                        {saleDetail.sale.seller.name}<br />
                        {saleDetail.sale.seller.address.address}<br />
                        {saleDetail.sale.seller.address.village.name}, {saleDetail.sale.seller.address.subdistrict.name}, {saleDetail.sale.seller.address.district.name}<br />
                        {saleDetail.sale.seller.address.province.name}, {saleDetail.sale.seller.address.postal_code}<br />
                        Telp: {saleDetail.sale.seller.phone_number.replace(/(\d{4})(\d{4})(\d+)/, '$1-$2-$3')}
                      </span>
                      <div className='right-top topR'>
                        <a className='button is-primary is-outlined'>Cetak Alamat</a>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        }
        <div className='column is-paddingless'>
          <div className='see-all'>
            <span className='link black js-option'>Kurir Pengiriman <span className='kurir normal'>{saleDetail.sale.invoice.expedition.expedition.name}</span></span>
          </div>
        </div>
        <div className='column is-paddingless'>
          <div className='see-all'>
            <span className='link black js-option'>Pilih Paket Pengiriman <span className='kurir normal'>{saleDetail.sale.invoice.expedition.name}</span></span>
          </div>
        </div>
        <div className='column is-paddingless'>
          <div className='see-all'>
            <span className='link black js-option'>Asuransi <span className='kurir normal'>{saleDetail.sale.invoice.is_insurance ? 'Ya' : 'Tidak'}</span></span>
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
                    <div className='column is-half'><strong>Subtotal</strong></div>
                    <div className='column is-half has-text-right'><span>Rp { RupiahFormat(saleDetail.sale.invoice.total_price) }</span></div>
                  </div>
                </li>
                <li>
                  <div className='columns custom is-mobile'>
                    <div className='column is-half'><strong>Biaya Asuransi</strong></div>
                    <div className='column is-half has-text-right'><span>Rp { RupiahFormat(saleDetail.sale.invoice.insurance_fee) }</span></div>
                  </div>
                </li>
                <li>
                  <div className='columns custom is-mobile'>
                    <div className='column is-half'><strong>Ongkos Kirim</strong></div>
                    <div className='column is-half has-text-right'><span>Rp { RupiahFormat(saleDetail.sale.invoice.delivery_cost) }</span></div>
                  </div>
                </li>
              </ul>
              <ul className='total'>
                <li>
                  <div className='columns custom is-mobile'>
                    <div className='column is-half'><strong>Total</strong></div>
                    <div className='column is-half has-text-right'><strong>Rp { RupiahFormat(saleDetail.sale.invoice.total_bill) }</strong></div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

const OrderDetailDropship = (props) => {
  const { saleDetail } = props
  if (saleDetail === undefined) return null
  moment.locale('id')
  return (
    <div>
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
                  <strong>Tanggal Transaksi</strong>
                </div>
              </div>
              <div className='column'>
                <div className='rating-content item-qty has-text-right'>
                  <span className='has-text-left'>{moment.unix(saleDetail.sale.invoice.created_at).format('ddd, DD MMMM YYYY')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className='section is-paddingless has-shadow'>
        <div className='container is-fluid'>
          <div className='title'>
            <br />
            <h3>Info Pembeli</h3>
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
                          <a><img src={saleDetail.sale.buyer.photo} alt='Image' /></a>
                        </figure>
                      </div>
                      <div className='media-content middle is-right-content'>
                        <div className='content'>
                          <h4>{saleDetail.sale.buyer.name}</h4>
                        </div>
                      </div>
                      <div className='right-top' style={{paddingRight: '16px'}}>
                        <a className='button is-primary is-outlined' onClick={() => Router.push(`/send-message-sales?id=${saleDetail.sale.invoice.id}&type=buyer`)}>Kirim Pesan</a>
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
            <br />
            <h3>Daftar Barang yang dibeli</h3>
          </div>
        </div>
        <ul className='list-trans-product'>
          { saleDetail.sale.items.map((item, i) => {
            return (
              <li key={i}>
                <div className='box'>
                  <div className='media'>
                    <div className='media-left is-bordered top'>
                      <figure className='image list-transaction lg'>
                        <a><img src={item.product.image} alt='Image' /></a>
                      </figure>
                    </div>
                    <div className='media-content'>
                      <div className='content'>
                        <h4>{item.product.name} </h4>
                        <strong>Harga : Rp { RupiahFormat(item.product.price) }</strong>
                        <strong>Jumlah : {item.qty}</strong>
                        <span>{item.note !== '' && `'${item.note}'`}</span>
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
                    <strong>Alamat Pengirim</strong>
                    <span className='address'>
                      {saleDetail.sale.buyer.name}<br />
                      {saleDetail.sale.buyer.address.address}<br />
                      {saleDetail.sale.buyer.address.village.name}, {saleDetail.sale.buyer.address.subdistrict.name}, {saleDetail.sale.buyer.address.district.name}<br />
                      {saleDetail.sale.buyer.address.province.name}, {saleDetail.sale.buyer.address.postal_code}<br />
                      Telp: {saleDetail.sale.buyer.phone_number.replace(/(\d{4})(\d{4})(\d+)/, '$1-$2-$3')}
                    </span>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className='detail-purchase summary at-cart'>
          <div className='detail-result white'>
            <ul className='data-delivery'>
              <li>
                <div className='columns custom is-mobile'>
                  <div className='column'>
                    <strong>Info Alamat Penjual</strong>
                    <span className='address'>
                      {saleDetail.sale.seller.name} {`(${saleDetail.sale.reseller.store.name})`}<br />
                      {saleDetail.sale.seller.address.address}<br />
                      {saleDetail.sale.seller.address.village.name}, {saleDetail.sale.seller.address.subdistrict.name}, {saleDetail.sale.seller.address.district.name}<br />
                      {saleDetail.sale.seller.address.province.name}, {saleDetail.sale.seller.address.postal_code}<br />
                      Telp: {saleDetail.sale.seller.phone_number.replace(/(\d{4})(\d{4})(\d+)/, '$1-$2-$3')}
                    </span>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className='column is-paddingless'>
          <div className='see-all'>
            <span className='link black js-option'>Kurir Pengiriman <span className='kurir normal'>{saleDetail.sale.invoice.expedition.expedition.name}</span></span>
          </div>
        </div>
        <div className='column is-paddingless'>
          <div className='see-all'>
            <span className='link black js-option'>Pilih Paket Pengiriman <span className='kurir normal'>{saleDetail.sale.invoice.expedition.name}</span></span>
          </div>
        </div>
        <div className='column is-paddingless'>
          <div className='see-all'>
            <span className='link black js-option'>Asuransi <span className='kurir normal'>{saleDetail.sale.invoice.is_insurance ? 'Ya' : 'Tidak'}</span></span>
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
                    <div className='column is-half'><strong>Subtotal</strong></div>
                    <div className='column is-half has-text-right'><span>Rp { RupiahFormat(saleDetail.sale.invoice.total_price) }</span></div>
                  </div>
                </li>
                <li>
                  <div className='columns custom is-mobile'>
                    <div className='column is-half'><strong>Biaya Asuransi</strong></div>
                    <div className='column is-half has-text-right'><span>Rp { RupiahFormat(saleDetail.sale.invoice.insurance_fee) }</span></div>
                  </div>
                </li>
                <li>
                  <div className='columns custom is-mobile'>
                    <div className='column is-half'><strong>Ongkos Kirim</strong></div>
                    <div className='column is-half has-text-right'><span>Rp { RupiahFormat(saleDetail.sale.invoice.delivery_cost) }</span></div>
                  </div>
                </li>
              </ul>
              <ul className='total'>
                <li>
                  <div className='columns custom is-mobile'>
                    <div className='column is-half'><strong>Total</strong></div>
                    <div className='column is-half has-text-right'><strong>Rp { RupiahFormat(saleDetail.sale.invoice.total_bill) }</strong></div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
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
                              <img src={item.product.image} alt='pict' />
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
