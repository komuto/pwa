// @flow
import React from 'react'
import { connect } from 'react-redux'
import Dropzone from 'react-dropzone'
// components
import Router from 'next/router'
import {Images} from '../Themes'
import NProgress from 'nprogress'
// actions
import * as actionTypes from '../actions/stores'
import * as actionUserTypes from '../actions/user'
// services
import { Status } from '../Services/Status'

var FormData = require('form-data')

class InformationStore extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      profile: props.profile,
      files: {
        preview: props.formInfo.store.logo
      },
      formInfo: {
        ...props.formInfo.store
      },
      submitting: false,
      overSlogan: 25,
      validation: false,
      setStateStart: false,
      notification: {
        status: false,
        color: 'is-success',
        message: 'Error, default message.'
      }
    }
  }

  handleNotification (e) {
    const { notification } = this.state
    const newState = { notification }
    newState.notification['status'] = !notification.status
    this.setState(newState)
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
    let logo = files.preview !== '' || formInfo.logo !== ''
    let nameStore = formInfo.name
    let slogan = formInfo.slogan
    let description = formInfo.description
    let logoRequired = name === 'image' && logo
    let nameRequired = name === 'name' && nameStore.length > 0
    let sloganLength = name === 'slogan' && slogan.length > 24
    let descRequired = name === 'description' && description.length > 0
    let result = logoRequired || nameRequired || sloganLength || descRequired
    return (
      <span style={{color: result ? '#23d160' : '#ef5656',
        display: validation ? 'block' : 'none',
        letterSpacing: '0.2px'}} >
        {result ? '' : textFailed}
      </span>
    )
  }

  postInfoStore () {
    const { formInfo, files, submitting } = this.state
    const { tempCreateStore, updateInformation, query } = this.props
    const isSetting = this.props.hasOwnProperty('query') && query.type === 'settingStore'
    let logo = files
    let nameStore = formInfo.name
    let slogan = formInfo.slogan
    let description = formInfo.description
    let logoRequired = logo.preview !== '' || formInfo.logo !== ''
    let nameRequired = nameStore.length > 0
    let sloganLength = slogan.length > 24
    let descRequired = description.length > 0
    let isValid = logoRequired && nameRequired && sloganLength && descRequired
    if (isValid) {
      const newSubmitting = { submitting, validation: false }
      newSubmitting.submitting = true
      this.setState(newSubmitting)
      if (files.preview !== '' && files.preview !== formInfo.logo) {
        this.handleUploadImage()
      } else {
        isSetting ? updateInformation(formInfo) : tempCreateStore({ store: formInfo })
        !isSetting && Router.push('/shipping-expedition')
      }
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
    }
  }

  handleButton () {
    const { submitting } = this.state
    const { query } = this.props
    const isSetting = this.props.hasOwnProperty('query') && query.type === 'settingStore'
    return (
      <button
        className={`button is-primary is-large is-fullwidth ${submitting ? 'is-loading' : ''}`}
        onClick={(e) => this.postInfoStore(e)} >
        { isSetting ? 'Simpan Perubahan' : 'Lanjutkan'}
      </button>
    )
  }

  componentDidMount () {
    const { profile, formInfo } = this.state
    const { query, getProfile } = this.props
    if (query.type === 'settingStore') {
      if (!profile.isFound) {
        this.setState({ setStateStart: true })
        getProfile()
      } else {
        const newState = { formInfo, setStateStart: false }
        const splitLogo = profile.user.store.logo.split('/')
        const logo = splitLogo.pop() || splitLogo.pop()
        newState.formInfo['name'] = profile.user.store.name
        newState.formInfo['slogan'] = profile.user.store.slogan
        newState.formInfo['description'] = profile.user.store.description
        newState.formInfo['logo'] = logo
        newState.formInfo['path'] = splitLogo.join('/')
        this.setState(newState)
      }
    }
    NProgress.done()
  }

  componentWillReceiveProps (nextProps) {
    const { formInfo, submitting, notification, setStateStart } = this.state
    const { tempCreateStore, query, updateInformation, getProfile } = this.props
    const { profile, updateStore, upload } = nextProps
    if (!upload.isLoading && upload.isFound && submitting) {
      const isSetting = this.props.hasOwnProperty('query') && query.type === 'settingStore'
      const logo = upload.payload.images[0].name
      const path = upload.payload.path
      const newState = { formInfo, submitting: false }
      newState.formInfo['logo'] = logo
      newState.formInfo['path'] = path
      this.setState(newState)
      if (isSetting) {
        updateInformation(formInfo)
      } else {
        tempCreateStore({ store: formInfo })
        Router.push('/shipping-expedition')
      }
    }
    if (!profile.isLoading && profile.isFound && setStateStart) {
      const newState = { formInfo, setStateStart: false }
      const splitLogo = profile.user.store.logo.split('/')
      const logo = splitLogo.pop() || splitLogo.pop()
      newState.formInfo['name'] = profile.user.store.name
      newState.formInfo['slogan'] = profile.user.store.slogan
      newState.formInfo['description'] = profile.user.store.description
      newState.formInfo['logo'] = logo
      newState.formInfo['path'] = splitLogo.join('/')
      this.setState(newState)
      this.setState({ profile })
    }
    if (!updateStore.isLoading && updateStore.isFound && submitting) {
      switch (updateStore.status) {
        case Status.SUCCESS: {
          getProfile()
          const newNotification = { notification, submitting: false }
          newNotification.notification['status'] = true
          newNotification.notification['message'] = updateStore.message
          newNotification.notification['color'] = 'is-success'
          this.setState(newNotification)
          break
        }
        case Status.OFFLINE :
        case Status.FAILED : {
          const newNotif = { notification, submitting: false }
          newNotif.notification['status'] = true
          newNotif.notification['message'] = updateStore.message
          newNotif.notification['color'] = 'is-danger'
          this.setState(newNotif)
          break
        }
        default:
          break
      }
      this.setState({ notification })
    }
  }

  render () {
    const { files, formInfo, overSlogan, notification } = this.state
    let logoOnRedux = formInfo.path + formInfo.logo
    let logoImages
    if (formInfo.path) {
      logoImages = logoOnRedux
    } else {
      logoImages = Images.iconCamera
    }
    return (
      <div>
        <div
          className={`notification ${notification.status && notification.color}`}
          style={{display: notification.status ? 'block' : 'none'}}>
          <button className='delete' onClick={(e) => this.handleNotification(e)} />
          {notification.message}
        </div>
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
                  <img src={files.preview !== '' ? files.preview : logoImages} alt='' />
                }
              </div>
              <p className='has-text-centered'>
                <a>{ (!files) ? 'Upload Foto Profil Toko' : 'Ganti Foto Profil Toko'}</a>
                {this.renderValidation('image', 'Foto harus di upload')}
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
                {this.renderValidation('name', 'Mohon isi nama toko')}
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
                <br />{this.renderValidation('slogan', 'Isi slogan minimal 25 karakter')}
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
                <br />{this.renderValidation('description', 'Mohon isi deskripsi toko')}
              </p>
            </div>
            <div className='field'>
              <p className='control'>
                {this.handleButton()}
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
    formInfo: state.tempCreateStore,
    upload: state.upload,
    profile: state.profile,
    updateStore: state.updateStore
  }
}

const mapDispatchToProps = dispatch => ({
  tempCreateStore: (params) => dispatch(actionTypes.tempCreateStore(params)),
  photoUpload: (params) => dispatch(actionTypes.photoUpload({data: params})),
  getProfile: () => dispatch(actionUserTypes.getProfile()),
  updateInformation: (params) => dispatch(actionTypes.updateInformation(params))
})

export default connect(mapStateToProps, mapDispatchToProps)(InformationStore)
