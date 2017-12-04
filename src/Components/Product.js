import React, { Component } from 'react'
// import { connect } from 'react-redux'
import Router from 'next/router'
import url from 'url'
// lib
import RupiahFormat from '../Lib/RupiahFormat'
import ReadAbleText from '../Lib/ReadAbleText'
import UrlParam from '../Lib/UrlParam'
// component
import MyImage from '../Components/MyImage'
// import Loader from 'react-loader-advanced'
// import Loading from './Loading'

class Product extends Component {
  constructor (props) {
    super(props)
    this.state = {
      wishlistStatus: false,
      pressId: null
    }
  }

  wishlistPress (e, id) {
    e.stopPropagation()
    this.props.wishlistPress(id)
  }

  productPress (product, store) {
    const { type } = this.props
    const commission = product.commission
    if (type === 'dropship') {
      Router.push(
        url.format({
          pathname: '/product-detail',
          query: {id: product.id, type: 'dropship', commission}
        }),
        `/detail/${UrlParam(store.name)}/${product.slug}-${product.id}?type=dropship&commission=${commission}`
      )
      this.setState({ pressId: product.id })
    } else {
      Router.push(
        url.format({
          pathname: '/product-detail',
          query: {id: product.id}
        }),
        `/detail/${UrlParam(store.name)}/${product.slug}-${product.id}`
      )
      this.setState({ pressId: product.id })
    }
  }

  render () {
    const { product, store, viewActive, isWishlist } = this.props
    const { pressId } = this.state
    // set commission
    let commission = null
    if (product.hasOwnProperty('commission') && product.commission) {
      commission = product.commission
    }
    // <Loading size={12} color='#ef5656' className='is-fullwidth has-text-centered' />

    // set pin
    let pin = null
    if (product.is_discount) pin = <div className='pin disc'><span>{ `${product.discount}%` }</span></div>
    if (product.is_wholesaler) pin = <div className='pin'><span>Grossir</span></div>

    if (product.is_discount && product.is_wholesaler) {
      pin = <div>
        <div className='pin disc'><span>{ `${product.discount}%` }</span></div>
        <div className='pin' style={{ marginLeft: '50px' }}><span>Grossir</span></div>
      </div>
    }
    // set real price
    const priceBeforeDiscount = <div className='discount'> {(product.discount > 0) ? `Rp ${RupiahFormat(product.price)}` : '' } </div>
    // set price - dicsount
    const priceAfterDiscount = (product.discount > 0) ? (product.price - (product.price * (product.discount / 100))) : product.price
    return (
      <div
        className={`column ${viewActive === 'grid' ? 'is-half' : ''}`}
        onClick={() => this.productPress(product, store)}
        style={{ opacity: pressId === product.id ? 0.5 : 1 }}>
        <div className={`box ${viewActive} effect-display`} >
          <div className='media'>
            <div className='media-left'>
              {/* <figure className='image' style={{width: '150px'}}> */}
              <figure className='image img-product'>
                <MyImage src={product.image} alt={product.name} style={{ height: '150px' }} />
                { pin }
              </figure>
            </div>
            <div className='media-content'>
              <div className='content min-height'>
                <h4 className='wrapword' style={{ minHeight: '34px' }}>{ ReadAbleText(product.name)}</h4>
                <div className='detail'>
                  <p className='store-name wrapword' style={{ minHeight: '39px', wordWrap: 'break-word' }}>{ ReadAbleText(store.name)} <span className={`icon-verified ${!store.is_verified ? 'unverified' : ''}`} /></p>
                  { priceBeforeDiscount }
                  <span className='price' style={{ width: '100%' }}>Rp { RupiahFormat(priceAfterDiscount) } </span>
                  {
                    commission
                      ? <span className='commission'>Komisi { commission } %</span>
                      : <span className='wish'>
                        <span style={{ zIndex: 100 }} className={`icon-wishlist ${product.is_liked && 'solid'}`} onClick={(e) => !isWishlist && this.wishlistPress(e, product.id)} />
                        { product.count_like }
                      </span>
                  }
                  {
                    isWishlist && <div className='remove-item'><span onClick={(e) => this.wishlistPress(e, product.id)} className='icon-trash' /></div>
                  }
                </div>
              </div>
              { commission
                ? <div className='total-wishlisted'>
                  <span style={{ zIndex: 100 }} className={`icon-wishlist ${product.is_liked && 'solid'}`} onClick={(e) => !isWishlist && this.wishlistPress(e, product.id)} />
                  { product.count_like }
                </div>
                : ''
              }
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Product
