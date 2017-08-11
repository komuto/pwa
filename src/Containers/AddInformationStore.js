// @flow
import React from 'react'
import { connect } from 'react-redux'
import Dropzone from 'react-dropzone'
// components
import Router from 'next/router'
import {Images} from '../Themes'
// actions
import * as actionTypes from '../actions/stores'

var FormData = require('form-data')

class AddInformationStore extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      files: {},
      formInfo: {
        ...props.formInfo.store
      },
      submitting: false,
      overSlogan: 25,
      validation: false,
      notification: {
        status: false,
        message: 'Error, default message.'
      }
    }
  }

  onDrop (files) {
    this.setState({
      files: files[0]
    })
  }

  changePhoto () {
    this.setState({
      files: []
    })
  }

  handleInput (e) {
    const { name, value } = e.target
    let { formInfo, overSlogan } = this.state
    const newState = { formInfo }
    const newStateSlogan = { overSlogan }
    if (name === 'slogan' && value.length < 26 && value.length > 0) {
      newStateSlogan.overSlogan = 25 - value.length
      newState.formInfo[name] = value
    } else {
      newState.formInfo[name] = value
    }
    this.setState(newState)
    this.setState(newStateSlogan)
  }

  renderValidation (name, textFailed) {
    const { formInfo, files, validation } = this.state
    let logo = files
    let nameStore = formInfo.name
    let slogan = formInfo.slogan
    let description = formInfo.description
    let nameRequired = name === 'name' && nameStore.length > 0
    let logoRequired = name === 'image' && logo.hasOwnProperty('preview')
    let sloganLength = name === 'slogan' && slogan.length > 24
    let descRequired = name === 'description' && description.length > 0
    let result = logoRequired || nameRequired || sloganLength || descRequired
    return (
      <span style={{color: result ? 'green' : 'red', display: validation ? 'block' : 'none'}} >{result ? '' : textFailed}</span>
    )
  }

  postInfoStore () {
    const { formInfo, files } = this.state
    let logo = files
    let nameStore = formInfo.name
    let slogan = formInfo.slogan
    let description = formInfo.description

    let logoRequired = logo.hasOwnProperty('preview')
    let nameRequired = nameStore.length > 0
    let sloganLength = slogan.length > 24
    let descRequired = description.length > 0
    let isValid = logoRequired && nameRequired && sloganLength && descRequired
    if (isValid) {
      this.setState({ validation: false })
      this.handleUploadImage()
    } else {
      this.setState({ validation: true })
    }
  }

  handleUploadImage () {
    const { files } = this.state
    const images = new FormData()
    images.append('images', files)
    images.append('type', 'store')
    if (images) {
      this.props.photoUpload(images)
      this.setState({submitting: true})
    }
  }

  componentWillReceiveProps (nextProps) {
    const { formInfo, submitting } = this.state
    const { infoStore } = this.props
    if (nextProps.upload.status === 200 && submitting) {
      const logo = nextProps.upload.payload.images[0].name
      const path = nextProps.upload.payload.path
      const newState = { formInfo, submitting: false }
      newState.formInfo['logo'] = logo
      newState.formInfo['path'] = path
      this.setState(newState)
      infoStore(formInfo)
      Router.push('/shipping-expedition')
    }
  }

  render () {
    const { files, formInfo, overSlogan } = this.state
    let logoOnRedux = formInfo.path + formInfo.logo
    let logoImages
    if (formInfo.path) {
      logoImages = logoOnRedux
    } else {
      logoImages = Images.iconCamera
    }
    return (
      <div>
        <section className='section is-paddingless'>
          <div className='seller-bar'>
            <div className='seller-step active1'>
              <div className='step1'><span>1</span></div>
              <div className='step2'><span>2</span></div>
              <div className='step3'><span>3</span></div>
              <div className='step4'><span>4</span></div>
            </div>
          </div>
          <div className='upload-pict'>
            <Dropzone
              style={{}}
              accept='image/jpeg, image/png'
              onDrop={this.onDrop.bind(this)}>
              <div className='pict-wrapper'>
                {
                  <img src={(files.hasOwnProperty('preview')) ? files.preview : logoImages} alt='' />
                }
              </div>
              <p className='has-text-centered'>
                <a>{ (!files) ? 'Upload Foto Profil Toko' : 'Ganti Foto Profil Toko'}</a>
                <br />{this.renderValidation('image', 'Foto harus di upload !')}
              </p>
            </Dropzone>
          </div>

          <div className='form-seller'>
            <div className='field'>
              <label>Nama Toko</label>
              <p className='control'>
                <input
                  type='text'
                  name='name'
                  className='input'
                  placeholder='Nama Toko'
                  value={formInfo.name}
                  onChange={(e) => this.handleInput(e)} />
                <span>Nama toko tidak dapat diubah</span>
                <br />{this.renderValidation('name', 'Nama toko harus di isi !')}
              </p>
            </div>
            <div className='field'>
              <label>Slogan</label>
              <p className='control'>
                <textarea
                  name='slogan'
                  className='textarea'
                  placeholder='Tulis Pertanyaan'
                  rows='1'
                  value={formInfo.slogan}
                  onChange={(e) => this.handleInput(e)} />
                <span className='reg'>
                  {overSlogan} sisa karakter
                </span>
                <br />{this.renderValidation('slogan', 'Isi slogan minimal 25 karakter !')}
              </p>
            </div>
            <div className='field'>
              <label>Deskripsi Toko</label>
              <p className='control'>
                <textarea
                  name='description'
                  className='textarea'
                  placeholder='Tulis Pertanyaan'
                  rows='1'
                  value={formInfo.description}
                  onChange={(e) => this.handleInput(e)} />
                <br />{this.renderValidation('description', 'Deskripsi harus di isi !')}
              </p>
            </div>
            <div className='field'>
              <p className='control'>
                <button
                  className='button is-primary is-large is-fullwidth'
                  onClick={(e) => this.postInfoStore(e)} >Lanjutkan
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
    formInfo: state.processCreateStore,
    upload: state.upload
  }
}

const mapDispatchToProps = dispatch => ({
  infoStore: (params) => dispatch(actionTypes.infoStore(params)),
  photoUpload: (params) => dispatch(actionTypes.photoUpload({data: params}))
})

export default connect(mapStateToProps, mapDispatchToProps)(AddInformationStore)
