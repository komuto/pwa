// @flow
import React, { Component } from 'react'
import * as EmailValidator from 'email-validator'
// components
import { Navigation } from '../Components/Navigation'
import { Input } from '../Components/Input'
import { ButtonFullWidth } from '../Components/Button'
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
    const name = event.target.name
    const targetValue = event.target.value
    let { input } = this.state
    switch (name) {
      case input.email.name:
        input.email.value = targetValue
        if (EmailValidator.validate(targetValue)) {
          input.email.classInfo = 'is-success'
          input.email.textHelp = 'Format email sudah benar'
        } else if (targetValue === '') {
          input.email.classInfo = ''
          input.email.textHelp = ''
        } else {
          input.email.classInfo = 'is-danger'
          input.email.textHelp = 'Format email salah'
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
