import React, { PureComponent } from 'react'
import Link from 'next/link'
import Router from 'next/router'
// containers
import Search from './Search'

export class Navbar extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      activeSearch: false
    }
  }

  backPress () {
    this.setState({ activeSearch: false })
  }

  activeSearch (activeSearch) {
    this.setState({ activeSearch })
  }

  render () {
    const { searchBoox, path, textPath, searchActive } = this.props.params
    const { activeSearch } = this.state
    return (
      <div>
        <nav className={`level header is-fullwidth ${searchActive ? 'bg-white' : ''}`}>
          <div className='nav-left'>
            <a className='level-item' onClick={() => Router.back()}>
              <span className={(path) ? '' : 'is-paddingless'}>
                {(path) ? <span className='back'><span className={`icon-arrow-left ${searchActive ? 'black' : ''}`} /></span> : null}
                {textPath}
              </span>
            </a>
          </div>
          {
            searchActive
            ? <div className='button-search' onClick={() => Router.push('/search')}>
              <span className='icon-search' />
            </div>
            : null
          }
          {
            searchBoox
            ? <div className='nav-right'>
              <span className='icon-love' onClick={() => Router.push('/wishlist')} />
              <span className='icon-cart'><span className='notif-cart'>4</span></span>
            </div>
            : null
          }
        </nav>
        <Search
          activeSearch={(params) => this.activeSearch(params)}
          active={activeSearch}
          backPress={() => this.backPress()} />
      </div>
    )
  }
}

export class SearchBoox extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      activeSearch: false
    }
  }

  onFocus () {
    Router.push('/search')
  }

  backPress () {
    this.setState({ activeSearch: false })
  }

  activeSearch (activeSearch) {
    this.setState({ activeSearch })
  }

  render () {
    const { isSticky, style } = this.props
    const { activeSearch } = this.state
    return (
      <div>
        <div className={`field search-form is-clearfix sticky ${isSticky ? 'floating' : ''}`} style={{ ...style, zIndex: 1, overflow: 'auto', marginBottom: 0 }}>
          <p className='control has-icons-left'>
            <input className='input is-medium' type='text' placeholder='Cari barang atau toko' onFocus={() => this.onFocus()} />
            <span className='icon is-left'>
              <span className='icon-search' />
            </span>
          </p>
        </div>
        <Search
          activeSearch={(params) => this.activeSearch(params)}
          active={activeSearch}
          backPress={() => this.backPress()} />
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
