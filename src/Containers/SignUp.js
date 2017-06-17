// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as EmailValidator from 'email-validator'
import NProgress from 'nprogress'
import Router from 'next/router'
// components
import { LoginFacebook } from '../Components/Facebook'
import { Navigation, Hero } from '../Components/Navigation'
import { Input, InputRadio } from '../Components/Input'
import { ButtonFullWidth } from '../Components/Button'
import { HrText } from '../Components/Hr'
import TermConditions from '../Components/TermConditions'
import Notification from '../Components/Notification'
// validations
import * as constraints from '../Validations/Auth'
// actions
import * as loginAction from '../actions/user'

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
          type: 'number',
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
          selected: 'L'
        }
      },
      notification: {
        status: false,
        message: 'Error, default message.'
      }
    }
    this.onChange = this.onChange.bind(this)
    this.handleGenderChange = this.handleGenderChange.bind(this)
  }

  validation (name, value) {
    const { nama, handphone, email, password, retypePassword } = constraints.loginConstraints
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
        } else {
          input.nama.classInfo = success
          status = true
        }
        break
      case input.handphone.name:
        input.handphone.value = value
        if (value === '') {
          input.handphone.classInfo = danger
          input.handphone.textHelp = handphone.alert.empty
          status = false
        } else {
          if (value.match(handphone.regex)) {
            input.handphone.classInfo = success
            input.handphone.textHelp = ''
            status = true
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

  handleGenderChange (value) {
    let { input } = this.state
    input.genderGroup.selected = value
    this.setState({ input })
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

  handleRegisterClick () {
    let { nama, handphone, email, password, genderGroup } = this.state.input
    if (this.validation(nama.name, nama.value) &&
        this.validation(email.name, email.value) &&
        this.validation(handphone.name, handphone.value) &&
        this.validation(email.name, email.value) &&
        this.validation(password.name, password.value)) {
      NProgress.start()
      this.props.dispatch(loginAction.register({
        name: nama.value,
        phone_number: handphone.value,
        email: email.value,
        gender: genderGroup.selected,
        password: password.value
      }))
    }
  }

  componentWillReceiveProps (nextProps) {
    const { register } = nextProps
    if (register.status === 200) {
      Router.push('/signup-success')
      NProgress.done()
    } else if (register.status > 200) {
      this.setState({ notification: { status: true, message: register.message } })
      NProgress.done()
    }
  }

  render () {
    const { input, notification } = this.state
    return (
      <div className='main user'>
        <Navigation
          path='/signin'
          icon={<span className='icon-arrow-left' />}
          textPath='Register' />
        <Hero
          path='/signin'
          textPath='Login Disini'
          textInfo='Sudah punya akun?' />
        <section className='content'>
          <div className='container is-fluid'>
            <Notification
              type='is-warning'
              isShow={notification.status}
              activeClose
              onClose={() => this.setState({notification: {status: false, message: ''}})}
              message={notification.message} />
            <form action='#' className='form'>
              <Input
                type={input.nama.type}
                placeholder={input.nama.placeholder}
                name={input.nama.name}
                classInfo={input.nama.classInfo}
                value={input.nama.value}
                onChange={this.onChange}
                hasIconsRight
                textHelp={input.nama.textHelp} />
              <Input
                type={input.handphone.type}
                placeholder={input.handphone.placeholder}
                name={input.handphone.name}
                classInfo={input.handphone.classInfo}
                value={input.handphone.value}
                onChange={this.onChange}
                hasIconsRight
                textHelp={input.handphone.textHelp} />
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
              <Input
                type={input.passwordRetype.type}
                placeholder={input.passwordRetype.placeholder}
                name={input.passwordRetype.name}
                classInfo={input.passwordRetype.classInfo}
                value={input.passwordRetype.value}
                onChange={this.onChange}
                hasIconsRight
                textHelp={input.passwordRetype.textHelp} />

              <div className='field'>
                <label className='label'>Gender</label>
                <p className='control'>
                  <InputRadio
                    text='Pria'
                    value='L'
                    name={input.genderGroup.name}
                    selected={input.genderGroup.selected}
                    onChange={this.handleGenderChange} />

                  <InputRadio
                    text='Wanita'
                    value='P'
                    name={input.genderGroup.name}
                    selected={input.genderGroup.selected}
                    onChange={this.handleGenderChange} />
                </p>
              </div>
              <TermConditions />
              <ButtonFullWidth
                text='Register'
                onClick={() => this.handleRegisterClick()} />
              <HrText
                text='atau' />
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
    register: state.register,
    social: state.social
  }
}

export default connect(mapStateToProps)(SignUp)
