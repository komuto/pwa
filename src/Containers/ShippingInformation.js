import React, { Component } from 'react'
// import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import NProgress from 'nprogress'
import Router from 'next/router'
// components
import Section from '../Components/Section'
import Content from '../Components/Content'
import Notification from '../Components/Notification'
import OptionsProvince from '../Components/OptionsProvince'
import OptionsDistritcs from '../Components/OptionsDistritcs'
import OptionsSubDistritcs from '../Components/OptionsSubDistritcs'
import OptionsVillages from '../Components/OptionsVillages'
// actions
import * as productActions from '../actions/product'
import * as addressActions from '../actions/address'
import * as purchaseActions from '../actions/purchase'
import * as locationActions from '../actions/location'
import * as expeditionActions from '../actions/expedition'
// services
import { Status } from '../Services/Status'
// validations
import * as inputValidations from '../Validations/Input'

class ShippingInformation extends Component {
  constructor (props) {
    super(props)
    this.state = {
      id: props.query.id || null,
      productDetail: props.productDetail || null,
      addAddress: props.addAddress || null,
      formData: {
        ...props.shippingInformation
      },
      provinces: {
        data: props.provinces || null,
        show: false,
        selected: {
          ...props.shippingInformation.provinces
        }
      },
      districts: {
        data: props.districts || null,
        show: false,
        selected: {
          ...props.shippingInformation.districts
        }
      },
      subDistricts: {
        data: props.subDistricts || null,
        show: false,
        selected: {
          ...props.shippingInformation.subDistricts
        }
      },
      villages: {
        data: props.villages || null,
        show: false,
        selected: {
          ...props.shippingInformation.villages
        }
      },
      notification: {
        type: 'is-danger',
        status: false,
        message: 'Error, default message.'
      },
      submiting: false,
      error: null
    }
  }

  // alias event
  onChangeAlias = (e) => this.setState({ formData: { ...this.state.formData, alias: inputValidations.inputNormal(e.target.value) }, error: (this.state.error === 'alias') && null })

  // name event
  onChangeRecipient = (e) => this.setState({ formData: { ...this.state.formData, recipient: inputValidations.inputNormal(e.target.value) }, error: (this.state.error === 'recipient') && null })

  // phone number event
  onChangeHandphone = (e) => this.setState({ formData: { ...this.state.formData, handphone: inputValidations.inputNumber(e.target.value) }, error: (this.state.error === 'handphone') && null })

  // adress event
  onChangeAddress = (e) => this.setState({ formData: { ...this.state.formData, address: inputValidations.inputNormal(e.target.value) }, error: (this.state.error === 'address') && null })

  // postal code event
  onChangePostalCode = (e) => this.setState({ formData: { ...this.state.formData, postalCode: inputValidations.inputNumber(e.target.value) }, error: (this.state.error === 'postalCode') && null })

  // provinces event
  onClickProvince = () => this.setState({ provinces: { ...this.state.provinces, show: true } })

  async provinceSelected (selected) {
    await this.props.dispatch(locationActions.getDistrict({province_id: selected.id}))
    this.setState({
      provinces: { ...this.state.provinces, selected, show: false },
      districts: { ...this.state.districts, selected: { id: null, name: null } },
      subDistricts: { ...this.state.subDistricts, selected: { id: null, name: null } },
      villages: { ...this.state.villages, selected: { id: null, name: null } },
      error: (this.state.error === 'provinces') && null
    })
  }

  // district event
  onClickDistrict = () => this.setState({ districts: { ...this.state.districts, show: true } })

  async districtSelected (selected) {
    const { id, productDetail } = this.state
    const params = {
      id,
      origin_id: productDetail.detail.store.district.ro_id,
      destination_id: selected.ro_id,
      weight: 1000
    }

    await this.props.dispatch(expeditionActions.estimatedShipping(params))

    await this.props.dispatch(locationActions.getSubDistrict({district_id: selected.id}))
    this.setState({
      districts: { ...this.state.districts, selected, show: false },
      subDistricts: { ...this.state.subDistricts, selected: { id: null, name: null } },
      villages: { ...this.state.villages, selected: { id: null, name: null } },
      error: (this.state.error === 'districts') && null
    })
  }

  // sub districs event
  onClickSubDistrict = () => this.setState({ subDistricts: { ...this.state.subDistricts, show: true } })

  async subDistrictSelected (selected) {
    await this.props.dispatch(locationActions.getVillage({sub_district_id: selected.id}))
    this.setState({
      subDistricts: { ...this.state.subDistricts, selected, show: false },
      villages: { ...this.state.villages, selected: { id: null, name: null } },
      error: (this.state.error === 'subDistricts') && null
    })
  }

