// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as EmailValidator from 'email-validator'
import NProgress from 'nprogress'
import Router from 'next/router'
// components
import { Input } from '../../Components/Input'
import { ButtonFullWidth } from '../../Components/Button'
import Notification from '../../Components/Notification'
// validations
import * as constraints from '../../Validations/Auth'
// actions
import * as loginAction from '../../actions/user'

class PasswordReset extends Component {
  constructor (props) {
    super(props)

    this.defaultInput = {
      isError: false,
      value: '',
      classInfo: '',
      textHelp: '',
      onChange: (e) => this.onChange(e.target)
    }

    this.state = {
      input: {
        email: {
          type: 'email',
          placeholder: 'Email',
          name: 'email',
          ...this.defaultInput
        }
      },
      notification: props.notification
    }
    this.submitting = {
      forgetPassword: false
    }
  }

  validateEmail ({ value }) {
    const { loginConstraints, classInfo } = constraints
    const { alert } = loginConstraints.email
    let { input } = this.state
    /** reset input */
    input.email = {
      ...input.email,
      ...this.defaultInput,
      value
    }
    /** validate input */
    let isEmty = value === ''
    let isValid = !EmailValidator.validate(value)
    let isError = isEmty || isValid

    if (isError) {
      input.email = {
        ...input.email,
        classInfo: classInfo.danger,
        textHelp: isEmty ? alert.empty : alert.valid
      }
    }

    this.setState({ input })
    return isError
  }

  onChange ({ name, value }) {
    let { input } = this.state
    input[name].value = value
    this.setState({ input })
  }

  handleResetPasswordClick () {
    let { email } = this.state.input
    /** validate email */
    if (this.validateEmail({...email})) {
      return
    }
    /** request reset password  */
    NProgress.start()
    this.submitting = { ...this.submitting, forgetPassword: true }
    this.props.setForgetPassword({ email: email.value })
  }

  componentWillReceiveProps (nextProps) {
    const { forgetPassword } = nextProps
    const { isFetching, isFound, isError, notifError } = this.props

    if (!isFetching(forgetPassword) && this.submitting.forgetPassword) {
      NProgress.done()
      this.submitting = { ...this.submitting, forgetPassword: false }
      if (isError(forgetPassword)) {
        this.setState({ notification: notifError(forgetPassword.message) })
      }
      if (isFound(forgetPassword)) {
        const { email } = this.state.input
        Router.push(
          `/password?type=reset&status=verification&email=${email.value}`,
          `/password/reset/verification/${email.value}`
        )
      }
    }
  }

  render () {
    const { input, notification } = this.state
    return (
      <section className='content'>
        <div className='container is-fluid'>
          <div className='desc has-text-centered'>
            <p>Silahkan menuliskan alamat email yang Anda gunakan untuk mendaftar di Komuto</p>
          </div>
          <Notification
            type={notification.type}
            isShow={notification.status}
            activeClose
            onClose={() => this.setState({notification: false})}
            message={notification.message} />
          <form action='#' className='form'>
            <Input
              {...input.email}
              hasIconsRight />
            <ButtonFullWidth
              isLoading={this.submitting.forgetPassword}
              text='Reset Password'
              onClick={() => this.handleResetPasswordClick()} />
          </form>
        </div>
      </section>
    )
  }
}

const mapStateToProps = (state) => ({
  forgetPassword: state.forgetPassword
})

const mapDispatchToProps = (dispatch) => ({
  setForgetPassword: (params) => dispatch(loginAction.forgetPassword(params))
})

export default connect(mapStateToProps, mapDispatchToProps)(PasswordReset)
