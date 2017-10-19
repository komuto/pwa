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
    this.state = {
      input: {
        email: {
          type: 'email',
          placeholder: 'Email',
          name: 'email',
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
    this.onChange = this.onChange.bind(this)
  }

  validation (name, value) {
    const { email } = constraints.loginConstraints
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

  handleResetPasswordClick () {
    let { email } = this.state.input
    if (this.validation(email.name, email.value)) {
      NProgress.start()
      this.props.dispatch(loginAction.forgetPassword({
        email: email.value
      }))
    }
  }

  componentWillReceiveProps (nextProps) {
    const { forgetPassword } = nextProps
    const { notification } = this.state
    const { email } = this.state.input

    if (!forgetPassword.isLoading) {
      if (forgetPassword.isFound) {
        Router.push({
          pathname: '/password-reset-verification',
          query: { email: email.value }
        })
      }

      if (forgetPassword.isError) {
        notification.status = true
        notification.message = forgetPassword.message
      } else if (!forgetPassword.isFound) {
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
          <div className='desc has-text-centered'>
            <p>Silahkan menuliskan alamat email yang Anda gunakan untuk mendaftar di Komuto</p>
          </div>
          <Notification
            type='is-warning'
            isShow={notification.status}
            activeClose
            onClose={() => this.setState({notification: false})}
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
            <ButtonFullWidth
              text='Reset Password'
              onClick={() => this.handleResetPasswordClick()} />
          </form>
        </div>
      </section>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    forgetPassword: state.forgetPassword
  }
}

export default connect(mapStateToProps)(PasswordReset)
