// @flow
import React, { Component } from 'react'

class PasswordReset extends Component {
  render () {
    return (
      <div className='main user'>
        <nav className='level header is-fullwidth'>
          <div className='nav-left'>
            <a href='signin' className='level-item'>
              <span><span className='icon-arrow-left' /> Lupa Password</span>
            </a>
          </div>
        </nav>
        <section className='content'>
          <div className='container is-fluid'>
            <div className='desc has-text-centered'>
              <p>Silahkan menuliskan alamat email yang Anda gunakan untuk mendaftar di Komuto</p>
            </div>
            <form action='#' className='form'>
              <div className='field'>
                <p className='control'>
                  <input className='input' type='email' placeholder='Alamat Email' />
                </p>
              </div>
              <a href='password-reset-verification' className='button is-primary is-large is-fullwidth'>Reset Password</a>
            </form>
          </div>
        </section>
      </div>
    )
  }
}

export default PasswordReset
