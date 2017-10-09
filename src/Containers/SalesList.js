// @flow
import React from 'react'
import { connect } from 'react-redux'
import InfiniteScroll from 'react-infinite-scroller'
import _ from 'lodash'
import moment from 'moment'
import NProgress from 'nprogress'
import Router from 'next/router'
// components
import Loading from '../Components/Loading'
// actions
import * as transactionAction from '../actions/transaction'
// lib
import RupiahFormat from '../Lib/RupiahFormat'
// services
import { isFetching, validateResponse } from '../Services/Status'

class SalesList extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      processingOrders: props.processingOrders,
      pagination: {
        page: 1,
        limit: 10
      },
      notification: {
        type: 'is-success',
        status: false,
        message: 'Error, default message.'
      }
    }
    this.hasMore = true
    this.fetching = false
    this.fetchingFirst = false
  }

  detailOrder (id, type) {
    if (type === 'reseller') {
      Router.push(`/input-shipment-number-dropship?id=${id}`)
    } else {
      Router.push(`/input-shipment-number?id=${id}`)
    }
  }

  componentDidMount () {
    NProgress.start()
    this.fetchingFirst = true
    this.props.getProcessingOrders(this.state.pagination)
  }

  async loadMore () {
    let { pagination } = this.state
    if (!this.fetching) {
      const newState = { pagination }
      pagination['page'] = pagination.page + 1
      this.setState(newState)
      this.fetching = true
      await this.props.getProcessingOrders(pagination)
    }
  }

  componentWillReceiveProps (nextProps) {
    const { processingOrders } = nextProps
    if (!isFetching(processingOrders) && this.fetchingFirst) {
      NProgress.done()
      this.fetchingFirst = false
      this.setState({ processingOrders, notification: validateResponse(processingOrders, 'Data review tidak ditemukan!') })
    }
    if (!isFetching(processingOrders) && this.fetching) {
      let stateNewOrders = this.state.processingOrders
      if (processingOrders.orders.length > 0) {
        this.fetching = false
        stateNewOrders.orders = stateNewOrders.orders.concat(processingOrders.orders)
        this.setState({ processingOrders: stateNewOrders, notification: validateResponse(processingOrders, processingOrders.message) })
      } else {
        this.hasMore = false
        this.fetching = false
      }
    }
  }

  render () {
    const { processingOrders } = this.state
    if (!processingOrders.isFound) return null
    moment.locale('id')
    return (
      <div>
        {
          <InfiniteScroll
            pageStart={0}
            loadMore={_.debounce(this.loadMore.bind(this), 500)}
            hasMore={this.hasMore}
            loader={<Loading size={12} color='#ef5656' className='is-fullwidth has-text-centered' />}>
            {
              processingOrders.orders.map((order, i) => {
                return (
                  <section className='section is-paddingless has-shadow list-order' key={i}>
                    <ul className='customer-order'>
                      <li className='label-order'>
                        {
                          order.invoice.type === 'reseller' && <p className='dropship-item'>Pesanan Dropshipper</p>
                        }
                      </li>
                      <li>
                        <div className='columns custom is-mobile'>
                          <div className='column is-half'><strong>{order.user.name}</strong></div>
                          <div className='column is-half has-text-right'><span>{moment.unix(order.invoice.created_at).format('ddd, DD MMM YYYY')}</span></div>
                        </div>
                      </li>
                    </ul>
                    <div className='payment-detail step-pay'>
                      <ul>
                        <li>
                          <div className='columns is-mobile is-multiline no-margin-bottom'>
                            <div className='column'>
                              <div className='box'>
                                {
                                  order.products.length === 1
                                  ? <div className='media is-right-content'>
                                    <div className='media-left'>
                                      <figure className='image list-transaction xs'>
                                        <a><img src={order.products[0].image} alt='Pict' /></a>
                                      </figure>
                                    </div>
                                    <div className='media-content'>
                                      <div className='content'>
                                        <h4 className='txt-overflow'>{order.products[0].name}</h4>
                                      </div>
                                    </div>
                                    <div className='right-middle'>
                                      <strong>Rp { RupiahFormat(order.invoice.total_price) }</strong>
                                    </div>
                                  </div>
                                  : <div className='media is-right-content'>
                                    {
                                      order.products.map((p, i) => {
                                        if (i < 3) {
                                          return (
                                            <div className='media-left sm-margin' key={i}>
                                              <figure className='image list-transaction xs'>
                                                <a><img src={p.image} alt='Pict' /></a>
                                              </figure>
                                            </div>
                                          )
                                        } else {
                                          return (
                                            <div className='media-left sm-margin'>
                                              <figure className='image list-transaction xs plus3'>
                                                <span>+{i++}</span>
                                                <a><img src={p.image} alt='Pict' /></a>
                                              </figure>
                                            </div>
                                          )
                                        }
                                      })
                                    }
                                    <div className='right-middle'>
                                      <strong>Rp { RupiahFormat(order.invoice.total_price) }</strong>
                                    </div>
                                  </div>
                                }
                              </div>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                    <div className='block-add-resi has-text-centered' onClick={() => this.detailOrder(order.invoice.id, order.invoice.type)}>
                      {
                        order.invoice.type === 'reseller' ? <a>Menunggu Input No Resi dari Seller</a> : <a>Masukkan No Resi Pengiriman</a>
                      }
                    </div>
                  </section>
                )
              })
            }
          </InfiniteScroll>
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    processingOrders: state.processingOrders
  }
}

const mapDispatchToProps = dispatch => ({
  getProcessingOrders: (params) => dispatch(transactionAction.getProcessingOrders(params))
})

export default connect(mapStateToProps, mapDispatchToProps)(SalesList)
