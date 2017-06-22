import React, { PureComponent } from 'react'
import Link from 'next/link'

export const Navbar = (props) => {
  const { searchBoox, path, textPath } = props.params
  return (
    <nav className='level header is-fullwidth'>
      <div className='nav-left'>
        <Link href={(path) || ''}>
          <a className='level-item'>
            <span>
              {(path) ? <span className='back'><span className='icon-arrow-left' /></span> : null}
              {textPath}
            </span>
          </a>
        </Link>
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
    return (
      <div className='field search-form is-clearfix sticky' style={{ ...this.props.style, zIndex: 1, overflow: 'auto', marginBottom: 0 }}>
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
