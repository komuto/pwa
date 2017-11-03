// @flow
import React from 'react'
import { connect } from 'react-redux'
import NProgress from 'nprogress'
import moment from 'moment'
// components
import Images from '../../Themes/Images'
import Notification from '../../Components/Notification'
import MyImage from '../../Components/MyImage'
// actions
import * as transactionAction from '../../actions/transaction'
// services
import { isFetching, isFound, isError, validateResponse, validateResponseAlter } from '../../Services/Status'
import RegexNormal from '../../Lib/RegexNormal'

const TAB_DETAIL = 'TAB_DETAIL'
const TAB_DISCUSSION = 'TAB_DISCUSSION'

class ComplainItemDetail extends React.Component {
  constructor (props) {
    super(props)
    let receiptNumber = props.sellerComplainedOrderDetail.isFound ? props.sellerComplainedOrderDetail.orderDetail.airway_bill : ''
    this.state = {
      id: props.query.id || null,
      sellerComplainedOrderDetail: props.sellerComplainedOrderDetail || null,
      tabs: TAB_DETAIL,
      message: '',
      showModal: false,
      showModalShipping: false,
      receiptNumber,
      pagination: {
        page: 1,
        limit: 10
      },
      notification: {
        type: 'is-success',
        status: false,
        message: 'Error, default message.'
      },
      validation: false
    }
    this.afterSendMessage = false
    this.submiting = false
    this.submitUpdateStatus = false
  }

  switchTab (e) {
    const { tabs } = this.state
    this.setState({ tabs: (tabs === TAB_DETAIL) ? TAB_DISCUSSION : TAB_DETAIL })
  }

  showModal () {
    this.setState({ showModal: !this.state.showModal })
  }

  showModalShipping () {
    this.setState({ showModalShipping: !this.state.showModalShipping })
  }

  handleInput (e) {
    const value = RegexNormal(e.target.value)
    this.setState({ message: value })
  }

  async submitMessage (e) {
    const { id, message } = this.state
    if (e.key === 'Enter') {
      if (this.state.message !== '') {
        this.afterSendMessage = true
        await this.props.createComplaintDiscussionSeller({ id: id, content: message })
        this.setState({ message: '' })
      }
    }
  }

