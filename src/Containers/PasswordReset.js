// @flow
import React, { Component } from 'react'
import * as EmailValidator from 'email-validator'
// components
import { Navigation } from '../Components/Navigation'
import { Input } from '../Components/Input'
import { ButtonFullWidth } from '../Components/Button'
// validations
import * as constraints from '../Validations/Auth'
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
      }
    }
    this.onChange = this.onChange.bind(this)
  }

  handleResetPasswordClick () {
  }

  onChange (event) {
    const { email } = constraints.loginConstraints
    const { danger, success } = constraints.classInfo
    const { name, value } = event.target
    let { input } = this.state
    switch (name) {
      case input.email.name:
        input.email.value = value
        if (value === '') {
          input.email.classInfo = danger
          input.email.textHelp = email.alert.empty
        } else {
          if (EmailValidator.validate(value)) {
            input.email.classInfo = success
            input.email.textHelp = ''
          } else {
            input.email.classInfo = danger
            input.email.textHelp = email.alert.valid
          }
        }
        break
      default:
        break
    }
    this.setState({ input })
  }

  render () {
    const { input } = this.state
    return (
      <div className='main user'>
        <Navigation
          path='/signin'
          icon={<span className='icon-arrow-left' />}
          textPath='Lupa Password' />
        <section className='content'>
          <div className='container is-fluid'>
            <div className='desc has-text-centered'>
              <p>Silahkan menuliskan alamat email yang Anda gunakan untuk mendaftar di Komuto</p>
            </div>
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
                onClick={this.handleResetPasswordClick} />\
            </form>
          </div>
        </section>
      </div>
    )
  }
}

export default PasswordReset
