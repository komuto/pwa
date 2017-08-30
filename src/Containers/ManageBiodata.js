// @flow
import React from 'react'
import { connect } from 'react-redux'
import Dropzone from 'react-dropzone'
import DatePicker from 'react-mobile-datepicker'
import moment from 'moment'
// components
import NProgress from 'nprogress'
import {Images} from '../Themes'
// actions
import * as actionTypes from '../actions/stores'
import * as actionUserTypes from '../actions/user'
import * as actionLocationTypes from '../actions/location'
// services
import { Status } from '../Services/Status'
import FormData from 'form-data'

class ManageBiodata extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      profile: props.profile,
      formBiodata: {
        name: '',
        photo: '',
        gender: '',
        place_of_birth: '',
        date_of_birth: ''
      },
      searchDistrict: {
        name: '',
        selected: ''
      },
      districts: props.districts,
      modalPlaceOfBirth: false,
      submitting: false,
      validation: false,
      notification: {
        status: false,
        color: 'is-success',
        message: 'Error, default message.'
      },
      time: new Date(),
      isOpen: false
    }
  }

  handleCancel (e) {
    const { isOpen } = this.state
    const newIsOpen = { isOpen }
    newIsOpen.isOpen = !isOpen
    this.setState(newIsOpen)
  }

  handleNotification (e) {
    const { notification } = this.state
    const newState = { notification }
    newState.notification['status'] = !notification.status
    this.setState(newState)
  }

  handleSelect (times) {
    const { formBiodata, time, isOpen } = this.state
    const newFormBiodata = { formBiodata }
    const newTime = { time }
    const newIsOpen = { isOpen }
    newFormBiodata.formBiodata['date_of_birth'] = moment(times).unix()
    newTime.time = times
    newIsOpen.isOpen = false
    this.setState(newTime)
    this.setState(newFormBiodata)
    this.setState(newIsOpen)
  }

  onDrop (files) {
    const { formBiodata } = this.state
    const newState = { formBiodata }
    newState.formBiodata['photo'] = files[0]
    this.setState(newState)
  }

  changePhoto () {
    const { formBiodata } = this.state
    const newState = { formBiodata }
    newState.formBiodata['photo'] = []
    this.setState(newState)
  }

  handleInput (e) {
    const { name, value } = e.target
    let { formBiodata } = this.state
    const newState = { formBiodata }
    newState.formBiodata[name] = value
    this.setState(newState)
  }

  handleSearchDistrict (e) {
    const { value } = e.target
    let { searchDistrict } = this.state
    const newState = { searchDistrict }
    newState.searchDistrict['name'] = value
    this.setState(newState)
  }

  renderValidation (type, textFailed) {
    const { formBiodata, validation } = this.state
    let photo = formBiodata.photo
    let nameUser = formBiodata.name
    let gender = formBiodata.gender
    let placeOfBirth = formBiodata.place_of_birth
    let dateOfBirth = formBiodata.date_of_birth
    let photoRequired = type === 'photo' && (photo.hasOwnProperty('preview') || photo.length > 0)
    let nameRequired = type === 'name' && nameUser.length > 0
    let genderRequired = type === 'gender' && gender.length > 0
    let pobRequired = type === 'place_of_birth' && placeOfBirth !== null
    let dobRequired = type === 'date_of_birth' && dateOfBirth !== null
    let result = photoRequired || nameRequired || genderRequired || pobRequired || dobRequired
    return (
      <span style={{color: result ? '#23d160' : '#ef5656',
        display: validation ? 'block' : 'none',
        letterSpacing: '0.2px'}} >
        {result ? '' : textFailed}
      </span>
    )
  }

  postUpdateProfile (e) {
    e.preventDefault()
    const { formBiodata } = this.state
    let photo = formBiodata.photo
    let nameUser = formBiodata.name
    let gender = formBiodata.gender
    let placeOfBirth = formBiodata.place_of_birth
    let dateOfBirth = formBiodata.date_of_birth
    let photoRequired = (photo.hasOwnProperty('preview') || photo.length > 0)
    let nameRequired = nameUser.length > 0
    let genderRequired = gender.length > 0
    let pobRequired = placeOfBirth !== null
    let dobRequired = dateOfBirth !== null
    let isValid = photoRequired && nameRequired && genderRequired && pobRequired && dobRequired
    if (isValid) {
      this.setState({ submitting: true })
      this.setState({ validation: false })
      if (formBiodata.photo.hasOwnProperty('preview')) {
        this.handleUploadImage()
      } else {
        this.processUpdateUser()
      }
    } else {
      this.setState({ validation: true })
    }
  }

  processUpdateUser () {
    const { formBiodata, profile } = this.state
    let photo = formBiodata.photo
    let splitPhoto = photo.split('/')
    let photoFix = splitPhoto[splitPhoto.length - 1]
    const newState = { formBiodata }
    newState.formBiodata['photo'] = photoFix
    newState.formBiodata['place_of_birth'] = profile.user.user.place_of_birth_id
    this.setState(newState)
    this.props.updateProfile(formBiodata)
  }

  handleUploadImage () {
    const { formBiodata } = this.state
    const images = new FormData()
    images.append('images', formBiodata.photo)
    images.append('type', 'profile')
    if (images) {
      this.props.photoUpload(images)
    }
  }

  handleModalPOB (e) {
    e.preventDefault()
    const { modalPlaceOfBirth } = this.state
    this.setState({ modalPlaceOfBirth: !modalPlaceOfBirth })
  }

  handlePOB (e, district) {
    e.preventDefault()
    const { formBiodata, searchDistrict } = this.state
    const newDistrict = { formBiodata }
    const newSearchDistrict = { searchDistrict }
    newDistrict.formBiodata['place_of_birth'] = district.id
    newSearchDistrict.searchDistrict['name'] = ''
    newSearchDistrict.searchDistrict['selected'] = district.name
    this.setState(newDistrict)
    this.setState(newSearchDistrict)
    this.handleModalPOB(e)
  }

  componentWillMount () {
    const { formBiodata, profile, districts, searchDistrict } = this.state
    if (!districts.isFound) {
      this.props.getDistrict()
    }
    if (!profile.isFound) {
      this.props.getProfile()
    }
    if (profile.isFound) {
      const newState = { formBiodata }
      const newSearchDistrict = { searchDistrict }
      newSearchDistrict.searchDistrict['selected'] = profile.user.user.place_of_birth
      newState.formBiodata['name'] = profile.user.user.name
      newState.formBiodata['photo'] = profile.user.user.photo
      newState.formBiodata['gender'] = profile.user.user.gender
      newState.formBiodata['place_of_birth'] = profile.user.user.place_of_birth_id
      newState.formBiodata['date_of_birth'] = profile.user.user.date_of_birth
      this.setState(newState)
      this.setState(newSearchDistrict)
    }
  }

  componentDidMount () {
    NProgress.done()
  }

  componentWillReceiveProps (nextProps) {
    const { districts, upload, statusUpdateProfile, profile } = nextProps
    const { updateProfile } = this.props
    const { formBiodata, submitting, notification, searchDistrict } = this.state
    if (profile.status === 200) {
      this.setState({ profile: nextProps.profile })
      if (formBiodata.name === '') {
        const newState = { formBiodata }
        const newSearchDistrict = { searchDistrict }
        newState.formBiodata['name'] = profile.user.user.name
        newState.formBiodata['photo'] = profile.user.user.photo
        newState.formBiodata['gender'] = profile.user.user.gender
        newState.formBiodata['place_of_birth'] = profile.user.user.place_of_birth_id
        newState.formBiodata['date_of_birth'] = profile.user.user.date_of_birth
        newSearchDistrict.searchDistrict['selected'] = profile.user.user.place_of_birth
        this.setState(newState)
        this.setState(newSearchDistrict)
      }
    }
    if (districts.status === 200) {
      this.setState({ districts: nextProps.districts })
    }
    if (upload.status === 200 && submitting) {
      const logo = upload.payload.images[0].name
      const newData = {
        name: formBiodata.name,
        photo: logo,
        gender: formBiodata.gender,
        place_of_birth: formBiodata.place_of_birth,
        date_of_birth: formBiodata.date_of_birth
      }
      updateProfile(newData)
      this.setState({ submitting: false })
    }
    if (!statusUpdateProfile.isLoading) {
      switch (statusUpdateProfile.status) {
        case Status.SUCCESS: {
          this.setState({ submitting: false })
          const newNotification = { notification }
          newNotification.notification['status'] = true
          newNotification.notification['message'] = statusUpdateProfile.message
          newNotification.notification['color'] = 'is-success'
          this.setState(newNotification)
          break
        }
        case Status.OFFLINE :
        case Status.FAILED : {
          this.setState({ submitting: false })
          const newNotif = { notification }
          newNotif.notification['status'] = true
          newNotif.notification['message'] = statusUpdateProfile.message
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

  renderModalPlaceOfBirth () {
    const { searchDistrict, districts, modalPlaceOfBirth } = this.state
    let filteredData = districts.districts.filter((x) => {
      let regex = new RegExp(searchDistrict.name, 'gi')
      return regex.test(x.name)
    })
    return (
      <div
        className='modal modal-filter modal-dropship'
        style={{ display: modalPlaceOfBirth ? 'block' : 'none' }}>
        <div className='modal-background' />
        <div className='modal-card'>
          <header className='modal-card-head'>
            <p className='modal-card-title'>Pilih Kota Kelahiran</p>
            <button className='delete icon-close' onClick={(e) => this.handleModalPOB(e)} />
          </header>
          <section className='section is-paddingless'>
            <div className='field search-form paddingless'>
              <p className='control has-icons-left'>
                <input
                  className='input is-medium'
                  type='text'
                  placeholder='Cari kabupaten / kota'
                  value={searchDistrict.name}
                  onChange={(e) => this.handleSearchDistrict(e)} />
                <span className='icon is-left'>
                  <span className='icon-search black' />
                </span>
              </p>
            </div>
          </section>
          <div className='modal-card-body'>
            <ul className='list-city'>
              {filteredData.map(district => {
                return (
                  <li
                    key={district.id}
                    onClick={(e) => this.handlePOB(e, district)}>
                    {district.name}
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </div>
    )
  }

  render () {
    const { formBiodata, searchDistrict, notification, submitting } = this.state
    let photoOrIcon
    if (formBiodata.photo !== '') {
      photoOrIcon = formBiodata.photo
    } else {
      photoOrIcon = Images.iconCamera
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
          <Dropzone
            style={{}}
            accept='image/jpeg, image/png'
            onDrop={this.onDrop.bind(this)}>
            <div className='photo-content has-text-centered margin-top'>
              <div className='photo'>
                <img style={{marginTop: formBiodata.photo.hasOwnProperty('preview') ? '0px' : '20px'}}
                  src={formBiodata.photo.hasOwnProperty('preview') ? formBiodata.photo.preview : photoOrIcon} alt='komuto' />
              </div>
            </div>
            <p className='has-text-centered'>
              <a>Ganti Foto Profil</a>
              {this.renderValidation('photo', 'Foto harus di upload')}
            </p>
          </Dropzone>
          <form className='form edit'>
            <div className='edit-data-delivery bg-white'>
              <div className='field'>
                <label className='label'>Nama Lengkap</label>
                <p className='control'>
                  <input
                    name='name'
                    className='input'
                    type='text'
                    placeholder='Nama Lengkap'
                    value={formBiodata.name}
                    onChange={(e) => this.handleInput(e)} />
                </p>
                {this.renderValidation('name', 'Mohon isi nama lengkap anda')}
              </div>
              <div className='field'>
                <label className='label'>Gender</label>
                <p className='control' onChange={(e) => this.handleInput(e)}>
                  <label
                    className={`radio blue-color ${formBiodata.gender === 'male' && 'checked'}`}>
                    <input
                      type='radio'
                      name='gender'
                      value='male'
                      />
                    Pria
                  </label>
                  <label
                    className={`radio blue-color ${formBiodata.gender === 'female' && 'checked'}`}>
                    <input
                      type='radio'
                      name='gender'
                      value='female' />
                    Wanita
                  </label>
                </p>
                {this.renderValidation('gender', 'Mohon pilih gender anda')}
              </div>
              <div className='field'>
                <p className='control detail-address' onClick={(e) => this.handleModalPOB(e)}>
                  <span className='location-label modal-button'>
                    { searchDistrict.selected !== null && searchDistrict.selected.length > 0 ? searchDistrict.selected : 'Tempat Lahir Anda' }
                  </span>
                </p>
                {this.renderValidation('place_of_birth', 'Mohon isi tempat lahir anda')}
              </div>
              <div className='field'>
                <p className='control detail-address'>
                  <DatePicker
                    value={this.state.time}
                    isOpen={this.state.isOpen}
                    onSelect={(e) => this.handleSelect(e)}
                    onCancel={(e) => this.handleCancel(e)}
                    confirmText='Set Tanggal Lahir'
                    cancelText='Batal' />
                  <span className='location-label js-option' onClick={(e) => this.handleCancel(e)}>
                    {!formBiodata.date_of_birth ? 'Tanggal Anda' : moment.unix(formBiodata.date_of_birth).format('DD-MM-YYYY')}
                  </span>
                </p>
                {this.renderValidation('date_of_birth', 'Mohon pilih tanggal lahir anda')}
              </div>
              <div className='field'>
                <a
                  className={`button is-primary is-large is-fullwidth ${submitting && 'is-loading'}`}
                  onClick={(e) => this.postUpdateProfile(e)}>Simpan Perubahan
                </a>
              </div>
            </div>
          </form>
        </section>
        {this.renderModalPlaceOfBirth()}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    profile: state.profile,
    upload: state.upload,
    districts: state.districts,
    statusUpdateProfile: state.updateProfile
  }
}

const mapDispatchToProps = dispatch => ({
  photoUpload: (params) => dispatch(actionTypes.photoUpload({data: params})),
  getDistrict: () => dispatch(actionLocationTypes.getDistrict()),
  updateProfile: (params) => dispatch(actionUserTypes.updateProfile(params)),
  getProfile: () => dispatch(actionUserTypes.getProfile())
})

export default connect(mapStateToProps, mapDispatchToProps)(ManageBiodata)
