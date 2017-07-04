// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import NProgress from 'nprogress'
import _ from 'lodash'
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
import { Status } from '../Services/Status'

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
    const { user } = this.state
    const token = await GET_TOKEN.getToken()

    if (token && _.isEmpty(user)) {
      NProgress.start()
      this.props.dispatch(loginAction.getProfile())
    }
  }

  componentWillReceiveProps (nextProps) {
    const { profile } = nextProps

    if (!profile.isLoading) {
      NProgress.done()
      switch (profile.status) {
        case Status.SUCCESS :
          (profile.isFound)
          ? this.setState({ user: profile.user })
          : this.setState({ notification: {status: true, message: 'Data tidak ditemukan'} })
          break
        case Status.OFFLINE :
        case Status.FAILED :
          this.setState({ notification: {status: true, message: profile.message} })
          break
        default:
          break
      }
    }
  }

  render () {
    let { user, notification } = this.state
    return (
      <Content>
        <Notification
          type='is-danger'
          isShow={notification.status}
          activeClose
          onClose={() => this.setState({notification: {status: false, message: ''}})}
          message={notification.message} />
        { (user)
          ? <Account user={user} />
          : <AccountLogin />
        }
      </Content>
    )
  }
}

const mapStateToProps = (state) => {
  console.log(state.profile)
  return {
    profile: state.profile
  }
}

export default connect(mapStateToProps)(Profile)
