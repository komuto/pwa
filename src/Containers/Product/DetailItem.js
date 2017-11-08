import React, { Component } from 'react'
// components
import Section from '../../Components/Section'
import MyRating from '../../Components/MyRating'
// containers
import ProductDetailSlider from './DetailSlider'
// lib
import RupiahFormat from '../../Lib/RupiahFormat'
import ReadAbleText from '../../Lib/ReadAbleText'

class ProductDetailItem extends Component {
  wishlistPress (id) {
    this.props.wishlistPress(id)
  }

  render () {
    const { product, rating, wholesaler, commission, images } = this.props
    console.log('wholesaler: ', wholesaler)
    console.log('product: ', product)
    let comission = commission && <span> - <span style={{color: '#47bf7e'}}>{`Komisi ${commission}  %`}</span></span>
    let isDiscount = product.is_discount
    let priceBeforeDiscount = 0
    let priceAfterDiscount = 0
    if (isDiscount) {
      priceBeforeDiscount = product.price
      priceAfterDiscount = (product.price - (product.price * (product.discount / 100)))
    }
    let isWholeSaler = product.is_wholesaler
    let isNormalPrice = !isDiscount && !isWholeSaler
    let isWholeSalerDiscount = isWholeSaler && isDiscount
    return (
      <Section className='has-shadow' style={{ backgroundColor: '#fff' }}>
        {
          this.props.images.length > 0 && <ProductDetailSlider images={images} />
        }
        {
          (isDiscount && !isWholeSaler) &&
          <div className='detail-product'>
            <h3>{ product.name }</h3>
            <div className='detail-discount'>
              <div className='pin disc'><span>{product.discount}%</span></div>
              <div className='discount'>Rp {RupiahFormat(priceBeforeDiscount)}</div>
              <span className='price'>Rp {RupiahFormat(priceAfterDiscount)}</span>{comission}
            </div>
            <span className={`icon-wishlist ${product.is_liked && 'solid'}`} onClick={() => this.wishlistPress(product.id)} />
          </div>
        }

        {
          (!isDiscount && isWholeSaler) &&
          <div className='detail-product'>
            <h3>{ product.name }</h3>
            <div className='detail-discount wholesaler'>
              <div className='pin'><span>Grosir</span></div>
              <h3>{ product.name }</h3>
            </div>
            <span className={`icon-wishlist ${product.is_liked && 'solid'}`} onClick={() => this.wishlistPress(product.id)} />
          </div>
        }
        {
          isNormalPrice &&
          <div className='detail-product'>
            <h3>{ product.name }</h3>
            <div><span className='price'>Rp { RupiahFormat(product.price) }</span>{comission}</div>
            <span className={`icon-wishlist ${product.is_liked && 'solid'}`} onClick={() => this.wishlistPress(product.id)} />
          </div>
        }
        {
          isWholeSalerDiscount &&
          <div className='detail-product'>
            <h3>{ ReadAbleText(product.name) }</h3>
            <div className='detail-discount wholesaler'>
              <div className='pin'><span>Grosir</span></div>
              <div className='pin disc'><span>{product.discount}%</span></div>
              <div className='discount'>Rp {RupiahFormat(priceBeforeDiscount)}</div>
              <span className='price'>Rp {RupiahFormat(priceAfterDiscount)}</span>{comission}
            </div>
            <span className={`icon-wishlist ${product.is_liked && 'solid'}`} onClick={() => this.wishlistPress(product.id)} />
          </div>
        }
        {
          wholesaler &&
          <div className='detail-result white estimation'>
            <ul>
              {
                wholesaler.map((wholesale, index) => {
                  return (
                    <li key={index}>
                      <div className='columns custom is-mobile'>
                        <div className='column is-half'><strong> {wholesale.min} - {wholesale.max} Barang</strong></div>
                        <div className='column is-half has-text-right'><span>Rp { RupiahFormat(wholesale.price) } / barang</span></div>
                      </div>
                    </li>
                  )
                })
              }
            </ul>
          </div>
        }
        <div className='detail-rate'>
          <div className='columns detail-rating is-mobile is-multiline no-margin-bottom'>
            <div className='column is-half'>
              <div className='rating-content is-left'>
                <h3>Kualitas Produk</h3>
                <MyRating
                  readonly
                  initialRate={Math.round(rating.quality)}
                  start={0}
                  stop={5} />
                <span className='value-rate sm' style={{ marginLeft: 10 }}>{ Math.round(rating.quality) }</span>
              </div>
            </div>
            <div className='column is-half'>
              <div className='rating-content is-left'>
                <h3>Akurasi Produk</h3>
                <MyRating
                  readonly
                  initialRate={Math.round(rating.accuracy)}
                  start={0}
                  stop={5} />
                <span className='value-rate sm' style={{ marginLeft: 10 }}>{ Math.round(rating.accuracy) }</span>
              </div>
            </div>
          </div>
        </div>
        <div className='detail-result'>
          <ul>
            <li>
              <div className='columns custom is-mobile'>
                <div className='column is-half'><strong>Stok Barang</strong></div>
                <div className='column is-half has-text-right'><span>{ product.stock }</span></div>
              </div>
            </li>
            <li>
              <div className='columns custom is-mobile'>
                <div className='column is-half'><strong>Dilihat</strong></div>
                <div className='column is-half has-text-right'><span> { product.count_view } kali</span></div>
              </div>
            </li>
            <li>
              <div className='columns custom is-mobile'>
                <div className='column is-half'><strong>Terjual</strong></div>
                <div className='column is-half has-text-right'><span>{ product.count_sold }</span></div>
              </div>
            </li>
          </ul>
        </div>
      </Section>
    )
  }
}

export default ProductDetailItem
