// @flow
import React from 'react'
import { connect } from 'react-redux'
// components
import Router from 'next/router'
// actions
import * as transactionAction from '../actions/transaction'
import { isFetching } from '../Services/Status'

class Sales extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      newOrders: props.newOrders || null,
      processingOrders: props.processingOrders || null,
      pagination: {
        page: 1,
        limit: 10
      },
      pagination2: {
        page: 1,
        limit: 10
      },
      pagination3: {
        page: 1,
        limit: 10
      }
    }
    this.fetchingFirst = false
    this.fetching = false
    this.fetchingFirst2 = false
    this.fetching2 = false
  }

  componentDidMount () {
    const { newOrders, processingOrders, pagination, pagination2 } = this.state
    const newState = { newOrders, processingOrders, pagination, pagination2 }
    newState.pagination['page'] = 1
    newState.pagination2['page'] = 1
    newState.newOrders['orders'] = []
    newState.processingOrders['orders'] = []
    this.setState(newState, () => {
      if (this.state.pagination.page === 1 && this.state.pagination2.page === 1) {
        this.fetchingFirst = true
        this.fetchingFirst2 = true
        this.props.getNewOrders(this.state.pagination)
        this.props.getProcessingOrders(this.state.pagination2)
      }
    })
  }

  loadMoreNewOrders () {
    let { pagination } = this.state
    if (!this.fetching) {
      const newState = { pagination }
      newState.pagination['page'] = pagination.page + 1
      this.setState(newState)
      this.fetching = true
      this.props.getNewOrders(pagination)
    }
  }

  loadMoreProcessingOrders () {
    let { pagination2 } = this.state
    if (!this.fetching2) {
      const newState = { pagination2 }
      newState.pagination2['page'] = pagination2.page + 1
      this.setState(newState)
      this.fetching2 = true
      this.props.getProcessingOrders(pagination2)
    }
  }

  componentWillReceiveProps (nextProps) {
    const { newOrders, processingOrders } = nextProps
    if (!isFetching(newOrders) && this.fetchingFirst) {
      this.fetchingFirst = false
      this.setState({ newOrders })
      this.loadMoreNewOrders()
    }
    if (!isFetching(newOrders) && this.fetching) {
      let stateNewOrders = this.state.newOrders
      if (newOrders.orders.length > 0) {
        this.fetching = false
        stateNewOrders.orders = stateNewOrders.orders.concat(newOrders.orders)
        this.setState({ newOrders: stateNewOrders })
        this.loadMoreNewOrders()
      } else {
        this.fetching = false
      }
    }
    if (!isFetching(processingOrders) && this.fetchingFirst2) {
      this.fetchingFirst2 = false
      this.setState({ processingOrders })
      this.loadMoreProcessingOrders()
    }
    if (!isFetching(processingOrders) && this.fetching2) {
      let stateNewProcessingOrders = this.state.processingOrders
      if (processingOrders.orders.length > 0) {
        this.fetching2 = false
        stateNewProcessingOrders.orders = stateNewProcessingOrders.orders.concat(processingOrders.orders)
        this.setState({ processingOrders: stateNewProcessingOrders })
        this.loadMoreProcessingOrders()
      } else {
        this.fetching2 = false
      }
    }
  }

  render () {
    const { newOrders, processingOrders } = this.state
    return (
      <section className='section is-paddingless has-shadow'>
        <div className='seller-akun'>
          <div className='profile-wrapp'>
            <ul>
              <li onClick={() => Router.push(`/orders-new`)}>
                <div className='box is-paddingless'>
                  <article className='media'>
                    <div className='media-left'>
                      <figure className='image'>
                        <span className='icon-pesanan-baru' />
                      </figure>
                    </div>
                    <div className='media-content'>
                      <div className='content'>
                        <p>
                          <strong>Pesanan Baru</strong>
                        </p>
                        <div className='val-right'><span className='notif-akun'>{ newOrders.length !== 0 && newOrders.orders.length}</span></div>
                      </div>
                    </div>
                  </article>
                </div>
                <span className='icon-arrow-right' />
              </li>
              <li onClick={() => Router.push(`/delivery-confirmation`)}>
                <div className='box is-paddingless'>
                  <article className='media'>
                    <div className='media-left'>
                      <figure className='image'>
                        <span className='icon-konfirmasi-pengiriman' />
                      </figure>
                    </div>
                    <div className='media-content'>
                      <div className='content'>
                        <p>
                          <strong>Konfirmasi Pengiriman</strong>
                        </p>
                        <div className='val-right'><span className='notif-akun'>{ processingOrders.length !== 0 && processingOrders.orders.length}</span></div>
                      </div>
                    </div>
                  </article>
                </div>
                <span className='icon-arrow-right' />
              </li>
              <li>
                <div className='box is-paddingless'>
                  <article className='media'>
                    <div className='media-left'>
                      <figure className='image'>
                        <span className='icon-daftar-penjualan' />
                      </figure>
                    </div>
                    <div className='media-content'>
                      <div className='content'>
                        <p>
                          <strong>Daftar Penjualan</strong><br />
                        </p>
                        <div className='val-right'><span className='notif-akun'>5</span></div>
                      </div>
                    </div>
                  </article>
                </div>
                <span className='icon-arrow-right' />
              </li>
            </ul>
          </div>
        </div>
      </section>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    newOrders: state.newOrders,
    processingOrders: state.processingOrders
  }
}

const mapDispatchToProps = dispatch => ({
  getNewOrders: (params) => dispatch(transactionAction.getNewOrders(params)),
  getProcessingOrders: (params) => dispatch(transactionAction.getProcessingOrders(params))
})

export default connect(mapStateToProps, mapDispatchToProps)(Sales)
