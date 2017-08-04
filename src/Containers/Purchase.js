import React, { Component } from 'react'
import { connect } from 'react-redux'
import NProgress from 'nprogress'
import Router from 'next/router'
// components
import Section from '../Components/Section'
import Content from '../Components/Content'
import MyImage from '../Components/MyImage'
import Notification from '../Components/Notification'
import OptionsAdresess from '../Components/OptionsAdresess'
import OptionsExpeditions from '../Components/OptionsExpeditions'
import OptionsExpeditionPackages from '../Components/OptionsExpeditionPackages'
import OptionsInsurance from '../Components/OptionsInsurance'
// actions
import * as productActions from '../actions/product'
import * as addressActions from '../actions/address'
import * as purchaseActions from '../actions/purchase'
import * as cartActions from '../actions/cart'
import * as expeditionActions from '../actions/expedition'
// services
import { Status } from '../Services/Status'
// lib
import RupiahFormat from '../Lib/RupiahFormat'
// validations
import * as inputValidations from '../Validations/Input'
// themes
import Images from '../Themes/Images'

class Purchase extends Component {
  constructor (props) {
    super(props)
    this.state = {
      id: props.query.id || null,
      productDetail: props.productDetail || null,
      listAddress: props.listAddress || null,
      shippingInformation: props.shippingInformation,
      amountProduct: props.amountProduct.amountProduct,
      address: {
        data: (props.listAddress.isFound && props.listAddress.address) || [],
        show: false,
        selected: {
          ...props.addressSelected
        }
      },
      expeditions: {
        data: (props.productDetail.isFound && props.productDetail.detail.expeditions) || [],
        show: false,
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
      submiting: false,
      cartNotification: false
    }
  }

  // min button press
  async plussPress () {
    let { amountProduct } = this.state
    amountProduct += 1
    await this.props.dispatch(purchaseActions.amountProduct({ amountProduct }))
    this.setState({ amountProduct })
  }

  // plus button press
  async minPress () {
    let { amountProduct } = this.state
    amountProduct -= 1
    await this.props.dispatch(purchaseActions.amountProduct({ amountProduct }))
    this.setState({ amountProduct })
  }

  // address event
  onClickAddress = () => this.setState({ address: { ...this.state.address, show: true } })

  async addressSelected (selected) {
    const { id, productDetail } = this.state
    await this.props.dispatch(expeditionActions.estimatedShipping({
      id,
      origin_id: productDetail.detail.store.district.id,
      destination_id: selected.district.id,
      weight: 1
    }))
    await this.props.dispatch(purchaseActions.addressSelected({ ...selected, status: true }))
    this.setState({ address: {...this.state.address, show: false, selected: { ...selected, status: true }}, error: this.state.error === 'addressSelected' && null })
  }

  // expedition event
  onClickExpedition = () => this.setState({ expeditions: { ...this.state.expeditions, show: true } })

  async expeditionSelected (selected) {
    await this.props.dispatch(purchaseActions.courierExpedition(selected))
    this.setState({ expeditions: { ...this.state.expeditions, show: false, selected }, error: this.state.error === 'expeditions' && null })
  }

  // expedition package event
  onClickExpeditionPackage = () => this.setState({ expeditionsPackage: { ...this.state.expeditionsPackage, show: true } })

  async expeditionsPackageSelected (selected) {
    await this.props.dispatch(purchaseActions.packageExpedition(selected))
    this.setState({ expeditionsPackage: { ...this.state.expeditionsPackage, selected, show: false }, error: this.state.error === 'expeditionsPackage' && null })
  }

  // insurance event
  onClickInsurance = () => this.setState({ insurance: { ...this.state.insurance, show: true } })

  async insuranceSelected (selected) {
    await this.props.dispatch(purchaseActions.insurance({ insurance: selected }))
    this.setState({ insurance: { ...this.state.insurance, selected, show: false }, error: this.state.error === 'insurance' && null })
  }

  // noted event
  async onChangeNoted (e) {
    let { noted } = this.state
    noted = inputValidations.inputNormal(e.target.value)
    await this.props.dispatch(purchaseActions.noted({ noted }))
    this.setState({ noted })
  }

  // submit event
  onSubmit (e) {
    e.preventDefault()
    const { productDetail, id, amountProduct, address, expeditions, expeditionsPackage, insurance, noted } = this.state

    if (!address.selected.status) {
      this.setState({ error: 'addressSelected' })
      return
    }

    if (!expeditions.selected.id) {
      this.setState({ error: 'expeditions' })
      return
    }

    if (!expeditionsPackage.selected.id) {
      this.setState({ error: 'expeditionsPackage' })
      return
    }

    if (!insurance.selected) {
      this.setState({ error: 'insurance' })
      return
    }

    // ((qty * weight) * price expeditions gram) / 1000 kg

    this.setState({ submiting: true })
    this.props.dispatch(cartActions.addToCart({
      'product_id': Number(id),
      'expedition_id': expeditions.selected.id,
      'expedition_service_id': expeditionsPackage.selected.id,
      'qty': amountProduct,
      'note': noted,
      'address_id': address.selected.id,
      'is_insurance': insurance === 'Ya',
      'delivery_cost': (((amountProduct * productDetail.detail.product.weight) * expeditionsPackage.selected.cost) / 1000)
    }))
  }

  async componentDidMount () {
    const { id, productDetail, listAddress } = this.state
    if (!productDetail.isFound || (productDetail.isFound && String(productDetail.detail.product.id) !== String(id))) {
      NProgress.start()
      await this.props.dispatch(productActions.getProduct({ id }))
    }

    if (!listAddress.isFound) {
      NProgress.start()
      await this.props.dispatch(addressActions.getListAddress())
    }
  }

  componentWillReceiveProps (nextProps) {
    const { productDetail, listAddress, cart, estimatedCharges } = nextProps
    let { notification, submiting } = this.state
    notification = {status: false, message: 'Error, default message.'}

    if (!listAddress.isLoading) {
      switch (listAddress.status) {
        case Status.SUCCESS :
          if (!listAddress.isFound) notification = {type: 'is-danger', status: true, message: 'Data produk tidak ditemukan'}
          break
        case Status.OFFLINE :
        case Status.FAILED :
          notification = {type: 'is-danger', status: true, message: productDetail.message}
          break
        default:
          break
      }
      this.setState({ listAddress, address: { ...this.state.address, data: listAddress.address }, notification })
    }

    if (!estimatedCharges.isLoading) {
      switch (estimatedCharges.status) {
        case Status.SUCCESS :
          if (!estimatedCharges.isFound) notification = {type: 'is-danger', status: true, message: 'Data produk tidak ditemukan'}
          break
        case Status.OFFLINE :
        case Status.FAILED :
          notification = {type: 'is-danger', status: true, message: productDetail.message}
          break
        default:
          break
      }
      this.setState({ expeditionsPackage: { ...this.state.expeditionsPackage, data: estimatedCharges.charges }, notification })
    }

    if (!cart.isLoading) {
      switch (cart.status) {
        case Status.SUCCESS :
          if (!cart.status === 200) notification = {type: 'is-danger', status: true, message: 'Gagal menambahkan data keranjang belanja'}
          break
        case Status.OFFLINE :
        case Status.FAILED :
          notification = {type: 'is-danger', status: true, message: productDetail.message}
          break
        default:
          break
      }
      submiting && this.setState({ submiting: false, cart, notification, cartNotification: cart.status === 200 })
    }

    if (!productDetail.isLoading) {
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
      this.setState({ productDetail, expeditions: { ...this.state.expeditions, data: productDetail.detail.expeditions }, notification })
    }

    if (!listAddress.isLoading && !productDetail.isLoading) NProgress.done()
  }

  render () {
    const { id, productDetail, address, cartNotification, expeditions, expeditionsPackage, insurance, amountProduct, noted, error, submiting, notification } = this.state
    if (!productDetail.isFound) return null
    const { product, images } = productDetail.detail
    const insurancePrice = (product.insurance * product.price * amountProduct) / 100
    return (
      <Content style={{paddingBottom: 0}}>
        <Notification
          type={notification.type}
          isShow={notification.status}
          activeClose
          onClose={() => this.setState({notification: {status: false, message: ''}})}
          message={notification.message} />
        <Section className='section is-paddingless has-shadow'>
          <div className='detail-product'>
            <div className='purchase'>
              <figure className='img-item' style={{ width: 30 }}>
                <MyImage src={images[0].file} alt='pict' />
              </figure>
              <h3>{ product.name }</h3>
              <span className='price'>Rp { RupiahFormat(product.price) }</span>
            </div>
          </div>
        </Section>
        <Section className='section is-paddingless has-shadow'>
          <div className='info-purchase'>
            <div className='detail-rate is-purchase'>
              <div className='columns detail-rating is-mobile is-multiline no-margin-bottom'>
                <div className='column is-half'>
                  <div className='rating-content is-left'>
                    <strong>Jumlah Barang</strong>
                  </div>
                </div>
                <div className='column is-half'>
                  <div className='rating-content item-qty'>
                    <a onClick={() => (amountProduct > 1) && this.minPress()}><span className='icon-qty-min' /></a>
                    <span className='qty' style={{maxWidth: 50}}> { amountProduct } </span>
                    <a onClick={() => (amountProduct < product.stock) && this.plussPress()}><span className='icon-qty-plus' /></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Section>
        {
            !address.selected.status
            ? <section
              className={`section is-paddingless has-shadow ${error === 'addressSelected' && 'is-error'}`}
              onClick={() => this.onClickAddress()}>
              <div className={`column is-paddingless ${error === 'addressSelected' && 'is-error'}`}>
                <div className='see-all'>
                  <span className='link'>Isi Informasi Data Pengiriman<span className='icon-arrow-right' /></span>
                </div>
              </div>
              <p className='error-msg'>Mohon Pilih Kurir Pengiriman terlebih dahulu</p>
            </section>
            : <section className='section is-paddingless has-shadow'>
              <div className='info-purchase'>
                <div className='detail-purchase summary'>
                  <h3>Informasi Data Pengiriman</h3>
                  <a className='btn-change' onClick={() => this.onClickAddress()}>Ganti</a>
                  <div className='detail-result white'>
                    <ul className='data-delivery'>
                      <li>
                        <div className='columns custom is-mobile'>
                          <div className='column'>
                            <strong>Nama Penerima</strong>
                            <span>{ address.selected.name }</span>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className='columns custom is-mobile'>
                          <div className='column'>
                            <strong>Alamat Email</strong>
                            <span>{ address.selected.email }</span>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className='columns custom is-mobile'>
                          <div className='column'>
                            <strong>No Handphone</strong>
                            <span>{ address.selected.phone_number }</span>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className='columns custom is-mobile'>
                          <div className='column'>
                            <strong>Alamat</strong>
                            <span>
                              { address.selected.address } { address.selected.village.name },<br />
                              { address.selected.subDistrict.name }<br />
                              { address.selected.district.name }<br />
                              { address.selected.province.name }, Indonesia { address.selected.postal_code }
                            </span>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>
          }
        <Section className='section is-paddingless has-shadow'>
          <div className={`column is-paddingless ${error === 'expeditions' && 'is-error'}`} onClick={() => this.onClickExpedition()}>
            <div className='see-all'>
              <span className={`link ${expeditions.selected.id && 'black'}`}> { expeditions.selected.id ? 'Kurir Pengiriman' : 'Pilih Kurir Pengiriman' } <span className='kurir'>{ expeditions.selected.name }</span>
                <span className='icon-arrow-down' /></span>
            </div>
            <p className='error-msg'>Mohon Pilih Kurir Pengiriman terlebih dahulu</p>
          </div>
          <div className={`column is-paddingless ${error === 'expeditionsPackage' && 'is-error'}`} onClick={() => this.onClickExpeditionPackage()}>
            <div className='see-all'>
              <span className={`link ${expeditionsPackage.selected.id && 'black'}`}> { expeditionsPackage.selected.id ? 'Pilih Paket Pengiriman' : 'Paket Pengiriman' }
                <span className='kurir'> { expeditionsPackage.selected.name }</span>
                <span className='icon-arrow-down' /></span>
            </div>
            <p className='error-msg'>Mohon Pilih Paket Pengiriman terlebih dahulu</p>
          </div>
          <div className={`column is-paddingless ${error === 'insurance' && 'is-error'}`} onClick={() => this.onClickInsurance()}>
            <div className='see-all'>
              <span className={`link ${insurance.selected && 'black'}`}> { insurance.selected ? 'Pilih Asuransi' : 'Asuransi'}
                <span className='kurir'> {insurance.selected}</span>
                <span className='icon-arrow-down' />
              </span>
            </div>
            <p className='error-msg'>Mohon Pilih Asuransi terlebih dahulu</p>
          </div>
        </Section>
        <Section>
          <div className='info-purchase'>
            <div className='detail-purchase remark'>
              <h3>Catatan (Optional)</h3>
              <div className='field'>
                <p className='control'>
                  <textarea onChange={(e) => this.onChangeNoted(e)} value={noted} className={`textarea`} placeholder='Contoh: Saya pesan barang yang warna merah' rows='2' />
                </p>
              </div>
            </div>
          </div>
        </Section>
        <Section className='section is-paddingless has-shadow'>
          <div className='info-purchase'>
            <div className='detail-purchase summary'>
              <h3>Ringkasan Pemesanan</h3>
              <div className='detail-result white'>
                <ul>
                  <li>
                    <div className='columns custom is-mobile'>
                      <div className='column is-half'><span>Harga Barang</span></div>
                      <div className='column is-half has-text-right'><span>Rp {RupiahFormat(product.price * amountProduct)}</span></div>
                    </div>
                  </li>
                  <li>
                    <div className='columns custom is-mobile'>
                      <div className='column is-half'><span>Ongkos Kirim</span></div>
                      <div className='column is-half has-text-right'><span>Rp { RupiahFormat(expeditionsPackage.selected.cost) }</span></div>
                    </div>
                  </li>
                  <li>
                    <div className='columns custom is-mobile'>
                      <div className='column is-half'><span>Biaya Asuransi</span></div>
                      <div className='column is-half has-text-right'><span>Rp { RupiahFormat(insurancePrice) }</span></div>
                    </div>
                  </li>
                </ul>
                <ul className='total'>
                  <li>
                    <div className='columns custom is-mobile'>
                      <div className='column is-half'><strong>Harga Barang</strong></div>
                      <div className='column is-half has-text-right'><strong>Rp {RupiahFormat(product.price * amountProduct + expeditionsPackage.selected.cost)}</strong></div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </Section>
        <div className='level nav-bottom nav-button purchase is-mobile'>
          <a onClick={(e) => !submiting && this.onSubmit(e)} className={`button is-primary is-m-lg is-fullwidth btn-add-cart ${submiting && 'is-loading'}`}>Masukan Ke Keranjang</a>
        </div>
        <OptionsAdresess
          {...address}
          id={id}
          addressSelected={(selected) => this.addressSelected(selected)} />
        <OptionsExpeditions
          {...expeditions}
          expeditionSelected={(selected) => this.expeditionSelected(selected)} />
        <OptionsExpeditionPackages
          {...expeditionsPackage}
          expeditionsPackageSelected={(selected) => this.expeditionsPackageSelected(selected)} />
        <OptionsInsurance
          {...insurance}
          insuranceSelected={(selected) => this.insuranceSelected(selected)} />
        <div className='sort-option' id='addCartNotif' style={{ display: cartNotification && 'block' }}>
          <div className='notif-report add-cart-notif'>
            <MyImage src={Images.phoneAccount} />
            <p>Produk telah berhasil dimasukkan ke Keranjang Belanja</p>
            <button className='button is-primary is-large is-fullwidth' onClick={() => Router.push('/shopping-cart')}>Lihat Keranjang Belanja</button>
            <button className='button is-primary is-large is-fullwidth is-outlined' onClick={() => Router.push('/')}>Kembali Belanja</button>
          </div>
        </div>
      </Content>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    productDetail: state.productDetail,
    listAddress: state.listAddress,
    amountProduct: state.amountProduct,
    addressSelected: state.addressSelected,
    shippingInformation: state.shippingInformation,
    courierExpedition: state.courierExpedition,
    packageExpedition: state.packageExpedition,
    estimatedCharges: state.estimatedCharges,
    insurance: state.insurance,
    noted: state.noted,
    cart: state.cart
  }
}

export default connect(mapStateToProps)(Purchase)
