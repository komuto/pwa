import React, { Component } from 'react'
import { connect } from 'react-redux'
import Router from 'next/router'
// component
import Section from '../Components/Section'
import Content from '../Components/Content'
import MyImage from '../Components/MyImage'
import Notification from '../Components/Notification'
// import Loading from '../Components/Loading'
import NProgress from 'nprogress'
import OptionsAdresess from '../Components/OptionsAdresess'
import OptionsExpeditions from '../Components/OptionsExpeditions'
import OptionsExpeditionPackages from '../Components/OptionsExpeditionPackages'
import OptionsInsurance from '../Components/OptionsInsurance'
// actions
import * as cartActions from '../actions/cart'
import * as addressActions from '../actions/address'
// import * as purchaseActions from '../actions/purchase'
// import * as locationActions from '../actions/location'
import * as expeditionActions from '../actions/expedition'
// services
import { Status } from '../Services/Status'
// lib
import RupiahFormat from '../Lib/RupiahFormat'
// validations
import * as inputValidations from '../Validations/Input'

class ShippingDetail extends Component {
  constructor (props) {
    super(props)
    this.state = {
      id: props.query.id || null,
      item: props.item || null,
      listAddress: props.listAddress || null,
      rsAddToCart: props.rsAddToCart || null,
      address: {
        data: (props.listAddress.isFound && props.listAddress.address) || [],
        show: false,
        selected: {
          ...props.addressSelected
        }
      },
      expeditions: {
        data: (props.item.isFound && props.item.item.product.expeditions) || [],
        show: false,
        submiting: false,
        selected: {
          ...props.courierExpedition
        }
      },
      expeditionsPackage: {
        data: (props.estimatedCharges.isFound && props.estimatedCharges.charges) || [],
        show: false,
        selected: {
          ...props.packageExpedition
        }
      },
      insurance: {
        data: ['Ya', 'Tidak'],
        show: false,
        selected: props.insurance.insurance
      },
      notification: {
        type: 'is-danger',
        status: false,
        message: 'Error, default message.'
      },
      noted: props.noted.noted,
      error: null,
      submiting: false
    }

    this.isRedirect = false
    this.fetchEstimatedShipping = true
  }

  // address event
  onClickAddress = () => this.setState({ address: { ...this.state.address, show: true } })

  async addressSelected (e, selected) {
    e.preventDefault()
    const { item } = this.state
    item.item.shipping.address = selected
    this.fetchEstimatedShipping = true
    await this.props.estimatedShipping({
      id: item.item.product.id,
      origin_id: item.item.product.store.district.ro_id,
      destination_id: item.item.shipping.address.district.ro_id,
      weight: 1000
    })
    this.setState({ item, address: { ...this.state.address, show: false, selected } })
  }

  // expedition event
  onClickExpedition = () => this.setState({ expeditions: { ...this.state.expeditions, show: true } })

  async expeditionSelected (e, selected) {
    e.preventDefault()
    const { item } = this.state
    item.item.shipping.expedition_service.expedition = selected
    this.setState({ item, expeditions: { ...this.state.expeditions, show: false, selected, submiting: true }, error: this.state.error === 'expeditions' && null })
  }

  // expedition package event
  onClickExpeditionPackage = () => this.setState({ expeditionsPackage: { ...this.state.expeditionsPackage, show: true } })

  async expeditionsPackageSelected (e, selected) {
    e.preventDefault()
    const { item } = this.state
    item.item.shipping.expedition_service = {
      ...item.item.shipping.expedition_service,
      ...selected
    }
    this.setState({ item, expeditionsPackage: { ...this.state.expeditionsPackage, selected, show: false }, error: this.state.error === 'expeditionsPackage' && null })
  }

  // insurance event
  onClickInsurance = () => this.setState({ insurance: { ...this.state.insurance, show: true } })

  async insuranceSelected (e, selected) {
    e.preventDefault()
    const { item } = this.state
    item.item.shipping.is_insurance = selected === 'Ya'
    this.setState({ item, insurance: { ...this.state.insurance, selected, show: false }, error: this.state.error === 'insurance' && null })
  }

  // noted event
  async onChangeNoted (e) {
    e.preventDefault()
    let { noted } = this.state
    const { item } = this.state
    noted = inputValidations.inputNormal(e.target.value)
    item.item.note = noted
    this.setState({ item, noted })
  }

  // submit event
  async onSubmit (e) {
    e.preventDefault()
    const { item } = this.state
    this.isRedirect = true
    await this.props.addToCart({
      'destination_ro_id': item.item.shipping.address.district.ro_id,
      'origin_ro_id': item.item.product.store.district.ro_id,
      'service': item.item.shipping.expedition_service.name,
      'product_id': item.item.product.id,
      'expedition_id': item.item.shipping.expedition_service.expedition.id,
      'expedition_service_id': item.item.shipping.expedition_service.id,
      'qty': item.item.qty,
      'note': item.item.note,
      'address_id': item.item.shipping.address.id,
      'is_insurance': item.item.shipping.is_insurance
    })
    this.setState({ submiting: true })
  }

