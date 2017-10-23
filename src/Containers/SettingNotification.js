// @flow
import React from 'react'
import { connect } from 'react-redux'
import NProgress from 'nprogress'
// components
import Notification from '../Components/Notification'
// actions
import * as userAction from '../actions/user'
// services
import { isFetching, isFound, isError, validateResponse, validateResponseAlter } from '../Services/Status'

class SettingNotification extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      notifSettings: props.notifSettings,
      // form: {

      // },
      notification: {
        type: 'is-success',
        status: false,
        message: 'Error, default message.'
      }
    }
    this.submiting = false
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
    const { notifSettings } = nextProps
    if (!isFetching(notifSettings)) {
      NProgress.done()
      if (isFound(notifSettings)) {
        this.setState({ notifSettings })
      }
      if (isError(notifSettings)) {
        this.setState({ notification: validateResponse(notifSettings, notifSettings.message) })
      }
    }
    if (!isFetching(notifSettings) && this.submiting) {
      NProgress.done()
      if (isFound(notifSettings)) {
        this.setState({ notifSettings })
      }
      if (isError(notifSettings)) {
        this.setState({ notification: validateResponseAlter(notifSettings, notifSettings.message) })
      }
    }
  }

  componentDidMount () {
    NProgress.start()
    this.props.getNotifSettings()
  }

  render () {
    const { notifSettings, notification } = this.state
    if (!isFound(notifSettings)) return null
    if (isError(notifSettings)) {
      return (
        <Notification
          type={notification.type}
          isShow={notification.status}
          activeClose
          onClose={() => this.setState({notification: {status: false, message: ''}})}
          message={notification.message} />
      )
    }
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
              className={`button is-primary is-large is-fullwidth ${this.submitting && 'is-loading'}`}
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
    notifSettings: state.notifSettings
  }
}

const mapDispatchToProps = dispatch => ({
  getNotifSettings: () => dispatch(userAction.getNotifSettings()),
  updateNotifSettings: (params) => dispatch(userAction.updateNotifSettings(params))
})

export default connect(mapStateToProps, mapDispatchToProps)(SettingNotification)
