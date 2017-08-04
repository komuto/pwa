// @flow
import React from 'react'
import { connect } from 'react-redux'
// components
import Link from 'next/link'
import {Images} from '../Themes'

class HasOpenedStore extends React.Component {

  render () {
    return (
      <section className='content'>
        <div className='container is-fluid'>
          <div className='desc has-text-centered'>
            <img src={Images.hasOpenedStore} alt='komuto' />
            <p><strong>Selamat, Anda telah membuka Toko</strong></p>
            <p>Kami akan mengirim kode verifikasi toko anda ke alamat toko anda via pengiriman kurir POS.</p>
            <p>Sebelum toko anda terverifikasi sistem kami, Toko anda hanya dapat menjual produk selama 30 hari dari Sekarang.</p>
          </div>
          <div className='columns is-mobile'>
            <div className='column'>
              <Link href='profile' as='p'>
                <a className='button is-primary is-large is-fullwidth'>Kembali Ke Halaman Profil</a>
              </Link>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default connect()(HasOpenedStore)
