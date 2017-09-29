// @flow
import React from 'react'
import { connect } from 'react-redux'
import Router from 'next/router'
import NProgress from 'nprogress'
// components
import { Navbar } from './Navbar'
import Images from '../Themes/Images'
import Notification from '../Components/Notification'
// actions
import * as messageAction from '../actions/message'
// services
import { isFetching, validateResponse } from '../Services/Status'

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
    this.afterSendMessage = false
    this.moveMessage = false
    this.deleteMessage = false
  }

  handleInput (e) {
    const value = e.target.value.replace(/[^a-zA-Z0-9 ]/g, '')
    this.setState({ message: value })
  }

  async submitMessage (e) {
    const { id, message } = this.state
    if (e.key === 'Enter') {
      if (this.state.message !== '') {
        this.afterSendMessage = true
        await this.props.buyerReplyMessage({ id: id, content: message })
        this.setState({ message: '' })
      }
    }
  }

  componentDidMount () {
    const { id } = this.state
    if (id !== '') {
      NProgress.start()
      this.props.getBuyerDetailMessage({ id })
    }
  }

  updateMoveMessage () {
    this.moveMessage = true
    const { messageType } = this.state
    if (messageType === 'conversation') {
      this.props.updateBuyerMessage({ id: this.state.id, messageType: 'archive' })
    }
    if (messageType === 'archive') {
      this.props.updateBuyerMessage({ id: this.state.id, messageType: 'conversation' })
    }
  }

  deleteMessageForever () {
    this.deleteMessage = true
    console.log('id', this.state.id)
    this.props.buyerDeleteMessage({ id: this.state.id })
    // if (messageType === 'conversation') {
    //   this.props.buyerDeleteMessage({ id: this.state.id, messageType: 'archive' })
    // }
    // if (messageType === 'archive') {
    //   this.props.buyerDeleteMessage({ id: this.state.id, messageType: 'conversation' })
    // }
  }

  componentWillReceiveProps (nextProps) {
    const { buyerDetailMessage, replyMessage, updateMessage, deleteMessage } = nextProps
    if (!isFetching(buyerDetailMessage)) {
      NProgress.done()
      this.setState({
        buyerDetailMessage: nextProps.buyerDetailMessage,
        notification: validateResponse(buyerDetailMessage, buyerDetailMessage.message),
        messageType: nextProps.buyerDetailMessage.buyerDetailMessage.type
      })
    }
    if (!isFetching(replyMessage) && this.afterSendMessage) {
      this.afterSendMessage = false
      if (replyMessage.isFound) {
        this.props.getBuyerDetailMessage({ id: this.state.id, is_archived: false })
      } else {
        this.setState({ notification: validateResponse(buyerDetailMessage, 'Gagal mengirim pesan') })
      }
    }
    if (!isFetching(updateMessage) && this.moveMessage) {
      this.moveMessage = false
      if (this.state.messageType === 'conversation') {
        Router.push(`/messages?archeived=${updateMessage.updateMessage.id}`)
      }
      if (this.state.messageType === 'archive') {
        Router.push(`/messages?conversation=${updateMessage.updateMessage.id}`)
      }
    }
    if (!isFetching(deleteMessage) && this.deleteMessage) {
      this.deleteMessage = false
      // if (this.state.messageType === 'conversation') {
      //   Router.push(`/messages?archeived=${deleteMessage.deleteMessage.id}`)
      // }
      // if (this.state.messageType === 'archive') {
      //   Router.push(`/messages?conversation=${deleteMessage.deleteMessage.id}`)
      // }
      console.log('delete', deleteMessage)
    }
    console.log('nextProps', nextProps)
  }

  renderListMessages () {
    const { buyerDetailMessage } = this.state
    if (buyerDetailMessage.isFound && buyerDetailMessage.buyerDetailMessage.detail_messages.length > 0) {
      return buyerDetailMessage.buyerDetailMessage.detail_messages.map((message, i) => {
        return (
          <li key={i}>
            <div className='box is-paddingless'>
              <article className='media'>
                <div className='media-left top sm'>
                  <figure className='image user-pict'>
                    <img src={message.user.photo} alt='pict' />
                  </figure>
                </div>
                <div className='media-content'>
                  <div className='content'>
                    <p className='user-name'>
                      <strong>{message.user.name}</strong>
                      {message.content}
                    </p>
                  </div>
                  <span className='time-discuss'>{message.created_at}</span>
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
            <img src={Images.emptyStatesMessage} alt='komuto' />
            <br /><br />
            <p><strong className='bold'>Belum ada Percakapan</strong></p>
            <p>Anda belum pernah melakukan percakapan dengan seller manapun</p>
          </div>
        </div>
      )
    }
  }

  render () {
    console.log('state', this.state)
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
            <ul className='notif-detail conversation bordered'>
              {this.renderListMessages()}
            </ul>
          </div>
        </section>
        <div className='add-comment'>
          <div className='field'>
            <p className='control'>
              <textarea
                name='message'
                onChange={(e) => this.handleInput(e)}
                value={message}
                onKeyPress={(e) => this.submitMessage(e)}
                className='textarea' placeholder='Tulis pesan Anda disini' />
            </p>
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