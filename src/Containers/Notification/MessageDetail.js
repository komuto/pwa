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
import { animateScroll } from 'react-scroll'
/** including component */
import Content from '../../Components/Content'
import Notification from '../../Components/Notification'
import MyImage from '../../Components/MyImage'
import { Navbar } from '../Navbar'
import { New } from '../../Components/Comment'
/** including actions */
import * as messageActions from '../../actions/message'
import RegexNormal from '../../Lib/RegexNormal'

class MessageDetail extends Component {
  constructor (props) {
    super(props)
    this.state = {
      id: props.query.id || null,
      sellerDetailMessage: props.sellerDetailMessage || null,
      replyMessage: {
        data: props.replyMessage,
        answer: '',
        onChange: (e) => this.handleInputAnswer(e),
        submit: (e) => this.replyMessageSubmit(e)
      },
      notification: props.notification,
      moreMessage: {
        show: false,
        press: (e) => this.moreMessagePress(e),
        selected: (p) => this.selectedMore(p)
      }
    }
    this.submitting = {
      sellerDetailMessage: false,
      replyMessage: false,
      updateMessageToArchives: false,
      updateMessageToConversation: false,
      deleteMessage: false
    }

    moment.locale('id')
  }

  render () {
    const { sellerDetailMessage, notification } = this.state
    const { isFound } = this.props
    let params = {
      navbar: {
        searchBoox: false,
        path: '/',
        textPath: 'Detail Pesan',
        callBack: () => Router.push('/notification-message'),
        moreMessage: {
          ...this.state.moreMessage,
          type: (isFound(sellerDetailMessage)) ? sellerDetailMessage.sellerDetailMessage.type : null
        }
      }
    }

    return (
      <Content>
        <Navbar {...params} />
        <Notification
          type={notification.type}
          isShow={notification.status}
          activeClose
          onClose={() => this.setState({notification: {status: false, message: ''}})}
          message={notification.message} />
        { isFound(sellerDetailMessage) && <MessageDetailContent {...this.state} submitting={this.submitting} messagesEnd={this.messagesEnd} /> }
      </Content>
    )
  }

  componentDidMount () {
    let { id } = this.state
    this.submitting = { ...this.submitting, sellerDetailMessage: true }
    NProgress.start()
    this.props.getSellerDetailMessage({ id })
  }

  componentWillReceiveProps (nextProps) {
    let { sellerDetailMessage, replyMessage, updateMessage, deleteMessage } = nextProps
    let { isFetching, isError, isFound, notifError } = this.props

    /** handling state seller detail message */
    if (!isFetching(sellerDetailMessage) && this.submitting.sellerDetailMessage) {
      this.submitting = { ...this.submitting, sellerDetailMessage: false }
      NProgress.done()
      if (isError(sellerDetailMessage)) {
        this.setState({ notification: notifError(sellerDetailMessage.message) })
      }
      if (isFound(sellerDetailMessage)) {
        this.setState({ sellerDetailMessage })
      }
    }

    /** handling reply message */
    if (!isFetching(replyMessage) && this.submitting.replyMessage) {
      this.submitting = { ...this.submitting, replyMessage: false }
      if (isError(replyMessage)) {
        this.setState({ notification: notifError(replyMessage.message) })
      }
      if (isFound(replyMessage)) {
        let { detail_messages } = sellerDetailMessage.sellerDetailMessage
        sellerDetailMessage.sellerDetailMessage.detail_messages = detail_messages.concat(replyMessage.message)
        this.setState({
          replyMessage: {
            ...this.state.replyMessage,
            data: replyMessage,
            answer: ''
          },
          sellerDetailMessage
        })
        this.scrollToBottom()
      }
    }

    /** handling update message */
    if (!isFetching(updateMessage) && this.submitting.updateMessageToArchives) {
      this.submitting = { ...this.submitting, updateMessageToArchives: false }
      if (isError(updateMessage)) {
        this.setState({ notification: notifError(updateMessage) })
      }
      if (isFound(updateMessage)) {
        Router.push(`/notification-message?tab=CHAT&toArchive=success`)
      }
    }

    /** handling update message */
    if (!isFetching(updateMessage) && this.submitting.updateMessageToConversation) {
      this.submitting = { ...this.submitting, updateMessageToConversation: false }
      if (isError(updateMessage)) {
        this.setState({ notification: notifError(updateMessage.message) })
      }
      if (isFound(updateMessage)) {
        Router.push(`/notification-message?tab=ARCHIVES&toConversation=success`)
      }
    }

    /** handling delete message */
    if (!isFetching(deleteMessage) && this.submitting.deleteMessage) {
      this.submitting = { ...this.submitting, deleteMessage: false }
      if (isError(deleteMessage)) {
        this.setState({ notification: notifError(deleteMessage.message) })
      }
      if (isFound(deleteMessage)) {
        Router.push(`/notification-message?tab=CHAT&toDelete=success`)
      }
    }
  }

