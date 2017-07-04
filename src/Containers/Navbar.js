import React, { PureComponent } from 'react'
import Link from 'next/link'
import Router from 'next/router'

export const Navbar = (props) => {
  const { searchBoox, path, textPath } = props.params
  return (
    <nav className='level header is-fullwidth'>
      <div className='nav-left'>
        <a className='level-item' onClick={() => Router.back()}>
          <span>
            {(path) ? <span className='back'><span className='icon-arrow-left' /></span> : null}
            {textPath}
          </span>
        </a>
      </div>
      {
        (searchBoox)
        ? <div className='nav-right'>
          <span className='icon-love' />
          <span className='icon-cart'><span className='notif-cart'>4</span></span>
        </div>
        : null
      }
    </nav>
  )
}

export class SearchBoox extends PureComponent {
  render () {
    const { isSticky, style } = this.props
    return (
      <div className={`field search-form is-clearfix sticky ${isSticky ? 'floating' : ''}`} style={{ ...style, zIndex: 1, overflow: 'auto', marginBottom: 0 }}>
        <p className='control has-icons-left'>
          <input className='input is-medium' type='text' placeholder='Cari barang atau toko' />
          <span className='icon is-left'>
            <span className='icon-search' />
          </span>
        </p>
      </div>
    )
  }
}

export const Hero = (props) => {
  const { path, textPath, textInfo } = props.params
  return (
    <section className='hero'>
      <div className='container is-fluid'>
        <p>
          {textInfo}
          <Link href={path}><a> {textPath}</a></Link>
        </p>
      </div>
    </section>
  )
}
