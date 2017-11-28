// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as EmailValidator from 'email-validator'
import NProgress from 'nprogress'
import localforage from 'localforage'
import Router from 'next/router'
import { animateScroll } from 'react-scroll'
// components
import Content from '../../Components/Content'
import Section from '../../Components/Section'
import Containers from '../../Components/Containers'
import { LoginFacebook } from '../../Components/Facebook'
import { Input, InputRadio } from '../../Components/Input'
import { ButtonFullWidth } from '../../Components/Button'
import { HrText } from '../../Components/Hr'
import TermConditions from '../../Components/TermConditions'
import Notification from '../../Components/Notification'
// validations
import * as constraints from '../../Validations/Auth'
import { inputPhoneNumber, isValidPhoneNumber } from '../../Validations/Input'
// actions
import * as loginAction from '../../actions/user'

class SignUp extends Component {
  constructor (props) {
    super(props)
    this.state = {
      input: {
        nama: {
          type: 'text',
          placeholder: 'Nama Lengkap',
          name: 'nama',
          value: '',
          classInfo: '',
          textHelp: ''
        },
        handphone: {
          type: 'text',
          placeholder: 'Nomor Handphone',
          name: 'handphone',
          value: '',
          classInfo: '',
          textHelp: ''
        },
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
        },
        passwordRetype: {
          type: 'password',
          placeholder: 'Konfirmasi Password',
          name: 'passwordRetype',
          value: '',
          classInfo: '',
          textHelp: ''
        },
        genderGroup: {
          type: 'radio',
          name: 'gender',
          selected: '',
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
      register: false,
      user: false,
      profile: false
    }
    this.onChange = this.onChange.bind(this)
    this.handleGenderChange = this.handleGenderChange.bind(this)
  }

  scrollToTop () {
    animateScroll.scrollToTop()
  }

  validation (name, value) {
    const { nama, handphone, email, password, retypePassword, genderGroup } = constraints.loginConstraints
    const { danger, success } = constraints.classInfo
    let { input } = this.state
    let status = false

    switch (name) {
      case input.nama.name:
        input.nama.value = value
        if (value === '') {
          input.nama.classInfo = danger
          input.nama.textHelp = nama.alert.empty
          status = false
        } else if (value.length < 3) {
          input.nama.classInfo = danger
          input.nama.textHelp = nama.alert.min
          status = false
        } else {
          input.nama.classInfo = success
          input.nama.textHelp = ''
          status = true
        }
        break
      case input.handphone.name:
        input.handphone.value = inputPhoneNumber(value)
        if (value === '') {
          input.handphone.classInfo = danger
          input.handphone.textHelp = handphone.alert.empty
          status = false
        } else {
          if (isValidPhoneNumber(value)) {
            input.handphone.classInfo = success
            input.handphone.textHelp = ''
            status = true
            switch (value.charAt(0)) {
              case '0':
                if (value.length >= 8 && value.length <= 13) {
                  input.handphone.classInfo = success
                  input.handphone.textHelp = ''
                  status = true
                } else {
                  input.handphone.classInfo = danger
                  input.handphone.textHelp = handphone.alert.minMax0
                  status = false
                }
                break
              case '+':
                if (value.length >= 10 && value.length <= 15) {
                  input.handphone.classInfo = success
                  input.handphone.textHelp = ''
                  status = true
                } else {
                  input.handphone.classInfo = danger
                  input.handphone.textHelp = handphone.alert.minMaxPlus
                  status = false
                }
                break
              case '6':
                if (value.length >= 9 && value.length <= 14) {
                  input.handphone.classInfo = success
                  input.handphone.textHelp = ''
                  status = true
                } else {
                  input.handphone.classInfo = danger
                  input.handphone.textHelp = handphone.alert.minMax62
                  status = false
                }
                break
              default:
                break
            }
          } else {
            input.handphone.classInfo = danger
            input.handphone.textHelp = handphone.alert.valid
            status = false
          }
        }
        break
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
        if (value === '-') {
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
      case input.genderGroup.name:
        input.genderGroup.selected = value
        if (value === '') {
          input.genderGroup.classInfo = danger
          input.genderGroup.textHelp = genderGroup.alert.empty
          status = false
        } else {
          input.genderGroup.classInfo = success
          input.genderGroup.textHelp = ''
          status = true
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
    let { input } = this.state
    if (name === 'handphone') {
      input[name].value = inputPhoneNumber(value)
    } else {
      input[name].value = value
    }
    this.setState({ input })
  }

  handleGenderChange (value) {
    let { input } = this.state
    input.genderGroup.selected = value
    this.setState({ input })
  }

  responseFacebook (response) {
    if (response) {
      NProgress.start()
      this.submitting = { ...this.submitting, user: true }
      this.props.dispatch(loginAction.loginSocial({
        provider_name: 'facebook',
        provider_uid: response.userID,
        access_token: response.accessToken
      }))
    }
  }

  handleRegisterClick () {
    let { nama, handphone, email, password, passwordRetype, genderGroup } = this.state.input
    if (this.validation(nama.name, nama.value) &&
        this.validation(email.name, email.value) &&
        this.validation(handphone.name, handphone.value) &&
        this.validation(email.name, email.value) &&
        this.validation(password.name, password.value) &&
        this.validation(passwordRetype.name, passwordRetype.value) &&
        this.validation(genderGroup.name, genderGroup.selected)) {
      NProgress.start()
      this.submitting = { ...this.submitting, register: true }

      let { fcmToken } = this.state

      this.props.dispatch(loginAction.register({
        name: nama.value,
        phone_number: handphone.value,
        email: email.value,
        gender: genderGroup.selected,
        password: password.value,
        reg_token: fcmToken
      }))
    }
  }

  async componentDidMount () {
    this.scrollToTop()
    let { fcmToken } = this.state
    fcmToken = await localforage.getItem('FCM_TOKEN')
    this.setState({ fcmToken })
  }

  componentWillReceiveProps (nextProps) {
    const { register, user, profile } = nextProps
    const { isFetching, isError, isFound, notifError } = this.props

    /** handling state register */
    if (!isFetching(register) && this.submitting.register) {
      NProgress.done()
      this.submitting = { ...this.submitting, register: false }
      if (isError(register)) {
        this.setState({ notification: notifError(register.message) })
      }
      if (isFound(register)) {
        NProgress.start()
        this.submitting = { ...this.submitting, profile: true }
        this.props.getProfile()
      }
    }
    /** handling login social */
    if (!isFetching(user) && this.submitting.user) {
      NProgress.done()
      this.submitting = { ...this.submitting, user: false }
      if (isError(user)) {
        this.setState({ notification: notifError(user.message) })
      }
      if (isFound(user)) {
        NProgress.start()
        this.submitting = { ...this.submitting, profile: true }
        this.props.getProfile()
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
    const { input, notification } = this.state
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
            <div className='form'>
              <Input
                {...input.nama}
                onChange={this.onChange}
                hasIconsRight />
              <Input
                {...input.handphone}
                onChange={this.onChange}
                hasIconsRight />
              <Input
                {...input.email}
                onChange={this.onChange}
                hasIconsRight />
              <Input
                {...input.password}
                onChange={this.onChange}
                hasIconsRight />
              <Input
                {...input.passwordRetype}
                onChange={this.onChange}
                hasIconsRight />

              <div className='field'>
                <label className='label'>Gender</label>
                <p className='control'>
                  <InputRadio
                    text='Pria'
                    value='male'
                    {...input.genderGroup}
                    onChange={this.handleGenderChange} />

                  <InputRadio
                    text='Wanita'
                    value='female'
                    {...input.genderGroup}
                    onChange={this.handleGenderChange} />
                  <span className={`help ${input.genderGroup.classInfo}`}>{input.genderGroup.textHelp}</span>
                </p>
              </div>
              <TermConditions
                name={this.props.marketplace.data.name} />
              <ButtonFullWidth
                isLoading={this.submitting.register}
                text='Register'
                onClick={() => !this.submitting.register && this.handleRegisterClick()} />
              <HrText
                text='atau' />
              <LoginFacebook
                appId={this.props.marketplace.data.fb_app_id}
                responseFacebook={(response) => this.responseFacebook(response)} />
            </div>
          </Containers>
        </Section>
      </Content>
    )
  }
}
const mapStateToProps = (state) => ({
  register: state.register,
  user: state.user,
  profile: state.profile,
  marketplace: state.marketplace
})

const mapDispatchToProps = (dispatch) => ({
  setRegister: (params) => dispatch(loginAction.register(params)),
  loginSocial: (params) => dispatch(loginAction.loginSocial(params)),
  getProfile: () => dispatch(loginAction.getProfile())
})

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)
