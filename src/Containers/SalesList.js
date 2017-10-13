// @flow
import React from 'react'
import { connect } from 'react-redux'
import NProgress from 'nprogress'
import InfiniteScroll from 'react-infinite-scroller'
import _ from 'lodash'
import moment from 'moment'
// components
import Router from 'next/router'
import Notification from '../Components/Notification'
import Loading from '../Components/Loading'
// lib
import RupiahFormat from '../Lib/RupiahFormat'
// actions
import * as transactionAction from '../actions/transaction'
// services
import { isFetching, validateResponse, isFound, isError } from '../Services/Status'

const TAB_MY_ITEM = 'TAB_MY_ITEM'
const TAB_DROPSHIP_ITEM = 'TAB_DROPSHIP_ITEM'

class SalesList extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      sales: props.sales || null,
      tabs: TAB_MY_ITEM,
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
    this.hasMore = true
    this.fetching = false
    this.fetchingFirst = false
    this.hasMore2 = true
    this.fetching2 = false
    this.fetchingFirst2 = false
  }

  switchTab (e) {
    const { tabs } = this.state
    this.setState({ tabs: (tabs === TAB_MY_ITEM) ? TAB_DROPSHIP_ITEM : TAB_MY_ITEM })
  }

  async loadMore () {
    let { pagination } = this.state
    if (!this.fetching) {
      const newState = { pagination }
      pagination['page'] = pagination.page + 1
      this.setState(newState)
      this.fetching = true
      await this.props.getSales(pagination)
    }
  }

  async loadMoreDropshipSales () {
    let { pagination2 } = this.state
    if (!this.fetching2) {
      const newState = { pagination2 }
      pagination2['page'] = pagination2.page + 1
      this.setState(newState)
      this.fetching2 = true
      await this.props.getSales(pagination2)
    }
  }

  transactionType (type) {
    let className
    let status
    switch (type) {
      case 0: {
        className = 'item-status has-trouble'
        status = 'Barang ditolak Reseller'
      }
        break
      case 1: {
        className = 'item-status delivered'
        status = 'Menunggu konfirmasi Seller'
      }
        break
      case 2: {
        className = 'item-status delivered'
        status = 'Barang sudah dikirim'
      }
        break
      case 3: {
        className = 'item-status delivered'
        status = 'Menunggu Konfirmasi Pembeli'
      }
        break
      case 4: {
        className = 'item-status accepted'
        status = 'Barang sudah diterima'
      }
        break
      case 5: {
        className = 'item-status has-trouble'
        status = 'Terdapat barang bermasalah'
      }
        break
      case 6: {
        className = 'item-status accepted'
        status = 'Komplain telah Selesai'
      }
    }
    return (
      <div className={`${className}`}>{`${status}`}</div>
    )
  }

  componentDidMount () {
    const { pagination, pagination2 } = this.state
    NProgress.start()
    this.fetchingFirst = true
    this.fetchingFirst2 = true
    this.props.getSales(pagination)
    this.props.getSales2({ page: pagination2.page, limit: pagination2.limit, is_dropship: true })
  }

  componentWillReceiveProps (nextProps) {
    const { sales, sales2 } = nextProps
    if (!isFetching(sales) && this.fetchingFirst) {
      if (isFound(sales)) {
        NProgress.done()
        this.fetchingFirst = false
        this.setState({ sales })
      }
      if (isError(sales)) {
        this.fetchingFirst = false
        this.setState({ notification: validateResponse(sales, sales.message) })
      }
    }
    if (!isFetching(sales) && this.fetching) {
      let stateNewSales = this.state.sales
      if (isFound(sales)) {
        if (sales.sales.length > 0) {
          this.fetching = false
          stateNewSales.sales = stateNewSales.sales.concat(sales.sales)
          this.setState({ sales: stateNewSales })
        } else {
          this.hasMore = false
          this.fetching = false
        }
      }
      if (isError(sales)) {
        this.setState({ notification: validateResponse(sales, sales.message) })
        this.hasMore = false
        this.fetching = false
      }
    }
    if (!isFetching(sales2) && this.fetchingFirst2) {
      if (isFound(sales2)) {
        NProgress.done()
        this.fetchingFirst2 = false
        this.setState({ sales2 })
      }
      if (isError(sales2)) {
        this.fetchingFirst2 = false
        this.setState({ notification: validateResponse(sales2, sales2.message) })
      }
    }
    if (!isFetching(sales2) && this.fetching2) {
      let stateNewSales2 = this.state.sales2
      if (isFound(sales2)) {
        if (sales2.sales.length > 0) {
          this.fetching2 = false
          stateNewSales2.sales = stateNewSales2.sales.concat(sales2.sales)
          this.setState({ sales2: stateNewSales2 })
        } else {
          this.hasMore2 = false
          this.fetching2 = false
        }
      }
      if (isError(sales2)) {
        this.setState({ notification: validateResponse(sales2, sales2.message) })
        this.hasMore2 = false
        this.fetching2 = false
      }
    }
  }

  render () {
    const { notification, tabs, sales, sales2 } = this.state
    if (!sales.isFound) return null
    return (
      <div>
        <div className='nav-tabs'>
          <a onClick={(e) => this.switchTab(e)} className={tabs === TAB_MY_ITEM && 'active'}>Barang Saya</a>
          <a onClick={(e) => this.switchTab(e)} className={tabs === TAB_DROPSHIP_ITEM && 'active'}>Dropshipper</a>
        </div>
        <Notification
          type={notification.type}
          isShow={notification.status}
          activeClose
          onClose={() => this.setState({notification: {status: false, message: ''}})}
          message={notification.message} />
        <section className='section is-paddingless'>
          <div className='discuss'>
            <ul className='notif-detail conversation bordered'>
              {
                tabs === TAB_MY_ITEM
                ? <MyItemsSales
                  sales={sales}
                  hasMore={this.hasMore}
                  loadMore={() => this.loadMore()}
                  transactionType={(type) => this.transactionType(type)} />
                : <ItemsDropshipperSales
                  sales2={sales2}
                  hasMore2={this.hasMore2}
                  loadMoreDropshipSales={() => this.loadMoreDropshipSales()}
                  transactionType={(type) => this.transactionType(type)} />
              }
            </ul>
          </div>
        </section>
      </div>
    )
  }
}

