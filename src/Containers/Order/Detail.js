// @flow
import React from 'react'
import { connect } from 'react-redux'
import NProgress from 'nprogress'
// components
import Router from 'next/router'
import Notification from '../../Components/Notification'
import MyImage from '../../Components/MyImage'
import SaleDetail from '../../Components/SaleDetail'
// lib
import Images from '../../Themes/Images'
// actions
import * as transactionAction from '../../actions/transaction'
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
    this.fetching = false
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
    if (id) {
      NProgress.start()
      this.fetching = true
      this.props.getNewOrderDetail({ id })
    }
  }
  acceptOrder (id) {
    this.submiting = true
    this.setState({ submitType: 'acceptOrder' }, () => {
      if (this.state.submitType === 'acceptOrder') {
        this.props.acceptOrder({ id })
      }
    })
  }
  rejectOrder (id) {
    this.submiting = true
    this.setState({ submitType: 'rejectOrder' }, () => {
      if (this.state.submitType === 'rejectOrder') {
        this.props.rejectOrder({ id })
      }
    })
  }
  componentWillReceiveProps (nextProps) {
    const { newOrderDetail, updateStatus } = nextProps
    const { isFetching, isFound, isError, notifError } = this.props
    if (!isFetching(newOrderDetail) && this.fetching) {
      this.fetching = false
      NProgress.done()
      if (isFound(newOrderDetail)) {
        this.setState({ newOrderDetail })
      }
      if (isError(newOrderDetail)) {
        this.setState({ notification: notifError(newOrderDetail.message) })
      }
    }
    if (!isFetching(updateStatus) && this.submiting) {
      this.submiting = false
      if (isFound(updateStatus)) {
        if (this.state.submitType === 'acceptOrder') {
          this.modalConfirm()
        }
        if (this.state.submitType === 'rejectOrder') {
          this.showModalConfirmReject()
        }
      }
      if (isError(updateStatus)) {
        this.setState({ showModalReject: false })
        this.setState({ notification: notifError(updateStatus.message, 'Gagal update Order!') })
      }
    }
  }
  render () {
    const { newOrderDetail, notification } = this.state
    console.log('newOrder', newOrderDetail)
    return (
      <div>
        <Notification
          type={notification.type}
          isShow={notification.status}
          activeClose
          onClose={() => this.setState({notification: {status: false, message: ''}})}
          message={notification.message} />
        { (newOrderDetail.isFound) && <div>
          <SaleDetail
            newOrderDetail={newOrderDetail}
            proccessOrder='newOrder' />
          {
            (newOrderDetail.orderDetail.invoice.type === 'seller' || newOrderDetail.orderDetail.invoice.type === 'buyer') && <div className='level btn-wrapp' style={{ marginBottom: 0 }}>
              <div className='columns is-mobile'>
                <div className='column is-half'>
                  <a className='button is-primary is-large is-fullwidth is-outlined js-option' onClick={() => this.modalReject()}>Tolak</a>
                </div>
                <div className='column'>
                  <a className={`button is-primary is-large is-fullwidth js-option ${this.submiting && 'is-loading'}`} onClick={() => this.acceptOrder(newOrderDetail.orderDetail.invoice.id)}>Terima</a>
                </div>
              </div>
            </div>
          }
          {
            newOrderDetail.orderDetail.invoice.type === 'reseller' && <div className='level btn-wrapp'>
              <a className='button is-primary is-large is-fullwidth is-outlined' onClick={() => Router.push(`/send-message?id=${newOrderDetail.orderDetail.invoice.id}&proccessOrder=newOrder&msgTo=seller`)}>Kirim Pesan ke Seller</a>
            </div>
          }
          <div className='sort-option' style={{ display: this.state.showModalConfirm ? 'block' : 'none', zIndex: 1000 }}>
            <div className='notif-report'>
              <MyImage src={Images.transaksiDetail} alt='pict' />
              <h3>Order Diterima</h3>
              <p>Order telah dipindahkan ke bagian konfirmasi pengiriman. Silahkan memproses order dan jika sudah dikirim Anda tinggal memasukkan nomor resinya</p>
              <button className='button is-primary is-large is-fullwidth' onClick={() => Router.push('/delivery-confirmation')}>Lihat Daftar Pengiriman</button>
              <a className='cancel' onClick={() => Router.push('/order-new')}>Kembali ke Daftar Pesanan</a>
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
              <MyImage src={Images.transaksiDetail} alt='pict' />
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
        }
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
