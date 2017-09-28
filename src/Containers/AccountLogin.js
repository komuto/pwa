// @flow
import React from 'react'
import Link from 'next/link'
import Router from 'next/router'
import {Images} from '../Themes'
import MyImage from '../Components/MyImage'

export default (props) => {
  const { localize } = props
  return (
    <section className='content'>
      <div className='container is-fluid'>
        <div className='desc has-text-centered'>
          <MyImage src={Images.phoneAccount} />
          <p><strong>{localize.signin_info}</strong></p>
          <p>{localize.signin_sub_info}</p>
        </div>
        <div className='columns is-mobile'>
          <div className='column'>
            <Link href='signup'><a className='button is-primary is-large is-fullwidth is-outlined'>{localize.signup}</a></Link>
          </div>
          <div className='column'>
            <a onClick={() => Router.push('/signin')} className='button is-primary is-large is-fullwidth'>{localize.signin}</a>
          </div>
        </div>
      </div>
    </section>
  )
}
