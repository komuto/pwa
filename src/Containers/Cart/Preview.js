import React, { Component } from 'react'
import { connect } from 'react-redux'
// import Router from 'next/router'
import NProgress from 'nprogress'
// actions
import * as cartActions from '../../actions/cart'
import RupiahFormat from '../../Lib/RupiahFormat'
import Promo from '../../Lib/Promo'
// components
// import Notification from '../../Components/Notification'

class Preview extends Component {
  constructor (props) {
    super(props)
    this.state = {
      cart: props.cart || null,
      notification: props.notification
    }
    this.submitting = { cart: false }
  }

  componentDidMount () {
    NProgress.start()
    this.submitting = { ...this.submitting, cart: true }
    this.props.getCart()
  }

  componentWillReceiveProps (nextProps) {
    const { cart } = nextProps
    const { isFetching, isError, isFound, notifError } = this.props
    // state cart
    if (!isFetching(cart) && this.submitting.cart) {
      NProgress.done()
      this.submitting = { ...this.submitting, cart: false }
      if (isError(cart)) {
        this.setState({ notification: notifError(cart.message) })
      }
      if (isFound(cart)) {
        this.setState({ cart })
      }
    }
  }

  render () {
    const { cart } = this.state
    return (
      <div>
        {
        cart.isFound &&
        <div>
          {
            cart.cart.items.map((item, index) => <ItemPreview item={item} key={index} />)
          }
          <PriceReview {...cart} />
        </div>
      }
      </div>
    )
  }
}

