// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import Router from 'next/router'
// components
import NProgress from 'nprogress'
// actions
import * as actionTypes from '../actions/user'
// services
import GET_TOKEN from '../Services/GetToken'
import { Status } from '../Services/Status'

class ManageAccount extends Component {
  constructor (props) {
    super(props)
    this.state = {
      profile: props.profile,
      loadingBiodata: false,
      notification: {
        status: false,
        color: 'is-success',
        message: 'Error, default message.'
      },
      submitSignOut: false
    }
  }

  handleNotification (e) {
    const { notification } = this.state
    const newState = { notification, changePassword: {} }
    newState.notification['status'] = !notification.status
    this.setState(newState)
  }

  componentDidMount () {
    const { notification, profile } = this.state
    const { getProfile, query, changePassword } = this.props
    if (!profile.isFound) {
      getProfile()
    }
    if (query.hasOwnProperty('isSuccess')) {
      if (!changePassword.isLoading) {
        switch (changePassword.status) {
          case Status.SUCCESS: {
            const newNotification = { notification }
            newNotification.notification['status'] = true
            newNotification.notification['message'] = changePassword.message
            newNotification.notification['color'] = 'is-success'
            this.setState(newNotification)
            break
          }
          case Status.OFFLINE :
          case Status.FAILED : {
            const newNotif = { notification }
            newNotif.notification['status'] = true
            newNotif.notification['message'] = changePassword.message
            newNotif.notification['color'] = 'is-danger'
            this.setState(newNotif)
            break
          }
          default:
            break
        }
        this.setState({ notification })
      }
    }
  }

  async componentWillReceiveProps (nextProps) {
    const { submitSignOut } = this.state
    const { profile, isLogin } = nextProps
    if (profile.isFound) {
      this.setState({ profile })
    }
    if (!isLogin.login && submitSignOut) {
      this.setState({ submitSignOut: false })
        const href = `/profile?isSignOut`
        const as = 'profile'
        Router.push(href, as, { shallow: true })
        NProgress.done()
    }
  }

  toNomorHandphone (e) {
    e.preventDefault()
    const { profile } = this.state
    if (!profile.user.user.phone_number) {
      Router.push('/add-no-handphone')
    } else {
      Router.push('/nomor-handphone')
    }
  }

  toManageBiodata (e) {
    e.preventDefault()
    this.setState({ loadingBiodata: true })
    NProgress.start()
    Router.push('/manage-biodata')
  }

  toRekeningBank (e) {
    e.preventDefault()
    Router.push('/data-rekening')
  }

  toDataAddress (e) {
    e.preventDefault()
    Router.push('/data-address')
  }

  toChangePassword (e) {
    e.preventDefault()
    Router.push('/change-password')
  }

  toSettingNotification (e) {
    e.preventDefault()
    Router.push('/setting-notification')
  }

  signOut (e) {
    e.preventDefault()
    this.props.stateLogin({ login: false })
    this.props.logout()
    this.setState({ submitSignOut: true })
  }

