// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import Router from 'next/router'
// components
import Notification from '../Components/Notification'
// actions
import * as actionTypes from '../actions/user'
// validations
import * as constraints from '../Validations/Auth'
import { inputPhoneNumber, isValidPhoneNumber } from '../Validations/Input'

class NomorHandphone extends Component {
  constructor (props) {
    super(props)
    this.state = {
      phoneNumber: '',
      validation: false,
      notification: {
        status: false,
        message: 'Error, default message.'
      }
    }
    this.submiting = { sendOTP: false, updatePhone: false }
  }

  handleInput (e) {
    const { value } = e.target
    let { phoneNumber } = this.state
    const newState = { phoneNumber }
    newState.phoneNumber = inputPhoneNumber(value)
    this.setState(newState)
  }

  renderValidation (name, textFailed) {
    const { phoneNumber, validation } = this.state
    let limitPhone
    switch (phoneNumber.charAt(0)) {
      case '0':
        limitPhone = phoneNumber.length >= 8 && phoneNumber.length <= 13
        break
      case '+':
        limitPhone = phoneNumber.length >= 10 && phoneNumber.length <= 15
        break
      case '6':
        limitPhone = phoneNumber.length >= 9 && phoneNumber.length <= 14
        break
      default:
        limitPhone = true
        break
    }
    let emptyPhoneReq = name === 'emptyPhone' && phoneNumber.length > 0
    let phoneNumberReq = name === 'phoneNumberValid' && isValidPhoneNumber(phoneNumber)
    let limitPhoneReq = name === 'limitPhone' && limitPhone
    let result = emptyPhoneReq || phoneNumberReq || limitPhoneReq
    let errorMsg = {
      fontSize: '12px',
      letterSpacing: '0.2px',
      color: '#ef5656',
      display: validation ? 'block' : 'none'
    }
    return (
      <span style={errorMsg}>
        {result ? '' : textFailed}
      </span>
    )
  }

  postPhone (e) {
    e.preventDefault()
    const { phoneNumber } = this.state
    let limitPhone
    if (phoneNumber.length > 0 && isValidPhoneNumber(phoneNumber)) {
      switch (phoneNumber.charAt(0)) {
        case '0':
          limitPhone = phoneNumber.length >= 8 && phoneNumber.length <= 13
          break
        case '+':
          limitPhone = phoneNumber.length >= 10 && phoneNumber.length <= 15
          break
        case '6':
          limitPhone = phoneNumber.length >= 9 && phoneNumber.length <= 14
          break
        default:
          limitPhone = true
          break
      }
    }
    let emptyPhoneReq = phoneNumber.length > 0
    let phoneNumberReq = isValidPhoneNumber(phoneNumber)
    let isValid = emptyPhoneReq && phoneNumberReq && limitPhone
    if (isValid) {
      this.submiting = { updatePhone: true, sendOTP: false }
      this.props.updatePhone({phone_number: phoneNumber})
    } else {
      this.setState({ validation: true })
    }
  }

  componentWillReceiveProps (nextProps) {
    const { isFetching, isFound, isError, notifError } = this.props
    const { statusUpdatePhone, statusOTPPhone } = nextProps
    if (!isFetching(statusUpdatePhone) && this.submiting.updatePhone) {
      this.submiting = { ...this.submiting, updatePhone: false }
      if (isFound(statusUpdatePhone)) {
        this.submiting = { ...this.submiting, sendOTP: true }
        this.props.sendOTPToPhone()
      }
      if (isError(statusUpdatePhone)) {
        this.setState({ notification: notifError(statusUpdatePhone.message) })
      }
    }
    if (!isFetching(statusOTPPhone) && this.submiting.sendOTP) {
      this.submiting = { updatePhone: false, sendOTP: false }
      if (isFound(statusOTPPhone)) {
        Router.push('/verify-no-hp')
      }
      if (isError(statusOTPPhone)) {
        this.setState({ notification: notifError(statusUpdatePhone.message) })
      }
    }
  }

  render () {
    const { phoneNumber, notification } = this.state
    const { handphone } = constraints.loginConstraints
    let limitPhoneFailed
    switch (phoneNumber.charAt(0)) {
      case '0':
        limitPhoneFailed = handphone.alert.minMax0
        break
      case '+':
        limitPhoneFailed = handphone.alert.minMaxPlus
        break
      case '6':
        limitPhoneFailed = handphone.alert.minMax62
        break
      default:
        limitPhoneFailed = 'Mohon isi no handphone 8 -15 digit'
        break
    }
    return (
      <section className='content'>
        <Notification
          type={notification.type}
          isShow={notification.status}
          activeClose
          onClose={() => this.setState({notification: {status: false, message: ''}})}
          message={notification.message} />
        <div className='container is-fluid'>
          <form className='form edit'>
            <div className='has-text-centered noted'>
              {''}
            </div>
            <div className='field '>
              <p className='control'>
                <input
                  className='input'
                  type='text'
                  placeholder='Masukkan Nomor Handphone'
                  value={phoneNumber}
                  onChange={(e) => this.handleInput(e)}
                  autoComplete='off' />
              </p>
              {this.renderValidation('emptyPhone', handphone.alert.empty)}
              {this.renderValidation('phoneNumberValid', handphone.alert.valid)}
              {this.renderValidation('limitPhone', limitPhoneFailed)}
            </div>
            <a
              className={`button is-primary is-large is-fullwidth ${(this.submiting.updatePhone || this.submiting.sendOTP) && 'is-loading'}`}
              onClick={(e) => this.postPhone(e)}>
              Simpan Nomor Handphone
            </a>
          </form>
        </div>
      </section>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    statusUpdatePhone: state.updatePhone,
    statusOTPPhone: state.sendOTPPhone
  }
}

const mapDispatchToProps = dispatch => ({
  updatePhone: (params) => dispatch(actionTypes.updatePhone(params)),
  sendOTPToPhone: () => dispatch(actionTypes.sendOTPPhone())
})

export default connect(mapStateToProps, mapDispatchToProps)(NomorHandphone)
