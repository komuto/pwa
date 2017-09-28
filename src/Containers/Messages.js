// @flow
import React from 'react'
import { connect } from 'react-redux'
// components
import Router from 'next/router'
import Images from '../Themes/Images'
import Notification from '../Components/Notification'
// actions
import * as messageAction from '../actions/message'
// services
import { isFetching, validateResponse, validateResponseAlter } from '../Services/Status'

const TAB_CONVERSATION = 'TAB_CONVERSATION'
const TAB_ARCHIVE = 'TAB_ARCHIVE'

class Messages extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      buyerMessages: props.buyerMessages || null,
      archiveBuyerMessages: props.archiveBuyerMessages || null,
      tabs: TAB_CONVERSATION,
      notification: {
        type: 'is-success',
        status: false,
        message: 'Error, default message.'
      }
    }
  }

  switchTab (e) {
    const { tabs } = this.state
    this.setState({ tabs: (tabs === TAB_CONVERSATION) ? TAB_ARCHIVE : TAB_CONVERSATION })
  }

  messageDetail (messageId) {
    Router.push(`/message-detail?id=${messageId}`)
  }

  componentDidMount () {
    this.props.getBuyerMessages({ is_archived: false })
    this.props.getArchiveBuyerMessages()
  }

  componentWillReceiveProps (nextProps) {
    const { query } = this.props
    const { buyerMessages, archiveBuyerMessages, updateMessage } = nextProps
    if (!isFetching(buyerMessages)) {
      this.setState({ buyerMessages: nextProps.buyerMessages, notification: validateResponse(buyerMessages, buyerMessages.message) })
    }
    if (!isFetching(archiveBuyerMessages)) {
      this.setState({ archiveBuyerMessages: nextProps.archiveBuyerMessages, notification: validateResponse(archiveBuyerMessages, archiveBuyerMessages.message) })
    }
    if (query.hasOwnProperty('archeived')) {
      if (updateMessage.isFound) {
        this.setState({ notification: validateResponseAlter(updateMessage, 'Berhasil memindahkan ke Arsip', 'Gagal memindahkan ke Arsip') })
      } else {
        this.setState({ notification: validateResponse(updateMessage, 'Gagal memindahkan ke Arsip') })
      }
    }
    if (query.hasOwnProperty('conversation')) {
      if (updateMessage.isFound) {
        this.setState({ notification: validateResponseAlter(updateMessage, 'Berhasil memindahkan ke Percakapan', 'Gagal memindahkan ke Percakapan') })
      } else {
        this.setState({ notification: validateResponse(updateMessage, 'Gagal memindahkan ke Percakapan') })
      }
    }
    console.log('nextPropsMes', nextProps)
  }

  render () {
    const { notification, tabs, buyerMessages, archiveBuyerMessages } = this.state
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
                  messageDetail={(id) => this.messageDetail(id)} />
                : <ListArcheiveMessages
                  archiveBuyerMessages={archiveBuyerMessages}
                  messageDetail={(id) => this.messageDetail(id)} />
              }
            </ul>
          </div>
        </section>
      </div>
    )
  }
}

const ListConversationMessages = (props) => {
  const { buyerMessages } = props
  if (buyerMessages === undefined) return null
  return (
    <div>
      {
        buyerMessages.buyerMessages.length > 0
        ? buyerMessages.buyerMessages.map((message, i) => {
          return (
            <li key={i}>
              <div className='box is-paddingless' onClick={() => props.messageDetail(message.id)}>
                <article className='media'>
                  <div className='media-left top'>
                    <figure className='image user-pict'>
                      <img src={message.store.logo}
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
                    <span className='time-discuss'>{message.detail_message.created_at}</span>
                  </div>
                </article>
              </div>
            </li>
          )
        })
        : <EmptyMessage />
      }
    </div>
  )
}

const ListArcheiveMessages = (props) => {
  const { archiveBuyerMessages } = props
  if (archiveBuyerMessages === undefined) return null
  return (
    <div>
      {
        archiveBuyerMessages.archiveMessages.length > 0
        ? archiveBuyerMessages.archiveMessages.map((message, i) => {
          return (
            <li key={i}>
              <div className='box is-paddingless' onClick={() => props.messageDetail(message.id)}>
                <article className='media'>
                  <div className='media-left top'>
                    <figure className='image user-pict'>
                      <img src={message.store.logo}
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
                    <span className='time-discuss'>{message.detail_message.created_at}</span>
                  </div>
                </article>
              </div>
            </li>
          )
        })
        : <EmptyMessage />
      }
    </div>
  )
}

const EmptyMessage = () => {
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

const mapStateToProps = (state) => {
  return {
    buyerMessages: state.buyerMessages,
    archiveBuyerMessages: state.archiveBuyerMessages,
    updateMessage: state.updateMessage
  }
}

const mapDispatchToProps = dispatch => ({
  getBuyerMessages: (params) => dispatch(messageAction.getBuyerMessages(params)),
  getArchiveBuyerMessages: (params) => dispatch(messageAction.getArchiveBuyerMessages(params))
})

export default connect(mapStateToProps, mapDispatchToProps)(Messages)