const ItemPreview = ({ item }) => {
  let price = 0
  let qty = item.qty
  let wholesalerSelected = null
  // calc insurance
  let insurancePrice = 0
  // real price
  if (item.product) {
    price = item.product.price
  }
  // price after discount
  if (item.product.is_discount) {
    price = price - (price * (item.product.discount / 100))
  }

  if (item.shipping.is_insurance) {
    // insuranceFee = item.shipping.insurance_fee
  }

  // check wholesaler or not
  if (item.product.wholesale) {
    item.product.wholesale.forEach(wholesale => {
      if (qty >= wholesale.min && qty <= wholesale.max) {
        wholesalerSelected = wholesale
        return true
      } else {
        return false
      }
    })
  }

  if (wholesalerSelected) {
    price = wholesalerSelected.price
  }

  if (item.shipping.is_insurance) {
    insurancePrice = item.shipping.insurance_fee
  }
  return (
    <section className='section is-paddingless has-shadow'>
      <div className='detail-product'>
        <div className='purchase'>
          <figure className='img-item'>
            <img src={item.product.image} alt='pict' />
          </figure>
          <h3>{ item.product.name }</h3>
          {/* <span className='price'>Sport Station Shop</span> */}
        </div>
      </div>
      <div className='detail-purchase summary at-cart'>
        <div className='detail-result white'>
          <ul className='data-delivery'>
            <li>
              <div className='columns custom is-mobile'>
                <div className='column'>
                  <strong>Alamat Pengirim</strong>
                  <span>
                    {item.shipping.address.address},<br />
                    {item.shipping.address.subDistrict.name}<br />
                    {item.shipping.address.district.name}<br />
                    {item.shipping.address.province.name}, Indonesia {item.shipping.address.postal_code}
                  </span>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div className='column is-paddingless'>
        <div className='see-all'>
          <span className='link black js-option' data-target='#kurir'>Kurir Pengiriman <span className='kurir'>{item.shipping.expedition_service.expedition.name}</span></span>
        </div>
        <p className='error-msg'>Mohon Pilih Kurir Pengiriman terlebih dahulu</p>
      </div>
      <div className='column is-paddingless'>
        <div className='see-all'>
          <span className='link black js-option' data-target='#deliveryPackage'>Pilih Paket Pengiriman <span className='kurir'>{item.shipping.expedition_service.name}</span></span>
        </div>
        <p className='error-msg'>Mohon Pilih Paket Pengiriman terlebih dahulu</p>
      </div>
      <div className='column is-paddingless'>
        <div className='see-all'>
          <span className='link black js-option' data-target='#insurance'>Asuransi <span className='kurir'>{item.shipping.is_insurance ? 'Ya' : 'Tidak'}</span></span>
        </div>
        <p className='error-msg'>Mohon Pilih Paket Pengiriman terlebih dahulu</p>
      </div>
      <div className='info-purchase'>
        <div className='detail-purchase remark'>
          <h3>Catatan</h3>
          <p className='note-remark'>{item.note}</p>
        </div>
      </div>
      <div className='detail-purchase summary'>
        <div className='detail-result detail-price'>
          <h3>Rincian Harga</h3>
          <ul>
            <li>
              <div className='columns custom is-mobile'>
                <div className='column is-half'><span>Harga Barang</span></div>
                <div className='column is-half has-text-right'><span>Rp { RupiahFormat(price) }</span></div>
              </div>
            </li>
            <li>
              <div className='columns custom is-mobile'>
                <div className='column is-half'><span>Biaya Asuransi</span></div>
                <div className='column is-half has-text-right'><span>Rp { RupiahFormat(insurancePrice) }</span></div>
              </div>
            </li>
            {/* <li>
              <div className='columns custom is-mobile'>
                <div className='column is-half'><span>Ongkos Kirim</span></div>
                <div className='column is-half has-text-right'><span>Rp { RupiahFormat(item.shipping.delivery_cost) }</span></div>
              </div>
            </li> */}
            <li>
              <div className='columns custom is-mobile'>
                <div className='column is-half'><strong>Sub Total</strong></div>
                {/* <div className='column is-half has-text-right'><strong>Rp { RupiahFormat(price+insurancePrice+item.shipping.delivery_cost) }</strong></div> */}
                <div className='column is-half has-text-right'><strong>Rp { RupiahFormat((price + insurancePrice) * qty) }</strong></div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}

const PriceReview = ({ cart }) => {
  let pricePromo = 0
  let totalPayment = cart.total_bill
  if (cart.promo) {
    pricePromo = Promo({ ...cart, totalPayment })
  }

  return (
    <section className='section is-paddingless has-shadow'>
      <div className='payment-detail step-pay'>
        <ul>
          <li>
            <div className='columns is-mobile is-multiline no-margin-bottom'>
              <div className='column'>
                <div className='label-text is-left'>
                  <span>Rincian Harga</span>
                </div>
              </div>
            </div>
          </li>
          <li>
            <ul className='total-pay'>
              <li>
                <div className='columns is-mobile is-multiline no-margin-bottom'>
                  <div className='column'>
                    <div className='label-text is-left'>
                      <span>
                        Total Belanja
                      </span>
                    </div>
                  </div>
                  <div className='column is-one-third'>
                    <div className='has-text-right'>
                      <span>Rp { RupiahFormat(totalPayment) }</span>
                    </div>
                  </div>
                </div>
                <div className='columns is-mobile is-multiline no-margin-bottom'>
                  <div className='column'>
                    <div className='label-text is-left'>
                      <span className='pay-code'>
                        Kode Voucher BELANJAENAK
                      </span>
                    </div>
                  </div>
                  <div className='column is-one-third'>
                    <div className='has-text-right'>
                      <span className='pay-code'> Rp -{pricePromo}</span>
                    </div>
                  </div>
                </div>
                {/* <div className='columns is-mobile is-multiline no-margin-bottom'>
                  <div className='column'>
                    <div className='label-text is-left'>
                      <span className='pay-code'>
                        Saldo
                      </span>
                    </div>
                  </div>
                  <div className='column is-one-third'>
                    <div className='has-text-right'>
                      <span className='pay-code'> Rp -300.000</span>
                    </div>
                  </div>
                </div> */}
              </li>
              <li>
                <div className='columns is-mobile is-multiline no-margin-bottom'>
                  <div className='column'>
                    <div className='label-text is-left'>
                      <span>
                        Sisa Pembayaran
                      </span>
                    </div>
                  </div>
                  <div className='column is-one-third'>
                    <div className='has-text-right'>
                      <span>Rp {RupiahFormat(totalPayment - pricePromo)}</span>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </section>
  )
}

const mapStateToProps = (state) => ({
  cart: state.cart
})
const mapDispatchToProps = (dispatch) => ({
  getCart: () => dispatch(cartActions.getCart())
})

export default connect(mapStateToProps, mapDispatchToProps)(Preview)
