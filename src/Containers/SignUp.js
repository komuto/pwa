// @flow
import React, { Component } from 'react'
class SignUp extends Component {
  constructor (props) {
    super(props)
    this.state = {
      genderChecked: 'question'
    }
    this.handleGenderChange = this.handleGenderChange.bind(this)
  }

  handleGenderChange (genderChecked) {
    this.setState({genderChecked})
  }

  render () {
    const { genderChecked } = this.state
    return (
      <div className='main user'>
        <nav className='level header is-fullwidth'>
          <div className='nav-left'>
            <a href='signin' className='level-item'>
              <span><span className='icon-arrow-left' /> Register</span>
            </a>
          </div>
        </nav>
        <section className='hero'>
          <div className='container is-fluid'>
            <p>Sudah punya akun? <a href='signin'>Login Disini</a></p>
          </div>
        </section>
        <section className='content'>
          <div className='container is-fluid'>
            <form action='#' className='form'>
              <div className='field'>
                <p className='control'>
                  <input className='input' type='text' placeholder='Nama Lengkap' />
                </p>
              </div>
              <div className='field'>
                <p className='control'>
                  <input className='input' type='text' placeholder='Nomor Handphone' />
                </p>
              </div>
              <div className='field'>
                <p className='control'>
                  <input className='input' type='text' placeholder='Alamat Email' />
                </p>
              </div>
              <div className='field'>
                <p className='control'>
                  <input className='input' type='password' placeholder='Password' />
                </p>
              </div>
              <div className='field'>
                <p className='control'>
                  <input className='input' type='password' placeholder='Konfirmasi Password' />
                </p>
              </div>
              <div className='field'>
                <label className='label'>Gender</label>
                <p className='control'>
                  <label className={`radio ${(genderChecked === 'Pria') ? 'checked' : ''} `}>
                    <input type='radio' name='question' onChange={() => this.handleGenderChange('Pria')} />
                    Pria
                  </label>
                  <label className={`radio ${(genderChecked === 'Wanita') ? 'checked' : ''} `}>
                    <input type='radio' name='question' onChange={() => this.handleGenderChange('Wanita')} />
                    Wanita
                  </label>
                </p>
              </div>
              <div className='field'>
                <p>Dengan mendaftar Anda telah menyetujui <a href='#'>Syarat dan Ketentuan</a> dari Komuto</p>
              </div>
              <a href='signup-verification' className='button is-primary is-large is-fullwidth'>Register</a>
              <div className='or'><span>Atau</span></div>
              <a href='profile' className='button is-fb is-large is-fullwidth'><span className='icon-fb' />Login dengan facebook</a>
            </form>
          </div>
        </section>
      </div>
    )
  }
}

export default SignUp
