import React, { PureComponent } from 'react'
import Link from 'next/link'
import Router from 'next/router'

export class Navbar extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      activeSearch: false,
      activeMoreOptions: false
    }
  }

  backPress () {
    this.setState({ activeSearch: false })
  }

  activeSearch (activeSearch) {
    this.setState({ activeSearch })
  }

  moreButtonPress (e) {
    if (!e.target.className.includes('moreButton')) return
    this.setState({ activeMoreOptions: !this.state.activeMoreOptions })
  }

  shoppingCartPress () {
    if (this.props.isLogin) {
      Router.push('/shopping-cart')
    } else {
      this.props.alertLogin()
    }
  }

  wishListPress () {
    if (this.props.isLogin) {
      Router.push('/wishlist')
    } else {
      this.props.alertLogin()
    }
  }

  render () {
    const { navbar, searchActive, moreButton, productId, callBack } = this.props.params
    const { path, textPath, searchBoox } = navbar
    const { activeMoreOptions } = this.state
    return (
      <div>
        <nav className={`level header is-fullwidth ${searchActive ? 'bg-white' : ''}`}>
          <div className='nav-left'>
            <a className='level-item'>
              <span className={(path) ? '' : 'is-paddingless'}>
                {
                  path
                  ? <span className='back' onClick={() => callBack ? callBack() : Router.back()}>
                    <span className={`icon-arrow-left ${searchActive ? 'black' : ''}`} />
                  </span>
                    : null
                }
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
              <span className='icon-love' onClick={() => this.wishListPress()} />
              <span className='icon-cart' onClick={() => this.shoppingCartPress()}><span className='notif-cart'>4</span></span>
            </div>
            : null
          }
          {
            moreButton &&
            <a onClick={(e) => this.moreButtonPress(e)}>
              <div className='button-search js-option moreButton' >
                <span className='icon-dots moreButton' />
              </div>
            </a>
          }
        </nav>
        <MoreOptions
          productId={productId}
          onClick={(e) => this.moreButtonPress(e)}
          active={activeMoreOptions} />
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
      </div>
    )
  }
}

export class MoreOptions extends PureComponent {
  render () {
    const { active, productId } = this.props
    return (
      <div className='sort-option moreButton' style={{ display: active ? 'block' : 'none' }} onClick={(e) => this.props.onClick(e)}>
        <div className='sort-list'>
          <ul className='other-option'>
            <li><a><span className='icon-share' />Bagikan</a></li>
            <li onClick={() => Router.push(`/report?id=${productId}`)}><a><span className='icon-warning' />Laporkan Barang</a></li>
          </ul>
        </div>
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
