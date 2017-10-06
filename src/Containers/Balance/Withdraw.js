/**
 * Safei Muslim
 * Yogyakarta , 3 Oktober 2017
 * PT Skyshi Digital Indonesa
 */

/** including dependencies */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import Router from 'next/router'
import moment from 'moment'
import _ from 'lodash'
/** including component */
import Content from '../../Components/Content'
import Notification from '../../Components/Notification'
import { ModalSlide, ModalFull } from '../../Components/Modal'
/** including actions */
import * as bankActions from '../../actions/bank'
import * as userActions from '../../actions/user'
/** including custom lib */
import RupiahFormat from '../../Lib/RupiahFormat'

class Withdraw extends Component {
  constructor (props) {
    super(props)
    /** define state */
    this.state = {
      addAccountStatus: props.query.addAccount,
      balance: props.balance || null,
      banks: {
        data: props.banks || null,
        show: false,
        showPress: (e) => this.listBankShowPress(e),
        selectedListPress: (e, p) => this.selectedBankPress(e, p)
      },
      listBankAccounts: {
        data: props.listBankAccounts || null,
        show: false,
        showPress: (e) => this.listBankAccountShowPress(e),
        selectedListPress: (e, p) => this.selectedBankAccount(e, p)
      },
      inputAccount: {
        form: {
          error: []
        },
        show: false,
        showPress: (e) => this.inputAccountShowPress(e),
        handleInput: (p) => this.handleInputAccount(p),
        submit: () => this.submitBankAccount()
      },
      withdraw: {
        form: {
          error: []
        },
        handleInput: (p) => this.handleInputWithdraw(p),
        submit: () => this.submitWithdraw()
      },
      notification: props.notification
    }
    /** define submitting status, status when they call or not [TRUE, FALSE] */
    this.submitting = {
      balance: false,
      banks: false,
      listBankAccounts: false,
      sendOTPBank: false,
      withdraw: false
    }
    /** setup moment localize to id */
    moment.locale('id')
    this.isAccountFound = false
  }

  render () {
    let { notification, addAccountStatus } = this.state

    if (addAccountStatus && addAccountStatus === 'success') {
      notification = { type: 'is-success', status: true, message: 'Berhasil menambah rekening baru' }
    }

    return (
      <Content>
        <Notification
          type={notification.type}
          isShow={notification.status}
          activeClose
          onClose={() => this.setState({notification: {status: false, message: ''}})}
          message={notification.message} />
        {
          <WithdrawContent
            {...this.state}
            defProps={this.props}
            submitting={this.submitting}
            handleInput={(e) => this.handleInput(e.target)}
            submitPress={(e) => this.submitPress(e)} />
        }
      </Content>
    )
  }

  componentDidMount () {
    /** set submitting balance true then call get balance api */
    this.submitting = { ...this.submitting, banks: true, listBankAccounts: true, balance: true }
    this.props.listBank()
    this.props.getBankAccounts()
    this.props.getBalance()
  }

