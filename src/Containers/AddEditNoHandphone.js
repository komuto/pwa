// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import Router from 'next/router'
// components
import Notification from '../Components/Notification'
// actions
import * as actionTypes from '../actions/user'

class NomorHandphone extends Component {
  constructor (props) {
    super(props)
    this.state = {
      phoneNumber: '',
      validation: false,
      submiting: {
        sendOTP: false,
        updatePhone: false
      },
      notification: {
        status: false,
        message: 'Error, default message.'
      }
    }
  }

  handleInput (e) {
    const { value } = e.target
    let { phoneNumber } = this.state
    const newState = { phoneNumber }
    newState.phoneNumber = value
    this.setState(newState)
  }

  renderValidation (name, textFailed) {
    const { phoneNumber, validation } = this.state
    const regex = /^(^\+62\s?|^0)(\d{3,4}-?){2}\d{3,4}$/g
    let result = name === 'phoneNumber' && regex.test(phoneNumber)
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
    const regex = /^(^\+62\s?|^0)(\d{3,4}-?){2}\d{3,4}$/g
    let isValid = regex.test(phoneNumber)
    if (isValid) {
      this.setState({ submiting: { updatePhone: true, sendOTP: false } })
      this.props.updatePhone({phone_number: phoneNumber})
    } else {
      this.setState({ validation: true })
    }
  }

  componentWillReceiveProps (nextProps) {
    let { submiting } = this.state
    const { isFetching, isFound, isError, notifError } = this.props
    const { statusUpdatePhone, statusOTPPhone } = nextProps
    if (!isFetching(statusUpdatePhone) && submiting.updatePhone) {
      this.setState({ submiting: { updatePhone: false, sendOTP: true } })
      if (isFound(statusUpdatePhone)) {
        this.props.sendOTPToPhone()
      }
      if (isError(statusUpdatePhone)) {
        this.setState({ notification: notifError(statusUpdatePhone.message) })
      }
    }
    if (!isFetching(statusOTPPhone) && submiting.sendOTP) {
      this.setState({ submiting: { updatePhone: false, sendOTP: false } })
      if (isFound(statusUpdatePhone)) {
        Router.push('/verify-no-hp')
      }
      if (isError(statusUpdatePhone)) {
        this.setState({ notification: notifError(statusUpdatePhone.message) })
      }
    }
  }

  render () {
    const { phoneNumber, validation, notification, submiting } = this.state
    return (
      <section className='content'>
        <Notification
          type='is-danger'
          isShow={notification.status}
          activeClose
          onClose={() => this.setState({notification: {status: false, message: ''}})}
          message={notification.message}
          />
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
                  onChange={(e) => this.handleInput(e)} />
              </p>
              {validation && this.renderValidation('phoneNumber', 'No handphone anda tidak valid')}
            </div>
            <a
              className={`button is-primary is-large is-fullwidth ${(submiting.updatePhone || submiting.sendOTP) && 'is-loading'}`}
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