  sellerReceived () {
    this.submiting = true
    this.props.sellerDisputeReceived({ id: this.state.id })
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

  updateShippingNumber () {
    const { receiptNumber, sellerComplainedOrderDetail } = this.state
    let receiptNumberValid = receiptNumber !== ''
    if (receiptNumberValid) {
      this.submitUpdateStatus = true
      this.props.updateAirwayBill({ id: sellerComplainedOrderDetail.orderDetail.id, airway_bill: receiptNumber })
    } else {
      this.setState({ validation: true })
    }
  }

  componentDidMount () {
    const { id } = this.state
    NProgress.start()
    this.props.getComplainedOrderDetailSeller({ id })
  }

  componentWillReceiveProps (nextProps) {
    const { sellerComplainedOrderDetail, sellerComplaintDiscussion, sellerReceived, updateStatus } = nextProps
    if (!isFetching(sellerComplainedOrderDetail)) {
      NProgress.done()
      if (isFound(sellerComplainedOrderDetail)) {
        this.setState({ sellerComplainedOrderDetail: sellerComplainedOrderDetail })
      }
      if (isError(sellerComplainedOrderDetail)) {
        this.setState({ notification: validateResponse(sellerComplainedOrderDetail, sellerComplainedOrderDetail.message) })
      }
    }
    if (!isFetching(sellerComplaintDiscussion) && this.afterSendMessage) {
      this.afterSendMessage = false
      if (isFound(sellerComplaintDiscussion)) {
        this.props.getComplainedOrderDetailSeller({ id: this.state.id })
      }
      this.setState({ notification: validateResponseAlter(sellerComplaintDiscussion, 'Berhasil mengirim Pesan', 'Gagal mengirim pesan') })
    }
    if (!isFetching(sellerReceived) && this.submiting) {
      this.submiting = false
      if (isFound(sellerReceived)) {
        this.props.getComplainedOrderDetailSeller({ id: this.state.id })
        this.showModal()
      }
      this.setState({ notification: validateResponseAlter(sellerReceived, sellerReceived.message, 'Gagal mengirim pesan') })
    }
    if (!isFetching(updateStatus) && this.submitUpdateStatus) {
      this.submitUpdateStatus = false
      if (isFound(updateStatus)) {
        const { sellerComplainedOrderDetail, receiptNumber } = this.state
        const setReceiptNumber = { sellerComplainedOrderDetail, showModalShipping: false, notification: validateResponseAlter(updateStatus, updateStatus.message, updateStatus.message) }
        sellerComplainedOrderDetail.orderDetail['airway_bill'] = receiptNumber
        this.setState(setReceiptNumber)
      }
      if (isError(updateStatus)) {
        this.setState({ notification: validateResponse(updateStatus, updateStatus.message) })
      }
    }
  }

  handleStatusComplain (solution, responseStatus, status) {
    const { validation, receiptNumber } = this.state
    const STATEMENT_TEMP = [
      'Pembeli menginginkan refund. Pembeli akan mengirimkan kembali barang yang dibeli. Silahkan klik "Barang sudah saya terima" jika barang sudah Anda terima dan Admin akan mengirimkan uang ke pembeli',
      'Pembeli menginginkan tukar barang. Pembeli akan mengirimkan kembali barang yang dibeli. Silahkan klik "Barang sudah saya terima" jika barang sudah Anda terima dan Anda akan diminta untuk mengirimkan kembali barang yang baru.',
      'Kini Anda silahkan memproses pengiriman barang baru. Dan silahkan memasukkan nomor resi di form dibawah ini',
      'Terima kasih telah bersifat kooperatif. Kini Admin akan mengirimkan kembali uang ke pembeli. Dan segera setelah itu Admin akan menandai komplain ini sudah terselesaikan',
      'Terima kasih telah bersifat kooperatif. Kini Anda tinggal menunggu konfirmasi dari pembeli setelah barang sampai',
      'Komplain telah terselesaikan'
    ]
    let statement
    let icon
    let classNotif
    // kondisi ketika refund dan status di baca user
    if (solution === 1 && responseStatus === 0 && (status === 1 || status === 2)) {
      statement = STATEMENT_TEMP[0]
      icon = Images.IconInfoYellow
      classNotif = 'box notif-payment'
    }
    // kondisi ketika refund dan status seller terima barang
    if (solution === 1 && responseStatus === 0 && (status === 4 || status === 7)) {
      statement = STATEMENT_TEMP[3]
      icon = Images.IconInfoBlue
      classNotif = 'box notif-payment-waiting'
    }
    // kondisi ketika refund dan status terselesaikan
    if (solution === 1 && (status === 8 || status === 9)) {
      statement = STATEMENT_TEMP[5]
      icon = Images.paymentDone
      classNotif = 'box notif-payment-success'
    }
    // kondisi ketika tukar dan status di baca user
    if (solution === 2 && responseStatus === 0 && (status === 1 || status === 2)) {
      statement = STATEMENT_TEMP[1]
      icon = Images.IconInfoYellow
      classNotif = 'box notif-payment'
    }
    // kondisi ketika tukar dan status terima barang
    if (solution === 2 && responseStatus === 0 && status === 4) {
      statement = STATEMENT_TEMP[2]
      icon = Images.IconInfoYellow
      classNotif = 'box notif-payment'
    }
    // kondisi ketika tukar dan status seller kirim ulang barang
    if (solution === 2 && responseStatus === 0 && (status === 5 || status === 7)) {
      statement = STATEMENT_TEMP[3]
      icon = Images.IconInfoBlue
      classNotif = 'box notif-payment-waiting'
    }
    // kondisi ketika tukar dan status terselesaikan
    if (solution === 2 && (status === 8 || status === 9)) {
      statement = STATEMENT_TEMP[5]
      icon = Images.paymentDone
      classNotif = 'box notif-payment-success'
    }
    return (
      <div>
        <div className={classNotif}>
          <article className='media'>
            <div className='media-left top'>
              <figure className='image'>
                <MyImage src={icon} alt='pict' />
              </figure>
            </div>
            <div className='media-content'>
              <div className='content'>
                <p>
                  <strong>{statement}</strong>
                </p>
              </div>
            </div>
          </article>
        </div>
        { (status === 1 || status === 2) && <div className='info-purchase'>
          <div className='detail-rate is-purchase'>
            <div className='columns total-items is-mobile is-multiline no-margin-bottom'>
              <div className='column'>
                <a onClick={() => this.showModal()} className='button is-primary is-large is-fullwidth js-option'>Barang sudah saya terima</a>
              </div>
            </div>
          </div>
          </div>
        }
        {
          solution === 2 && status === 4 && <div>
            <div className='info-purchase'>
              <div className='detail-rate is-purchase'>
                <div className='columns total-items is-mobile is-multiline no-margin-bottom'>
                  <div className='column'>
                    <div className='rating-content is-left'>
                      <strong>Nomor Resi</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='info-purchase'>
              <div className='detail-rate is-purchase'>
                <div className='columns total-items is-mobile is-multiline no-margin-bottom'>
                  <div className='column'>
                    <div className={`rating-content is-left ${validation && 'is-error'}`}>
                      <input type='text' className='input no-border' value={receiptNumber} placeholder='Masukkan nomor resi disini'
                        onChange={(e) => this.setState({ receiptNumber: e.target.value })} />
                      {validation && this.renderValidation('receiptNumber', 'Mohon isi no Resi')}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='info-purchase'>
              <div className='detail-rate is-purchase'>
                <div className='columns total-items is-mobile is-multiline no-margin-bottom'>
                  <div className='column'>
                    <a onClick={() => this.updateShippingNumber()} className={`button is-primary is-large is-fullwidth js-option ${this.submiting && 'is-loading'}`}>Proses Resi Pengiriman</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        }
        {
          solution === 2 && status === 5 && <div>
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
                      <span className='has-text-left lt-1'>{this.state.sellerComplainedOrderDetail.orderDetail.airway_bill}</span>
                      &nbsp;
                      <a className='js-option' onClick={() => this.showModalShipping()}>Ubah</a>
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
                      <span className='has-text-left'>Dalam Pengiriman</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        }
      </div>
    )
  }

  render () {
    console.log('state', this.state)
    const { notification, tabs, sellerComplainedOrderDetail, message, showModal, validation, showModalShipping, receiptNumber } = this.state
    if (!sellerComplainedOrderDetail.isFound) return null
    return (
      <div>
        <div className='nav-tabs'>
          <a onClick={(e) => this.switchTab(e)} className={tabs === TAB_DETAIL && 'active'}>
            <span className='text'>Detail</span>
          </a>
          <a onClick={(e) => this.switchTab(e)} className={tabs === TAB_DISCUSSION && 'active'}>
            <span className='text'>Diskusi
              { /* sellerComplainedOrders2.isFound && <span className='notif-complaint'><span> {sellerComplainedOrders2.orders.length} </span></span> */}
            </span>
          </a>
        </div>
        <Notification
          type={notification.type}
          isShow={notification.status}
          activeClose
          onClose={() => this.setState({notification: {status: false, message: ''}})}
          message={notification.message} />
        <section className='section is-paddingless'>
          <div className='discuss'>
            <ul className='notif-detail conversation bresolutioned'>
              {
                tabs === TAB_DETAIL
                ? <ListComplainOrderDetail
                  sellerComplainedOrderDetail={sellerComplainedOrderDetail}
                  showModal={() => this.showModal()}
                  handleStatusComplain={(solution, responseStatus, status) => this.handleStatusComplain(solution, responseStatus, status)} />
                : <ListDiscustionComplainOrders
                  sellerComplainedOrderDetail={sellerComplainedOrderDetail}
                  message={message}
                  afterSendMessage={this.afterSendMessage}
                  handleInput={(e) => this.handleInput(e)}
                  submitMessage={(e) => this.submitMessage(e)} />
              }
            </ul>
          </div>
        </section>
        <div className='sort-option' style={{display: showModal && 'block'}}>
          <div className='notif-report'>
            <h3>Anda yakin sudah menerima barang?</h3>
            <p>{ sellerComplainedOrderDetail.orderDetail.solution === 1 ? 'Dengan mengkonfirmasi sudah menerima barang. Admin akan mengirimkan uang ke pembeli' : 'Dengan mengkonfirmasi sudah menerima barang, Anda diminta untuk mengirim ulang barang yang baru kepada pembeli'}</p>
            <button onClick={() => this.sellerReceived()} className={`button is-primary is-large is-fullwidth ${this.submiting && 'is-loading'}`}>Ya, Barang sudah saya terima</button>
            <button className='button is-primary is-large is-fullwidth is-outlined' onClick={() => this.showModal()}>Batal</button>
          </div>
        </div>
        <div className='sort-option' style={{ display: showModalShipping && 'block' }}>
          <div className='notif-report add-voucher'>
            <div className='header-notif'>
              <h3>Masukan Nomor Resi Baru</h3>
              <span className='icon-close' onClick={() => this.showModalShipping()} />
            </div>
            <div className='field'>
              <p className={`control ${validation && 'is-error'}`}>
                <input type='text' className='input' value={receiptNumber} placeholder='Masukkan nomor resi disini'
                  onChange={(e) => this.setState({ receiptNumber: e.target.value })} />
                {validation && this.renderValidation('receiptNumber', 'Mohon isi no Resi')}
              </p>
            </div>
            <button className={`button is-primary is-large is-fullwidth ${this.submiting && 'is-loading'}`} onClick={() => this.updateShippingNumber()}>Perbarui No Resi</button>
          </div>
        </div>
      </div>
    )
  }
}

const ListComplainOrderDetail = (props) => {
  const { sellerComplainedOrderDetail } = props
  if (sellerComplainedOrderDetail === undefined) return null
  const { solution, response_status, status } = sellerComplainedOrderDetail.orderDetail
  let statusDispute
  if ((sellerComplainedOrderDetail.orderDetail.status === 8 || sellerComplainedOrderDetail.orderDetail.status === 9)) {
    statusDispute = {
      className: 'item-status md right accepted',
      condition: 'Terselesaikan'
    }
  } else {
    statusDispute = {
      className: 'item-status md right reject',
      condition: 'Menunggu Penyelesaian'
    }
  }
  return (
    <div>
      <section className='section is-paddingless has-shadow'>
        { props.handleStatusComplain(solution, response_status, status) }
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
                  <span className='has-text-left'>{sellerComplainedOrderDetail.orderDetail.invoice.invoice_number}</span>
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
                  <span className='has-text-left'>{moment.unix(sellerComplainedOrderDetail.orderDetail.invoice.created_at).format('DD MMMM YYYY')}</span>
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
                  <strong>Status Penyelesaian</strong>
                </div>
              </div>
              <div className='column'>
                <div className='rating-content item-qty has-text-right'>
                  <div className={statusDispute.className}>{statusDispute.condition}</div>
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
                  <strong>Pembeli</strong>
                </div>
              </div>
              <ul className='seller-items'>
                <li>
                  <a className='is-bordered inline-text'>
                    <MyImage src={sellerComplainedOrderDetail.orderDetail.user.photo} alt='photo' />
                  </a>
                  <strong>{sellerComplainedOrderDetail.orderDetail.user.name}</strong>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className='info-purchase'>
          <div className='detail-rate is-purchase'>
            <div className='columns total-items is-mobile is-multiline no-margin-bottom'>
              <div className='column is-one-quarter'>
                <div className='rating-content is-left'>
                  <strong>Solusi yang diinginkan</strong>
                </div>
              </div>
              <div className='column'>
                <div className='rating-content item-qty has-text-right'>
                  <span className='has-text-left'>
                    {sellerComplainedOrderDetail.orderDetail.solution === 1 ? 'Refund Dana' : 'Tukar Barang'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className='section is-paddingless has-shadow'>
        <div className='container is-fluid'>
          <div className='title'>
            <h3>Barang bermasalah</h3>
          </div>
        </div>
        { sellerComplainedOrderDetail.orderDetail.dispute_products.map((p, i) => {
          return (
            <div className='info-purchase space-left' key={i}>
              <div className='box'>
                <div className='media'>
                  <div className='media-left is-bordered'>
                    <figure className='image list-transaction sm'>
                      <a><MyImage src={p.image} alt='Image' /></a>
                    </figure>
                  </div>
                  <div className='media-content middle'>
                    <div className='content'>
                      <h4>{p.name}</h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        })
        }
      </section>

      <section className='section is-paddingless has-shadow'>
        <div className='container is-fluid'>
          <div className='title'>
            <h3>Masalah yang terjadi</h3>
          </div>
        </div>
        <div className='info-purchase'>
          <div className='detail-rate is-purchase'>
            <div className='columns total-items is-mobile is-multiline no-margin-bottom'>
              <div className='column'>
                <div className='rating-content is-left'>
                  <span>{sellerComplainedOrderDetail.orderDetail.problems}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className='section is-paddingless has-shadow'>
        <div className='container is-fluid'>
          <div className='title'>
            <h3>Foto Barang</h3>
          </div>
        </div>
        <div className='payment-detail step-pay'>
          <ul>
            <li>
              <div className='columns is-mobile is-multiline no-margin-bottom'>
                <div className='column'>
                  <div className='box'>
                    <div className='media list-item middle'>
                      {
                        sellerComplainedOrderDetail.orderDetail.proofs.map((p, i) => {
                          return (
                            <div className='media-left md-margin' key={i}>
                              <figure className='image list-transaction lgx'>
                                <a><MyImage src={p.image} alt='Image' /></a>
                              </figure>
                            </div>
                          )
                        })
                      }
                      <div className='right-middle'>
                        <span className='icon-arrow-right' />
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
            <h3>Keterangan</h3>
          </div>
        </div>
        <div className='info-purchase'>
          <div className='detail-rate is-purchase'>
            <div className='columns total-items is-mobile is-multiline no-margin-bottom'>
              <div className='column'>
                <div className='rating-content is-left'>
                  <span>{sellerComplainedOrderDetail.orderDetail.note}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

const ListDiscustionComplainOrders = (props) => {
  const { sellerComplainedOrderDetail } = props
  if (sellerComplainedOrderDetail === undefined) return null
  moment.locale('id')
  return (
    <div>
      <section className='section is-paddingless bg-white'>
        <div className='discuss'>
          <ul className='notif-detail conversation bordered'>
            { sellerComplainedOrderDetail.orderDetail.discussions.map((res, i) => {
              return (
                <li key={i}>
                  <div className='box is-paddingless'>
                    <article className='media'>
                      <div className='media-left top sm'>
                        <figure className='image user-pict'>
                          <MyImage src={res.user.photo} alt='pict' />
                        </figure>
                      </div>
                      <div className='media-content'>
                        <div className='content'>
                          <p className='user-name'>
                            <strong>{res.user.name}</strong>
                            {res.content}
                          </p>
                        </div>
                        <span className='time-discuss'>{moment.unix(res.created_at).format('DD MMM YYYY h:mm')}</span>
                      </div>
                    </article>
                  </div>
                </li>
              )
            })
            }
          </ul>
        </div>
        { sellerComplainedOrderDetail.orderDetail.discussions.length === 0 && <EmptyDiscussion /> }
      </section>
      <div className='add-comment'>
        <div className='field'>
          <p className='control'>
            <textarea
              name='message'
              onChange={(e) => props.handleInput(e)}
              value={props.message}
              onKeyPress={(e) => props.submitMessage(e)}
              className='textarea' placeholder='Tulis pesan Anda disini' />
          </p>
        </div>
      </div>
    </div>
  )
}

const EmptyDiscussion = () => {
  return (
    <div className='content'>
      <div className='container is-fluid'>
        <div className='desc has-text-centered'>
          <MyImage src={Images.emptyStatesDiscussion} alt='komuto' />
          <br /><br />
          <p><strong className='bold'>Diskusi Anda Kosong</strong></p>
          <p>Anda belum pernah melakukan tanya jawab kepada pembeli untuk menyelesaikan masalah</p>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    sellerComplainedOrderDetail: state.sellerComplainedOrderDetail,
    sellerComplaintDiscussion: state.sellerComplaintDiscussion,
    sellerReceived: state.sellerReceived,
    updateStatus: state.updateStatus
  }
}

const mapDispatchToProps = dispatch => ({
  getComplainedOrderDetailSeller: (params) => dispatch(transactionAction.getComplainedOrderDetailSeller(params)),
  createComplaintDiscussionSeller: (params) => dispatch(transactionAction.createComplaintDiscussionSeller(params)),
  sellerDisputeReceived: (params) => dispatch(transactionAction.sellerDisputeReceived(params)),
  updateAirwayBill: (params) => dispatch(transactionAction.updateAirwayBill(params))
})

export default connect(mapStateToProps, mapDispatchToProps)(ComplainItemDetail)
