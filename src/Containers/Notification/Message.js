// @flow
import React from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import InfiniteScroll from 'react-infinite-scroller'
import _ from 'lodash'
import Router from 'next/router'
import NProgress from 'nprogress'
// components
import Loading from '../../Components/Loading'
import Images from '../../Themes/Images'
import MyImage from '../../Components/MyImage'
import Notification from '../../Components/Notification'
// actions
import * as messageAction from '../../actions/message'

const TABS = ['CHAT', 'ARCHIVES']

class Messages extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      sellerMessages: props.sellerMessages || null,
      archiveSellerMessages: props.archiveSellerMessages || null,
      isEmpty: { sellerMessages: false, archiveSellerMessages: false },
      pagination: {
        page: 1,
        limit: 10
      },
      pagination2: {
        page: 1,
        limit: 10
      },
      tab: {
        active: props.query.tab || TABS[0],
        press: (p) => this.onSelectTab(p)
      },
      notification: {
        type: 'is-success',
        status: false,
        message: 'Error, default message.'
      }
    }
    this.hasMore = { sellerMessages: false, archiveSellerMessages: false }
    this.fetchingMore = { sellerMessages: false, archiveSellerMessages: false }
    this.fetchingFirst = { sellerMessages: false, archiveSellerMessages: false }

    moment.locale('id')
  }

  onSelectTab (active) {
    Router.push(`/notification-message?tab=${active}`)
    this.setState({
      tab: {
        ...this.state.tab,
        active
      }
    })
  }

  async loadMoreBuyerMessages () {
    let { pagination } = this.state
    if (!this.fetchingMore.sellerMessages) {
      const newState = { pagination }
      newState.pagination['page'] = pagination.page + 1
      this.setState(newState)
      this.fetchingMore = { ...this.fetchingMore, sellerMessages: true }
      await this.props.getSellerMessages({ ...this.state.pagination, is_archived: false })
    }
  }

  async loadMoreArchiveBuyerMessages () {
    let { pagination2 } = this.state
    if (!this.fetchingMore.archiveSellerMessages) {
      const newState = { pagination2 }
      newState.pagination2['page'] = pagination2.page + 1
      this.setState(newState)
      this.fetchingMore = { ...this.fetchingMore, archiveSellerMessages: true }
      await this.props.getArchiveSellerMessages(this.state.pagination2)
    }
  }

  closeNotification () {
    if (this.timeout) clearTimeout(this.timeout)
    this.timeout = setTimeout(() => {
      this.setState({ notification: { ...this.state.notification, status: false } })
    }, 3000)
  }

  componentDidMount () {
    NProgress.start()
    this.fetchingFirst = { sellerMessages: true, archiveSellerMessages: true }
    this.props.getSellerMessages({ page: 1, limit: 10 })
    this.props.getArchiveSellerMessages({ page: 1, limit: 10 })

    let { notifSuccess } = this.props
    let toArchive = this.props.query.toArchive || null
    let toConversation = this.props.query.toConversation || null
    let toDelete = this.props.query.toDelete || null

    if (toArchive) {
      this.setState({ notification: notifSuccess('Berhasil memindahkan ke arsip') })
      this.closeNotification()
    }

    if (toConversation) {
      this.setState({ notification: notifSuccess('Berhasil memindahkan ke percakapan') })
      this.closeNotification()
    }

    if (toDelete) {
      this.setState({ notification: notifSuccess('Berhasil menghapus percakapan') })
      this.closeNotification()
    }
  }

  componentWillReceiveProps (nextProps) {
    const { isFetching, isFound, isError, notifError } = this.props
    const { sellerMessages, archiveSellerMessages } = nextProps

    if (!isFetching(sellerMessages) && this.fetchingFirst.sellerMessages) {
      NProgress.done()
      this.fetchingFirst = { ...this.fetchingFirst, sellerMessages: false }
      if (isFound(sellerMessages)) {
        let isEmpty = { ...this.state.isEmpty, sellerMessages: sellerMessages.sellerMessages.length < 1 }
        this.hasMore = { ...this.hasMore, sellerMessages: sellerMessages.sellerMessages.length > 9 }
        this.setState({ sellerMessages, isEmpty })
      }
      if (isError(sellerMessages)) {
        this.setState({ notification: notifError(sellerMessages.message) })
      }
    }

    if (!isFetching(sellerMessages) && this.fetchingMore.sellerMessages) {
      this.fetchingMore = { ...this.fetchingMore, sellerMessages: false }
      if (isFound(sellerMessages)) {
        let newBuyerMessages = this.state.sellerMessages
        this.hasMore = { ...this.hasMore, sellerMessages: sellerMessages.sellerMessages.length > 9 }
        newBuyerMessages.sellerMessages = newBuyerMessages.sellerMessages.concat(sellerMessages.sellerMessages)
        this.setState({ sellerMessages: newBuyerMessages })
      }
      if (isError(sellerMessages)) {
        this.setState({ notification: notifError(sellerMessages.message) })
        this.hasMore = { ...this.hasMore, sellerMessages: false }
      }
    }

    if (!isFetching(archiveSellerMessages) && this.fetchingFirst.archiveSellerMessages) {
      NProgress.done()
      this.fetchingFirst = { ...this.fetchingFirst, archiveSellerMessages: false }
      if (isFound(archiveSellerMessages)) {
        this.setState({ archiveSellerMessages })
        let isEmpty = { ...this.state.isEmpty, archiveSellerMessages: archiveSellerMessages.archiveMessages.length < 1 }
        this.hasMore = { ...this.hasMore, archiveSellerMessages: archiveSellerMessages.archiveMessages.length > 9 }
        this.setState({ archiveSellerMessages, isEmpty })
      }
      if (isError(archiveSellerMessages)) {
        this.setState({ notification: notifError(archiveSellerMessages.message) })
      }
    }

    if (!isFetching(archiveSellerMessages) && this.fetchingMore.archiveSellerMessages) {
      this.fetchingMore = { ...this.fetchingMore, archiveSellerMessages: false }
      if (isFound(archiveSellerMessages)) {
        let newArchiveBuyerMessages = this.state.archiveSellerMessages
        this.hasMore = { ...this.hasMore, archiveSellerMessages: archiveSellerMessages.archiveMessages.length > 9 }
        newArchiveBuyerMessages.archiveMessages = newArchiveBuyerMessages.archiveMessages.concat(archiveSellerMessages.archiveMessages)
        this.setState({ archiveSellerMessages: newArchiveBuyerMessages })
      }
      if (isError(archiveSellerMessages)) {
        this.setState({ notification: notifError(archiveSellerMessages.message) })
        this.hasMore = { ...this.hasMore, archiveSellerMessages: false }
      }
    }
  }

  render () {
    const { notification, tab, sellerMessages, archiveSellerMessages, isEmpty } = this.state
    let isChat = tab.active === TABS[0]
    let isArchives = tab.active === TABS[1]
    return (
      <div>
        <div className='nav-tabs'>
          <a className={isChat ? 'active' : ''} onClick={() => tab.press(TABS[0])}><span className='text'>Percakapan</span></a>
          <a className={isArchives ? 'active' : ''} onClick={() => tab.press(TABS[1])}><span className='text'>Arsip</span></a>
        </div>
        <Notification
          type={notification.type}
          isShow={notification.status}
          activeClose
          onClose={() => this.setState({notification: {status: false, message: ''}})}
          message={notification.message} />
        <WrapperList>
          {
            isChat
            ? <ListConversationMessages
              sellerMessages={sellerMessages}
              hasMore={this.hasMore.sellerMessages}
              loadMore={() => this.loadMoreBuyerMessages()}
              isEmpty={isEmpty.sellerMessages} />
            : <ListArcheiveMessages
              archiveSellerMessages={archiveSellerMessages}
              hasMore2={this.hasMore.archiveSellerMessages}
              loadMore2={() => this.loadMoreArchiveBuyerMessages()}
              isEmpty={isEmpty.archiveSellerMessages} />
          }
        </WrapperList>
      </div>
    )
  }
}

