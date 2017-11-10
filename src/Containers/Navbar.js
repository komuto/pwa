import React, { PureComponent } from 'react'
import Link from 'next/link'
import Router from 'next/router'
// components
import MyImage from '../Components/MyImage'
import Share from '../Components/Share'
// libs
import RupiahFormat from '../Lib/RupiahFormat'

export class Navbar extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      activeSearch: false,
      activeMoreOptions: false,
      openMessageOptions: false,
      showShareProduct: false
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

  messageButtonPress (e) {
    e.preventDefault()
    this.setState({ openMessageOptions: !this.state.openMessageOptions })
  }

  moveToConversationOrArceive () {
    this.setState({ openMessageOptions: !this.state.openMessageOptions })
    this.props.moveToConversationOrArceive()
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

  shareProduct () {
    this.setState({ showShareProduct: !this.state.showShareProduct })
  }

  render () {
    const { deleteButton, messageType, navbar, productDetail, moreButton, messageButton, productId, share } = this.props
    const { path, textPath, searchBoox, searchActive, callBack, filterBalance, moreMessage, countCart } = navbar
    const { activeMoreOptions, openMessageOptions } = this.state
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
            {
              productDetail
              ? <div className='box is-paddingless'>
                <article className='media'>
                  <div className='media-left is-bordered'>
                    <figure className='image product-pict'>
                      <MyImage src={productDetail.image} alt='pict' style={{ width: '40px', height: '40px' }} />
                    </figure>
                  </div>
                  <div className='media-content'>
                    <div className='content'>
                      <p className='products-name' style={{paddingRight: '10px'}}>
                        <strong>{productDetail.name}</strong>
                        <br />
                        <strong>Rp { RupiahFormat(productDetail.price) }</strong>
                      </p>
                    </div>
                  </div>
                </article>
              </div>
              : null
            }
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
              <span className='icon-cart' onClick={() => this.shoppingCartPress()}>
                {
                  countCart !== 0 && <span className='notif-cart'>{ countCart }</span>
                }
              </span>
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
          {
            messageButton &&
            <div className={`button-search menu-top ${openMessageOptions && 'open'}`}>
              <span className='icon-dots' onClick={(e) => this.messageButtonPress(e)} />
              <ul className='option-dropdown'>
                <li><a className='js-option' onClick={() => this.moveToConversationOrArceive()}>{`Pindahkan ke ${messageType === 'conversation' ? 'Arsip' : 'Percakapan'}`}</a></li>
                <li><a className='js-option' onClick={() => this.props.deleteMessage()}>Hapus Selamanya</a></li>
              </ul>
            </div>
          }
          {
            deleteButton &&
            <div className='button-search js-option' onClick={() => this.props.deleteDropship()}>
              <span className='icon-trash white' />
            </div>
          }
          {
            filterBalance && filterBalance.show &&
            <div className='button-search js-option' onClick={() => filterBalance.press()}>
              <span className='icon-filter-y' />
            </div>
          }
          {
            moreMessage &&
            <div className={`button-search menu-top ${moreMessage.show && 'open'}`}>
              <div className='overlay-menu' onClick={(e) => moreMessage.press(e)} style={{ display: moreMessage.show ? 'block' : 'none' }} />
              <span onClick={(e) => moreMessage.press(e)} className='icon-dots' />
              {
                moreMessage.show &&
                <ul className='option-dropdown'>
                  <li onClick={() => moreMessage.selected(moreMessage.type === 'conversation' ? 'archives' : 'conversation')}><a className='js-option'>Pindahkan ke {moreMessage.type === 'conversation' ? 'Arsip' : 'Percakapan' } </a></li>
                  <li onClick={() => moreMessage.selected('delete')}><a className='js-option'>Hapus Selamanya</a></li>
                </ul>
              }
            </div>
          }
        </nav>
        <MoreOptions
          productId={productId}
          onClick={(e) => this.moreButtonPress(e)}
          active={activeMoreOptions}
          shareProduct={() => this.shareProduct()} />
        {
          share && share.link &&
          <Share
            onShow={this.state.showShareProduct}
            shareProduct={() => this.shareProduct()}
            share={share}
          />
        }
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
    const { isSticky, sbStyle, localize } = this.props
    return (
      <div>
        <div className={`field search-form is-clearfix sticky ${isSticky && 'floating'}`} style={{ ...sbStyle, zIndex: 1, overflow: 'auto', marginBottom: 0 }}>
          <p className='control has-icons-left'>
            <input className='input is-medium' type='text' value='' placeholder={localize.search_placeholder} onFocus={() => this.onFocus()} />
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
    const { active, productId, shareProduct } = this.props
    return (
      <div className='sort-option moreButton' style={{ display: active ? 'block' : 'none' }} onClick={(e) => this.props.onClick(e)}>
        <div className='sort-list'>
          <ul className='other-option'>
            <li onClick={() => shareProduct()}><a><span className='icon-share' />Bagikan</a></li>
            <li onClick={() => Router.push(`/report?id=${productId}`)}><a><span className='icon-warning' />Laporkan Barang</a></li>
          </ul>
        </div>
      </div>
    )
  }
}

export const Hero = ({ path, textPath, textInfo }) => {
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

export const Navtab = ({ onSelect, active, items }) => (
  <div className='nav-tabs'>
    {
      items.map((item, index) => (
        <a onClick={() => onSelect(item.name)} key={index} className={`${active === item.name ? 'active' : ''}`}>
          <span className='text'>{item.name}</span>
          {
            item.notif > 0 &&
            <span className='notif-complaint'>
              <span>{ item.notif }</span>
            </span>
          }
        </a>
      ))
    }
  </div>
)