  componentWillReceiveProps (nextProps) {
    const { banks, listBankAccounts, balance, sendOTPBank } = nextProps
    const { isFetching, isError, isFound, notifError } = this.props

    /** handling state sendOTPBank */
    if (!isFetching(sendOTPBank) && this.submitting.sendOTPBank) {
      this.submitting = { ...this.submitting, sendOTPBank: false }
      if (isError(sendOTPBank)) {
        this.setState({ notification: notifError(sendOTPBank.message) })
      }
      if (isFound(sendOTPBank)) {
        let href = ''
        let as = 'verify-otp-bank'
        if (this.submitting.withdraw) {
          this.submitting = { ...this.submitting, withdraw: false }
          let { form } = this.state.withdraw
          let { bankAccountId, amount } = this.props.withdraw
          href = `/verify-otp-bank?action=withdraw&bank_account_id=${form[bankAccountId]}&amount=${form[amount]}`
        } else {
          let { form } = this.state.inputAccount
          let { bankId, branchOffice, accountNumber, holderName } = this.props.account
          href = `/verify-otp-bank?source=balance-withdraw&action=add&master_bank_id=${form[bankId]}&holder_name=${form[holderName]}&holder_account_number=${form[accountNumber]}&bank_branch_office_name=${form[branchOffice]}`
        }
        Router.push(href, as)
      }
    }

    /** handling state get banks */
    if (!isFetching(banks) && this.submitting.banks) {
      this.submitting = { ...this.submitting, banks: false }
      if (isError(banks)) {
        this.setState({ notification: notifError(banks.message) })
      }
      if (isFound(banks)) {
        this.setState({ banks: { ...this.state.banks, data: banks } })
      }
    }

    /** handling state getSaldoToken */
    if (!isFetching(listBankAccounts) && this.submitting.listBankAccounts) {
      this.isAccountFound = true
      this.submitting = { ...this.submitting, listBankAccounts: false }
      if (isError(listBankAccounts)) {
        this.setState({ notification: notifError(listBankAccounts.message) })
      }
      if (isFound(listBankAccounts)) {
        this.setState({ listBankAccounts: { ...this.state.listBankAccounts, data: listBankAccounts } })
      }
    }

    /** handling state get balance */
    if (!isFetching(balance) && this.submitting.balance) {
      this.submitting = { ...this.submitting, balance: false }
      if (isError(balance)) {
        this.setState({ notification: notifError(balance.message) })
      }
      if (isFound(balance)) {
        this.setState({ balance })
      }
    }
  }

  /** show/hide list bank modal */
  listBankShowPress (e) {
    e.preventDefault()
    if (!e.target.className.includes('sortButton')) return
    this.setState({ banks: { ...this.state.banks, show: !this.state.banks.show } })
  }

  /** show/hide list bank account modal */
  listBankAccountShowPress (e) {
    e.preventDefault()
    if (!e.target.className.includes('sortButton')) return
    this.setState({ listBankAccounts: { ...this.state.listBankAccounts, show: !this.state.listBankAccounts.show } })
  }

  /** show/hide modal form input account */
  inputAccountShowPress () {
    this.setState({
      inputAccount: { ...this.state.inputAccount, show: !this.state.inputAccount.show },
      listBankAccounts: { ...this.state.listBankAccounts, show: false }
    })
  }

  /** handle input form input account */
  handleInputAccount ({ name, value }) {
    let { inputAccount } = this.state
    inputAccount.form[name] = value
    this.setState({ inputAccount })
  }

  handleInputWithdraw ({ name, value }) {
    let { withdraw } = this.state
    withdraw.form[name] = value
    this.setState({ withdraw })
  }

  /** handling when bank selected */
  selectedBankPress (e, bank) {
    e.preventDefault()
    let { inputAccount } = this.state
    let { code, bankId } = this.props.account
    inputAccount.form['bank'] = bank
    inputAccount.form[code] = bank.code
    inputAccount.form[bankId] = bank.id
    this.setState({ inputAccount, banks: { ...this.state.banks, show: false } })
  }

  /**  handling when bank account selected */
  selectedBankAccount (e, account) {
    let { withdraw } = this.state
    let { bankAccountId } = this.props.withdraw
    withdraw.form['account'] = account
    withdraw.form[bankAccountId] = account.id
    this.setState({
      withdraw,
      listBankAccounts: { ...this.state.listBankAccounts, show: false }
    })
  }

  /** submit withdraw */
  submitWithdraw () {
    let { bankAccountId, amount } = this.props.withdraw
    let { withdraw } = this.state
    let { form } = withdraw
    console.log('submitWithdraw ()', withdraw)
    if (form[amount] === undefined) {
      form.error.push(amount)
    } else {
      let tam = _.without(form.error, amount)
      form.error = tam
    }

    if (form[bankAccountId] === undefined) {
      form.error.push(bankAccountId)
    } else {
      let tam = _.without(form.error, bankAccountId)
      form.error = tam
    }

    this.setState({ withdraw })

    if (form.error.length > 0) {
      return
    }

    this.submitting = { ...this.submitting, sendOTPBank: true, withdraw: true }
    this.props.addSendOTPBank()
  }

