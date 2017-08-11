// @flow
import React from 'react'
import { connect } from 'react-redux'
// components
import Router from 'next/router'
// actions
import * as actionTypes from '../actions/stores'
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
      validation: false
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
    return (
      <span style={{color: result ? 'green' : 'red', display: validation ? 'block' : 'none'}} >{result ? '' : textFailed}</span>
    )
  }

  handleSubmit (e) {
    e.preventDefault()
    const { formInfo } = this.state
    const { OwnerInfo } = this.props
    let idNumber = formInfo.id_number
    let motherName = formInfo.mother_name
    let idNumberRequired = idNumber.length > 0
    let motherNameRequired = motherName.length > 0
    let isValid = idNumberRequired && motherNameRequired
    if (isValid) {
      this.setState({ validation: false })
      OwnerInfo(formInfo)
      Router.push('/address-info')
    } else {
      this.setState({ validation: true })
    }
  }

  componentWillReceiveProps (nextProps) {
    this.setState({ formInfo: nextProps.formOwnerInfo.user })
    console.log('nextProps ', nextProps)
  }

  render () {
    const { formInfo, profile } = this.state
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
              <p className='control'>
                <input
                  type='text'
                  name='id_number'
                  className='input'
                  placeholder='No Identitas (KTP/SIM/Paspor)'
                  value={formInfo.id_number}
                  onChange={(e) => this.handleInput(e)} />
                <br />{this.renderValidation('id_number', 'No Identitas harus di isi !')}
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
                <br />{this.renderValidation('mother_name', 'Nama Ibu Kandung harus di isi !')}
              </p>
            </div>
            <div className='field'>
              <p className='control'>
                <button
                  className='button is-primary is-large is-fullwidth'
                  onClick={(e) => this.handleSubmit(e)}
                  >
                  Lanjutkan
                </button>
              </p>
            </div>
          </div>
        </section>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    formOwnerInfo: state.processCreateStore,
    profile: state.profile
  }
}

const mapDispatchToProps = dispatch => ({
  OwnerInfo: (params) => dispatch(actionTypes.OwnerInfo(params))
})

export default connect(mapStateToProps, mapDispatchToProps)(OwnerInformation)