  moreMessagePress (e) {
    this.setState({
      moreMessage: {
        ...this.state.moreMessage,
        show: !this.state.moreMessage.show
      }
    })
  }

  selectedMore (params) {
    this.updateMessageToArchives(params)
    this.updateMessageToConversation(params)
    this.deleteMessage(params)
  }

  updateMessageToArchives (params) {
    if (params === 'archives') {
      let { id } = this.state
      this.submitting = { ...this.submitting, updateMessageToArchives: true }
      this.props.updateSellerMessage({ id, messageType: 'archive' })
    }
  }

  updateMessageToConversation (params) {
    if (params === 'conversation') {
      let { id } = this.state
      this.submitting = { ...this.submitting, updateMessageToConversation: true }
      this.props.updateSellerMessage({ id, messageType: 'conversation' })
    }
  }

  deleteMessage (params) {
    if (params === 'delete') {
      let { id } = this.state
      this.submitting = { ...this.submitting, deleteMessage: true }
      this.props.sellerDeleteMessage({ id })
    }
  }

  replyMessageSubmit (e) {
    let content = this.state.replyMessage.answer
    let { id } = this.state
    if (content !== '') {
      this.submitting = { ...this.submitting, replyMessage: true }
      this.props.sellerReplyMessage({ id, content })
    }
  }

  scrollToBottom () {
    animateScroll.scrollToBottom()
  }

  handleInputAnswer (e) {
    e.preventDefault()
    const answer = RegexNormal(e.target.value)
    this.setState({ replyMessage: { ...this.state.replyMessage, answer } })
  }
}

const MessageDetailContent = ({ sellerDetailMessage, replyMessage, submitting, messagesEnd }) => (
  <Content>
    <div className='discuss-title'>
      { sellerDetailMessage.sellerDetailMessage.subject }
    </div>
    <section className='section is-paddingless'>
      <div className='discuss'>
        <ul className='notif-detail conversation'>
          {
            sellerDetailMessage.sellerDetailMessage.detail_messages.map((message, index) =>
              <List key={index} message={message} />
            )
          }
          <div
            style={{ float: 'left', clear: 'both' }}
            ref={(el) => { messagesEnd = el }} />
        </ul>
      </div>
    </section>
    <div className='add-comment'>
      <div className='field'>
        <p className='control'>
          <span className={`${submitting.replyMessage && 'button self is-loading right'}`} />
          <New
            onSubmit={(e) => !submitting.replyMessage && replyMessage.submit(e)}
            onChange={(e) => !submitting.replyMessage && replyMessage.onChange(e)}
            value={replyMessage.answer}
            submitting={submitting.replyMessage}
          />
        </p>
      </div>
    </div>
  </Content>
)

const List = ({ message }) => (
  <li>
    <div className='box is-paddingless'>
      <article className='media'>
        <div className='media-left top sm'>
          <figure className='image user-pict'>
            <MyImage src={message.store ? message.store.logo : message.user ? message.user.photo : null} alt='pict' />
          </figure>
        </div>
        <div className='media-content'>
          <div className='content'>
            <p className='user-name'>
              <strong>
                { message.store ? message.store.name : message.user ? message.user.name : null }
              </strong>
              { message.content }
            </p>
          </div>
          <span className='time-discuss'>{ moment.unix(message.created_at).format('DD MMM YYYY - hh:mm') }</span>
        </div>
      </article>
    </div>
  </li>
)

const mapStateToProps = (state) => ({
  sellerDetailMessage: state.sellerDetailMessage,
  replyMessage: state.replyMessage,
  updateMessage: state.updateMessage,
  deleteMessage: state.deleteMessage
})

const mapDispatchToProps = (dispatch) => ({
  getSellerDetailMessage: (params) => dispatch(messageActions.getSellerDetailMessage(params)),
  sellerReplyMessage: (params) => dispatch(messageActions.sellerReplyMessage(params)),
  updateSellerMessage: (params) => dispatch(messageActions.updateSellerMessage(params)),
  sellerDeleteMessage: (params) => dispatch(messageActions.sellerDeleteMessage(params))
})

export default connect(mapStateToProps, mapDispatchToProps)(MessageDetail)
