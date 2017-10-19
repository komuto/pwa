import React, { Component } from 'react'
import { connect } from 'react-redux'
// components
import Section from '../../Components/Section'
import OptionsProvince from '../../Components/OptionsProvince'
import OptionsDistritcs from '../../Components/OptionsDistritcs'
import OptionsSubDistritcs from '../../Components/OptionsSubDistritcs'
import Loading from '../../Components/Loading'
// actions
import * as locationActions from '../../actions/location'
import * as expeditionActions from '../../actions/expedition'

class ProductDetailServices extends Component {
  constructor (props) {
    super(props)
    this.state = {
      countProduct: 1,
      totWeight: 0,
      formActive: false,
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
        isFetching: false,
        selected: {
          id: null,
          name: null
        }
      },
      subDistricts: {
        data: null,
        show: false,
        isFetching: false,
        selected: {
          id: null,
          name: null
        }
      },
      estimatedCharges: {
        data: props.estimatedCharges || null,
        isFetching: false
      },
      error: {
        estimatedCharges: null
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
    await this.props.getDistrict({province_id: selected.id})
    this.setState({
      provinces: { ...this.state.provinces, selected, show: false },
      districts: { ...this.state.districts, selected: { id: null, name: null, isFetching: true } },
      subDistricts: { ...this.state.subDistricts, selected: { id: null, name: null }, isFetching: false }
    })
  }

  // options districts selected
  async districtSelected (selected) {
    await this.props.getSubDistrict({district_id: selected.id})
    this.setState({
      districts: { ...this.state.districts, selected, show: false },
      subDistricts: { ...this.state.subDistricts, selected: { id: null, name: null }, isFetching: true }
    })
  }

  // options  subDistrict selected
  async subDistrictSelected (selected) {
    const { product, location } = this.props
    const { districts, countProduct } = this.state
    const params = {
      id: product.id,
      origin_id: location.district.ro_id,
      destination_id: districts.selected.ro_id,
      weight: countProduct * product.weight
    }
    await this.props.estimatedShipping(params)
    this.setState({
      subDistricts: { ...this.state.subDistricts, selected, show: false },
      estimatedCharges: { ...this.state.estimatedCharges, isFetching: true }
    })
  }

  // load any data
  async componentDidMount () {
    const { provinces } = this.state.provinces.data
    // fetch provinces
    provinces.length < 1 && await this.props.getProvince()
  }

  componentWillReceiveProps (nextProps) {
    const { provinces, districts, subDistricts, estimatedCharges } = nextProps
    const { isFetching, isFound, isError } = this.props

    !provinces.isLoading && this.setState({ provinces: { ...this.state.provinces, data: provinces } })

    !districts.isLoading && this.setState({ districts: { ...this.state.districts, data: districts, isFetching: false } })

    !subDistricts.isLoading && this.setState({ subDistricts: { ...this.state.subDistricts, data: subDistricts, isFetching: false } })

    /** handling state estimatedCharges */
    if (!isFetching(estimatedCharges) && this.state.estimatedCharges.isFetching) {
      if (isError(estimatedCharges)) {
        this.setState({
          error: { ...this.state.error, estimatedCharges: estimatedCharges.message },
          estimatedCharges: { ...this.state.estimatedCharges, isFetching: false }
        })
      }

      if (isFound(estimatedCharges)) {
        this.setState({ estimatedCharges: { data: estimatedCharges, isFetching: false } })
      }
    }
  }

  formActivePress = () => this.setState({ formActive: true })

  render () {
    const { product } = this.props
    let { countProduct, provinces, districts, subDistricts, estimatedCharges, error, formActive } = this.state
    return (
      <Section className='section is-paddingless has-shadow'>
        <div className='container is-fluid'>
          <div className='title'>
            <h3>Estimasi Pengiriman</h3>
          </div>
        </div>
        {
          !formActive
          ? <div className='info-product'>
            <div className='detail-rate'>
              <div className='columns detail-rating is-mobile is-multiline no-margin-bottom'>
                <div className='column'>
                  <div className='rating-content see-detail-price'>
                    <p>Lihat estimasi harga dan lama pengiriman barang ke tempat Anda</p>
                    <a onClick={() => this.formActivePress()} className='button is-primary is-outlined is-thick is-fullwidth md'>Lihat Estimasi Pengiriman Barang</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          : <div className='info-product'>
            <div className='detail-rate'>
              <div className='columns detail-rating is-mobile is-multiline no-margin-bottom'>
                <div className='column is-half'>
                  <div className='rating-content is-left'>
                    <strong>Jumlah Barang </strong>
                  </div>
                </div>
                <div className='column is-half'>
                  <div className='rating-content is-left has-text-centered'>
                    <a><span className='icon-qty-min' onClick={() => (countProduct > 1) && this.minPress()} /></a>
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
                      <span onClick={() => !districts.isFetching && this.districtShow()} className='location-label js-option' data-target='#district'>{ districts.isFetching ? 'Loading...' : districts.selected.name || 'Pilih Kabupaten' }</span>
                    </div>
                  </li>
                  <li>
                    <div className='detail-address'>
                      <span className='label'>Kecamatan:</span>
                      <span onClick={() => !subDistricts.isFetching && this.subDistrictShow()} className='location-label js-option' data-target='#districts'>{ subDistricts.isFetching ? 'Loading...' : subDistricts.selected.name || 'Pilih Kecamatan' }</span>
                    </div>
                  </li>
                </ul>
              </div>
              {
                estimatedCharges.isFetching && <Loading size={12} color='#ef5656' className='is-fullwidth has-text-centered' />
              }
              {
                !estimatedCharges.isFetching && estimatedCharges.data.isFound &&
                <div className='detail-result white'>
                  <ul>
                    {
                        estimatedCharges.data.charges.map((charge, index) => {
                          return <li key={index}>
                            <div className='columns custom is-mobile'>
                              <div className='column'><span>{ charge.full_name }</span></div>
                              <div className='column has-text-right'><span>{ charge.cost }</span></div>
                              <div className='column has-text-right'><span>{ charge.etd } hari</span></div>
                            </div>
                          </li>
                        })
                      }
                  </ul>
                  </div>
                }
              <p>{ error.estimatedCharges }</p>
            </div>
          </div>
        }

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

const mapStateToProps = (state) => ({
  provinces: state.provinces,
  districts: state.districts,
  subDistricts: state.subdistricts,
  estimatedCharges: state.estimatedCharges
})

const mapDispatchToProps = (dispatch) => ({
  getDistrict: (params) => dispatch(locationActions.getDistrict(params)),
  getSubDistrict: (params) => dispatch(locationActions.getSubDistrict(params)),
  estimatedShipping: (params) => dispatch(expeditionActions.estimatedShipping(params)),
  getProvince: (params) => dispatch(locationActions.getProvince())
})

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetailServices)
