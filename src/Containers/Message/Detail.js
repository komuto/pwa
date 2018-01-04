// @flow
import React from 'react'
import { connect } from 'react-redux'
import Router from 'next/router'
import NProgress from 'nprogress'
import moment from 'moment'
import { animateScroll } from 'react-scroll'
// components
import { Navbar } from '../Navbar'
import Images from '../../Themes/Images'
import MyImage, { ImageRounded } from '../../Components/MyImage'
import Notification from '../../Components/Notification'
import { New } from '../../Components/Comment'
// actions
import * as messageAction from '../../actions/message'
import RegexNormal from '../../Lib/RegexNormal'

class MessageDetail extends React.Component {
  constructor (props) {
    super(props)
    let messageType = props.buyerDetailMessage.isFound ? props.buyerDetailMessage.buyerDetailMessage.type : ''
    this.state = {
      id: props.query.id,
      buyerDetailMessage: props.buyerDetailMessage || null,
      message: '',
      messageType: messageType,
      notification: {
        type: 'is-success',
        status: false,
        message: 'Error, default message.'
      }
    }

    this.submitting = {
      deleteMessage: false,
      moveMessage: false,
      replyMessage: false,
      getBuyerDetailMessage: false
    }
  }

  handleInput (e) {
    const value = RegexNormal(e.target.value)
    this.setState({ message: value })
  }

  submitMessage (e) {
    const { id, message } = this.state
    if (this.state.message !== '') {
      this.submitting = { ...this.submitting, replyMessage: true }
      this.props.buyerReplyMessage({ id: id, content: message })
    }
  }

  componentDidMount () {
    const { id } = this.state
    if (id) {
      NProgress.start()
      this.submitting = { ...this.submitting, getBuyerDetailMessage: true }
      this.props.getBuyerDetailMessage({ id })
    }
  }

  updateMoveMessage () {
    this.submitting = { ...this.submitting, moveMessage: true }
    const { messageType } = this.state
    if (messageType === 'conversation') {
      this.props.updateBuyerMessage({ id: this.state.id, messageType: 'archive' })
    }
    if (messageType === 'archive') {
      this.props.updateBuyerMessage({ id: this.state.id, messageType: 'conversation' })
    }
  }

  deleteMessageForever () {
    this.submitting = { ...this.submitting, deleteMessage: true }
    this.props.buyerDeleteMessage({ id: this.state.id })
  }

  scrollToBottom () {
    animateScroll.scrollToBottom()
  }

  componentWillReceiveProps (nextProps) {
    const { buyerDetailMessage, replyMessage, updateMessage, deleteMessage } = nextProps
    const { isFetching, isError, isFound, notifError } = this.props
    if (!isFetching(buyerDetailMessage) && this.submitting.getBuyerDetailMessage) {
      NProgress.done()
      this.submitting = { ...this.submitting, getBuyerDetailMessage: false }
      if (isFound(buyerDetailMessage)) {
        this.setState({ buyerDetailMessage, messageType: buyerDetailMessage.buyerDetailMessage.type })
        this.scrollToBottom()
      }
      if (isError(buyerDetailMessage)) {
        this.setState({ notification: notifError(buyerDetailMessage.message) })
      }
    }

    if (!isFetching(replyMessage) && this.submitting.replyMessage) {
      this.submitting = { ...this.submitting, replyMessage: false }
      if (isFound(replyMessage)) {
        let detailMessages = buyerDetailMessage.buyerDetailMessage.detail_messages
        buyerDetailMessage.buyerDetailMessage.detail_messages = detailMessages.concat(replyMessage.message)
        this.setState({
          message: '',
          buyerDetailMessage
        })
        this.scrollToBottom()
      }
      if (isError(replyMessage)) {
        this.setState({ notification: notifError(replyMessage.message) })
      }
    }

    if (!isFetching(updateMessage) && this.submitting.moveMessage) {
      this.submitting = { ...this.submitting, moveMessage: false }
      if (isFound(updateMessage)) {
        if (this.state.messageType === 'conversation') {
          Router.push(`/messages?tab=CHAT&toArchive=success`)
        }
        if (this.state.messageType === 'archive') {
          Router.push(`/messages?tab=ARCHIVES&toConversation=success`)
        }
      }
      if (isError(updateMessage)) {
        this.setState({ notification: notifError(updateMessage.message) })
      }
    }

    if (!isFetching(deleteMessage) && this.submitting.deleteMessage) {
      this.submitting = { ...this.submitting, deleteMessage: false }
      if (isFound(deleteMessage)) {
        if (this.state.messageType === 'conversation') {
          Router.push(`/messages?tab=CHAT&toDelete=success`)
        }
        if (this.state.messageType === 'archive') {
          Router.push(`/messages?tab=CHAT&toDelete=success`)
        }
      }
      if (isError(deleteMessage)) {
        this.setState({ notification: notifError(deleteMessage.message) })
      }
    }
  }

