// @flow
import React from 'react'
import { connect } from 'react-redux'
// components
import NProgress from 'nprogress'
import Router from 'next/router'
// actions
import * as actionTypes from '../../actions/stores'
import * as actionUserTypes from '../../actions/user'
// services
import { Status } from '../../Services/Status'

class AddressStore extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      storeAddress: props.storeAddress,
      profile: props.profile,
      editAddress: false,
      notification: {
        status: false,
        color: 'is-success',
        message: 'Error, default message.'
      }
    }
  }

  handleNotification (e) {
    const { notification } = this.state
    const newState = { notification }
    newState.notification['status'] = !notification.status
    this.setState(newState)
  }

  modalEditAddress (e) {
    e.preventDefault()
    const { editAddress, profile } = this.state
    if (profile.user.store.is_verified === true) {
      this.setState({ editAddress: !editAddress })
    }
  }

  toEditAddress (e) {
    e.preventDefault()
    const { profile } = this.state
    if (profile.user.store.is_verified === true) {
      Router.push(`/address-info?type=settingStore`)
    }
  }

  renderUnverified () {
    const { profile } = this.state
    if (profile.user.store.is_verified === false) {
      return (
        <div className='user-info'>
          <p>Selama belum terverifikasi, Anda tidak bisa mengubah alamat toko Anda.</p>
        </div>
      )
    }
  }

  componentDidMount () {
    const { profile, notification } = this.state
    const { query, updateStoreAddress } = this.props
    NProgress.start()
    this.props.getStoreAddress()
    if (!profile.isFound) {
      this.props.getProfile()
    }
    if (query.hasOwnProperty('isSuccess')) {
      this.props.getStoreAddress()
      if (!updateStoreAddress.isLoading) {
        switch (updateStoreAddress.status) {
          case Status.SUCCESS: {
            const newNotification = { notification }
            newNotification.notification['status'] = true
            newNotification.notification['message'] = updateStoreAddress.message
            newNotification.notification['color'] = 'is-success'
            this.setState(newNotification)
            break
          }
          case Status.OFFLINE :
          case Status.FAILED : {
            const newNotif = { notification }
            newNotif.notification['status'] = true
            newNotif.notification['message'] = updateStoreAddress.message
            newNotif.notification['color'] = 'is-danger'
            this.setState(newNotif)
            break
          }
          default:
            break
        }
        this.setState({ notification })
      }
    }
  }

  componentWillReceiveProps (nextProps) {
    const { storeAddress, profile } = nextProps
    if (!storeAddress.isLoading && storeAddress.isFound) {
      this.setState({ storeAddress })
      NProgress.done()
    }
    if (!profile.isLoading && profile.isFound) {
      this.setState({ profile })
    }
  }

  render () {
    const { storeAddress, editAddress, notification, profile } = this.state
    if (storeAddress.isFound) {
      return (
        <div>
          <div
            className={`notification ${notification.status && notification.color}`}
            style={{display: notification.status ? 'block' : 'none'}}>
            <button className='delete' onClick={(e) => this.handleNotification(e)} />
            {notification.message}
          </div>
          {this.renderUnverified()}
          <section className='section is-paddingless'>
            <div className='container is-fluid info-address'>
              <div className='info-product'>
                <div className='detail-rate'>
                  <div className='columns detail-rating is-mobile is-multiline no-margin-bottom'>
                    <div className='column'>
                      <div className='rating-content is-left'>
                        <label className='lable'>Alamat</label>
                        <p><strong>{storeAddress.storeAddress.address}</strong></p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className='detail-rate'>
                  <div className='columns detail-rating is-mobile is-multiline no-margin-bottom'>
                    <div className='column is-half'>
                      <div className='rating-content is-left'>
                        <label className='lable'>Kelurahan</label>
                        <p><strong>{storeAddress.storeAddress.village.name}</strong></p>
                      </div>
                    </div>
                    <div className='column is-half'>
                      <div className='rating-content is-left'>
                        <label className='lable'>Kecamatan</label>
                        <p><strong>{storeAddress.storeAddress.subDistrict.name}</strong></p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className='detail-rate'>
                  <div className='columns detail-rating is-mobile is-multiline no-margin-bottom'>
                    <div className='column is-half'>
                      <div className='rating-content is-left'>
                        <label className='lable'>Kota / Kabupaten</label>
                        <p><strong>{storeAddress.storeAddress.district.name}</strong></p>
                      </div>
                    </div>
                    <div className='column is-half'>
                      <div className='rating-content is-left'>
                        <label className='lable'>Provinsi</label>
                        <p><strong>{storeAddress.storeAddress.province.name}</strong></p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className='detail-rate'>
                  <div className='columns detail-rating is-mobile is-multiline no-margin-bottom'>
                    <div className='column'>
                      <div className='rating-content is-left'>
                        <label className='lable'>Kode Post</label>
                        <p><strong>{storeAddress.storeAddress.postal_code}</strong></p>
                      </div>
                    </div>
                  </div>
                </div>
                <a className='link bold' style={{display: profile.user.store.is_verified ? 'block' : 'none'}}
                  onClick={(e) => this.modalEditAddress(e)}>
                  Ubah Alamat
                </a>
              </div>
            </div>
          </section>
          <div className='sort-option' style={{display: editAddress && 'block'}}>
            <div className='notif-report'>
              <h3>Dengan mengubah alamat, status Toko anda menjadi tidak terverifikasi</h3>
              <p>Anda harus menverifikasi Alamat baru Anda dengan kode yang akan kami kirim ke alamat baru</p>
              <button
                className='button is-primary is-large is-fullwidth'
                onClick={(e) => this.modalEditAddress(e)}>
                Batal
              </button>
              <a className='cancel' onClick={(e) => this.toEditAddress(e)}>Lanjutkan Ubah Alamat</a>
            </div>
          </div>
        </div>
      )
    }
    return (<br />)
  }
}

const mapStateToProps = (state) => {
  return {
    profile: state.profile,
    storeAddress: state.storeAddress,
    updateStoreAddress: state.updateStoreAddress
  }
}

const mapDispatchToProps = dispatch => ({
  getProfile: () => dispatch(actionUserTypes.getProfile()),
  getStoreAddress: () => dispatch(actionTypes.getStoreAddress())
})

export default connect(mapStateToProps, mapDispatchToProps)(AddressStore)
