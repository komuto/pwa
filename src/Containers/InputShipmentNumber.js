// @flow
import React from 'react'
import { connect } from 'react-redux'
import NProgress from 'nprogress'
import moment from 'moment'
// components
import Router from 'next/router'
import Images from '../Themes/Images'
import MyImage from '../Components/MyImage'
import Notification from '../Components/Notification'
// lib
import SaleDetail from '../Components/SaleDetail'
// actions
import * as transactionAction from '../actions/transaction'

const TAB_NO_RESI = 'TAB_NO_RESI'
const TAB_DETAIL = 'TAB_DETAIL'

class InputShipmentNumber extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      id: props.query.id || null,
      processingOrderDetail: props.processingOrderDetail || null,
      tabs: TAB_NO_RESI,
      receiptNumber: '',
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

  switchTab (e) {
    const { tabs } = this.state
    this.setState({ tabs: (tabs === TAB_NO_RESI) ? TAB_DETAIL : TAB_NO_RESI })
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
    const { receiptNumber, id } = this.state
    let receiptNumberValid = receiptNumber !== ''
    if (receiptNumberValid) {
      this.submiting = true
      this.props.inputAirwayBill({ id, airway_bill: receiptNumber })
    } else {
      this.setState({ validation: true })
    }
  }

  componentDidMount () {
    const { id } = this.state
    if (id) {
      NProgress.start()
      this.props.getProcessingOrderDetail({ id })
    }
  }

  componentWillReceiveProps (nextProps) {
    const { processingOrderDetail, updateStatus } = nextProps
    const { isFetching, isFound, isError, notifError } = this.props
    if (!isFetching(processingOrderDetail)) {
      NProgress.done()
      if (isFound(processingOrderDetail)) {
        this.setState({ processingOrderDetail })
      }
      if (isError(processingOrderDetail)) {
        this.setState({ notification: notifError(processingOrderDetail.message) })
      }
    }
    if (!isFetching(updateStatus) && this.submiting) {
      this.submiting = false
      if (isFound(updateStatus)) {
        this.setState({ showModal: !this.state.showModal })
      }
      if (isError(updateStatus)) {
        this.setState({ notification: notifError(updateStatus.message) })
      }
    }
  }

  render () {
    const { notification, tabs, processingOrderDetail, receiptNumber, validation, showModal } = this.state
    if (!processingOrderDetail.isFound) return null
    let newOrderDetail = { ...processingOrderDetail }
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
                  processingOrderDetail={processingOrderDetail}
                  receiptNumber={receiptNumber}
                  submiting={this.submiting}
                  submit={() => this.submit()}
                  validation={validation}
                  renderValidation={(name, textFailed) => this.renderValidation(name, textFailed)}
                  handleInput={(e) => this.handleInput(e)} />
                : <SaleDetail
                  newOrderDetail={newOrderDetail} />
              }
            </ul>
          </div>
        </section>
        <div className='sort-option' style={{ display: showModal && 'block' }}>
          <div className='notif-report'>
            <MyImage src={Images.transaksiDetail} alt='pict' />
            <h3>Nomor Resi telah diinfokan</h3>
            <p>Nomor Resi telah diinfokan ke buyer. Order ini dipindahkan ke daftar penjualan. Silahkan cek untuk melihat status transaksi Anda</p>
            <button className='button is-primary is-large is-fullwidth' onClick={() => Router.push('/sales-list')}>Lihat Daftar Penjualan</button>
            <a className='cancel' onClick={() => Router.push('/delivery-confirmation')}>Kembali ke Konfirmasi Pengiriman</a>
          </div>
        </div>
      </div>
    )
  }
}

const ShipmentReceiptNumber = (props) => {
  const { processingOrderDetail, receiptNumber, validation } = props
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
                  <strong>{`Anda memiliki waktu ${processingOrderDetail.orderDetail.invoice.day_limit} hari sampai tanggal ${moment.unix(processingOrderDetail.orderDetail.invoice.date_limit).format(' DD MMM YYYY')} untuk menginformasikan nomor resi. Jika tidak kami akan membatalkan pesanan ini`}</strong>
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
                  <strong>{processingOrderDetail.orderDetail.invoice.type === 'seller' ? processingOrderDetail.orderDetail.reseller.store.name : processingOrderDetail.orderDetail.buyer.name}</strong>
                </div>
              </div>
              <ul className='seller-items'>
                {
                  processingOrderDetail.orderDetail.items.map((p, i) => {
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
        <div className='content-header'>
          <h3>Nomor Resi</h3>
        </div>
        <div className={`content-body ${validation && 'is-error'}`}>
          <input type='text' className='input' value={receiptNumber} placeholder='Masukkan nomor resi disini'
            onChange={(e) => props.handleInput(e)} />
          {validation && props.renderValidation('receiptNumber', 'Mohon isi no Resi')}
        </div>
      </section>
      <section className='section is-paddingless'>
        <div className='container is-fluid'>
          <a className={`button is-primary is-large is-fullwidth js-option ${props.submiting && 'is-loading'}`}
            onClick={() => props.submit()}>Proses Info Pengiriman</a>
        </div>
      </section>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    processingOrderDetail: state.processingOrderDetail,
    updateStatus: state.updateStatus
  }
}

const mapDispatchToProps = dispatch => ({
  getProcessingOrderDetail: (params) => dispatch(transactionAction.getProcessingOrderDetail(params)),
  inputAirwayBill: (params) => dispatch(transactionAction.inputAirwayBill(params))
})

export default connect(mapStateToProps, mapDispatchToProps)(InputShipmentNumber)
