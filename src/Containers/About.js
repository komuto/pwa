// @flow
import React, { Component } from 'react'
import {Images} from '../Themes'

class About extends Component {
  // state : {
  //   payload: any,
  //   fetching: boolean
  // }

  render () {
    return (
      <div>
        <div className='container-fluid'>
          <img src={Images.about} />
          <h2 className='text-center'>Welcome</h2>
        </div>
      </div>
    )
  }
}

export default About
