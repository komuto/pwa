// @flow
import React from 'react'
import { connect } from 'react-redux'
// components
import Link from 'next/link'
import {Images} from '../Themes'

class ShippingExpedition extends React.Component {

  render () {
    return (
      <div>
        <section className='section is-paddingless has-shadow'>
          <div className='seller-bar'>
            <div className='seller-step active2'>
              <div className='step1'><span>1</span></div>
              <div className='step2'><span>2</span></div>
              <div className='step3'><span>3</span></div>
              <div className='step4'><span>4</span></div>
            </div>
          </div>
          <div className='note'>
            Pilihlah ekspedisi pengiriman yang digunakan oleh toko Anda untuk mengirim barang
          </div>
          <div className='filter-option active'>
            <div className='sort-list check-all'>
              <label className='checkbox'>
                <span className='sort-text'>Pilih Semua</span>
                <span className='input-wrapper'>
                  <input type='checkbox' id='diskon' />
                </span>
              </label>
              <div className='eks-name'>
                <span>TIKI</span>
                <span><img src={Images.tiki} alt='' /></span>
              </div>
            </div>
            <div className='sort-list check-list'>
              <label className='checkbox' >
                <span className='sort-text'>TIKI ONS (Over Night Service)</span>
                <span className='input-wrapper'>
                  <input type='checkbox' id='diskon' />
                </span>
              </label>
              <label className='checkbox' for='#terverifikasi'>
                <span className='sort-text'>TIKI Reguler</span>
                <span className='input-wrapper'>
                  <input type='checkbox' id='terverifikasi' />
                </span>
              </label>
              <label className='checkbox' for='#grosir'>
                <span className='sort-text'>TIKI Ekonomi</span>
                <span className='input-wrapper'>
                  <input type='checkbox' id='grosir' />
                </span>
              </label>
              <label className='checkbox' for='#grosir'>
                <span className='sort-text'>TIKI HDS</span>
                <span className='input-wrapper'>
                  <input type='checkbox' id='grosir' />
                </span>
              </label>
            </div>
          </div>
        </section>

        <section className='section is-paddingless'>
          <div className='filter-option active'>
            <div className='sort-list check-all'>
              <label className='checkbox' >
                <span className='sort-text'>Pilih Semua</span>
                <span className='input-wrapper'>
                  <input type='checkbox' id='diskon' />
                </span>
              </label>
              <div className='eks-name'>
                <span>JNE</span>
                <span><img src={Images.jne} alt='' /></span>
              </div>
            </div>
            <div className='sort-list check-list'>
              <label className='checkbox' >
                <span className='sort-text'>JNE Reguler</span>
                <span className='input-wrapper'>
                  <input type='checkbox' id='diskon' />
                </span>
              </label>
              <label className='checkbox' for='#terverifikasi'>
                <span className='sort-text'>JNE YES</span>
                <span className='input-wrapper'>
                  <input type='checkbox' id='terverifikasi' />
                </span>
              </label>
              <label className='checkbox' for='#grosir'>
                <span className='sort-text'>JNE OKE</span>
                <span className='input-wrapper'>
                  <input type='checkbox' id='grosir' />
                </span>
              </label>
              <label className='checkbox' for='#grosir'>
                <span className='sort-text'>JNE Popbox</span>
                <span className='input-wrapper'>
                  <input type='checkbox' id='grosir' />
                </span>
              </label>
              <label className='checkbox' for='#grosir'>
                <span className='sort-text'>JNE CTC</span>
                <span className='input-wrapper'>
                  <input type='checkbox' id='grosir' />
                </span>
              </label>
              <label className='checkbox' for='#grosir'>
                <span className='sort-text'>JNE CTC OKE</span>
                <span className='input-wrapper'>
                  <input type='checkbox' id='grosir' />
                </span>
              </label>
              <label className='checkbox' for='#grosir'>
                <span className='sort-text'>JNE CTC YES</span>
                <span className='input-wrapper'>
                  <input type='checkbox' id='grosir' />
                </span>
              </label>
            </div>
          </div>
        </section>

        <section className='section is-paddingless'>
          <div className='filter-option active'>
            <div className='sort-list check-all'>
              <label className='checkbox' >
                <span className='sort-text'>Pilih Semua</span>
                <span className='input-wrapper'>
                  <input type='checkbox' id='diskon' />
                </span>
              </label>
              <div className='eks-name'>
                <span>POS Indonesia</span>
                <span><img src={Images.pos} alt='' /></span>
              </div>
            </div>
            <div className='sort-list check-list'>
              <label className='checkbox' >
                <span className='sort-text'>Paket Kilat Khusus</span>
                <span className='input-wrapper'>
                  <input type='checkbox' id='diskon' />
                </span>
              </label>
              <label className='checkbox' for='#terverifikasi'>
                <span className='sort-text'>Paket Biasa</span>
                <span className='input-wrapper'>
                  <input type='checkbox' id='terverifikasi' />
                </span>
              </label>
              <label className='checkbox' for='#grosir'>
                <span className='sort-text'>Pos Express</span>
                <span className='input-wrapper'>
                  <input type='checkbox' id='grosir' />
                </span>
              </label>
              <label className='checkbox' for='#grosir'>
                <span className='sort-text'>Express Next Day - Dokumen</span>
                <span className='input-wrapper'>
                  <input type='checkbox' id='grosir' />
                </span>
              </label>
              <label className='checkbox' for='#grosir'>
                <span className='sort-text'>Express Next Day - Barang</span>
                <span className='input-wrapper'>
                  <input type='checkbox' id='grosir' />
                </span>
              </label>
            </div>
          </div>
        </section>

        <section className='section is-paddingless'>
          <div className='payment-detail action'>
            <ul>
              <li>
                <Link href='owner-information' as='oi'>
                  <a className='button is-primary is-large is-fullwidth'>Lanjutkan</a>
                </Link>
              </li>
            </ul>
          </div>
        </section>
      </div>
    )
  }
}

export default connect()(ShippingExpedition)
