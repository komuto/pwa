// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import Router from 'next/router'
// components
import Notification from '../Components/Notification'
// actions
import * as actionTypes from '../actions/user'
// services
import { Status } from '../Services/Status'

class NomorHandphone extends Component {
  constructor (props) {
    super(props)
    this.state = {
      phoneNumber: '',
      validation: false,
      submitting: false,
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
    return (
      <span style={{color: result ? '#23d160' : '#ef5656',
        display: validation ? 'block' : 'none',
        letterSpacing: '0.2px'}} >
        {!result && textFailed}
      </span>
    )
  }

  postPhone (e) {
    e.preventDefault()
    const { updatePhone, sendOTPToPhone } = this.props
    const { phoneNumber } = this.state
    const regex = /^(^\+62\s?|^0)(\d{3,4}-?){2}\d{3,4}$/g
    let isValid = regex.test(phoneNumber)
    if (isValid) {
      this.setState({ submitting: true })
      updatePhone({phone_number: phoneNumber})
      sendOTPToPhone()
    } else {
      this.setState({ validation: true })
    }
  }

  componentWillReceiveProps (nextProps) {
    let { notification } = this.state
    notification = {status: false, message: 'Error, default message.'}
    switch (nextProps.statusUpdatePhone.status) {
      case Status.SUCCESS:
        break
      case Status.OFFLINE :
      case Status.FAILED :
        notification = {status: true, message: nextProps.statusUpdatePhone.message}
        this.setState({ notification })
        break
      default:
        break
    }
    if (!nextProps.statusOTPPhone.isLoading) {
      switch (nextProps.statusOTPPhone.status) {
        case Status.SUCCESS:
          this.setState({ submitting: false })
          this.statusOTPSuccess = true
          if (this.statusOTPSuccess) {
            Router.push('/verify-no-hp')
            this.statusOTPSuccess = false
          }
          break
        case Status.OFFLINE :
        case Status.FAILED :
          notification = {status: true, message: nextProps.statusUpdatePhone.message}
          this.setState({ notification })
          this.setState({ submitting: false })
          break
        default:
          break
      }
    }
  }

  render () {
    const { phoneNumber, validation, notification, submitting } = this.state
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
              className={`button is-primary is-large is-fullwidth ${submitting && 'is-loading'}`}
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
