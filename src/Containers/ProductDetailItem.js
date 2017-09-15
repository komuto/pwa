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
// lib
import RupiahFormat from '../Lib/RupiahFormat'

class ProductDetailItem extends Component {
  constructor (props) {
    super(props)
    this.state = {
      wishlistStatus: false,
      wishlist: props.wishlist || null
    }
  }

  async wishlistPress (id) {
    if (this.props.isLogin) {
      await this.props.addToWishlist({ id })
    } else {
      this.props.alertLogin()
    }
  }

  componentWillReceiveProps (nextProps) {
    const { wishlist } = nextProps

    if (!wishlist.isLoading) {
      switch (wishlist.status) {
        case Status.SUCCESS :
          this.setState({ wishlist })
          break
        case Status.OFFLINE :
        case Status.FAILED :
          break
        default:
          break
      }
    }
  }

  render () {
    const { product, rating, commission, ...props } = this.props
    const { wishlist } = this.state
    let wishlistStatus = product.is_liked
    if (wishlist.isFound && (wishlist.wishlist.id === product.id)) wishlistStatus = wishlist.wishlist.is_liked
    console.log('images', this.props.images)
    return (
      <Section className='has-shadow' style={{ backgroundColor: '#fff' }}>
        {
          this.props.images.length > 0 && <ProductDetailSlider {...props} />
        }
        <div className='detail-product'>
          <h3>{ product.name }</h3>
          <span className='price'>Rp { RupiahFormat(product.price) }</span> - <span style={{color: '#47bf7e'}}>Komisi { commission } %</span>
          <span className={`icon-wishlist ${wishlistStatus && 'solid'}`} onClick={() => this.wishlistPress(product.id)} />
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

const mapStateToProps = (state) => ({
  wishlist: state.addWishlist
})

const mapDispatchToProps = (dispatch) => ({
  addToWishlist: (params) => dispatch(productActions.addToWishlist(params))
})

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetailItem)