  // village event
  onClickVillage = () => this.setState({ villages: { ...this.state.villages, show: true } })

  villageSelected (selected) {
    this.setState({
      villages: { ...this.state.villages, selected, show: false },
      error: (this.state.error === 'villages') && null
    })
  }

  // submit event
  async onSubmit (e) {
    e.preventDefault()
    const { formData, provinces, districts, subDistricts, villages } = this.state

    if (formData.alias === '') {
      this.setState({ error: 'alias' })
      return
    }

    if (formData.recipient === '') {
      this.setState({ error: 'recipient' })
      return
    }

    if (formData.handphone === '') {
      this.setState({ error: 'handphone' })
      return
    }

    if (formData.address === '') {
      this.setState({ error: 'address' })
      return
    }

    if (!provinces.selected.id) {
      this.setState({ error: 'provinces' })
      return
    }

    if (!districts.selected.id) {
      this.setState({ error: 'districts' })
      return
    }

    if (!subDistricts.selected.id) {
      this.setState({ error: 'subDistricts' })
      return
    }

    if (!villages.selected.id) {
      this.setState({ error: 'villages' })
      return
    }

    if (formData.postalCode === '') {
      this.setState({ error: 'postalCode' })
      return
    }

    await this.props.dispatch(addressActions.addAddress({
      'province_id': provinces.selected.id,
      'district_id': districts.selected.id,
      'sub_district_id': subDistricts.selected.id,
      'village_id': villages.selected.id,
      'name': formData.recipient,
      'phone_number': formData.handphone,
      'postal_code': formData.postalCode,
      'address': formData.address,
      'alias_address': formData.alias,
      'is_primary': true
    }))

    this.setState({ submiting: true })
  }

  async componentDidMount () {
    const { provinces } = this.state.provinces.data
    const { id, productDetail } = this.state

    if (!productDetail.isFound || (productDetail.isFound && String(productDetail.detail.product.id) !== String(id))) {
      NProgress.start()
      await this.props.dispatch(productActions.getProduct({ id }))
    }

    provinces.length < 1 && await this.props.dispatch(locationActions.getProvince())
  }

  componentWillReceiveProps (nextProps) {
    const { productDetail, provinces, districts, subDistricts, villages, addAddress, addressSelected } = nextProps

    let { notification } = this.state

    notification = {status: false, message: 'Error, default message.'}

    !provinces.isLoading && this.setState({ provinces: { ...this.state.provinces, data: provinces } })

    !districts.isLoading && this.setState({ districts: { ...this.state.districts, data: districts } })

    !subDistricts.isLoading && this.setState({ subDistricts: { ...this.state.subDistricts, data: subDistricts } })

    !villages.isLoading && this.setState({ villages: { ...this.state.villages, data: villages } })

    if (!productDetail.isLoading) {
      NProgress.done()
      switch (productDetail.status) {
        case Status.SUCCESS :
          if (!productDetail.isFound) notification = {type: 'is-danger', status: true, message: 'Data produk tidak ditemukan'}
          break
        case Status.OFFLINE :
        case Status.FAILED :
          notification = {type: 'is-danger', status: true, message: productDetail.message}
          break
        default:
          break
      }
      this.setState({ productDetail, notification })
    }

    if (!addAddress.isLoading) {
      switch (addAddress.status) {
        case Status.SUCCESS :
          if (!addAddress.isFound) notification = {type: 'is-danger', status: true, message: 'Gagal menambah data informasi pengiriman'}
          break
        case Status.OFFLINE :
        case Status.FAILED :
          notification = {type: 'is-danger', status: true, message: productDetail.message}
          break
        default:
          break
      }
      if (addAddress.address.id !== addressSelected.id) {
        this.props.dispatch(purchaseActions.addressSelected({...addAddress.address, status: true}))
        Router.back()
      }
      this.setState({ notification })
    }
  }

