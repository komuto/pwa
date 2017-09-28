// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import Router from 'next/router'
// import NProgress from 'nprogress'
// components
import Content from '../Components/Content'
import Section from '../Components/Section'
import Notification from '../Components/Notification'
// import { ButtonFullWidth } from '../Components/Button'
import {Images} from '../Themes'
// actions
import * as loginAction from '../actions/user'
// utils
import { isFetching, isError } from '../Services/Status'

class Account extends Component {
  constructor (props) {
    super(props)
    this.state = {
      profile: props.profile,
      verify: false,
      submitting: false,
      notification: {
        status: false,
        message: 'Error, default message.'
      }
    }
  }

  handleVerify () {
    this.setState({verify: !this.state.verify})
  }

  sendOTPPhone (e) {
    e.preventDefault()
    this.setState({ submitting: true })
    this.props.sendOTPToPhone()
  }

  handleOnClick (e) {
    e.preventDefault()
    const { profile } = this.props
    if (profile.user.store.hasOwnProperty('name')) {
      Router.push('/manage-store')
    } else {
      if (profile.user.user.is_phone_verified) {
        Router.push('/information-store')
      } else {
        this.handleVerify()
      }
    }
  }

  manageAccount (e) {
    e.preventDefault()
    Router.push('/manage-account')
  }

  async componentDidMount () {
    // NProgress.start()
    await this.props.getProfile()
  }

  componentWillReceiveProps (nextProps) {
    const { profile } = nextProps
    const { submitting } = this.state
    if (nextProps.sendOTPPhone.isFound && submitting) {
      Router.push('/verify-no-telp')
    }

    if (!isFetching(profile)) {
      // NProgress.done()
      if (isError({ ...profile })) {
        this.setState({ profile, notification: { status: true, message: 'Profile tidak ditemukan' } })
      } else {
        this.setState({ profile })
      }
    }
  }

  renderModalVerify () {
    const { verify, submitting } = this.state
    return (
      <div className='sort-option' style={{display: verify && 'block'}}>
        <div className='notif-report'>
          <img src={Images.unverifiedPhone} alt='' />
          <h3>Anda Belum Memverifikasi Nomor Telepon</h3>
          <p>Verifikasi Nomor Telepon Anda terlebih dahulu untuk melanjutkan proses membuka toko</p>
          <button
            onClick={(e) => this.sendOTPPhone(e)}
            className={`button is-primary is-large is-fullwidth ${submitting && 'is-loading'}`}>
            Verifikasi Sekarang
          </button>
          <strong
            className='cancel'
            onClick={() => this.handleVerify()}
            style={{color: '#56aaef', padding: '20px', display: 'block', marginTop: '10px'}}>
            Batal
          </strong>
        </div>
      </div>
    )
  }

  renderStore () {
    const { profile } = this.state
    const isHasStoreprofile = profile.user.store.hasOwnProperty('name')
    if (!profile.isFound) return null
    return (
      <Section className='bg-white'>
        <div className='profile-wrapp'>
          <ul>
            <li onClick={(e) => this.handleOnClick(e)}>
              <div className='box is-paddingless'>
                <article className='media'>
                  <div className='media-left'>
                    <figure className='image'>
                      { isHasStoreprofile ? <img src={profile.user.store.logo} /> : <span className='icon-toko' /> }
                    </figure>
                  </div>
                  <div className='media-content'>
                    <div className='content'>
                      <p>
                        <strong>{ isHasStoreprofile ? profile.user.store.name : 'Anda belum memiliki Toko'}</strong><br />
                        { isHasStoreprofile ? 'Kelola Toko Anda' : 'Buat Sekarang'}
                      </p>
                    </div>
                  </div>
                </article>
              </div>
              <span className='icon-arrow-right' />
            </li>
          </ul>
        </div>
      </Section>
    )
  }

  render () {
    const { profile, notification } = this.state
    return (
      <Content>
        <Notification
          type='is-danger'
          isShow={notification.status}
          activeClose
          onClose={() => this.setState({notification: {status: false, message: ''}})}
          message={notification.message} />
        {
          profile.isFound &&
          <div>
            <Section className='bg-white'>
              {
              profile.user.user.status === 0
              ? <div className='notif-verify'>
                <div className='box is-paddingless'>
                  <article className='media'>
                    <div className='media-left'>
                      <figure className='image'>
                        <span className='icon-verify' />
                      </figure>
                    </div>
                    <div className='media-content'>
                      <div className='content'>
                        <p>
                          <strong>Verifikasikan email untuk mengakses semua menu</strong>
                          Silahkan klik link verifikasi yang telah kami kirimkan ke { profile.user.user.email }
                          <a className='button is-warning is-outlined'>Kirim Ulang link verifikasi</a>
                        </p>
                      </div>
                    </div>
                  </article>
                </div>
              </div>
              : ''
            }
              <div className='profile-wrapp'>
                <ul>
                  <li onClick={(e) => this.manageAccount(e)}>
                    <div className='box is-paddingless'>
                      <article className='media'>
                        <div className='media-left'>
                          <figure className='image user-pict'>
                            <img src={(profile.user.user.photo) ? profile.user.user.photo : Images.noImage} alt='pict' />
                          </figure>
                        </div>
                        <div className='media-content'>
                          <div className='content'>
                            <p className='user-name'>
                              <strong>{ profile.user.user.name }</strong>
                              <br />
                              Kelola Akun
                            </p>
                            { profile.user.user.is_phone_verified ? '' : <div className='val-right'>
                              <span className='notif-akun'>1</span></div>
                            }
                          </div>
                        </div>
                      </article>
                    </div>
                    <span className='icon-arrow-right' />
                  </li>
                  <li>
                    <div className='box is-paddingless'>
                      <article className='media'>
                        <div className='media-left'>
                          <figure className='image'>
                            <span className='icon-saldo' />
                          </figure>
                        </div>
                        <div className='media-content'>
                          <div className='content'>
                            <p>
                              <strong>Saldo</strong>
                            </p>
                            <div className='val-right'><span>Rp { profile.user.user.saldo_wallet }</span></div>
                          </div>
                        </div>
                      </article>
                    </div>
                    <span className='icon-arrow-right' />
                  </li>
                  <li>
                    <div className='box is-paddingless'>
                      <article className='media'>
                        <div className='media-left'>
                          <figure className='image'>
                            <span className='icon-list-lg' />
                          </figure>
                        </div>
                        <div className='media-content'>
                          <div className='content'>
                            <p>
                              <strong>Daftar Toko Favorit</strong>
                            </p>
                          </div>
                        </div>
                      </article>
                    </div>
                    <span className='icon-arrow-right' />
                  </li>
                </ul>
              </div>
            </Section>
            {this.renderStore()}
            {this.renderModalVerify()}
          </div>
        }
      </Content>
    )
  }
}

const mapStateToProps = (state) => ({
  sendOTPPhone: state.sendOTPPhone,
  profile: state.profile
})

const mapDispatchToProps = dispatch => ({
  sendOTPToPhone: () => dispatch(loginAction.sendOTPPhone()),
  getProfile: () => dispatch(loginAction.getProfile())
})

export default connect(mapStateToProps, mapDispatchToProps)(Account)
