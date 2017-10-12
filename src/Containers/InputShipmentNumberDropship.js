// @flow
import React from 'react'
import { connect } from 'react-redux'
import NProgress from 'nprogress'
import moment from 'moment'
// components
import Router from 'next/router'
import Images from '../Themes/Images'
import Notification from '../Components/Notification'
// lib
import RupiahFormat from '../Lib/RupiahFormat'
// actions
import * as transactionAction from '../actions/transaction'
// services
import { isFetching, validateResponse } from '../Services/Status'

const TAB_NO_RESI = 'TAB_NO_RESI'
const TAB_DETAIL = 'TAB_DETAIL'

class InputShipmentNumber extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      id: props.query.id || null,
      processingOrderDetail: props.processingOrderDetail || null,
      tabs: TAB_NO_RESI,
      notification: {
        type: 'is-success',
        status: false,
        message: 'Error, default message.'
      }
    }
    this.submiting = false
  }

  switchTab (e) {
    const { tabs } = this.state
    this.setState({ tabs: (tabs === TAB_NO_RESI) ? TAB_DETAIL : TAB_NO_RESI })
  }

  componentDidMount () {
    const { id } = this.state
    if (id !== '') {
      NProgress.start()
      this.props.getProcessingOrderDetail({ id })
    }
  }

  componentWillReceiveProps (nextProps) {
    const { processingOrderDetail } = nextProps
    if (!isFetching(processingOrderDetail)) {
      NProgress.done()
      this.setState({ processingOrderDetail, notification: validateResponse(processingOrderDetail, processingOrderDetail.message) })
    }
  }

  render () {
    const { notification, tabs, processingOrderDetail } = this.state
    if (!processingOrderDetail.isFound) return null
    return (
      <div>
        <div className='nav-tabs'>
          <a onClick={(e) => this.switchTab(e)} className={tabs === TAB_NO_RESI && 'active'}>Nomor Resi</a>
          <a onClick={(e) => this.switchTab(e)} className={tabs === TAB_DETAIL && 'active'}>Detail</a>
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
              {
                tabs === TAB_NO_RESI
                ? <ShipmentReceiptNumber
                  processingOrderDetail={processingOrderDetail} />
                : <OrderDetail
                  processingOrderDetail={processingOrderDetail} />
              }
            </ul>
          </div>
        </section>
      </div>
    )
  }
}

