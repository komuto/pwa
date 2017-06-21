// @flow
import React from 'react'
import Link from 'next/link'

export const HOME = 'HOME'
export const TRANSAKSI = 'TRANSAKSI'
export const NOTIFIKASI = 'NOTIFIKASI'
export const PROFILE = 'PROFILE'

const Tabbar = (props) => {
  const { active } = props.params
  return (
    <div className='level nav-bottom is-mobile'>
      <Link href='/'><a className={`level-item has-text-centered ${active === HOME ? 'is-active' : ''}`}><span className='icon-home' />Home</a></Link>
      <Link href='/transaksi'><a className={`level-item has-text-centered ${active === TRANSAKSI ? 'is-active' : ''}`}><span className='icon-bag' />Transaksi</a></Link>
      <Link href='/notifikasi'><a className={`level-item has-text-centered ${active === NOTIFIKASI ? 'is-active' : ''}`}><span className='icon-bell' />Notifikasi</a></Link>
      <Link href='/profile'><a className={`level-item has-text-centered ${active === PROFILE ? 'is-active' : ''}`}><span className='icon-user' />Profil</a></Link>
    </div>
  )
}

export default Tabbar