  render () {
    const { profile, notification } = this.state
    return (
      <div>
        <div
          className={`notification ${notification.status && notification.color}`}
          style={{display: notification.status ? 'block' : 'none'}}>
          <button className='delete' onClick={(e) => this.handleNotification(e)} />
          {notification.message}
        </div>
        <section className='section is-paddingless has-shadow'>
          <div className='seller-akun'>
            <div className='profile-wrapp'>
              <ul>
                <li onClick={(e) => this.toManageBiodata(e)}>
                  <div className='box is-paddingless'>
                    <article className='media'>
                      <div className='media-left'>
                        <figure className='image'>
                          <span className='icon-biodata' />
                        </figure>
                      </div>
                      <div className='media-content'>
                        <div className='content'>
                          <p>
                            <strong>Biodata</strong><br />
                          </p>
                        </div>
                      </div>
                    </article>
                  </div>
                  <span className='icon-arrow-right' />
                </li>
                <li onClick={(e) => this.toNomorHandphone(e)}>
                  <div className='box is-paddingless'>
                    <article className='media'>
                      <div className='media-left'>
                        <figure className='image'>
                          <span className='icon-nohp' />
                        </figure>
                      </div>
                      <div className='media-content'>
                        <div className='content'>
                          <p>
                            <strong>Nomor Handphone</strong><br />
                            <span>{profile.status === 200 && !profile.user.user.is_phone_verified && 'Belum terverifikasi'}</span>
                          </p>
                          <div className='val-right'>
                            {profile.status === 200 && !profile.user.user.is_phone_verified && <span className='notif-akun'>1</span>}
                          </div>
                        </div>
                      </div>
                    </article>
                  </div>
                  <span className='icon-arrow-right' />
                </li>
                <li onClick={(e) => this.toRekeningBank(e)}>
                  <div className='box is-paddingless'>
                    <article className='media'>
                      <div className='media-left'>
                        <figure className='image'>
                          <span className='icon-rekening' />
                        </figure>
                      </div>
                      <div className='media-content'>
                        <div className='content'>
                          <p>
                            <strong>Rekening Bank</strong><br />
                          </p>
                        </div>
                      </div>
                    </article>
                  </div>
                  <span className='icon-arrow-right' />
                </li>
                <li onClick={(e) => this.toDataAddress(e)}>
                  <div className='box is-paddingless'>
                    <article className='media'>
                      <div className='media-left'>
                        <figure className='image'>
                          <span className='icon-data-address' />
                        </figure>
                      </div>
                      <div className='media-content'>
                        <div className='content'>
                          <p>
                            <strong>Data Alamat</strong><br />
                          </p>
                        </div>
                      </div>
                    </article>
                  </div>
                  <span className='icon-arrow-right' />
                </li>
                <li onClick={(e) => this.toChangePassword(e)}>
                  <div className='box is-paddingless'>
                    <article className='media'>
                      <div className='media-left'>
                        <figure className='image'>
                          <span className='icon-pass' />
                        </figure>
                      </div>
                      <div className='media-content'>
                        <div className='content'>
                          <p>
                            <strong>Ganti Password</strong><br />
                          </p>
                        </div>
                      </div>
                    </article>
                  </div>
                  <span className='icon-arrow-right' />
                </li>
                <li onClick={(e) => this.toSettingNotification(e)}>
                  <div className='box is-paddingless'>
                    <article className='media'>
                      <div className='media-left'>
                        <figure className='image'>
                          <span className='icon-notif' />
                        </figure>
                      </div>
                      <div className='media-content'>
                        <div className='content'>
                          <p>
                            <strong>Pengaturan Notifikasi</strong><br />
                          </p>
                        </div>
                      </div>
                    </article>
                  </div>
                  <span className='icon-arrow-right' />
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section className='section is-paddingless has-shadow'>
          <div className='seller-akun'>
            <div className='profile-wrapp'>
              <ul>
                <li onClick={(e) => this.signOut(e)}>
                  <div className='box is-paddingless'>
                    <article className='media'>
                      <div className='media-left'>
                        <figure className='image'>
                          <span className='icon-logout' />
                        </figure>
                      </div>
                      <div className='media-content'>
                        <div className='content'>
                          <p>
                            <strong>Log Out</strong><br />
                          </p>
                        </div>
                      </div>
                    </article>
                  </div>
                  <span className='icon-arrow-right' />
                </li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    profile: state.profile,
    changePassword: state.changePassword,
    user: state.user,
    isLogin: state.isLogin
  }
}

const mapDispatchToProps = dispatch => ({
  getProfile: () => dispatch(actionTypes.getProfile()),
  logout: () => dispatch(actionTypes.logout()),
  stateLogin: (params) => dispatch(actionTypes.stateLogin(params))
})

export default connect(mapStateToProps, mapDispatchToProps)(ManageAccount)
