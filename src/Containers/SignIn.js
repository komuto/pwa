// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import Link from 'next/link'
import * as EmailValidator from 'email-validator'
import NProgress from 'nprogress'
import Router from 'next/router'
// components
import { LoginFacebook } from '../Components/Facebook'
import { Navigation, Hero } from '../Components/Navigation'
import { Input } from '../Components/Input'
import { ButtonFullWidth } from '../Components/Button'
import { HrText } from '../Components/Hr'
import TermConditions from '../Components/TermConditions'
import Notification from '../Components/Notification'
// validations
import * as constraints from '../Validations/Auth'
// actions
import * as loginAction from '../actions/user'

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
      notification: false
    }
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
      this.props.dispatch(loginAction.login({
        email: email.value,
        password: password.value
      }))
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.datalogin.status === 200) {
      Router.push('/signup-success')
      NProgress.done()
    } else if (nextProps.datalogin.status > 200) {
      this.setState({notification: true})
    }
  }

  render () {
    const { input, notification } = this.state
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
            <Notification
              type='is-warning'
              isShow={notification}
              activeClose
              onClose={() => this.setState({notification: false})}
              message='Cek email dan password anda!' />
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
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    datalogin: state.user
  }
}

export default connect(mapStateToProps)(SignIn)
