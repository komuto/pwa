import React, { Component } from 'react'
import { connect } from 'react-redux'
// component
import Section from '../Components/Section'
import Content from '../Components/Content'
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
      itemSelected: null,
      notification: {
        type: 'is-danger',
        status: false,
        message: 'Error, default message.'
      }
    }
  }

  itemSelected (selected) {
    this.setState({ itemSelected: (this.state.itemSelected === selected) ? null : selected })
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
    const { cart, itemSelected } = this.state
    if (!cart.isFound) return null
    console.log(cart)
    console.log(itemSelected)
    return (
      <Section>
        <section className='section is-paddingless has-shadow'>
          <div className='detail-product'>
            <div className='purchase'>
              <figure className='img-item'>
                <img src='../images/pict.jpg' alt='pict' />
              </figure>
              <h3>Blue Training Kit Machester United</h3>
              <span className='price'>Sport Station Shop</span>
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
                    <span>Rp 135.000</span>
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
                    <a><span className='icon-qty-min' /></a>
                    <span className='qty'>1</span>
                    <a><span className='icon-qty-plus' /></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='see-all'>
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
                    <span>Rp 270.000</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {
          cart.cart.items.map((item) => {
            let selected = itemSelected === item.id
            return (
              <Content key={item.id}>
                <div className='detail-product' onClick={() => this.itemSelected(item.id)}>
                  <div className='purchase'>
                    <figure className='img-item'>
                      <MyImage src={item.product.image} />
                    </figure>
                    <h3>{item.product.name}</h3>
                    <span className='price'>Rp {RupiahFormat(item.product.price)}</span>
                  </div>
                  <span className='remove-item'> <a>Hapus</a> <span className={selected ? 'icon-arrow-down' : 'icon-arrow-right'} /></span>
                </div>
                <div style={{ display: selected ? 'block' : 'none' }}>
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
                            <a><span className='icon-qty-min' /></a>
                            <span className='qty'>1</span>
                            <a><span className='icon-qty-plus' /></a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='detail-purchase summary at-cart'>
                    <div className='detail-result white'>
                      <a className='btn-change js-option' data-target='#changeAddress'>Ganti</a>
                      <ul className='data-delivery'>
                        <li>
                          <div className='columns custom is-mobile'>
                            <div className='column'>
                              <strong>Alamat Pengirim</strong>
                              <span>
                                Kemanggisan Jakarta Barat,<br />
                                Palmerah<br />
                                Jakarta Barat<br />
                                DKI Jakarta, Indonesia 55673
                              </span>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className='column is-paddingless'>
                    <div className='see-all'>
                      <span className='link black js-option' data-target='#kurir'>Kurir Pengiriman <span className='kurir'>JNE</span><span className='icon-arrow-down' /></span>
                    </div>
                    <p className='error-msg'>Mohon Pilih Kurir Pengiriman terlebih dahulu</p>
                  </div>

                  <div className='column is-paddingless'>
                    <div className='see-all'>
                      <span className='link black js-option' data-target='#deliveryPackage'>Pilih Paket Pengiriman <span className='kurir'>Reguler</span><span className='icon-arrow-down' /></span>
                    </div>
                    <p className='error-msg'>Mohon Pilih Paket Pengiriman terlebih dahulu</p>
                  </div>

                  <div className='column is-paddingless'>
                    <div className='see-all'>
                      <span className='link black js-option' data-target='#insurance'>Asuransi <span className='kurir'>Tidak</span><span className='icon-arrow-down' /></span>
                    </div>
                    <p className='error-msg'>Mohon Pilih Paket Pengiriman terlebih dahulu</p>
                  </div>

                  <div className='info-purchase'>
                    <div className='detail-purchase remark'>
                      <h3>Catatan</h3>
                      <p className='note-remark'>Saya pesan barang yang warna merah</p>
                    </div>
                  </div>

                  <div className='detail-purchase summary'>
                    <div className='detail-result detail-price'>
                      <h3>Rincian Harga</h3>
                      <ul>
                        <li>
                          <div className='columns custom is-mobile'>
                            <div className='column is-half'><span>Harga Barang</span></div>
                            <div className='column is-half has-text-right'><span>Rp 380.000</span></div>
                          </div>
                        </li>
                        <li>
                          <div className='columns custom is-mobile'>
                            <div className='column is-half'><span>Biaya Asuransi</span></div>
                            <div className='column is-half has-text-right'><span>Rp 10.000</span></div>
                          </div>
                        </li>
                        <li>
                          <div className='columns custom is-mobile'>
                            <div className='column is-half'><span>Ongkos Kirim</span></div>
                            <div className='column is-half has-text-right'><span>Rp 8.000</span></div>
                          </div>
                        </li>
                        <li>
                          <div className='columns custom is-mobile'>
                            <div className='column is-half'><strong>Harga Barang</strong></div>
                            <div className='column is-half has-text-right'><strong>Rp 380.000</strong></div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </Content>
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
