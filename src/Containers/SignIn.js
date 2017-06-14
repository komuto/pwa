// @flow
import React, { Component } from 'react'
import Link from 'next/link'
import * as EmailValidator from 'email-validator'
// components
import { LoginFacebook } from '../Components/Facebook'
import { Navigation, Hero } from '../Components/Navigation'
import { Input } from '../Components/Input'
import { ButtonFullWidth } from '../Components/Button'
import { HrText } from '../Components/Hr'
import TermConditions from '../Components/TermConditions'
// validations
import * as constraints from '../Validations/Auth'

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
      }
    }
    this.onChange = this.onChange.bind(this)
  }

  responseFacebook (response) {
    console.log(response)
  }

  handleSignInClick () {
    console.log('handleSignInClick ()')
  }

  onChange (event) {
    const { email, password } = constraints.loginConstraints
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
      case input.password.name:
        input.password.value = value
        if (value === '') {
          input.password.classInfo = danger
          input.password.textHelp = password.alert.empty
        } else {
          input.password.classInfo = success
          input.password.textHelp = ''
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
      <div className='main user login'>
        <Navigation
          path='/profile'
          icon={<span className='icon-arrow-left' />}
          textPath='Login' />
        <Hero
          path='/signup'
          textPath='Daftar Disini'
          textInfo='Belum punya akun?' />

        <section className='content'>
          <div className='container is-fluid'>
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
                onClick={this.handleSignInClick} />
              <div className='has-text-centered'>
                <Link href='/password-reset'><a>Lupa Password</a></Link>
              </div>
              <HrText text='atau' />
              <LoginFacebook
                responseFacebook={this.responseFacebook} />
            </form>
          </div>
        </section>
      </div>
    )
  }
}

export default SignIn
