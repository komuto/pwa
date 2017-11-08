/**
 * Safei Muslim
 * Yogyakarta , revamp: 16 Oktober 2017
 * PT Skyshi Digital Indonesa
 */

 /** including dependencies */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as EmailValidator from 'email-validator'
import NProgress from 'nprogress'
import Router from 'next/router'
/** including components */
import Content from '../../Components/Content'
import Section from '../../Components/Section'
import Containers from '../../Components/Containers'
import { LoginFacebook } from '../../Components/Facebook'
import { Input } from '../../Components/Input'
import { ButtonFullWidth } from '../../Components/Button'
import { HrText } from '../../Components/Hr'
import TermConditions from '../../Components/TermConditions'
import Notification from '../../Components/Notification'
import localforage from 'localforage'
/** including components */
import * as constraints from '../../Validations/Auth'
/** including actions */
import * as loginAction from '../../actions/user'

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
      },
      fcmToken: null
    }
    this.submitting = {
      user: false,
      profile: false
    }
    this.onChange = this.onChange.bind(this)
  }

  onChange (event) {
    let { name, value } = event.target
    let { input } = this.state
    input[name].value = value
    this.setState({ input })
  }

  async responseFacebook (response) {
    if (response) {
      let { fcmToken } = this.state
      NProgress.start()
      this.submitting = { ...this.submitting, user: true }
      await this.props.loginSocial({
        provider_name: 'facebook',
        provider_uid: response.userID,
        access_token: response.accessToken,
        reg_token: fcmToken
      })
    }
  }

  /** submit login */
  submit () {
    let { loginConstraints } = constraints
    let { danger, success } = constraints.classInfo
    let { input, fcmToken } = this.state
    let { email, password } = input
    let isError = false

    email.classInfo = success
    email.textHelp = ''

    password.classInfo = success
    password.textHelp = ''

    /** validate email format */
    if (!EmailValidator.validate(email.value)) {
      email.classInfo = danger
      email.textHelp = loginConstraints.email.alert.valid
      isError = true
    }

    /** validate email empty */
    if (email.value === '') {
      email.classInfo = danger
      email.textHelp = loginConstraints.email.alert.empty
      isError = true
    }

    /** validate password empty */
    if (password.value === '') {
      password.classInfo = danger
      password.textHelp = loginConstraints.password.alert.empty
      isError = true
    }

    if (isError) {
      this.setState({ input })
      return
    }

    /** process */
    NProgress.start()
    this.submitting = { ...this.submitting, user: true }
    this.props.login({
      email: email.value,
      password: password.value,
      reg_token: fcmToken
    })
  }

  async componentDidMount () {
    let { fcmToken } = this.state
    fcmToken = await localforage.getItem('FCM_TOKEN')
    this.setState({ fcmToken })
  }

  async componentWillReceiveProps (nextProps) {
    const { user, profile } = nextProps
    const { isFetching, isError, isFound, notifError } = this.props
    /** handling state get login */
    if (!isFetching(user) && this.submitting.user) {
      NProgress.done()
      this.submitting = { ...this.submitting, user: false }
      if (isError(user)) {
        this.setState({ notification: notifError(user.message) })
      }
      if (isFound(user)) {
        NProgress.start()
        this.submitting = { ...this.submitting, profile: true }
        await this.props.getProfile()
      }
    }
    /** handling state get profile */
    if (!isFetching(profile) && this.submitting.profile) {
      NProgress.done()
      this.submitting = { ...this.submitting, profile: false }
      if (isError(profile)) {
        this.setState({ notification: notifError(profile.message) })
      }
      if (isFound(profile)) {
        Router.push('/profile')
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
          <Containers className='form'>
            <Input
              {...input.email}
              onChange={this.onChange}
              hasIconsRight />
            <Input
              {...input.password}
              onChange={this.onChange}
              hasIconsRight />
            <TermConditions
              name={this.props.marketplace.data.name} />
            <ButtonFullWidth
              text={localize.signin}
              isLoading={this.submitting.user}
              onClick={() => this.submit()} />
            <div className='has-text-centered'>
              <a onClick={() => Router.push('/password?type=reset', '/password/reset')}>{localize.lost_password}</a>
            </div>
            <HrText text={localize.or} />
            <LoginFacebook
              text={localize.login_facebook}
              responseFacebook={(response) => this.responseFacebook(response)} />
          </Containers>
        </Section>
      </Content>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  profile: state.profile,
  marketplace: state.marketplace
})

const mapDispatchToProps = (dispatch) => ({
  getProfile: () => dispatch(loginAction.getProfile()),
  login: (params) => dispatch(loginAction.login(params)),
  loginSocial: (params) => dispatch(loginAction.loginSocial(params))
})

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)
