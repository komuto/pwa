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
      buyerMessages: props.buyerMessages || null,
      archiveBuyerMessages: props.archiveBuyerMessages || null,
      isEmpty: { buyerMessages: false, archiveBuyerMessages: false },
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
    this.hasMore = { buyerMessages: false, archiveBuyerMessages: false }
    this.fetchingMore = { buyerMessages: false, archiveBuyerMessages: false }
    this.fetchingFirst = { buyerMessages: false, archiveBuyerMessages: false }

    moment.locale('id')
  }

  onSelectTab (active) {
    Router.push(`/messages?tab=${active}`)
    this.setState({
      tab: {
        ...this.state.tab,
        active
      }
    })
  }

  async loadMoreBuyerMessages () {
    let { pagination } = this.state
    if (!this.fetchingMore.buyerMessages) {
      const newState = { pagination }
      newState.pagination['page'] = pagination.page + 1
      this.setState(newState)
      this.fetchingMore = { ...this.fetchingMore, buyerMessages: true }
      await this.props.getBuyerMessages({ ...this.state.pagination, is_archived: false })
    }
  }

  async loadMoreArchiveBuyerMessages () {
    let { pagination2 } = this.state
    if (!this.fetchingMore.archiveBuyerMessages) {
      const newState = { pagination2 }
      newState.pagination2['page'] = pagination2.page + 1
      this.setState(newState)
      this.fetchingMore = { ...this.fetchingMore, archiveBuyerMessages: true }
      await this.props.getArchiveBuyerMessages(this.state.pagination2)
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
    this.fetchingFirst = { buyerMessages: true, archiveBuyerMessages: true }
    this.props.getBuyerMessages({ page: 1, limit: 10 })
    this.props.getArchiveBuyerMessages({ page: 1, limit: 10 })

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
    const { buyerMessages, archiveBuyerMessages } = nextProps

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
  }

  render () {
    const { notification, tab, buyerMessages, archiveBuyerMessages, isEmpty } = this.state
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
            isChat && <ListConversationMessages
              buyerMessages={buyerMessages}
              hasMore={this.hasMore.buyerMessages}
              loadMore={() => this.loadMoreBuyerMessages()}
              isEmpty={isEmpty.buyerMessages} />
          }
          {
            isArchives && <ListArcheiveMessages
              archiveBuyerMessages={archiveBuyerMessages}
              hasMore2={this.hasMore.archiveBuyerMessages}
              loadMore2={() => this.loadMoreArchiveBuyerMessages()}
              isEmpty={isEmpty.archiveBuyerMessages} />
          }
        </WrapperList>
      </div>
    )
  }
}

const ListConversationMessages = (props) => {
  const { buyerMessages, isEmpty } = props
  if (buyerMessages === undefined) return null
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
            buyerMessages.buyerMessages.map((message, index) => {
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
  const { archiveBuyerMessages, isEmpty } = props
  if (archiveBuyerMessages === undefined) return null
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
            archiveBuyerMessages.archiveMessages.map((message, index) => {
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
  <li onClick={() => Router.push(`/message-detail?id=${message.id}`)}>
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
    buyerMessages: state.buyerMessages,
    archiveBuyerMessages: state.archiveBuyerMessages
  }
}

const mapDispatchToProps = dispatch => ({
  getBuyerMessages: (params) => dispatch(messageAction.getBuyerMessages(params)),
  getArchiveBuyerMessages: (params) => dispatch(messageAction.getArchiveBuyerMessages(params))
})

export default connect(mapStateToProps, mapDispatchToProps)(Messages)
