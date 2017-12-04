// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import Router from 'next/router'
// components
import NProgress from 'nprogress'
import Notification from '../../Components/Notification'
// actions
import * as actionTypes from '../../actions/user'

class ManageAccount extends Component {
  constructor (props) {
    super(props)
    this.state = {
      profileUser: props.profileUser || null,
      isPhoneVerified: true,
      loadingBiodata: false,
      notification: {
        type: 'is-success',
        status: false,
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
    const { query, changePassword, isFetching, isFound, notifSuccess } = this.props
    this.props.getProfile()
    if (query.hasOwnProperty('isSuccess')) {
      if (!isFetching(changePassword)) {
        if (isFound(changePassword)) {
          this.setState({ notification: notifSuccess(changePassword.message) })
          if (this.timeout) clearTimeout(this.timeout)
          this.timeout = setTimeout(() => {
            this.setState({ notification: { ...this.state.notification, status: false } })
          }, 3000)
        }
      }
    }
  }

  componentWillReceiveProps (nextProps) {
    const { submitSignOut } = this.state
    const { profileUser, isLogin } = nextProps
    const { isFetching, isFound } = this.props
    if (!isFetching(profileUser)) {
      if (isFound(profileUser)) {
        this.setState({ profileUser, isPhoneVerified: profileUser.user.user.is_phone_verified })
      }
    }
    if (!isLogin.login && submitSignOut) {
      this.setState({ submitSignOut: false })
      const href = `/profile?isSignOut`
      const as = 'profile'
      Router.push(href, as)
      NProgress.done()
    }
  }

  toNomorHandphone (e) {
    e.preventDefault()
    const { profileUser } = this.state
    if (!profileUser.user.user.phone_number) {
      Router.push('/add-no-handphone')
    } else {
      Router.push('/nomor-handphone')
    }
  }

  toManageBiodata (e) {
    e.preventDefault()
    this.setState({ loadingBiodata: true })
    Router.push('/manage-biodata')
  }

  toRekeningBank (e) {
    e.preventDefault()
    Router.push('/data-rekening')
  }

  toDataAddress (e) {
    e.preventDefault()
    Router.push('/manage-address')
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
    const { isPhoneVerified, notification } = this.state
    return (
      <div>
        <Notification
          type={notification.type}
          isShow={notification.status}
          activeClose
          onClose={() => this.setState({notification: {status: false, message: ''}})}
          message={notification.message} />
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
                            {<span>{(!isPhoneVerified) && 'Belum terverifikasi'}</span>}
                          </p>
                          <div className='val-right'>
                            {(!isPhoneVerified) && <span className='notif-akun'>1</span>}
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
    profileUser: state.profile,
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
