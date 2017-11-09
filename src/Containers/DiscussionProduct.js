// @flow
import React from 'react'
import { connect } from 'react-redux'
import Router from 'next/router'
import moment from 'moment'
import NProgress from 'nprogress'
import InfiniteScroll from 'react-infinite-scroller'
import _ from 'lodash'
// components
import Loading from '../Components/Loading'
import Images from '../Themes/Images'
import MyImage from '../Components/MyImage'
import Notification from '../Components/Notification'
// actions
import * as userAction from '../actions/user'

class DiscussionProduct extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      userDiscussion: props.userDiscussion || null,
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
    if (!this.fetching) {
      const newState = { pagination }
      pagination['page'] = pagination.page + 1
      this.setState(newState)
      this.fetching = { ...this.fetching, fetchingMore: true }
      await this.props.getDiscussion(this.state.pagination)
    }
  }

  detailDiscussion (id) {
    Router.push(`/discussion-product-detail?id=${id}`)
  }

  componentDidMount () {
    NProgress.start()
    this.fetching = { ...this.fetching, fetchingFirst: true }
    this.props.getDiscussion({ page: 1, limit: 10 })
  }

  componentWillReceiveProps (nextProps) {
    const { userDiscussion } = nextProps
    const { isFetching, isFound, isError, notifError } = this.props
    if (!isFetching(userDiscussion) && this.fetching.fetchingFirst) {
      NProgress.done()
      this.fetching = { ...this.fetching, fetchingFirst: false }
      if (isFound(userDiscussion)) {
        let isEmpty = userDiscussion.discussions.length < 1
        this.hasMore = userDiscussion.discussions.length > 9
        this.setState({ userDiscussion, isEmpty })
      }
      if (isError(userDiscussion)) {
        this.setState({ notification: notifError(userDiscussion.message) })
      }
    }

    if (!isFetching(userDiscussion) && this.fetching.fetchingMore) {
      this.fetching = { ...this.fetching, fetchingMore: false }
      let newUserDiscussion = this.state.userDiscussion
      if (isFound(userDiscussion)) {
        this.hasMore = userDiscussion.discussions.length > 9
        newUserDiscussion.discussions = newUserDiscussion.discussions.concat(userDiscussion.discussions)
        this.setState({ discussions: newUserDiscussion })
      }
      if (isError(userDiscussion)) {
        this.setState({ notification: notifError(userDiscussion.message) })
        this.hasMore = false
      }
    }
  }

  render () {
    const { notification, userDiscussion, isEmpty } = this.state
    if (!userDiscussion.isFound) return null
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
                    userDiscussion.discussions.map((discussion, i) => {
                      return (
                        <li key={i} onClick={(id) => this.detailDiscussion(discussion.id)}>
                          <div className='box is-paddingless'>
                            <article className='media'>
                              <div className='media-left top sm'>
                                <figure className='image user-pict'>
                                  <MyImage src={discussion.product.image} alt='pict' />
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
    <div className='container is-fluid'>
      <div className='desc has-text-centered'>
        <MyImage src={Images.emptyStatesDiscussion} alt='komuto' />
        <br /><br />
        <p><strong className='bold'>Diskusi Produk Anda Kosong</strong></p>
        <p>Anda belum pernah melakukan tanya jawab kepada penjual untuk produk apapun</p>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    userDiscussion: state.userDiscussion
  }
}

const mapDispatchToProps = dispatch => ({
  getDiscussion: (params) => dispatch(userAction.getDiscussion(params))
})

export default connect(mapStateToProps, mapDispatchToProps)(DiscussionProduct)
