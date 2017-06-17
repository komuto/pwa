// @flow
import React from 'react'
import Link from 'next/link'
import {Images} from '../Themes'

export default (props:any) => {
  return (
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
  )
}
