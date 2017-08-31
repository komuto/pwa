// @flow
import React from 'react'
import { connect } from 'react-redux'
import Router from 'next/router'
// components
// services
import { Status } from '../Services/Status'
// actions
import * as actionUserTypes from '../actions/user'
import * as actionTypes from '../actions/bank'

class DataRekening extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      listBankAccounts: props.listBankAccounts,
      dropdownSelected: '',
      confirmDelete: '',
      deleteBankAccountTemp: '',
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
    this.setState({ confirmDelete: !confirmDelete, deleteBankAccountTemp: address.id, dropdownSelected: '' })
  }

  modalConfirmDelete (e) {
    e.preventDefault()
    const { deleteBankAccountTemp } = this.state
    this.props.sendOTPBank()
    Router.push(`/verify-otp-bank?action=delete&&id=${deleteBankAccountTemp}`)
  }

  toEditRekening (e, bank) {
    e.preventDefault()
    Router.push(`/edit-rekening?id=${bank.id}`)
  }

  componentDidMount () {
    const { notification } = this.state
    const { getBankAccounts, bankAccount, query } = this.props
    getBankAccounts()
    if (query.hasOwnProperty('isSuccess')) {
      if (bankAccount.type === 'add') {
        switch (bankAccount.status) {
          case Status.SUCCESS:
            const newNotification = { notification }
            newNotification.notification['status'] = true
            newNotification.notification['message'] = bankAccount.message
            newNotification.notification['color'] = 'is-success'
            this.setState(newNotification)
            break
          case Status.OFFLINE :
          case Status.FAILED :
            const newNotif = { notification }
            newNotif.notification['status'] = true
            newNotif.notification['message'] = bankAccount.message
            newNotif.notification['color'] = 'is-danger'
            this.setState(newNotif)
            break
          default:
            break
        }
      }
      if (bankAccount.type === 'update') {
        switch (bankAccount.status) {
          case Status.SUCCESS:
            const newNotification = { notification }
            newNotification.notification['status'] = true
            newNotification.notification['message'] = bankAccount.message
            newNotification.notification['color'] = 'is-success'
            this.setState(newNotification)
            break
          case Status.OFFLINE :
          case Status.FAILED :
            const newNotif = { notification }
            newNotif.notification['status'] = true
            newNotif.notification['message'] = bankAccount.message
            newNotif.notification['color'] = 'is-danger'
            this.setState(newNotif)
            break
          default:
            break
        }
      }
      if (bankAccount.type === 'delete') {
        switch (bankAccount.status) {
          case Status.SUCCESS:
            const newNotification = { notification }
            newNotification.notification['status'] = true
            newNotification.notification['message'] = bankAccount.message
            newNotification.notification['color'] = 'is-success'
            this.setState(newNotification)
            break
          case Status.OFFLINE :
          case Status.FAILED :
            const newNotif = { notification }
            newNotif.notification['status'] = true
            newNotif.notification['message'] = bankAccount.message
            newNotif.notification['color'] = 'is-danger'
            this.setState(newNotif)
            break
          default:
            break
        }
      }
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.listBankAccounts.status) {
      this.setState({ listBankAccounts: nextProps.listBankAccounts })
    }
  }

  toAddRekening (e) {
    e.preventDefault()
    Router.push('/add-rekening')
  }

  render () {
    const { listBankAccounts, notification, dropdownSelected, confirmDelete, submitting } = this.state
    return (
      <div>
        <div
          className={`notification ${notification.status && notification.color}`}
          style={{display: notification.status ? 'block' : 'none'}}>
          <button className='delete' onClick={(e) => this.handleNotification(e)} />
          {notification.message}
        </div>
        { (listBankAccounts.listBankAccounts.length !== 0 && Array.isArray(listBankAccounts.listBankAccounts)) ? listBankAccounts.listBankAccounts.map(bank => {
          return (
            <section className='section is-paddingless bg-white has-shadow' key={bank.id}>
              <div className='data-wrapper'>
                <div className='head-panel' onClick={(e) => this.handleDropdown(e, bank.id)}>
                  <h3><img src={bank.bank.logo} alt={bank.bank.name} /></h3>
                  <div className={`menu-top ${dropdownSelected === bank.id && 'open'}`}>
                    <a className='option-content'>
                      <span /><span /><span />
                    </a>
                    <ul className='option-dropdown'>
                      <li onClick={(e) => this.toEditRekening(e, bank)}><a>Edit</a></li>
                      <li onClick={(e) => this.modalShowDelete(e, bank)}>
                        <a className='js-option'>Hapus</a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className='data-content'>
                  <div className='title-content'>
                    <h3>Pemilik Akun</h3>
                  </div>
                  <p>{bank.holder_name}</p>
                  <br />
                  <div className='title-content'>
                    <h3>No Rekening</h3>
                  </div>
                  <p>{bank.holder_account_number}</p>
                  <br />
                  <div className='title-content'>
                    <h3>Nama Bank</h3>
                  </div>
                  <p>{bank.bank.name}</p>
                  <br />
                  <div className='title-content'>
                    <h3>Cabang Bank</h3>
                  </div>
                  <p>{bank.bank_branch_office_name}</p>
                </div>
              </div>
            </section>
          )
        }) : <p style={{textAlign: 'center', paddingTop: '20px'}}>Silahkan tambah rekening baru</p>}
        <a
          className='sticky-button'
          onClick={(e) => this.toAddRekening(e)}>
          <span className='txt'>+</span>
        </a>
        <div className='sort-option' style={{display: confirmDelete && 'block'}}>
          <div className='notif-report'>
            <h3>Anda yakin akan menghapus rekening tersebut?</h3>
            <button
              className={`button is-primary is-large is-fullwidth ${submitting && 'is-loading'}`}
              onClick={(e) => this.modalConfirmDelete(e)}>Ya, Hapus Rekening</button>
            <a className='cancel' onClick={(e) => this.modalShowDelete(e, '')}>Batal</a>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    listBankAccounts: state.listBankAccounts,
    bankAccount: state.bankAccount
  }
}

const mapDispatchToProps = dispatch => ({
  sendOTPBank: () => dispatch(actionUserTypes.sendOTPBank()),
  getBankAccounts: () => dispatch(actionTypes.getBankAccounts())
})

export default connect(mapStateToProps, mapDispatchToProps)(DataRekening)
