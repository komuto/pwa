// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
// import Router from 'next/router'
import NProgress from 'nprogress'
// components
import Content from '../Components/Content'
import Section from '../Components/Section'
// import { ButtonFullWidth } from '../Components/Button'
import Link from 'next/link'
import {Images} from '../Themes'
// actions
import * as loginAction from '../actions/user'

class Account extends Component {
  constructor (props) {
    super(props)
    this.state = {
      verify: false
    }
  }

  handleVerify () {
    this.setState({verify: !this.state.verify})
  }

  handleSignOutClick () {
    NProgress.start()
    this.props.dispatch(loginAction.logout())
  }

  componentWillReceiveProps (nextProps) {
    // const { user } = nextProps
    // const data = user
  }

  render () {
    const { user } = this.props
    const { verify } = this.state
    return (
      <Content>
        <Section className='bg-white'>
          {
          user.status === 0
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
                      Silahkan klik link verifikasi yang telah kami kirimkan ke { user.email }
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
              <li>
                <div className='box is-paddingless'>
                  <article className='media'>
                    <div className='media-left'>
                      <figure className='image user-pict'>
                        <img src={(user.photo) ? user.photo : Images.noImage} alt='pict' />
                      </figure>
                    </div>
                    <div className='media-content'>
                      <div className='content'>
                        <p className='user-name'>
                          <strong>{ user.name }</strong>
                          <br />
                          Kelola Akun
                        </p>
                        <div className='val-right'><span className='notif-akun'>1</span></div>
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
                        <div className='val-right'><span>Rp { user.saldo_wallet }</span></div>
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
        <Section className='bg-white'>
          <div className='profile-wrapp'>
            <ul>
              <li>
                <div className='box is-paddingless' onClick={() => this.handleVerify()}>
                  <article className='media'>
                    <div className='media-left'>
                      <figure className='image'>
                        <span className='icon-toko' />
                      </figure>
                    </div>
                    <div className='media-content'>
                      <div className='content'>
                        <p>
                          <strong>Anda belum memiliki Toko</strong><br />
                          Buat Sekarang
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
        <div className='sort-option' style={{display: verify && 'block'}}>
          <div className='notif-report'>
            <img src={Images.unverifiedPhone} alt='' />
            <h3>Anda Belum Memverifikasi Nomor Telepon</h3>
            <p>Verifikasi Nomor Telepon Anda terlebih dahulu untuk melanjutkan proses membuka toko</p>
            <Link href='verify-no-telp' as='v'>
              <button className='button is-primary is-large is-fullwidth'>Verifikasi Sekarang</button>
            </Link>
            <strong className='cancel' onClick={() => this.handleVerify()} style={{color: '#56aaef', padding: '20px', display: 'block', marginTop: '10px'}}>Batal</strong>
          </div>
        </div>
      </Content>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    // user: state.user
  }
}

export default connect(mapStateToProps)(Account)
