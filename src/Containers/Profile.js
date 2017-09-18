// @flow
import React, { Component } from 'react'
// components
import AccountLogin from './AccountLogin'
import Account from './Account'

class Profile extends Component {
  render () {
    if (this.props.isLogin) {
      return <Account {...this.props} />
    } else {
      return <AccountLogin {...this.props} />
    }
  }
}

export default Profile
