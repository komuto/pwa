// @flow
import React, { Component } from 'react'
import {Images} from '../Themes'
class Profile extends Component {
  render () {
    return (
      <div className='main user'>
        <nav className='level header is-fullwidth'>
          <div className='nav-left'>
            <a className='level-item'>
              <span> Profile</span>
            </a>
          </div>
        </nav>
        <section className='content'>
          <div className='container is-fluid'>
            <div className='desc has-text-centered'>
              <img src={Images.phoneAccount} alt='komuto' />
              <p><strong>Masuk ke Akun Anda untuk mempermudah proses pembelian</strong></p>
              <p>Terima Kasih, Anda telah berhasil melakukan pembelian Token Listrik. Untuk melihat Token silahkan menuju bagian Transaksi</p>
            </div>
            <div className='columns is-mobile'>
              <div className='column'>
                <a href='signup' className='button is-primary is-large is-fullwidth is-outlined'>Register</a>
              </div>
              <div className='column'>
                <a href='signin' className='button is-primary is-large is-fullwidth'>Login</a>
              </div>
            </div>
          </div>
        </section>
        <div className='level nav-bottom is-mobile'>
          <a className='level-item has-text-centered'><span className='icon-home' />Home</a>
          <a className='level-item has-text-centered'><span className='icon-bag' />Transaksi</a>
          <a className='level-item has-text-centered'><span className='icon-bell' />Notifikasi</a>
          <a className='level-item has-text-centered is-active'><span className='icon-user' />Profil</a>
        </div>
      </div>
    )
  }
}

export default Profile
