// @flow
import React from 'react'
import { connect } from 'react-redux'
// components
import Router from 'next/router'
// actions
import * as actionTypes from '../actions/stores'
import * as userActions from '../actions/user'
// validation
import { inputNumber } from '../Validations/Input'

class OwnerInformation extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      profile: props.profile,
      formInfo: {
        ...props.formOwnerInfo.user
      },
      validation: false,
      submitting: false
    }

    this.submitting = {
      alterUser: false,
      profile: false
    }
  }

  handleInput (e) {
    const { name, value } = e.target
    const { formInfo } = this.state
    const newState = { formInfo }
    if (name === 'id_number') {
      newState.formInfo[name] = inputNumber(value)
    } else {
      newState.formInfo[name] = value
    }
    this.setState(newState)
  }

  renderValidation (name, textFailed) {
    const { formInfo, validation } = this.state
    let idNumber = formInfo.id_number
    let motherName = formInfo.mother_name
    let idNumberRequired = name === 'id_number' && idNumber.length > 0
    let motherNameRequired = name === 'mother_name' && motherName.length > 0
    let result = idNumberRequired || motherNameRequired
    let errorMsg = {
      fontSize: '12px',
      letterSpacing: '.2px',
      color: '#ef5656',
      paddingTop: '8px',
      display: validation ? 'block' : 'none'
    }
    return (
      <span className='error-msg' style={errorMsg}>
        {result ? '' : textFailed}
      </span>
    )
  }

  handleSubmit (e) {
    e.preventDefault()
    const { formInfo } = this.state
    const { setOwnerInfo } = this.props
    let idNumber = formInfo.id_number
    let motherName = formInfo.mother_name
    let idNumberRequired = idNumber.length > 0
    let motherNameRequired = motherName.length > 0
    let isValid = idNumberRequired && motherNameRequired
    if (isValid) {
      this.setState({ submitting: true }, () => {
        if (this.state.submitting) {
          setOwnerInfo({ user: formInfo })
        }
      })
    } else {
      this.setState({ validation: true })
    }
  }

  async componentDidMount () {
    this.submitting = { ...this.submitting, profile: true }
    await this.props.getProfile()
  }

  componentWillReceiveProps (nextProps) {
    const { formOwnerInfo, profile } = nextProps
    const { isFetching, isError, isFound, notifError } = this.props

    this.setState({ formInfo: formOwnerInfo.user })

    if (formOwnerInfo.user.id_number && formOwnerInfo.user.mother_name && this.state.submitting) {
      this.setState({ submitting: false })
      Router.push('/address-info')
    }

    if (!isFetching(profile) && this.submitting.profile) {
      this.submitting = { ...this.submitting, profile: false }
      if (isError(profile)) {
        this.setState({ notification: notifError(profile.message) })
      }
      if (isFound(profile)) {
        this.setState({ profile })
      }
    }
  }

  render () {
    console.log('state', this.state)
    const { formInfo, profile, submitting } = this.state
    const { isFound } = this.props
    return (
      <div>
        <section className='section is-paddingless'>
          <div className='seller-bar'>
            <div className='seller-step active3'>
              <div className='step1'><span>1</span></div>
              <div className='step2'><span>2</span></div>
              <div className='step3'><span>3</span></div>
              <div className='step4'><span>4</span></div>
            </div>
          </div>
          {
            isFound(profile) &&
            <div className='form-seller info'>
              <div className='field'>
                <label>Nama Pemilik</label>
                <p className='control'>
                  <strong>{profile.user.user.name}</strong>
                </p>
              </div>
              <div className='field'>
                <label>Alamat Email</label>
                <p className='control'>
                  <strong>{profile.user.user.email}</strong>
                </p>
              </div>
              <div className='field'>
                <label>No HandPhone</label>
                <p className='control'>
                  <strong>{profile.user.user.phone_number.replace(/(\d{4})(\d{4})(\d{4})/, '$1-$2-$3')}</strong>
                </p>
              </div>
              <div className='field'>
                <p className='control'>
                  <input
                    type='text'
                    name='id_number'
                    className='input'
                    placeholder='No Identitas (KTP/SIM/Paspor)'
                    value={formInfo.id_number}
                    onChange={(e) => this.handleInput(e)} />
                  {this.renderValidation('id_number', 'Mohon isi no identitas')}
                </p>
              </div>
              <div className='field'>
                <p className='control'>
                  <input
                    type='text'
                    name='mother_name'
                    className='input'
                    placeholder='Nama Ibu Kandung'
                    value={formInfo.mother_name}
                    onChange={(e) => this.handleInput(e)}
                    />
                  {this.renderValidation('mother_name', 'Mohon isi nama ibu kandung')}
                </p>
              </div>
              <div className='field'>
                <p className='control'>
                  <button
                    className={`button is-primary is-large is-fullwidth ${submitting && 'is-loading'}`}
                    onClick={(e) => this.handleSubmit(e)}
                    >
                    Lanjutkan
                  </button>
                </p>
              </div>
            </div>
          }
        </section>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  formOwnerInfo: state.tempCreateStore,
  profile: state.profile
})

const mapDispatchToProps = dispatch => ({
  setOwnerInfo: (params) => dispatch(actionTypes.tempCreateStore(params)),
  getProfile: () => dispatch(userActions.getProfile())
})

export default connect(mapStateToProps, mapDispatchToProps)(OwnerInformation)
