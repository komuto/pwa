// @flow
import React from 'react'
import { connect } from 'react-redux'
import InfiniteScroll from 'react-infinite-scroller'
import _ from 'lodash'
import NProgress from 'nprogress'
// components
import Router from 'next/router'
import Loading from '../../Components/Loading'
import Images from '../../Themes/Images'
import Notification from '../../Components/Notification'
// actions
import * as transactionAction from '../../actions/transaction'
// services
import { isFetching, isFound, isError, validateResponse } from '../../Services/Status'

const TAB_WAIT = 'TAB_WAIT'
const TAB_DONE = 'TAB_DONE'

class ComplainItems extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      sellerComplainedOrders: props.sellerComplainedOrders || null,
      sellerComplainedOrders2: props.sellerComplainedOrders2 || null,
      tabs: TAB_WAIT,
      pagination: {
        page: 1,
        limit: 10
      },
      pagination2: {
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
    this.fetching = false
    this.fetchingFirst = false
    this.hasMore2 = false
    this.fetching2 = false
    this.fetchingFirst2 = false
  }

  switchTab (e) {
    const { tabs } = this.state
    this.setState({ tabs: (tabs === TAB_WAIT) ? TAB_DONE : TAB_WAIT })
  }

  complainDetail (id) {
    Router.push(`/complain-seller-detail?id=${id}`)
  }

  async loadMore () {
    let { pagination } = this.state
    if (!this.fetching) {
      const newState = { pagination }
      pagination['page'] = pagination.page + 1
      this.setState(newState)
      this.fetching = true
      await this.props.getComplainedOrdersSeller(this.state.pagination)
    }
  }

  async loadMore2 () {
    let { pagination2 } = this.state
    if (!this.fetching2) {
      const newState = { pagination2 }
      pagination2['page'] = pagination2.page + 1
      this.setState(newState)
      this.fetching2 = true
      await this.props.getComplainedOrdersSeller2(this.state.pagination2)
    }
  }

  componentDidMount () {
    NProgress.start()
    this.fetchingFirst = true
    this.fetchingFirst2 = true
    this.props.getComplainedOrdersSeller({ page: 1, limit: 10, is_resolved: false })
    this.props.getComplainedOrdersSeller2({ page: 1, limit: 10, is_resolved: true })
  }

  componentWillReceiveProps (nextProps) {
    const { sellerComplainedOrders, sellerComplainedOrders2 } = nextProps
    if (!isFetching(sellerComplainedOrders) && this.fetchingFirst) {
      NProgress.done()
      if (isFound(sellerComplainedOrders)) {
        this.fetchingFirst = false
        this.setState({ sellerComplainedOrders: sellerComplainedOrders })
      }
      if (isError(sellerComplainedOrders)) {
        this.fetchingFirst = false
        this.setState({ notification: validateResponse(sellerComplainedOrders, sellerComplainedOrders.message) })
      }
    }
    if (!isFetching(sellerComplainedOrders) && this.fetching) {
      let newSellerComplainedOrders = this.state.sellerComplainedOrders
      if (isFound(sellerComplainedOrders)) {
        if (sellerComplainedOrders.orders.length > 0) {
          this.fetching = false
          newSellerComplainedOrders.orders = newSellerComplainedOrders.orders.concat(sellerComplainedOrders.orders)
          this.setState({ sellerComplainedOrders: newSellerComplainedOrders })
        } else {
          this.hasMore = false
          this.fetching = false
        }
      }
      if (isError(sellerComplainedOrders)) {
        this.setState({ notification: validateResponse(sellerComplainedOrders, sellerComplainedOrders.message) })
        this.hasMore = false
        this.fetching = false
      }
    }
    if (!isFetching(sellerComplainedOrders2) && this.fetchingFirst2) {
      NProgress.done()
      if (isFound(sellerComplainedOrders2)) {
        this.fetchingFirst2 = false
        this.setState({ sellerComplainedOrders2: sellerComplainedOrders2 })
      }
      if (isError(sellerComplainedOrders2)) {
        this.fetchingFirst2 = false
        this.setState({ notification: validateResponse(sellerComplainedOrders2, sellerComplainedOrders2.message) })
      }
    }
    if (!isFetching(sellerComplainedOrders2) && this.fetching2) {
      let newSellerComplainedOrders2 = this.state.sellerComplainedOrders2
      if (isFound(sellerComplainedOrders2)) {
        if (sellerComplainedOrders2.orders.length > 0) {
          this.fetching2 = false
          newSellerComplainedOrders2.orders = newSellerComplainedOrders2.orders.concat(sellerComplainedOrders2.orders)
          this.setState({ sellerComplainedOrders2: newSellerComplainedOrders2 })
        } else {
          this.hasMore2 = false
          this.fetching2 = false
        }
      }
      if (isError(sellerComplainedOrders2)) {
        this.setState({ notification: validateResponse(sellerComplainedOrders2, sellerComplainedOrders2.message) })
        this.hasMore2 = false
        this.fetching2 = false
      }
    }
    console.log('nextPropsMes', nextProps)
  }

  render () {
    console.log('state', this.state)
    const { notification, tabs, sellerComplainedOrders, sellerComplainedOrders2 } = this.state
    return (
      <div>
        <div className='nav-tabs'>
          <a onClick={(e) => this.switchTab(e)} className={tabs === TAB_WAIT && 'active'}>
            <span className='text'>Menunggu</span>
          </a>
          <a onClick={(e) => this.switchTab(e)} className={tabs === TAB_DONE && 'active'}>
            <span className='text'>Terselesaikan
              { /* sellerComplainedOrders2.isFound && <span className='notif-complaint'><span> {sellerComplainedOrders2.orders.length} </span></span> */}
            </span>
          </a>
        </div>
        <Notification
          type={notification.type}
          isShow={notification.status}
          activeClose
          onClose={() => this.setState({notification: {status: false, message: ''}})}
          message={notification.message} />
        <section className='section is-paddingless'>
          <div className='discuss'>
            <ul className='notif-detail conversation bresolutioned'>
              {
                tabs === TAB_WAIT
                ? <ListComplainOrderWaiting
                  sellerComplainedOrders={sellerComplainedOrders}
                  hasMore={this.hasMore}
                  loadMore={() => this.loadMore()} />
                : <ListComplainOrderDone
                  sellerComplainedOrders2={sellerComplainedOrders2}
                  hasMore2={this.hasMore2}
                  loadMore2={() => this.loadMore2()} />
              }
            </ul>
          </div>
        </section>
      </div>
    )
  }
}

