/**
 * Safei Muslim
 * Yogyakarta , 2017
 * PT Skyshi Digital Indonesa
 */

/** including dependencies */
import React, { Component } from 'react'
import Router from 'next/router'
/** including components */
import Account from './Account'
import {Images} from '../../Themes'
import MyImage from '../../Components/MyImage'

class Profile extends Component {
  render () {
    if (this.props.isLogin) {
      return <Account {...this.props} />
    } else {
      return <LoginContent {...this.props} />
    }
  }
}

/** form login */
export const LoginContent = ({ localize }) => {
  return (
    <section className='content'>
      <div className='container is-fluid'>
        <div className='desc has-text-centered'>
          <MyImage src={Images.phoneAccount} alt='phoneAccount' />
          <p><strong>{localize.signin_info}</strong></p>
          <p>{localize.signin_sub_info}</p>
        </div>
        <div className='columns is-mobile'>
          <div className='column'>
            <a onClick={() => Router.push('/signup')} className='button is-primary is-large is-fullwidth is-outlined'>{localize.signup}</a>
          </div>
          <div className='column'>
            <a onClick={() => Router.push('/signin')} className='button is-primary is-large is-fullwidth'>{localize.signin}</a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Profile
