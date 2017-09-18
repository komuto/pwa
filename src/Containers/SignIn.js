// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import Link from 'next/link'
import * as EmailValidator from 'email-validator'
import NProgress from 'nprogress'
import Router from 'next/router'
// components
import Content from '../Components/Content'
import Section from '../Components/Section'
import Containers from '../Components/Containers'
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
// utils
import { Status } from '../Services/Status'

const LOGIN_SOCIAL = 'LOGIN_SOCIAL'
const LOGIN_FORM = 'LOGIN_FORM'

class SignIn extends Component {
  constructor (props) {
    super(props)
    this.state = {
      localize: props.localize,
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
      this.props.loginSocial({
        provider_name: 'Facebook',
        provider_uid: response.userID,
        access_token: response.accessToken
      })
    }
  }

  handleSignInClick () {
    let { email, password } = this.state.input
    if (this.validation(email.name, email.value) && this.validation(password.name, password.value)) {
      NProgress.start()
      this.dipatchType = LOGIN_FORM
      this.props.login({
        email: email.value,
        password: password.value
      })
    }
  }

  async componentWillReceiveProps (nextProps) {
    const { user } = nextProps

    if (!user.isLoading) {
      NProgress.done()
      switch (user.status) {
        case Status.SUCCESS :
          if (user.isFound) {
            await this.props.getProfile()
            Router.push('/profile')
          } else {
            this.setState({ notification: {status: true, message: 'Data tidak ditemukan'} })
          }
          break
        case Status.OFFLINE :
        case Status.FAILED :
          this.setState({ notification: {status: true, message: user.message} })
          break
        default:
          break
      }
    }
  }

  render () {
    const { localize, input, notification } = this.state
    return (
      <Content>
        <Notification
          type='is-danger'
          isShow={notification.status}
          activeClose
          onClose={() => this.setState({notification: {status: false, message: ''}})}
          message={notification.message} />
        <Section className='content'>
          <Containers>
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
                text={localize.signin}
                onClick={() => this.handleSignInClick()} />
              <div className='has-text-centered'>
                <Link href='/password-reset'><a>{localize.lost_password}</a></Link>
              </div>
              <HrText text={localize.or} />
              <LoginFacebook
                text={localize.login_facebook}
                responseFacebook={(response) => this.responseFacebook(response)} />
            </form>
          </Containers>
        </Section>
      </Content>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.user
})

const mapDispatchToProps = (dispatch) => ({
  getProfile: () => dispatch(loginAction.getProfile()),
  login: (params) => dispatch(loginAction.login(params)),
  loginSocial: (params) => dispatch(loginAction.loginSocial(params))
})

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)
