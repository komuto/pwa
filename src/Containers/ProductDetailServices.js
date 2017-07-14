import React, { Component } from 'react'
import { connect } from 'react-redux'
// components
import Section from '../Components/Section'
// actions
import * as locationActions from '../actions/location'

class ProductDetailServices extends Component {
  constructor (props) {
    super(props)
    this.state = {
      countProduct: 0,
      provinces: {
        data: props.provinces || null,
        show: false,
        selected: {
          id: null,
          name: null
        }
      },
      districts: {
        data: null,
        show: false,
        selected: {
          id: null,
          name: null
        }
      },
      subDistricts: {
        data: null,
        show: false,
        selected: {
          id: null,
          name: null
        }
      }
    }
  }

  // button pluss press
  plussPress = () => this.setState({ countProduct: this.state.countProduct + 1 })

  // button minus press
  minPress = () => this.setState({ countProduct: this.state.countProduct - 1 })

  // button show province press
  provinceShow = () => this.setState({ provinces: { ...this.state.provinces, show: true } })

  // button show districts press
  districtShow = () => this.setState({ districts: { ...this.state.districts, show: true } })

  // button show subDistricts press
  subDistrictShow = () => this.setState({ subDistricts: { ...this.state.subDistricts, show: true } })

  // options province selected
  async provinceSelected (selected) {
    await this.props.dispatch(locationActions.getDistrict({province_id: selected.id}))
    this.setState({
      provinces: { ...this.state.provinces, selected, show: false },
      districts: { ...this.state.districts, selected: { id: null, name: null } }
    })
  }

  // options districts selected
  async districtSelected (selected) {
    await this.props.dispatch(locationActions.getSubDistrict({district_id: selected.id}))
    this.setState({
      districts: { ...this.state.districts, selected, show: false },
      subDistricts: { ...this.state.subDistricts, selected: { id: null, name: null } }
    })
  }

  async subDistrictSelected () {

  }

  // load any data
  async componentDidMount () {
    const { provinces } = this.state.provinces.data
    // fetch provinces
    provinces.length < 1 && await this.props.dispatch(locationActions.getProvince())
  }

  componentWillReceiveProps (nextProps) {
    const { provinces, districts, subDistricts } = nextProps

    !provinces.isLoading && this.setState({ provinces: { ...this.state.provinces, data: provinces } })

    !districts.isLoading && this.setState({ districts: { ...this.state.districts, data: districts } })

    !subDistricts.isLoading && this.setState({ subDistricts: { ...this.state.subDistricts, data: subDistricts } })
  }

