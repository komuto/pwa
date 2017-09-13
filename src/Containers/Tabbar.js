// @flow
import React from 'react'
import Link from 'next/link'
import Router from 'next/router'

import { HOME, TRANSACTION, NOTIFICATION, PROFILE } from '../Utils/Constant'

const Tabbar = (props) => {
  const { active } = props.params.tabbar
  return (
    <div className='level nav-bottom is-mobile' style={{ zIndex: 1000 }}>
      <Link href='/'><a className={`level-item has-text-centered ${active === HOME ? 'is-active' : ''}`}><span className='icon-home' />Home</a></Link>
      <a onClick={() => props.isLogin ? Router.push('/transaction') : props.alertLogin()} className={`level-item has-text-centered ${active === TRANSACTION ? 'is-active' : ''}`}><span className='icon-bag' />Transaksi</a>
      <Link href='/notification'><a className={`level-item has-text-centered ${active === NOTIFICATION ? 'is-active' : ''}`}><span className='icon-bell' />NOTIFICATION</a></Link>
      <Link href='/profile'><a className={`level-item has-text-centered ${active === PROFILE ? 'is-active' : ''}`}><span className='icon-user' />Profil</a></Link>
    </div>
  )
}

export default Tabbar
