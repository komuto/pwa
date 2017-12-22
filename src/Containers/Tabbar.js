// @flow
import React from 'react'
import Link from 'next/link'
import Router from 'next/router'
import Menu from '../Config/Menu'

const Tabbar = (props) => {
  const { localize, tabbar } = props
  return (
    <div className='level nav-bottom is-mobile' style={{ zIndex: 1000 }}>
      <Link href='/'><a className={`level-item has-text-centered ${tabbar.active === Menu.HOME ? 'is-active' : ''}`}><span className='icon-home' />{localize.home}</a></Link>
      <a onClick={() => props.isLogin ? Router.push('/transaction') : props.alertLogin()} className={`level-item has-text-centered ${tabbar.active === Menu.TRANSACTION ? 'is-active' : ''}`}><span className='icon-bag' />{localize.transaction}</a>
      <a onClick={() => props.isLogin ? Router.push('/notification') : props.alertLogin()} className={`level-item has-text-centered ${tabbar.active === Menu.NOTIFICATION ? 'is-active' : ''}`}><span className='icon-bell' />{localize.notification}</a>
      <Link href='/profile'><a className={`level-item has-text-centered ${tabbar.active === Menu.PROFILE ? 'is-active' : ''}`}><span className='icon-user' />{localize.profile}</a></Link>
    </div>
  )
}

export default Tabbar
