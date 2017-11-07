// @flow
import React from 'react'
import { connect } from 'react-redux'
import Dropzone from 'react-dropzone'
import DatePicker from 'react-mobile-datepicker'
import moment from 'moment'
import Router from 'next/router'
// components
import Notification from '../../Components/Notification'
import NProgress from 'nprogress'
// import {Images} from '../../Themes'
// actions
import * as actionTypes from '../../actions/stores'
import * as actionUserTypes from '../../actions/user'
import * as actionLocationTypes from '../../actions/location'
import FormData from 'form-data'

moment.locale('id')

class ManageBiodata extends React.Component {
  constructor (props) {
    super(props)
    let name = props.profile.isFound ? props.profile.user.name : ''
    let photo = props.profile.isFound ? props.profile.user.photo : ''
    let gender = props.profile.isFound ? props.profile.user.gender : ''
    let pob = props.profile.isFound ? props.profile.user.place_of_birth_id : ''
    let dob = props.profile.isFound ? props.profile.user.date_of_birth : ''
    let selected = props.profile.isFound ? props.profile.user.place_of_birth : ''
    this.state = {
      profile: props.profile,
      formBiodata: {
        name,
        photo,
        gender,
        place_of_birth: pob,
        date_of_birth: dob
      },
      searchDistrict: {
        name: '',
        selected
      },
      districts: props.districts,
      modalPlaceOfBirth: false,
      submiting: false,
      uploading: false,
      validation: false,
      notification: {
        type: 'is-success',
        status: false,
        message: 'Error, default message.'
      },
      time: new Date(),
      isOpen: false
    }
    this.convertToForm = false
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
    newFormBiodata.formBiodata['date_of_birth'] = moment(times).format('YYYY-MM-DD')
    newTime.time = times
    newIsOpen.isOpen = false
    this.setState({ ...newFormBiodata, ...newTime, ...newIsOpen })
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
    let photoRequired = type === 'photo' && (photo !== '')
    let nameRequired = type === 'name' && nameUser !== ''
    let genderRequired = type === 'gender' && gender !== ''
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
    let nameRequired = nameUser !== ''
    let genderRequired = gender !== ''
    let pobRequired = !!placeOfBirth !== null
    let dobRequired = dateOfBirth !== null
    let isValid = photoRequired && nameRequired && genderRequired && pobRequired && dobRequired
    if (isValid) {
      this.setState({ validation: false })
      if (formBiodata.photo.hasOwnProperty('preview')) {
        this.setState({ uploading: true }, () => {
          if (this.state.uploading) {
            this.handleUploadImage()
          }
        })
      } else {
        this.setState({ submiting: true }, () => {
          if (this.state.submiting) {
            this.processUpdateUser()
          }
        })
      }
    } else {
      this.setState({ validation: true })
    }
  }