const ListConversationMessages = (props) => {
  const { sellerMessages, isEmpty } = props
  if (sellerMessages === undefined) return null
  return (
    <div>
      {
        isEmpty ? <EmptyMessage title='Belum ada Percakapan' message='Anda belum pernah melakukan percakapan dengan pelanggan' />
        : <InfiniteScroll
          pageStart={0}
          loadMore={_.debounce(props.loadMore.bind(this), 500)}
          hasMore={props.hasMore}
          loader={<Loading size={12} color='#ef5656' className='is-fullwidth has-text-centered' />}>
          {
            sellerMessages.sellerMessages.map((message, index) => {
              return (
                <List key={index} message={message} />
              )
            })
          }
        </InfiniteScroll>
      }
    </div>
  )
}

const ListArcheiveMessages = (props) => {
  const { archiveSellerMessages, isEmpty } = props
  if (archiveSellerMessages === undefined) return null
  return (
    <div>
      {
        isEmpty ? <EmptyMessage title='Belum ada Arsip' message='Anda belum memiliki arsip percakapan dengan pelanggan' />
        : <InfiniteScroll
          pageStart={0}
          loadMore={_.debounce(props.loadMore2.bind(this), 500)}
          hasMore={props.hasMore2}
          loader={<Loading size={12} color='#ef5656' className='is-fullwidth has-text-centered' />}>
          {
            archiveSellerMessages.archiveMessages.map((message, index) => {
              return (
                <List key={index} message={message} />
              )
            })
          }
        </InfiniteScroll>
      }
    </div>
  )
}

const WrapperList = ({ children }) => (
  <section className='section is-paddingless'>
    <div className='discuss'>
      <ul className='notif-detail conversation bordered'>
        { children }
      </ul>
    </div>
  </section>
)

const List = ({ message }) => (
  <li onClick={() => Router.push(`/notification-message-detail?id=${message.id}`)}>
    <div className='box is-paddingless'>
      <article className='media'>
        <div className='media-left top'>
          <figure className='image user-pict'>
            <MyImage src={message.store.logo} alt='pict' />
          </figure>
        </div>
        <div className='media-content'>
          <div className='content'>
            <p className='user-name'>
              <strong>{ message.subject }</strong>
              <span>{message.store.name}</span>
              <br />
              { message.detail_message.content }
            </p>
          </div>
          <span className='time-discuss'>{ moment.unix(message.detail_message.created_at).format('DD MMM YYYY') }</span>
        </div>
      </article>
    </div>
  </li>
)

const EmptyMessage = ({ title, message }) => {
  return (
    <div className='content' style={{ paddingTop: '10%' }}>
      <div className='container is-fluid'>
        <div className='desc has-text-centered'>
          <MyImage src={Images.emptyStatesMessage} alt='komuto' />
          <br /><br />
          <p><strong className='bold'>{title}</strong></p>
          <p>{message}</p>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    sellerMessages: state.sellerMessages,
    archiveSellerMessages: state.archiveSellerMessages
  }
}

const mapDispatchToProps = dispatch => ({
  getSellerMessages: (params) => dispatch(messageAction.getSellerMessages(params)),
  getArchiveSellerMessages: (params) => dispatch(messageAction.getArchiveSellerMessages(params))
})

export default connect(mapStateToProps, mapDispatchToProps)(Messages)
