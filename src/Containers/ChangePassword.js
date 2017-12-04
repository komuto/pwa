// @flow
import React from 'react'
import { connect } from 'react-redux'
import Router from 'next/router'
// components
import Notification from '../Components/Notification'
// actions
import * as actionTypes from '../actions/user'

class ChangePassword extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      formPassword: {
        email: '',
        old_password: '',
        password: '',
        password2: ''
      },
      notification: {
        type: 'is-success',
        status: false,
        message: 'Error, default message.'
      },
      submitting: false,
      validation: false
    }
  }

  handleInput (e) {
    const { name, value } = e.target
    let { formPassword } = this.state
    const newState = { formPassword }
    newState.formPassword[name] = value
    this.setState(newState)
  }

  renderValidation (type, textFailed) {
    const { formPassword, validation } = this.state
    let email = formPassword.email
    let isEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    let oldPwd = formPassword.old_password
    let pwd = formPassword.password
    let pwd2 = formPassword.password2
    let emailValid = type === 'email' && email.length > 0
    let isEmailValid = type === 'isEmail' && isEmail.test(email)
    let oldPwdValid = type === 'old_password' && oldPwd.length > 0
    let pwdValid = type === 'password' && pwd.length > 0
    let pwdConfirmValid = type === 'passwordConfirm' && pwd2.length > 0
    let pwdStrgValid = type === 'passwordStrength' && pwd.length >= 5
    let pwdStrgCnfrmValid = type === 'passwordConfirmStrength' && pwd2.length >= 5
    let passwordConfirmCheckingValid = type === 'passwordConfirmChecking' && pwd === pwd2
    let result = emailValid || isEmailValid || oldPwdValid || pwdValid || pwdConfirmValid || pwdStrgCnfrmValid || pwdStrgValid || passwordConfirmCheckingValid
    return (
      <span className='error-msg' style={{display: validation ? 'block' : 'none'}}>
        {result ? '' : textFailed}
      </span>
    )
  }

  postChangePassword (e) {
    e.preventDefault()
    const { formPassword } = this.state
    let email = formPassword.email
    let isEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    let oldPwd = formPassword.old_password
    let pwd = formPassword.password
    let pwd2 = formPassword.password2
    let emailValid = email.length > 0
    let isEmailValid = isEmail.test(email)
    let oldPwdValid = oldPwd.length > 0
    let pwdValid = pwd.length > 0
    let pwdConfirmValid = pwd2.length > 0
    let pwdStrgValid = pwd.length >= 5
    let pwdStrgCnfrmValid = pwd2.length >= 5
    let passwordConfirmCheckingValid = pwd === pwd2
    let isValid = emailValid && isEmailValid && oldPwdValid && pwdValid && pwdConfirmValid && pwdStrgCnfrmValid && pwdStrgValid && passwordConfirmCheckingValid
    if (isValid) {
      this.setState({ submitting: true })
      this.processUpdatePassword()
      this.setState({ validation: false })
    } else {
      this.setState({ validation: true })
    }
  }

  processUpdatePassword () {
    const { formPassword } = this.state
    const newData = {
      email: formPassword.email,
      password: formPassword.password,
      old_password: formPassword.old_password
    }
    this.props.changePassword(newData)
  }

  componentWillReceiveProps (nextProps) {
    const { submitting, notification } = this.state
    const { statusChangePassword } = nextProps
    const { isFetching, isFound, isError, notifError } = this.props
    if (!isFetching(statusChangePassword) && submitting) {
      this.setState({ submitting: false })
      if (isFound(statusChangePassword)) {
        const href = `/manage-account?isSuccess`
        const as = '/manage/account'
        Router.push(href, as)
      }
      if (isError(statusChangePassword)) {
        this.setState({ notification: notifError(statusChangePassword.message) })
        if (this.timeout) clearTimeout(this.timeout)
        this.timeout = setTimeout(() => {
          this.setState({ notification: { ...notification, status: false } })
        }, 3000)
      }
    }
  }

  render () {
    const { formPassword, submitting, notification } = this.state
    return (
      <section className='section is-paddingless'>
        <Notification
          type={notification.type}
          isShow={notification.status}
          activeClose
          onClose={() => this.setState({notification: {status: false, message: ''}})}
          message={notification.message} />
        <div className='edit-data-delivery bg-white'>
          <form action='#' className='form edit'>
            <div className='field '>
              <p className='control'>
                <input
                  className='input'
                  type='text'
                  placeholder='Alamat Email'
                  name='email'
                  value={formPassword.email}
                  onChange={(e) => this.handleInput(e)} />
              </p>
              {this.renderValidation('email', 'Mohon isi alamat email anda')}
              {this.renderValidation('isEmail', 'Alamat email tidak valid')}
            </div>
            <div className='field '>
              <p className='control'>
                <input
                  className='input'
                  type='password'
                  placeholder='Password Lama'
                  name='old_password'
                  value={formPassword.old_password}
                  onChange={(e) => this.handleInput(e)} />
              </p>
              {this.renderValidation('old_password', 'Mohon isi password lama')}
            </div>
            <div className='field '>
              <p className='control'>
                <input
                  className='input'
                  type='password'
                  placeholder='Password Baru'
                  name='password'
                  value={formPassword.password}
                  onChange={(e) => this.handleInput(e)} />
              </p>
              {this.renderValidation('password', 'Mohon isi passsword baru')}
              {this.renderValidation('passwordStrength', 'Password tidak kuat')}
            </div>
            <div className='field '>
              <p className='control'>
                <input
                  className='input'
                  type='password'
                  placeholder='Ketik Ulang Password Baru'
                  name='password2'
                  value={formPassword.password2}
                  onChange={(e) => this.handleInput(e)} />
              </p>
              {this.renderValidation('passwordConfirm', 'Mohon ketik ulang password baru')}
              {this.renderValidation('passwordConfirmStrength', 'Password tidak kuat')}
              {this.renderValidation('passwordConfirmChecking', 'Ketik ulang password baru harus sama')}
            </div>
            <div className='field'>
              <a
                className={`button is-primary is-large is-fullwidth ${submitting && 'is-loading'}`}
                onClick={(e) => this.postChangePassword(e)}>Ganti Password
              </a>
            </div>
          </form>
        </div>
      </section>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    statusChangePassword: state.changePassword
  }
}

const mapDispatchToProps = dispatch => ({
  changePassword: (params) => dispatch(actionTypes.changePassword(params))
})

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword)
