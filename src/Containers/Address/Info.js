// @flow
import React from 'react'
import { connect } from 'react-redux'
// components
import Router from 'next/router'
// import Loading from '../Components/Loading'
import NProgress from 'nprogress'
import Notification from '../../Components/Notification'
// actions
import * as actionLocationTypes from '../../actions/location'
import * as actionAddressTypes from '../../actions/address'
import * as actionStoreTypes from '../../actions/stores'
import * as actionExpeditionTypes from '../../actions/expedition'
// validation
import { inputNumber } from '../../Validations/Input'

class AddressInfo extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      storeAddress: props.storeAddress,
      expeditions: props.expeditions,
      listAddress: props.listAddress,
      provinces: {
        data: props.provinces,
        selected: null
      },
      districts: {
        data: props.districts,
        selected: null
      },
      subdistricts: {
        data: props.subdistricts,
        selected: null
      },
      villages: {
        data: props.villages,
        selected: null
      },
      formAddress: {
        province_id: '',
        district_id: '',
        sub_district_id: '',
        village_id: '',
        address: '',
        postal_code: ''
      },
      submitting: false,
      showAddress: false,
      validation: false,
      fetchingFirst: false,
      showVerified: false,
      notification: {
        type: 'is-success',
        status: false,
        message: 'Error, default message.'
      }
    }
  }

  handleAddress (e) {
    e.preventDefault()
    const { provinces, districts, subdistricts, villages } = this.state
    const { getDistrict, getSubDistrict, getVillage } = this.props
    const { name, value } = e.target
    const { formAddress } = this.state
    const newState = { formAddress }
    if (name === 'postal_code') {
      newState.formAddress[name] = inputNumber(value)
    } else {
      newState.formAddress[name] = value
    }
    this.setState(newState)
    // set location
    switch (name) {
      case 'province_id':
        const newProvince = { provinces }
        newProvince.provinces['selected'] = value
        const newDistrict = { districts }
        newDistrict.districts['selected'] = value
        this.setState(newProvince)
        this.setState(newDistrict)
        getDistrict({ province_id: value })
        break
      case 'district_id':
        const newSubdistrict = { subdistricts }
        newSubdistrict.subdistricts['selected'] = value
        this.setState(newSubdistrict)
        getSubDistrict({ district_id: value })
        break
      case 'sub_district_id':
        const newVillages = { villages }
        newVillages.villages['selected'] = value
        this.setState(newVillages)
        getVillage({ sub_district_id: value })
        break
      default:
        break
    }
  }

  submitAddressToForm (e, address) {
    e.preventDefault()
    const { formAddress, provinces, districts, subdistricts, villages } = this.state
    const newAddress = { formAddress }
    newAddress.formAddress['address'] = address.address
    newAddress.formAddress['province_id'] = address.province.id.toString()
    newAddress.formAddress['district_id'] = address.district.id.toString()
    newAddress.formAddress['sub_district_id'] = address.subDistrict.id.toString()
    newAddress.formAddress['village_id'] = address.village.id.toString()
    newAddress.formAddress['postal_code'] = address.postal_code
    this.setState(newAddress)
    const newProvince = { provinces }
    newProvince.provinces.data['provinces'] = [address.province]
    newProvince.provinces['selected'] = address.province.id
    this.setState(newProvince)
    const newDistrict = { districts }
    newDistrict.districts.data['districts'] = [address.district]
    newDistrict.districts['selected'] = address.district.id
    this.setState(newDistrict)
    const newSubdistrict = { subdistricts }
    newSubdistrict.subdistricts.data['subdistricts'] = [address.subDistrict]
    newSubdistrict.subdistricts['selected'] = address.subDistrict.id
    this.setState(newSubdistrict)
    const newVillage = { villages }
    newVillage.villages.data['villages'] = [address.village]
    newVillage.villages['selected'] = address.village.id
    this.setState(newVillage)
    this.handleGetAddress()
  }

  renderValidation (name, textFailed) {
    const { formAddress, validation } = this.state
    let provinceId = formAddress.province_id.toString()
    let districtId = formAddress.district_id.toString()
    let subDistrictId = formAddress.sub_district_id.toString()
    let villageId = formAddress.village_id.toString()
    let address = formAddress.address
    let postalCode = formAddress.postal_code
    let provinceIdRequired = name === 'province_id' && provinceId.length > 0
    let districtIdRequired = name === 'district_id' && districtId.length > 0
    let subDistrictIdRequired = name === 'sub_district_id' && subDistrictId.length > 0
    let villageIdRequired = name === 'village_id' && villageId.length > 0
    let addressRequired = name === 'address' && address.length > 0
    let postalCodeRequired = name === 'postal_code' && postalCode.length > 0
    let result = provinceIdRequired || districtIdRequired || subDistrictIdRequired || villageIdRequired || addressRequired || postalCodeRequired
    return (
      <span style={{color: result ? '#23d160' : '#ef5656',
        display: validation ? 'block' : 'none',
        letterSpacing: '0.2px'}} >
        {result ? '' : textFailed}
      </span>
    )
  }

  handleGetAddress () {
    this.setState({ showAddress: !this.state.showAddress })
  }

  submitAddressInfo (e) {
    e.preventDefault()
    const { formAddress, submitting } = this.state
    const { query } = this.props
    let provinceId = formAddress.province_id.toString()
    let districtId = formAddress.district_id.toString()
    let subDistrictId = formAddress.sub_district_id.toString()
    let villageId = formAddress.village_id.toString()
    let address = formAddress.address
    let postalCode = formAddress.postal_code
    let provinceIdRequired = provinceId.length > 0
    let districtIdRequired = districtId.length > 0
    let subDistrictIdRequired = subDistrictId.length > 0
    let villageIdRequired = villageId.length > 0
    let addressRequired = address.length > 0
    let postalCodeRequired = postalCode.length > 0
    let isValid = provinceIdRequired && districtIdRequired && subDistrictIdRequired && villageIdRequired && addressRequired && postalCodeRequired
    if (isValid) {
      const isSetting = this.props.hasOwnProperty('query') && query.type === 'settingStore'
      const newSubmitting = { submitting, validation: false }
      newSubmitting.submitting = true
      this.setState(newSubmitting)
      isSetting ? this.updateAddress() : this.proccessCreateStore()
    } else {
      this.setState({ validation: true })
    }
  }

  updateAddress () {
    const { formAddress } = this.state
    const newAddress = {
      province_id: Number.parseInt(formAddress.province_id),
      district_id: Number.parseInt(formAddress.district_id),
      sub_district_id: Number.parseInt(formAddress.sub_district_id),
      village_id: Number.parseInt(formAddress.village_id),
      address: formAddress.address,
      postal_code: formAddress.postal_code
    }
    this.props.updateStoreAddress(newAddress)
  }

  proccessCreateStore () {
    const { expeditions, formAddress } = this.state
    const { processCreateStore, profile, createStore } = this.props
    // data expedition
    const dataServices = []
    expeditions.expeditions.map(expedition => {
      return expedition.services.map(service => {
        return dataServices.push(service.id)
      })
    })
    let newExpedition = []
    dataServices.map(idService => {
      let isSelected = processCreateStore.expedition_services.selectedServices.filter((Id) => {
        return Id === idService
      }).length > 0
      let statusSelected = isSelected ? 1 : 2
      newExpedition.push({expedition_service_id: idService, status: statusSelected})
    })
    // data address
    const newAddress = [
      Number.parseInt(formAddress.province_id), Number.parseInt(formAddress.district_id),
      Number.parseInt(formAddress.sub_district_id), Number.parseInt(formAddress.village_id),
      profile.user.user.name, profile.user.user.email, profile.user.user.phone_number,
      formAddress.postal_code, formAddress.address
    ]
    // data store
    const newStore = [
      processCreateStore.store.name,
      processCreateStore.store.slogan,
      processCreateStore.store.description,
      processCreateStore.store.logo
    ]
    // data user
    const newUser = [
      processCreateStore.user.id_number,
      processCreateStore.user.mother_name
    ]

    const dataCreateStore = {
      address: newAddress,
      expedition_services: newExpedition,
      store: newStore,
      user: newUser
    }
    createStore(dataCreateStore)
  }

  componentDidMount () {
    const { districts, subdistricts, villages, listAddress, expeditions, storeAddress, formAddress } = this.state
    const { getListAddress, getProvince, getExpedition, getStoreAddress, query, isFound } = this.props
    getProvince()
    if (!isFound(listAddress)) {
      getListAddress()
    }
    if (!isFound(expeditions)) {
      getExpedition()
    }
    if (this.props.hasOwnProperty('query') && query.type === 'settingStore') {
      if (!isFound(storeAddress)) {
        NProgress.start()
        this.setState({ fetchingFirst: true }, () => {
          if (this.state.fetchingFirst) {
            getStoreAddress()
          }
        })
      } else {
        const newState = { formAddress }
        newState.formAddress['province_id'] = storeAddress.storeAddress.province.id
        newState.formAddress['district_id'] = storeAddress.storeAddress.district.id
        newState.formAddress['sub_district_id'] = storeAddress.storeAddress.subDistrict.id
        newState.formAddress['village_id'] = storeAddress.storeAddress.village.id
        newState.formAddress['address'] = storeAddress.storeAddress.address
        newState.formAddress['postal_code'] = storeAddress.storeAddress.postal_code
        this.setState(newState)
        if (!isFound(districts.data)) {
          this.props.getDistrict({ province_id: formAddress.province_id })
        }
        if (!isFound(subdistricts.data)) {
          this.props.getSubDistrict({ district_id: formAddress.district_id })
        }
        if (!isFound(villages.data)) {
          this.props.getVillage({ sub_district_id: formAddress.sub_district_id })
        }
      }
    }
  }

  componentWillReceiveProps (nextProps) {
    const { formAddress, provinces, districts, subdistricts, villages, submitting, fetchingFirst } = this.state
    const { store, listAddress, storeAddress, statusUpdateStoreAddress } = nextProps
    const { isFetching, isFound, isError, notifError } = this.props
    if (!isFetching(nextProps.provinces)) {
      if (isFound(nextProps.provinces)) {
        const newProvince = { provinces }
        newProvince.provinces['data'] = nextProps.provinces
        this.setState(newProvince)
      }
      if (isError(nextProps.provinces)) {
        this.setState({ notification: notifError(nextProps.provinces.message) })
      }
    }
    if (!isFetching(nextProps.districts)) {
      if (isFound(nextProps.districts)) {
        const newDistrict = { districts }
        newDistrict.districts['data'] = nextProps.districts
        this.setState(newDistrict)
      }
      if (isError(nextProps.districts)) {
        this.setState({ notification: notifError(nextProps.districts.message) })
      }
    }
    if (!isFetching(nextProps.subdistricts)) {
      if (isFound(nextProps.subdistricts)) {
        const newSubdistrict = { subdistricts }
        newSubdistrict.subdistricts['data'] = nextProps.subdistricts
        this.setState(newSubdistrict)
      }
      if (isError(nextProps.subdistricts)) {
        this.setState({ notification: notifError(nextProps.subdistricts.message) })
      }
    }
    if (!isFetching(nextProps.villages)) {
      if (isFound(nextProps.villages)) {
        const newVillage = { villages }
        newVillage.villages['data'] = nextProps.villages
        this.setState(newVillage)
      }
      if (isError(nextProps.villages)) {
        this.setState({ notification: notifError(nextProps.villages.message) })
      }
    }
    if (isFetching(nextProps.districts)) {
      const resetSubdistricts = { subdistricts }
      resetSubdistricts.subdistricts.data['subdistricts'] = []
      const resetVillages = { villages }
      resetVillages.villages.data['villages'] = []
      this.setState(resetSubdistricts)
      this.setState(resetVillages)
    }
    if (isFetching(nextProps.subdistricts)) {
      const resetVillages = { villages }
      resetVillages.villages.data['villages'] = []
      this.setState(resetVillages)
    }
    if (!isFetching(listAddress)) {
      if (isFound(listAddress)) {
        this.setState({ listAddress })
      }
      if (isError(listAddress)) {
        this.setState({ notification: notifError(listAddress.message) })
      }
    }
    if (!isFetching(storeAddress) && fetchingFirst) {
      this.setState({ fetchingFirst: false })
      if (isFound(storeAddress)) {
        this.setState({ storeAddress })
        const newState = { formAddress }
        newState.formAddress['id'] = storeAddress.storeAddress.id
        newState.formAddress['province_id'] = storeAddress.storeAddress.province.id
        newState.formAddress['district_id'] = storeAddress.storeAddress.district.id
        newState.formAddress['sub_district_id'] = storeAddress.storeAddress.subDistrict.id
        newState.formAddress['village_id'] = storeAddress.storeAddress.village.id
        newState.formAddress['address'] = storeAddress.storeAddress.address
        newState.formAddress['postal_code'] = storeAddress.storeAddress.postal_code
        this.setState(newState)
        if (!districts.data.isFound) {
          this.props.getDistrict({ province_id: formAddress.province_id })
        }
        if (!subdistricts.data.isFound) {
          this.props.getSubDistrict({ district_id: formAddress.district_id })
        }
        if (!villages.data.isFound) {
          this.props.getVillage({ sub_district_id: formAddress.sub_district_id })
        }
        NProgress.done()
      }
      if (isError(storeAddress)) {
        this.setState({ notification: notifError(storeAddress.message) })
      }
    }
    if (!isFetching(store) && submitting) {
      this.setState({ submitting: false })
      if (isFound(store)) {
        Router.push('/has-opened-store')
      }
      if (isError(store)) {
        this.setState({ notification: notifError(store.message) })
      }
    }
    if (!isFetching(statusUpdateStoreAddress) && submitting) {
      this.setState({ submitting: false })
      if (isFound(store)) {
        this.setState({ showVerified: true })
      }
      if (isError(store)) {
        Router.push(`/address-data?isSuccess`)
      }
    }
  }

  showAddAddress () {
    const { showAddress, listAddress } = this.state
    return (
      <div className='sort-option' style={{ display: showAddress && 'block' }} >
        <div className='sort-list'>
          <p>
            <strong>Pilih Alamat</strong>
            <strong onClick={() => this.handleGetAddress()} style={{float: 'right'}}>X</strong>
          </p>
          <form action='#' className='form'>
            <div className='field'>
              <div className='control popup-option'>
                { listAddress.address.map((value, index) => {
                  return (
                    <label
                      className='radio'
                      key={index}
                      onClick={(e) => this.submitAddressToForm(e, value)}>
                      <span className='opt-title'>{value.alias_address}</span>
                      <span className='address-value'>{value.address}</span>
                    </label>
                  )
                })}
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  }

  handleButton () {
    const { submitting } = this.state
    const { query } = this.props
    const isSetting = this.props.hasOwnProperty('query') && query.type === 'settingStore'
    return (
      <button
        className={`button is-primary is-large is-fullwidth ${submitting ? 'is-loading' : ''}`}
        onClick={(e) => this.submitAddressInfo(e)} >
        { isSetting ? 'Simpan Perubahan' : 'Lanjutkan'}
      </button>
    )
  }

  showModalVerified () {
    const { showVerified } = this.state
    return (
      <div className='sort-option' style={{display: showVerified && 'block'}}>
        <div className='notif-report'>
          <h3>Alamat berhasil diubah. Kami akan mengirim kode Verifikasi ke alamat baru Anda.</h3>
          <p>Dengan mengubah Alamat, status toko Anda menjadi tidak terverifikasi sampai Anda memasukkan kode verifikasi yang akan kami kirimkan ke alamat baru Anda</p>
          <button
            className='button is-primary is-large is-fullwidth'
            onClick={() => this.closeModalVerified()}>
            Tutup
          </button>
        </div>
      </div>
    )
  }

  closeModalVerified () {
    this.setState({ showVerified: false })
    Router.push(`/address-data?isSuccess`)
  }

  render () {
    const { formAddress, provinces, districts, subdistricts, villages, notification } = this.state
    return (
      <div>
        <Notification
          type={notification.type}
          isShow={notification.status}
          activeClose
          onClose={() => this.setState({notification: {status: false, message: ''}})}
          message={notification.message} />
        <section className='section is-paddingless'>
          <div className='seller-bar'>
            <div className='seller-step active4'>
              <div className='step1'><span>1</span></div>
              <div className='step2'><span>2</span></div>
              <div className='step3'><span>3</span></div>
              <div className='step4'><span>4</span></div>
            </div>
          </div>
          <div className='form-seller info'>
            <a
              className='btn-address js-option'
              data-target='#addressOption'
              onClick={() => this.handleGetAddress()} >
              Ambil dari Alamat Yang ada
              <span className='icon-arrow-right'>{}</span>
            </a>
            <div className='field'>
              <label>Alamat Lengkap</label>
              <p className='control'>
                <input
                  type='text'
                  name='address'
                  className='input'
                  value={formAddress.address}
                  onChange={(e) => this.handleAddress(e)} />
                <br />{this.renderValidation('address', 'Mohon isi alamat lengkap anda')}
              </p>
            </div>
            <div className='field'>
              <label className='label'>Provinsi</label>
              <p className='control'>
                <span className='select'>
                  <select
                    name='province_id'
                    value={formAddress.province_id}
                    onChange={(e) => this.handleAddress(e)}>
                    <option disabled='disabled' value=''>Pilih Provinsi </option>
                    { provinces.data.provinces.map((province, index) => {
                      return (
                        <option
                          value={province.id}
                          key={index}>
                          {province.name}
                        </option>
                      )
                    })}
                  </select>
                </span>
                <br />{this.renderValidation('province_id', 'Mohon isi provinsi anda')}
              </p>
            </div>
            <div className='field'>
              <label className='label'>Kota / Kabupaten</label>
              <p className='control'>
                <span className='select'>
                  <select
                    name='district_id'
                    value={formAddress.district_id}
                    onChange={(e) => this.handleAddress(e)}>
                    <option disabled='disabled' value=''>Pilih Kota / Kabupaten </option>
                    { districts.data.districts.map((district, index) => {
                      return (
                        <option
                          value={district.id}
                          key={index}>
                          {district.name}
                        </option>
                      )
                    })}
                  </select>
                </span>
                <br />{this.renderValidation('district_id', 'Mohon isi kota / kabupaten anda')}
              </p>
            </div>
            <div className='field'>
              <label className='label'>Kecamatan</label>
              <p className='control'>
                <span className='select'>
                  <select
                    name='sub_district_id'
                    value={formAddress.sub_district_id}
                    onChange={(e) => this.handleAddress(e)}>
                    <option disabled='disabled' value=''>Pilih Kecamatan </option>
                    { subdistricts.data.subdistricts.map((subdistrict, index) => {
                      return (
                        <option
                          value={subdistrict.id}
                          key={index}>
                          {subdistrict.name}
                        </option>
                      )
                    })}
                  </select>
                </span>
                <br />{this.renderValidation('sub_district_id', 'Mohon isi kecamatan anda')}
              </p>
            </div>
            <div className='field'>
              <label className='label'>Kelurahan</label>
              <p className='control'>
                <span className='select'>
                  <select
                    name='village_id'
                    value={formAddress.village_id}
                    onChange={(e) => this.handleAddress(e)}>
                    <option disabled='disabled' value=''>Pilih Kelurahan </option>
                    { villages.data.villages.map((village, index) => {
                      return (
                        <option
                          value={village.id}
                          key={index}>
                          {village.name}
                        </option>
                      )
                    })}
                  </select>
                </span>
                <br />{this.renderValidation('village_id', 'Mohon isi kelurahan anda')}
              </p>
            </div>
            <div className='field'>
              <label>Kode Pos</label>
              <p className='control'>
                <input
                  type='text'
                  name='postal_code'
                  className='input'
                  value={formAddress.postal_code}
                  onChange={(e) => this.handleAddress(e)} />
                <br />{this.renderValidation('postal_code', 'Mohon isi kode pos anda')}
              </p>
            </div>
            <div className='field'>
              <p className='control'>
                {this.handleButton()}
              </p>
            </div>
          </div>
        </section>
        {this.showAddAddress()}
        {this.showModalVerified()}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    storeAddress: state.storeAddress,
    store: state.createStore,
    processCreateStore: state.tempCreateStore,
    profile: state.profile,
    listAddress: state.listAddress,
    statusUpdateStoreAddress: state.updateStoreAddress,
    // location
    provinces: state.provinces,
    districts: state.districts,
    subdistricts: state.subdistricts,
    villages: state.villages,
    expeditions: state.expeditions
  }
}

const mapDispatchToProps = dispatch => ({
  getStoreAddress: () => dispatch(actionStoreTypes.getStoreAddress()),
  createStore: (params) => dispatch(actionStoreTypes.createStore(params)),
  updateStoreAddress: (params) => dispatch(actionStoreTypes.updateStoreAddress(params)),
  getListAddress: () => dispatch(actionAddressTypes.getListAddress()),
  getProvince: () => dispatch(actionLocationTypes.getProvince()),
  getDistrict: (params) => dispatch(actionLocationTypes.getDistrict(params)),
  getSubDistrict: (params) => dispatch(actionLocationTypes.getSubDistrict(params)),
  getVillage: (params) => dispatch(actionLocationTypes.getVillage(params)),
  getExpedition: () => dispatch(actionExpeditionTypes.getExpedition())
})

export default connect(mapStateToProps, mapDispatchToProps)(AddressInfo)
