// @flow
import React from 'react'
import { connect } from 'react-redux'
import Router from 'next/router'
import NProgress from 'nprogress'
// components
import Notification from '../../Components/Notification'
// validation
import { inputNumber } from '../../Validations/Input'
// actions
import * as actionTypes from '../../actions/bank'
import * as actionUserTypes from '../../actions/user'

class EditRekening extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      banks: props.banks,
      formBank: {
        code: '',
        master_bank_id: '',
        holder_name: '',
        holder_account_number: '',
        bank_branch_office_name: ''
      },
      selectedBank: '',
      fetchingFirst: false,
      showListBank: false,
      submiting: false,
      validation: false,
      notification: {
        type: 'is-success',
        status: false,
        message: 'Error, default message.'
      }
    }
  }

  modalListBank (e) {
    e.preventDefault()
    const { showListBank } = this.state
    this.setState({showListBank: !showListBank})
  }

  handleInput (e) {
    const { name, value } = e.target
    let { formBank } = this.state
    const newState = { formBank }
    newState.formBank[name] = value
    if (name === 'holder_account_number') {
      newState.formBank[name] = inputNumber(value)
    } else {
      newState.formBank[name] = value
    }
    this.setState(newState)
  }

  handleSelectBank (e, bank) {
    e.preventDefault()
    const { formBank, showListBank } = this.state
    const newState = { formBank, selectedBank: bank.name }
    newState.formBank['code'] = Number.parseInt(bank.code)
    newState.formBank['master_bank_id'] = bank.id
    this.setState(newState)
    this.setState({ showListBank: !showListBank })
  }

  renderValidation (type, textFailed) {
    const { formBank, validation } = this.state
    let masterBankId = formBank.master_bank_id
    let holderName = formBank.holder_name
    let holderAccountNumber = formBank.holder_account_number
    let bankBranchOfficeName = formBank.bank_branch_office_name
    let codeRequired = type === 'master_bank_id' && masterBankId.length > 0
    let holderNameRequired = type === 'holder_name' && holderName.length > 0
    let hanRequired = type === 'holder_account_number' && holderAccountNumber.length > 0
    let bbonRequired = type === 'bank_branch_office_name' && bankBranchOfficeName.length > 0
    let result = codeRequired || holderNameRequired || hanRequired || bbonRequired
    return (
      <span className='error-msg' style={{display: validation ? 'block' : 'none'}}>
        {result ? '' : textFailed}
      </span>
    )
  }

  postCreateBankAccount (e) {
    e.preventDefault()
    const { query } = this.props
    const { formBank } = this.state
    let masterBankId = formBank.master_bank_id
    let holderName = formBank.holder_name
    let holderAccountNumber = formBank.holder_account_number
    let bankBranchOfficeName = formBank.bank_branch_office_name
    let masterBankIdRequired = masterBankId.toString().length > 0
    let holderNameRequired = holderName.length > 0
    let hanRequired = holderAccountNumber.length > 0
    let bbonRequired = bankBranchOfficeName.length > 0
    let isValid = masterBankIdRequired && holderNameRequired && hanRequired && bbonRequired
    if (isValid) {
      this.setState({ submiting: true, validation: false, queryCodeBank: `action=edit&id=${query.id}&master_bank_id=${masterBankId}&holder_name=${holderName}&holder_account_number=${holderAccountNumber}&bank_branch_office_name=${bankBranchOfficeName}` })
      this.props.sendOTPBank()
    } else {
      this.setState({ validation: true })
    }
  }

  componentWillReceiveProps (nextProps) {
    const { formBank, fetchingFirst } = this.state
    const { banks, bankAccountDetail, statusSendOTPBank } = nextProps
    const { isFetching, isFound, isError, notifError } = this.props
    if (!isFetching(banks)) {
      if (isFound(banks)) {
        this.setState({ banks })
        NProgress.done()
      }
      if (isError(banks)) {
        this.setState({ notification: notifError(banks.message) })
      }
    }
    if (!isFetching(bankAccountDetail) && fetchingFirst) {
      this.setState({ fetchingFirst: false })
      if (isFound(bankAccountDetail)) {
        const newState = { formBank, selectedBank: bankAccountDetail.bankAccountDetail.bank.name }
        newState.formBank['master_bank_id'] = bankAccountDetail.bankAccountDetail.bank.id
        newState.formBank['holder_name'] = bankAccountDetail.bankAccountDetail.holder_name
        newState.formBank['holder_account_number'] = bankAccountDetail.bankAccountDetail.holder_account_number
        newState.formBank['bank_branch_office_name'] = bankAccountDetail.bankAccountDetail.bank_branch_office_name
        this.setState(newState)
      }
      if (isError(bankAccountDetail)) {
        this.setState({ notification: notifError(bankAccountDetail.message) })
      }
    }
    if (!isFetching(statusSendOTPBank) && this.state.submiting) {
      this.setState({ submiting: false })
      if (isFound(statusSendOTPBank)) {
        const href = `/verify-otp-bank?${this.state.queryCodeBank}`
        const as = 'verify-otp-bank'
        Router.push(href, as)
      }
      if (isError(statusSendOTPBank)) {
        this.setState({ notification: notifError(statusSendOTPBank.message) })
      }
    }
  }

  componentDidMount () {
    const { listBank, query, getBankAccountDetail } = this.props
    if (!this.state.banks.isFound) {
      listBank()
    }
    if (query.id !== '') {
      getBankAccountDetail({ id: query.id })
      this.setState({ fetchingFirst: true })
    }
  }

  renderModalAddRekening () {
    const { showListBank, banks } = this.state
    return (
      <div className='sort-option' style={{display: showListBank && 'block'}}>
        <div className='sort-list'>
          <p><strong>Pilih Bank</strong></p>
          <form className='form'>
            <div className='field'>
              <div className='control popup-option'>
                { banks.banks.map(bank => {
                  return (
                    <label
                      className='radio'
                      key={bank.id}
                      onClick={(e) => this.handleSelectBank(e, bank)} >
                      <input type='radio' name='bank' />
                      {bank.name}
                    </label>
                  )
                })}
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  }

  render () {
    const { formBank, selectedBank, notification, submiting } = this.state
    return (
      <section className='section is-paddingless'>
        <Notification
          type={notification.type}
          isShow={notification.status}
          activeClose
          onClose={() => this.setState({notification: {status: false, message: ''}})}
          message={notification.message} />
        <div className='edit-data-delivery bg-white edit'>
          <form className='form edit'>
            <div className='field '>
              <label className='label'>Pemilik Akun</label>
              <p className='control'>
                <input
                  className='input'
                  type='text'
                  name='holder_name'
                  value={formBank.holder_name}
                  onChange={(e) => this.handleInput(e)} />
              </p>
              {this.renderValidation('holder_name', 'Mohon isi nama pemilik akun')}
            </div>
            <div className='field '>
              <label className='label'>Nomor Rekening</label>
              <p className='control'>
                <input
                  className='input'
                  type='text'
                  name='holder_account_number'
                  value={formBank.holder_account_number}
                  onChange={(e) => this.handleInput(e)} />
              </p>
              {this.renderValidation('holder_account_number', 'Mohon isi nomor rekening anda')}
            </div>
            <div className='field'>
              <label className='label'>Nama Bank</label>
              <p className='control detail-address'>
                <span onClick={(e) => this.modalListBank(e)}
                  className='location-label js-option'>
                  {selectedBank || 'Pilih Nama Bank'}
                </span>
              </p>
              {this.renderValidation('master_bank_id', 'Mohon isi nama bank')}
            </div>
            <div className='field '>
              <label className='label'>Cabang Bank</label>
              <p className='control'>
                <input
                  className='input'
                  type='text'
                  name='bank_branch_office_name'
                  value={formBank.bank_branch_office_name}
                  onChange={(e) => this.handleInput(e)} />
              </p>
              {this.renderValidation('bank_branch_office_name', 'Mohon isi cabang bank')}
            </div>
            <div className='field'>
              <a
                className={`button is-primary is-large is-fullwidth ${submiting && 'is-loading'}`}
                onClick={(e) => this.postCreateBankAccount(e)}>Simpan Perubahan
              </a>
            </div>
          </form>
        </div>
        {this.renderModalAddRekening()}
      </section>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    banks: state.banks,
    bankAccountDetail: state.bankAccountDetail,
    statusSendOTPBank: state.sendOTPBank
  }
}

const mapDispatchToProps = dispatch => ({
  getBankAccountDetail: (params) => dispatch(actionTypes.getBankAccountDetail(params)),
  listBank: () => dispatch(actionTypes.listBank()),
  sendOTPBank: () => dispatch(actionUserTypes.sendOTPBank())
})

export default connect(mapStateToProps, mapDispatchToProps)(EditRekening)
