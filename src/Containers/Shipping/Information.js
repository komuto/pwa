import React, { Component } from 'react'
// import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import NProgress from 'nprogress'
import Router from 'next/router'
import { animateScroll } from 'react-scroll'
// components
import Section from '../../Components/Section'
import Content from '../../Components/Content'
import Notification from '../../Components/Notification'
import OptionsProvince from '../../Components/OptionsProvince'
import OptionsDistritcs from '../../Components/OptionsDistritcs'
import OptionsSubDistritcs from '../../Components/OptionsSubDistritcs'
import OptionsVillages from '../../Components/OptionsVillages'
// actions
import * as productActions from '../../actions/product'
import * as addressActions from '../../actions/address'
import * as purchaseActions from '../../actions/purchase'
import * as locationActions from '../../actions/location'
// import * as expeditionActions from '../../actions/expedition'
// validations
import * as inputValidations from '../../Validations/Input'

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
      submitting: false,
      error: null
    }
    this.submitting = {
      productDetail: false,
      addAddress: false,
      provinces: false,
      districts: false,
      subDistricts: false,
      villages: false,
      listAddress: false
    }
  }

  scrollToTop () {
    animateScroll.scrollTo(0, {duration: 0})
  }

  // alias event
  onChangeAlias (e) {
    this.setState({ formData: { ...this.state.formData, alias: inputValidations.inputNormal(e.target.value) }, error: (this.state.error === 'alias') && null })
  }

  // name event
  onChangeRecipient (e) {
    this.setState({ formData: { ...this.state.formData, recipient: inputValidations.inputNormal(e.target.value) }, error: (this.state.error === 'recipient') && null })
  }

  // phone number event
  onChangeHandphone (e) {
    this.setState({ formData: { ...this.state.formData, handphone: inputValidations.inputNumber(e.target.value) }, error: (this.state.error === 'handphone') && null })
  }

  // adress event
  onChangeAddress (e) {
    this.setState({ formData: { ...this.state.formData, address: inputValidations.inputNormal(e.target.value) }, error: (this.state.error === 'address') && null })
  }

  // postal code event
  onChangePostalCode (e) {
    this.setState({ formData: { ...this.state.formData, postalCode: inputValidations.inputNumber(e.target.value) }, error: (this.state.error === 'postalCode') && null })
  }

  // provinces event
  onClickProvince () {
    this.setState({ provinces: { ...this.state.provinces, show: true } })
  }

  async provinceSelected (selected) {
    this.submitting = { ...this.submitting, districts: true }
    await this.props.getDistrict({province_id: selected.id})
    this.setState({
      provinces: { ...this.state.provinces, selected, show: false },
      districts: { ...this.state.districts, selected: { id: null, name: null } },
      subDistricts: { ...this.state.subDistricts, selected: { id: null, name: null } },
      villages: { ...this.state.villages, selected: { id: null, name: null } },
      error: (this.state.error === 'provinces') && null
    })
  }

  // district event
  onClickDistrict () {
    this.setState({ districts: { ...this.state.districts, show: true } })
  }

  async districtSelected (selected) {
    // const { id, productDetail } = this.state
    // const params = {
    //   id,
    //   origin_id: productDetail.detail.location.district.ro_id,
    //   destination_id: selected.ro_id,
    //   weight: 1000
    // }
    this.submitting = { ...this.submitting, subDistricts: true }
    // await this.props.estimatedShipping(params)
    await this.props.getSubDistrict({district_id: selected.id})
    this.setState({
      districts: { ...this.state.districts, selected, show: false },
      subDistricts: { ...this.state.subDistricts, selected: { id: null, name: null } },
      villages: { ...this.state.villages, selected: { id: null, name: null } },
      error: (this.state.error === 'districts') && null
    })
  }

  // sub districs event
  onClickSubDistrict () {
    this.setState({ subDistricts: { ...this.state.subDistricts, show: true } })
  }

  async subDistrictSelected (selected) {
    this.submitting = { ...this.submitting, villages: true }
    await this.props.getVillage({sub_district_id: selected.id})
    this.setState({
      subDistricts: { ...this.state.subDistricts, selected, show: false },
      villages: { ...this.state.villages, selected: { id: null, name: null } },
      error: (this.state.error === 'subDistricts') && null
    })
  }

  // village event
  onClickVillage () {
    this.setState({ villages: { ...this.state.villages, show: true } })
  }

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

    this.submitting = { ...this.submitting, addAddress: true }

    await this.props.setAddAddress({
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
    })

    this.setState({ submitting: true })
  }

  componentDidMount () {
    NProgress.start()
    this.scrollToTop()
    const { id } = this.state
    this.submitting = { ...this.submitting, productDetail: true, provinces: true }
    this.props.getProduct({ id })
    this.props.getProvince()
  }

  componentWillReceiveProps (nextProps) {
    const { productDetail, provinces, districts, subDistricts, villages, addAddress, listAddress } = nextProps
    const { isFetching, isFound, isError, notifError } = this.props

    if (!isFetching(provinces) && this.submitting.provinces) {
      this.submitting = { ...this.submitting, provinces: false }
      NProgress.done()
      if (isError(provinces)) {
        this.setState({ notification: notifError(provinces.message) })
      }
      if (isFound(provinces)) {
        this.setState({ provinces: { ...this.state.provinces, data: provinces } })
      }
    }

    if (!isFetching(districts) && this.submitting.districts) {
      this.submitting = { ...this.submitting, districts: false }
      NProgress.done()
      if (isError(districts)) {
        this.setState({ notification: notifError(districts.message) })
      }
      if (isFound(districts)) {
        this.setState({ districts: { ...this.state.districts, data: districts } })
      }
    }

    if (!isFetching(subDistricts) && this.submitting.subDistricts) {
      this.submitting = { ...this.submitting, subDistricts: false }
      NProgress.done()
      if (isError(subDistricts)) {
        this.setState({ notification: notifError(subDistricts.message) })
      }
      if (isFound(subDistricts)) {
        this.setState({ subDistricts: { ...this.state.subDistricts, data: subDistricts } })
      }
    }

    if (!isFetching(villages) && this.submitting.villages) {
      this.submitting = { ...this.submitting, villages: false }
      NProgress.done()
      if (isError(villages)) {
        this.setState({ notification: notifError(villages.message) })
      }
      if (isFound(villages)) {
        this.setState({ villages: { ...this.state.villages, data: villages } })
      }
    }

    if (!isFetching(productDetail) && this.submitting.productDetail) {
      this.submitting = { ...this.submitting, productDetail: false }
      NProgress.done()
      if (isError(productDetail)) {
        this.setState({ notification: notifError(productDetail.message) })
      }
      if (isFound(productDetail)) {
        this.setState({ productDetail })
      }
    }

    if (!isFetching(addAddress) && this.submitting.addAddress) {
      this.submitting = { ...this.submitting, addAddress: false }
      if (isError(addAddress)) {
        this.setState({ notification: notifError(addAddress.message) })
      }
      if (isFound(addAddress)) {
        NProgress.start()
        this.submitting = { ...this.submitting, listAddress: true }
        this.props.getListAddress()
      }
    }

    if (!isFetching(listAddress) && this.submitting.listAddress) {
      this.submitting = { ...this.submitting, listAddress: false }
      if (isError(listAddress)) {
        this.setState({ notification: notifError(listAddress.message) })
      }
      if (isFound(listAddress)) {
        Router.push(`/purchase?id=${this.state.id}`)
      }
    }
  }

  render () {
    const { formData, provinces, districts, subDistricts, villages, error, notification } = this.state
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
            <a onClick={(e) => (!this.submitting.addAddress || !this.submitting.listAddress) && this.onSubmit(e)} className={`button is-primary is-large is-fullwidth ${(this.submitting.addAddress || this.submitting.listAddress) && 'is-loading'}`}>Simpan Perubahan</a>
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

const mapStateToProps = (state) => ({
  provinces: state.provinces,
  districts: state.districts,
  subDistricts: state.subdistricts,
  villages: state.villages,
  productDetail: state.productDetail,
  shippingInformation: state.shippingInformation,
  addAddress: state.addAddress,
  addressSelected: state.addressSelected,
  listAddress: state.listAddress
})

const mapDispatchToProps = (dispatch) => ({
  getDistrict: (params) => dispatch(locationActions.getDistrict(params)),
  // estimatedShipping: (params) => dispatch(expeditionActions.estimatedShipping(params)),
  getSubDistrict: (params) => dispatch(locationActions.getSubDistrict(params)),
  setAddAddress: (params) => dispatch(addressActions.addAddress(params)),
  getVillage: (params) => dispatch(locationActions.getVillage(params)),
  addressSelected: (params) => dispatch(purchaseActions.addressSelected(params)),
  getProduct: (params) => dispatch(productActions.getProduct(params)),
  getProvince: () => dispatch(locationActions.getProvince()),
  getListAddress: () => dispatch(addressActions.getListAddress())
})

export default connect(mapStateToProps, mapDispatchToProps)(ShippingInformation)