  async componentDidMount () {
    const { id, listAddress } = this.state
    // const { item } = this.state

    await this.props.getItem({ id })
    if (!listAddress.isFound) {
      NProgress.start()
      await this.props.getListAddress()
    }

    // console.log(item)
  }

  componentWillReceiveProps (nextProps) {
    const { item, listAddress, rsAddToCart, estimatedCharges } = nextProps
    let { notification, expeditionsPackage } = this.state
    notification = {status: false, message: 'Error, default message.'}

    if (!rsAddToCart.isLoading) {
      switch (rsAddToCart.status) {
        case Status.SUCCESS :
          this.isRedirect && Router.push('/shopping-cart')
          this.isRedirect = false
          break
        case Status.OFFLINE :
        case Status.FAILED :
          notification = {type: 'is-danger', status: true, message: rsAddToCart.message}
          this.setState({ rsAddToCart, notification, submiting: false })
          break
        default:
          break
      }
    }

    console.log('estimatedCharges', estimatedCharges)

    if (!estimatedCharges.isLoading) {
      switch (estimatedCharges.status) {
        case Status.SUCCESS :
          if (!estimatedCharges.isFound) notification = {type: 'is-danger', status: true, message: 'Data produk tidak ditemukan'}
          break
        case Status.OFFLINE :
        case Status.FAILED :
          notification = {type: 'is-danger', status: true, message: estimatedCharges.message}
          break
        default:
          break
      }
      this.setState({
        expeditionsPackage: { ...this.state.expeditionsPackage, data: estimatedCharges.charges },
        expeditions: { ...this.state.expeditions, submiting: false },
        notification
      })
    }

    if (!listAddress.isLoading) {
      NProgress.done()
      switch (listAddress.status) {
        case Status.SUCCESS :
          if (!listAddress.isFound) notification = {type: 'is-danger', status: true, message: 'Data produk tidak ditemukan'}
          break
        case Status.OFFLINE :
        case Status.FAILED :
          notification = {type: 'is-danger', status: true, message: listAddress.message}
          break
        default:
          break
      }
      this.setState({ listAddress, address: { ...this.state.address, data: listAddress.address }, notification })
    }

    if (!item.isLoading) {
      switch (item.status) {
        case Status.SUCCESS :
          if (!item.isFound) notification = {type: 'is-danger', status: true, message: 'Keranjang belanja kosong!'}
          if (item.isFound && expeditionsPackage.data.length < 1 && this.fetchEstimatedShipping) {
            this.props.estimatedShipping({
              id: item.item.product.id,
              origin_id: item.item.product.store.district.ro_id,
              destination_id: item.item.shipping.address.district.ro_id,
              weight: 1000
            })
            this.fetchEstimatedShipping = false
          }
          break
        case Status.OFFLINE :
        case Status.FAILED :
          notification = {type: 'is-danger', status: true, message: item.message}
          break
        default:
          break
      }
      this.setState({ item, expeditions: { ...this.state.expeditions, data: item.item.product.expeditions }, notification })
    }
  }

