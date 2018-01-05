// @flow
import React from 'react'
import { connect } from 'react-redux'
// components
import Router from 'next/router'
// actions
import * as storesAction from '../../actions/stores'

class Sales extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      unreadDisputesStore: null
    }
    this.submitting = {
      unreadDisputesStore: false
    }
  }

  componentDidMount () {
    this.submitting = { ...this.submitting, unreadDisputesStore: true }
    this.props.getUnreadDisputeStore()
  }

  componentWillReceiveProps (nextProps) {
    const { unreadDisputesStore } = nextProps
    const { isFetching, isError, isFound, notifError } = this.props
    if (!isFetching(unreadDisputesStore) && this.submitting.unreadDisputesStore) {
      this.submitting = { ...this.submitting, unreadDisputesStore: false }
      if (isError(unreadDisputesStore)) {
        this.setState({ notification: notifError(unreadDisputesStore.message) })
      }
      if (isFound(unreadDisputesStore)) {
        this.setState({ unreadDisputesStore })
      }
    }
  }

  countNotif (data) {
    return (data <= 0) ? null : <span className='notif-akun'>{ data }</span>
  }

  render () {
    let { unreadDisputesStore } = this.state
    let newOrder = 0
    let processingOrder = 0
    let sale = 0

    if (unreadDisputesStore && unreadDisputesStore.isFound) {
      let sales = unreadDisputesStore.disputes.sales
      newOrder = sales.new_order
      processingOrder = sales.processing_order
      sale = sales.sale
    }

    return (
      <section className='section is-paddingless has-shadow'>
        <div className='seller-akun'>
          <div className='profile-wrapp'>
            <ul>
              <li onClick={() => Router.push('/order-new')}>
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
                        <div className='val-right'>{ this.countNotif(newOrder) }</div>
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
                        <div className='val-right'>{ this.countNotif(processingOrder) }</div>
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
                        <div className='val-right'>{ this.countNotif(sale) }</div>
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

const mapStateToProps = (state) => ({
  unreadDisputesStore: state.unreadDisputesStore
})

const mapDispatchToProps = dispatch => ({
  getUnreadDisputeStore: () => dispatch(storesAction.getUnreadDisputeStore())
})

export default connect(mapStateToProps, mapDispatchToProps)(Sales)
