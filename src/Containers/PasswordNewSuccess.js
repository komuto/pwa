// @flow
import React, { Component } from 'react'
import {Images} from '../Themes'

class PasswordNewSuccess extends Component {
  render () {
    return (
      <div className='main user user-success'>
        <section className='content'>
          <div className='container is-fluid'>
            <div className='desc has-text-centered'>
              <img src={Images.password} alt='komuto' />
              <p><strong>Password berhasil diubah</strong></p>
              <p>Password Anda telah berhasil diubah. Kini Anda bisa login menggunakan password Anda yang baru.</p>
            </div>
            <div className='columns is-mobile'>
              <div className='column'>
                <a href='signin' className='button is-primary is-large is-fullwidth'>Kembali Ke Halaman Login</a>
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  }
}

export default PasswordNewSuccess
