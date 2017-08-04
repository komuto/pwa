import React, { Component } from 'react'
import { connect } from 'react-redux'
import Router from 'next/router'
// component
import Section from '../Components/Section'
// import Content from '../Components/Content'
import MyImage from '../Components/MyImage'
// actions
import * as cartActions from '../actions/cart'
// lib
import RupiahFormat from '../Lib/RupiahFormat'
// services
import { Status } from '../Services/Status'

class ShoppingCart extends Component {
  constructor (props) {
    super(props)
    this.state = {
      cart: props.cart || null,
      notification: {
        type: 'is-danger',
        status: false,
        message: 'Error, default message.'
      }
    }
  }

  minPress (myItem) {
    let { cart } = this.state
    // console.log(cart)
    // console.log(myItem)
    cart.cart.items.map((item) => {
      if (item.id === myItem.id && item.qty > 1) {
        item.qty -= 1
      }
    })

    this.setState({ cart })
  }

  plusPress (myItem) {
    let { cart } = this.state
    cart.cart.items.map((item) => {
      if (item.id === myItem.id && item.qty < 100) {
        item.qty += 1
      }
    })

    this.setState({ cart })
  }

  async componentDidMount () {
    await this.props.dispatch(cartActions.getCart())
  }

  componentWillReceiveProps (nextProps) {
    const { cart } = nextProps
    let { notification } = this.state
    notification = {status: false, message: 'Error, default message.'}

    if (!cart.isLoading) {
      switch (cart.status) {
        case Status.SUCCESS :
          if (!cart.isFound) notification = {type: 'is-danger', status: true, message: 'Keranjang belanja kosong!'}
          break
        case Status.OFFLINE :
        case Status.FAILED :
          notification = {type: 'is-danger', status: true, message: cart.message}
          break
        default:
          break
      }
      this.setState({ cart, notification })
    }
  }

  render () {
    const { cart } = this.state
    if (!cart.isFound) return null
    // console.log(cart)
    return (
      <Section>
        {
          cart.cart.items.map((item) => {
            return (
              <section className='section is-paddingless has-shadow' key={item.id}>
                <div className='detail-product'>
                  <div className='purchase'>
                    <figure className='img-item' style={{ width: 50 }}>
                      <MyImage src={item.product.image} alt='pict' />
                    </figure>
                    <h3>{item.product.name}</h3>
                    <span className='price'>{item.product.store.name}</span>
                  </div>
                  <a className='remove-item'>Hapus</a>
                </div>
                <div className='info-purchase'>
                  <div className='detail-rate is-purchase'>
                    <div className='columns total-items is-mobile is-multiline no-margin-bottom'>
                      <div className='column is-half'>
                        <div className='rating-content is-left'>
                          <strong>Harga Satuan</strong>
                        </div>
                      </div>
                      <div className='column is-half'>
                        <div className='rating-content item-qty has-text-right'>
                          <span>Rp {RupiahFormat(item.product.price)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='info-purchase'>
                  <div className='detail-rate is-purchase'>
                    <div className='columns detail-rating is-mobile is-multiline no-margin-bottom'>
                      <div className='column is-half is-paddingless'>
                        <div className='rating-content is-left'>
                          <strong>Jumlah</strong>
                        </div>
                      </div>
                      <div className='column is-half is-paddingless'>
                        <div className='rating-content item-qty'>
                          <a onClick={() => this.minPress(item)}><span className='icon-qty-min' /></a>
                          <span className='qty'>{item.qty}</span>
                          <a onClick={() => this.plusPress(item)}><span className='icon-qty-plus' /></a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='see-all' onClick={() => Router.push('/shipping-detail?id=' + item.id)}>
                  <span className='link'>Detail Pengiriman <span className='icon-arrow-right' /></span>
                </div>
                <div className='info-purchase'>
                  <div className='detail-rate is-purchase'>
                    <div className='columns total-items is-mobile is-multiline no-margin-bottom'>
                      <div className='column is-half'>
                        <div className='rating-content is-left'>
                          <strong>Subtotal</strong>
                        </div>
                      </div>
                      <div className='column is-half'>
                        <div className='rating-content item-qty has-text-right'>
                          <span>Rp {RupiahFormat(item.total_price)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            )
          })
        }
      </Section>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    cart: state.cart,
    promo: state.promo
  }
}

export default connect(mapStateToProps)(ShoppingCart)
