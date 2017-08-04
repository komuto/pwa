import React, { Component } from 'react'
import { connect } from 'react-redux'
import Loading from '../Components/Loading'
// actions
// import * as cartActions from '../actions/cart'

class ShippingDetail extends Component {
  // constructor (props) {
  //   super(props)
  // }

  render () {
    return (
      <section className='section is-paddingless has-shadow'>
        <div className='detail-product'>
          <div className='purchase'>
            <figure className='img-item'>
              <img src='../images/pict.jpg' alt='pict' />
            </figure>
            <h3>Blue Training Kit Machester United</h3>
            <span className='price'>Sport Station Shop</span>
          </div>
        </div>
        <Loading type='ovals' size={12} color='#70707E' className='is-fullwidth has-text-centered' />
        <div className='detail-purchase summary at-cart'>
          <div className='detail-result white'>
            <a className='btn-change js-option' data-target='#changeAddress'>Ganti</a>
            <ul className='data-delivery'>
              <li>
                <div className='columns custom is-mobile'>
                  <div className='column'>
                    <strong>Alamat Pengirim</strong>
                    <span>
                      Kemanggisan Jakarta Barat,<br />
                      Palmerah<br />
                      Jakarta Barat<br />
                      DKI Jakarta, Indonesia 55673
                    </span>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className='column is-paddingless'>
          <div className='see-all'>
            <span className='link black js-option' data-target='#kurir'>Kurir Pengiriman
              <span className='kurir'>JNE</span><span className='icon-arrow-down' /></span>
          </div>
          <p className='error-msg'>Mohon Pilih Kurir Pengiriman terlebih dahulu</p>
        </div>
        <div className='column is-paddingless'>
          <div className='see-all'>
            <span className='link black js-option' data-target='#deliveryPackage'>Pilih Paket Pengiriman
              <span className='kurir'>Reguler</span>
              <span className='icon-arrow-down' /></span>
          </div>
          <p className='error-msg'>Mohon Pilih Paket Pengiriman terlebih dahulu</p>
        </div>
        <div className='column is-paddingless'>
          <div className='see-all'>
            <span className='link black js-option' data-target='#insurance'>Asuransi
              <span className='kurir'>Tidak</span>
              <span className='icon-arrow-down' /></span>
          </div>
          <p className='error-msg'>Mohon Pilih Paket Pengiriman terlebih dahulu</p>
        </div>
        <div className='info-purchase'>
          <div className='detail-purchase remark'>
            <h3>Catatan</h3>
            <p className='note-remark'>Saya pesan barang yang warna merah</p>
          </div>
        </div>
        <div className='detail-purchase summary'>
          <div className='detail-result detail-price'>
            <h3>Rincian Harga</h3>
            <ul>
              <li>
                <div className='columns custom is-mobile'>
                  <div className='column is-half'><span>Harga Barang</span></div>
                  <div className='column is-half has-text-right'><span>Rp 380.000</span></div>
                </div>
              </li>
              <li>
                <div className='columns custom is-mobile'>
                  <div className='column is-half'><span>Biaya Asuransi</span></div>
                  <div className='column is-half has-text-right'><span>Rp 10.000</span></div>
                </div>
              </li>
              <li>
                <div className='columns custom is-mobile'>
                  <div className='column is-half'><span>Ongkos Kirim</span></div>
                  <div className='column is-half has-text-right'><span>Rp 8.000</span></div>
                </div>
              </li>
              <li>
                <div className='columns custom is-mobile'>
                  <div className='column is-half'><strong>Harga Barang</strong></div>
                  <div className='column is-half has-text-right'><strong>Rp 380.000</strong></div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    cart: state.cart
  }
}

export default connect(mapStateToProps)(ShippingDetail)
