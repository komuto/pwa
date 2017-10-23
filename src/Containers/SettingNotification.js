// @flow
import React from 'react'
import { connect } from 'react-redux'
import NProgress from 'nprogress'
// components
import Notification from '../Components/Notification'
// actions
import * as userAction from '../actions/user'

class SettingNotification extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      notifSettings: props.notifSettings,
      formSetting: [],
      notification: {
        type: 'is-success',
        status: false,
        message: 'Error, default message.'
      }
    }
    this.submiting = false
    this.fetchingFirst = true
  }

  handleInput (e) {
    const { name } = e.target
    let { notifSettings } = this.state
    const newState = { notifSettings }
    newState.notifSettings.settings.map(setting => {
      if (setting.type === Number(name)) {
        setting['is_active'] = !setting.is_active
      }
      return setting
    })
    this.setState(newState)
  }

  updateSettingNotification (e) {
    e.preventDefault()
    this.submiting = true
    const { notifSettings } = this.state
    const notifications = notifSettings.settings.map(val => {
      return { type: val.type, is_active: val.is_active }
    })
    this.props.updateNotifSettings({ notifications })
  }

  componentWillReceiveProps (nextProps) {
    const { notifSettings } = nextProps
    const { isFetching, isFound, isError, notifSuccess, notifError } = this.props
    if (!isFetching(notifSettings) && this.fetchingFirst) {
      NProgress.done()
      this.fetchingFirst = false
      if (isFound(notifSettings)) {
        this.setState({ notifSettings })
      }
      if (isError(notifSettings)) {
        this.setState({ notification: notifError(notifSettings.message) })
      }
    }
    if (!isFetching(notifSettings) && this.submiting) {
      NProgress.done()
      this.submiting = false
      if (isFound(notifSettings)) {
        this.setState({ notifSettings, notification: notifSuccess(notifSettings.message) })
      }
      if (isError(notifSettings)) {
        this.setState({ notification: notifError(notifSettings.message) })
      }
    }
  }

  componentDidMount () {
    NProgress.start()
    this.props.getNotifSettings()
  }

  render () {
    const { notifSettings, notification, formSetting } = this.state
    return (
      <section className='section is-paddingless'>
        <Notification
          type={notification.type}
          isShow={notification.status}
          activeClose
          onClose={() => this.setState({notification: {status: false, message: ''}})}
          message={notification.message} />
        <div className='title-head'>
          <p>Pilih Notifikasi yang ingin dikirimkan ke akun Anda</p>
        </div>
        <div className='data-wrapper'>
          <ul className='set-notify'>
            {
              notifSettings.settings.map((setting, i) => {
                let isChecked = setting.is_active
                return (
                  <li key={i}>
                    <span>{setting.content}</span>
                    <label className='switch right grey-style'>
                      <input type='checkbox' name={setting.type}
                        checked={isChecked}
                        onChange={(e) => this.handleInput(e)}
                        value={formSetting.is_active} />
                      <span className='slider round' />
                    </label>
                  </li>
                )
              })
            }
          </ul>
          <div className='field'>
            <a
              className={`button is-primary is-large is-fullwidth ${this.submiting && 'is-loading'}`}
              onClick={(e) => this.updateSettingNotification(e)}>Simpan Perubahan
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
