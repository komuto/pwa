// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import NProgress from 'nprogress'
// components
import Content from '../Components/Content'
import AccountLogin from './AccountLogin'
import Account from './Account'
import Notification from '../Components/Notification'
import GET_TOKEN from '../Services/GetToken'
// actions
import * as loginAction from '../actions/user'

class Profile extends Component {
  constructor (props) {
    super(props)
    this.state = ({
      user: props.profile.user || null,
      notification: {
        status: false,
        message: 'Error, default message.'
      }
    })
  }

  async componentDidMount () {
    const token = await GET_TOKEN.getToken()
    if (token) {
      NProgress.start()
      this.props.dispatch(loginAction.getProfile())
    }
  }

  componentWillReceiveProps (nextProps) {
    const { profile } = nextProps
    const { notification } = this.state

    if (!profile.isOnline) {
      NProgress.done()
      notification.status = true
      notification.message = profile.message
    }

    //  if (!profile.isFound) {
    //   NProgress.done()
    //   notification.status = true
    //   notification.message = 'Data tidak di temukan'
    //  }

    if (profile.isFound && !profile.isLoading) {
      NProgress.done()
      notification.status = false
      notification.message = ''
      this.setState({ user: profile.user })
    }
  }

  render () {
    let { user, notification } = this.state
    user = null
    return (
      <Content>
        <Notification
          type='is-warning'
          isShow={notification.status}
          activeClose
          onClose={() => this.setState({notification: {status: false, message: ''}})}
          message={notification.message} />
        { (user) ? <Account user={user} notification={notification} /> : <AccountLogin /> }
      </Content>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    profile: state.profile
  }
}

export default connect(mapStateToProps)(Profile)
