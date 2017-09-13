import React, { Component } from 'react'
import { connect } from 'react-redux'
import NProgress from 'nprogress'
// component
import Content from '../Components/Content'
import MyImage from '../Components/MyImage'
import Notification from '../Components/Notification'
// actions
import * as transactionActions from '../actions/transaction'
// services
import { validateResponse, isFetching } from '../Services/Status'
// lib
import RupiahFormat from '../Lib/RupiahFormat'
class Transaction extends Component {
  constructor (props) {
    super(props)
    this.state = {
      listTransactions: props.listTransactions || null,
      notification: {
        status: false,
        message: 'Error, default message.'
      }
    }
    // this.paymentStatus = ['add', 'checkout', 'delete', 'Menunggu Pembayaran', 'Menunggu Verifikasi Pembayaran', 'Pembayaran Kadaluarsa', 'Pembayaran Telah diterima & diteruskan ke seller', 'Cancel']
    this.paymentStatus = ['add', 'checkout', 'delete', 'Menunggu Pembayaran', 'Verifikasi', 'Kadaluarsa', 'Sudah dibayar', 'Cancel']
  }

  componentDidMount () {
    NProgress.start()
    this.props.getListTransactions()
  }

  componentWillReceiveProps (nextProps) {
    const { listTransactions } = nextProps
    if (!isFetching(listTransactions)) {
      NProgress.done()
      this.setState({ listTransactions, notification: validateResponse(listTransactions, 'Data transaksi tidak ditemukan') })
    }
  }

  render () {
    const { listTransactions, notification } = this.state
    if (!listTransactions.isFound) return null

    let transactionsWaiting = []
    let transactionsNotWaiting = []

    if (listTransactions.isFound) {
      transactionsWaiting = listTransactions.listTransactions.filter((lt) => {
        return lt.summary_transaction.status === 2
      })

      transactionsNotWaiting = listTransactions.listTransactions.filter((lt) => {
        return lt.summary_transaction.status !== 2
      })
    }

    return (
      <Content>
        <Notification
          type='is-danger'
          isShow={notification.status}
          activeClose
          onClose={() => this.setState({notification: {status: false, message: ''}})}
          message={notification.message} />
        <section className='section is-paddingless'>
          <div className='payment-detail step-pay'>
            <ul>
              {
                transactionsWaiting.map((tnw) => {
                  let { products, summary_transaction } = tnw
                  return (
                    <li>
                      <div className='columns is-mobile is-multiline no-margin-bottom'>
                        <div className='column'>
                          <div className='box'>
                            <div className='media'>
                              <div className='media-left'>
                                <figure className='image list-transaction'>
                                  <a>
                                    <MyImage src='../images/thumb.jpg' />
                                  </a>
                                </figure>
                              </div>
                              <div className='media-content is-right-content'>
                                <div className='content'>
                                  <h4>{ products.name }</h4>
                                  <div className='right-top'>
                                    <div className='price-items'>
                                      <strong>Rp { RupiahFormat(summary_transaction.total_price) }</strong>
                                    </div>
                                    <span className='icon-arrow-right' />
                                  </div>
                                  <div className='detail'>
                                    <p>Sports Stations Shop</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className='box notif-payment'>
                        <article className='media'>
                          <div className='media-content'>
                            <div className='content'>
                              <p>
                                <strong>Menunggu Pembayaran</strong>
                                <br />
                                1 hari  :  20 jam  :  30 menit
                              </p>
                            </div>
                          </div>
                        </article>
                      </div>
                    </li>
                  )
                })
              }
            </ul>
          </div>
        </section>
        <section className='section is-paddingless'>
          <div className='payment-detail step-pay'>
            <ul>
              {
                transactionsNotWaiting.map((tnw) => {
                  let { bucket, products, summary_transaction } = tnw
                  return (
                    <li className='' key={bucket.id}>
                      <div className='columns is-mobile is-multiline no-margin-bottom'>
                        <div className='column'>
                          <div className='box'>
                            <div className='media'>
                              {
                                products.map((product, index) => {
                                  return index < 2
                                          ? <div className='media-left' key={index}>
                                            <figure className='image list-transaction'>
                                              <a>
                                                <MyImage src={product.image} alt='Image' />
                                              </a>
                                            </figure>
                                          </div>
                                          : index === 3 &&
                                          <div className='media-left' key={index}>
                                            <figure className='image list-transaction plus3'>
                                              <span>+3</span>
                                              <a>
                                                <MyImage src={product.image} alt='Image' />
                                              </a>
                                            </figure>
                                            </div>
                                })
                              }
                              <div className='media-content is-right-content'>
                                <div className='content'>
                                  <div className='right-top'>
                                    <div className='price-items'>
                                      <strong>Rp { RupiahFormat(summary_transaction.total_price) }</strong>
                                      <p>{ this.paymentStatus[bucket.status - 1] }</p>
                                    </div>
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
  listTransactions: state.listTransactions
})

const mapDispatchToProps = (dispatch) => ({
  getListTransactions: () => dispatch(transactionActions.listTransactions())
})

export default connect(mapStateToProps, mapDispatchToProps)(Transaction)