  render () {
    const { formData, provinces, districts, subDistricts, villages, submiting, error, notification } = this.state
    const errorStyle = {
      borderBottomColor: 'red',
      color: 'red'
    }
    return (
      <Content style={{paddingBottom: 0}}>
        <Notification
          type={notification.type}
          isShow={notification.status}
          activeClose
          onClose={() => this.setState({notification: {status: false, message: ''}})}
          message={notification.message} />
        <Section className='section is-paddingless has-shadow'>
          <div className='container is-fluid'>
            <div className='title'>
              <h3>Info Alamat</h3>
            </div>
          </div>
          <div className='edit-data-delivery bg-white'>
            <form action='#' className='form edit'>
              <div className='field'>
                <p className='control'>
                  <input onChange={(e) => this.onChangeAlias(e)} value={formData.alias} className={`input ${error === 'alias' && 'is-danger'}`} type='text' placeholder='Nama Alias' />
                  <span className='eg'>Contoh: Rumah Sendiri, Kantor</span>
                </p>
              </div>
              <div className='field'>
                <p className='control'>
                  <input onChange={(e) => this.onChangeRecipient(e)} value={formData.recipient} className={`input ${error === 'recipient' && 'is-danger'}`} type='text' placeholder='Nama Penerima' />
                </p>
              </div>
              <div className='field'>
                <p className='control'>
                  <input onChange={(e) => this.onChangeHandphone(e)} value={formData.handphone} className={`input ${error === 'handphone' && 'is-danger'}`} type='number' placeholder='Nomor Handphone' />
                </p>
              </div>
            </form>
          </div>
        </Section>
        <Section className='section is-paddingless has-shadow'>
          <div className='container is-fluid'>
            <div className='title'>
              <h3>Info Lokasi</h3>
            </div>
          </div>
          <div className='edit-data-delivery bg-white'>
            <form action='#' className='form edit'>
              <div className='field'>
                <p className='control'>
                  <input onChange={(e) => this.onChangeAddress(e)} value={formData.address} className={`input ${error === 'address' && 'is-danger'}`} type='text' placeholder='Alamat Lengkap' />
                </p>
              </div>
              <div className='field'>
                <p className='control detail-address'>
                  <span onClick={() => provinces.data.isFound && this.onClickProvince()} style={error === 'provinces' ? errorStyle : {}} className='location-label disabled'>
                    { provinces.selected.name || 'Pilih Provinsi' }
                  </span>
                </p>
              </div>
              <div className='field'>
                <p className='control detail-address'>
                  <span onClick={() => districts.data.isFound && this.onClickDistrict()} style={error === 'districts' ? errorStyle : {}} className='location-label'>
                    { districts.selected.name || 'Pilih Kota/Kabupaten' }
                  </span>
                </p>
              </div>
              <div className='field'>
                <p className='control detail-address'>
                  <span onClick={() => subDistricts.data.isFound && this.onClickSubDistrict()} style={error === 'subDistricts' ? errorStyle : {}} className='location-label'>
                    { subDistricts.selected.name || 'Pilih Kecamatan' }
                  </span>
                </p>
              </div>
              <div className='field'>
                <p className='control detail-address'>
                  <span onClick={() => villages.data.isFound && this.onClickVillage()} style={error === 'villages' ? errorStyle : {}} className='location-label'>
                    { villages.selected.name || 'Pilih Kelurahan' }
                  </span>
                </p>
              </div>
              <div className='field'>
                <p className='control'>
                  <input onChange={(e) => this.onChangePostalCode(e)} className={`input ${error === 'postalCode' && 'is-danger'}`} value={formData.postalCode} type='number' placeholder='Kode Pos' />
                </p>
              </div>
            </form>
          </div>
        </Section>
        <Section className='section is-paddingless'>
          <div className='edit-data-delivery'>
            <a onClick={(e) => !submiting && this.onSubmit(e)} className={`button is-primary is-large is-fullwidth ${submiting && 'is-loading'}`}>Simpan Perubahan</a>
          </div>
        </Section>
        <OptionsProvince
          {...provinces}
          provinceSelected={(selected) => this.provinceSelected(selected)} />

        <OptionsDistritcs
          {...districts}
          districtSelected={(selected) => this.districtSelected(selected)} />

        <OptionsSubDistritcs
          {...subDistricts}
          subDistrictSelected={(selected) => this.subDistrictSelected(selected)} />

        <OptionsVillages
          {...villages}
          villageSelected={(selected) => this.villageSelected(selected)} />
      </Content>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    provinces: state.provinces,
    districts: state.districts,
    subDistricts: state.subdistricts,
    villages: state.villages,
    productDetail: state.productDetail,
    shippingInformation: state.shippingInformation,
    addAddress: state.addAddress,
    addressSelected: state.addressSelected
  }
}

// ShippingInformation = reduxForm({ form: 'shippingForm' })(ShippingInformation)
// ShippingInformation = connect(mapStateToProps)(ShippingInformation)

export default connect(mapStateToProps)(ShippingInformation)
