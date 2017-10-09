// @flow
import React from 'react'
import { connect } from 'react-redux'
import NProgress from 'nprogress'
import moment from 'moment'
// components
import Router from 'next/router'
import Notification from '../Components/Notification'
// lib
import Images from '../Themes/Images'
import RupiahFormat from '../Lib/RupiahFormat'
// actions
import * as transactionAction from '../actions/transaction'
// services
import { validateResponse, isFetching, isFound, isError } from '../Services/Status'

class OrderDetail extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      id: props.query.id || null,
      newOrderDetail: props.newOrderDetail || null,
      showModalConfirm: false,
      showModalReject: false,
      showModalConfirmReject: false,
      submitType: '',
      notification: {
        type: 'is-success',
        status: false,
        message: 'Error, default message.'
      }
    }
    this.submiting = false
  }

  modalConfirm () {
    this.setState({ showModalConfirm: !this.state.showModalConfirm })
  }

  modalReject () {
    this.setState({ showModalReject: !this.state.showModalReject })
  }

  showModalConfirmReject () {
    this.setState({ showModalReject: false, showModalConfirmReject: !this.state.showModalConfirmReject })
  }

  componentDidMount () {
    const { id } = this.state
    if (id !== '') {
      NProgress.start()
      this.props.getNewOrderDetail({ id })
    }
  }

  acceptOrder (id) {
    this.submiting = true
    this.setState({ submitType: 'acceptOrder' })
    this.props.acceptOrder({ id })
  }

  rejectOrder (id) {
    this.submiting = true
    this.setState({ submitType: 'rejectOrder' })
    this.props.rejectOrder({ id })
  }

  componentWillReceiveProps (nextProps) {
    const { newOrderDetail, updateStatus } = nextProps
    if (!isFetching(newOrderDetail)) {
      NProgress.done()
      this.setState({ newOrderDetail, notification: validateResponse(newOrderDetail, 'Data review tidak ditemukan!') })
    }
    if (!isFetching(updateStatus) && this.submiting) {
      if (isFound(updateStatus)) {
        if (this.state.submitType === 'acceptOrder') {
          this.modalConfirm()
        }
        if (this.state.submitType === 'rejectOrder') {
          this.showModalConfirmReject()
        }
      }
      if (isError(updateStatus)) {
        this.setState({ notification: validateResponse(updateStatus, 'Gagal update Order!') })
      }
      this.submiting = false
    }
  }

  render () {
    const { newOrderDetail, notification } = this.state
    if (!newOrderDetail.isFound) return null
    return (
      <div>
        <Notification
          type={notification.type}
          isShow={notification.status}
          activeClose
          onClose={() => this.setState({notification: {status: false, message: ''}})}
          message={notification.message} />
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
                    <span className='has-text-left'>{newOrderDetail.orderDetail.invoice.invoice_number}</span>
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
                    <span className='has-text-left'>{moment.unix(newOrderDetail.orderDetail.invoice.created_at).format('ddd, DD MMMM YYYY')}</span>
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
              <h3>{newOrderDetail.orderDetail.invoice.type === 'seller' ? 'Info Reseller' : 'Info Pembeli'}</h3>
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
                            <a><img src={newOrderDetail.orderDetail.invoice.type === 'seller' ? newOrderDetail.orderDetail.reseller.store.logo : newOrderDetail.orderDetail.buyer.photo} alt='Image' /></a>
                          </figure>
                        </div>
                        <div className='media-content middle is-right-content'>
                          <div className='content'>
                            <h4>{newOrderDetail.orderDetail.invoice.type === 'seller' ? newOrderDetail.orderDetail.reseller.store.name : newOrderDetail.orderDetail.buyer.name}</h4>
                          </div>
                        </div>
                        <div className='right-top'>
                          {
                            newOrderDetail.orderDetail.invoice.type === 'seller'
                            ? <a className='button is-primary is-outlined' onClick={() => Router.push(`/send-message?id=${newOrderDetail.orderDetail.invoice.id}&type=reseller`)}>Kirim Pesan</a>
                            : <a className='button is-primary is-outlined' onClick={() => Router.push(`/send-message?id=${newOrderDetail.orderDetail.invoice.id}&type=buyer`)}>Kirim Pesan</a>
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
            { newOrderDetail.orderDetail.items.map((item, i) => {
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
                          <span>{item.note !== '' && `"${item.note}"`}</span>
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
                        {newOrderDetail.orderDetail.buyer.name}<br />
                        {newOrderDetail.orderDetail.buyer.address.address}<br />
                        {newOrderDetail.orderDetail.buyer.address.village.name}, {newOrderDetail.orderDetail.buyer.address.subdistrict.name}, {newOrderDetail.orderDetail.buyer.address.district.name}<br />
                        {newOrderDetail.orderDetail.buyer.address.province.name}, {newOrderDetail.orderDetail.buyer.address.postal_code}<br />
                        Telp: {newOrderDetail.orderDetail.buyer.phone_number.replace(/(\d{4})(\d{4})(\d+)/, '$1-$2-$3')}
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
            newOrderDetail.orderDetail.invoice.type === 'seller' && <div className='notif-inside'>
              <div className='notif-info'>
                <span>Barang ini terjual dari reseller. Sehingga nama toko reseller disertakan.</span>
              </div>
            </div>
          }
          { newOrderDetail.orderDetail.invoice.type === 'seller'
            ? <ul className='list-trans-product'>
              <li>
                <div className='columns custom is-mobile'>
                  <div className='column'>
                    <strong>Info Alamat Penjual</strong><br />
                    <span className='address'>
                      {newOrderDetail.orderDetail.seller.name} ({newOrderDetail.orderDetail.reseller.store.name})<br />
                      {newOrderDetail.orderDetail.seller.address.address}<br />
                      {newOrderDetail.orderDetail.seller.address.village.name}, {newOrderDetail.orderDetail.seller.address.subdistrict.name}, {newOrderDetail.orderDetail.seller.address.district.name}<br />
                      {newOrderDetail.orderDetail.seller.address.province.name}, {newOrderDetail.orderDetail.seller.address.postal_code}<br />
                      Telp: {newOrderDetail.orderDetail.seller.phone_number.replace(/(\d{4})(\d{4})(\d+)/, '$1-$2-$3')}
                    </span>
                    <div className='right-top topR'>
                      <a className='button is-primary is-outlined'>Cetak Alamat</a>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
            : <ul className='list-trans-product'>
              <li>
                <div className='columns custom is-mobile'>
                  <div className='column'>
                    <strong>Info Alamat Penjual</strong><br />
                    <span className='address'>
                      {newOrderDetail.orderDetail.seller.name}<br />
                      {newOrderDetail.orderDetail.seller.address.address}<br />
                      {newOrderDetail.orderDetail.seller.address.village.name}, {newOrderDetail.orderDetail.seller.address.subdistrict.name}, {newOrderDetail.orderDetail.seller.address.district.name}<br />
                      {newOrderDetail.orderDetail.seller.address.province.name}, {newOrderDetail.orderDetail.seller.address.postal_code}<br />
                      Telp: {newOrderDetail.orderDetail.seller.phone_number.replace(/(\d{4})(\d{4})(\d+)/, '$1-$2-$3')}
                    </span>
                    <div className='right-top topR'>
                      <a className='button is-primary is-outlined'>Cetak Alamat</a>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          }
          <div className='column is-paddingless'>
            <div className='see-all'>
              <span className='link black js-option'>Kurir Pengiriman <span className='kurir normal'>{newOrderDetail.orderDetail.invoice.expedition.expedition.name}</span></span>
            </div>
          </div>
          <div className='column is-paddingless'>
            <div className='see-all'>
              <span className='link black js-option'>Pilih Paket Pengiriman <span className='kurir normal'>{newOrderDetail.orderDetail.invoice.expedition.name}</span></span>
            </div>
          </div>
          <div className='column is-paddingless'>
            <div className='see-all'>
              <span className='link black js-option'>Asuransi <span className='kurir normal'>{newOrderDetail.orderDetail.invoice.is_insurance ? 'Ya' : 'Tidak'}</span></span>
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
                      <div className='column is-half has-text-right'><span>Rp { RupiahFormat(newOrderDetail.orderDetail.invoice.total_price) }</span></div>
                    </div>
                  </li>
                  <li>
                    <div className='columns custom is-mobile'>
                      <div className='column is-half'><strong>Biaya Asuransi</strong></div>
                      <div className='column is-half has-text-right'><span>Rp { RupiahFormat(newOrderDetail.orderDetail.invoice.insurance_fee) }</span></div>
                    </div>
                  </li>
                  <li>
                    <div className='columns custom is-mobile'>
                      <div className='column is-half'><strong>Ongkos Kirim</strong></div>
                      <div className='column is-half has-text-right'><span>Rp { RupiahFormat(newOrderDetail.orderDetail.invoice.delivery_cost) }</span></div>
                    </div>
                  </li>
                </ul>
                <ul className='total'>
                  <li>
                    <div className='columns custom is-mobile'>
                      <div className='column is-half'><strong>Total</strong></div>
                      <div className='column is-half has-text-right'><strong>Rp { RupiahFormat(newOrderDetail.orderDetail.invoice.total_bill) }</strong></div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        <div className='level btn-wrapp'>
          <div className='columns is-mobile'>
            <div className='column is-half'>
              <a className='button is-primary is-large is-fullwidth is-outlined js-option' onClick={() => this.modalReject()}>Tolak</a>
            </div>
            <div className='column'>
              <a className={`button is-primary is-large is-fullwidth js-option ${this.submiting && 'is-loading'}`} onClick={() => this.acceptOrder(newOrderDetail.orderDetail.invoice.id)}>Terima</a>
            </div>
          </div>
        </div>

        <div className='sort-option' style={{ display: this.state.showModalConfirm ? 'block' : 'none', zIndex: 1000 }}>
          <div className='notif-report'>
            <img src={Images.transaksiDetail} alt='pict' />
            <h3>Order Diterima</h3>
            <p>Order telah dipindahkan ke bagian konfirmasi pengiriman. Silahkan memproses order dan jika sudah dikirim Anda tinggal memasukkan nomor resinya</p>
            <button className='button is-primary is-large is-fullwidth' onClick={() => Router.push('/delivery-confirmation')}>Lihat Daftar Pengiriman</button>
            <a className='cancel' onClick={() => Router.push('/orders-new')}>Kembali ke Daftar Pesanan</a>
          </div>
        </div>

        <div className='sort-option' style={{ display: this.state.showModalConfirmReject ? 'block' : 'none', zIndex: 1000 }}>
          <div className='notif-report'>
            <h3>Order telah ditolak</h3>
            <p>Anda telah menolak order dan order sudah dihilangkan dari daftar pesanan</p>
            <button className='button is-primary is-large is-fullwidth' onClick={() => Router.push('/delivery-confirmation')}>Kembali ke Daftar Pengiriman</button>
          </div>
        </div>

        <div className='sort-option' style={{ display: this.state.showModalReject ? 'block' : 'none', zIndex: 1000 }}>
          <div className='notif-report'>
            <img src={Images.transaksiDetail} alt='pict' />
            <h3>Anda akan menolak order</h3>
            <p>Anda yakin akan menolak order ini? </p>
            <div className='columns is-mobile'>
              <div className='column'>
                <button className={`button is-primary is-large is-fullwidth is-outlined js-option ${this.submiting && 'is-loading'}`} onClick={() => this.rejectOrder(newOrderDetail.orderDetail.invoice.id)}>Tolak</button>
              </div>
              <div className='column'>
                <button className='button is-primary is-large is-fullwidth is-outlined' onClick={() => this.modalReject()}>Batal</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    newOrderDetail: state.newOrderDetail,
    updateStatus: state.updateStatus
  }
}

const mapDispatchToProps = dispatch => ({
  getNewOrderDetail: (params) => dispatch(transactionAction.getNewOrderDetail(params)),
  acceptOrder: (params) => dispatch(transactionAction.acceptOrder(params)),
  rejectOrder: (params) => dispatch(transactionAction.rejectOrder(params))
})

export default connect(mapStateToProps, mapDispatchToProps)(OrderDetail)