const ListComplainOrderWaiting = (props) => {
  const { sellerComplainedOrders } = props
  if (sellerComplainedOrders === undefined) return null
  return (
    <div>
      {
        sellerComplainedOrders.orders.length > 0
        ? <div>
          <div className='noteComplain'>
            Berikut adalah daftar pembelian yang terdapat barang bermasalah di dalamnya
          </div>
          <InfiniteScroll
            pageStart={0}
            loadMore={_.debounce(props.loadMore.bind(this), 500)}
            hasMore={props.hasMore}
            loader={<Loading size={12} color='#ef5656' className='is-fullwidth has-text-centered' />}>
            {
              sellerComplainedOrders.orders.map((order, i) => {
                return (
                  <section className='section is-paddingless has-shadow xs-margin-top'
                    onClick={() => Router.push(`/complain-seller-detail?id=${order.id}`)} key={i}>
                    <ul className='customer-order'>
                      <li>
                        <div className='columns custom is-mobile'>
                          <div className='column is-half'><strong>{order.user.name}</strong></div>
                          <div className='column is-half has-text-right'>
                            { order.dispute_products.length > 0
                              ? <span className='notif-akun right'>{order.dispute_products.length}</span>
                              : ''
                            }
                          </div>
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
                                  order.dispute_products.length === 1
                                  ? <div className='media is-right-content'>
                                    <div className='media-left'>
                                      <figure className='image list-transaction xs'>
                                        <a><img src={order.dispute_products[0].image} alt='Pict' /></a>
                                      </figure>
                                    </div>
                                    <div className='media-content'>
                                      <div className='content'>
                                        <h4 className='txt-overflow'>{order.dispute_products[0].name}</h4>
                                      </div>
                                    </div>
                                  </div>
                                  : <div className='media is-right-content'>
                                    {
                                      order.dispute_products.map((p, i) => {
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
        </div>
        : <EmptyComplain />
      }
    </div>
  )
}

const ListComplainOrderDone = (props) => {
  const { sellerComplainedOrders2 } = props
  if (sellerComplainedOrders2 === undefined) return null
  return (
    <div>
      {
        sellerComplainedOrders2.orders.length > 0
        ? <div>
          <div className='noteComplain'>
            Berikut adalah daftar pembelian yang terdapat barang bermasalah di dalamnya
          </div>
          <InfiniteScroll
            pageStart={0}
            loadMore={_.debounce(props.loadMore2.bind(this), 500)}
            hasMore={props.hasMore2}
            loader={<Loading size={12} color='#ef5656' className='is-fullwidth has-text-centered' />}>
            {
              sellerComplainedOrders2.orders.map((order, i) => {
                return (
                  <section className='section is-paddingless has-shadow xs-margin-top'
                    onClick={() => Router.push(`/complain-seller-detail?id=${order.id}`)} key={i}>
                    <ul className='customer-order'>
                      <li>
                        <div className='columns custom is-mobile'>
                          <div className='column is-half'><strong>{order.user.name}</strong></div>
                          <div className='column is-half has-text-right'>
                            { order.dispute_products.length > 0
                              ? <span className='notif-akun right'>{order.dispute_products.length}</span>
                              : ''
                            }
                          </div>
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
                                  order.dispute_products.length === 1
                                  ? <div className='media is-right-content'>
                                    <div className='media-left'>
                                      <figure className='image list-transaction xs'>
                                        <a><img src={order.dispute_products[0].image} alt='Pict' /></a>
                                      </figure>
                                    </div>
                                    <div className='media-content'>
                                      <div className='content'>
                                        <h4 className='txt-overflow'>{order.dispute_products[0].name}</h4>
                                      </div>
                                    </div>
                                  </div>
                                  : <div className='media is-right-content'>
                                    {
                                      order.dispute_products.map((p, i) => {
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
        </div>
        : <EmptyComplain />
      }
    </div>
  )
}

const EmptyComplain = () => {
  return (
    <div className='container is-fluid'>
      <div className='desc has-text-centered'>
        <img src={Images.emptyStatesResolusi} alt='komuto' />
        <br /><br />
        <p><strong className='bold'>Komplain Barang Kosong</strong></p>
        <p>Anda belum memiliki barang untuk diselesaikan masalahnya</p>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    sellerComplainedOrders: state.sellerComplainedOrders,
    sellerComplainedOrders2: state.sellerComplainedOrders2
  }
}

const mapDispatchToProps = dispatch => ({
  getComplainedOrdersSeller: (params) => dispatch(transactionAction.getComplainedOrdersSeller(params)),
  getComplainedOrdersSeller2: (params) => dispatch(transactionAction.getComplainedOrdersSeller2(params))
})

export default connect(mapStateToProps, mapDispatchToProps)(ComplainItems)
