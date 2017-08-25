// @flow
import React from 'react'
import { connect } from 'react-redux'
// components
import Link from 'next/link'
import {Images} from '../Themes'
import Notification from '../Components/Notification'
// actions
import * as actionTypes from '../actions/user'
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
      submitting: false
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

  handleVerify () {
    const { formVerify } = this.state
    this.setState({ submitting: true })
    const code = `${formVerify.digit1}${formVerify.digit2}${formVerify.digit3}${formVerify.digit4}${formVerify.digit5}`
    this.props.verifyPhone({ code })
  }

  sendOTPPhone (e) {
    e.preventDefault()
    this.props.sendOTPToPhone()
  }

  modalVerificationSuccess () {
    return (
      <div className='sort-option' style={{display: 'block'}}>
        <div className='notif-report'>
          <img src={Images.verifiedPhone} alt='' />
          <h3>Nomor Telepon Telah Terverifikasi</h3>
          <p>Nomor Telepon telah terverifikasi kini Anda bisa melanjutkan proses aktivasi toko Anda</p>
          <Link href='add-information-store'>
            <button className='button is-primary is-large is-fullwidth'>Ke Daftar Transaksi</button>
          </Link>
        </div>
      </div>
    )
  }

  componentWillMount () {
    this.props.getProfile()
  }

  componentWillReceiveProps (nextProps) {
    const { stateVerifyPhone } = nextProps
    let { notification, verify } = this.state
    notification = {status: false, message: 'Error, default message.'}
    this.setState({ profile: nextProps.profile })
    if (!stateVerifyPhone.isLoading) {
      switch (stateVerifyPhone.status) {
        case Status.SUCCESS:
          this.setState({ submitting: false })
          this.setState({verify: !verify})
          break
        case Status.OFFLINE :
        case Status.FAILED :
          this.setState({ submitting: false })
          notification = {status: true, message: stateVerifyPhone.message}
          break
        default:
          break
      }
      this.setState({ notification })
    }
  }

  render () {
    const { formVerify, verify, profile, notification, submitting } = this.state
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
                <p>Silahkan menuliskan kode aktivasi yang telah kami kirim ke nomor {profile.user.hasOwnProperty('user') ? ` ${profile.user.user.phone_number}` : '' }
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
                onClick={() => this.handleVerify()}>
                Verifikasi Nomor Telepon
              </a>
              <p className='text-ask has-text-centered'>Belum menerima kode aktivasi?
                <a onClick={(e) => this.sendOTPPhone(e)}> Klik Disini</a>
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
    stateVerifyPhone: state.verifyPhone,
    profile: state.profile
  }
}

const mapDispatchToProps = dispatch => ({
  verifyPhone: (code) => dispatch(actionTypes.verifyPhone(code)),
  sendOTPToPhone: () => dispatch(actionTypes.sendOTPPhone()),
  getProfile: () => dispatch(actionTypes.getProfile())
})

export default connect(mapStateToProps, mapDispatchToProps)(VerifyNoTelp)
