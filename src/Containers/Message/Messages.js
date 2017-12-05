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
// services
import { validateResponseAlter } from '../../Services/Status'

const TAB_CONVERSATION = 'TAB_CONVERSATION'
const TAB_ARCHIVE = 'TAB_ARCHIVE'

class Messages extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      buyerMessages: props.buyerMessages || null,
      archiveBuyerMessages: props.archiveBuyerMessages || null,
      tabs: TAB_CONVERSATION,
      isEmpty: { buyerMessages: false, archiveBuyerMessages: false },
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
    this.hasMore = { buyerMessages: false, archiveBuyerMessages: false }
    this.fetchingMore = { buyerMessages: false, archiveBuyerMessages: false }
    this.fetchingFirst = { buyerMessages: false, archiveBuyerMessages: false }
  }

  switchTab (e) {
    const { tabs } = this.state
    this.setState({ tabs: (tabs === TAB_CONVERSATION) ? TAB_ARCHIVE : TAB_CONVERSATION })
  }

  messageDetail (messageId) {
    Router.push(`/message-detail?id=${messageId}`)
  }

  async loadMoreBuyerMessages () {
    let { pagination } = this.state
    if (!this.fetchingMore.buyerMessages) {
      const newState = { pagination }
      pagination['page'] = pagination.page + 1
      this.setState(newState)
      this.fetchingMore = { ...this.fetchingMore, buyerMessages: true }
      await this.props.getBuyerMessages({ ...this.state.pagination, is_archived: false })
    }
  }

  async loadMoreArchiveBuyerMessages () {
    let { pagination2 } = this.state
    if (!this.fetchingMore.archiveBuyerMessages) {
      const newState = { pagination2 }
      pagination2['page'] = pagination2.page + 1
      this.setState(newState)
      this.fetchingMore = { ...this.fetchingMore, archiveBuyerMessages: true }
      await this.props.getArchiveBuyerMessages(this.state.pagination2)
    }
  }

  componentDidMount () {
    NProgress.start()
    this.fetchingFirst = { buyerMessages: true, archiveBuyerMessages: true }
    this.props.getBuyerMessages({ page: 1, limit: 10 })
    this.props.getArchiveBuyerMessages({ page: 1, limit: 10 })
  }

  componentWillReceiveProps (nextProps) {
    const { query, isFetching, isFound, isError, notifError } = this.props
    const { buyerMessages, archiveBuyerMessages, updateMessage, deleteMessage } = nextProps

    if (!isFetching(buyerMessages) && this.fetchingFirst.buyerMessages) {
      NProgress.done()
      this.fetchingFirst = { ...this.fetchingFirst, buyerMessages: false }
      if (isFound(buyerMessages)) {
        let isEmpty = { ...this.state.isEmpty, buyerMessages: buyerMessages.buyerMessages.length < 1 }
        this.hasMore = { ...this.hasMore, buyerMessages: buyerMessages.buyerMessages.length > 9 }
        this.setState({ buyerMessages, isEmpty })
      }
      if (isError(buyerMessages)) {
        this.setState({ notification: notifError(buyerMessages.message) })
      }
    }

    if (!isFetching(buyerMessages) && this.fetchingMore.buyerMessages) {
      this.fetchingMore = { ...this.fetchingMore, buyerMessages: false }
      if (isFound(buyerMessages)) {
        let newBuyerMessages = this.state.buyerMessages
        this.hasMore = { ...this.hasMore, buyerMessages: buyerMessages.buyerMessages.length > 9 }
        newBuyerMessages.buyerMessages = newBuyerMessages.buyerMessages.concat(buyerMessages.buyerMessages)
        this.setState({ buyerMessages: newBuyerMessages })
      }
      if (isError(buyerMessages)) {
        this.setState({ notification: notifError(buyerMessages.message) })
        this.hasMore = { ...this.hasMore, buyerMessages: false }
      }
    }

    if (!isFetching(archiveBuyerMessages) && this.fetchingFirst.archiveBuyerMessages) {
      NProgress.done()
      this.fetchingFirst = { ...this.fetchingFirst, archiveBuyerMessages: false }
      if (isFound(archiveBuyerMessages)) {
        this.setState({ archiveBuyerMessages })
        let isEmpty = { ...this.state.isEmpty, archiveBuyerMessages: archiveBuyerMessages.archiveMessages.length < 1 }
        this.hasMore = { ...this.hasMore, archiveBuyerMessages: archiveBuyerMessages.archiveMessages.length > 9 }
        this.setState({ archiveBuyerMessages, isEmpty })
      }
      if (isError(archiveBuyerMessages)) {
        this.setState({ notification: notifError(archiveBuyerMessages.message) })
      }
    }

    if (!isFetching(archiveBuyerMessages) && this.fetchingMore.archiveBuyerMessages) {
      this.fetchingMore = { ...this.fetchingMore, archiveBuyerMessages: false }
      if (isFound(archiveBuyerMessages)) {
        let newArchiveBuyerMessages = this.state.archiveBuyerMessages
        this.hasMore = { ...this.hasMore, archiveBuyerMessages: archiveBuyerMessages.archiveMessages.length > 9 }
        newArchiveBuyerMessages.archiveMessages = newArchiveBuyerMessages.archiveMessages.concat(archiveBuyerMessages.archiveMessages)
        this.setState({ archiveBuyerMessages: newArchiveBuyerMessages })
      }
      if (isError(archiveBuyerMessages)) {
        this.setState({ notification: notifError(archiveBuyerMessages.message) })
        this.hasMore = { ...this.hasMore, archiveBuyerMessages: false }
      }
    }
    if (query.hasOwnProperty('archeived')) {
      this.setState({ notification: validateResponseAlter(updateMessage, 'Berhasil memindahkan ke Arsip', 'Gagal memindahkan ke Arsip') })
    }
    if (query.hasOwnProperty('conversation')) {
      this.setState({ notification: validateResponseAlter(updateMessage, 'Berhasil memindahkan ke Percakapan', 'Gagal memindahkan ke Percakapan') })
    }
    if (query.hasOwnProperty('deleteArcheive')) {
      this.setState({ notification: validateResponseAlter(deleteMessage, 'Berhasil menghapus Pesan', 'Gagal menghapus Pesan') })
    }
    if (query.hasOwnProperty('deleteConversation')) {
      this.setState({ notification: validateResponseAlter(deleteMessage, 'Berhasil menghapus Pesan', 'Gagal menghapus Pesan') })
    }
  }

  render () {
    const { notification, tabs, buyerMessages, archiveBuyerMessages, isEmpty } = this.state
    return (
      <div>
        <div className='nav-tabs'>
          <a onClick={(e) => this.switchTab(e)} className={tabs === TAB_CONVERSATION && 'active'}>Percakapan</a>
          <a onClick={(e) => this.switchTab(e)} className={tabs === TAB_ARCHIVE && 'active'}>Arsip</a>
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
                tabs === TAB_CONVERSATION
                ? <ListConversationMessages
                  buyerMessages={buyerMessages}
                  messageDetail={(id) => this.messageDetail(id)}
                  hasMore={this.hasMore.buyerMessages}
                  loadMore={() => this.loadMoreBuyerMessages()}
                  isEmpty={isEmpty.buyerMessages} />
                : <ListArcheiveMessages
                  archiveBuyerMessages={archiveBuyerMessages}
                  messageDetail={(id) => this.messageDetail(id)}
                  hasMore2={this.hasMore.archiveBuyerMessages}
                  loadMore2={() => this.loadMoreArchiveBuyerMessages()}
                  isEmpty={isEmpty.archiveBuyerMessages} />
              }
            </ul>
          </div>
        </section>
      </div>
    )
  }
}

