// @flow
import React from 'react'
import { connect } from 'react-redux'
import NProgress from 'nprogress'
// components
import Link from 'next/link'
import Notification from '../Components/Notification'
import Router from 'next/router'
import {Images} from '../Themes'
// actions
import * as actionTypes from '../actions/user'

class NomorHandphone extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      profile: props.profile,
      submiting: false,
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

  sendOTPPhone (e) {
    e.preventDefault()
    this.setState({ submiting: true })
    this.props.sendOTPToPhone()
  }

  componentDidMount () {
    const { verifyPhone, query, isFetching, isFound, isError, notifError, notifSuccess } = this.props
    this.props.getProfile()
    NProgress.start()
    if (query.hasOwnProperty('isSuccess')) {
      if (!isFetching(verifyPhone)) {
        if (isFound(verifyPhone)) {
          this.setState({ notification: notifSuccess(verifyPhone.message) })
        }
        if (isError(verifyPhone)) {
          this.setState({ notification: notifError(verifyPhone.message) })
        }
      }
    }
  }

  componentWillReceiveProps (nextProps) {
    let { submiting } = this.state
    const { statusOTPPhone, profile } = nextProps
    const { isFetching, isFound, isError, notifError } = this.props
    if (!isFetching(profile)) {
      if (isFound(profile)) {
        this.setState({ profile })
        NProgress.done()
      }
      if (isError(profile)) {
        this.setState({ notification: notifError(profile.message) })
      }
    }
    if (!isFetching(statusOTPPhone) && submiting) {
      this.setState({ submiting: false })
      if (isFound(statusOTPPhone)) {
        Router.push('/verify-no-hp')
      }
      if (isError(profile)) {
        this.setState({ notification: notifError(statusOTPPhone.message) })
      }
    }
  }

  render () {
    const { profile, submiting, notification } = this.state
    return (
      <div>
        <Notification
          type={notification.type}
          isShow={notification.status}
          activeClose
          onClose={() => this.setState({notification: {status: false, message: ''}})}
          message={notification.message} />
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
                    className={`button is-primary is-large is-fullwidth ${submiting && 'is-loading'}`}
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
