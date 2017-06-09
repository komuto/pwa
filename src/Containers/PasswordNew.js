// @flow
import React, { Component } from 'react'

class PasswordNew extends Component {
  render () {
    return (
      <div className='main user login'>
        <nav className='level header is-fullwidth'>
          <div className='nav-left'>
            <a className='level-item'>
              <span><span className='icon-arrow-left' /> Password Baru</span>
            </a>
          </div>
        </nav>
        <section className='content'>
          <div className='container is-fluid'>
            <form action='#' className='form'>
              <div className='field'>
                <p className='control'>
                  <input className='input' type='password' placeholder='Password Baru' />
                </p>
              </div>
              <div className='field'>
                <p className='control'>
                  <input className='input' type='password' placeholder='Ketik Ulang Password' />
                </p>
              </div>
              <a href='password-new-success' className='button is-primary is-large is-fullwidth'>Buat Password Baru</a>
            </form>
          </div>
        </section>
      </div>
    )
  }
}

export default PasswordNew
