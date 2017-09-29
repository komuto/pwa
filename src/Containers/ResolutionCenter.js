// @flow
import React from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
// components
import Router from 'next/router'
import Images from '../Themes/Images'
import Notification from '../Components/Notification'
// actions
import * as transactionAction from '../actions/transaction'
// services
import { isFetching, validateResponse } from '../Services/Status'

const TAB_RESOLUTION_WAIT = 'TAB_RESOLUTION_WAIT'
const TAB_RESOLUTION_DONE = 'TAB_RESOLUTION_DONE'

class ResolutionCenter extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      buyerComplainedOrders: props.buyerComplainedOrders || null,
      buyerComplainedOrders2: props.buyerComplainedOrders2 || null,
      tabs: TAB_RESOLUTION_WAIT,
      notification: {
        type: 'is-success',
        status: false,
        message: 'Error, default message.'
      }
    }
  }

  switchTab (e) {
    const { tabs } = this.state
    this.setState({ tabs: (tabs === TAB_RESOLUTION_WAIT) ? TAB_RESOLUTION_DONE : TAB_RESOLUTION_WAIT })
  }

  resolutionDetail (id) {
    Router.push(`/resolution-detail?id=${id}`)
  }

  componentDidMount () {
    this.props.getComplainedOrdersBuyer({ is_closed: false })
    this.props.getComplainedOrdersBuyer2()
  }

  componentWillReceiveProps (nextProps) {
    // const { query } = this.props
    const { buyerComplainedOrders, buyerComplainedOrders2 } = nextProps
    if (!isFetching(buyerComplainedOrders)) {
      this.setState({ buyerComplainedOrders: nextProps.buyerComplainedOrders, notification: validateResponse(buyerComplainedOrders, buyerComplainedOrders.message) })
    }
    if (!isFetching(buyerComplainedOrders2)) {
      this.setState({ buyerComplainedOrders2: nextProps.buyerComplainedOrders2, notification: validateResponse(buyerComplainedOrders2, buyerComplainedOrders2.message) })
    }
    console.log('nextPropsMes', nextProps)
  }

  render () {
    console.log('state', this.state)
    const { notification, tabs, buyerComplainedOrders, buyerComplainedOrders2 } = this.state
    return (
      <div>
        <div className='nav-tabs'>
          <a onClick={(e) => this.switchTab(e)} className={tabs === TAB_RESOLUTION_WAIT && 'active'}>
            <span className='text'>Percakapan<span className='notif-complaint'>
              <span>{buyerComplainedOrders.isFound && buyerComplainedOrders.orders.length}</span></span></span>
          </a>
          <a onClick={(e) => this.switchTab(e)} className={tabs === TAB_RESOLUTION_DONE && 'active'}>
            <span className='text'>Arsip<span className='notif-complaint'>
              <span>{buyerComplainedOrders2.isFound && buyerComplainedOrders2.orders.length}</span></span></span>
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
            <ul className='notif-detail conversation bordered'>
              {
                tabs === TAB_RESOLUTION_WAIT
                ? <ListWaitResolution
                  buyerComplainedOrders={buyerComplainedOrders}
                  resolutionDetail={(id) => this.resolutionDetail(id)} />
                : <ListDoneResolution
                  buyerComplainedOrders2={buyerComplainedOrders2}
                  resolutionDetail={(id) => this.resolutionDetail(id)} />
              }
            </ul>
          </div>
        </section>
        <a className='sticky-button' onClick={() => Router.push(`/resolution-add`)}><span className='txt'>+</span></a>
      </div>
    )
  }
}

const ListWaitResolution = (props) => {
  const { buyerComplainedOrders } = props
  if (buyerComplainedOrders === undefined) return null
  moment.locale('id')
  return (
    <div>
      {
        buyerComplainedOrders.orders.length > 0
        ? buyerComplainedOrders.orders.map((order, i) => {
          return (
            <section className='section is-paddingless has-shadow' key={i}>
              <div className='discuss' onClick={() => this.resolutionDetail(order.id)}>
                <ul className='main-discuss notif-detail'>
                  <li>
                    <div className='box is-paddingless'>
                      <article className='media'>
                        <div className='media-content'>
                          <div className='content'>
                            <p className='user-name'>
                              {order.problems}
                            </p>
                          </div>
                          <label className='transaction'>Transaksi</label>
                          <span className='date-trans'>{moment.unix(order.response_at).format('DD MMMM YYYY')}</span>
                        </div>
                      </article>
                    </div>
                  </li>
                </ul>
              </div>
            </section>
          )
        })
        : <EmptyResolution />
      }
    </div>
  )
}

const ListDoneResolution = (props) => {
  const { buyerComplainedOrders2 } = props
  if (buyerComplainedOrders2 === undefined) return null
  moment.locale('id')
  return (
    <div>
      {
        buyerComplainedOrders2.orders.length > 0
        ? buyerComplainedOrders2.orders.map((order, i) => {
          return (
            <section className='section is-paddingless has-shadow' key={i}>
              <div className='discuss' onClick={() => this.resolutionDetail(order.id)}>
                <ul className='main-discuss notif-detail'>
                  <li>
                    <div className='box is-paddingless'>
                      <article className='media'>
                        <div className='media-content'>
                          <div className='content'>
                            <p className='user-name'>
                              {order.problems}
                            </p>
                          </div>
                          <label className='transaction'>Transaksi</label>
                          <span className='date-trans'>{moment.unix(order.response_at).format('DD MMMM YYYY')}</span>
                        </div>
                      </article>
                    </div>
                  </li>
                </ul>
                <div className='notif-admin'>
                  <span className='icon-notif-admin' />Dinyatakan selesai oleh Admin
                </div>
              </div>
            </section>
          )
        })
        : <EmptyResolution />
      }
    </div>
  )
}

const EmptyResolution = () => {
  return (
    <div className='container is-fluid'>
      <div className='desc has-text-centered'>
        <img src={Images.emptyStatesResolusi} alt='komuto' />
        <br /><br />
        <p><strong className='bold'>Pusat Resolusi Kosong</strong></p>
        <p>Anda belum memiliki hal untuk didiskusikan penyelesaian masalahnya</p>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    buyerComplainedOrders: state.buyerComplainedOrders,
    buyerComplainedOrders2: state.buyerComplainedOrders2
  }
}

const mapDispatchToProps = dispatch => ({
  getComplainedOrdersBuyer: (params) => dispatch(transactionAction.getComplainedOrdersBuyer(params)),
  getComplainedOrdersBuyer2: (params) => dispatch(transactionAction.getComplainedOrdersBuyer2(params))
})

export default connect(mapStateToProps, mapDispatchToProps)(ResolutionCenter)
