import React, { Component } from 'react'
import { animateScroll } from 'react-scroll'
import { connect } from 'react-redux'
import NProgress from 'nprogress'
import moment from 'moment'
// components
import Section from '../Components/Section'
import Content from '../Components/Content'
import MyImage from '../Components/MyImage'
import Notification from '../Components/Notification'
// actions
import * as productActions from '../actions/product'
// lib
import RupiahFormat from '../Lib/RupiahFormat'

class DiscussionDetail extends Component {
  constructor (props) {
    super(props)
    this.state = {
      id: props.query.id || null,
      idd: props.query.idd || null,
      productDetail: props.productDetail || null,
      comments: props.comments || null,
      newComment: props.newComment || null,
      comment: {
        value: '',
        error: false
      },
      params: {
        page: 1,
        limit: 10
      },
      notification: {
        status: false,
        message: 'Error, default message.'
      }
    }

    this.afterAddComment = false
    this.submitting = {
      productDetail: false,
      comments: false,
      newComment: false
    }
    moment.locale('id')
  }

  async componentDidMount () {
    const { id, idd, productDetail } = this.state
    if (!productDetail.isFound || (productDetail.isFound && String(productDetail.detail.product.id) !== String(id))) {
      NProgress.start()
      this.submitting = { ...this.submitting, productDetail: true }
      await this.props.getProduct({ id })
    }
    this.submitting = { ...this.submitting, comments: true }
    await this.props.getComment({ productId: id, id: idd, ...this.state.params })
  }

  scrollToBottom = () => {
    animateScroll.scrollToBottom()
  }

  commentOnChange = (e) => {
    const value = e.target.value.replace(/[^a-zA-Z0-9 ]/g, '')
    this.setState({ comment: { ...this.state.comment, value } })
  }

  async commentOnEnterPress (e) {
    const { id, idd, comment } = this.state
    if (e.key === 'Enter') {
      if (comment.value !== '') {
        this.afterAddComment = true
        this.submitting = { ...this.submitting, newComment: true }
        await this.props.addNewComment({productId: id, id: idd, content: comment.value})
        this.scrollToBottom()
      }
    }
  }

  componentWillReceiveProps (nextProps) {
    const { productDetail, comments, newComment } = nextProps
    const { isFetching, isError, isFound, notifError } = this.props

    /** handling state get product detail */
    if (!isFetching(productDetail) && this.submitting.productDetail) {
      NProgress.done()
      this.submitting = { ...this.submitting, productDetail: false }
      if (isError(productDetail)) {
        this.setState({ notification: notifError(productDetail.message) })
      }
      if (isFound(productDetail)) {
        this.setState({ productDetail })
      }
    }

    /** handling state comments */
    if (!isFetching(comments) && this.submitting.comments) {
      this.submitting = { ...this.submitting, comments: false }
      if (isError(comments)) {
        this.setState({ notification: notifError(comments.message) })
      }
      if (isFound(comments)) {
        // comments.comments = _.orderBy(comments.comments, ['id'], ['asc'])
        this.setState({ comments })
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
        // let tam = comments.comments
        // .comments.push(newComment.comment)
        this.setState({
          newComment,
          comments,
          comment: { ...this.state.comment, value: '' }
        })
      }
    }
  }

  render () {
    const { productDetail, comments, comment, notification } = this.state
    const { product, images } = productDetail.detail
    if (!productDetail.isFound) return null
    return (
      <Content>
        <Notification
          type='is-danger'
          isShow={notification.status}
          activeClose
          onClose={() => this.setState({notification: {status: false, message: ''}})}
          message={notification.message} />
        <Section>
          <div className='discuss gap'>
            <ul className='product-discuss'>
              <li>
                <div className='box is-paddingless'>
                  <article className='media'>
                    <div className='media-left'>
                      <figure className='image product-pict' style={{ width: 40 }}>
                        <MyImage src={images[0].file} alt={product.name} />
                      </figure>
                    </div>
                    <div className='media-content'>
                      <div className='content'>
                        <p className='products-name'>
                          <strong>{ product.name }</strong>
                          <br />
                          Rp { RupiahFormat(product.price) }
                        </p>
                      </div>
                    </div>
                  </article>
                </div>
              </li>
            </ul>
            <ul className='main-discuss'>
              {
                comments.comments.comments.map((comment, index) => {
                  if (comment.is_deleted) return null
                  let createDate = moment.unix(comment.created_at).format('Do MMMM YY h:mm:ss')
                  return (
                    <li key={index}>
                      <div className='box is-paddingless'>
                        <article className='media'>
                          <div className='media-left'>
                            <figure className='image user-pict'>
                              <MyImage src={comment.user.photo} />
                            </figure>
                          </div>
                          <div className='media-content'>
                            <div className='content'>
                              <p className='user-name'>
                                <strong>{ comment.user.name}</strong>
                                <br />
                                { comment.content }
                              </p>
                            </div>
                            <span className='time-discuss'>{ createDate }</span>
                          </div>
                        </article>
                      </div>
                    </li>
                  )
                })
              }
              <div
                style={{ float: 'left', clear: 'both' }}
                ref={(el) => { this.messagesEnd = el }} />
            </ul>
          </div>
        </Section>
        <div className='add-comment' style={{ position: 'fixed' }}>
          <div className='field'>
            <p className='control'>
              <span className={`${this.submitting.newComment && 'button self is-loading right'}`} />
              <textarea
                onChange={this.commentOnChange}
                value={comment.value}
                onKeyPress={(e) => this.commentOnEnterPress(e)}
                className='textarea'
                placeholder='Tulis Komentar'
                readOnly={this.submitting.newComment} />
            </p>
          </div>
        </div>
      </Content>
    )
  }
}
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

export default connect(mapStateToProps, mapDispatchToProps)(DiscussionDetail)
