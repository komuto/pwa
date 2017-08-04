// @flow
import React from 'react'
import { connect } from 'react-redux'
// components
import Link from 'next/link'

class AddressInfo extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      address: false
    }
  }

  handleGetAddress () {
    this.setState({address: !this.state.address})
  }

  render () {
    const { address } = this.state
    return (
      <div>
        <section className='section is-paddingless'>
          <div className='seller-bar'>
            <div className='seller-step active4'>
              <div className='step1'><span>1</span></div>
              <div className='step2'><span>2</span></div>
              <div className='step3'><span>3</span></div>
              <div className='step4'><span>4</span></div>
            </div>
          </div>
          <div className='form-seller info'>
            <a
              className='btn-address js-option'
              data-target='#addressOption'
              onClick={() => this.handleGetAddress()} >
              Ambil dari Alamat Yang ada
              <span className='icon-arrow-right'>{}</span>
            </a>
            <div className='field'>
              <label>Alamat Lengkap</label>
              <p className='control'>
                <input type='text' className='input' defaultValue='Jl. Wates km 13' />
              </p>
            </div>
            <div className='field'>
              <label className='label'>Provinsi</label>
              <p className='control'>
                <span className='select'>
                  <select>
                    <option>Yogyakarta</option>
                    <option>With options</option>
                  </select>
                </span>
              </p>
            </div>
            <div className='field'>
              <label className='label'>Kota / Kabupaten</label>
              <p className='control'>
                <span className='select'>
                  <select>
                    <option>Bantul</option>
                    <option>With options</option>
                  </select>
                </span>
              </p>
            </div>
            <div className='field'>
              <label className='label'>Kecamatan</label>
              <p className='control'>
                <span className='select'>
                  <select>
                    <option>Sedayu</option>
                    <option>With options</option>
                  </select>
                </span>
              </p>
            </div>
            <div className='field'>
              <label className='label'>Kelurahan</label>
              <p className='control'>
                <span className='select'>
                  <select>
                    <option>Argorejo</option>
                    <option>With options</option>
                  </select>
                </span>
              </p>
            </div>
            <div className='field'>
              <label>Kode Pos</label>
              <p className='control'>
                <input type='text' className='input' defaultValue='55752' />
              </p>
            </div>
            <div className='field'>
              <p className='control'>
                <Link href='has-opened-store' as='hos'>
                  <button className='button is-primary is-large is-fullwidth'>Lanjutkan</button>
                </Link>
              </p>
            </div>
          </div>
        </section>
        <div className='sort-option' id='addressOption' style={{display: address && 'block'}}>
          <div className='sort-list'>
            <p><strong>Pilih Alamat</strong></p>
            <form action='#' className='form'>
              <div className='field'>
                <div className='control popup-option'>
                  <label className='radio'>
                    <span className='opt-title'>Rumah Jakarta</span>
                    <span className='address-value'>Kemanggisan Jakarta Barat, Palmerah Jakarta Barat, DKI Jakarta, Indonesia 55673</span>
                  </label>
                  <label className='radio'>
                    <span className='opt-title'>Rumah Jogja</span>
                    <span className='address-value'>Perum Sedayu Permai C.20 Argorejo Sedayu Bantul Yogyakarta 55752</span>
                  </label>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default connect()(AddressInfo)
