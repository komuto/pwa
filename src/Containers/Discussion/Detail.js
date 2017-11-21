/**
 * Safei Muslim
 * Yogyakarta , revamp => 16 Oktober 2017
 * PT Skyshi Digital Indonesa
 */

 /** including dependencies */
import React, { Component } from 'react'
import { animateScroll } from 'react-scroll'
import { connect } from 'react-redux'
import moment from 'moment'
// components
import Section from '../../Components/Section'
import Content from '../../Components/Content'
import Comment from '../../Components/Comment'
import MyImage from '../../Components/MyImage'
import Notification from '../../Components/Notification'
// actions
import * as productActions from '../../actions/product'
// lib
import RupiahFormat from '../../Lib/RupiahFormat'
import * as validations from '../../Validations/Input'

class Detail extends Component {
  constructor (props) {
    super(props)
    this.state = {
      id: props.query.id || null,
      idd: props.query.idd || null,
      productDetail: props.productDetail || null,
      comments: props.comments || null,
      newComment: props.newComment || null,
      // comment: {
      //   value: '',
      //   error: false,
      //   onChange: (e) => this.commentOnChange(e),
      //   onEnterPress: (e) => this.commentOnEnterPress(e)
      // },
      comment: {
        data: [],
        onChange: (e) => this.onChangeComment(e),
        onSubmit: (e) => this.onSubmitComment(e),
        value: '',
        submitting: false
      },
      params: {
        page: 1,
        limit: 10
      },
      notification: props.notification
    }

    this.afterAddComment = false
    this.submitting = {
      productDetail: false,
      comments: false,
      newComment: false
    }
    moment.locale('id')
  }

  componentDidMount () {
    const { id, idd } = this.state
    /** fetching comments */
    this.submitting = { ...this.submitting, comments: true }
    this.props.getComment({ productId: id, id: idd, ...this.state.params })
  }

  scrollToBottom () {
    animateScroll.scrollToBottom()
  }

  onChangeComment (e) {
    e.preventDefault()
    this.setState({
      comment: {
        ...this.state.comment,
        value: validations.inputNormal(e.target.value)
      }
    })
  }

  onSubmitComment () {
    if (this.props.isLogin) {
      const { id, idd, comment } = this.state
      if (comment.value !== '') {
        this.afterAddComment = true
        this.submitting = { ...this.submitting, newComment: true }
        this.props.addNewComment({productId: id, id: idd, content: comment.value})
      }
    } else {
      this.props.alertLogin()
    }
  }

  componentWillReceiveProps (nextProps) {
    const { comments, newComment } = nextProps
    const { isFetching, isError, isFound, notifError } = this.props

    /** handling state comments */
    if (!isFetching(comments) && this.submitting.comments) {
      this.submitting = { ...this.submitting, comments: false }
      if (isError(comments)) {
        this.setState({ notification: notifError(comments.message) })
      }
      if (isFound(comments)) {
        this.setState({
          comments,
          comment: {
            ...this.state.comment,
            data: comments.comments.comments
          }})
        this.scrollToBottom()
      }
    }

    /** handling state comments */
    if (!isFetching(newComment) && this.submitting.newComment) {
      this.submitting = { ...this.submitting, newComment: false }
      if (isError(newComment)) {
        this.setState({ notification: notifError(newComment.message) })
      }
      if (isFound(newComment)) {
        this.setState({
          comment: {
            ...this.state.comment,
            submitting: false,
            value: '',
            data: [
              ...this.state.comment.data,
              newComment.comment
            ]
          }
        })
        this.scrollToBottom()
      }
    }
  }

  render () {
    const { comments, notification } = this.state
    const { isFound } = this.props
    return (
      <Content>
        <Notification
          type={notification.type}
          isShow={notification.status}
          activeClose
          onClose={() => this.setState({notification: {status: false, message: ''}})}
          message={notification.message} />
        {
          (isFound(comments)) &&
          <DiscussionDetailContent {...this.state} submitting={this.submitting} messagesEnd={this.messagesEnd} />
        }
      </Content>
    )
  }
}

const DiscussionDetailContent = ({ comments, comment, submitting, messagesEnd }) => {
  let { product } = comments.comments
  return (
    <Section>
      <div className='discuss gap'>
        <ul className='product-discuss is-fixed' style={{ zIndex: 2, marginBottom: '15px' }}>
          <li>
            <div className='box is-paddingless'>
              <article className='media'>
                <div className='media-left top'>
                  {/* <figure className='image product-pict' style={{ width: 40 }}> */}
                  <figure className='image product-pict'>
                    <MyImage src={product.image} alt={product.name} />
                  </figure>
                </div>
                <div className='media-content'>
                  <div className='content'>
                    <p className='products-name'>
                      <strong>{ product.name }</strong>
                      Rp { RupiahFormat(product.price) }
                    </p>
                  </div>
                </div>
              </article>
            </div>
          </li>
        </ul>
        <Comment {...comment} />
      </div>
    </Section>
  )
}

export const AddComment = ({ comment, submitting }) => (
  <div className='add-comment' style={{ position: 'fixed' }}>
    <div className='field'>
      <p className='control'>
        <span className={`${submitting.newComment && 'button self is-loading right'}`} />
        <textarea
          onChange={comment.onChange}
          value={comment.value}
          onKeyPress={(e) => comment.onEnterPress(e)}
          className='textarea'
          placeholder='Tulis Komentar'
          readOnly={submitting.newComment} />
      </p>
    </div>
  </div>
)

const mapStateToProps = (state) => ({
  productDetail: state.productDetail,
  comments: state.comments,
  newComment: state.newComment
})

const mapDispatchToProps = (dispatch) => ({
  getProduct: (params) => dispatch(productActions.getProduct(params)),
  getComment: (params) => dispatch(productActions.getComment(params)),
  addNewComment: (params) => dispatch(productActions.newComment(params))
})

export default connect(mapStateToProps, mapDispatchToProps)(Detail)
