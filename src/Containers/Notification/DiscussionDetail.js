/**
 * Safei Muslim
 * Yogyakarta , 12 Oktober 2017
 * PT Skyshi Digital Indonesa
 */

/** including dependencies */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import Router from 'next/router'
import NProgress from 'nprogress'
import { animateScroll } from 'react-scroll'
import url from 'url'
/** including component */
import Content from '../../Components/Content'
import Notification from '../../Components/Notification'
import MyImage from '../../Components/MyImage'
import { Navbar } from '../Navbar'
/** including actions */
import * as productActions from '../../actions/product'
/** including libs */
import UrlParam from '../../Lib/UrlParam'
import RegexNormal from '../../Lib/RegexNormal'

class DiscussionDetail extends Component {
  constructor (props) {
    super(props)
    this.state = {
      id: props.query.id || null,
      comments: props.comments || null,
      newComment: {
        data: props.newComment,
        answer: '',
        onChange: (e) => this.handleInputAnswer(e),
        submit: (e) => this.newCommentSubmit(e)
      },
      notification: props.notification
    }
    this.submitting = {
      comments: false,
      newComment: false
    }

    moment.locale('id')
  }

  render () {
    console.log('state', this.state)
    const { comments, notification } = this.state
    const { isFound } = this.props
    let params = {
      navbar: {
        searchBoox: false,
        path: '/',
        textPath: 'Detail Pesan'
      }
    }

    if (isFound(comments)) {
      let { product } = comments.comments
      params.navbar.textPath = product.name
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
        { (isFound(comments)) && <MessageDetailContent {...this.state} submitting={this.submitting} /> }
      </Content>
    )
  }

  componentDidMount () {
    let { id } = this.state
    this.submitting = { ...this.submitting, comments: true }
    NProgress.start()
    this.props.getcomment({ id })
  }

  componentWillReceiveProps (nextProps) {
    let { comments, newComment } = nextProps
    let { isFetching, isError, isFound, notifError } = this.props

    /** handling state comments */
    if (!isFetching(comments) && this.submitting.comments) {
      NProgress.done()
      this.submitting = { ...this.submitting, comments: false }
      if (isError(comments)) {
        this.setState({ notification: notifError(comments.message) })
      }
      if (isFound(comments)) {
        this.setState({ comments })
        this.scrollToBottom()
      }
    }

    /** handling state newComment */
    if (!isFetching(newComment) && this.submitting.newComment) {
      this.submitting = { ...this.submitting, newComment: false }
      if (isError(newComment)) {
        this.setState({ notification: notifError(newComment.message) })
      }
      if (isFound(newComment)) {
        let tam = comments.comments.comments.concat(newComment.comment)
        comments.comments.comments = tam
        this.setState({ comments, newComment: { ...this.state.newComment, answer: '' } })
        this.scrollToBottom()
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

  newCommentSubmit (e) {
    let content = e.target.value
    let { id } = this.state
    if (e.key === 'Enter') {
      if (content !== '') {
        this.submitting = { ...this.submitting, newComment: true }
        this.props.addNewComment({ id, content })
      }
    }
  }

  scrollToBottom () {
    animateScroll.scrollToBottom()
  }

  handleInputAnswer (e) {
    e.preventDefault()
    const answer = RegexNormal(e.target.value)
    this.setState({ newComment: { ...this.state.newComment, answer } })
  }
}

const MessageDetailContent = ({ comments, newComment, submitting, messagesEnd }) => {
  let myComment = comments.comments
  return (
    <Content>
      <div className='column is-paddingless'>
        <div className='see-all is-bordered'>
          <span onClick={() =>
            Router.push(
              url.format({
                pathname: '/product-detail',
                query: {id: myComment.product.id}
              }),
              `/detail/${UrlParam(myComment.store.name)}/${myComment.product.slug}-${myComment.product.id}`
            )
          } className='link'>Lihat Produk <span className='icon-arrow-right' /></span>
        </div>
      </div>
      <section className='section is-paddingless bg-white'>
        <div className='discuss'>
          <ul className='main-discuss notif-detail'>
            {
              myComment.comments.map((message, index) =>
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
            <span className={`${submitting.newComment && 'button self is-loading right'}`} />
            <input
              name='answer'
              onChange={(e) => !submitting.newComment && newComment.onChange(e)}
              value={newComment.answer}
              onKeyPress={(e) => !submitting.newComment && newComment.submit(e)}
              className='textarea'
              placeholder='Tulis pessan Anda disini'
              readOnly={submitting.newComment} />
          </p>
        </div>
      </div>
    </Content>
  )
}

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
          <span className='time-discuss'>{ moment.unix(message.created_at).format('hh:mm') }</span>
        </div>
      </article>
    </div>
  </li>
)

const mapStateToProps = (state) => ({
  comments: state.comments,
  newComment: state.newComment
})

const mapDispatchToProps = (dispatch) => ({
  getcomment: (params) => dispatch(productActions.getComment(params)),
  addNewComment: (params) => dispatch(productActions.newComment(params))
})

export default connect(mapStateToProps, mapDispatchToProps)(DiscussionDetail)
