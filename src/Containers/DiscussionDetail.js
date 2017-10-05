import React, { Component } from 'react'
import { animateScroll } from 'react-scroll'
import { connect } from 'react-redux'
import NProgress from 'nprogress'
import _ from 'lodash'
import moment from 'moment'
// components
import Section from '../Components/Section'
import Content from '../Components/Content'
import MyImage from '../Components/MyImage'
import Notification from '../Components/Notification'
// actions
import * as productActions from '../actions/product'
// services
import { validateResponse, isFetching, Status } from '../Services/Status'
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
    moment.locale('id')
  }

  async componentDidMount () {
    const { id, idd, productDetail } = this.state
    if (!productDetail.isFound || (productDetail.isFound && String(productDetail.detail.product.id) !== String(id))) {
      NProgress.start()
      await this.props.dispatch(productActions.getProduct({ id }))
    }

    await this.props.dispatch(productActions.getComment({ productId: id, id: idd, ...this.state.params }))
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
        await this.props.dispatch(productActions.newComment({productId: id, id: idd, content: comment.value}))
        this.setState({ comment: { ...this.state.comment, value: '' } })
        this.scrollToBottom()
      }
    }
  }

  componentWillReceiveProps (nextProps) {
    const { productDetail, comments, newComment } = nextProps

    if (!isFetching(productDetail)) {
      NProgress.done()
      this.setState({ productDetail, notification: validateResponse(productDetail, 'Data produk tidak ditemukan!') })
    }

    if (!isFetching(comments)) {
      NProgress.done()
      if (comments.status === Status.SUCCESS && comments.isFound) {
        comments.comments = _.orderBy(comments.comments, ['id'], ['asc'])
      }
      this.setState({ comments, notification: validateResponse(comments, 'Data komentar tidak ditemukan!') })
    }

    if (!isFetching(newComment)) {
      NProgress.done()
      if (newComment.status === Status.SUCCESS && newComment.isFound) {
        comments.comments.push(newComment.comment)
      }
      this.setState({ comments, newComment, notification: validateResponse(newComment, 'Komentar gagal ditambahkan!') })
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
                comments.comments.map((comment, index) => {
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
              <textarea onChange={this.commentOnChange} value={comment.value} onKeyPress={(e) => this.commentOnEnterPress(e)} className='textarea' placeholder='Tulis Komentar' />
            </p>
          </div>
        </div>
      </Content>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    productDetail: state.productDetail,
    comments: state.comments,
    newComment: state.newComment
  }
}

export default connect(mapStateToProps)(DiscussionDetail)
