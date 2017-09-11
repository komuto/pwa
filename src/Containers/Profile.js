// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import NProgress from 'nprogress'
// components
import Content from '../Components/Content'
import AccountLogin from './AccountLogin'
import Account from './Account'
import Notification from '../Components/Notification'
// services
import GET_TOKEN from '../Services/GetToken'
// actions
import * as loginAction from '../actions/user'
// utils
import { validateResponse, isFetching } from '../Services/Status'

class Profile extends Component {
  constructor (props) {
    super(props)
    this.state = ({
      profile: props.profile,
      notification: {
        status: false,
        message: 'Error, default message.'
      }
    })
  }

  async componentDidMount () {
    const { profile } = this.state
    const { query, getProfile } = this.props
    const token = await GET_TOKEN.getToken()
    if (token) {
      NProgress.start()
      getProfile()
    }
    if (query.hasOwnProperty('isSignOut')) {
      const newState = { profile }
      newState.profile['isFound'] = false
      this.setState(newState)
    }
  }

  componentWillReceiveProps (nextProps) {
    const { profile } = nextProps
    if (!isFetching(profile)) {
      NProgress.done()
      this.setState({ profile, notification: validateResponse(profile, 'Profile tidak ditemukan') })
    }
  }

  render () {
    let { profile, notification } = this.state
    return (
      <Content>
        <Notification
          type='is-danger'
          isShow={notification.status}
          activeClose
          onClose={() => this.setState({notification: {status: false, message: ''}})}
          message={notification.message} />
        {
          profile.isFound
          ? <Account profile={profile} />
          : <AccountLogin />
        }
      </Content>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  profile: state.profile
})

const mapDispatchToProps = dispatch => ({
  getProfile: () => dispatch(loginAction.getProfile())
})

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
