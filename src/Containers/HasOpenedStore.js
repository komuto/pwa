// @flow
import React from 'react'
import { connect } from 'react-redux'
// components
import Router from 'next/router'
import {Images} from '../Themes'
// actions
import * as actionTypes from '../actions/user'

class HasOpenedStore extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      submitting: false
    }
  }

  toProfile (e) {
    e.preventDefault()
    this.setState({ submitting: true })
    this.props.getProfile()
  }

  componentWillReceiveProps (nextProps) {
    const { submitting } = this.state
    if (nextProps.profile.status === 200 && submitting) {
      this.setState({ profile: nextProps.profile, submitting: false })
      Router.push('/profile')
    }
  }

  render () {
    return (
      <section className='content'>
        <div className='container is-fluid'>
          <div className='desc has-text-centered'>
            <img src={Images.hasOpenedStore} alt='komuto' />
            <p><strong>Selamat, Anda telah membuka Toko</strong></p>
            <p>Kami akan mengirim kode verifikasi toko anda ke alamat toko anda via pengiriman kurir POS.</p>
            <p>Sebelum toko anda terverifikasi sistem kami, Toko anda hanya dapat menjual produk selama 30 hari dari Sekarang.</p>
          </div>
          <div className='columns is-mobile'>
            <div className='column'>
              <a
                className='button is-primary is-large is-fullwidth'
                onClick={(e) => this.toProfile(e)}>
                Kembali Ke Halaman Profil
              </a>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    profile: state.profile
  }
}

const mapDispatchToProps = dispatch => ({
  getProfile: () => dispatch(actionTypes.getProfile())
})

export default connect(mapStateToProps, mapDispatchToProps)(HasOpenedStore)
