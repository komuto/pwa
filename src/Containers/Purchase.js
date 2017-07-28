import React, { Component } from 'react'
import { connect } from 'react-redux'
import NProgress from 'nprogress'
import Router from 'next/router'
import _ from 'lodash'
// components
import Section from '../Components/Section'
import Content from '../Components/Content'
import MyImage from '../Components/MyImage'
import Notification from '../Components/Notification'
import OptionsExpeditions from '../Components/OptionsExpeditions'
import OptionsExpeditionPackages from '../Components/OptionsExpeditionPackages'
import OptionsInsurance from '../Components/OptionsInsurance'
// actions
import * as productActions from '../actions/product'
import * as loginActions from '../actions/user'
import * as purchaseActions from '../actions/purchase'
// services
import { Status } from '../Services/Status'
import GET_TOKEN from '../Services/GetToken'
// lib
import RupiahFormat from '../Lib/RupiahFormat'
// validations
import * as inputValidations from '../Validations/Input'

class Purchase extends Component {
  constructor (props) {
    super(props)
    this.state = {
      id: props.query.id || null,
      user: props.user || null,
      productDetail: props.productDetail || null,
      shippingInformation: props.shippingInformation,
      amountProduct: props.amountProduct.amountProduct,
      expeditions: {
        data: (props.productDetail.detail && props.productDetail.detail.expeditions) || null,
        show: false,
        selected: {
          ...props.courierExpedition
        }
      },
      expeditionsPackage: {
        data: props.estimatedCharges.charges || null,
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
  }

  async plussPress () {
    let { amountProduct } = this.state
    amountProduct += 1
    await this.props.dispatch(purchaseActions.amountProduct({ amountProduct }))
    this.setState({ amountProduct })
  }

  async minPress () {
    let { amountProduct } = this.state
    amountProduct -= 1
    await this.props.dispatch(purchaseActions.amountProduct({ amountProduct }))
    this.setState({ amountProduct })
  }

  onClickExpedition = () => this.setState({ expeditions: { ...this.state.expeditions, show: true } })

  async expeditionSelected (selected) {
    await this.props.dispatch(purchaseActions.courierExpedition(selected))
    this.setState({ expeditions: { ...this.state.expeditions, show: false, selected }, error: this.state.error === 'expeditions' && null })
  }

  onClickExpeditionPackage = () => this.setState({ expeditionsPackage: { ...this.state.expeditionsPackage, show: true } })

  async expeditionsPackageSelected (selected) {
    await this.props.dispatch(purchaseActions.packageExpedition(selected))
    this.setState({ expeditionsPackage: { ...this.state.expeditionsPackage, selected, show: false }, error: this.state.error === 'expeditionsPackage' && null })
  }

  onClickInsurance = () => this.setState({ insurance: { ...this.state.insurance, show: true } })

  async insuranceSelected (selected) {
    await this.props.dispatch(purchaseActions.insurance({ insurance: selected }))
    this.setState({ insurance: { ...this.state.insurance, selected, show: false }, error: this.state.error === 'insurance' && null })
  }

  onSubmit (e) {
    e.preventDefault()
    const { shippingInformation, expeditions, expeditionsPackage, insurance } = this.state
    if (!shippingInformation.isFound) {
      this.setState({ error: 'shippingInformation' })
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
  }

  async onChangeNoted (e) {
    let { noted } = this.state
    noted = inputValidations.inputNormal(e.target.value)
    await this.props.dispatch(purchaseActions.noted({ noted }))
    this.setState({ noted })
  }

  async componentDidMount () {
    const { id, productDetail, user } = this.state
    if (!productDetail.isFound || (productDetail.isFound && String(productDetail.detail.product.id) !== String(id))) {
      NProgress.start()
      await this.props.dispatch(productActions.getProduct({ id }))
    }

    const token = await GET_TOKEN.getToken()

    if (token && _.isEmpty(user.user)) {
      NProgress.start()
      this.props.dispatch(loginActions.getProfile())
    }
  }

  componentWillReceiveProps (nextProps) {
    const { productDetail, user } = nextProps
    let { notification } = this.state

    notification = {status: false, message: 'Error, default message.'}

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
      this.setState({ productDetail, expeditions: { ...this.state.expeditions, data: productDetail.detail.expeditions }, notification })
    }

    if (!user.isLoading) {
      NProgress.done()
      switch (user.status) {
        case Status.SUCCESS :
          (user.isFound)
          ? this.setState({ user })
          : this.setState({ notification: {status: true, message: 'Data tidak ditemukan'} })
          break
        case Status.OFFLINE :
        case Status.FAILED :
          this.setState({ notification: {status: true, message: user.message} })
          break
        default:
          break
      }
    }
  }

  render () {
    const { id, productDetail, user, shippingInformation, expeditions, expeditionsPackage, insurance, amountProduct, noted, error, submiting, notification } = this.state
    const { product, images } = productDetail.detail

    if (!productDetail.isFound) return null
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
            !shippingInformation.isFound
            ? <section
              className={`section is-paddingless has-shadow ${error === 'shippingInformation' && 'is-error'}`}
              onClick={() => Router.push(`/shipping-information?id=${id}`)}>
              <div className={`column is-paddingless ${error === 'shippingInformation' && 'is-error'}`}>
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
                  <a className='btn-change' onClick={() => Router.push(`/shipping-information?id=${id}`)}>Ganti</a>
                  <div className='detail-result white'>
                    <ul className='data-delivery'>
                      <li>
                        <div className='columns custom is-mobile'>
                          <div className='column'>
                            <strong>Nama Penerima</strong>
                            <span>{ shippingInformation.recipient }</span>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className='columns custom is-mobile'>
                          <div className='column'>
                            <strong>Alamat Email</strong>
                            <span>{ user.user && user.user.user.email }</span>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className='columns custom is-mobile'>
                          <div className='column'>
                            <strong>No Handphone</strong>
                            <span>{ shippingInformation.handphone }</span>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className='columns custom is-mobile'>
                          <div className='column'>
                            <strong>Alamat</strong>
                            <span>
                              { shippingInformation.address } { shippingInformation.villages.name },<br />
                              { shippingInformation.subDistricts.name }<br />
                              { shippingInformation.districts.name }<br />
                              { shippingInformation.provinces.name }, Indonesia { shippingInformation.postalCode }
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
                      <div className='column is-half has-text-right'><span>{ expeditionsPackage.selected.cost }</span></div>
                    </div>
                  </li>
                  <li>
                    <div className='columns custom is-mobile'>
                      <div className='column is-half'><span>Asuransi</span></div>
                      <div className='column is-half has-text-right'><span>{ insurance.selected }</span></div>
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
        <OptionsExpeditions
          {...expeditions}
          expeditionSelected={(selected) => this.expeditionSelected(selected)} />
        <OptionsExpeditionPackages
          {...expeditionsPackage}
          expeditionsPackageSelected={(selected) => this.expeditionsPackageSelected(selected)} />
        <OptionsInsurance
          {...insurance}
          insuranceSelected={(selected) => this.insuranceSelected(selected)} />
      </Content>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    productDetail: state.productDetail,
    amountProduct: state.amountProduct,
    shippingInformation: state.shippingInformation,
    courierExpedition: state.courierExpedition,
    packageExpedition: state.packageExpedition,
    estimatedCharges: state.estimatedCharges,
    insurance: state.insurance,
    noted: state.noted,
    user: state.profile
  }
}

export default connect(mapStateToProps)(Purchase)
