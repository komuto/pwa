// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import Router from 'next/router'
import NProgress from 'nprogress'
// component
import Content from '../Components/Content'
import Notification from '../Components/Notification'
// actions
import * as loginAction from '../actions/user'

class SignUpVerification extends Component {
  constructor (props) {
    super(props)
    this.state = {
      notification: {
        status: false,
        message: 'Error, default message.'
      }
    }
  }

  async componentDidMount () {
    const token = await Router.query.token
    NProgress.start()
    this.props.dispatch(loginAction.verification({ token }))
  }

  componentWillReceiveProps (nextProps) {
    const { verification } = nextProps
    let { notification, tokenError } = this.state

    if (verification.status === 400) {
      notification.status = true
      notification.message = verification.message
    } else if (verification.status === 200) {
      Router.push('/profile')
    }
    NProgress.done()
    this.setState({ notification, tokenError })
  }

  render () {
    const { notification } = this.state
    return (
      <Content>
        <Notification
          type='is-warning'
          isShow={notification.status}
          activeClose
          onClose={() => this.setState({notification: {status: false, message: ''}})}
          message={notification.message} />
        <div className='has-text-centered'>
          <p style={{position: 'absolute', top: '50%', left: '40%'}} />
        </div>
      </Content>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    verification: state.verification
  }
}

export default connect(mapStateToProps)(SignUpVerification)