  render () {
    const { product } = this.props
    let { countProduct, provinces, districts, subDistricts } = this.state
    return (
      <Section className='section is-paddingless has-shadow'>
        <div className='container is-fluid'>
          <div className='title'>
            <h3>Estimasi Pengiriman</h3>
          </div>
        </div>
        <div className='info-product'>
          <div className='detail-rate'>
            <div className='columns detail-rating is-mobile is-multiline no-margin-bottom'>
              <div className='column is-half'>
                <div className='rating-content is-left'>
                  <strong>Jumlah Barang </strong>
                </div>
              </div>
              <div className='column is-half'>
                <div className='rating-content is-left has-text-centered'>
                  <a><span className='icon-qty-min' onClick={() => (countProduct > 0) && this.minPress()} /></a>
                  <span className='qty'>{ countProduct }</span>
                  <a><span className='icon-qty-plus' onClick={() => (countProduct < product.stock) && this.plussPress()} /></a>
                </div>
              </div>
            </div>
            <div className='detail-result solid'>
              <strong>Lokasi Pengiriman</strong>
              <ul>
                <li>
                  <div className='detail-address'>
                    <span className='label'>Provinsi:</span>
                    <span onClick={() => this.provinceShow()} className='location-label js-option' data-target='#province'>{ provinces.selected.name || 'Pilih Provinsi' }</span>
                  </div>
                </li>
                <li>
                  <div className='detail-address'>
                    <span className='label'>Kabupaten:</span>
                    <span onClick={() => this.districtShow()} className='location-label js-option' data-target='#district'>{ districts.selected.name || 'Pilih Kabupaten' }</span>
                  </div>
                </li>
                <li>
                  <div className='detail-address'>
                    <span className='label'>Kecamatan:</span>
                    <span onClick={() => this.subDistrictShow()} className='location-label js-option' data-target='#districts'>{ subDistricts.selected.name || 'Pilih Kecamatan' }</span>
                  </div>
                </li>
              </ul>
            </div>
            <div className='detail-result white'>
              <ul>
                <li>
                  <div className='columns custom is-mobile'>
                    <div className='column'><span>JNE REG</span></div>
                    <div className='column has-text-right'><span>328.000</span></div>
                    <div className='column has-text-right'><span>2-3 hari</span></div>
                  </div>
                </li>
                <li>
                  <div className='columns custom is-mobile'>
                    <div className='column'><span>TIKI ONS</span></div>
                    <div className='column has-text-right'><span>328.000</span></div>
                    <div className='column has-text-right'><span>1-2 hari</span></div>
                  </div>
                </li>
                <li>
                  <div className='columns custom is-mobile'>
                    <div className='column'><span>TIKI REG</span></div>
                    <div className='column has-text-right'><span>328.000</span></div>
                    <div className='column has-text-right'><span>2-4 hari</span></div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <OptionsProvince
          {...provinces}
          provinceSelected={(selected) => this.provinceSelected(selected)} />

        <OptionsDistritcs
          {...districts}
          districtSelected={(selected) => this.districtSelected(selected)} />

        <OptionsSubDistritcs
          {...subDistricts}
          subDistrictSelected={(selected) => this.subDistrictSelected(selected)} />
      </Section>
    )
  }
}

const OptionsProvince = (props) => {
  return (
    <div className='sort-option' id='province' style={{display: props.show && 'block'}}>
      <div className='sort-list'>
        <p><strong>Pilih Provinsi</strong></p>
        <form action='#' className='form'>
          <div className='field'>
            <div className='control province-option' style={{ height: '500px', overflow: 'scroll' }}>
              {
                props.data.provinces.map((province) => {
                  return (
                    <label key={province.id} className={`radio ${props.selected.id === province.id && 'checked'}`} onClick={() => props.provinceSelected(province)}>
                      <input type='radio' name='provinsi' />
                      { province.name }
                    </label>
                  )
                })
              }
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

const OptionsDistritcs = (props) => {
  return (
    <div className='sort-option' id='province' style={{display: props.show && 'block'}}>
      <div className='sort-list'>
        <p><strong>Pilih Kabupaten</strong></p>
        <form action='#' className='form'>
          <div className='field'>
            <div className='control province-option' style={{ height: '500px', overflow: 'scroll' }}>
              {
                props.data &&
                props.data.districts.map((district) => {
                  return (
                    <label key={district.id} className={`radio ${props.selected.id === district.id && 'checked'}`} onClick={() => props.districtSelected(district)}>
                      <input type='radio' name='provinsi' />
                      { district.name }
                    </label>
                  )
                })
              }
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

const OptionsSubDistritcs = (props) => {
  return (
    <div className='sort-option' id='province' style={{display: props.show && 'block'}}>
      <div className='sort-list'>
        <p><strong>Pilih Kecamatan</strong></p>
        <form action='#' className='form'>
          <div className='field'>
            <div className='control province-option' style={{ height: '500px', overflow: 'scroll' }}>
              {
                props.data &&
                props.data.subdistricts.map((subDistrict) => {
                  return (
                    <label key={subDistrict.id} className={`radio ${props.selected.id === subDistrict.id && 'checked'}`} onClick={() => props.subDistrictSelected(subDistrict)}>
                      <input type='radio' name='provinsi' />
                      { subDistrict.name }
                    </label>
                  )
                })
              }
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    provinces: state.provinces,
    districts: state.districts,
    subDistricts: state.subdistricts
  }
}

export default connect(mapStateToProps)(ProductDetailServices)
