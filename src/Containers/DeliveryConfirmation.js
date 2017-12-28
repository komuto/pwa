// @flow
import React from 'react'
import { connect } from 'react-redux'
import InfiniteScroll from 'react-infinite-scroller'
import _ from 'lodash'
import moment from 'moment'
import NProgress from 'nprogress'
import Router from 'next/router'
// components
import MyImage from '../Components/MyImage'
import Loading from '../Components/Loading'
// actions
import * as transactionAction from '../actions/transaction'
// lib
import RupiahFormat from '../Lib/RupiahFormat'
/** including themes */
import Images from '../Themes/Images'

class DeliveryConfirmation extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      processingOrders: props.processingOrders || null,
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
    this.props.getProcessingOrders(this.state.pagination)
  }

  async loadMore () {
    let { pagination } = this.state
    if (!this.fetching.fetchingMore) {
      const newState = { pagination }
      pagination['page'] = pagination.page + 1
      this.setState(newState)
      this.fetching = { ...this.fetching, fetchingMore: true }
      await this.props.getProcessingOrders(pagination)
    }
  }

  componentWillReceiveProps (nextProps) {
    const { processingOrders } = nextProps
    const { isFetching, isFound, isError, notifError } = this.props

    if (!isFetching(processingOrders) && this.fetching.fetchingFirst) {
      NProgress.done()
      this.fetching = { ...this.fetching, fetchingFirst: false }
      if (isFound(processingOrders)) {
        this.hasMore = processingOrders.orders.length > 9
        let isEmpty = processingOrders.orders.length < 1
        this.setState({ processingOrders, isEmpty })
      }
      if (isError(processingOrders)) {
        this.setState({ notification: notifError(processingOrders.message) })
      }
    }

    if (!isFetching(processingOrders) && this.fetching.fetchingMore) {
      this.fetching = { ...this.fetching, fetchingMore: false }
      if (isFound(processingOrders)) {
        let stateProcessingOrders = this.state.processingOrders
        this.hasMore = processingOrders.orders.length > 9
        stateProcessingOrders.orders = stateProcessingOrders.orders.concat(processingOrders.orders)
        this.setState({ processingOrders: stateProcessingOrders })
      }
      if (isError(processingOrders)) {
        this.setState({ notification: notifError(processingOrders.message) })
        this.hasMore = false
      }
    }
  }

  render () {
    const { processingOrders, isEmpty } = this.state
    console.log('process', processingOrders)
    moment.locale('id')
    return (
      <div>
        {
          isEmpty ? <OrdersEmpty /> : <InfiniteScroll
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
                                        <a><MyImage src={order.products[0].image} alt='Pict' /></a>
                                      </figure>
                                    </div>
                                    <div className='media-content middle'>
                                      <div className='content'>
                                        <h4 className='txt-overflow no-margin'>{order.products[0].name}</h4>
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
                    <div className='block-add-resi has-text-centered' onClick={() => Router.push(`/input-shipment-number?id=${order.invoice.id}`)}>
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

/** orders empty content */
const OrdersEmpty = () => {
  return (
    <section className='content'>
      <div className='container is-fluid'>
        <div className='desc has-text-centered'>
          <MyImage src={Images.emptyConfirmation} alt='notFound' />
          <p><strong>Konfirmasi Pengiriman Kosong</strong></p>
          <p>Anda belum memiliki daftar barang yang siap untuk dikirim ke pembeli Anda.</p>
        </div>
      </div>
    </section>
  )
}

const mapStateToProps = (state) => {
  return {
    processingOrders: state.processingOrders
  }
}

const mapDispatchToProps = dispatch => ({
  getProcessingOrders: (params) => dispatch(transactionAction.getProcessingOrders(params))
})

export default connect(mapStateToProps, mapDispatchToProps)(DeliveryConfirmation)