const ShipmentReceiptNumber = (props) => {
  const { processingOrderDetail } = props
  if (processingOrderDetail === undefined) return null
  moment.locale('id')
  return (
    <div>
      <section className='section is-paddingless has-shadow'>
        <div className='box notif-payment-waiting'>
          <article className='media'>
            <div className='media-left'>
              <figure className='image user-pict'>
                <img src={Images.IconInfoBlue} alt='icon' />
              </figure>
            </div>
            <div className='media-content'>
              <div className='content'>
                <p>
                  <strong>{`Anda memiliki waktu 3 hari sampai tanggal ${moment.unix(processingOrderDetail.orderDetail.invoice.created_at).add(3, 'days').format(' DD MMMM YYYY')} untuk menginformasikan nomor resi. Jika tidak kami akan membatalkan pesanan ini`}</strong>
                </p>
              </div>
            </div>
          </article>
        </div>
        <div className='info-purchase'>
          <div className='detail-rate is-purchase'>
            <div className='columns total-items is-mobile is-multiline no-margin-bottom'>
              <div className='column'>
                <div className='rating-content is-left'>
                  <strong>{processingOrderDetail.orderDetail.buyer.name}</strong>
                </div>
              </div>
              <ul className='seller-items'>
                {
                  processingOrderDetail.orderDetail.items.map((p, i) => {
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
                <div className='r is-left'>
                  <strong className='bold'>Info Pengiriman</strong>
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
                  <strong>Kurir Pengiriman</strong>
                </div>
              </div>
              <div className='column is-half'>
                <div className='rating-content item-qty has-text-right'>
                  <span className='has-text-left text-grey'>{processingOrderDetail.orderDetail.invoice.expedition.expedition.name}</span>
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
                  <strong>Paket Pengiriman</strong>
                </div>
              </div>
              <div className='column is-half'>
                <div className='rating-content item-qty has-text-right'>
                  <span className='has-text-left text-grey'>{processingOrderDetail.orderDetail.invoice.expedition.name}</span>
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
                  <strong>Asuransi</strong>
                </div>
              </div>
              <div className='column is-half'>
                <div className='rating-content item-qty has-text-right'>
                  <span className='has-text-left text-grey'>{processingOrderDetail.orderDetail.invoice.is_insurance ? 'Ya' : 'Tidak'}</span>
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
                  <strong>No Resi</strong>
                </div>
              </div>
              <div className='column is-half'>
                <div className='rating-content item-qty has-text-right'>
                  <span className='has-text-left text-grey'>Menunggu No Resi dari Seller</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className='section is-paddingless'>
        <div className='container is-fluid'>
          <a className='button is-primary is-outlined is-large is-fullwidth' onClick={() => Router.push(`/send-message-shipment?id=${processingOrderDetail.orderDetail.invoice.id}&type=seller`)}>Kirim Pesan ke Seller</a>
        </div>
      </section>
    </div>
  )
}

const OrderDetail = (props) => {
  const { processingOrderDetail } = props
  if (processingOrderDetail === undefined) return null
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
                  <span className='has-text-left'>{processingOrderDetail.orderDetail.invoice.invoice_number}</span>
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
                  <span className='has-text-left'>{moment.unix(processingOrderDetail.orderDetail.invoice.created_at).format('ddd, DD MMMM YYYY')}</span>
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
                          <a><img src={processingOrderDetail.orderDetail.buyer.photo} alt='Image' /></a>
                        </figure>
                      </div>
                      <div className='media-content middle is-right-content'>
                        <div className='content'>
                          <h4>{processingOrderDetail.orderDetail.buyer.name}</h4>
                        </div>
                      </div>
                      <div className='right-top' style={{paddingRight: '16px'}}>
                        <a className='button is-primary is-outlined' onClick={() => Router.push(`/send-message-shipment?id=${processingOrderDetail.orderDetail.invoice.id}&type=buyer`)}>Kirim Pesan</a>
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
          { processingOrderDetail.orderDetail.items.map((item, i) => {
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
                      {processingOrderDetail.orderDetail.buyer.name}<br />
                      {processingOrderDetail.orderDetail.buyer.address.address}<br />
                      {processingOrderDetail.orderDetail.buyer.address.village.name}, {processingOrderDetail.orderDetail.buyer.address.subdistrict.name}, {processingOrderDetail.orderDetail.buyer.address.district.name}<br />
                      {processingOrderDetail.orderDetail.buyer.address.province.name}, {processingOrderDetail.orderDetail.buyer.address.postal_code}<br />
                      Telp: {processingOrderDetail.orderDetail.buyer.phone_number.replace(/(\d{4})(\d{4})(\d+)/, '$1-$2-$3')}
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
                      {processingOrderDetail.orderDetail.seller.name} {`(${processingOrderDetail.orderDetail.reseller.store.name})`}<br />
                      {processingOrderDetail.orderDetail.seller.address.address}<br />
                      {processingOrderDetail.orderDetail.seller.address.village.name}, {processingOrderDetail.orderDetail.seller.address.subdistrict.name}, {processingOrderDetail.orderDetail.seller.address.district.name}<br />
                      {processingOrderDetail.orderDetail.seller.address.province.name}, {processingOrderDetail.orderDetail.seller.address.postal_code}<br />
                      Telp: {processingOrderDetail.orderDetail.seller.phone_number.replace(/(\d{4})(\d{4})(\d+)/, '$1-$2-$3')}
                    </span>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className='column is-paddingless'>
          <div className='see-all'>
            <span className='link black js-option'>Kurir Pengiriman <span className='kurir normal'>{processingOrderDetail.orderDetail.invoice.expedition.expedition.name}</span></span>
          </div>
        </div>
        <div className='column is-paddingless'>
          <div className='see-all'>
            <span className='link black js-option'>Pilih Paket Pengiriman <span className='kurir normal'>{processingOrderDetail.orderDetail.invoice.expedition.name}</span></span>
          </div>
        </div>
        <div className='column is-paddingless'>
          <div className='see-all'>
            <span className='link black js-option'>Asuransi <span className='kurir normal'>{processingOrderDetail.orderDetail.invoice.is_insurance ? 'Ya' : 'Tidak'}</span></span>
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
                    <div className='column is-half has-text-right'><span>Rp { RupiahFormat(processingOrderDetail.orderDetail.invoice.total_price) }</span></div>
                  </div>
                </li>
                <li>
                  <div className='columns custom is-mobile'>
                    <div className='column is-half'><strong>Biaya Asuransi</strong></div>
                    <div className='column is-half has-text-right'><span>Rp { RupiahFormat(processingOrderDetail.orderDetail.invoice.insurance_fee) }</span></div>
                  </div>
                </li>
                <li>
                  <div className='columns custom is-mobile'>
                    <div className='column is-half'><strong>Ongkos Kirim</strong></div>
                    <div className='column is-half has-text-right'><span>Rp { RupiahFormat(processingOrderDetail.orderDetail.invoice.delivery_cost) }</span></div>
                  </div>
                </li>
              </ul>
              <ul className='total'>
                <li>
                  <div className='columns custom is-mobile'>
                    <div className='column is-half'><strong>Total</strong></div>
                    <div className='column is-half has-text-right'><strong>Rp { RupiahFormat(processingOrderDetail.orderDetail.invoice.total_bill) }</strong></div>
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

const mapStateToProps = (state) => {
  return {
    processingOrderDetail: state.processingOrderDetail
  }
}

const mapDispatchToProps = dispatch => ({
  getProcessingOrderDetail: (params) => dispatch(transactionAction.getProcessingOrderDetail(params))
})

export default connect(mapStateToProps, mapDispatchToProps)(InputShipmentNumber)