  /** submit bank account */
  submitBankAccount () {
    let { bankId, branchOffice, accountNumber, holderName } = this.props.account
    let { inputAccount } = this.state
    let { form } = inputAccount

    if (form[bankId] === undefined) {
      form.error.push(bankId)
    } else {
      let tam = _.without(form.error, bankId)
      form.error = tam
    }

    if (form[branchOffice] === undefined) {
      form.error.push(branchOffice)
    } else {
      let tam = _.without(form.error, branchOffice)
      form.error = tam
    }

    if (form[accountNumber] === undefined) {
      form.error.push(accountNumber)
    } else {
      let tam = _.without(form.error, accountNumber)
      form.error = tam
    }

    if (form[holderName] === undefined) {
      form.error.push(holderName)
    } else {
      let tam = _.without(form.error, holderName)
      form.error = tam
    }

    this.setState({ inputAccount })

    if (form.error.length > 0) {
      return
    }

    this.submitting = { ...this.submitting, sendOTPBank: true }
    this.props.addSendOTPBank()
  }
}
/** content when user dont have bank account */
const WithdrawContent = ({ defProps, balance, banks, listBankAccounts, inputAccount, withdraw, submitting, submitPress }) => {
  let { bankAccountId, amount } = defProps.withdraw
  let createDate = moment().format('Do MMMM YY')
  let { handleInput, form, submit } = withdraw
  let { error, account } = form
  let dispalayAccount = null
  if (account) {
    dispalayAccount = `${account.bank.name}-${account.holder_account_number}`
  }

  return (
    <section className='section is-paddingless'>
      <div className='detail'>
        <div className='detail-purchase summary'>
          <div className='detail-result detail-price'>
            <ul>
              <li>
                <div className='columns custom is-mobile'>
                  <div className='column is-half'><span>Saldo Per {createDate}</span></div>
                  <div className='column is-half has-text-right'><span>Rp { RupiahFormat(balance.balance.user_balance) }</span></div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className='edit-data-delivery bg-white'>
        <form action='#' className='form'>
          <div className='field'>
            <label className='label'>Nominal Penarikan Dana</label>
            <p className={`control with-currency ${error.includes(amount) && 'is-error'}`}>
              <span className='cur-val'>Rp</span>
              <input name={amount} onChange={(e) => handleInput(e.target)} className='input' type='number' />
              <span className='error-msg'>* Wajib diisi</span>
            </p>
          </div>
          <div className='field sortButton' onClick={(e) => listBankAccounts.showPress(e)}>
            <p className={`control detail-address sortButton with-currency ${error.includes(bankAccountId) && 'is-error'}`}>
              <span className='location-label js-option sortButton'>{ dispalayAccount || 'Pilih Rekening Bank' }</span>
              <span className='error-msg'>* Wajib diisi</span>
            </p>
          </div>
          <div className='field'>
            <a onClick={(e) => !submitting.sendOTPBank && submit(e)} className={`button is-primary is-large is-fullwidth js-option ${submitting.sendOTPBank && 'is-loading'}`}>Tarik Saldo</a>
          </div>
        </form>
      </div>
      <ListBank
        {...banks}
        inputAccount={inputAccount} />
      <ListBankAccount
        {...listBankAccounts}
        withdraw={withdraw}
        inputAccount={inputAccount} />
      <InputAccount
        {...inputAccount}
        banks={banks}
        defProps={defProps}
        submitting={submitting} />
    </section>
  )
}

