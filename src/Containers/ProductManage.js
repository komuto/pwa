// @flow
import React from 'react'
import { connect } from 'react-redux'
// components
import Router from 'next/router'
import { Navbar } from './Navbar'
import NProgress from 'nprogress'
// actions
import * as storesActions from '../actions/stores'
// lib
import RupiahFormat from '../Lib/RupiahFormat'

class ProductManage extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      id: props.query.id || null,
      storeProductDetail: props.storeProductDetail || null,
      submitting: false
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

  componentDidMount () {
    const { id } = this.state
    if (id !== '') {
      const productId = id.split('.')[0]
      this.props.getStoreProductDetail({ id: productId })
    }
    NProgress.start()
  }

  componentWillReceiveProps (nextProps) {
    const { storeProductDetail } = nextProps
    if (storeProductDetail.isFound) {
      this.setState({ storeProductDetail })
      NProgress.done()
    }
    console.log('nextProps ', nextProps)
  }

  render () {
    console.log('state ', this.state)
    console.log('props ', this.props)
    const { storeProductDetail } = this.state
    const toProductList = () => {
      Router.push('/product-list')
    }
    const discount = () => {
      if (storeProductDetail.isFound) {
        const p = storeProductDetail.storeProductDetail.product
        return (p.is_discount) ? p.discount : 0
      } else {
        return ''
      }
    }
    const priceAfterDiscount = () => {
      if (storeProductDetail.isFound) {
        const p = storeProductDetail.storeProductDetail.product
        return (p.is_discount) ? p.price - ((p.price * p.discount) / 100) : p.price
      } else {
        return ''
      }
    }
    const commision = () => {
      if (storeProductDetail.isFound) {
        const p = storeProductDetail.storeProductDetail.product
        const priceDiscount = (p.is_discount) ? p.price - ((p.price * p.discount) / 100) : p.price
        return priceDiscount * (10 / 100)
      } else {
        return ''
      }
    }
    const moneyReceive = () => {
      if (storeProductDetail.isFound) {
        const p = storeProductDetail.storeProductDetail.product
        const priceDiscount = (p.is_discount) ? p.price - ((p.price * p.discount) / 100) : p.price
        const commision = priceDiscount * (10 / 100)
        return priceDiscount - commision
      } else {
        return ''
      }
    }
    const productType = () => {
      if (storeProductDetail.isFound) {
        const p = storeProductDetail.storeProductDetail.product
        return (p.condition === 1) ? 'Baru' : 'Bekas'
      } else {
        return ''
      }
    }
    const insuranceType = () => {
      if (storeProductDetail.isFound) {
        const p = storeProductDetail.storeProductDetail.product
        return (p.is_insurance) ? 'Wajib' : 'Optional'
      } else {
        return ''
      }
    }
    const productName = storeProductDetail.isFound ? storeProductDetail.storeProductDetail.product.name : ''
    let params = {
      navbar: {
        searchBoox: false,
        deleteButton: true,
        path: '/',
        callBack: () => toProductList(),
        textPath: productName
      }
    }
    return (
      <div>
        <Navbar {...params} />
        <section className='section is-paddingless has-shadow'>
          <div className='column is-paddingless' onClick={(e) => this.dropshippingOption(e)}>
            <div className='see-all'>
              <span className='link black js-option'>Dropshipping
                <span className='kurir'>{storeProductDetail.isFound && storeProductDetail.storeProductDetail.product.is_dropship ? 'Ya' : 'Tidak'}</span>
                <span className={`${storeProductDetail.isLoading ? 'button self right is-loading' : 'icon-arrow-right'}`} />
              </span>
            </div>
            <p className='error-msg'>Mohon pilih status drop shipping terlebih dahulu</p>
          </div>
          <div className='column is-paddingless' onClick={(e) => this.changeStock(e)}>
            <div className='see-all'>
              <span className='link black js-option'>Stock
                <span className='kurir'>{storeProductDetail.isFound && storeProductDetail.storeProductDetail.product.stock}</span>
                <span className='icon-arrow-right' />
              </span>
            </div>
            <p className='error-msg'>Mohon pilih isi stock terlebih dahulu</p>
          </div>
          <div className='column is-paddingless' onClick={(e) => this.changeStatus(e)}>
            <div className='see-all'>
              <span className='link black js-option'>Status
                <span className='kurir'>{storeProductDetail.isFound && storeProductDetail.storeProductDetail.product.status === 1 ? 'Ditampilkan di Toko' : 'Disembunyikan di Toko'}</span>
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
                  { storeProductDetail.isFound && storeProductDetail.storeProductDetail.images.map(image => {
                    return (
                      <div className='column' key={image.id}>
                        <img src={image.file} alt='komuto' />
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
                        <span>{storeProductDetail.isFound && storeProductDetail.storeProductDetail.product.name}</span>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className='columns custom is-mobile'>
                      <div className='column'>
                        <strong>Kategori</strong>
                        <span>{storeProductDetail.isFound && storeProductDetail.storeProductDetail.category.full_name}</span>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className='columns custom is-mobile'>
                      <div className='column'>
                        <strong>Brand</strong>
                        <span>{storeProductDetail.isFound && storeProductDetail.storeProductDetail.brand.name}</span>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className='columns custom is-mobile'>
                      <div className='column'>
                        <strong>Deskripsi Produk</strong>
                        <span>
                          {storeProductDetail.isFound && storeProductDetail.storeProductDetail.product.description}
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
            <a className='btn-change'>Ubah</a>
          </div>
          <div className='content-body'>
            <div className='columns left-style is-mobile'>
              <div className='column is-half'><strong>Harga</strong></div>
              <div className='column is-half has-text-right'>
                <span>Rp { RupiahFormat(storeProductDetail.isFound ? storeProductDetail.storeProductDetail.product.price : '')}</span>
              </div>
            </div>
            <div className='columns left-style is-mobile'>
              <div className='column is-half'><strong>Diskon</strong></div>
              <div className='column is-half has-text-right'><span>{discount()} %</span></div>
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
              <div className='column is-half has-text-right'><span>{storeProductDetail.isFound ? storeProductDetail.storeProductDetail.product.weight : ''} Kg</span></div>
            </div>
            <div className='columns left-style is-mobile'>
              <div className='column is-half'><strong>Jenis Produk</strong></div>
              <div className='column is-half has-text-right'><span>{productType()}</span></div>
            </div>
            <div className='columns left-style is-mobile'>
              <div className='column is-half'><strong>Asuransi</strong></div>
              <div className='column is-half has-text-right'><span>{insuranceType()}</span></div>
            </div>
          </div>
        </section>
        <section className='section is-paddingless has-shadow'>
          <div className='content-header'>
            <h3>Katalog</h3>
            <a className='btn-change' onClick={(e) => this.changeCatalog(e)}>Ubah</a>
          </div>
          <div className='content-body'>
            <strong>{storeProductDetail.isFound ? storeProductDetail.storeProductDetail.catalog.name : ''}</strong>
          </div>
        </section>
        <section className='section is-paddingless has-shadow'>
          <div className='content-header'>
            <h3>Grosir</h3>
            <a className='btn-change'>Ubah</a>
          </div>
          <div className='content-body'>
            { storeProductDetail.isFound && storeProductDetail.storeProductDetail.wholesaler.map(p => {
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
              { storeProductDetail.isFound && storeProductDetail.storeProductDetail.expedition_services.map((expedition, index) => {
                return (
                  <li key={index}>{expedition}</li>
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
