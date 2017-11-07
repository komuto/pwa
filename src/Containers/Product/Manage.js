// @flow
import React from 'react'
import NProgress from 'nprogress'
import { connect } from 'react-redux'
import Router from 'next/router'
// components
import Notification from '../../Components/Notification'
import { Navbar } from '../Navbar'
import MyImage from '../../Components/MyImage'
// actions
import * as storesActions from '../../actions/stores'
// lib
import RupiahFormat from '../../Lib/RupiahFormat'

class ProductManage extends React.Component {
  constructor (props) {
    super(props)
    const { isFound } = props.storeProductDetail
    const { storeProductDetail } = props.storeProductDetail
    this.state = {
      id: props.query.id || null,
      data: {
        isDropship: isFound ? storeProductDetail.product.is_dropship : '',
        stock: isFound ? storeProductDetail.product.stock : '',
        status: isFound ? storeProductDetail.product.status : '',
        images: isFound ? storeProductDetail.images : '',
        product: isFound ? storeProductDetail.product : '',
        productName: isFound ? storeProductDetail.product.name : '',
        fullName: isFound ? storeProductDetail.category.full_name : '',
        brandName: isFound ? storeProductDetail.brand !== null ? storeProductDetail.brand.name : '' : '',
        description: isFound ? storeProductDetail.product.description : '',
        price: isFound ? storeProductDetail.product.price : '',
        isDiscount: isFound ? storeProductDetail.product.is_discount : '',
        discount: isFound ? storeProductDetail.product.discount : '',
        weight: isFound ? storeProductDetail.product.weight : '',
        condition: isFound ? storeProductDetail.product.condition : '',
        isInsurance: isFound ? storeProductDetail.product.is_insurance : '',
        catalog: isFound ? storeProductDetail.catalog ? storeProductDetail.catalog.name : 'Tanpa Katalog' : '',
        wholesaler: isFound ? storeProductDetail.wholesaler : '',
        expeditionServices: isFound ? storeProductDetail.expedition_services : ''
      },
      submitting: false,
      notification: {
        type: 'is-success',
        status: false,
        message: 'Error, default message.'
      }
    }
  }

  dropshippingOption (e) {
    e.preventDefault()
    Router.push(`/dropshipping-option?id=${this.state.id}`)
  }

  changeStock (e) {
    e.preventDefault()
    Router.push(`/product-stock-manage?id=${this.state.id}`)
  }

  changeStatus (e) {
    e.preventDefault()
    Router.push(`/product-status-manage?id=${this.state.id}`)
  }

  changeCatalog (e) {
    e.preventDefault()
    Router.push(`/product-catalog-manage?id=${this.state.id}`)
  }

  updatePhoto (e) {
    e.preventDefault()
    Router.push(`/product-photo-manage?id=${this.state.id}`)
  }

  updateExpedition (e) {
    e.preventDefault()
    Router.push(`/product-expedition-manage?id=${this.state.id}`)
  }

  productUpdateNamaCategory (e) {
    e.preventDefault()
    Router.push(`/product-update-name-category?id=${this.state.id}`)
  }

  productPriceSpecificationManage (e) {
    e.preventDefault()
    Router.push(`/product-price-specification-manage?id=${this.state.id}`)
  }

  productWholesaleManage (e) {
    e.preventDefault()
    Router.push(`/product-wholesale-manage?id=${this.state.id}`)
  }

  componentDidMount () {
    const { id } = this.state
    if (id) {
      // const productId = id.split('.')[0]
      this.props.getStoreProductDetail({ id })
    }
    NProgress.start()
  }

  componentWillReceiveProps (nextProps) {
    const { storeProductDetail } = nextProps
    const { isFetching, isFound, isError, notifError } = this.props
    if (!isFetching(storeProductDetail)) {
      NProgress.done()
      if (isFound) {
        const dataStoreProduct = storeProductDetail.storeProductDetail
        const data = {
          isDropship: dataStoreProduct.product.is_dropship,
          stock: dataStoreProduct.product.stock,
          status: dataStoreProduct.product.status,
          images: dataStoreProduct.images,
          product: dataStoreProduct.product,
          productName: dataStoreProduct.product.name,
          fullName: dataStoreProduct.category.full_name,
          brandName: !dataStoreProduct.brand ? '' : dataStoreProduct.brand.name,
          description: dataStoreProduct.product.description,
          price: dataStoreProduct.product.price,
          isDiscount: dataStoreProduct.product.is_discount,
          discount: dataStoreProduct.product.discount,
          weight: dataStoreProduct.product.weight,
          condition: dataStoreProduct.product.condition,
          isInsurance: dataStoreProduct.product.is_insurance,
          catalog: dataStoreProduct.catalog ? dataStoreProduct.catalog.name : 'Tanpa Katalog',
          wholesaler: dataStoreProduct.wholesaler,
          expeditionServices: dataStoreProduct.expedition_services
        }
        this.setState({ data })
      }
      if (isError(storeProductDetail)) {
        this.setState({ notification: notifError(storeProductDetail.message) })
      }
    }
  }

