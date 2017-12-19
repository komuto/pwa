// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import Router from 'next/router'
import NProgress from 'nprogress'
// components
import Content from '../../Components/Content'
import { Input } from '../../Components/Input'
import { ButtonFullSubmit } from '../../Components/Button'
import Containers from '../../Components/Containers'
import Notification from '../../Components/Notification'
// validations
import * as constraints from '../../Validations/Auth'
// actions
import * as loginActions from '../../actions/user'

class PasswordNew extends Component {
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
        password: {
          type: 'password',
          placeholder: 'Password',
          name: 'password',
          ...this.defaultInput
        },
        passwordRetype: {
          type: 'password',
          placeholder: 'Konfirmasi Password',
          name: 'passwordRetype',
          ...this.defaultInput
        }
      },
      token: props.query.token || null,
      validToken: props.validToken || null,
      notification: props.notification
    }
  }

  onChange ({ name, value }) {
    let { input } = this.state
    input[name].value = value
    this.setState({ input })
  }

  validatePassword ({ value }) {
    const { loginConstraints, classInfo } = constraints
    const { length, alert } = loginConstraints.password
    let { input } = this.state
    /** reset input */
    input.password = {
      ...input.password,
      ...this.defaultInput,
      value
    }
    /** validate input */
    let isEmty = value === ''
    let isToShort = [...value].length < length.minimum
    let isError = isEmty || isToShort

    if (isError) {
      input.password = {
        ...input.password,
        classInfo: classInfo.danger,
        textHelp: isEmty ? alert.empty : alert.valid
      }
    }

    this.setState({ input })
    return isError
  }

  validatePasswordRetype ({ value }) {
    const { loginConstraints, classInfo } = constraints
    const { alert } = loginConstraints.retypePassword
    let { input } = this.state
    /** reset input */
    input.passwordRetype = {
      ...input.passwordRetype,
      ...this.defaultInput,
      value
    }
    /** validate input */
    let isEmty = value === ''
    let isNotSamePassword = value !== input.password.value
    let isError = isEmty || isNotSamePassword

    if (isError) {
      input.passwordRetype = {
        ...input.passwordRetype,
        classInfo: classInfo.danger,
        textHelp: isEmty ? alert.empty : alert.valid
      }
    }

    this.setState({ input })
    return isError
  }

  componentDidMount () {
    let { token } = this.state
    NProgress.start()
    this.submitting = { ...this.submitting, validateToken: true }
    this.props.validateToken({ token })
  }

  handleNewPasswordClick (e) {
    e.preventDefault()
    const { token, input } = this.state
    const { password, passwordRetype } = input
    /** validate password */
    if (!this.validatePassword({...password}) && !this.validatePasswordRetype({...passwordRetype})) {
      /** update new password */
      NProgress.start()
      this.submitting = { ...this.submitting, newPassword: true }
      this.props.setNewPassword({
        password: password.value,
        token
      })
    }
  }

  componentWillReceiveProps (nextProps) {
    const { validToken, newPassword } = nextProps
    const { isFetching, isFound, isError, notifError } = this.props

    if (!isFetching(validToken) && this.submitting.validateToken) {
      NProgress.done()
      this.submitting = { ...this.submitting, validateToken: false }
      if (isError(validToken)) {
        this.setState({ notification: notifError(validToken.message) })
      }
      if (isFound(validToken)) {
        this.setState({ validToken })
      }
    }

    if (!isFetching(newPassword) && this.submitting.newPassword) {
      NProgress.done()
      this.submitting = { ...this.submitting, newPassword: false }
      if (isError(newPassword)) {
        this.setState({ notification: notifError(newPassword.message) })
      }
      if (isFound(newPassword)) {
        Router.push(
          '/password?type=new&status=success',
          '/password/new/success'
        )
      }
    }
  }

  render () {
    const { input, validToken, notification } = this.state
    const { isFound } = this.props
    return (
      <Content>
        <Notification
          type={notification.type}
          isShow={notification.status}
          activeClose
          onClose={() => this.setState({notification: {status: false, message: ''}})}
          message={notification.message} />
        <section className='content'>
          <Containers>
            <form onSubmit={(e) => this.handleNewPasswordClick(e)} className='form'>
              {
                (isFound(validToken)) &&
                <Content>
                  <Input
                    {...input.password}
                    hasIconsRight />
                  <Input
                    {...input.passwordRetype}
                    hasIconsRight />
                  <ButtonFullSubmit
                    isLoading={this.submitting.newPassword}
                    text='Buat Password Baru' />
                </Content>
              }
            </form>
          </Containers>
        </section>
      </Content>
    )
  }
}

const mapStateToProps = (state) => ({
  validToken: state.validation,
  newPassword: state.newPassword
})

const mapDispatchToProps = (dispatch) => ({
  validateToken: (params) => dispatch(loginActions.validateToken(params)),
  setNewPassword: (params) => dispatch(loginActions.newPassword(params))
})

export default connect(mapStateToProps, mapDispatchToProps)(PasswordNew)
