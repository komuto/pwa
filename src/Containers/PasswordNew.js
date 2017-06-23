// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import Router from 'next/router'
import NProgress from 'nprogress'
// components
import Content from '../Components/Content'
import Section from '../Components/Section'
import { Input } from '../Components/Input'
import { ButtonFullWidth } from '../Components/Button'
import Containers from '../Components/Containers'
import Notification from '../Components/Notification'
// validations
import * as constraints from '../Validations/Auth'
// actions
import * as loginAction from '../actions/user'

const VALIDATE_TOKEN = 'VALIDATE_TOKEN'
const SUBMIT = 'SUBMIT'

class PasswordNew extends Component {
  constructor (props) {
    super(props)
    this.state = {
      input: {
        password: {
          type: 'password',
          placeholder: 'Password',
          name: 'password',
          value: '',
          classInfo: '',
          textHelp: ''
        },
        passwordRetype: {
          type: 'password',
          placeholder: 'Konfirmasi Password',
          name: 'passwordRetype',
          value: '',
          classInfo: '',
          textHelp: ''
        }
      },
      notification: {
        status: false,
        message: 'Error, default message.'
      },
      tokenError: true
    }
    this.dipatchType = null
    this.token = null
    this.onChange = this.onChange.bind(this)
  }

  validation (name, value) {
    const { password, retypePassword } = constraints.loginConstraints
    const { danger, success } = constraints.classInfo
    let { input } = this.state
    let status = false

    switch (name) {
      case input.password.name:
        input.password.value = value
        if (value === '') {
          input.password.classInfo = danger
          input.password.textHelp = password.alert.empty
          status = false
        } else {
          if ([...value].length < password.length.minimum) {
            input.password.classInfo = danger
            input.password.textHelp = password.alert.valid
            status = false
          } else {
            input.password.classInfo = success
            input.password.textHelp = ''
            status = true
          }
        }
        break
      case input.passwordRetype.name:
        input.passwordRetype.value = value
        if (value === '') {
          input.passwordRetype.classInfo = danger
          input.passwordRetype.textHelp = password.alert.empty
          status = false
        } else {
          if (input.password.value !== value) {
            input.passwordRetype.classInfo = danger
            input.passwordRetype.textHelp = retypePassword.alert.valid
            status = false
          } else {
            input.passwordRetype.classInfo = success
            input.passwordRetype.textHelp = ''
            status = true
          }
        }
        break
      default:
        break
    }
    this.setState({input})
    return status
  }

  onChange (event) {
    const { name, value } = event.target
    this.validation(name, value)
  }

  async componentDidMount () {
    const token = await Router.query.token
    this.token = token
    this.dipatchType = VALIDATE_TOKEN
    NProgress.start()
    this.props.dispatch(loginAction.validateToken({token: token}))
  }

  handleNewPasswordClick () {
    let { password, passwordRetype } = this.state.input
    if (this.validation(passwordRetype.name, passwordRetype.value) &&
        this.validation(password.name, password.value)) {
      NProgress.start()
      this.dipatchType = SUBMIT
      this.props.dispatch(loginAction.newPassword({
        password: password.value,
        token: this.token
      }))
    }
  }

  componentWillReceiveProps (nextProps) {
    const { validToken, newPassword } = nextProps
    let { notification, tokenError } = this.state

    if (this.dipatchType === VALIDATE_TOKEN && !validToken.isLoading) {
      const data = validToken
      if (data.status === 400) {
        notification.status = true
        notification.message = data.message
        tokenError = true
      } else if (data.status === 200) {
        tokenError = false
      }
      NProgress.done()
      this.setState({ notification, tokenError })
    }

    if (this.dipatchType === SUBMIT && !newPassword.isLoading) {
      const data = newPassword
      if (data.status === 400) {
        notification.status = true
        notification.message = data.message
      } else if (data.status === 200) {
        Router.push('/password-new-success')
      }
      NProgress.done()
      this.setState({ notification })
    }
  }

  render () {
    const { input, notification, tokenError } = this.state
    return (
      <Content>
        <Notification
          type='is-warning'
          isShow={notification.status}
          activeClose
          onClose={() => this.setState({notification: {status: false, message: ''}})}
          message={notification.message} />
        <Section className='content'>
          <Containers>
            {
              !tokenError
              ? <form action='#' className='form'>
                <Input
                  type={input.password.type}
                  placeholder={input.password.placeholder}
                  name={input.password.name}
                  classInfo={input.password.classInfo}
                  value={input.password.value}
                  onChange={this.onChange}
                  hasIconsRight
                  textHelp={input.password.textHelp} />
                <Input
                  type={input.passwordRetype.type}
                  placeholder={input.passwordRetype.placeholder}
                  name={input.passwordRetype.name}
                  classInfo={input.passwordRetype.classInfo}
                  value={input.passwordRetype.value}
                  onChange={this.onChange}
                  hasIconsRight
                  textHelp={input.passwordRetype.textHelp} />
                <ButtonFullWidth
                  text='Buat Password Baru'
                  onClick={() => this.handleNewPasswordClick()} />
              </form>
              : null
            }

          </Containers>
        </Section>
      </Content>
    )
  }
}

const mapStateToProps = (state) => {
  console.log(state.validation)
  return {
    validToken: state.validation,
    newPassword: state.newPassword
  }
}

export default connect(mapStateToProps)(PasswordNew)
