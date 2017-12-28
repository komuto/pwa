// @flow
import React from 'react'
import { connect } from 'react-redux'
import InfiniteScroll from 'react-infinite-scroller'
import _ from 'lodash'
import moment from 'moment'
import NProgress from 'nprogress'
import Router from 'next/router'
// components
import Notification from '../../Components/Notification'
import Loading from '../../Components/Loading'
import MyImage from '../../Components/MyImage'
// actions
import * as transactionAction from '../../actions/transaction'
// lib
import RupiahFormat from '../../Lib/RupiahFormat'
/** including themes */
import Images from '../../Themes/Images'

class OrdersNew extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      newOrders: props.newOrders,
      isEmpty: false,
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
    this.hasMore = false
    this.fetching = { fetchingFirst: false, fetchingMore: false }
  }

  componentDidMount () {
    NProgress.start()
    this.fetching = { ...this.fetching, fetchingFirst: true }
    this.props.getNewOrders(this.state.pagination)
  }

  async loadMore () {
    let { pagination } = this.state
    if (!this.fetching.fetchingMore) {
      const newState = { pagination }
      pagination['page'] = pagination.page + 1
      this.setState(newState)
      this.fetching = { ...this.fetching, fetchingMore: true }
      await this.props.getNewOrders(pagination)
    }
  }

  componentWillReceiveProps (nextProps) {
    const { newOrders } = nextProps
    const { isFetching, isFound, isError, notifError } = this.props
    if (!isFetching(newOrders) && this.fetching.fetchingFirst) {
      NProgress.done()
      this.fetching = { ...this.fetching, fetchingFirst: false }
      if (isFound(newOrders)) {
        this.hasMore = newOrders.orders.length > 9
        let isEmpty = newOrders.orders.length < 1
        this.setState({ newOrders, isEmpty })
      }
      if (isError(newOrders)) {
        this.setState({ notification: notifError(newOrders.message) })
      }
    }

    if (!isFetching(newOrders) && this.fetching.fetchingMore) {
      this.fetching = { ...this.fetching, fetchingMore: false }
      if (isFound(newOrders)) {
        let stateNewOrders = this.state.newOrders
        this.hasMore = newOrders.orders.length > 9
        stateNewOrders.orders = stateNewOrders.orders.concat(newOrders.orders)
        this.setState({ newOrders: stateNewOrders })
      }
      if (isError(newOrders)) {
        this.setState({ notification: notifError(newOrders.message) })
        this.hasMore = false
      }
    }
  }

  render () {
    const { newOrders, notification, isEmpty } = this.state
    moment.locale('id')
    return (
      <div>
        <Notification
          type={notification.type}
          isShow={notification.status}
          activeClose
          onClose={() => this.setState({notification: {status: false, message: ''}})}
          message={notification.message} />
        {
          isEmpty ? <OrdersEmpty /> : <InfiniteScroll
            pageStart={0}
            loadMore={_.debounce(this.loadMore.bind(this), 500)}
            hasMore={this.hasMore}
            loader={<Loading size={12} color='#ef5656' className='is-fullwidth has-text-centered' />}>
            {
              newOrders.orders.map((order, i) => {
                return (
                  <section className='section is-paddingless has-shadow list-order' key={i} onClick={() => Router.push(`/order-detail?id=${order.invoice.id}`)}>
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
                                        <a><MyImage src={order.products[0].image} alt='Pict' /></a>
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
                                                <a><MyImage src={p.image} alt='Pict' /></a>
                                              </figure>
                                            </div>
                                          )
                                        } else {
                                          return (
                                            <div className='media-left sm-margin'>
                                              <figure className='image list-transaction xs plus3'>
                                                <span>+{i++}</span>
                                                <a><MyImage src={p.image} alt='Pict' /></a>
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

/** orders empty content */
const OrdersEmpty = () => {
  return (
    <section className='content'>
      <div className='container is-fluid'>
        <div className='desc has-text-centered'>
          <MyImage src={Images.emptyStateNewOrder} alt='notFound' />
          <p><strong>Pesanan baru kosong</strong></p>
          <p>Anda belum memiliki pesanan baru saat ini</p>
        </div>
      </div>
    </section>
  )
}

const mapStateToProps = (state) => {
  return {
    newOrders: state.newOrders
  }
}

const mapDispatchToProps = dispatch => ({
  getNewOrders: (params) => dispatch(transactionAction.getNewOrders(params))
})

export default connect(mapStateToProps, mapDispatchToProps)(OrdersNew)
