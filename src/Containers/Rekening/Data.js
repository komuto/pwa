// @flow
import React from 'react'
import { connect } from 'react-redux'
import Router from 'next/router'
import NProgress from 'nprogress'
// components
import Notification from '../../Components/Notification'
import MyImage from '../../Components/MyImage'
import Images from '../../Themes/Images'
// actions
import * as actionUserTypes from '../../actions/user'
import * as actionTypes from '../../actions/bank'

class DataRekening extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      listBankAccounts: props.listBankAccounts,
      dropdownSelected: '',
      confirmDelete: '',
      deleteBankAccountTemp: '',
      submiting: false,
      isEmpty: false,
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
    this.setState({ confirmDelete: !confirmDelete, deleteBankAccountTemp: address.id, dropdownSelected: '' })
  }

  modalConfirmDelete (e) {
    e.preventDefault()
    this.setState({ submiting: true })
    this.props.sendOTPBank()
  }

  toEditRekening (e, bank) {
    e.preventDefault()
    Router.push(`/edit-rekening?id=${bank.id}`)
  }

  componentDidMount () {
    const { query, getBankAccounts, bankAccount, isFound, isError, notifError, notifSuccess } = this.props
    getBankAccounts()
    NProgress.start()
    if (query.hasOwnProperty('isSuccess')) {
      if (bankAccount.type === 'add') {
        if (isFound(bankAccount)) {
          this.setState({ notification: notifSuccess(bankAccount.message) })
        }
        if (isError(bankAccount)) {
          this.setState({ notification: notifError(bankAccount.message) })
        }
      }
      if (bankAccount.type === 'update') {
        if (isFound(bankAccount)) {
          this.setState({ notification: notifSuccess(bankAccount.message) })
        }
        if (isError(bankAccount)) {
          this.setState({ notification: notifError(bankAccount.message) })
        }
      }
      if (bankAccount.type === 'delete') {
        if (isFound(bankAccount)) {
          this.setState({ notification: notifSuccess(bankAccount.message) })
        }
        if (isError(bankAccount)) {
          this.setState({ notification: notifError(bankAccount.message) })
        }
      }
      if (this.timeout) clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        this.setState({ notification: { ...this.state.notification, status: false } })
      }, 3000)
    }
  }

  componentWillReceiveProps (nextProps) {
    const { listBankAccounts, statusSendOTPBank } = nextProps
    const { isFetching, isFound, isError, notifError } = this.props
    if (!isFetching(listBankAccounts)) {
      NProgress.done()
      if (isFound(listBankAccounts)) {
        let isEmpty = listBankAccounts.listBankAccounts.length < 1
        this.setState({ listBankAccounts, isEmpty })
      }
      if (isError(listBankAccounts)) {
        this.setState({ notification: notifError(listBankAccounts.message) })
      }
    }
    if (!isFetching(statusSendOTPBank) && this.state.submiting) {
      this.setState({ submiting: false })
      if (isFound(statusSendOTPBank)) {
        Router.push(`/verify-otp-bank?action=delete&id=${this.state.deleteBankAccountTemp}`)
      }
      if (isError(statusSendOTPBank)) {
        this.setState({ notification: notifError(statusSendOTPBank.message) })
      }
    }
  }

  toAddRekening (e) {
    e.preventDefault()
    Router.push('/add-rekening')
  }

  render () {
    const { isEmpty, listBankAccounts, notification, dropdownSelected, confirmDelete, submiting } = this.state
    return (
      <div>
        <Notification
          type={notification.type}
          isShow={notification.status}
          activeClose
          onClose={() => this.setState({notification: {status: false, message: ''}})}
          message={notification.message} />
        { isEmpty ? <RekeningEmpty /> : listBankAccounts.listBankAccounts.map(bank => {
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
        }) }
        <a
          className='sticky-button'
          onClick={(e) => this.toAddRekening(e)}>
          <span className='txt'>+</span>
        </a>
        <div className='sort-option' style={{display: confirmDelete && 'block'}}>
          <div className='notif-report'>
            <h3>Anda yakin akan menghapus rekening tersebut?</h3>
            <button
              className={`button is-primary is-large is-fullwidth ${submiting && 'is-loading'}`}
              onClick={(e) => this.modalConfirmDelete(e)}>Ya, Hapus Rekening</button>
            <a className='cancel' onClick={(e) => this.modalShowDelete(e, '')}>Batal</a>
          </div>
        </div>
      </div>
    )
  }
}

/** orders empty content */
const RekeningEmpty = () => {
  return (
    <section className='content'>
      <div className='container is-fluid'>
        <div className='desc has-text-centered'>
          <MyImage src={Images.emptyKatalog} alt='notFound' />
          <p><strong>Rekening anda kosong</strong></p>
          <p>Silahkan tambahkan rekening Anda</p>
        </div>
      </div>
    </section>
  )
}

const mapStateToProps = (state) => {
  return {
    listBankAccounts: state.listBankAccounts,
    bankAccount: state.bankAccount,
    statusSendOTPBank: state.sendOTPBank
  }
}

const mapDispatchToProps = dispatch => ({
  sendOTPBank: () => dispatch(actionUserTypes.sendOTPBank()),
  getBankAccounts: () => dispatch(actionTypes.getBankAccounts())
})

export default connect(mapStateToProps, mapDispatchToProps)(DataRekening)
