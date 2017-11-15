import React, { Component } from 'react'
import { connect } from 'react-redux'
import NProgress from 'nprogress'
import Router from 'next/router'
/** including actions */
import * as userActions from '../../actions/user'
/** including component */
import Content from '../../Components/Content'
import Notification from '../../Components/Notification'

class SignUpVerification extends Component {
  constructor (props) {
    super(props)
    this.state = {
      token: props.query.token,
      notification: props.notification
    }
    this.submitting = {
      verification: false
    }
  }

  componentDidMount () {
    const { token } = this.state
    if (token) {
      NProgress.start()
      this.submitting = { ...this.submitting, verification: true }
      this.props.setVerification({token})
    }
  }

  componentWillReceiveProps (nextProps) {
    const { verification } = nextProps
    const { isFetching, isFound, isError, notifError } = this.props
    if (!isFetching(verification) && this.submitting.verification) {
      NProgress.done()
      this.submitting = { ...this.submitting, verification: false }
      if (isError(verification)) {
        this.setState({ notification: notifError(verification.message) })
      }
      if (isFound(verification)) {
        Router.push('/profile')
      }
    }
  }

  render () {
    const { notification } = this.state
    return (
      <Content>
        <Notification
          type={notification.type}
          isShow={notification.status}
          activeClose
          onClose={() => this.setState({notification: {status: false, message: ''}})}
          message={notification.message} />
      </Content>
    )
  }
}

const mapStateToProps = (state) => ({
  verification: state.verification
})

const mapDispatchToProps = (dispatch) => ({
  setVerification: (params) => dispatch(userActions.verification(params))
})

export default connect(mapStateToProps, mapDispatchToProps)(SignUpVerification)
