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
import Loading from '../Components/Loading'
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
      addToCart: props.addToCart || null,
      shippingInformation: props.shippingInformation,
      amountProduct: props.amountProduct.amountProduct,
      address: {
        data: (props.listAddress.isFound && props.listAddress.address) || [],
        show: false,
        submiting: false,
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

    this.loadingSpan = <span className='has-text-right' style={{ position: 'absolute', right: 20 }}><Loading size={14} type='ovals' color='#ef5656' /></span>
  }

  // min button press
  async plussPress () {
    let { amountProduct } = this.state
    amountProduct += 1
    await this.props.setAmountProduct({ amountProduct })
    this.setState({ amountProduct })
  }

  // plus button press
  async minPress () {
    let { amountProduct } = this.state
    amountProduct -= 1
    await this.props.setAmountProduct({ amountProduct })
    this.setState({ amountProduct })
  }

  // address event
  onClickAddress = (e) => {
    if (!e.target.className.includes('addressButton')) return
    this.setState({ address: { ...this.state.address, show: !this.state.address.show } })
  }

  async addressSelected (e, selected) {
    e.preventDefault()
    const { id, productDetail } = this.state
    await this.props.setEstimatedShipping({
      id,
      origin_id: productDetail.detail.location.district.ro_id,
      destination_id: selected.district.ro_id,
      weight: 1000
    })
    await this.props.setAddressSelected({ ...selected, status: true })
    this.setState({
      address: {...this.state.address, show: false, selected: { ...selected, status: true }, submiting: true},
      expeditions: { ...this.state.expeditions, selected: { id: null, name: null } },
      expeditionsPackage: { ...this.state.expeditionsPackage, selected: { id: null, name: null } },
      error: this.state.error === 'addressSelected' && null })
  }

  // expedition event
  onClickExpedition = (e) => {
    if (!e.target.className.includes('expeditionButton')) return
    this.setState({ expeditions: { ...this.state.expeditions, show: !this.state.expeditions.show } })
  }

  async expeditionSelected (e, selected) {
    e.preventDefault()
    await this.props.setCourierExpedition(selected)
    this.setState({
      expeditions: { ...this.state.expeditions, show: false, selected },
      expeditionsPackage: { ...this.state.expeditionsPackage, selected: { id: null, name: null } },
      error: this.state.error === 'expeditions' && null })
  }

  // expedition package event
  onClickExpeditionPackage = (e) => {
    if (!e.target.className.includes('expeditionPackageButton')) return
    this.setState({ expeditionsPackage: { ...this.state.expeditionsPackage, show: !this.state.expeditionsPackage.show } })
  }

  async expeditionsPackageSelected (e, selected) {
    e.preventDefault()
    await this.props.setPackageExpedition(selected)
    this.setState({ expeditionsPackage: { ...this.state.expeditionsPackage, selected, show: false }, error: this.state.error === 'expeditionsPackage' && null })
  }

  // insurance event
  onClickInsurance = (e) => {
    if (!e.target.className.includes('insuranceButton')) return
    this.setState({ insurance: { ...this.state.insurance, show: !this.state.insurance.show } })
  }

  async insuranceSelected (e, selected) {
    e.preventDefault()
    await this.props.setInsurance({ insurance: selected })
    this.setState({ insurance: { ...this.state.insurance, selected, show: false }, error: this.state.error === 'insurance' && null })
  }

  // noted event
  async onChangeNoted (e) {
    e.preventDefault()
    let { noted } = this.state
    noted = inputValidations.inputNormal(e.target.value)
    await this.props.setNoted({ noted })
    this.setState({ noted })
  }

  // submit event
  onSubmit (e) {
    e.preventDefault()
    const { productDetail, id, amountProduct, address, expeditions, expeditionsPackage, insurance, noted } = this.state

    console.log(insurance)

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

    this.setState({ submiting: true })
    this.props.setAddToCart({
      'destination_ro_id': address.selected.district.ro_id,
      'origin_ro_id': productDetail.detail.location.district.ro_id,
      'service': expeditionsPackage.selected.name,
      'product_id': Number(id),
      'expedition_id': expeditions.selected.id,
      'expedition_service_id': expeditionsPackage.selected.id,
      'qty': amountProduct,
      'note': noted,
      'address_id': address.selected.id,
      'is_insurance': insurance.selected === 'Ya'
    })
  }
  async componentDidMount () {
    const { id, productDetail, listAddress } = this.state
    if (!productDetail.isFound || (productDetail.isFound && String(productDetail.detail.product.id) !== String(id))) {
      NProgress.start()
      await this.props.getProduct({ id })
    }

    if (!listAddress.isFound) {
      NProgress.start()
      await this.props.getListAddress()
    }
  }

  componentWillReceiveProps (nextProps) {
    const { productDetail, listAddress, addToCart, estimatedCharges } = nextProps
    let { notification, submiting } = this.state
    notification = {status: false, message: 'Error, default message.'}
    if (!listAddress.isLoading) {
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
      this.setState({
        listAddress,
        address: { ...this.state.address, data: listAddress.address },
        notification
      })
    }

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
        address: { ...this.state.address, data: listAddress.address, submiting: false },
        notification
      })
    }

    if (!addToCart.isLoading) {
      switch (addToCart.status) {
        case Status.SUCCESS :
          if (!addToCart.status === 200) notification = {type: 'is-danger', status: true, message: 'Gagal menambahkan data keranjang belanja'}
          break
        case Status.OFFLINE :
        case Status.FAILED :
          notification = {type: 'is-danger', status: true, message: addToCart.message}
          break
        default:
          break
      }
      submiting &&
      this.setState({
        submiting: false,
        addToCart,
        notification,
        cartNotification: addToCart.status === 200
      })
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
      this.setState({
        productDetail,
        expeditions: { ...this.state.expeditions, data: productDetail.detail.expeditions },
        notification
      })
    }

    if (!listAddress.isLoading && !productDetail.isLoading) NProgress.done()
  }

  render () {
    const { id, productDetail, address, cartNotification, expeditions, expeditionsPackage, insurance, amountProduct, noted, error, submiting, notification } = this.state

    if (!productDetail.isFound) return null
    const { product, images, store } = productDetail.detail
    let price = 0
    let insurancePrice = 0
    let deliveryPrice = 0
    let subTotalPrice = 0
    let totalPrice = 0

    // real price
    if (product) {
      price = product.price
    }

    // price after discount
    if (product.is_discount) {
      price = price - (price * (product.discount / 100))
    }

    // delevery price
    if (expeditionsPackage.selected.cost) {
      deliveryPrice = (expeditionsPackage.selected.cost * Math.ceil((amountProduct * product.weight) / 1000)) * amountProduct
    }

    // insurance price
    if (insurance.selected === 'Ya') {
      insurancePrice = (expeditions.selected.insurance_fee * price * amountProduct) / 100
    }

    subTotalPrice = price * amountProduct
    // total price
    totalPrice = (price * amountProduct) + deliveryPrice + insurancePrice

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
                <MyImage src={images[0].file} alt={store.name} />
              </figure>
              <h3>{ product.name }</h3>
              <span className='price'>{ store.name }</span>
            </div>
          </div>
          <div className='info-purchase'>
            <div className='detail-rate is-purchase'>
              <div className='columns total-items is-mobile is-multiline no-margin-bottom'>
                <div className='column is-half'>
                  <div className='rating-content is-left'>
                    <strong>Harga Satuan</strong>
                  </div>
                </div>
                <div className='column is-half'>
                  <div className='rating-content item-qty has-text-right'>
                    <span>Rp {RupiahFormat(price)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='info-purchase'>
            <div className='detail-rate is-purchase'>
              <div className='columns total-items is-mobile is-multiline no-margin-bottom'>
                <div className='column is-half'>
                  <div className='rating-content is-left'>
                    <strong>Jumlah Barang</strong>
                  </div>
                </div>
                <div className='column is-half'>
                  <div className='rating-content item-qty has-text-right'>
                    <a onClick={() => (amountProduct > 1) && this.minPress()}><span className='icon-qty-min' /></a>
                    <span className='qty' style={{maxWidth: 50}}> { amountProduct } </span>
                    <a onClick={() => (amountProduct < product.stock) && this.plussPress()}><span className='icon-qty-plus' /></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='info-purchase'>
            <div className='detail-rate is-purchase'>
              <div className='columns total-items is-mobile is-multiline no-margin-bottom'>
                <div className='column is-half'>
                  <div className='rating-content is-left'>
                    <strong>Subtotal Harga Barang</strong>
                  </div>
                </div>
                <div className='column is-half'>
                  <div className='rating-content item-qty has-text-right'>
                    <span>Rp {RupiahFormat(subTotalPrice)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Section>
        {
            !address.selected.status
            ? <section
              className={`section is-paddingless has-shadow addressButton ${error === 'addressSelected' && 'is-error'}`}
              onClick={(e) => this.onClickAddress(e)}>
              <div className={`column is-paddingless ${error === 'addressSelected' && 'is-error'}`}>
                <div className='see-all addressButton'>
                  <span className='link addressButton'>Isi Informasi Data Pengiriman
                  <span className='icon-arrow-right' />
                  </span>
                </div>
              </div>
              <p className='error-msg'>Mohon Pilih Kurir Pengiriman terlebih dahulu</p>
            </section>
            : <section className='section is-paddingless has-shadow'>
              <div className='info-purchase'>
                <div className='detail-purchase summary'>
                  <h3>Informasi Data Pengiriman</h3>
                  <a className='btn-change addressButton' onClick={(e) => this.onClickAddress(e)}>Ganti</a>
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
          <a className={`column is-paddingless expeditionButton ${error === 'expeditions' && 'is-error'}`} onClick={(e) => !address.submiting && this.onClickExpedition(e)}>
            <div className='see-all expeditionButton'>
              <span className={`link expeditionButton ${expeditions.selected.id && 'black'}`}> { expeditions.selected.id ? 'Kurir Pengiriman' : 'Pilih Kurir Pengiriman' }
                <span className='kurir expeditionButton'>{ expeditions.selected.name }</span>
                {
                    address.submiting
                    ? this.loadingSpan
                    : <span className='icon-arrow-down expeditionButton' />
                }
              </span>
            </div>
            <p className='error-msg'>Mohon Pilih Kurir Pengiriman terlebih dahulu</p>
          </a>

          <a className={`column is-paddingless expeditionPackageButton ${error === 'expeditionsPackage' && 'is-error'}`} onClick={(e) => !address.submiting && this.onClickExpeditionPackage(e)}>
            <div className='see-all expeditionPackageButton'>
              <span className={`link  expeditionPackageButton ${expeditionsPackage.selected.id && 'black'}`}> { expeditionsPackage.selected.id ? 'Paket Pengiriman' : 'Pilih Paket Pengiriman' }
                <span className='kurir expeditionPackageButton'> { expeditionsPackage.selected.name }</span>
                {
                    address.submiting
                    ? this.loadingSpan
                    : <span className='icon-arrow-down expeditionPackageButton' />
                }

              </span>
            </div>
            <p className='error-msg'>Mohon Pilih Paket Pengiriman terlebih dahulu</p>
          </a>
          <a className={`column is-paddingless insuranceButton ${error === 'insurance' && 'is-error'}`} onClick={(e) => this.onClickInsurance(e)}>
            <div className='see-all insuranceButton'>
              <span className={`link insuranceButton ${insurance.selected && 'black'}`}> { insurance.selected ? 'Pilih Asuransi' : 'Asuransi'}
                <span className='kurir insuranceButton'> {insurance.selected}</span>
                <span className='icon-arrow-down insuranceButton' />
              </span>
            </div>
            <p className='error-msg'>Mohon Pilih Asuransi terlebih dahulu</p>
          </a>
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
                      <div className='column is-half has-text-right'><span>{amountProduct} x Rp {RupiahFormat(price)}</span></div>
                    </div>
                  </li>
                  <li>
                    <div className='columns custom is-mobile'>
                      <div className='column is-half'><span>Ongkos Kirim</span></div>
                      <div className='column is-half has-text-right'><span>Rp { RupiahFormat(deliveryPrice) }</span></div>
                    </div>
                  </li>
                  <li>
                    <div className='columns custom is-mobile'>
                      <div className='column is-half'><span>Biaya Asuransi</span></div>
                      <div className='column is-half has-text-right'><span> { insurance.selected === 'Ya' ? `Rp ${RupiahFormat(insurancePrice)}` : '-' }</span></div>
                    </div>
                  </li>
                </ul>
                <ul className='total'>
                  <li>
                    <div className='columns custom is-mobile'>
                      <div className='column is-half'><strong>Total Harga Barang</strong></div>
                      <div className='column is-half has-text-right'><strong>Rp {RupiahFormat(totalPrice)}</strong></div>
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
          onClick={(e) => this.onClickAddress(e)}
          addressSelected={(e, selected) => this.addressSelected(e, selected)} />
        <OptionsExpeditions
          {...expeditions}
          onClick={(e) => this.onClickExpedition(e)}
          expeditionSelected={(e, selected) => this.expeditionSelected(e, selected)} />
        <OptionsExpeditionPackages
          expeditions={expeditions}
          expeditionsPackage={expeditionsPackage}
          onClick={(e) => this.onClickExpeditionPackage(e)}
          expeditionsPackageSelected={(e, selected) => this.expeditionsPackageSelected(e, selected)} />
        <OptionsInsurance
          {...insurance}
          onClick={(e) => this.onClickInsurance(e)}
          insuranceSelected={(e, selected) => this.insuranceSelected(e, selected)} />
        <div className='sort-option' id='addCartNotif' style={{ display: cartNotification && 'block' }}>
          <div className='notif-report add-cart-notif'>
            <MyImage src={Images.phoneAccount} alt='phoneAccout' />
            <p>Produk telah berhasil dimasukkan ke Keranjang Belanja</p>
            <button className='button is-primary is-large is-fullwidth' onClick={() => Router.push('/shopping-cart')}>Lihat Keranjang Belanja</button>
            <button className='button is-primary is-large is-fullwidth is-outlined' onClick={() => Router.push('/')}>Kembali Belanja</button>
          </div>
        </div>
      </Content>
    )
  }
}

const mapStateToProps = (state) => ({
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
  addToCart: state.addToCart
})

const mapDispatchToProps = (dispatch) => ({
  setAmountProduct: (params) => dispatch(purchaseActions.amountProduct(params)),
  setEstimatedShipping: (params) => dispatch(expeditionActions.estimatedShipping(params)),
  setAddressSelected: (params) => dispatch(purchaseActions.addressSelected(params)),
  setCourierExpedition: (params) => dispatch(purchaseActions.courierExpedition(params)),
  setPackageExpedition: (params) => dispatch(purchaseActions.packageExpedition(params)),
  setInsurance: (params) => dispatch(purchaseActions.insurance(params)),
  setNoted: (params) => dispatch(purchaseActions.noted(params)),
  setAddToCart: (params) => dispatch(cartActions.addToCart(params)),
  getProduct: (params) => dispatch(productActions.getProduct(params)),
  getListAddress: () => dispatch(addressActions.getListAddress())
})

export default connect(mapStateToProps, mapDispatchToProps)(Purchase)
