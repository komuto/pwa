// @flow
import React from 'react'
import { connect } from 'react-redux'
// import Router from 'next/router'
// components
// actions
import * as actionTypes from '../actions/user'

class SettingNotification extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      formNotification: {
      },
      notification: {
        status: false,
        color: 'is-success',
        message: 'Error, default message.'
      },
      submitting: false,
      validation: false
    }
  }

  handleInput (e) {
    const { name, value } = e.target
    let { formPassword } = this.state
    const newState = { formPassword }
    newState.formPassword[name] = value
    this.setState(newState)
  }

  postSettingNotification (e) {
    e.preventDefault()
  }

  componentWillReceiveProps (nextProps) {
  }

  componentDidMount () {
  }

  render () {
    const { submitting, notification } = this.state
    return (
      <section className='section is-paddingless'>
        <div
          className={`notification ${notification.status && notification.color}`}
          style={{display: notification.status ? 'block' : 'none'}}>
          <button className='delete' onClick={(e) => this.handleNotification(e)} />
          {notification.message}
        </div>
        <div className='title-head'>
          <p>Pilih Notifikasi yang ingin dikirimkan ke akun Anda</p>
        </div>
        <div className='data-wrapper'>
          <ul className='set-notify'>
            <li>
              <span>Setiap pesan pribadi dari admin saya terima</span>
              <label className='switch right grey-style'>
                <input type='checkbox' />
                <span className='slider round' />
              </label>
            </li>
            <li>
              <span>Setiap Pesan Berita dari Komuto.</span>
              <label className='switch right grey-style'>
                <input type='checkbox' />
                <span className='slider round' />
              </label>
            </li>
            <li>
              <span>Setiap Review dan komentar saya terima.</span>
              <label className='switch right grey-style'>
                <input type='checkbox' />
                <span className='slider round' />
              </label>
            </li>
            <li>
              <span>Setiap Diskusi produk dan komentar saya terima.</span>
              <label className='switch right grey-style'>
                <input type='checkbox' />
                <span className='slider round' />
              </label>
            </li>
            <li>
              <span>Setiap Pesan Pribadi saya terima.</span>
              <label className='switch right grey-style'>
                <input type='checkbox' />
                <span className='slider round' />
              </label>
            </li>
          </ul>
          <div className='field'>
            <a
              className={`button is-primary is-large is-fullwidth ${submitting && 'is-loading'}`}
              onClick={(e) => this.postSettingNotification(e)}>Simpan Perubahan
              </a>
          </div>
        </div>
      </section>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    changePassword: state.changePassword
  }
}

const mapDispatchToProps = dispatch => ({
  changePassword: () => dispatch(actionTypes.changePassword())
})

export default connect(mapStateToProps, mapDispatchToProps)(SettingNotification)