  render () {
    console.log('state', this.state)
    const { data, notification } = this.state
    if (!this.props.storeProductDetail.isFound) return null
    const toProductList = () => {
      Router.push('/product-list')
    }
    const priceAfterDiscount = () => {
      return (data.isDiscount) ? data.price - ((data.price * data.discount) / 100) : data.price
    }
    const commision = () => {
      const priceDiscount = (data.isDiscount) ? data.price - ((data.price * data.discount) / 100) : data.price
      return priceDiscount * (10 / 100)
    }
    const moneyReceive = () => {
      const priceDiscount = (data.isDiscount) ? data.price - ((data.price * data.discount) / 100) : data.price
      const commision = priceDiscount * (10 / 100)
      return priceDiscount - commision
    }
    let params = {
      navbar: {
        searchBoox: false,
        deleteButton: true,
        path: '/',
        callBack: () => toProductList(),
        textPath: data.productName
      }
    }
    return (
      <div>
        <Navbar {...params} />
        <Notification
          type={notification.type}
          isShow={notification.status}
          activeClose
          onClose={() => this.setState({notification: {status: false, message: ''}})}
          message={notification.message} />
        <section className='section is-paddingless has-shadow'>
          <div className='column is-paddingless' onClick={(e) => this.dropshippingOption(e)}>
            <div className='see-all'>
              <span className='link black js-option'>Dropshipping
                <span className='kurir'>{data.isDropship ? 'Ya' : 'Tidak'}</span>
                <span className='icon-arrow-right' />
              </span>
            </div>
            <p className='error-msg'>Mohon pilih status drop shipping terlebih dahulu</p>
          </div>
          <div className='column is-paddingless' onClick={(e) => this.changeStock(e)}>
            <div className='see-all'>
              <span className='link black js-option'>Stock
                <span className='kurir'>{data.stock}</span>
                <span className='icon-arrow-right' />
              </span>
            </div>
            <p className='error-msg'>Mohon pilih isi stock terlebih dahulu</p>
          </div>
          <div className='column is-paddingless' onClick={(e) => this.changeStatus(e)}>
            <div className='see-all'>
              <span className='link black js-option'>Status
                <span className='kurir'>{data.status === 1 ? 'Ditampilkan di Toko' : 'Disembunyikan di Toko'}</span>
                <span className='icon-arrow-right' />
              </span>
            </div>
            <p className='error-msg'>Mohon Pilih Satus terlebih dahulu</p>
          </div>
        </section>
        <section className='section is-paddingless has-shadow'>
          <div className='info-purchase'>
            <div className='detail-purchase summary'>
              <h3>Foto barang yang diterima</h3>
              <a className='btn-change js-option' onClick={(e) => this.updatePhoto(e)}>Ganti</a>
              <div className='list-items'>
                <div className='columns is-mobile is-multiline'>
                  { data.images.map(image => {
                    return (
                      <div className='column' key={image.id}>
                        <MyImage src={image.file} alt='komuto' />
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className='section is-paddingless has-shadow' onClick={(e) => this.productUpdateNamaCategory(e)}>
          <div className='info-purchase'>
            <div className='detail-purchase summary'>
              <h3>Nama dan Kategori</h3>
              <a className='btn-change js-option'>Ganti</a>
              <div className='detail-result white'>
                <ul className='data-delivery'>
                  <li>
                    <div className='columns custom is-mobile'>
                      <div className='column'>
                        <strong>Nama Produk</strong>
                        <span>{data.productName}</span>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className='columns custom is-mobile'>
                      <div className='column'>
                        <strong>Kategori</strong>
                        <span>{data.fullName}</span>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className='columns custom is-mobile'>
                      <div className='column'>
                        <strong>Brand</strong>
                        <span>{data.brandName}</span>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className='columns custom is-mobile'>
                      <div className='column'>
                        <strong>Deskripsi Produk</strong>
                        <span>
                          {data.description}
                        </span>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        <section className='section is-paddingless has-shadow'>
          <div className='content-header'>
            <h3>Harga dan Spesifikasi</h3>
            <a className='btn-change' onClick={(e) => this.productPriceSpecificationManage(e)}>Ubah</a>
          </div>
          <div className='content-body'>
            <div className='columns left-style is-mobile'>
              <div className='column is-half'><strong>Harga</strong></div>
              <div className='column is-half has-text-right'>
                <span>Rp { RupiahFormat(data.price)}</span>
              </div>
            </div>
            <div className='columns left-style is-mobile'>
              <div className='column is-half'><strong>Diskon</strong></div>
              <div className='column is-half has-text-right'><span>{data.discount} %</span></div>
            </div>
            <div className='info-purchase'>
              <div className='detail'>
                <div className='detail-result'>
                  <h3 className='title-content'>Rincian Penerimaan</h3>
                  <ul>
                    <li>
                      <div className='columns custom is-mobile'>
                        <div className='column is-half'><span>Harga Jual</span></div>
                        <div className='column is-half has-text-right'><strong>Rp { RupiahFormat(priceAfterDiscount()) }</strong></div>
                      </div>
                    </li>
                    <li>
                      <div className='columns custom is-mobile'>
                        <div className='column is-half'><span>Komisi  (10%  dari Rp { RupiahFormat(priceAfterDiscount()) }</span></div>
                        <div className='column is-half has-text-right'><strong>Rp { RupiahFormat(commision()) }</strong></div>
                      </div>
                    </li>
                    <li>
                      <div className='columns custom is-mobile'>
                        <div className='column is-half'><span>Uang yang akan Anda terima</span></div>
                        <div className='column is-half has-text-right'>
                          <strong className='text-green'>Rp { RupiahFormat(moneyReceive()) }</strong>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className='columns left-style no-border is-mobile'>
              <div className='column is-half'><strong>Berat</strong></div>
              <div className='column is-half has-text-right'><span>{data.weight} Kg</span></div>
            </div>
            <div className='columns left-style is-mobile'>
              <div className='column is-half'><strong>Jenis Produk</strong></div>
              <div className='column is-half has-text-right'><span>{(data.condition === 1) ? 'Baru' : 'Bekas'}</span></div>
            </div>
            <div className='columns left-style is-mobile'>
              <div className='column is-half'><strong>Asuransi</strong></div>
              <div className='column is-half has-text-right'><span>{data.is_insurance ? 'Wajib' : 'Optional'}</span></div>
            </div>
          </div>
        </section>
        <section className='section is-paddingless has-shadow'>
          <div className='content-header'>
            <h3>Katalog</h3>
            <a className='btn-change' onClick={(e) => this.changeCatalog(e)}>Ubah</a>
          </div>
          <div className='content-body'>
            <strong>{data.catalog}</strong>
          </div>
        </section>
        <section className='section is-paddingless has-shadow'>
          <div className='content-header'>
            <h3>Grosir</h3>
            <a className='btn-change' onClick={(e) => this.productWholesaleManage(e)}>Ubah</a>
          </div>
          <div className='content-body'>
            { data.wholesaler.map(p => {
              return (
                <div className='columns left-style is-mobile' key={p.id}>
                  <div className='column is-half'><strong>{p.min} - {p.max} Barang</strong></div>
                  <div className='column is-half has-text-right'><span>{p.price} / barang</span></div>
                </div>
              )
            })}
          </div>
        </section>
        <section className='section is-paddingless has-shadow'>
          <div className='content-header'>
            <h3>Ekspedisi Pengiriman</h3>
            <a className='btn-change' onClick={(e) => this.updateExpedition(e)}>Ubah</a>
          </div>
          <div className='content-body'>
            <ul className='list'>
              { data.expeditionServices.map((expedition, index) => {
                return (
                  <li key={index}>{expedition.full_name}</li>
                )
              })}
            </ul>
          </div>
        </section>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    storeProductDetail: state.storeProductDetail
  }
}

const mapDispatchToProps = dispatch => ({
  getStoreProductDetail: (params) => dispatch(storesActions.getStoreProductDetail(params))
})

export default connect(mapStateToProps, mapDispatchToProps)(ProductManage)
