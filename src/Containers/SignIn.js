// @flow
import React, { Component } from 'react'
class SignIn extends Component {
  render () {
    return (
      <div className='main user login'>
        <nav className='level header is-fullwidth'>
          <div className='nav-left'>
            <a href='profile' className='level-item'>
              <span><span className='icon-arrow-left' /> Login</span>
            </a>
          </div>
        </nav>
        <section className='hero'>
          <div className='container is-fluid'>
            <p>Belum punya akun? <a href='signup'>Daftar Disini</a></p>
          </div>
        </section>
        <section className='content'>
          <div className='container is-fluid'>
            <form action='#' className='form'>
              <div className='field'>
                <p className='control'>
                  <input className='input' type='email' placeholder='Alamat Email' />
                </p>
              </div>
              <div className='field'>
                <p className='control'>
                  <input className='input' type='password' placeholder='Password' />
                </p>
              </div>
              <div className='field'>
                <p>Dengan mendaftar Anda telah menyetujui <a href='#'>Syarat dan Ketentuan</a> dari Komuto</p>
              </div>

              <a className='button is-primary is-large is-fullwidth'>Login</a>

              <div className='has-text-centered'><a href='password-reset'>Lupa Password</a></div>
              <div className='or'>
                <span>Atau</span>
              </div>
              <a className='button is-fb is-large is-fullwidth'>Login dengan facebook</a>
            </form>
          </div>
        </section>
      </div>
    )
  }
}

export default SignIn
