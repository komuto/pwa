// @flow
import React, { Component } from 'react'
import {Images} from '../Themes'
class PasswordResetVerification extends Component {
  render () {
    return (
      <div className='main user user-success'>
        <section className='content'>
          <div className='container is-fluid'>
            <div className='desc has-text-centered'>
              <img src={Images.regSuccess} alt='komuto' />
              <p><strong>Link Reset Password telah terkirim</strong></p>
              <p>Kami telah mengirim link reset password ke dwinawan@gmail.com. Silahkan periksa inbox Anda, dan ikuti petunjuk di email tersebut.</p>
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

export default PasswordResetVerification
