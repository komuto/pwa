// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import Link from 'next/link'
import * as EmailValidator from 'email-validator'
import NProgress from 'nprogress'
import Router from 'next/router'
import localForage from 'localforage'
// components
import { LoginFacebook } from '../Components/Facebook'
import { Input } from '../Components/Input'
import { ButtonFullWidth } from '../Components/Button'
import { HrText } from '../Components/Hr'
import TermConditions from '../Components/TermConditions'
import Notification from '../Components/Notification'
// validations
import * as constraints from '../Validations/Auth'
// actions
import * as loginAction from '../actions/user'

const LOGIN_SOCIAL = 'LOGIN_SOCIAL'
const LOGIN_FORM = 'LOGIN_FORM'

class SignIn extends Component {
  constructor (props) {
    super(props)
    this.state = {
      input: {
        email: {
          type: 'email',
          placeholder: 'Email',
          name: 'email',
          value: '',
          classInfo: '',
          textHelp: ''
        },
        password: {
          type: 'password',
          placeholder: 'Password',
          name: 'password',
          value: '',
          classInfo: '',
          textHelp: ''
        }
      },
      notification: {
        status: false,
        message: 'Error, default message.'
      }
    }
    this.dipatchType = null
    this.onChange = this.onChange.bind(this)
  }

  validation (name, value) {
    const { email, password } = constraints.loginConstraints
    const { danger, success } = constraints.classInfo
    let { input } = this.state
    let status = false
    switch (name) {
      case input.email.name:
        input.email.value = value
        if (value === '') {
          input.email.classInfo = danger
          input.email.textHelp = email.alert.empty
          status = false
        } else {
          if (EmailValidator.validate(value)) {
            input.email.classInfo = success
            input.email.textHelp = ''
            status = true
          } else {
            input.email.classInfo = danger
            input.email.textHelp = email.alert.valid
            status = false
          }
        }
        break
      case input.password.name:
        input.password.value = value
        if (value === '') {
          input.password.classInfo = danger
          input.password.textHelp = password.alert.empty
          status = false
        } else {
          input.password.classInfo = success
          input.password.textHelp = ''
          status = true
        }
        break
      default:
        break
    }
    this.setState({ input })
    return status
  }

  onChange (event) {
    const { name, value } = event.target
    this.validation(name, value)
  }

  responseFacebook (response) {
    if (response) {
      NProgress.start()
      this.dipatchType = LOGIN_SOCIAL
      this.props.dispatch(loginAction.loginSocial({
        provider_name: 'Facebook',
        provider_uid: response.userID,
        access_token: response.accessToken
      }))
    }
  }

  handleSignInClick () {
    let { email, password } = this.state.input
    if (this.validation(email.name, email.value) && this.validation(password.name, password.value)) {
      NProgress.start()
      this.dipatchType = LOGIN_FORM
      this.props.dispatch(loginAction.login({
        email: email.value,
        password: password.value
      }))
    }
  }

  componentWillReceiveProps (nextProps) {
    const { user, social } = nextProps
    const { notification } = this.state
    const data = (this.dipatchType === LOGIN_SOCIAL) ? social : user

    if (!data.isLoading) {
      if (data.isFound) {
        localForage.setItem('sessionLogin', data)
        Router.push('/profile')
        notification.status = false
      }

      if (data.isError) {
        notification.status = true
        notification.message = data.message
      } else if (!data.isFound) {
        notification.status = true
        notification.message = 'Data tidak ditemukan'
      }

      NProgress.done()
      this.setState({ notification })
    }
  }

  render () {
    const { input, notification } = this.state
    return (
      <section className='content'>
        <div className='container is-fluid'>
          <Notification
            type='is-warning'
            isShow={notification.status}
            activeClose
            onClose={() => this.setState({notification: {status: false, message: ''}})}
            message={notification.message} />
          <form action='#' className='form'>
            <Input
              type={input.email.type}
              placeholder={input.email.placeholder}
              name={input.email.name}
              classInfo={input.email.classInfo}
              value={input.email.value}
              onChange={this.onChange}
              hasIconsRight
              textHelp={input.email.textHelp} />
            <Input
              type={input.password.type}
              placeholder={input.password.placeholder}
              name={input.password.name}
              classInfo={input.password.classInfo}
              value={input.password.value}
              onChange={this.onChange}
              hasIconsRight
              textHelp={input.password.textHelp} />
            <TermConditions />
            <ButtonFullWidth
              text='Login'
              onClick={() => this.handleSignInClick()} />
            <div className='has-text-centered'>
              <Link href='/password-reset'><a>Lupa Password</a></Link>
            </div>
            <HrText text='atau' />
            <LoginFacebook
              responseFacebook={(response) => this.responseFacebook(response)} />
          </form>
        </div>
      </section>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    social: state.social
  }
}

export default connect(mapStateToProps)(SignIn)
