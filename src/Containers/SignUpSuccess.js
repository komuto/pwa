// @flow
import React, { Component } from 'react'
import {Images} from '../Themes'

class SignUpSuccess extends Component {
  render () {
    return (
      <div className='main user user-success'>
        <section className='content'>
          <div className='container is-fluid'>
            <div className='desc has-text-centered'>
              <img src={Images.regSuccess} alt='komuto' />
              <p><strong>Selamat Datang di Komuto </strong></p>
              <p>Selamat bergabung dengan komuto. Disini Anda bisa melakukan lorem ipsum dolor sit amet consequence dolor</p>
            </div>
            <div className='columns is-mobile'>
              <div className='column'>
                <a href='profile' className='button is-primary is-large is-fullwidth'>Ke Halaman Profil</a>
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  }
}

export default SignUpSuccess
