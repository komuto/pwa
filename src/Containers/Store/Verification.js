import React, { Component } from 'react'
import { connect } from 'react-redux'
import Router from 'next/router'
import Section from '../../Components/Section'
import Notification from '../../Components/Notification'
import * as storesActions from '../../actions/stores'

class Verificaton extends Component {
  constructor (props) {
    super(props)
    this.state = {
      otp1: null,
      otp2: null,
      otp3: null,
      otp4: null,
      otp5: null,
      otp6: null,
      isValid: 'default',
      ...props
    }
    this.submitting = {
      verifyStore: false
    }
  }

  componentWillReceiveProps (nextProps) {
    const { verifyStore } = nextProps
    const { isFound, isFetching, isError, notifError } = this.props

    if (!isFetching(verifyStore) && this.submitting.verifyStore) {
      this.submitting = { ...this.submitting, verifyStore: false }
      if (isError(verifyStore)) {
        this.setState({ notification: notifError(verifyStore.message) })
      }
      if (isFound(verifyStore)) {
        Router.push('/manage-store', '/store/manage')
      }
    }
  }

  handleInput (e) {
    let { name, value } = e.target
    if (name === 'otp1') {
      this.setState({ 'otp1': value })
      if (value) {
        this.otp2.focus()
      }
    }
    if (name === 'otp2') {
      this.setState({ 'otp2': value })
      if (value) {
        this.otp3.focus()
      }
    }
    if (name === 'otp3') {
      this.setState({ 'otp3': value })
      if (value) {
        this.otp4.focus()
      }
    }
    if (name === 'otp4') {
      this.setState({ 'otp4': value })
      if (value) {
        this.otp5.focus()
      }
    }
    if (name === 'otp5') {
      this.setState({ 'otp5': value })
      if (value) {
        this.otp6.focus()
      }
    }
    if (name === 'otp6') {
      this.setState({ 'otp6': value })
    }
  }

  submitVerification () {
    const { otp1, otp2, otp3, otp4, otp5, otp6 } = this.state
    const code = `${otp1}${otp2}${otp3}${otp4}${otp5}${otp6}`
    const isValid = !!(otp1 && otp2 && otp3 && otp4 && otp5 && otp6)

    if (isValid) {
      this.submitting = { ...this.submitting, verifyStore: true }
      this.props.setVerifyStore({ code })
      this.setState({ isValid })
    } else {
      this.setState({ isValid })
    }
  }

  render () {
    const { isValid, notification } = this.state
    return (
      <Section>
        <Notification
          type={notification.type}
          isShow={notification.status}
          activeClose
          onClose={() => this.setState({notification: {status: false, message: ''}})}
          message={notification.message} />
        <div className='user-info'>
          <p>Kode Verifikasi sedang dalam proses pengantaran ke alamat toko Anda.</p>
        </div>
        <section className='content'>
          <div className='container is-fluid'>
            <form action='#' className='form edit'>
              <div className='has-text-centered noted'>
                <p>Silahkan menuliskan kode yang telah kami kirimkan ke alamat Toko Anda</p>
              </div>
              <div className='field is-horizontal number-account'>
                <div className='field-body'>
                  <div className='field is-grouped'>
                    <p className='control'>
                      <input maxLength='1' onChange={(e) => this.handleInput(e)} ref={(input) => { this.otp1 = input }} name='otp1' className='input' type='text' style={{ textAlign: 'center' }} />
                    </p>
                    <p className='control'>
                      <input maxLength='1' onChange={(e) => this.handleInput(e)} ref={(input) => { this.otp2 = input }} name='otp2' className='input' type='text' style={{ textAlign: 'center' }} />
                    </p>
                    <p className='control'>
                      <input maxLength='1' onChange={(e) => this.handleInput(e)} ref={(input) => { this.otp3 = input }} name='otp3' className='input' type='text' style={{ textAlign: 'center' }} />
                    </p>
                    <p className='control'>
                      <input maxLength='1' onChange={(e) => this.handleInput(e)} ref={(input) => { this.otp4 = input }} name='otp4' className='input' type='text' style={{ textAlign: 'center' }} />
                    </p>
                    <p className='control'>
                      <input maxLength='1' onChange={(e) => this.handleInput(e)} ref={(input) => { this.otp5 = input }} name='otp5' className='input' type='text' style={{ textAlign: 'center' }} />
                    </p>
                    <p className='control'>
                      <input maxLength='1' onChange={(e) => this.handleInput(e)} ref={(input) => { this.otp6 = input }} name='otp6' className='input' type='text' style={{ textAlign: 'center' }} />
                    </p>
                  </div>
                </div>
              </div>
              { !isValid && <span style={{ color: 'red' }}> * Format otp yang anda masukkan tidak benar!</span> }
              <a onClick={() => !this.submitting.verifyStore && this.submitVerification()} className={`button is-primary is-large is-fullwidth ${this.submitting.verifyStore && 'is-loading'}`}>Konfirmasi Kode Verifikasi</a>
            </form>
          </div>
        </section>
      </Section>
    )
  }
}

const mapStateToProps = (state) => ({
  verifyStore: state.verifyStore
})

const mapDispatchToProps = (dispatch) => ({
  setVerifyStore: (params) => dispatch(storesActions.verifyStore(params))
})

export default connect(mapStateToProps, mapDispatchToProps)(Verificaton)
