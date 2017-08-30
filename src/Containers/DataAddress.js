// @flow
import React from 'react'
import { connect } from 'react-redux'
import Router from 'next/router'
// components
// actions
import * as actionTypes from '../actions/address'
// services
import { Status } from '../Services/Status'

class DataAddress extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      listAddress: props.listAddress,
      dropdownSelected: '',
      confirmDelete: '',
      deleteAddressTemp: '',
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

  handleDropdown (e, id) {
    e.preventDefault()
    const { dropdownSelected } = this.state
    const newState = { dropdownSelected }
    newState.dropdownSelected = id
    this.setState(newState)
  }

  modalShowDelete (e, address) {
    e.preventDefault()
    const { confirmDelete } = this.state
    this.setState({ confirmDelete: !confirmDelete, deleteAddressTemp: address.id, dropdownSelected: '' })
  }

  modalConfirmDelete (e) {
    e.preventDefault()
    const {deleteAddressTemp} = this.state
    this.setState({ submitting: true })
    this.props.deleteAddress({id: deleteAddressTemp})
  }

  toEditAddress (e, address) {
    e.preventDefault()
    Router.push(`/edit-address?id=${address.id}`)
  }

  componentWillReceiveProps (nextProps) {
    const { notification, listAddress, deleteAddressTemp, submitting } = this.state
    const { addAddress, updateAddress, statusDeleteAddress, query } = nextProps
    if (nextProps.listAddress.status === 200) {
      this.setState({ listAddress: nextProps.listAddress })
    }
    if (query.hasOwnProperty('isSuccess')) {
      if (!addAddress.isLoading) {
        switch (addAddress.status) {
          case Status.SUCCESS: {
            const newNotification = { notification }
            newNotification.notification['status'] = true
            newNotification.notification['message'] = addAddress.message
            newNotification.notification['color'] = 'is-success'
            this.setState(newNotification)
            break
          }
          case Status.OFFLINE :
          case Status.FAILED : {
            const newNotif = { notification }
            newNotif.notification['status'] = true
            newNotif.notification['message'] = addAddress.message
            newNotif.notification['color'] = 'is-danger'
            this.setState(newNotif)
            break
          }
          default:
            break
        }
        this.setState({ notification })
      }
      if (updateAddress.isFound) {
        switch (updateAddress.status) {
          case Status.SUCCESS: {
            const newNotification = { notification }
            newNotification.notification['status'] = true
            newNotification.notification['message'] = updateAddress.message
            newNotification.notification['color'] = 'is-success'
            this.setState(newNotification)
            break
          }
          case Status.OFFLINE :
          case Status.FAILED : {
            const newNotif = { notification }
            newNotif.notification['status'] = true
            newNotif.notification['message'] = updateAddress.message
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
    if (!statusDeleteAddress.isLoading && submitting) {
      switch (statusDeleteAddress.status) {
        case Status.SUCCESS: {
          let newData = listAddress.address.filter(data => data.id !== deleteAddressTemp)
          let newListAddress = {
            ...listAddress, address: newData
          }
          this.setState({ listAddress: newListAddress, submitting: false, confirmDelete: false, dropdownSelected: '' })
          const newNotification = { notification }
          newNotification.notification['status'] = true
          newNotification.notification['message'] = statusDeleteAddress.message
          newNotification.notification['color'] = 'is-success'
          this.setState(newNotification)
          break
        }
        case Status.OFFLINE :
        case Status.FAILED : {
          this.setState({ submitting: false, confirmDelete: false, dropdownSelected: '' })
          const newNotif = { notification }
          newNotif.notification['status'] = true
          newNotif.notification['message'] = statusDeleteAddress.message
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

  componentWillMount () {
    this.props.getListAddress()
  }

  toAddAddress (e) {
    e.preventDefault()
    Router.push('/add-address')
  }

  render () {
    const { listAddress, dropdownSelected, confirmDelete, notification, submitting } = this.state
    return (
      <div>
        <div
          className={`notification ${notification.status && notification.color}`}
          style={{display: notification.status ? 'block' : 'none'}}>
          <button className='delete' onClick={(e) => this.handleNotification(e)} />
          {notification.message}
        </div>
        { listAddress.address.length !== 0 ? listAddress.address.map(val => {
          return (
            <section className='section is-paddingless bg-white has-shadow' key={val.id}>
              <div className='data-wrapper'>
                <div className='head-panel' onClick={(e) => this.handleDropdown(e, val.id)}>
                  <h3>{val.alias_address} {val.is_primary_address && <span className='tag is-primary'>Alamat Utama</span>}</h3>
                  <div
                    className={`menu-top ${dropdownSelected === val.id && 'open'}`}
                    >
                    <a className='option-content'>
                      <span /><span /><span />
                    </a>
                    <ul className='option-dropdown'>
                      <li onClick={(e) => this.toEditAddress(e, val)}><a>Edit</a></li>
                      <li onClick={(e) => this.modalShowDelete(e, val)}>
                        <a className='js-option'>Hapus</a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className='data-content'>
                  <div className='title-content'>
                    <h3>Nama Penerima</h3>
                  </div>
                  <p>{val.name}</p>
                  <br />
                  <div className='title-content'>
                    <h3>No Handphone</h3>
                  </div>
                  <p>{val.phone_number}</p>
                  <br />
                  <div className='title-content'>
                    <h3>Alamat</h3>
                  </div>
                  <p>{val.address}</p>
                </div>
              </div>
            </section>
          )
        }) : <p style={{textAlign: 'center', paddingTop: '20px'}}>Silahkan tambah alamat baru</p>}
        <a className='sticky-button' onClick={(e) => this.toAddAddress(e)}>
          <span className='txt'>+</span>
        </a>
        <div className='sort-option' style={{display: confirmDelete && 'block'}}>
          <div className='notif-report'>
            <h3>Anda yakin akan menghapus Alamat tersebut?</h3>
            <button
              className={`button is-primary is-large is-fullwidth ${submitting && 'is-loading'}`}
              onClick={(e) => this.modalConfirmDelete(e)}>Ya, Hapus Alamat</button>
            <a className='cancel' onClick={(e) => this.modalShowDelete(e, '')}>Batal</a>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    listAddress: state.listAddress,
    addAddress: state.addAddress,
    updateAddress: state.updateAddress,
    statusDeleteAddress: state.deleteAddress
  }
}

const mapDispatchToProps = dispatch => ({
  getListAddress: () => dispatch(actionTypes.getListAddress()),
  deleteAddress: (params) => dispatch(actionTypes.deleteAddress(params))
})

export default connect(mapStateToProps, mapDispatchToProps)(DataAddress)

