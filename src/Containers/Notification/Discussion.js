// @flow
import React from 'react'
import { connect } from 'react-redux'
import Router from 'next/router'
import moment from 'moment'
import NProgress from 'nprogress'
import InfiniteScroll from 'react-infinite-scroller'
import _ from 'lodash'
// components
import Loading from '../../Components/Loading'
import Images from '../../Themes/Images'
import MyImage from '../../Components/MyImage'
import Notification from '../../Components/Notification'
/** including actions */
import * as storesActions from '../../actions/stores'

class DiscussionProduct extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      storeDiscussions: props.storeDiscussions || null,
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
    this.fetching = { fetchingMore: false, fetchingFirst: false }
  }

  async loadMore () {
    let { pagination } = this.state
    if (!this.fetching.fetchingMore) {
      const newState = { pagination }
      pagination['page'] = pagination.page + 1
      this.setState(newState)
      this.fetching = { ...this.fetching, fetchingMore: true }
      await this.props.getStoreDiscussions(this.state.pagination)
    }
  }

  componentDidMount () {
    NProgress.start()
    this.fetching = { ...this.fetching, fetchingFirst: true }
    this.props.getStoreDiscussions({ page: 1, limit: 10 })
  }

  componentWillReceiveProps (nextProps) {
    const { storeDiscussions } = nextProps
    const { isFetching, isFound, isError, notifError } = this.props
    if (!isFetching(storeDiscussions) && this.fetching.fetchingFirst) {
      NProgress.done()
      this.fetching = { ...this.fetching, fetchingFirst: false }
      if (isFound(storeDiscussions)) {
        let isEmpty = storeDiscussions.storeDiscussions.length < 1
        this.hasMore = storeDiscussions.storeDiscussions.length > 9
        this.setState({ storeDiscussions, isEmpty })
      }
      if (isError(storeDiscussions)) {
        this.setState({ notification: notifError(storeDiscussions.message) })
      }
    }

    if (!isFetching(storeDiscussions) && this.fetching.fetchingMore) {
      this.fetching = { ...this.fetching, fetchingMore: false }
      let tmp = this.state.storeDiscussions
      if (isFound(storeDiscussions)) {
        this.hasMore = storeDiscussions.storeDiscussions.length > 9
        tmp.storeDiscussions = tmp.storeDiscussions.concat(storeDiscussions.storeDiscussions)
        this.setState({ storeDiscussions: tmp })
      }
      if (isError(storeDiscussions)) {
        this.setState({ notification: notifError(storeDiscussions.message) })
        this.hasMore = false
      }
    }
  }

  render () {
    const { notification, storeDiscussions, isEmpty } = this.state
    moment.locale('id')
    return (
      <div>
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
                isEmpty ? <EmptyDiscussion />
                : <InfiniteScroll
                  pageStart={0}
                  loadMore={_.debounce(this.loadMore.bind(this), 500)}
                  hasMore={this.hasMore}
                  loader={<Loading size={12} color='#ef5656' className='is-fullwidth has-text-centered' />}>
                  {
                    storeDiscussions.storeDiscussions.map((discussion, i) => {
                      return (
                        <li key={i} onClick={() => Router.push(`/notification-discussion-detail?id=${discussion.id}`)}>
                          <div className='box is-paddingless'>
                            <article className='media'>
                              <div className='media-left top sm'>
                                <figure className='image user-pict'>
                                  <MyImage src={discussion.product.image} alt={discussion.product.name} />
                                </figure>
                              </div>
                              <div className='media-content'>
                                <div className='content'>
                                  <p className='user-name'>
                                    <strong>{discussion.product.name}</strong>
                                    {discussion.question}
                                  </p>
                                </div>
                                <span className='time-discuss'>{moment.unix(discussion.created_at).format('h:mm')}</span>
                              </div>
                            </article>
                          </div>
                        </li>
                      )
                    })
                  }
                </InfiniteScroll>
                }

            </ul>
          </div>
        </section>
      </div>
    )
  }
}

const EmptyDiscussion = () => {
  return (
    <section className='content'>
      <div className='container is-fluid'>
        <div className='desc has-text-centered'>
          <MyImage src={Images.emptyStatesDiscussion} alt='komuto' />
          <br /><br />
          <p><strong className='bold'>Diskusi Produk Anda Kosong</strong></p>
          <p>Anda belum pernah melakukan tanya jawab kepada penjual untuk produk apapun</p>
        </div>
      </div>
    </section>
  )
}

const mapStateToProps = (state) => ({
  storeDiscussions: state.storeDiscussions
})

const mapDispatchToProps = (dispatch) => ({
  getStoreDiscussions: (params) => dispatch(storesActions.getStoreDiscussions(params))
})
export default connect(mapStateToProps, mapDispatchToProps)(DiscussionProduct)
