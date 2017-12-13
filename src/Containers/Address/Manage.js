// @flow
import React from 'react'
import { connect } from 'react-redux'
import Router from 'next/router'
import NProgress from 'nprogress'
// components
import Notification from '../../Components/Notification'
// actions
import * as actionTypes from '../../actions/address'

class DataAddress extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      listAddress: props.listAddress,
      dropdownSelected: '',
      confirmDelete: '',
      deleteAddressTemp: '',
      notification: {
        type: 'is-success',
        status: false,
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
    this.setState({ submiting: true })
    this.props.deleteAddress({id: deleteAddressTemp})
  }

  toEditAddress (e, address) {
    e.preventDefault()
    Router.push(`/edit-address?id=${address.id}`)
  }

  componentWillReceiveProps (nextProps) {
    const { deleteAddressTemp, submiting } = this.state
    const { statusDeleteAddress, listAddress } = nextProps
    const { isFetching, isFound, isError, notifError, notifSuccess } = this.props
    if (!isFetching(listAddress)) {
      NProgress.done()
      if (isFound(listAddress)) {
        this.setState({ listAddress })
      }
      if (isError(listAddress)) {
        this.setState({ notification: notifError(listAddress.message) })
      }
    }
    if (!isFetching(statusDeleteAddress) && submiting) {
      this.setState({ submiting: false, confirmDelete: false, dropdownSelected: '' })
      if (isFound(statusDeleteAddress)) {
        let newData = listAddress.address.filter(data => data.id !== deleteAddressTemp)
        let newListAddress = {
          ...listAddress, address: newData
        }
        this.setState({ listAddress: newListAddress, notification: notifSuccess(statusDeleteAddress.message) })
        if (this.timeout) clearTimeout(this.timeout)
        this.timeout = setTimeout(() => {
          this.setState({ notification: { ...this.state.notification, status: false } })
        }, 3000)
      }
      if (isError(statusDeleteAddress)) {
        this.setState({ notification: notifError(statusDeleteAddress.message) })
      }
    }
  }

  componentDidMount () {
    const { query, addAddress, updateAddress, isFetching, isFound, isError, notifError, notifSuccess } = this.props
    this.props.getListAddress()
    NProgress.start()
    if (query.hasOwnProperty('isSuccess')) {
      if (!isFetching(addAddress)) {
        if (isFound(addAddress)) {
          this.setState({ notification: notifSuccess(addAddress.message) })
          if (this.timeout) clearTimeout(this.timeout)
          this.timeout = setTimeout(() => {
            this.setState({ notification: { ...this.state.notification, status: false } })
          }, 3000)
        }
        if (isError(addAddress)) {
          this.setState({ notification: notifError(addAddress.message) })
        }
      }
      if (!isFetching(updateAddress)) {
        if (isFound(updateAddress)) {
          this.setState({ notification: notifSuccess(updateAddress.message) })
          if (this.timeout) clearTimeout(this.timeout)
          this.timeout = setTimeout(() => {
            this.setState({ notification: { ...this.state.notification, status: false } })
          }, 3000)
        }
        if (isError(updateAddress)) {
          this.setState({ notification: notifError(updateAddress.message) })
        }
      }
    }
  }

  toAddAddress (e) {
    e.preventDefault()
    Router.push('/add-address')
  }

  render () {
    const { listAddress, dropdownSelected, confirmDelete, notification, submiting } = this.state
    return (
      <div>
        <Notification
          type={notification.type}
          isShow={notification.status}
          activeClose
          onClose={() => this.setState({notification: {status: false, message: ''}})}
          message={notification.message} />
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
        <div className='wrapper-sticky'>
          <a className='sticky-button' onClick={(e) => this.toAddAddress(e)}>
            <span className='txt'>+</span>
          </a>
        </div>
        <div className='sort-option' style={{display: confirmDelete && 'block'}}>
          <div className='notif-report'>
            <h3>Anda yakin akan menghapus Alamat tersebut?</h3>
            <button
              className={`button is-primary is-large is-fullwidth ${submiting && 'is-loading'}`}
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
