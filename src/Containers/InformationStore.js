// @flow
import React from 'react'
import { connect } from 'react-redux'
import Dropzone from 'react-dropzone'
import NProgress from 'nprogress'
import Router from 'next/router'
// components
import { Navbar } from './Navbar'
import Notification from '../Components/Notification'
import {Images} from '../Themes'
import MyImage from '../Components/MyImage'
import Wizard from '../Components/Wizard'
// actions
import * as actionTypes from '../actions/stores'
import * as actionUserTypes from '../actions/user'

let FormData = require('form-data')

class InformationStore extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      profile: props.profile,
      files: {
        preview: ''
      },
      formInfo: {
        ...props.formInfo.store
      },
      slogan: 25 - props.formInfo.store.slogan.length,
      validation: false,
      submiting: {
        upload: false,
        updateStore: false
      },
      notification: {
        type: 'is-success',
        status: false,
        message: 'Error, default message.'
      }
    }
    this.fetchingFirst = false
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
    let { formInfo, slogan } = this.state
    const newState = { formInfo }
    const newStateSlogan = { slogan }
    if (name === 'slogan') {
      if (value.length < 26) {
        newStateSlogan.slogan = 25 - value.length
        newState.formInfo[name] = value
      }
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
    let sloganLength = name === 'slogan' && slogan.length >= 10 && slogan.length <= 25
    let descRequired = name === 'description' && description.length > 0
    let result = logoRequired || nameRequired || sloganLength || descRequired
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

  postInfoStore () {
    const { formInfo, submiting, files } = this.state
    const { tempCreateStore, updateInformation, query } = this.props
    const isSetting = query.type === 'settingStore'
    let logo = files
    let nameStore = formInfo.name
    let slogan = formInfo.slogan
    let description = formInfo.description
    let logoRequired = logo.preview !== '' || formInfo.logo !== ''
    let nameRequired = nameStore.length > 0
    let sloganLength = slogan.length >= 10 && slogan.length <= 25
    let descRequired = description.length > 0
    let isValid = logoRequired && nameRequired && sloganLength && descRequired
    if (isValid) {
      this.setState({ validation: false })
      if (files.preview !== '' && files.preview !== formInfo.logo) {
        this.setState({ submiting: { ...submiting, upload: true } })
        this.handleUploadImage()
      } else {
        if (isSetting) {
          this.setState({ submiting: { ...submiting, updateStore: true } })
          updateInformation(formInfo)
        } else {
          tempCreateStore({ store: formInfo })
          Router.push('/shipping-expedition')
        }
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
    const { query } = this.props
    const isSetting = query.type === 'settingStore'
    return (
      <button
        className={`button is-primary is-large is-fullwidth ${(this.state.submiting.upload || this.state.submiting.updateStore) ? 'is-loading' : ''}`}
        onClick={(e) => !this.state.submiting.upload && this.postInfoStore(e)} >
        { isSetting ? 'Simpan Perubahan' : 'Lanjutkan'}
      </button>
    )
  }

  componentDidMount () {
    const { profile, formInfo, slogan } = this.state
    const { query, getProfile } = this.props
    // if (isLogin) {
    if (query.type === 'settingStore') {
      if (!profile.isFound) {
        NProgress.start()
        this.fetchingFirst = true
        getProfile()
      } else {
        const newState = { formInfo, slogan }
        const splitLogo = profile.user.store.logo.split('/')
        const logo = splitLogo.pop() || splitLogo.pop()
        newState.formInfo['name'] = profile.user.store.name
        newState.formInfo['slogan'] = profile.user.store.slogan
        newState.formInfo['description'] = profile.user.store.description
        newState.formInfo['logo'] = logo
        newState.formInfo['path'] = splitLogo.join('/')
        newState.slogan = slogan - profile.user.store.slogan.length
        this.setState(newState)
      }
    }
    // } else {
    //   Router.push('/signin')
    // }
  }

  componentWillReceiveProps (nextProps) {
    const { formInfo, submiting, slogan } = this.state
    const { query, isFetching, isFound, isError, notifError, notifSuccess } = this.props
    const { profile, updateStore, upload } = nextProps
    if (!isFetching(profile) && this.fetchingFirst) {
      this.fetchingFirst = false
      NProgress.done()
      if (isFound(profile)) {
        const newState = { formInfo, slogan, profile }
        const splitLogo = profile.user.store.logo.split('/')
        const logo = splitLogo.pop() || splitLogo.pop()
        newState.formInfo['name'] = profile.user.store.name
        newState.formInfo['slogan'] = profile.user.store.slogan
        newState.formInfo['description'] = profile.user.store.description
        newState.formInfo['logo'] = logo
        newState.formInfo['path'] = splitLogo.join('/')
        newState.slogan = slogan - profile.user.store.slogan.length
        this.setState(newState)
      }
      if (isError(profile)) {
        this.setState({ notification: notifError(profile.message) })
      }
    }
    if (!isFetching(upload) && submiting.upload) {
      if (isFound(upload)) {
        this.setState({ submiting: { ...submiting, upload: false } })
        const isSetting = query.type === 'settingStore'
        const logo = upload.payload.images[0].name
        const path = upload.payload.path
        const newState = { formInfo }
        newState.formInfo['logo'] = logo
        newState.formInfo['path'] = path
        this.setState(newState)
        if (isSetting) {
          this.setState({ submiting: { upload: false, updateStore: true } })
          this.props.updateInformation(formInfo)
        } else {
          this.props.tempCreateStore({ store: formInfo })
          Router.push('/shipping-expedition')
        }
      }
      if (isError(upload)) {
        this.setState({ notification: notifError(upload.message), upload: false })
      }
    }

    if (!isFetching(updateStore) && submiting.updateStore) {
      this.setState({ submiting: { upload: false, updateStore: false } })
      if (isFound(updateStore)) {
        this.props.getProfile()
        this.setState({ notification: notifSuccess(updateStore.message) })
      }
      if (isError(updateStore)) {
        this.setState({ notification: notifError(updateStore.message) })
      }
    }
  }

  render () {
    console.log('state', this.state)
    const { files, formInfo, slogan, notification } = this.state
    const isSetting = this.props.query.type === 'settingStore'
    let logoOnRedux = formInfo.path + '/' + formInfo.logo
    let logoImages
    if (formInfo.path) {
      logoImages = logoOnRedux
    } else {
      logoImages = Images.iconCamera
    }
    const params = {
      navbar: {
        searchBoox: false,
        path: '/',
        callBack: () => isSetting ? Router.back() : Router.push('/profile'),
        textPath: 'Informasi Toko'
      }
    }
    return (
      <div>
        <Navbar {...params} />
        <Notification
          type={notification.type}
          isShow={notification.status}
          activeClose
          onClose={() => this.setState({notification: {status: false, message: ''}})}
          message={notification.message} />
        <section className='section is-paddingless'>
          { !isSetting && <Wizard total={4} active={1} /> }
          <div className='upload-pict'>
            <Dropzone
              style={{}}
              accept='image/jpeg, image/png'
              onDrop={this.onDrop.bind(this)}>
              {
                files.preview && <div className='pict-wrapper' style={{ backgroundImage: `url(${files.preview})`, backgroundPosition: 'center', backgroundSize: 'cover' }} />
              }
              {
                !files.preview && <div className='pict-wrapper'>{ <MyImage src={logoImages} alt='' /> }</div>
              }
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
                  onChange={(e) => this.handleInput(e)}
                  disabled={isSetting} />
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
                  placeholder='Tulis Slogan'
                  rows='1'
                  value={formInfo.slogan}
                  onChange={(e) => this.handleInput(e)} />
                <span className='reg'>
                  {slogan} sisa karakter
                </span>
                <br />{this.renderValidation('slogan', 'Isi slogan 10-25 karakter')}
              </p>
            </div>
            <div className='field'>
              <label>Deskripsi Toko</label>
              <p className='control'>
                <textarea
                  name='description'
                  className='textarea'
                  placeholder='Tulis Deskripsi'
                  rows='1'
                  value={formInfo.description}
                  onChange={(e) => this.handleInput(e)} />
                {this.renderValidation('description', 'Mohon isi deskripsi toko')}
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
