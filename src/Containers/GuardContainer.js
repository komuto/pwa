// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getToken } from '../Services/GetToken'
import Router from 'next/router'

import AuthActions, {isLoggedIn} from '../Redux/AuthRedux'

class GuardContainer extends Component {
  state:{
    user: Object
  }

  logout (props:any) {
    props.logout()
    return Router.push('/')
  }

  constructor (props: any) {
    super(props)
    const {user} = props
    this.state = {
      user
    }

    getToken()
  }

  componentWillReceiveProps (newProps) {
    const {user, loggedIn} = newProps

    if (user && loggedIn) {
      this.setState({
        user
      })
    } else {
      this.logout(this.props)
    }
  }

  render () {
    return (<div>
      {this.props.children}
    </div>
    )
  }
}

const stateToProps = (state) => ({
  loggedIn: isLoggedIn(state.auth),
  user: state.auth.user
})

const dispatchToProps = (dispatch) => ({
  logout: () => dispatch(AuthActions.authLogout())
})

export default connect(stateToProps, dispatchToProps)(GuardContainer)
