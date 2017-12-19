// @flow
import React from 'react'
import { connect } from 'react-redux'
import NProgress from 'nprogress'
import InfiniteScroll from 'react-infinite-scroller'
import _ from 'lodash'
import moment from 'moment'
// components
import Router from 'next/router'
import Notification from '../../Components/Notification'
import Loading from '../../Components/Loading'
import MyImage from '../../Components/MyImage'
// lib
import RupiahFormat from '../../Lib/RupiahFormat'
// actions
import * as transactionAction from '../../actions/transaction'
/** including themes */
import Images from '../../Themes/Images'

const TAB_MY_ITEM = 'TAB_MY_ITEM'
const TAB_DROPSHIP_ITEM = 'TAB_DROPSHIP_ITEM'

class SalesList extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      sales: props.sales || null,
      sales2: props.sales2 || null,
      tabs: TAB_MY_ITEM,
      isEmpty: {
        sales: false,
        dropshipSales: false
      },
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
    this.hasMore = { sales: false, dropshipSales: false }
    this.fetching = { fetchingFirst: false, fetchingFirst2: false, sales: false, dropshipSales: false }
  }

  switchTab (e) {
    const { tabs } = this.state
    this.setState({ tabs: (tabs === TAB_MY_ITEM) ? TAB_DROPSHIP_ITEM : TAB_MY_ITEM })
  }

  async loadMore () {
    let { pagination } = this.state
    if (!this.fetching.sales) {
      const newState = { pagination }
      pagination['page'] = pagination.page + 1
      this.setState(newState)
      this.fetching = { ...this.fetching, sales: true }
      await this.props.getSales(pagination)
    }
  }

  async loadMoreDropshipSales () {
    let { pagination2 } = this.state
    if (!this.fetching.dropshipSales) {
      const newState = { pagination2 }
      pagination2['page'] = pagination2.page + 1
      this.setState(newState)
      this.fetching = { ...this.fetching, dropshipSales: true }
      await this.props.getSales(pagination2)
    }
  }

  /** Status Transaksi Invoice
  export const InvoiceTransactionStatus = {
    REJECTED: 0,
    WAITING: 1,
    PROCEED: 2,
    SENDING: 3,
    RECEIVED: 4,
    PROBLEM: 5,
    COMPLAINT_DONE: 6,
  } **/
  transactionType (type) {
    let className
    let status
    switch (type) {
      case 0:
        className = 'item-status has-trouble'
        status = 'Barang ditolak Seller'
        break
      case 1:
        className = 'item-status delivered'
        status = 'Menunggu konfirmasi Seller'
        break
      case 2:
        className = 'item-status delivered'
        status = 'Pesanan telah diterima dan sedang diproses'
        break
      case 3:
        className = 'item-status delivered'
        status = 'Menunggu Konfirmasi Pembeli'
        break
      case 4:
        className = 'item-status accepted'
        status = 'Barang sudah diterima'
        break
      case 5:
        className = 'item-status has-trouble'
        status = 'Terdapat barang bermasalah'
        break
      case 6:
        className = 'item-status accepted'
        status = 'Komplain telah Selesai'
    }
    return (
      <div className={`${className}`}>{`${status}`}</div>
    )
  }

  componentDidMount () {
    const { pagination, pagination2 } = this.state
    NProgress.start()
    this.fetching = { ...this.fetching, fetchingFirst: true, fetchingFirst2: true }
    this.props.getSales(pagination)
    this.props.getSales2({ page: pagination2.page, limit: pagination2.limit, is_dropship: true })
  }

  componentWillReceiveProps (nextProps) {
    const { sales, sales2 } = nextProps
    const { isFetching, isFound, isError, notifError } = this.props

    if (!isFetching(sales) && this.fetching.fetchingFirst) {
      NProgress.done()
      this.fetching = { ...this.fetching, fetchingFirst: false }
      if (isFound(sales)) {
        this.hasMore = { ...this.hasMore, sales: sales.sales.length > 9 }
        let isEmpty = sales.sales.length < 1
        this.setState({ sales, isEmpty: { ...this.state.isEmpty, sales: isEmpty } })
      }
      if (isError(sales)) {
        this.setState({ notification: notifError(sales.message) })
      }
    }

    if (!isFetching(sales) && this.fetching.sales) {
      this.fetching = { ...this.fetching, sales: false }
      if (isFound(sales)) {
        let stateSales = this.state.sales
        this.hasMore = { ...this.hasMore, sales: sales.sales.length > 9 }
        stateSales.sales = stateSales.sales.concat(sales.sales)
        this.setState({ sales: stateSales })
      }
      if (isError(sales)) {
        this.setState({ notification: notifError(sales.message) })
        this.hasMore = { ...this.hasMore, sales: false }
      }
    }

    if (!isFetching(sales2) && this.fetching.fetchingFirst2) {
      NProgress.done()
      this.fetching = { ...this.fetching, fetchingFirst2: false }
      if (isFound(sales2)) {
        this.hasMore = { ...this.hasMore, dropshipSales: sales2.sales.length > 9 }
        let isEmpty = sales2.sales.length < 1
        this.setState({ sales2, isEmpty: { ...this.state.isEmpty, dropshipSales: isEmpty } })
      }
      if (isError(sales2)) {
        this.setState({ notification: notifError(sales2.message) })
      }
    }

    if (!isFetching(sales2) && this.fetching.dropshipSales) {
      this.fetching = { ...this.fetching, dropshipSales: false }
      if (isFound(sales2)) {
        let stateSales = this.state.sales2
        this.hasMore = { ...this.hasMore, dropshipSales: sales2.sales.length > 9 }
        stateSales.sales = stateSales.sales.concat(sales2.sales)
        this.setState({ sales2: stateSales })
      }
      if (isError(sales2)) {
        this.setState({ notification: notifError(sales2.message) })
        this.hasMore = { ...this.hasMore, dropshipSales: false }
      }
    }
  }

  render () {
    const { notification, tabs, sales, sales2, isEmpty } = this.state
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
                  hasMore={this.hasMore.sales}
                  loadMore={() => this.loadMore()}
                  transactionType={(type) => this.transactionType(type)}
                  isEmpty={isEmpty.sales} />
                : <ItemsDropshipperSales
                  sales2={sales2}
                  hasMore2={this.hasMore.dropshipSales}
                  loadMoreDropshipSales={() => this.loadMoreDropshipSales()}
                  transactionType={(type) => this.transactionType(type)}
                  isEmpty={isEmpty.dropshipSales} />
              }
            </ul>
          </div>
        </section>
      </div>
    )
  }
}

