import React, { Component } from 'react'
// import { connect } from 'react-redux'
import Img from 'react-image'
import Router from 'next/router'
import url from 'url'
// themes
import Images from '../Themes/Images'
// lib
import RupiahFormat from '../Lib/RupiahFormat'
// actions
import * as productActions from '../actions/product'

class Product extends Component {
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
    // const { addWishlist } = nextProps
    // console.log(addWishlist)
    // !addWishlist.isLoading && this.setState({ wishlistStatus: addWishlist.status })
  }

  render () {
    const { product, images, store, viewActive, ...props } = this.props
    const loader = <img src={Images.loading} />
    const unloader = <img src={Images.loadingFailed} />

    // set pin
    let pin = null
    if (product.is_discount) pin = <div className='pin disc'><span>{ `${product.discount}%` }</span></div>
    if (product.is_wholesaler) pin = <div className='pin'><span>Grossir</span></div>
    const thumb = images[0].file
    // const thumb = 'https://komutodev.aptmi.com/uploads/produk/8011774ba21b8cc99a20583008bc07e43d19bdc1_klepon5.jpg'
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
                <Img
                  src={thumb}
                  loader={loader}
                  unloader={unloader}
                  />
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
                    <span className={`icon-wishlist ${product.is_liked ? 'wishlisted' : ''}`} onClick={() => props.wishlistPress(product.id)} />
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

// const mapStateToProps = (state) => {
//   return {
//     addWishlist: state.addWishlist
//   }
// }
// export default connect(mapStateToProps)(Product)
export default Product
