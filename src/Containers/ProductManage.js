// @flow
import React from 'react'
import { connect } from 'react-redux'
// components
import Router from 'next/router'
import { Navbar } from './Navbar'
import NProgress from 'nprogress'
// actions
import * as productActions from '../actions/product'
// lib
import RupiahFormat from '../Lib/RupiahFormat'

class ProductManage extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      id: props.query.id || null,
      productDetail: props.productDetail || null,
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

  componentDidMount () {
    const { id } = this.state
    if (id !== '') {
      this.props.getProduct({ id })
    }
    NProgress.start()
  }

  componentWillReceiveProps (nextProps) {
    const { productDetail } = nextProps
    if (productDetail.isFound) {
      this.setState({ productDetail })
      NProgress.done()
    }
    console.log('nextProps ', nextProps)
  }

  render () {
    console.log('state ', this.state)
    console.log('props ', this.props)
    const { productDetail } = this.state
    const toProductList = () => {
      Router.push('/product-list')
    }
    if (productDetail.isFound) {
      // const p = productDetail.detail.product
      // let priceAfterDiscount = (p.is_discount) ? p.price - ((p.price * p.discount) / 100) : p.price
    }
    const productName = productDetail.isFound ? productDetail.detail.product.name : ''
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
        <Navbar params={params} />
        <section className='section is-paddingless has-shadow'>
          <div className='column is-paddingless' onClick={(e) => this.dropshippingOption(e)}>
            <div className='see-all'>
              <span className='link black js-option'>Dropshipping
                <span className='kurir'>{productDetail.isFound && productDetail.detail.product.is_dropship ? 'Ya' : 'Tidak'}</span>
                <span className={`${productDetail.isLoading ? 'button self right is-loading' : 'icon-arrow-right'}`} />
              </span>
            </div>
            <p className='error-msg'>Mohon pilih status drop shipping terlebih dahulu</p>
          </div>
          <div className='column is-paddingless' onClick={(e) => this.changeStock(e)}>
            <div className='see-all'>
              <span className='link black js-option' >Stock
                <span className='kurir'>{productDetail.isFound && productDetail.detail.product.stock}</span>
                <span className='icon-arrow-right' />
              </span>
            </div>
            <p className='error-msg'>Mohon pilih isi stock terlebih dahulu</p>
          </div>
          <div className='column is-paddingless' onClick={(e) => this.changeStatus(e)}>
            <div className='see-all'>
              <span className='link black js-option'>Status
                <span className='kurir'>{productDetail.isFound && productDetail.detail.product.status === 1 ? 'Ditampilkan di Toko' : 'Disembunyikan di Toko'}</span>
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
              <a className='btn-change js-option'>Ganti</a>
              <div className='list-items'>
                <div className='columns is-mobile is-multiline'>
                  { productDetail.isFound && productDetail.detail.images.map(image => {
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
        <section className='section is-paddingless has-shadow'>
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
                        <span>{productDetail.isFound && productDetail.detail.product.name}</span>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className='columns custom is-mobile'>
                      <div className='column'>
                        <strong>Kategori</strong>
                        <span>{productDetail.isFound && productDetail.detail.category.name}</span>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className='columns custom is-mobile'>
                      <div className='column'>
                        <strong>Brand</strong>
                        <span>{productDetail.isFound && productDetail.detail.product.brand_id}</span>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className='columns custom is-mobile'>
                      <div className='column'>
                        <strong>Deskripsi Produk</strong>
                        <span>
                          {productDetail.isFound && productDetail.detail.product.description}
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
          <div className='info-purchase'>
            <div className='detail-purchase summary'>
              <h3>Harga dan Spesifikasi</h3>
              <a className='btn-change js-option'>Ganti</a>
            </div>
            <div className='product-spec'>
              <ul>
                <li>
                  <strong>Rp { RupiahFormat(productDetail.isFound && productDetail.detail.product.price)}</strong>
                  <span />
                </li>
              </ul>
            </div>
            <div className='detail'>
              <div className='detail-result'>
                <h3 className='title-content'>Rincian Penerimaan</h3>
                <ul>
                  <li>
                    <div className='columns custom is-mobile'>
                      <div className='column is-half'><strong>Harga Jual</strong></div>
                      <div className='column is-half has-text-right'><span>Rp 1.650.000</span></div>
                    </div>
                  </li>
                  <li>
                    <div className='columns custom is-mobile'>
                      <div className='column is-half'><strong>Komisi  (10%  dari Rp 1.650.000)</strong></div>
                      <div className='column is-half has-text-right'><span>Rp 16.500</span></div>
                    </div>
                  </li>
                  <li>
                    <div className='columns custom is-mobile'>
                      <div className='column is-half'><strong>Uang yang akan Anda terima</strong></div>
                      <div className='column is-half has-text-right'><span className='text-green'>Rp 1.633.500</span></div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        <section className='section is-paddingless has-shadow'>
          <div className='column is-paddingless'>
            <div className='see-all'>
              <span className='link black js-option' >Kurir Pengiriman <span className='kurir'>JNE</span><span className='icon-arrow-down' /></span>
            </div>
            <p className='error-msg'>Mohon Pilih Kurir Pengiriman terlebih dahulu</p>
          </div>
          <div className='column is-paddingless'>
            <div className='see-all'>
              <span className='link black js-option'>Pilih Paket Pengiriman <span className='kurir'>Reguler</span><span className='icon-arrow-down' /></span>
            </div>
            <p className='error-msg'>Mohon Pilih Paket Pengiriman terlebih dahulu</p>
          </div>
          <div className='column is-paddingless'>
            <div className='see-all'>
              <span className='link black js-option'>Asuransi <span className='kurir'>Tidak</span><span className='icon-arrow-down' /></span>
            </div>
            <p className='error-msg'>Mohon Pilih Paket Pengiriman terlebih dahulu</p>
          </div>
        </section>
        <section className='section is-paddingless has-shadow'>
          <div className='info-purchase'>
            <div className='detail-purchase remark'>
              <h3>Catatan (Optional)</h3>
              <div className='field'>
                <p className='control'>
                  <textarea className='textarea' placeholder='Contoh: Saya pesan barang yang warna merah' rows='2' />
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className='section is-paddingless has-shadow'>
          <div className='info-purchase'>
            <div className='detail-purchase summary'>
              <h3>Ringkasan Pemesanan</h3>
              <div className='detail-result white'>
                <ul>
                  <li>
                    <div className='columns custom is-mobile'>
                      <div className='column is-half'><span>Harga Barang</span></div>
                      <div className='column is-half has-text-right'><span>Rp 380.000</span></div>
                    </div>
                  </li>
                  <li>
                    <div className='columns custom is-mobile'>
                      <div className='column is-half'><span>Ongkos Kirim</span></div>
                      <div className='column is-half has-text-right'><span>-</span></div>
                    </div>
                  </li>
                  <li>
                    <div className='columns custom is-mobile'>
                      <div className='column is-half'><span>Asuransi</span></div>
                      <div className='column is-half has-text-right'><span>-</span></div>
                    </div>
                  </li>
                </ul>
                <ul className='total'>
                  <li>
                    <div className='columns custom is-mobile'>
                      <div className='column is-half'><strong>Harga Barang</strong></div>
                      <div className='column is-half has-text-right'><strong>Rp 380.000</strong></div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        <div className='level nav-bottom nav-button purchase is-mobile'>
          <a className='button is-primary is-m-lg is-fullwidth btn-add-cart js-option'>Masukan Ke Keranjang</a>
        </div>
        <section className='section is-paddingless has-shadow'>
          <div className='info-purchase'>
            <div className='detail-purchase summary'>
              <h3>Ringkasan Pemesanan</h3>
              <div className='detail-result white'>
                <ul>
                  <li>
                    <div className='columns custom is-mobile'>
                      <div className='column is-half'><span>Harga Barang</span></div>
                      <div className='column is-half has-text-right'><span>Rp 380.000</span></div>
                    </div>
                  </li>
                  <li>
                    <div className='columns custom is-mobile'>
                      <div className='column is-half'><span>Ongkos Kirim</span></div>
                      <div className='column is-half has-text-right'><span>-</span></div>
                    </div>
                  </li>
                  <li>
                    <div className='columns custom is-mobile'>
                      <div className='column is-half'><span>Asuransi</span></div>
                      <div className='column is-half has-text-right'><span>-</span></div>
                    </div>
                  </li>
                </ul>
                <ul className='total'>
                  <li>
                    <div className='columns custom is-mobile'>
                      <div className='column is-half'><strong>Harga Barang</strong></div>
                      <div className='column is-half has-text-right'><strong>Rp 380.000</strong></div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        <div className='level nav-bottom nav-button purchase is-mobile'>
          <a className='button is-primary is-m-lg is-fullwidth btn-add-cart js-option'>
            Masukan Ke Keranjang
          </a>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    productDetail: state.productDetail
  }
}

const mapDispatchToProps = dispatch => ({
  getProduct: (params) => dispatch(productActions.getProduct(params))
})

export default connect(mapStateToProps, mapDispatchToProps)(ProductManage)
