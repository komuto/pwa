// @flow
import React from 'react'
import { connect } from 'react-redux'
import Router from 'next/router'
import moment from 'moment'
import NProgress from 'nprogress'
import InfiniteScroll from 'react-infinite-scroller'
import _ from 'lodash'
import url from 'url'
import { animateScroll } from 'react-scroll'
// components
import UrlParam from '../../Lib/UrlParam'
import MyImage from '../../Components/MyImage'
import Loading from '../../Components/Loading'
import { Navbar } from './../Navbar'
import Notification from '../../Components/Notification'
// actions
import * as productActions from '../../actions/product'

class DiscussionProductDetail extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      id: props.query.id || null,
      comments: props.comments || null,
      content: '',
      isEmpty: true,
      pagination: {
        page: 1,
        limit: 10
      },
      notification: {
        type: 'is-success',
        status: false,
        message: 'Error, default message.'
      }
    }
    this.sendQuestion = false
    this.hasMore = false
    this.fetching = { fetchingMore: false, fetchingFirst: false, fetchingProduct: false }
  }

  scrollToBottom () {
    animateScroll.scrollToBottom()
  }

  handleInput (e) {
    this.setState({ content: e.target.value })
  }

  async submitDiscussion (e) {
    const { id, content } = this.state
    if (e.key === 'Enter') {
      if (content) {
        this.sendQuestion = true
        await this.props.addNewComment({ id, content })
        this.setState({ content: '' })
      }
    }
  }

  async componentDidMount () {
    const { id } = this.state
    this.fetching = { ...this.fetching, fetchingFirst: true }
    await this.props.getComment({ id })
  }

  async loadMore () {
    let { id, pagination } = this.state
    if (!this.fetching.fetchingMore) {
      if (pagination.page > 1) {
        const newState = { pagination }
        pagination['page'] = pagination.page - 1
        this.setState(newState)
        this.fetching = { ...this.fetching, fetchingMore: true }
        await this.props.getComment({ id, ...this.state.pagination })
      }
    }
  }

  componentWillReceiveProps (nextProps) {
    const { newComment, comments } = nextProps
    const { isFetching, isFound, isError, notifError } = this.props

    if (!isFetching(comments) && this.fetching.fetchingFirst) {
      NProgress.done()
      this.fetching = { ...this.fetching, fetchingFirst: false }
      if (isFound(comments)) {
        let pagination = comments.meta
        let isEmpty = comments.comments.comments.length < 1
        this.setState({ comments, isEmpty, pagination })
        this.hasMore = comments.meta.page > 1
      }
      if (isError(comments)) {
        this.setState({ notification: notifError(comments.message) })
      }
    }
    if (!isFetching(comments) && this.fetching.fetchingMore) {
      this.fetching = { ...this.fetching, fetchingMore: false }
      if (isFound(comments)) {
        let stateComments = this.state.comments
        this.hasMore = comments.meta.page > 1
        stateComments.comments.comments = comments.comments.comments.concat(stateComments.comments.comments)
        this.setState({ comments: stateComments })
      }
      if (isError(comments)) {
        this.setState({ notification: notifError(comments.message) })
        this.hasMore = false
      }
    }
    if (!isFetching(newComment) && this.sendQuestion) {
      this.sendQuestion = false
      if (isFound(newComment)) {
        let stateComments = this.state.comments
        stateComments.comments.comments = stateComments.comments.comments.concat(newComment.comment)
        this.setState({ comments: stateComments, content: '' })
        this.scrollToBottom()
      }
      if (isError(newComment)) {
        this.setState({ notification: notifError(newComment.message) })
      }
    }
  }

  render () {
    const { comments, notification, content, isEmpty } = this.state
    const { product } = comments.comments
    const params = {
      navbar: {
        searchBoox: false,
        path: '/',
        callBack: () => Router.push('/discussion-product'),
        textPath: ''
      },
      productDetail: product
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
        <div className='column is-paddingless'>
          <div className='see-all is-bordered'>
            <span className='link' onClick={() =>
              Router.push(
                url.format({
                  pathname: '/product-detail',
                  query: {id: product.id}
                }),
                `/detail/${UrlParam(product.name)}/${product.slug}?id=${product.id}`
              )}
              >Lihat Produk <span className='icon-arrow-right' /></span>
          </div>
        </div>
        <section className='section is-paddingless'>
          <div className='discuss'>
            <ul className='notif-detail conversation bordered'>
              {
                isEmpty
                ? null
                : <InfiniteScroll
                  pageStart={0}
                  loadMore={_.debounce(this.loadMore.bind(this), 1000)}
                  hasMore={this.hasMore}
                  loader={<Loading size={12} color='#ef5656' className='is-fullwidth has-text-centered' />}>
                  {
                      comments.comments.comments.map((comment, index) => {
                        let createDate = moment.unix(comment.created_at).format('h:mm')
                        return (
                          <li
                            key={index}>
                            <div className='box is-paddingless'>
                              <article className='media'>
                                <div className='media-left top'>
                                  <figure className='image user-pict'>
                                    <MyImage src={comment.user.photo} alt='pict' />
                                  </figure>
                                </div>
                                <div className='media-content'>
                                  <div className='content'>
                                    <p className='user-name'>
                                      <strong>{comment.user.name}</strong>
                                      { comment.content}
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
                </InfiniteScroll>
              }
            </ul>
          </div>
        </section>
        <div className='add-comment'>
          <div className='field'>
            <p className='control'>
              <textarea
                name='content'
                onChange={(e) => this.handleInput(e)}
                value={content}
                onKeyPress={(e) => this.submitDiscussion(e)}
                className='textarea' placeholder='Tulis pertanyaan Anda disini' />
            </p>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    comments: state.comments,
    newComment: state.newComment
  }
}

const mapDispatchToProps = dispatch => ({
  getComment: (params) => dispatch(productActions.getComment(params)),
  addNewComment: (params) => dispatch(productActions.newComment(params))
})

export default connect(mapStateToProps, mapDispatchToProps)(DiscussionProductDetail)
