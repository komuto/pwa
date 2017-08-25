// @flow
import React from 'react'
import { connect } from 'react-redux'
// components
import Router from 'next/router'
// import Loading from '../Components/Loading'
import Notification from '../Components/Notification'
// actions
import * as actionLocationTypes from '../actions/location'
import * as actionAddressTypes from '../actions/address'
import * as actionStoreTypes from '../actions/stores'
import * as actionExpeditionTypes from '../actions/expedition'
// validation
import { inputNumber } from '../Validations/Input'
// services
import { Status } from '../Services/Status'

class AddressInfo extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
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
      formAdress: {
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
      notification: {
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
    const { formAdress } = this.state
    const newState = { formAdress }
    if (name === 'postal_code') {
      newState.formAdress[name] = inputNumber(value)
    } else {
      newState.formAdress[name] = value
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
    const { formAdress, provinces, districts, subdistricts, villages } = this.state
    const newAddress = { formAdress }
    newAddress.formAdress['address'] = address.address
    newAddress.formAdress['province_id'] = address.province.id.toString()
    newAddress.formAdress['district_id'] = address.district.id.toString()
    newAddress.formAdress['sub_district_id'] = address.subDistrict.id.toString()
    newAddress.formAdress['village_id'] = address.village.id.toString()
    newAddress.formAdress['postal_code'] = address.postal_code
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
    const { formAdress, validation } = this.state
    let provinceId = formAdress.province_id
    let districtId = formAdress.district_id
    let subDistrictId = formAdress.sub_district_id
    let villageId = formAdress.village_id
    let address = formAdress.address
    let postalCode = formAdress.postal_code
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

  componentWillMount () {
    const { provinces, listAddress, expeditions } = this.state
    const { getListAddress, getProvince, getExpedition } = this.props
    if (provinces.data.provinces.length === 0) {
      getProvince()
    }
    if (listAddress.address.length === 0) {
      getListAddress()
    }
    if (expeditions.expeditions.length === 0) {
      getExpedition()
    }
  }

  submitAddressInfo (e) {
    e.preventDefault()
    const { formAdress, submitting } = this.state
    let provinceId = formAdress.province_id
    let districtId = formAdress.district_id
    let subDistrictId = formAdress.sub_district_id
    let villageId = formAdress.village_id
    let address = formAdress.address
    let postalCode = formAdress.postal_code
    let provinceIdRequired = provinceId.length > 0
    let districtIdRequired = districtId.length > 0
    let subDistrictIdRequired = subDistrictId.length > 0
    let villageIdRequired = villageId.length > 0
    let addressRequired = address.length > 0
    let postalCodeRequired = postalCode.length > 0
    let isValid = provinceIdRequired && districtIdRequired && subDistrictIdRequired && villageIdRequired && addressRequired && postalCodeRequired
    if (isValid) {
      const newSubmitting = { submitting }
      newSubmitting.submitting = true
      this.setState(newSubmitting)
      this.setState({ validation: false })
      this.proccessCreateStore()
    } else {
      this.setState({ validation: true })
    }
  }

  proccessCreateStore () {
    const { expeditions, formAdress } = this.state
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
      newExpedition.push({expedition_service_id: idService, status: +isSelected})
    })
    // data address
    const newAddress = [
      Number.parseInt(formAdress.province_id), Number.parseInt(formAdress.district_id),
      Number.parseInt(formAdress.sub_district_id), Number.parseInt(formAdress.village_id),
      profile.user.user.name, profile.user.user.email, profile.user.user.phone_number,
      formAdress.postal_code, formAdress.address
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

  componentWillReceiveProps (nextProps) {
    const { provinces, districts, subdistricts, villages } = this.state
    if (nextProps.provinces.status === 200) {
      const newProvince = { provinces }
      newProvince.provinces['data'] = nextProps.provinces
      this.setState(newProvince)
    }
    if (nextProps.districts.status === 200) {
      const newDistrict = { districts }
      newDistrict.districts['data'] = nextProps.districts
      this.setState(newDistrict)
    }
    if (nextProps.subdistricts.status === 200) {
      const newSubdistrict = { subdistricts }
      newSubdistrict.subdistricts['data'] = nextProps.subdistricts
      this.setState(newSubdistrict)
    }
    if (nextProps.villages.status === 200) {
      const newVillage = { villages }
      newVillage.villages['data'] = nextProps.villages
      this.setState(newVillage)
    }
    if (nextProps.districts.isLoading) {
      const resetSubdistricts = { subdistricts }
      resetSubdistricts.subdistricts.data['subdistricts'] = []
      const resetVillages = { villages }
      resetVillages.villages.data['villages'] = []
      this.setState(resetSubdistricts)
      this.setState(resetVillages)
    }
    if (nextProps.subdistricts.isLoading) {
      const resetVillages = { villages }
      resetVillages.villages.data['villages'] = []
      this.setState(resetVillages)
    }
    this.setState({ listAddress: nextProps.listAddress })
    const { store } = nextProps
    if (!store.isLoading) {
      let { notification } = this.state
      notification = {status: false, message: 'Error, default message.'}
      switch (store.status) {
        case Status.SUCCESS:
          this.setState({ submitting: false })
          Router.push('/has-opened-store')
          break
        case Status.OFFLINE :
        case Status.FAILED :
          notification = {status: true, message: store.message}
          this.setState({ submitting: false })
          break
        default:
          break
      }
      this.setState({ notification })
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

  render () {
    const { formAdress, provinces, districts, subdistricts, villages, notification, submitting } = this.state
    return (
      <div>
        <Notification
          type='is-danger'
          isShow={notification.status}
          activeClose
          onClose={() => this.setState({notification: {status: false, message: ''}})}
          message={notification.message}
          />
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
                  value={formAdress.address}
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
                    value={formAdress.province_id}
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
                    value={formAdress.district_id}
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
                    value={formAdress.sub_district_id}
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
                    value={formAdress.village_id}
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
                  value={formAdress.postal_code}
                  onChange={(e) => this.handleAddress(e)} />
                <br />{this.renderValidation('postal_code', 'Mohon isi kode pos anda')}
              </p>
            </div>
            <div className='field'>
              <p className='control'>
                <button
                  className={`button is-primary is-large is-fullwidth ${submitting && 'is-loading'}`}
                  onClick={(e) => this.submitAddressInfo(e)}>Lanjutkan
                </button>
                {/* <Loading
                  size={12}
                  color='#ef5656'
                  type=''
                  className='is-fullwidth has-text-centered' />
                */}
              </p>
            </div>
          </div>
        </section>
        {this.showAddAddress()}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    store: state.createStore,
    processCreateStore: state.processCreateStore,
    profile: state.profile,
    listAddress: state.listAddress,
    // location
    provinces: state.provinces,
    districts: state.districts,
    subdistricts: state.subdistricts,
    villages: state.villages,
    expeditions: state.expeditions
  }
}

const mapDispatchToProps = dispatch => ({
  getListAddress: () => dispatch(actionAddressTypes.getListAddress()),
  getProvince: () => dispatch(actionLocationTypes.getProvince()),
  getDistrict: (params) => dispatch(actionLocationTypes.getDistrict(params)),
  getSubDistrict: (params) => dispatch(actionLocationTypes.getSubDistrict(params)),
  getVillage: (params) => dispatch(actionLocationTypes.getVillage(params)),
  AddressInfo: (params) => dispatch(actionStoreTypes.AddressInfo(params)),
  postExpedition: (params) => dispatch(actionStoreTypes.shippingExpedition(params)),
  createStore: (params) => dispatch(actionStoreTypes.createStore(params)),
  getExpedition: () => dispatch(actionExpeditionTypes.getExpedition())
})

export default connect(mapStateToProps, mapDispatchToProps)(AddressInfo)
