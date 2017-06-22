// @flow
import React, { Component } from 'react'
import Router from 'next/router'

class SignUpVerification extends Component {
  constructor (props) {
    super(props)
    this.state = {
      token: '...'
    }
  }

  async componentDidMount () {
    const token = await Router.query.token
    this.setState({ token })
  }

  render () {
    // const { token } = this.state
    return (
      <div className='has-text-centered'>
        <p style={{position: 'absolute', top: '50%', left: '40%'}}> Loading ...</p>
      </div>
    )
  }
}

export default SignUpVerification