  renderListMessages () {
    const { buyerDetailMessage } = this.state
    if (buyerDetailMessage.isFound && buyerDetailMessage.buyerDetailMessage.detail_messages.length > 0) {
      moment.locale('id')
      return buyerDetailMessage.buyerDetailMessage.detail_messages.map((message, i) => {
        return (
          <li key={i}>
            <div className='box is-paddingless'>
              <article className='media'>
                <div className='media-left top sm'>
                  <figure className='image user-pict'>
                    <ImageRounded img={message.user.photo} width={40} height={40} borderRadius={20} padding={20} />
                  </figure>
                </div>
                <div className='media-content'>
                  <div className='content'>
                    <p className='user-name'>
                      <strong>{message.user.name}</strong>
                      {message.content}
                    </p>
                  </div>
                  <span className='time-discuss'>{moment.unix(message.created_at).format('DD MMM YYYY h:mm')}</span>
                </div>
              </article>
            </div>
          </li>
        )
      })
    } else {
      return (
        <div className='container is-fluid'>
          <div className='desc has-text-centered'>
            <MyImage src={Images.emptyStatesMessage} alt='komuto' />
            <br /><br />
            <p><strong className='bold'>Belum ada Percakapan</strong></p>
            <p>Anda belum pernah melakukan percakapan dengan seller manapun</p>
          </div>
        </div>
      )
    }
  }

  render () {
    const { notification, buyerDetailMessage, message, id, messageType } = this.state
    const messageTypes = buyerDetailMessage.isFound ? messageType : 'conversation'
    const params = {
      navbar: {
        searchBoox: false,
        path: '/',
        callBack: () => Router.push('/messages'),
        textPath: ''
      },
      messageButton: true,
      buyerDetailMessageId: id,
      messageType: messageTypes,
      moveToConversationOrArceive: () => this.updateMoveMessage(),
      deleteMessage: () => this.deleteMessageForever()
    }
    return (
      <div>
        <Navbar {...params} />
        <Notification
          type={notification.type}
          isShow={notification.status}
          activeClose
          onClose={() => this.setState({notification: {status: false, message: ''}})}
          message={notification.message} />
        <div className='discuss-title'>
          { buyerDetailMessage.isFound && buyerDetailMessage.buyerDetailMessage.subject }
        </div>
        <section className='section is-paddingless'>
          <div className='discuss'>
            <ul className='notif-detail conversation'>
              {this.renderListMessages()}
            </ul>
          </div>
        </section>
        <div className='add-comment'>
          <div className='field'>
            <div className='control'>
              <span className={`${this.afterSendMessage ? 'button self is-loading right' : ''}`} />
              <New
                onChange={(e) => this.handleInput(e)}
                onSubmit={(e) => this.submitMessage(e)}
                value={message}
                submitting={this.submitting.replyMessage} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    buyerDetailMessage: state.buyerDetailMessage,
    replyMessage: state.replyMessage,
    updateMessage: state.updateMessage,
    deleteMessage: state.deleteMessage
  }
}

const mapDispatchToProps = dispatch => ({
  getBuyerDetailMessage: (params) => dispatch(messageAction.getBuyerDetailMessage(params)),
  buyerReplyMessage: (params) => dispatch(messageAction.buyerReplyMessage(params)),
  updateBuyerMessage: (params) => dispatch(messageAction.updateBuyerMessage(params)),
  buyerDeleteMessage: (params) => dispatch(messageAction.buyerDeleteMessage(params))
})

export default connect(mapStateToProps, mapDispatchToProps)(MessageDetail)
