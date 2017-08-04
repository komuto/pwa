import React, { Component } from 'react'
// import { connect } from 'react-redux'
import Router from 'next/router'
import url from 'url'
// lib
import RupiahFormat from '../Lib/RupiahFormat'
// component
import MyImage from '../Components/MyImage'

class Product extends Component {
  constructor (props) {
    super(props)
    this.state = {
      wishlistStatus: false
    }
  }

  wishlistPress (e, id) {
    e.stopPropagation()
    this.props.wishlistPress(id)
  }

  render () {
    const { product, store, viewActive } = this.props

    // set pin
    let pin = null
    if (product.is_discount) pin = <div className='pin disc'><span>{ `${product.discount}%` }</span></div>
    if (product.is_wholesaler) pin = <div className='pin'><span>Grossir</span></div>
    // set real price
    const priceBeforeDiscount = (product.discount > 0) ? <div className='discount'> Rp { RupiahFormat(product.price) } </div> : ''
    // set price - dicsount
    const priceAfterDiscount = (product.discount > 0) ? (product.price - (product.price * (product.discount / 100))) : product.price
    return (
      <div
        className={`column ${viewActive === 'grid' ? 'is-half' : ''}`}
        onClick={() => Router.push(
          url.format({
            pathname: '/product-detail',
            query: {id: product.id}
          }),
          `/product-detail?id=${product.id}`
        )}>
        <div className={`box ${viewActive}`} >
          <div className='media'>
            <div className='media-left'>
              <figure className='image' style={{width: '150px'}}>
                <MyImage src={product.image} />
                { pin }
              </figure>
            </div>
            <div className='media-content'>
              <div className='content'>
                <h4>{product.name}</h4>
                <div className='detail'>
                  <p>{store.name} <span className={`icon-verified ${!store.is_verified ? 'unverified' : ''}`} /></p>
                  { priceBeforeDiscount }
                  <span className='price' style={{ width: '100%' }}>Rp { RupiahFormat(priceAfterDiscount) } </span>
                  <span className='wish'>
                    <span style={{ zIndex: 100 }} className={`icon-wishlist ${product.is_liked && 'solid'}`} onClick={(e) => this.wishlistPress(e, product.id)} />
                    { product.count_like }
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Product
