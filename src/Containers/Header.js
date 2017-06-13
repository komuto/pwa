// @flow
import React, { Component } from 'react'

class Header extends Component {
  state : {
    payload: any,
    fetching: boolean
  }

  render () {
    return (
      <div>
        <h2>Ini Header</h2>
      </div>
    )
  }
}

export default Header
