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
/** including actions */
import * as messageActions from '../../actions/message'

class Message extends Component {
  constructor (props) {
    super(props)
    this.state = {
      sellerMessages: {
        data: props.sellerMessages,
        hasMore: true,
        loadMore: () => this.messageLoadMore(),
        params: {
          page: 1,
          limit: 10
        }
      },
      archiveSellerMessages: props.archiveSellerMessages || null,
      tab: {
        active: props.query.tab || TABS[0],
        press: (p) => this.onSelectTab(p)
      },
      notification: props.notification
    }
    this.submitting = {
      sellerMessages: false,
      archiveSellerMessages: false
    }

    moment.locale('id')
  }

  render () {
    let { tab, sellerMessages, archiveSellerMessages, notification } = this.state
    let { isFound } = this.props

    let isChat = tab.active === TABS[0]
    let isArchives = tab.active === TABS[1]
    let toArchive = this.props.query.toArchive || null
    let toConversation = this.props.query.toConversation || null
    let toDelete = this.props.query.toDelete || null

    if (toArchive) {
      notification = { type: 'is-success', status: true, message: 'Berhasil memindahkan ke arsip' }
    }

    if (toConversation) {
      notification = { type: 'is-success', status: true, message: 'Berhasil memindahkan ke percakapan' }
    }

    if (toDelete) {
      notification = { type: 'is-success', status: true, message: 'Berhasil menghapus percakapan' }
    }

    return (
      <Content>
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
        { isFound(sellerMessages.data) && isChat && <ChatContent {...this.state} /> }
        { isFound(archiveSellerMessages) && isArchives && <ArchivesContent {...this.state} /> }
      </Content>
    )
  }

  componentDidMount () {
    NProgress.start()
    this.loadconversationMessages()
    this.loadArchivesMessages()
  }

  loadconversationMessages () {
    let { params } = this.state.sellerMessages
    this.submitting = {...this.submitting, sellerMessages: true}
    this.props.getSellerMessages(params)
  }

  loadArchivesMessages () {
    this.submitting = {...this.submitting, archiveSellerMessages: true}
    this.props.getArchiveSellerMessages()
  }

  componentWillReceiveProps (nextProps) {
    const { sellerMessages, archiveSellerMessages } = nextProps
    const { isFetching, isError, isFound, notifError } = this.props

    /** handling state sellerMessages */
    if (!isFetching(sellerMessages) && this.submitting.sellerMessages) {
      this.submitting = { ...this.submitting, sellerMessages: false }
      NProgress.done()
      if (isError(sellerMessages)) {
        this.setState({ notification: notifError(sellerMessages.message) })
      }
      if (isFound(sellerMessages)) {
        let hasMore = sellerMessages.sellerMessages.length > 9
        let tam = sellerMessages.sellerMessages.concat(this.state.sellerMessages.data.sellerMessages)
        sellerMessages.sellerMessages = tam
        this.setState({ sellerMessages: { ...this.state.sellerMessages, data: sellerMessages, hasMore } })
      }
    }

    /** handling state archive seller message */
    if (!isFetching(archiveSellerMessages) && this.submitting.archiveSellerMessages) {
      this.submitting = { ...this.submitting, archiveSellerMessages: false }
      if (isError(archiveSellerMessages)) {
        this.setState({ notification: notifError(archiveSellerMessages.message) })
      }
      if (isFound(archiveSellerMessages)) {
        this.setState({ archiveSellerMessages })
      }
    }
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

  messageLoadMore () {
    let { sellerMessages } = this.state
    if (!this.submitting.sellerMessages) {
      this.submitting = { ...this.submitting, sellerMessages: true }
      sellerMessages.params.page += 1
      this.props.getSellerMessages(sellerMessages.params)
      this.setState({ sellerMessages })
    }
  }
}

const ChatContent = ({ sellerMessages }) => (
  <WrapperList>
    <InfiniteScroll
      pageStart={0}
      loadMore={_.debounce(sellerMessages.loadMore, 500)}
      hasMore={sellerMessages.hasMore}
      loader={<Loading size={12} color='#ef5656' className='is-fullwidth has-text-centered' />}>
      {
        sellerMessages.data.sellerMessages.map((message, index) =>
          <List key={index} message={message} />
        )
      }
    </InfiniteScroll>
  </WrapperList>
)

const ArchivesContent = ({ archiveSellerMessages }) => (
  <WrapperList>
    {
      archiveSellerMessages.archiveMessages.map((message, index) =>
        <List key={index} message={message} />
      )
    }
  </WrapperList>
)

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
          <span className='time-discuss'>{ moment.unix(message.detail_message.created_at).format('Do MMMM YY') }</span>
        </div>
      </article>
    </div>
  </li>
)

const TABS = ['CHAT', 'ARCHIVES']

const mapStateToProps = (state) => ({
  sellerMessages: state.sellerMessages,
  archiveSellerMessages: state.archiveSellerMessages
})

const mapDispatchToProps = (dispatch) => ({
  getSellerMessages: (params) => dispatch(messageActions.getSellerMessages(params)),
  getArchiveSellerMessages: () => dispatch(messageActions.getArchiveSellerMessages())
})

export default connect(mapStateToProps, mapDispatchToProps)(Message)
