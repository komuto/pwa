import React, { Component } from 'react'
import Router from 'next/router'
import url from 'url'
import UrlParam from '../../Lib/UrlParam'
// components
import Section from '../../Components/Section'
import MyImage from '../../Components/MyImage'
// lib
import RupiahFormat from '../../Lib/RupiahFormat'

class ProductDetailSuggestions extends Component {
  render () {
    const { products, store, ...props } = this.props
    return (
      <Section className='section is-paddingless has-shadow' style={{marginBottom: '80px'}}>
        <div className='container is-fluid'>
          <div className='title'>
            <h3>Produk lain dari Penjual ini</h3>
          </div>
        </div>
        {
          products.map((product, index) => {
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
                className='columns is-mobile is-multiline custom'
                key={index}
                onClick={() => Router.push(
                  url.format({
                    pathname: '/product-detail',
                    query: {id: product.id}
                  }),
                  `/detail/${UrlParam(store.name)}/${product.slug}?id=${product.id}`
                )}>
                <div className='column'>
                  <div className='box list'>
                    <div className='media'>
                      <div className='media-left' style={{width: '40%'}}>
                        <figure className='image'>
                          <a>
                            <MyImage src={product.image} alt={product.name} />
                          </a>
                          { pin }
                        </figure>
                      </div>
                      <div className='media-content'>
                        <div className='content'>
                          <h4>{ product.name }</h4>
                          <div className='detail'>
                            <p>{ store.name } <span className={`icon-verified ${!store.is_verified ? 'unverified' : ''}`} /></p>
                            { priceBeforeDiscount }
                            <span className='price' style={{ marginRight: 10 }}>Rp { RupiahFormat(priceAfterDiscount) } </span>
                            <span className='wish'>
                              <span className={`icon-wishlist ${product.is_liked ? 'solid' : ''}`}
                                onClick={(e) => {
                                  e.stopPropagation()
                                  props.wishlistPress(product.id)
                                }} />
                              { product.count_like }
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })
        }
        <div className='column is-paddingless'>
          <div className='see-all'
            onClick={() => {
              Router.push(
                url.format({
                  pathname: '/product',
                  query: {sort: 'newest'}
                }),
                `/p?sort=newest`
              )
            }} >
            <span className='link'>Lihat semua produk terbaru <span className='icon-arrow-right' /></span>
          </div>
        </div>
      </Section>
    )
  }
}

export default ProductDetailSuggestions
