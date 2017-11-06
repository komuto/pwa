/**
 * Safei Muslim
 * Yogyakarta , 12 Oktober 2017
 * PT Skyshi Digital Indonesa
 */

/** including dependencies */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import Router from 'next/router'
import moment from 'moment'
import NProgress from 'nprogress'
import _ from 'lodash'
import InfiniteScroll from 'react-infinite-scroller'

/** including component */
import Content from '../../Components/Content'
import Notification from '../../Components/Notification'
import MyImage from '../../Components/MyImage'
import Loading from '../../Components/Loading'
import Images from '../../Themes/Images'
/** including actions */
import * as storesActions from '../../actions/stores'

class Discussion extends Component {
  constructor (props) {
    super(props)
    this.state = {
      storeDiscussions: {
        data: props.storeDiscussions || null,
        hasMore: false,
        isEmpty: false,
        loadMore: () => this.discussionLoadMore(),
        params: {
          page: 1,
          limit: 10
        }
      },
      notification: props.notification
    }
    this.submitting = {
      storeDiscussions: false
    }
    moment.locale('id')
  }

  render () {
    let { storeDiscussions, notification } = this.state
    let { isFound } = this.props
    return (
      <Content>
        <Notification
          type={notification.type}
          isShow={notification.status}
          activeClose
          onClose={() => this.setState({notification: {status: false, message: ''}})}
          message={notification.message} />
        { isFound(storeDiscussions.data) &&
            storeDiscussions.isEmpty
            ? <EmptyContent />
            : <DiscussionContent {...this.state} />
        }
      </Content>
    )
  }

  componentDidMount () {
    NProgress.start()
    let { params } = this.state.storeDiscussions
    this.submitting = { ...this.submitting, storeDiscussions: true }
    this.props.getStoreDiscussions(params)
  }

  componentWillReceiveProps (nextProps) {
    const { storeDiscussions } = nextProps
    const { isFetching, isError, isFound, notifError } = this.props

    /** handling state archive seller message */
    if (!isFetching(storeDiscussions) && this.submitting.storeDiscussions) {
      NProgress.done()
      this.submitting = { ...this.submitting, storeDiscussions: false }
      if (isError(storeDiscussions)) {
        this.setState({ notification: notifError(storeDiscussions.message) })
      }
      if (isFound(storeDiscussions)) {
        let isEmpty = storeDiscussions.storeDiscussions.length < 1
        let hasMore = storeDiscussions.storeDiscussions.length > 9
        let tam = storeDiscussions.storeDiscussions.concat(this.state.storeDiscussions.data.storeDiscussions)
        storeDiscussions.storeDiscussions = tam
        this.setState({ storeDiscussions: { ...this.state.storeDiscussions, data: storeDiscussions, hasMore, isEmpty } })
      }
    }
  }

  discussionLoadMore () {
    let { storeDiscussions } = this.state
    if (!this.submitting.storeDiscussions) {
      this.submitting = { ...this.submitting, storeDiscussions: true }
      storeDiscussions.params.page += 1
      this.props.getStoreDiscussions(storeDiscussions.params)
      this.setState({ storeDiscussions })
    }
  }
}

const DiscussionContent = ({ storeDiscussions }) => (
  <WrapperList>
    <InfiniteScroll
      pageStart={0}
      loadMore={_.debounce(storeDiscussions.loadMore, 500)}
      hasMore={storeDiscussions.hasMore}
      loader={<Loading size={12} color='#ef5656' className='is-fullwidth has-text-centered' />}>
      {
        storeDiscussions.data.storeDiscussions.map((message, index) =>
          <List key={index} message={message} />
        )
      }
    </InfiniteScroll>
  </WrapperList>
)

const EmptyContent = () => (
  <section className='content'>
    <div className='container is-fluid'>
      <div className='desc has-text-centered'>
        <MyImage src={Images.emptyStates} alt='Diskusi kosong' />
        <br />
        <br />
        <p><strong className='bold'>Diskusi Produk Anda Kosong</strong></p>
        <p>Anda belum pernah melakukan tanya jawab kepada penjual untuk produk apapun</p>
      </div>
    </div>
  </section>
)

const WrapperList = ({ children }) => (
  <section className='section is-paddingless bg-white'>
    <div className='discuss'>
      <ul className='notif-detail'>
        { children }
      </ul>
    </div>
  </section>
)

const List = ({ message }) => (
  <li onClick={() => Router.push(`/notification-discussion-detail?id=${message.id}`)}>
    <div className='box is-paddingless'>
      <article className='media'>
        <div className='media-left top is-bordered'>
          {/* <figure className='image' style={{ width: 40 }}> */}
          <figure className='image'>
            <MyImage src={message.product.image} alt={message.product.name} />
          </figure>
        </div>
        <div className='media-content'>
          <div className='content'>
            <p className='user-name'>
              <strong>{ message.product.name }</strong>
              { message.question }
            </p>
          </div>
          <span className='time-discuss'>{ moment.unix(message.created_at).format('Do MMMM YY, hh:mm') }</span>
        </div>
      </article>
    </div>
  </li>
)

const mapStateToProps = (state) => ({
  storeDiscussions: state.storeDiscussions
})

const mapDispatchToProps = (dispatch) => ({
  getStoreDiscussions: (params) => dispatch(storesActions.getStoreDiscussions(params))
})

export default connect(mapStateToProps, mapDispatchToProps)(Discussion)
