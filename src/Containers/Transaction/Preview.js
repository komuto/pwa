import React, { Component } from 'react'
import { connect } from 'react-redux'
// import Router from 'next/router'
import * as transactionActions from '../../actions/transaction'
import RupiahFormat from '../../Lib/RupiahFormat'
import NProgress from 'nprogress'

class Preview extends Component {
  constructor (props) {
    super(props)
    this.state = {
      transaction: props.transaction || null,
      idT: props.query.id || null,
      notification: props.notification
    }
    this.submitting = { transaction: false }
  }

  componentDidMount () {
    let { idT } = this.state
    NProgress.start()
    this.submitting = { ...this.submitting, transaction: true }
    this.props.getTransaction({ id: idT })
  }

  componentWillReceiveProps (nextProps) {
    let { transaction } = nextProps
    let { isFetching, isError, isFound, notifError } = this.props
    // handling state get transaction
    if (!isFetching(transaction) && this.submitting.transaction) {
      NProgress.done()
      this.submitting = { ...this.submitting, transaction: false }
      if (isError(transaction)) {
        this.setState({ notification: notifError(transaction.message) })
      }
      if (isFound(transaction)) {
        this.setState({ transaction })
      }
    }
  }

  render () {
    const { transaction } = this.state
    return (
      <div>
        {
          transaction.isFound &&
          <div>
            {
              transaction.transaction.invoices.map((invoice, index) => <ItemPreview invoice={invoice} key={index} />)
            }
            <PriceReview {...transaction.transaction} />
          </div>
        }
      </div>
    )
  }
}

const ItemPreview = ({ invoice }) => {
  let price = invoice.total_bill
  // let qty = 0
  // let wholesalerSelected = null
  // calc insurance
  // let insurancePrice = 0
  // real price
  // if (invoice.product) {
  //   price = item.product.price
  // }
  // // price after discount
  // if (item.product.is_discount) {
  //   price = price - (price * (item.product.discount / 100))
  // }

  // // check wholesaler or not
  // if (item.product.wholesale) {
  //   item.product.wholesale.forEach(wholesale => {
  //     if (qty >= wholesale.min && qty <= wholesale.max) {
  //       wholesalerSelected = wholesale
  //       return true
  //     } else {
  //       return false
  //     }
  //   })
  // }

  // if (wholesalerSelected) {
  //   price = wholesalerSelected.price
  // }

  if (invoice.shipping.is_insurance) {
    // insurancePrice = invoice.shipping.insurance_fee
  }
  return (
    <section className='section is-paddingless has-shadow'>
      {
        invoice.items.map((item, index) =>
          <div key={index} className='detail-product'>
            <div className='purchase'>
              <figure className='img-item'>
                <img src={item.product.image} alt='pict' />
              </figure>
              <h3>{ item.product.name }</h3>
              {/* <span className='price'>Sport Station Shop</span> */}
            </div>
          </div>
        )
      }
      <div className='detail-purchase summary at-cart'>
        <div className='detail-result white'>
          <ul className='data-delivery'>
            <li>
              <div className='columns custom is-mobile'>
                <div className='column'>
                  <strong>Alamat Pengirim</strong>
                  <span>
                    {invoice.shipping.address.address}, {invoice.shipping.address.postal_code}<br />
                    {/* {invoice.shipping.address.subDistrict.name}<br />
                    {invoice.shipping.address.district.name}<br />
                    {invoice.shipping.address.province.name}, Indonesia {invoice.shipping.address.postal_code} */}
                  </span>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div className='column is-paddingless'>
        <div className='see-all'>
          <span className='link black js-option' data-target='#kurir'>Kurir Pengiriman <span className='kurir'>{invoice.shipping.expedition_service.expedition.name}</span></span>
        </div>
        <p className='error-msg'>Mohon Pilih Kurir Pengiriman terlebih dahulu</p>
      </div>
      <div className='column is-paddingless'>
        <div className='see-all'>
          <span className='link black js-option' data-target='#deliveryPackage'>Pilih Paket Pengiriman <span className='kurir'>{invoice.shipping.expedition_service.name}</span></span>
        </div>
        <p className='error-msg'>Mohon Pilih Paket Pengiriman terlebih dahulu</p>
      </div>
      <div className='column is-paddingless'>
        <div className='see-all'>
          <span className='link black js-option' data-target='#insurance'>Asuransi <span className='kurir'>{invoice.shipping.is_insurance ? 'Ya' : 'Tidak'}</span></span>
        </div>
        <p className='error-msg'>Mohon Pilih Paket Pengiriman terlebih dahulu</p>
      </div>
      <div className='info-purchase'>
        <div className='detail-purchase remark'>
          <h3>Catatan</h3>
          <p className='note-remark'>-</p>
        </div>
      </div>
      <div className='detail-purchase summary'>
        <div className='detail-result detail-price'>
          <h3>Rincian Harga</h3>
          <ul>
            {/* <li>
              <div className='columns custom is-mobile'>
                <div className='column is-half'><span>Harga Barang</span></div>
                <div className='column is-half has-text-right'><span>Rp { RupiahFormat(price) }</span></div>
              </div>
            </li> */}
            {/* <li>
              <div className='columns custom is-mobile'>
                <div className='column is-half'><span>Biaya Asuransi</span></div>
                <div className='column is-half has-text-right'><span>Rp { RupiahFormat(insurancePrice) }</span></div>
              </div>
            </li> */}
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
                <div className='column is-half has-text-right'><strong>Rp { RupiahFormat(price) }</strong></div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}

const PriceReview = ({ summary_transaction }) => {
  let pricePromo = 0
  let totalPayment = summary_transaction.total_price

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
                {/* <div className='columns is-mobile is-multiline no-margin-bottom'>
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
                </div> */}
                {/* <div className='columns is-mobile is-multiline no-margin-bottom'>
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
                </div> */}
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
  transaction: state.transaction
})
const mapDispatchToProps = (dispatch) => ({
  getTransaction: (params) => dispatch(transactionActions.getTransaction(params))
})

export default connect(mapStateToProps, mapDispatchToProps)(Preview)