  processUpdateUser () {
    const { formBiodata } = this.state
    let photo = formBiodata.photo
    let splitPhoto = photo.split('/')
    let photoFix = splitPhoto[splitPhoto.length - 1]
    const newState = { formBiodata }
    newState.formBiodata['photo'] = photoFix
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

  componentDidMount () {
    const { districts } = this.state
    if (!this.props.isFound(districts)) {
      this.props.getDistrict()
    }
    NProgress.start()
    this.props.getProfileManage()
    this.convertToForm = true
  }

  componentWillReceiveProps (nextProps) {
    const { districts, upload, statusUpdateProfile, profile } = nextProps
    const { formBiodata, submiting, uploading, searchDistrict } = this.state
    const { isFetching, isFound, isError, notifError } = this.props
    if (!isFetching(profile) && this.convertToForm) {
      this.convertToForm = false
      NProgress.done()
      if (isFound(profile)) {
        const newState = { formBiodata, profile: profile, searchDistrict }
        newState.formBiodata['name'] = profile.user.name
        newState.formBiodata['photo'] = profile.user.photo
        newState.formBiodata['gender'] = profile.user.gender
        newState.formBiodata['place_of_birth'] = profile.user.place_of_birth_id
        newState.formBiodata['date_of_birth'] = profile.user.date_of_birth
        newState.searchDistrict['selected'] = profile.user.place_of_birth
        this.setState(newState)
      }
      if (isError(profile)) {
        this.setState({ notification: notifError(profile.message) })
      }
    }
    if (!isFetching(districts)) {
      if (isFound(districts)) {
        this.setState({ districts })
      }
      if (isError(districts)) {
        this.setState({ notification: notifError(districts.message) })
      }
    }
    if (!isFetching(upload) && uploading) {
      this.setState({ uploading: false })
      if (isFound(upload)) {
        const logo = upload.payload.images[0].name
        const newData = {
          name: formBiodata.name,
          photo: logo,
          gender: formBiodata.gender,
          place_of_birth: formBiodata.place_of_birth,
          date_of_birth: formBiodata.date_of_birth
        }
        this.setState({ submiting: true }, () => {
          if (this.state.submiting) {
            this.props.updateProfile(newData)
          }
        })
      }
      if (isError(upload)) {
        this.setState({ notification: notifError(upload.message) })
      }
    }
    if (!isFetching(statusUpdateProfile) && submiting) {
      this.setState({ submiting: false })
      const href = `/manage-account?isSuccess`
      const as = 'manage-account'
      Router.push(href, as, { shallow: true })
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
    console.log('state', this.state)
    const { formBiodata, searchDistrict, notification, submiting, uploading, isOpen, time } = this.state
    let timeValue = formBiodata.date_of_birth ? new Date(formBiodata.date_of_birth) : time
    return (
      <div>
        <Notification
          type={notification.type}
          isShow={notification.status}
          activeClose
          onClose={() => this.setState({notification: {status: false, message: ''}})}
          message={notification.message} />
        <section className='section is-paddingless'>
          <div className='upload-pict'>
            <Dropzone
              style={{}}
              accept='image/jpeg, image/png'
              onDrop={this.onDrop.bind(this)}>
              {
                (typeof formBiodata.photo === 'object') && <div className='pict-wrapper' style={{ backgroundImage: `url(${formBiodata.photo.preview})`, backgroundPosition: 'center', backgroundSize: 'cover', marginBottom: '20px' }} />
              }
              {
                (typeof formBiodata.photo !== 'object') &&
                  <div className='photo-content has-text-centered margin-top' style={{ marginTop: 0 }}>
                    <div className='photo'>
                      <img src={typeof formBiodata.photo === 'object' ? formBiodata.photo.preview : formBiodata.photo} alt='komuto' />
                    </div>
                  </div>
              }
              <p className='has-text-centered'>
                <a>Ganti Foto Profil</a>
                {this.renderValidation('photo', 'Foto harus di upload')}
              </p>
            </Dropzone>
          </div>
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
                    { searchDistrict.selected ? searchDistrict.selected : 'Tempat Lahir Anda' }
                  </span>
                </p>
                {this.renderValidation('place_of_birth', 'Mohon isi tempat lahir anda')}
              </div>
              <div className='field'>
                <p className='control detail-address'>
                  <DatePicker
                    value={timeValue}
                    isOpen={isOpen}
                    onSelect={(e) => this.handleSelect(e)}
                    onCancel={(e) => this.handleCancel(e)}
                    confirmText='Set Tanggal Lahir'
                    cancelText='Batal' />
                  <span className='location-label js-option' onClick={(e) => this.handleCancel(e)}>
                    {!formBiodata.date_of_birth ? 'Tanggal Anda' : moment(formBiodata.date_of_birth).format('DD-MM-YYYY')}
                  </span>
                </p>
                {this.renderValidation('date_of_birth', 'Mohon pilih tanggal lahir anda')}
              </div>
              <div className='field'>
                <a
                  className={`button is-primary is-large is-fullwidth ${(submiting || uploading) && 'is-loading'}`}
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
  getProfileManage: () => dispatch(actionUserTypes.getProfileManage())
})

export default connect(mapStateToProps, mapDispatchToProps)(ManageBiodata)
