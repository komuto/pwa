import React, { Component } from 'react'
import { connect } from 'react-redux'
import NProgress from 'nprogress'
import Router from 'next/router'
// component
import Content from '../../Components/Content'
import MyImage from '../../Components/MyImage'
import Notification from '../../Components/Notification'
// actions
import * as transactionActions from '../../actions/transaction'
// lib
import RupiahFormat from '../../Lib/RupiahFormat'
// utils
import { PAYMENT_STATUS } from './Detail'

class Transaction extends Component {
  constructor (props) {
    super(props)
    this.state = {
      listTransactions: props.listTransactions || null,
      notification: props.notification
    }
    this.submitting = {
      transaction: false
    }
  }

  componentDidMount () {
    NProgress.start()
    this.submitting = { ...this.submitting, transaction: true }
    this.props.getListTransactions()
  }

  componentWillReceiveProps (nextProps) {
    let { listTransactions } = nextProps
    let { isFetching, isError, isFound, notifError } = this.props
    if (!isFetching(listTransactions) && this.submitting.transaction) {
      NProgress.done()
      this.submitting = { ...this.submitting, transaction: false }
      if (isError(listTransactions)) {
        this.setState({ notification: notifError(listTransactions.message) })
      }
      if (isFound(listTransactions)) {
        this.setState({ listTransactions })
      }
    }
  }

  render () {
    const { listTransactions, notification } = this.state
    return (
      <Content>
        <Notification
          type='is-danger'
          isShow={notification.status}
          activeClose
          onClose={() => this.setState({notification: {status: false, message: ''}})}
          message={notification.message} />
        { listTransactions.isFound &&
          <TransactionContent {...this.state} />
        }
      </Content>
    )
  }
}

const TransactionContent = (props) => {
  let { listTransactions } = props
  let transWaitPayment = []
  let transWaitNotPayment = []

  if (listTransactions.isFound) {
    transWaitPayment = listTransactions.listTransactions.filter((lt) => {
      return lt.bucket.status === 3
    })

    transWaitNotPayment = listTransactions.listTransactions.filter((lt) => {
      return lt.bucket.status !== 3
    })
  }

  return (
    <div>
      <section className='section is-paddingless'>
        <div className='payment-detail step-pay'>
          <ul>
            {
                transWaitPayment.map((tnw, index) => {
                  let { bucket, products, summary_transaction } = tnw
                  let { days, hours, minutes } = summary_transaction.time_left
                  return (
                    <li key={index}>
                      <div className='columns is-mobile is-multiline no-margin-bottom'>
                        <div className='column'>
                          <div className='box'>
                            <div className='media' onClick={() => Router.push(`/transaction-detail?id=${bucket.id}`)}>
                              <div className='media-left'>
                                <figure className='image list-transaction'>
                                  <a>
                                    <MyImage src={products[0] && products[0].image} alt={products.name} />
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
                                    <p>Sports Stations Shop { summary_transaction.status }</p>
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
                                {days} hari  :
                                {hours} jam  :
                                {minutes} menit
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
        <div className='payment-detail step-pay'>
          <ul>
            {
              transWaitNotPayment.map((tnw) => {
                let { bucket, products, summary_transaction } = tnw
                return (
                  <li className='' key={bucket.id}>
                    <div className='columns is-mobile is-multiline no-margin-bottom'>
                      <div className='column'>
                        <div className='box'>
                          <div className='media' onClick={() => Router.push(`/transaction-detail?id=${bucket.id}`)}>
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
                                {
                                  products.length < 2 && <h4>{ products[0] && products[0].name }</h4>
                                }
                                <div className='right-top'>
                                  <div className='price-items'>
                                    <strong>Rp { RupiahFormat(summary_transaction.total_price) }</strong>
                                    <p>{ PAYMENT_STATUS[bucket.status] }</p>
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
    </div>
  )
}

const mapStateToProps = (state) => ({
  listTransactions: state.listTransactions
})

const mapDispatchToProps = (dispatch) => ({
  getListTransactions: () => dispatch(transactionActions.listTransactions())
})

export default connect(mapStateToProps, mapDispatchToProps)(Transaction)
