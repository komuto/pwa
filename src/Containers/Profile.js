// @flow
import React, { Component } from 'react'
// import Link from 'next/link'
// import {Images} from '../Themes'
import localForage from 'localforage'
// components
import { Navigation } from '../Components/Navigation'
import Tabbar, { PROFILE } from '../Components/Tabbar'
import AccountLogin from './AccountLogin'
import Account from './Account'
class Profile extends Component {
  constructor (props) {
    super(props)
    this.state = ({
      user: null,
      sessionReady: false
    })
  }

  componentWillMount () {
    localForage.getItem('sessionLogin').then((value) => {
      this.setState({ user: value, sessionReady: true })
    })
  }

  render () {
    const { sessionReady, user } = this.state
    if (!sessionReady) return null
    return (
      <div className='main user bg-grey'>
        <Navigation
          path=''
          icon=''
          textPath='Profile' />
        { (user) ? <Account user={user} /> : <AccountLogin /> }
        <Tabbar active={PROFILE} />
      </div>
    )
  }
}

export default Profile
