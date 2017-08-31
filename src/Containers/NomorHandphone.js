// @flow
import React from 'react'
import { connect } from 'react-redux'
// components
import Link from 'next/link'
import Router from 'next/router'
import {Images} from '../Themes'
// actions
import * as actionTypes from '../actions/user'
// services
import { Status } from '../Services/Status'

class NomorHandphone extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      profile: props.profile,
      submitting: false,
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

  sendOTPPhone (e) {
    e.preventDefault()
    this.setState({ submitting: true })
    this.props.sendOTPToPhone()
  }

  componentDidMount () {
    const { profile, notification } = this.state
    const { verifyPhone, query } = this.props
    if (!profile.isFound) {
      this.props.getProfile()
    }
    if (query.hasOwnProperty('isSuccess')) {
      if (!verifyPhone.isLoading) {
        switch (verifyPhone.status) {
          case Status.SUCCESS:
            const newNotification = { notification }
            newNotification.notification['status'] = true
            newNotification.notification['message'] = verifyPhone.message
            newNotification.notification['color'] = 'is-success'
            this.setState(newNotification)
            break
          case Status.OFFLINE :
          case Status.FAILED :
            const newNotif = { notification }
            newNotif.notification['status'] = true
            newNotif.notification['message'] = verifyPhone.message
            newNotif.notification['color'] = 'is-danger'
            this.setState(newNotif)
            break
          default:
            break
        }
        this.setState({ notification })
      }
    }
  }

  componentWillReceiveProps (nextProps) {
    let { notification } = this.state
    const { statusOTPPhone } = nextProps
    notification = {status: false, message: 'Error, default message.'}
    this.setState({ profile: nextProps.profile })
    if (!statusOTPPhone.isLoading) {
      switch (statusOTPPhone.status) {
        case Status.SUCCESS:
          this.setState({ submitting: false })
          Router.push('/verify-no-hp')
          break
        case Status.OFFLINE :
        case Status.FAILED :
          const newNotif = { notification }
          newNotif.notification['status'] = true
          newNotif.notification['message'] = statusOTPPhone.message
          newNotif.notification['color'] = 'is-danger'
          this.setState(newNotif)
          break
        default:
          break
      }
      this.setState({ notification })
    }
  }

  render () {
    const { profile, submitting, notification } = this.state
    return (
      <div>
        <div
          className={`notification ${notification.status && notification.color}`}
          style={{display: notification.status ? 'block' : 'none'}}>
          <button className='delete' onClick={(e) => this.handleNotification(e)} />
          {notification.message}
        </div>
        <section className='content'>
          <div className='container is-fluid'>
            <div className='desc has-text-centered'>
              <img src={profile.user.hasOwnProperty('user') &&
                  profile.user.user.is_phone_verified ? Images.verifiedPhone : Images.unverifiedPhone}
                alt='komuto'
              />
              <p>
                { profile.user.hasOwnProperty('user') && profile.user.user.is_phone_verified ? 'Nomor Handphone Anda telah terverifikasi' : 'Nomor Handphone Anda belum terverifikasi'}
              </p>
              <p className='no-hp-verify'>
                {profile.user.hasOwnProperty('user') ? profile.user.user.phone_number : ''}
              </p>
            </div>
            <div className='columns is-mobile'>
              <div className='column'>
                { profile.user.hasOwnProperty('user') && !profile.user.user.is_phone_verified &&
                  <button
                    className={`button is-primary is-large is-fullwidth ${submitting && 'is-loading'}`}
                    onClick={(e) => this.sendOTPPhone(e)}>
                    Verifikasi Sekarang
                  </button>
                }
                <Link href='/change-no-handphone'>
                  <a className='btn-action'>Ubah Nomor Handphone</a>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    verifyPhone: state.verifyPhone,
    profile: state.profile,
    statusOTPPhone: state.sendOTPPhone
  }
}

const mapDispatchToProps = dispatch => ({
  getProfile: () => dispatch(actionTypes.getProfile()),
  sendOTPToPhone: () => dispatch(actionTypes.sendOTPPhone())
})

export default connect(mapStateToProps, mapDispatchToProps)(NomorHandphone)
