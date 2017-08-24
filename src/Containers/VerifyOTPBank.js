// @flow
import React from 'react'
import { connect } from 'react-redux'
// components
import Router from 'next/router'
import Notification from '../Components/Notification'
// actions
import * as actionTypes from '../actions/user'
import * as actionBankTypes from '../actions/bank'
// services
import { Status } from '../Services/Status'
// validation
import { inputNumber } from '../Validations/Input'

class VerifyNoTelp extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      verify: false,
      profile: props.profile,
      formVerify: {
        digit1: '',
        digit2: '',
        digit3: '',
        digit4: '',
        digit5: ''
      },
      notification: {
        status: false,
        message: 'Error, default message.'
      },
      submitting: false,
      submitOTPBank: false
    }
  }

  handleInput (e) {
    const { name, value } = e.target
    const { formVerify } = this.state
    const newState = { formVerify }
    newState.formVerify[name] = inputNumber(value)
    this.setState(newState)

    switch (name) {
      case 'digit1':
        if (value !== '') {
          this.digit2.focus()
        }
        break
      case 'digit2':
        if (value !== '') {
          this.digit3.focus()
        }
        break
      case 'digit3':
        if (value !== '') {
          this.digit4.focus()
        }
        break
      case 'digit4':
        if (value !== '') {
          this.digit5.focus()
        }
        break
      default:
        this.digit5.focus()
    }
  }

  handleVerify (e) {
    e.preventDefault()
    const { formVerify } = this.state
    const { query, addBankAccount, updateBankAccount, deleteBankAccount } = this.props
    const code = `${formVerify.digit1}${formVerify.digit2}${formVerify.digit3}${formVerify.digit4}${formVerify.digit5}`
    switch (query.action) {
      case 'edit':
        const newData = {
          id: query.id,
          code: code,
          master_bank_id: query.master_bank_id,
          holder_name: query.holder_name,
          holder_account_number: query.holder_account_number,
          bank_branch_office_name: query.bank_branch_office_name
        }
        updateBankAccount(newData)
        break
      case 'add':
        const newState = {
          code: code,
          master_bank_id: query.master_bank_id,
          holder_name: query.holder_name,
          holder_account_number: query.holder_account_number,
          bank_branch_office_name: query.bank_branch_office_name
        }
        addBankAccount(newState)
        break
      case 'delete':
        deleteBankAccount({id: query.id, code: code})
        break
      default:
        break
    }
    this.setState({ submitting: true })
  }

  sendOTPBank (e) {
    e.preventDefault()
    this.setState({ submitOTPBank: true })
    this.props.sendOTPBank()
  }

  componentWillMount () {
    if (!this.state.profile.isFound) {
      this.props.getProfile()
    }
  }

  componentWillReceiveProps (nextProps) {
    const { bankAccount, statusSendOTPBank } = nextProps
    let { notification, submitting, submitOTPBank } = this.state
    notification = {status: false, message: 'Error, default message.'}
    this.setState({ profile: nextProps.profile })
    if (!bankAccount.isLoading && submitting) {
      switch (bankAccount.status) {
        case Status.SUCCESS:
          this.setState({ submitting: false })
          Router.push('/data-rekening')
          break
        case Status.OFFLINE :
        case Status.FAILED :
          this.setState({ submitting: false })
          notification = {status: true, message: bankAccount.message}
          break
        default:
          break
      }
      this.setState({ notification })
    }
    if (!statusSendOTPBank.isLoading && submitOTPBank) {
      switch (statusSendOTPBank.status) {
        case Status.SUCCESS:
          this.setState({ submitOTPBank: false })
          break
        case Status.OFFLINE :
        case Status.FAILED :
          this.setState({ submitOTPBank: false })
          notification = {status: true, message: statusSendOTPBank.message}
          break
        default:
          break
      }
      this.setState({ notification })
    }
  }

  render () {
    const { formVerify, verify, profile, notification, submitting, submitOTPBank } = this.state
    return (
      <div>
        <Notification
          type='is-danger'
          isShow={notification.status}
          activeClose
          onClose={() => this.setState({notification: {status: false, message: ''}})}
          message={notification.message}
          />
        <section className='content'>
          <div className='container is-fluid'>
            <form action='#' className='form edit'>
              <div className='has-text-centered noted'>
                <p>Silahkan menuliskan kode aktivasi yang telah kami kirim ke nomor { profile.user.hasOwnProperty('user') ? ` ${profile.user.user.phone_number}` : '' }
                </p>
              </div>
              <div className='field is-horizontal number-account'>
                <div className='field-body'>
                  <div className='field is-grouped'>
                    <p className='control'>
                      <input
                        className='input'
                        style={{textAlign: 'center'}}
                        ref={(input) => { this.digit2 = input }}
                        type='text'
                        name='digit1'
                        maxLength={1}
                        value={formVerify.digit1}
                        onChange={(e) => this.handleInput(e)} />
                    </p>
                    <p className='control'>
                      <input
                        className='input'
                        style={{textAlign: 'center'}}
                        ref={(input) => { this.digit2 = input }}
                        type='text'
                        name='digit2'
                        maxLength={1}
                        value={formVerify.digit2}
                        onChange={(e) => this.handleInput(e)} />
                    </p>
                    <p className='control'>
                      <input
                        className='input'
                        style={{textAlign: 'center'}}
                        ref={(input) => { this.digit3 = input }}
                        type='text'
                        name='digit3'
                        maxLength={1}
                        value={formVerify.digit3}
                        onChange={(e) => this.handleInput(e)} />
                    </p>
                    <p className='control'>
                      <input
                        className='input'
                        style={{textAlign: 'center'}}
                        ref={(input) => { this.digit4 = input }}
                        type='text'
                        name='digit4'
                        maxLength={1}
                        value={formVerify.digit4}
                        onChange={(e) => this.handleInput(e)} />
                    </p>
                    <p className='control'>
                      <input
                        className='input'
                        style={{textAlign: 'center'}}
                        ref={(input) => { this.digit5 = input }}
                        type='text'
                        name='digit5'
                        maxLength={1}
                        value={formVerify.digit5}
                        onChange={(e) => this.handleInput(e)} />
                    </p>
                  </div>
                </div>
              </div>
              <a
                className={`button is-primary is-large is-fullwidth js-sort ${submitting && 'is-loading'}`}
                onClick={(e) => this.handleVerify(e)}>
                Verifikasi Kode OTP
              </a>
              <p className='text-ask has-text-centered'>Belum menerima kode aktivasi?
                <a className={submitOTPBank && 'button self is-loading'} onClick={(e) => this.sendOTPBank(e)}> Klik Disini</a>
              </p>
            </form>
          </div>
          { verify && this.modalVerificationSuccess()}
        </section>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    profile: state.profile,
    statusSendOTPBank: state.sendOTPBank,
    bankAccount: state.bankAccount
  }
}

const mapDispatchToProps = dispatch => ({
  sendOTPBank: () => dispatch(actionTypes.sendOTPBank()),
  getProfile: () => dispatch(actionTypes.getProfile()),
  addBankAccount: (params) => dispatch(actionBankTypes.addBankAccount(params)),
  updateBankAccount: (params) => dispatch(actionBankTypes.updateBankAccount(params)),
  deleteBankAccount: (params) => dispatch(actionBankTypes.deleteBankAccount(params))
})

export default connect(mapStateToProps, mapDispatchToProps)(VerifyNoTelp)
