import React, { Component } from 'react'
import { connect } from 'react-redux'
// components
import Section from '../Components/Section'
import MyRating from '../Components/MyRating'
// containers
import ProductDetailSlider from './ProductDetailSlider'
// actions
import * as productActions from '../actions/product'
// services
import { Status } from '../Services/Status'

class ProductDetailItem extends Component {
  constructor (props) {
    super(props)
    this.state = {
      wishlistStatus: false
    }
  }

  async wishlistPress (id) {
    await this.props.dispatch(productActions.addToWishlist({ id }))
  }

  componentWillReceiveProps (nextProps) {
    const { addWishlist } = nextProps
    let { wishlistStatus } = this.state
    if (!addWishlist.isLoading) {
      switch (addWishlist.status) {
        case Status.SUCCESS :
          wishlistStatus = true
          break
        case Status.OFFLINE :
        case Status.FAILED :
          this.props.notification(addWishlist.message)
          break
        default:
          break
      }
      this.setState({ wishlistStatus })
    }
  }

  render () {
    const { product, rating, ...props } = this.props
    let { wishlistStatus } = this.state
    let wishlist = product.is_liked || wishlistStatus

    return (
      <Section className='has-shadow' style={{ backgroundColor: '#fff' }}>
        <ProductDetailSlider {...props} />
        <div className='detail-product'>
          <h3>{ product.name }</h3>
          <span className='price'>Rp { product.price }</span>
          <span className={`icon-wishlist ${wishlist ? 'wishlisted' : ''}`} onClick={() => this.wishlistPress(product.id)} />
        </div>
        <div className='detail-rate'>
          <div className='columns detail-rating is-mobile is-multiline no-margin-bottom'>
            <div className='column is-half'>
              <div className='rating-content is-left'>
                <h3>Kualitas Produk</h3>
                <MyRating
                  readonly
                  initialRate={rating.accuracy}
                  start={0}
                  stop={5} />
                <span className='value-rate sm' style={{ marginLeft: 10 }}>{ rating.quality }</span>
              </div>
            </div>
            <div className='column is-half'>
              <div className='rating-content is-left'>
                <h3>Akurasi Produk</h3>
                <MyRating
                  readonly
                  initialRate={rating.accuracy}
                  start={0}
                  stop={5} />
                <span className='value-rate sm' style={{ marginLeft: 10 }}>{ rating.accuracy }</span>
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

const mapStateToProps = (state) => {
  return {
    addWishlist: state.addWishlist
  }
}

export default connect(mapStateToProps)(ProductDetailItem)
