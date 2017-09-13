import React, { Component } from 'react'
import { connect } from 'react-redux'
import NProgress from 'nprogress'
// componnet
import Content from '../Components/Content'
import MyImage from '../Components/MyImage'
// actions
import * as transactionActions from '../actions/transaction'
// images
import Images from '../Themes/Images'
// services
import { validateResponse, isFetching } from '../Services/Status'
// lib
import RupiahFormat from '../Lib/RupiahFormat'

class TransactionDetail extends Component {
  constructor (props) {
    super(props)
    this.state = {
      id: props.query.id || null,
      transaction: props.transaction || null
    }
    this.paymentStatus = ['add', 'checkout', 'delete', 'Menunggu Pembayaran', 'Verifikasi', 'Kadaluarsa', 'Sudah dibayar', 'Cancel']
    this.paymentIcon = [Images.paymentWaiting, Images.paymentVerification, Images.paymentExpired, Images.paymentDone]
  }

  componentDidMount () {
    const { id } = this.state
    NProgress.start()
    this.props.getTransaction({ id })
  }

  componentWillReceiveProps (nextProps) {
    const { transaction } = nextProps
    if (!isFetching(transaction)) {
      NProgress.done()
      this.setState({ transaction, notification: validateResponse(transaction, 'Data transaksi tidak ditemukan!') })
    }
  }

  render () {
    const { transaction } = this.state
    if (!transaction.isFound) return null
    const { bucket, invoices, summary_transaction } = transaction.transaction
    let status = bucket.status - 1
    let icon = this.paymentIcon[bucket.status - 3]

    return (
      <Content>
        <section className='section is-paddingless has-shadow'>
          <div className='box notif-payment-waiting'>
            <article className='media'>
              <div className='media-left'>
                <figure className='image user-pict' style={icon === undefined ? { width: 50 } : {}}>
                  <MyImage src={icon} />
                </figure>
              </div>
              <div className='media-content'>
                <div className='content'>
                  <p>
                    <strong>{ this.paymentStatus[status] }</strong>
                  </p>
                </div>
              </div>
            </article>
          </div>
          <div className='payment-detail'>
            <ul>
              <li>
                <div className='columns is-mobile is-multiline no-margin-bottom'>
                  <div className='column is-one-third'>
                    <div className='rating-content is-left'>
                      <span>Total Tagihan</span>
                    </div>
                  </div>
                  <div className='column'>
                    <div className='rating-content is-left has-text-right'>
                      <span>Rp { RupiahFormat(summary_transaction.total_price) }</span>
                      <a className='detail-collapsed'>Detail <span className='icon-arrow-down blue' /></a>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </section>
        <section className='section is-paddingless has-shadow sm-margin'>
          <div className='container is-fluid'>
            <div className='title'>
              <h3>Daftar Barang Yang Dibeli</h3>
            </div>
          </div>
          <div className='payment-detail step-pay'>
            <ul>
              {
              invoices.map((invoice, index) => {
                let { store } = invoice
                return (
                  <li key={index}>
                    <div className='columns is-mobile is-multiline no-margin-bottom'>
                      <div className='column'>
                        <div className='label-text is-left top-middle'>
                          <span>{ store.name }</span>
                        </div>
                      </div>
                    </div>
                    <div className='columns is-mobile is-multiline no-margin-bottom'>
                      <div className='column'>
                        <div className='box'>
                          <div className='media list-item'>
                            {
                              invoice.items.map((item, index) => {
                                return index < 4
                                      ? <div key={item.id} className='media-left'>
                                        <figure className='image list-transaction sm'>
                                          <a><MyImage src={item.product.image} alt='Image' /></a>
                                        </figure>
                                      </div>
                                        : index === 4
                                          ? <div className='media-left' key={index}>
                                            <figure className='image list-transaction plus3'>
                                              <span>+3</span>
                                              <a><MyImage src={item.product.image} alt='Image' /></a>
                                            </figure>
                                          </div>
                                        : null
                              })
                            }
                            <div className='media-content middle'>
                              <div className='content'>
                                <h4>{ invoice.items.length < 2 ? invoice.items[0].product.name : '' }</h4>
                                <div className='right-top'>
                                  <span className='icon-arrow-right' />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                )
              })
              }
            </ul>
          </div>
        </section>
      </Content>
    )
  }
}

const mapStateToProps = (state) => ({
  transaction: state.transaction
})

const mapDispatchToProps = (dispatch) => ({
  getTransaction: (params) => dispatch(transactionActions.getTransaction(params))
})

export default connect(mapStateToProps, mapDispatchToProps)(TransactionDetail)