const ListConversationMessages = (props) => {
  const { buyerMessages, isEmpty } = props
  if (buyerMessages === undefined) return null
  moment.locale('id')
  return (
    <div>
      {
        isEmpty ? <EmptyMessage title='Belum ada Percakapan' message='Anda belum pernah melakukan percakapan dengan seller' />
        : <InfiniteScroll
          pageStart={0}
          loadMore={_.debounce(props.loadMore.bind(this), 500)}
          hasMore={props.hasMore}
          loader={<Loading size={12} color='#ef5656' className='is-fullwidth has-text-centered' />}>
          {
            buyerMessages.buyerMessages.map((message, i) => {
              return (
                <li key={i}>
                  <div className='box is-paddingless' onClick={() => props.messageDetail(message.id)}>
                    <article className='media'>
                      <div className='media-left top'>
                        <figure className='image user-pict'>
                          <MyImage src={message.store.logo}
                            style={{width: '50px', height: '50px'}} alt='pict' />
                        </figure>
                      </div>
                      <div className='media-content'>
                        <div className='content'>
                          <p className='user-name'>
                            <strong>{message.subject}</strong>
                            <span>{message.store.name}</span>
                            <br />
                            {message.detail_message.content}
                          </p>
                        </div>
                        <span className='time-discuss'>{moment.unix(message.detail_message.created_at).format('DD MMM YYYY')}</span>
                      </div>
                    </article>
                  </div>
                </li>
              )
            })
          }
        </InfiniteScroll>
      }
    </div>
  )
}

const ListArcheiveMessages = (props) => {
  const { archiveBuyerMessages, isEmpty } = props
  if (archiveBuyerMessages === undefined) return null
  moment.locale('id')
  return (
    <div>
      {
        isEmpty ? <EmptyMessage title='Belum ada Arsip' message='Anda belum memiliki arsip percakapan dengan seller' />
        : <InfiniteScroll
          pageStart={0}
          loadMore={_.debounce(props.loadMore2.bind(this), 500)}
          hasMore={props.hasMore2}
          loader={<Loading size={12} color='#ef5656' className='is-fullwidth has-text-centered' />}>
          {
            archiveBuyerMessages.archiveMessages.map((message, i) => {
              return (
                <li key={i}>
                  <div className='box is-paddingless' onClick={() => props.messageDetail(message.id)}>
                    <article className='media'>
                      <div className='media-left top'>
                        <figure className='image user-pict'>
                          <MyImage src={message.store.logo}
                            style={{width: '50px', height: '50px'}} alt='pict' />
                        </figure>
                      </div>
                      <div className='media-content'>
                        <div className='content'>
                          <p className='user-name'>
                            <strong>{message.subject}</strong>
                            <span>{message.store.name}</span>
                            <br />
                            {message.detail_message.content}
                          </p>
                        </div>
                        <span className='time-discuss'>{moment.unix(message.detail_message.created_at).format('DD MMM YYYY')}</span>
                      </div>
                    </article>
                  </div>
                </li>
              )
            })
          }
        </InfiniteScroll>
      }
    </div>
  )
}

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
    buyerMessages: state.buyerMessages,
    archiveBuyerMessages: state.archiveBuyerMessages,
    updateMessage: state.updateMessage,
    deleteMessage: state.deleteMessage
  }
}

const mapDispatchToProps = dispatch => ({
  getBuyerMessages: (params) => dispatch(messageAction.getBuyerMessages(params)),
  getArchiveBuyerMessages: (params) => dispatch(messageAction.getArchiveBuyerMessages(params))
})

export default connect(mapStateToProps, mapDispatchToProps)(Messages)
