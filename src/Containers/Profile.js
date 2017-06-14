// @flow
import React, { Component } from 'react'
import Link from 'next/link'
import {Images} from '../Themes'
// components
import { Navigation } from '../Components/Navigation'
import Tabbar, { PROFILE } from '../Components/Tabbar'
class Profile extends Component {
  render () {
    return (
      <div className='main user'>
        <Navigation
          path=''
          icon=''
          textPath='Profile' />
        <section className='content'>
          <div className='container is-fluid'>
            <div className='desc has-text-centered'>
              <img src={Images.phoneAccount} alt='komuto' />
              <p><strong>Masuk ke Akun Anda untuk mempermudah proses pembelian</strong></p>
              <p>Terima Kasih, Anda telah berhasil melakukan pembelian Token Listrik. Untuk melihat Token silahkan menuju bagian Transaksi</p>
            </div>
            <div className='columns is-mobile'>
              <div className='column'>
                <Link href='signup'><a className='button is-primary is-large is-fullwidth is-outlined'>Register</a></Link>
              </div>
              <div className='column'>
                <Link href='signin'><a className='button is-primary is-large is-fullwidth'>Login</a></Link>
              </div>
            </div>
          </div>
        </section>
        <Tabbar active={PROFILE} />
      </div>
    )
  }
}

export default Profile
