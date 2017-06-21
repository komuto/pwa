
import React from 'react'
import Link from 'next/link'

export const Navbar = (props) => {
  const { searchBoox, path, textPath } = props.params
  return (
    <nav className='level header is-fullwidth'>
      <div className='nav-left'>
        <Link href={(path) || ''}>
          <a className='level-item'>
            <span>
              {(path) ? <span className='icon-arrow-left' /> : null}
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

      {
        (searchBoox)
        ? <div className='field search-form is-clearfix'>
          <p className='control has-icons-left'>
            <input className='input is-medium' type='text' placeholder='Cari barang atau toko' />
            <span className='icon is-left'>
              <span className='icon-search' />
            </span>
          </p>
        </div>
        : null
      }
    </nav>
  )
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