  render () {
    const { notification, item, address, expeditions, expeditionsPackage, insurance, submiting, id } = this.state
    const { product, shipping } = item.item
    if (!item.isFound) return null

    // cost service / 1000 gram
    let estimatedCost = 0
    if (expeditionsPackage.data.length > 0) {
      let filterEstimatedCost = expeditionsPackage.data.filter((data) => {
        return data.id === shipping.expedition_service.id
      })
      estimatedCost = filterEstimatedCost.length > 0 ? filterEstimatedCost[0].cost : 0
    }

    let price = product.price
    let weight = product.weight
    let qty = item.item.qty
    let isInsurance = shipping.is_insurance
    let insuranceFee = shipping.expedition_service.expedition.insurance_fee
    let insurancePrice = isInsurance ? (insuranceFee * price * qty) / 100 : 0
    let shippingCost = Math.ceil(((qty * weight) / 1000)) * estimatedCost
    let totalPrice = (price * qty) + shippingCost + insurancePrice

    return (
      <Content>
        <section className='section is-paddingless has-shadow'>
          <Notification
            type={notification.type}
            isShow={notification.status}
            activeClose
            onClose={() => this.setState({notification: {status: false, message: ''}})}
            message={notification.message} />
          <div className='detail-product'>
            <div className='purchase'>
              <figure className='img-item'>
                <MyImage src='../images/pict.jpg' alt='pict' />
              </figure>
              <h3>{ product.name }</h3>
              <span className='price'>{ product.store.name }</span>
            </div>
          </div>
          <div className='detail-purchase summary at-cart'>
            <div className='detail-result white'>
              <a onClick={() => this.onClickAddress()} className='btn-change js-option' data-target='#changeAddress'>Ganti</a>
              <ul className='data-delivery'>
                <li>
                  <div className='columns custom is-mobile'>
                    <div className='column'>
                      <strong>Alamat Pengirim</strong>
                      <span>
                        { shipping.address.address },<br />
                        { shipping.address.subDistrict.name } <br />
                        { shipping.address.province.name }, Indonesia { shipping.address.postal_code }
                      </span>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className='column is-paddingless' onClick={() => this.onClickExpedition()}>
            <div className='see-all'>
              <span className='link black js-option' data-target='#kurir'>Kurir Pengiriman
                <span className='kurir'>{ shipping.expedition_service.expedition.name }</span><span className='icon-arrow-down' /></span>
            </div>
            <p className='error-msg'>Mohon Pilih Kurir Pengiriman terlebih dahulu</p>
          </div>
          <div className='column is-paddingless' onClick={() => this.onClickExpeditionPackage()}>
            <div className='see-all'>
              <span className='link black js-option' data-target='#deliveryPackage'>Pilih Paket Pengiriman
                <span className='kurir'>{ shipping.expedition_service.name }</span>
                <span className='icon-arrow-down' /></span>
            </div>
            <p className='error-msg'>Mohon Pilih Paket Pengiriman terlebih dahulu</p>
          </div>
          <div className='column is-paddingless' onClick={() => this.onClickInsurance()}>
            <div className='see-all'>
              <span className='link black js-option' data-target='#insurance'>Asuransi
                <span className='kurir'>{ shipping.is_insurance ? 'Ya' : 'Tidak' }</span>
                <span className='icon-arrow-down' /></span>
            </div>
            <p className='error-msg'>Mohon Pilih Paket Pengiriman terlebih dahulu</p>
          </div>
          <div className='info-purchase'>
            <div className='detail-purchase remark'>
              <h3>Catatan (Optional)</h3>
              <div className='field'>
                <p className='control'>
                  <textarea onChange={(e) => this.onChangeNoted(e)} value={item.item.note} className={`textarea`} placeholder='Contoh: Saya pesan barang yang warna merah' rows='2' />
                </p>
              </div>
            </div>
          </div>
          <div className='detail-purchase summary'>
            <div className='detail-result detail-price'>
              <h3>Rincian Harga</h3>
              <ul>
                <li>
                  <div className='columns custom is-mobile'>
                    <div className='column is-half'><span>Harga Barang</span></div>
                    <div className='column is-half has-text-right'><span>{qty} x Rp {RupiahFormat(price)}</span></div>
                  </div>
                </li>
                <li>
                  <div className='columns custom is-mobile'>
                    <div className='column is-half'><span>Ongkos Kirim</span></div>
                    <div className='column is-half has-text-right'><span>Rp {RupiahFormat(shippingCost)}</span></div>
                  </div>
                </li>
                <li>
                  <div className='columns custom is-mobile'>
                    <div className='column is-half'><span>Biaya Asuransi</span></div>
                    <div className='column is-half has-text-right'><span>Rp {RupiahFormat(insurancePrice)}</span></div>
                  </div>
                </li>
                <li>
                  <div className='columns custom is-mobile'>
                    <div className='column is-half'><strong>Sub Total</strong></div>
                    <div className='column is-half has-text-right'><strong>Rp { RupiahFormat(totalPrice) }</strong></div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </section>
        <Section className='section is-paddingless'>
          <div className='edit-data-delivery'>
            <a onClick={(e) => !submiting && this.onSubmit(e)} className={`button is-primary is-large is-fullwidth ${submiting && 'is-loading'}`}>Simpan Perubahan</a>
          </div>
        </Section>
        <OptionsAdresess
          {...address}
          id={id}
          addressSelected={(e, selected) => this.addressSelected(e, selected)} />
        <OptionsExpeditions
          {...expeditions}
          expeditionSelected={(e, selected) => this.expeditionSelected(e, selected)} />
        <OptionsExpeditionPackages
          expeditions={expeditions}
          expeditionsPackage={expeditionsPackage}
          expeditionsPackageSelected={(e, selected) => this.expeditionsPackageSelected(e, selected)} />
        <OptionsInsurance
          {...insurance}
          insuranceSelected={(e, selected) => this.insuranceSelected(e, selected)} />
      </Content>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    rsAddToCart: state.addToCart,
    item: state.item,
    listAddress: state.listAddress,
    courierExpedition: state.courierExpedition,
    packageExpedition: state.packageExpedition,
    estimatedCharges: state.estimatedCharges,
    insurance: state.insurance,
    noted: state.noted
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (params) => dispatch(cartActions.addToCart(params)),
    getItem: (id) => dispatch(cartActions.getItem(id)),
    getListAddress: () => dispatch(addressActions.getListAddress()),
    estimatedShipping: (params) => dispatch(expeditionActions.estimatedShipping(params))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShippingDetail)
