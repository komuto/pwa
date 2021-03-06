/**
 * Safei Muslim
 * Yogyakarta , 17 Oktober 2017
 * PT Skyshi Digital Indonesa
 */

/** including dependencies */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import NProgress from 'nprogress'
import Router from 'next/router'
/** including component */
import Content from '../../Components/Content'
import Notification from '../../Components/Notification'
import MyImage from '../../Components/MyImage'
import Images from '../../Themes/Images'
// import InfiniteScroll from 'react-infinite-scroller'
import { Navbar } from '../Navbar'
/** including actions */
import * as transactionActions from '../../actions/transaction'
/** including custom lib */
// import RupiahFormat from '../../Lib/RupiahFormat'

class Buyer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      tab: props.query.tab || TabsName[0],
      buyerComplainedOrders: {
        data: props.buyerComplainedOrders || null,
        hasMore: false,
        pagination: {
          page: 1,
          limit: 10
        }
      },
      buyerComplainedOrders2: {
        data: props.buyerComplainedOrders2 || null,
        hasMore: false,
        pagination: {
          page: 1,
          limit: 10
        }
      },
      notification: props.notification
    }

    this.submitting = {
      buyerComplainedOrders: false,
      buyerComplainedOrders2: false
    }
  }

  render () {
    let { buyerComplainedOrders, buyerComplainedOrders2, tab, notification } = this.state

    let { isFound } = this.props
    let countUnreadResolved = 0
    let countUnreadUnResolved = 0

    if (isFound(buyerComplainedOrders.data)) {
      buyerComplainedOrders.data.orders.forEach((order) => {
        countUnreadResolved += order.count_unread
      })
    }

    if (isFound(buyerComplainedOrders2.data)) {
      buyerComplainedOrders2.data.orders.forEach((order) => {
        countUnreadUnResolved += order.count_unread
      })
    }

    let params = {
      navbar: {
        searchBoox: false,
        path: '/',
        callBack: () => Router.push('/notification'),
        textPath: 'Komplain Barang'
      },
      navtab: {
        active: tab,
        onSelect: (params) => this.selectedTab(params),
        items: [
          {
            name: TabsName[0],
            notif: countUnreadResolved
          },
          {
            name: TabsName[1],
            notif: countUnreadUnResolved
          }
        ]
      }
    }
    return (
      <Content>
        <Navbar {...params} />
        <Notification
          type={notification.type}
          isShow={notification.status}
          activeClose
          onClose={() => this.setState({notification: {status: false, message: ''}})}
          message={notification.message} />
        {
          isFound(buyerComplainedOrders.data) &&
          isFound(buyerComplainedOrders2.data) &&
          <BuyerContent {...this.state} />
        }
      </Content>
    )
  }

  selectedTab (params) {
    Router.push(
      `/complaint?type=buyer&tab=${params}`,
      `/complaint/buyer?tab=${params}`
    )
  }

  componentDidMount () {
    NProgress.start()
    this.submitting = { ...this.submitting, buyerComplainedOrders: true, buyerComplainedOrders2: true }
    this.props.getComplainedOrdersBuyer({ is_resolved: false })
    this.props.getComplainedOrdersBuyer2({ is_resolved: true })
  }

  componentWillReceiveProps (nextProps) {
    const { buyerComplainedOrders, buyerComplainedOrders2 } = nextProps
    const { isFetching, isError, isFound, notifError } = this.props

    /** handling state status complaint resolved true */
    if (!isFetching(buyerComplainedOrders) && this.submitting.buyerComplainedOrders) {
      NProgress.done()
      this.submitting = { ...this.submitting, buyerComplainedOrders: false }
      if (isError(buyerComplainedOrders)) {
        this.setState({ notification: notifError(buyerComplainedOrders.message) })
      }
      if (isFound(buyerComplainedOrders)) {
        let hasMore = buyerComplainedOrders.orders.length > 8
        this.setState({
          buyerComplainedOrders: { ...this.state.buyerComplainedOrders, data: buyerComplainedOrders },
          hasMore
        })
      }
    }

    /** handling state status complaint resolved false */
    if (!isFetching(buyerComplainedOrders2) && this.submitting.buyerComplainedOrders2) {
      NProgress.done()
      this.submitting = { ...this.submitting, buyerComplainedOrders2: false }
      if (isError(buyerComplainedOrders2)) {
        this.setState({ notification: notifError(buyerComplainedOrders2.message) })
      }
      if (isFound(buyerComplainedOrders2)) {
        let hasMore = buyerComplainedOrders2.orders.length > 8
        this.setState({
          buyerComplainedOrders2: { ...this.state.buyerComplainedOrders2, data: buyerComplainedOrders2 },
          hasMore
        })
      }
    }

    /** switch tab */
    let oldTab = this.props.query.tab
    let nextTab = nextProps.query.tab
    if (oldTab !== nextTab) {
      this.setState({ tab: nextTab })
    }
  }
}

