// @flow
import React from 'react'
import { connect } from 'react-redux'
// components
import Router from 'next/router'
// actions
import * as transactionAction from '../actions/transaction'
import { isFetching, isFound, isError } from '../Services/Status'

class Sales extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      newOrders: props.newOrders || null,
      processingOrders: props.processingOrders || null,
      sales: props.sales || null,
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
    this.fetchingFirst3 = false
    this.fetching3 = false
  }

  componentDidMount () {
    const { newOrders, processingOrders, sales, pagination, pagination2, pagination3 } = this.state
    const newState = { newOrders, processingOrders, sales, pagination, pagination2, pagination3 }
    newState.pagination['page'] = 1
    newState.pagination2['page'] = 1
    newState.pagination3['page'] = 1
    newState.newOrders['orders'] = []
    newState.processingOrders['orders'] = []
    newState.sales['sales'] = []
    this.setState(newState, () => {
      if (this.state.pagination.page === 1) {
        this.fetchingFirst = true
        this.fetchingFirst2 = true
        this.fetchingFirst3 = true
        this.props.getNewOrders(this.state.pagination)
        this.props.getProcessingOrders(this.state.pagination2)
        this.props.getSales(this.state.pagination3)
      }
    })
  }

  async loadMoreNewOrders () {
    let { pagination } = this.state
    if (!this.fetching) {
      const newState = { pagination }
      newState.pagination['page'] = pagination.page + 1
      this.setState(newState)
      this.fetching = true
      await this.props.getNewOrders(pagination)
    }
  }

  async loadMoreProcessingOrders () {
    let { pagination2 } = this.state
    if (!this.fetching2) {
      const newState = { pagination2 }
      newState.pagination2['page'] = pagination2.page + 1
      this.setState(newState)
      this.fetching2 = true
      await this.props.getProcessingOrders(pagination2)
    }
  }

  async loadMoreSales () {
    let { pagination3 } = this.state
    if (!this.fetching3) {
      const newState = { pagination3 }
      pagination3['page'] = pagination3.page + 1
      this.setState(newState)
      this.fetching3 = true
      await this.props.getSales(pagination3)
    }
  }

  componentWillReceiveProps (nextProps) {
    const { newOrders, processingOrders, sales } = nextProps
    if (!isFetching(newOrders) && this.fetchingFirst) {
      if (isFound(newOrders)) {
        this.fetchingFirst = false
        this.setState({ newOrders }, () => {
          if (isFound(this.state.newOrders)) {
            this.loadMoreNewOrders()
          }
        })
      }
    }
    if (!isFetching(newOrders) && this.fetching) {
      if (isFound(newOrders)) {
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
      if (isError(newOrders)) {
        this.fetching = false
      }
    }
    if (!isFetching(processingOrders) && this.fetchingFirst2) {
      if (isFound(processingOrders)) {
        this.fetchingFirst2 = false
        this.setState({ processingOrders }, () => {
          if (isFound(this.state.processingOrders)) {
            this.loadMoreProcessingOrders()
          }
        })
      }
    }
    if (!isFetching(processingOrders) && this.fetching2) {
      let stateNewProcessingOrders = this.state.processingOrders
      if (isFound(processingOrders)) {
        if (processingOrders.orders.length > 0) {
          this.fetching2 = false
          stateNewProcessingOrders.orders = stateNewProcessingOrders.orders.concat(processingOrders.orders)
          this.setState({ processingOrders: stateNewProcessingOrders })
          this.loadMoreProcessingOrders()
        } else {
          this.fetching2 = false
        }
      }
      if (isError(processingOrders)) {
        this.fetching2 = false
      }
    }
    if (!isFetching(sales) && this.fetchingFirst3) {
      if (isFound(sales)) {
        this.fetchingFirst3 = false
        this.setState({ sales }, () => {
          if (isFound(this.state.sales)) {
            this.loadMoreSales()
          }
        })
      }
    }
    if (!isFetching(sales) && this.fetching3) {
      if (isFound(sales)) {
        let stateNewSales = this.state.sales
        if (sales.sales.length > 0) {
          this.fetching3 = false
          stateNewSales.sales = stateNewSales.sales.concat(sales.sales)
          this.setState({ sales: stateNewSales })
          this.loadMoreSales()
        } else {
          this.fetching3 = false
        }
      }
      if (isError(sales)) {
        this.fetching3 = false
      }
    }
  }

  countNotif1 (data) {
    let count
    if (data.isFound) {
      if (data.orders.length > 0) {
        count = data.orders.length
      } else {
        return null
      }
    } else {
      return null
    }
    return (
      <span className='notif-akun'>{ count }</span>
    )
  }

  countNotif2 (data) {
    let count
    if (data.isFound) {
      if (data.sales.length > 0) {
        count = data.sales.length
      } else {
        return null
      }
    } else {
      return null
    }
    return (
      <span className='notif-akun'>{ count }</span>
    )
  }

  render () {
    const { newOrders, processingOrders, sales } = this.state
    return (
      <section className='section is-paddingless has-shadow'>
        <div className='seller-akun'>
          <div className='profile-wrapp'>
            <ul>
              <li onClick={() => Router.push('/orders-new')}>
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
                        <div className='val-right'>{ this.countNotif1(newOrders) }</div>
                      </div>
                    </div>
                  </article>
                </div>
                <span className='icon-arrow-right' />
              </li>
              <li onClick={() => Router.push('/delivery-confirmation')}>
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
                        <div className='val-right'>{ this.countNotif1(processingOrders) }</div>
                      </div>
                    </div>
                  </article>
                </div>
                <span className='icon-arrow-right' />
              </li>
              <li onClick={() => Router.push('/sales-list')}>
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
                        <div className='val-right'>{ this.countNotif2(sales) }</div>
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
    processingOrders: state.processingOrders,
    sales: state.sales
  }
}

const mapDispatchToProps = dispatch => ({
  getNewOrders: (params) => dispatch(transactionAction.getNewOrders(params)),
  getProcessingOrders: (params) => dispatch(transactionAction.getProcessingOrders(params)),
  getSales: (params) => dispatch(transactionAction.getSales(params))
})

export default connect(mapStateToProps, mapDispatchToProps)(Sales)