const MyItemsSales = (props) => {
  const { sales, isEmpty } = props
  if (sales === undefined) return null
  moment.locale('id')
  return (
    <div>
      {
        isEmpty ? <OrdersEmpty /> : <InfiniteScroll
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
                                      <a><MyImage src={sale.products[0].image} alt='Pict' /></a>
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
  const { sales2, isEmpty } = props
  if (sales2 === undefined) return null
  moment.locale('id')
  return (
    <div>
      {
        isEmpty ? <SalesDropshipEmpty /> : <InfiniteScroll
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
                                      <a><MyImage src={sale.products[0].image} alt='Pict' /></a>
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

/** orders empty content */
const OrdersEmpty = () => {
  return (
    <section className='content'>
      <div className='container is-fluid'>
        <div className='desc has-text-centered'>
          <MyImage src={Images.emptySelling} alt='notFound' />
          <p><strong>Daftar Penjualan Anda Kosong</strong></p>
          <p>Anda belum memiliki histori transaksi penjualan</p>
        </div>
      </div>
    </section>
  )
}

/** sales dropship empty content */
const SalesDropshipEmpty = () => {
  return (
    <section className='content'>
      <div className='container is-fluid'>
        <div className='desc has-text-centered'>
          <MyImage src={Images.emptyDropshipping} alt='notFound' />
          <p><strong>Penjualan dropship kosong</strong></p>
          <p>Anda belum memiliki penjualan dropship saat ini</p>
        </div>
      </div>
    </section>
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