const BuyerContent = ({ buyerComplainedOrders, buyerComplainedOrders2, tab }) => (
  <Content>
    {
      tab === TabsName[0]
      ? <ResolvedContent {...buyerComplainedOrders} />
      : <UnResolvedContent {...buyerComplainedOrders2} />
    }
  </Content>
)

const UnResolvedContent = ({ data }) => {
  if (data.orders.length > 0) {
    return (
      <Content>
        {
        data.orders.map((order, index) => (
          <ItemStore key={index} order={order} />
        ))
      }
      </Content>
    )
  } else {
    return <EmptyComplaint />
  }
}

const ResolvedContent = ({ data }) => {
  if (data.orders.length > 0) {
    return (
      <Content>
        {
        data.orders.map((order, index) => (
          <ItemStore key={index} order={order} />
        ))
      }
      </Content>
    )
  } else {
    return <EmptyComplaint />
  }
}

export const ItemStore = ({ order }) => (
  <div>
    <div className='noteComplain'>
        Berikut adalah daftar pembelian yang terdapat barang bermasalah di dalamnya
    </div>
      <section onClick={() =>
        Router.push(
          `/complaint?type=buyer&id=${order.id}&tab=Detail`,
          `/complaint/buyer/${order.id}?tab=Detail`
        )} className='section is-paddingless has-shadow xs-margin-top'>
        <ul className='customer-order'>
          <li>
            <div className='columns custom is-mobile'>
              <div className='column is-half'><strong>{ order.store.name }</strong></div>
              {
                order.count_unread > 0 &&
                <div className='column is-half has-text-right'><span className='notif-akun right'>{order.count_unread}</span></div>
              }
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
                          <figure className='image list-transaction md'>
                            <a><MyImage src={order.dispute_products[0].image} alt='Pict' /></a>
                          </figure>
                        </div>
                        <div className='media-content middle'>
                          <div className='content'>
                            <h4 className='txt-overflow'>{order.dispute_products[0].name}</h4>
                          </div>
                        </div>
                        <div className='right-middle'>
                          <span className='icon-arrow-right' />
                        </div>
                      </div>
                      : <div className='media list-item is-right-content middle'>
                        {
                          order.dispute_products.map((p, i) => {
                            if (i < 3) {
                              return (
                                <div className='media-left md-margin' key={i}>
                                  <figure className='image list-transaction xs'>
                                    <a><MyImage src={p.image} alt='Pict' /></a>
                                  </figure>
                                </div>
                              )
                            } else {
                              return (
                                <div className='media-left md-margin'>
                                  <figure className='image list-transaction md plus3'>
                                    <span>+{i++}</span>
                                    <a><MyImage src={p.image} alt='Pict' /></a>
                                  </figure>
                                </div>
                              )
                            }
                          })
                        }
                        <div className='right-middle'>
                          <span className='icon-arrow-right' />
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
    </div>
)

const TabsName = ['Menunggu', 'Terselesaikan']

const EmptyComplaint = () => (
  <div className='content'>
    <div className='container is-fluid'>
      <div className='desc has-text-centered'>
        <MyImage src={Images.emptyComplaint} alt='komuto' />
        <br /><br />
        <p><strong className='bold'>Komplain Barang Anda Kosong</strong></p>
        <p>Anda belum pernah mengirimkan komplain terkait barang yang Anda beli</p>
      </div>
    </div>
  </div>
)

const mapStateToProps = (state) => ({
  buyerComplainedOrders: state.buyerComplainedOrders,
  buyerComplainedOrders2: state.buyerComplainedOrders2
})

const mapDispatchToProps = (dispatch) => ({
  getComplainedOrdersBuyer: (params) => dispatch(transactionActions.getComplainedOrdersBuyer(params)),
  getComplainedOrdersBuyer2: (params) => dispatch(transactionActions.getComplainedOrdersBuyer2(params))
})

export default connect(mapStateToProps, mapDispatchToProps)(Buyer)