const InputAccount = ({ show, showPress, handleInput, form, submit, banks, defProps, submitting }) => {
  let { bankId, branchOffice, accountNumber, holderName } = defProps.account
  let { error, bank } = form
  return (
    <ModalFull
      title='Tambah Data Rekening'
      show={show}
      showPress={showPress} >
      <form className='form'>
        <div className='field sortButton' onClick={(e) => banks.showPress(e)}>
          <p className={`control detail-address sortButton ${error.includes(bankId) && 'is-error'}`}>
            <span className='location-label js-option sortButton'>{ bank ? bank.name : 'Pilih Bank Tujuan' }</span>
            <span className='error-msg'>* Wajib diisi</span>
          </p>
        </div>
        <div className='field'>
          <p className={`control ${error.includes(branchOffice) && 'is-error'}`}>
            <input name={branchOffice} onChange={(e) => handleInput(e.target)} className='input' type='text' placeholder='Cabang Bank' />
            <span className='error-msg'>* Wajib diisi</span>
          </p>
        </div>
        <div className='field'>
          <p className={`control ${error.includes(accountNumber) && 'is-error'}`}>
            <input name={accountNumber} onChange={(e) => handleInput(e.target)} className='input' type='number' placeholder='Masukan Nomor Rekening' />
            <span className='error-msg'>* Wajib diisi</span>
          </p>
        </div>
        <div className='field'>
          <p className={`control ${error.includes(holderName) && 'is-error'}`}>
            <input name={holderName} onChange={(e) => handleInput(e.target)} className='input' type='text' placeholder='Masukkan Nama Pemilik Rekening' />
            <span className='error-msg'>* Wajib diisi</span>
          </p>
        </div>
        <div className='field'>
          <a onClick={() => !submitting.sendOTPBank && submit()} className={`button is-primary is-large is-fullwidth ${submitting.sendOTPBank && 'is-loading'}`}>Tambah Data Rekening</a>
        </div>
      </form>
    </ModalFull>
  )
}

const ListBankAccount = ({ data, show, showPress, inputAccount, selectedListPress, withdraw }) => {
  return (
    <ModalSlide
      title='Pilih Rekening Tujuan'
      show={show}
      showPress={(e) => showPress(e)}>
      {
        data.listBankAccounts.map((account, index) => {
          let isChecked = false
          if (withdraw.form.bank_account_id) {
            isChecked = withdraw.form.bank_account_id === account.id
          }
          return (
            <label key={index} className={`radio ${isChecked && 'checked'}`} onClick={(e) => selectedListPress(e, account)}>
              <input type='radio' name='address' />
              <strong>{account.bank.name}</strong>
              <p>{account.holder_account_number}</p>
              <p>a/n {account.holder_name}</p>
            </label>
          )
        })
      }
      <a onClick={() => inputAccount.showPress()} className='add-new-address modal-button'>
        + Tambah Rekening Baru
      </a>
    </ModalSlide>
  )
}

/** list bank modal content */
const ListBank = ({ data, show, showPress, selectedListPress, bank, inputAccount }) => {
  return (
    <ModalSlide
      title='Pilih Bank Tujuan'
      show={show}
      style={{ zIndex: 1000 }}
      showPress={(e) => showPress(e)}>
      {
        data.banks.map((b) => {
          return <label key={b.id} onClick={(e) => selectedListPress(e, b)} className={`radio ${bank && inputAccount.bank.id === b.id && 'checked'}`}>
            <input type='radio' name='address' />
            <strong>{b.name}</strong>
          </label>
        })
      }
    </ModalSlide>
  )
}

/** define dafault props */
Withdraw.defaultProps = {
  account: {
    code: 'code',
    bankId: 'master_bank_id',
    branchOffice: 'bank_branch_office_name',
    accountNumber: 'holder_account_number',
    holderName: 'holder_name'
  },
  withdraw: {
    bankAccountId: 'bank_account_id',
    amount: 'amount'
  }
}

/** function get state from redux */
const mapStateToProps = (state) => ({
  balance: state.balance,
  banks: state.banks,
  listBankAccounts: state.listBankAccounts,
  sendOTPBank: state.sendOTPBank
})

/** function get actions from redux */
const mapDispatchToPtops = (dispatch) => ({
  listBank: () => dispatch(bankActions.listBank()),
  getBankAccounts: () => dispatch(bankActions.getBankAccounts()),
  getBalance: () => dispatch(userActions.getBalance()),
  addSendOTPBank: () => dispatch(userActions.sendOTPBank())
})

/** connecting componet with redux */
export default connect(mapStateToProps, mapDispatchToPtops)(Withdraw)