const MyItemsSales = (props) => {
  const { sales } = props
  if (sales === undefined) return null
  moment.locale('id')
  return (
    <div>
      {
        <InfiniteScroll
          pageStart={0}
          loadMore={_.debounce(props.loadMore.bind(this), 500)}
          hasMore={props.hasMore}
          loader={<Loading size={12} color='#ef5656' className='is-fullwidth has-text-centered' />}>
          {
            sales.sales.map((sale, i) => {
              return (
                <section className='section is-paddingless has-shadow list-order' key={i} onClick={() => Router.push(`/sales-detail?id=${sale.invoice.id}`)}>
                  <ul className='customer-order'>
                    {
                      sale.invoice.type === 'seller' && <li className='label-order'><p className='dropship-item sold-label'>Terjual oleh Reseller</p></li>
                    }
                    <li>
                      <div className='columns custom is-mobile'>
                        <div className='column is-half'><strong>{sale.user.name}</strong></div>
                        <div className='column is-half has-text-right'><span>{moment.unix(sale.invoice.created_at).format('ddd, DD MMM YYYY')}</span></div>
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
                                sale.products.length === 1
                                ? <div className='media is-right-content'>
                                  <div className='media-left'>
                                    <figure className='image list-transaction xs'>
                                      <a><img src={sale.products[0].image} alt='Pict' /></a>
                                    </figure>
                                  </div>
                                  <div className='media-content'>
                                    <div className='content'>
                                      <h4 className='txt-overflow'>{sale.products[0].name}</h4>
                                    </div>
                                  </div>
                                  <div className='right-middle' style={{paddingRight: '16px'}}>
                                    <strong>Rp { RupiahFormat(sale.invoice.total_price) }</strong>
                                  </div>
                                </div>
                                : <div className='media is-right-content'>
                                  {
                                    sale.products.map((p, i) => {
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
                                  <div className='right-middle' style={{paddingRight: '16px'}}>
                                    <strong>Rp { RupiahFormat(sale.invoice.total_price) }</strong>
                                  </div>
                                </div>
                              }
                            </div>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div className='block-status has-text-right'>
                    { props.transactionType(sale.invoice.transaction_status) }
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

const ItemsDropshipperSales = (props) => {
  const { sales2 } = props
  if (sales2 === undefined) return null
  moment.locale('id')
  return (
    <div>
      {
        <InfiniteScroll
          pageStart={0}
          loadMore={_.debounce(props.loadMoreDropshipSales.bind(this), 500)}
          hasMore={props.hasMore2}
          loader={<Loading size={12} color='#ef5656' className='is-fullwidth has-text-centered' />}>
          {
            sales2.sales.map((sale, i) => {
              return (
                <section className='section is-paddingless has-shadow list-order' key={i} onClick={() => Router.push(`/sales-detail?id=${sale.invoice.id}`)}>
                  <div className='note bg-white'>
                    <p>Menampilkan penjualan dari barang yang Anda ambil dari Seller lain</p>
                  </div>
                  <ul className='customer-order'>
                    <li>
                      <div className='columns custom is-mobile'>
                        <div className='column is-half'><strong>{sale.user.name}</strong></div>
                        <div className='column is-half has-text-right'><span>{moment.unix(sale.invoice.created_at).format('ddd, DD MMM YYYY')}</span></div>
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
                                sale.products.length === 1
                                ? <div className='media is-right-content'>
                                  <div className='media-left'>
                                    <figure className='image list-transaction xs'>
                                      <a><img src={sale.products[0].image} alt='Pict' /></a>
                                    </figure>
                                  </div>
                                  <div className='media-content'>
                                    <div className='content'>
                                      <h4 className='txt-overflow'>{sale.products[0].name}</h4>
                                    </div>
                                  </div>
                                  <div className='right-middle' style={{paddingRight: '16px'}}>
                                    <strong>Rp { RupiahFormat(sale.invoice.total_price) }</strong>
                                  </div>
                                </div>
                                : <div className='media is-right-content'>
                                  {
                                    sale.products.map((p, i) => {
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
                                  <div className='right-middle' style={{paddingRight: '16px'}}>
                                    <strong>Rp { RupiahFormat(sale.invoice.total_price) }</strong>
                                  </div>
                                </div>
                              }
                            </div>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div className='block-status has-text-right'>
                    { props.transactionType(sale.invoice.transaction_status) }
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

const mapStateToProps = (state) => {
  return {
    sales: state.sales,
    sales2: state.sales2
  }
}

const mapDispatchToProps = dispatch => ({
  getSales: (params) => dispatch(transactionAction.getSales(params)),
  getSales2: (params) => dispatch(transactionAction.getSales2(params))
})

export default connect(mapStateToProps, mapDispatchToProps)(SalesList)
