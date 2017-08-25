import React, { Component } from 'react'
import { connect } from 'react-redux'
import Router from 'next/router'
// component
// import MyImage from '../Components/MyImage'
import Content from '../Components/Content'
import Wizard from '../Components/Wizard'

class ProductAddStepThree extends Component {
  // constructor (props) {
  //   super(props)
  // }

  render () {
    return (
      <Content>
        <Wizard total={4} active={3} />
        <section className='section is-paddingless has-shadow'>
          <div className='container is-fluid'>
            <div className='title'>
              <h3>Spesifikasi</h3>
            </div>
          </div>
          <div className='spec-price'>
            <div className='field is-horizontal'>
              <div className='field-body columns is-mobile'>
                <div className='field column'>
                  <label className='label'>Harga Produk</label>
                  <p className='control is-expanded price'>
                    <span className='currency'>Rp</span>
                    <input className='input' type='text' value='1.650.000' />
                  </p>
                </div>
                <div className='field column is-one-quarter'>
                  <label className='label'>Diskon</label>
                  <p className='control is-expanded discount'>
                    <span className='disc'>%</span>
                    <input className='input' type='text' value='0' />
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className='detail spec'>
            <div className='detail-result'>
              <h3>Rincian Penerimaan</h3>
              <ul>
                <li>
                  <div className='columns custom is-mobile'>
                    <div className='column is-half'>Harga Jual</div>
                    <div className='column is-half has-text-right'><strong>Rp 1.650.000</strong></div>
                  </div>
                </li>
                <li>
                  <div className='columns custom is-mobile'>
                    <div className='column is-half'>Komisi  (10%  dari Rp 1.650.000)</div>
                    <div className='column is-half has-text-right'><strong>Rp 16.500</strong></div>
                  </div>
                </li>
                <li>
                  <div className='columns custom is-mobile'>
                    <div className='column is-half'>Uang yang akan Anda terima</div>
                    <div className='column is-half has-text-right'><strong className='total'>Rp 1.633.500</strong></div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className='spec-price'>
            <div className='field'>
              <label className='label'>Berat Produk</label>
              <p className='control is-expanded discount'>
                <span className='disc'>Kg</span>
                <input className='input' type='text' value='0.5' />
              </p>
            </div>
            <div className='field'>
              <label className='label'>Stock Produk</label>
              <p className='control is-expanded'>
                <input className='input' type='text' value='0.5' />
              </p>
            </div>
            <div className='field radio-horizontal'>
              <label className='label'>Jenis Produk</label>
              <p className='control'>
                <label className='radio primary'>
                  <input type='radio' name='report' />
                  <strong>Baru</strong>
                </label>
                <label className='radio primary'>
                  <input type='radio' name='report' />
                  <strong>Bekas</strong>
                </label>
              </p>
            </div>
            <div className='field'>
              <label className='label'>Asuransi Produk</label>
              <p className='control'>
                <label className='radio primary'>
                  <input type='radio' name='report' />
                  <strong>Optional</strong>
                </label>
                <label className='radio primary'>
                  <input type='radio' name='report' />
                  <strong>Wajib</strong>
                </label>
              </p>
            </div>
          </div>
        </section>
        <section className='section is-paddingless has-shadow'>
          <div className='container is-fluid'>
            <div className='title'>
              <h3>Opsi</h3>
            </div>
          </div>
          <div className='filter-option active right-style'>
            <div className='sort-list check-all top'>
              <label className='checkbox'>
                <span className='sort-text'>Jadikan Dropshipping</span>
                <span>Memungkinkan penjual lain untuk menjual barang ini di toko mereka</span>
                <a className='modal-button' data-target='#modalDropship'>Pelajari Lebih Lanjut tentang dropshipping</a>
                <span className='input-wrapper'>
                  <input type='checkbox' id='addBrand' />
                </span>
              </label>
              <label className='checkbox'>
                <span className='sort-text'>Sembunyikan Barang</span>
                <span>Barang yang disembunyikan tidak akan muncul di toko Anda. Tapi tetap dapat di dropshipping kan</span>
                <span className='input-wrapper'>
                  <input type='checkbox' id='addBrand' />
                </span>
              </label>
            </div>
          </div>
        </section>
        <section className='section is-paddingless has-shadow'>
          <div className='container is-fluid'>
            <div className='title'>
              <h3>Katalog Toko</h3>
            </div>
          </div>
          <div className='spec-price'>
            <div className='field'>
              <label>Katalog</label>
              <p className='control'>
                <span className='select'>
                  <select>
                    <option>Sepatu Pria</option>
                    <option>With options</option>
                  </select>
                </span>
              </p><br />
              <a className='js-option' data-target='#addCatalog'>+ Tambah Katalog</a>
            </div>
          </div>
        </section>
        <section className='section is-paddingless has-shadow'>
          <div className='container is-fluid'>
            <div className='title'>
              <h3>Grosir</h3>
            </div>
          </div>
          <div className='spec-price'>
            <label className='switch right'>
              <input type='checkbox' />
              <span className='slider round' />
            </label>
            <h3 className='title-content'>Aktifkan Harga Grosir</h3>
            <p>Memberikan harga spesial kepada pembeli untuk pembelian dalam jumlah tertentu</p>
          </div>
          <div className='spec-price'>
            <div className='field'>
              <div className='field-body columns'>
                <div className='field column quarter'>
                  <label className='label'>Harga Produk</label>
                  <p className='control is-expanded prod-qty'>
                    <input className='input' type='text' value='10' />
                    <span>s/d</span>
                    <input className='input' type='text' value='15' />
                  </p>
                </div>
                <div className='field column'>
                  <label className='label'>Diskon</label>
                  <p className='control is-expanded price'>
                    <span className='currency'>Rp</span>
                    <input className='input' type='text' value='1.650.000' />
                  </p>
                </div>
              </div>
            </div>
            <div className='remove-wrapp'>
              <a className='remove'>Hapus</a>
            </div>
          </div>
          <div className='spec-price'>
            <div className='field'>
              <div className='field-body columns'>
                <div className='field column quarter'>
                  <label className='label'>Harga Produk</label>
                  <p className='control is-expanded prod-qty'>
                    <input className='input' type='text' value='10' />
                    <span>s/d</span>
                    <input className='input' type='text' value='15' />
                  </p>
                </div>
                <div className='field column'>
                  <label className='label'>Diskon</label>
                  <p className='control is-expanded price'>
                    <span className='currency'>Rp</span>
                    <input className='input' type='text' value='1.650.000' />
                  </p>
                </div>
              </div>
            </div>
            <div className='remove-wrapp'>
              <a className='remove'>Hapus</a>
            </div>
          </div>
          <div className='spec-price'>
            <a>+ Tambah Daftar Harga Grosir</a>
          </div>
        </section>
        <section className='section is-paddingless'>
          <div className='payment-detail action'>
            <ul>
              <li>
                <a onClick={() => Router.push('/product-add-step-four')} className='button is-primary is-large is-fullwidth'>Lanjutkan</a>
              </li>
            </ul>
          </div>
        </section>
      </Content>
    )
  }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = (dispatch) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(ProductAddStepThree)
