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
// validation
import { inputNumber } from '../Validations/Input'
// services
import { Status } from '../Services/Status'

class AddAddress extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
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
        postal_code: '',
        name: '',
        phone_number: '',
        alias_address: '',
        is_primary: false
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

  setIsPrimary (e) {
    e.preventDefault()
    const { formAddress } = this.state
    let negasi = !formAddress.is_primary
    const newState = { formAddress }
    newState.formAddress['is_primary'] = negasi
    this.setState(newState)
  }

  renderValidation (name, textFailed) {
    const { formAddress, validation } = this.state
    let provinceId = formAddress.province_id
    let districtId = formAddress.district_id
    let subDistrictId = formAddress.sub_district_id
    let villageId = formAddress.village_id
    let address = formAddress.address
    let postalCode = formAddress.postal_code
    let nama = formAddress.name
    let phoneNumber = formAddress.phone_number
    let aliasAddress = formAddress.alias_address
    let provinceIdRequired = name === 'province_id' && provinceId.length > 0
    let districtIdRequired = name === 'district_id' && districtId.length > 0
    let subDistrictIdRequired = name === 'sub_district_id' && subDistrictId.length > 0
    let villageIdRequired = name === 'village_id' && villageId.length > 0
    let nameRequired = name === 'name' && nama.length > 0
    let phoneNumberRequired = name === 'phone_number' && phoneNumber.length > 0
    let aliasAddressRequired = name === 'alias_address' && aliasAddress.length > 0
    let addressRequired = name === 'address' && address.length > 0
    let postalCodeRequired = name === 'postal_code' && postalCode.toString().length > 0
    let result = provinceIdRequired || districtIdRequired || subDistrictIdRequired || villageIdRequired || addressRequired || postalCodeRequired || nameRequired || phoneNumberRequired || aliasAddressRequired
    return (
      <span style={{color: result ? '#23d160' : '#ef5656',
        display: validation ? 'block' : 'none',
        letterSpacing: '0.2px'}} >
        {result ? '' : textFailed}
      </span>
    )
  }

  componentWillMount () {
    const { provinces } = this.state
    const { getProvince } = this.props
    if (provinces.data.provinces.length === 0) {
      getProvince()
    }
  }

  submitAddressInfo (e) {
    e.preventDefault()
    const { formAddress, submitting } = this.state
    let provinceId = formAddress.province_id
    let districtId = formAddress.district_id
    let subDistrictId = formAddress.sub_district_id
    let villageId = formAddress.village_id
    let address = formAddress.address
    let postalCode = formAddress.postal_code
    let nama = formAddress.name
    let phoneNumber = formAddress.phone_number
    let aliasAddress = formAddress.alias_address
    let provinceIdRequired = provinceId.length > 0
    let districtIdRequired = districtId.length > 0
    let subDistrictIdRequired = subDistrictId.length > 0
    let villageIdRequired = villageId.length > 0
    let addressRequired = address.length > 0
    let postalCodeRequired = postalCode.length > 0
    let nameRequired = nama.length > 0
    let phoneNumberRequired = phoneNumber.length > 0
    let aliasAddressRequired = aliasAddress.length > 0
    let isValid = provinceIdRequired && districtIdRequired && subDistrictIdRequired && villageIdRequired && addressRequired && postalCodeRequired && nameRequired && phoneNumberRequired && aliasAddressRequired
    if (isValid) {
      const newSubmitting = { submitting }
      newSubmitting.submitting = true
      this.setState(newSubmitting)
      this.setState({ validation: false })
      this.proccessCreateAddress()
    } else {
      this.setState({ validation: true })
    }
  }

  proccessCreateAddress () {
    const { formAddress } = this.state
    let newData = { formAddress }
    newData.formAddress['province_id'] = Number.parseInt(formAddress.province_id)
    newData.formAddress['district_id'] = Number.parseInt(formAddress.district_id)
    newData.formAddress['sub_district_id'] = Number.parseInt(formAddress.sub_district_id)
    newData.formAddress['village_id'] = Number.parseInt(formAddress.village_id)
    this.setState(newData)
    this.props.addAddress(formAddress)
  }

  componentWillReceiveProps (nextProps) {
    const { provinces, districts, subdistricts, villages, submitting } = this.state
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
    if (!nextProps.statusAddAddress.isLoading && submitting) {
      let { notification } = this.state
      notification = {status: false, message: 'Error, default message.'}
      switch (nextProps.statusAddAddress.status) {
        case Status.SUCCESS:
          this.setState({ submitting: false })
          Router.push('/data-address')
          break
        case Status.OFFLINE :
        case Status.FAILED :
          notification = {status: true, message: nextProps.statusAddAddress.message}
          this.setState({ submitting: false })
          this.setState({ notification })
          break
        default:
          break
      }
    }
    console.log('nextProps', nextProps)
  }

  render () {
    const { formAddress, provinces, districts, subdistricts, villages, notification, submitting } = this.state
    console.log('props ', this.props)
    console.log('state ', this.state)
    return (
      <div>
        <Notification
          type='is-danger'
          isShow={notification.status}
          activeClose
          onClose={() => this.setState({notification: {status: false, message: ''}})}
          message={notification.message}
          />
        <section className='section is-paddingless has-shadow'>
          <div className='container is-fluid'>
            <div className='title'>
              <h3>Info Alamat</h3>
            </div>
          </div>
          <div className='edit-data-delivery bg-white edit'>
            <form className='form edit'>
              <div className='field'>
                <label className='label'>Nama Alias</label>
                <p className='control'>
                  <input
                    className='input'
                    type='text'
                    name='alias_address'
                    value={formAddress.alias_address}
                    onChange={(e) => this.handleAddress(e)} />
                  <span className='eg'>Contoh: Rumah Sendiri, Kantor</span>
                </p>
                {this.renderValidation('alias_address', 'Mohon isi nama alias anda')}
              </div>
              <div className='field'>
                <label className='label'>Nama Penerima</label>
                <p className='control'>
                  <input
                    className='input'
                    type='text'
                    name='name'
                    value={formAddress.name}
                    onChange={(e) => this.handleAddress(e)} />
                </p>
                {this.renderValidation('name', 'Mohon isi nama penerima')}
              </div>
              <div className='field'>
                <label className='label'>Nomor Handphone</label>
                <p className='control'>
                  <input
                    className='input'
                    type='text'
                    name='phone_number'
                    value={formAddress.phone_number}
                    onChange={(e) => this.handleAddress(e)} />
                </p>
                {this.renderValidation('phone_number', 'Mohon isi nomor handphone anda')}
              </div>
            </form>
          </div>
        </section>

        <section className='section is-paddingless has-shadow'>
          <div className='container is-fluid'>
            <div className='title'>
              <h3>Info Lokasi</h3>
            </div>
          </div>
          <div className='edit-data-delivery bg-white edit'>
            <form className='form edit'>
              <div className='field'>
                <label className='label'>Alamat Lengkap</label>
                <p className='control'>
                  <input
                    className='input'
                    type='text'
                    name='address'
                    value={formAddress.address}
                    onChange={(e) => this.handleAddress(e)} />
                </p>
                {this.renderValidation('address', 'Mohon isi alamat lengkap anda')}
              </div>
              <div className='field'>
                <label className='label'>Provinsi</label>
                <p className='control detail-address'>
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
                </p>
                {this.renderValidation('province_id', 'Mohon isi provinsi anda')}
              </div>
              <div className='field'>
                <label className='label'>Kota/Kabupaten</label>
                <p className='control detail-address'>
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
                </p>
                {this.renderValidation('district_id', 'Mohon isi kota / kabupaten anda')}
              </div>
              <div className='field'>
                <label className='label'>Kecamatan</label>
                <p className='control detail-address'>
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
                </p>
                {this.renderValidation('sub_district_id', 'Mohon isi kecamatan anda')}
              </div>
              <div className='field'>
                <label className='label'>Kelurahan</label>
                <p className='control detail-address'>
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
                </p>
                {this.renderValidation('village_id', 'Mohon isi kelurahan anda')}
              </div>
              <div className='field'>
                <label className='label'>Kode Pos</label>
                <p className='control'>
                  <input
                    className='input'
                    type='text'
                    name='postal_code'
                    value={formAddress.postal_code}
                    onChange={(e) => this.handleAddress(e)} />
                </p>
                {this.renderValidation('postal_code', 'Mohon isi kode pos anda')}
              </div>
              <div className='filter-option active'>
                <div className='sort-list check-list left' style={{paddingLeft: '0px'}}>
                  <label
                    className='checkbox'
                    onClick={(e) => this.setIsPrimary(e)}>
                    <span className={`sort-text ${formAddress.is_primary && 'active'}`}>Jadikan Alamat Utama</span>
                    <span className={`input-wrapper ${formAddress.is_primary && 'checked'}`} >
                      <input
                        type='checkbox'
                        name='is_primary' />
                    </span>
                  </label>
                </div>
              </div>
            </form>
          </div>
        </section>
        <section className='section is-paddingless'>
          <div className='edit-data-delivery'>
            <a
              className={`button is-primary is-large is-fullwidth ${submitting && 'is-loading'}`}
              onClick={(e) => this.submitAddressInfo(e)}>
              Simpan Perubahan
            </a>
          </div>
        </section>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    statusAddAddress: state.addAddress,
    provinces: state.provinces,
    districts: state.districts,
    subdistricts: state.subdistricts,
    villages: state.villages
  }
}

const mapDispatchToProps = dispatch => ({
  getProvince: () => dispatch(actionLocationTypes.getProvince()),
  getDistrict: (params) => dispatch(actionLocationTypes.getDistrict(params)),
  getSubDistrict: (params) => dispatch(actionLocationTypes.getSubDistrict(params)),
  getVillage: (params) => dispatch(actionLocationTypes.getVillage(params)),
  addAddress: (params) => dispatch(actionAddressTypes.addAddress(params))
})

export default connect(mapStateToProps, mapDispatchToProps)(AddAddress)
