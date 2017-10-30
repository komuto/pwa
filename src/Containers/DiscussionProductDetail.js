// @flow
import React from 'react'
import { connect } from 'react-redux'
import Router from 'next/router'
import moment from 'moment'
import NProgress from 'nprogress'
import InfiniteScroll from 'react-infinite-scroller'
import _ from 'lodash'
import url from 'url'
// components
import UrlParam from '../Lib/UrlParam'
import MyImage from '../Components/MyImage'
import Loading from '../Components/Loading'
import { Navbar } from './Navbar'
import Notification from '../Components/Notification'
// actions
import * as productAction from '../actions/product'

class DiscussionProductDetail extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      id: props.query.id || null,
      productDetail: props.productDetail || null,
      discussions: props.discussions || null,
      fetching: false,
      question: '',
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
    this.fetchingProduct = false
    this.hasMore = false
    this.fetching = false
    this.fetchingFirst = false
  }

  handleInput (e) {
    const value = e.target.value.replace(/[^a-zA-Z0-9 ]/g, '')
    this.setState({ question: value })
  }

  async submitDiscussion (e) {
    const { id, question } = this.state
    if (e.key === 'Enter') {
      if (question !== '') {
        this.sendQuestion = true
        await this.props.addDiscussion({ id: id, question: question })
        this.setState({ question: '' })
      }
    }
  }

  async componentDidMount () {
    const { id, productDetail } = this.state
    if (!productDetail.isFound || (productDetail.isFound && String(productDetail.detail.product.id) !== String(id))) {
      NProgress.start()
      this.fetchingProduct = true
      await this.props.getProduct({ id })
    }
    this.fetchingFirst = true
    await this.props.getDiscussion({ id, ...this.state.pagination })
  }

  async loadMore () {
    let { id, pagination } = this.state
    if (!this.fetching) {
      const newState = { pagination }
      pagination['page'] = pagination.page + 1
      this.setState(newState)
      this.fetching = true
      await this.props.getDiscussion({ id, ...this.state.pagination })
    }
  }

  componentWillReceiveProps (nextProps) {
    const { productDetail, discussions } = nextProps
    const { isFetching, isFound, isError, notifError, notifSuccess } = this.props
    const nextDiscuss = nextProps.newDiscussion
    let stateDiscussions = this.state.discussions

    if (!isFetching(productDetail) && this.fetchingProduct) {
      NProgress.done()
      this.fetchingProduct = false
      if (isFound(productDetail)) {
        this.setState({ productDetail })
      }
      if (isError(productDetail)) {
        this.setState({ notification: notifError(productDetail.message) })
      }
    }
    if (!isFetching(discussions) && this.fetchingFirst) {
      NProgress.done()
      this.fetchingFirst = false
      if (isFound(discussions)) {
        this.setState({ discussions })
        this.hasMore = discussions.discussions.length > 9
      }
      if (isError(discussions)) {
        this.setState({ notification: notifError(discussions.message) })
      }
    }
    if (!isFetching(discussions) && this.fetching) {
      this.fetching = false
      if (isFound(discussions)) {
        this.hasMore = discussions.discussions.length > 9
        stateDiscussions.discussions = stateDiscussions.discussions.concat(discussions.discussions)
        this.setState({ discussions: stateDiscussions })
      }
      if (isError(discussions)) {
        this.setState({ notification: notifError(discussions.message) })
        this.hasMore = false
      }
    }
    if (!isFetching(nextDiscuss) && this.sendQuestion) {
      this.sendQuestion = false
      if (isFound(nextDiscuss)) {
        stateDiscussions.discussions.unshift(nextDiscuss.discussion)
        this.setState({ discussions: stateDiscussions, notification: notifSuccess(nextDiscuss.message) })
      }
      if (isError(nextDiscuss)) {
        this.setState({ notification: notifError(nextDiscuss.message) })
      }
    }
  }

  render () {
    const { productDetail, discussions, notification, question } = this.state
    const { product, images } = productDetail.detail
    const params = {
      navbar: {
        searchBoox: false,
        path: '/',
        callBack: () => Router.push('/discussion-product'),
        textPath: ''
      },
      productDetail: product,
      productImages: images
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
                discussions.discussions.length < 1
                ? null
                : <InfiniteScroll
                  pageStart={0}
                  loadMore={_.debounce(this.loadMore.bind(this), 500)}
                  hasMore={this.hasMore}
                  loader={<Loading size={12} color='#ef5656' className='is-fullwidth has-text-centered' />}>
                  {
                      discussions.discussions.map((discussion, index) => {
                        let createDate = moment.unix(discussion.created_at).format('h:mm')
                        let sttNewDisscussion = this.isAddNewDiscussion && index === 0
                        return (
                          <li
                            className={` ${sttNewDisscussion && ''}`}
                            key={discussion.id}>
                            <div className={`box is-paddingless ${sttNewDisscussion && 'effect-slide-down'}`}>
                              <article className='media'>
                                <div className='media-left top'>
                                  <figure className='image user-pict'>
                                    <MyImage src={discussion.user.photo} alt='pict' />
                                  </figure>
                                </div>
                                <div className='media-content'>
                                  <div className='content'>
                                    <p className='user-name'>
                                      <strong>{discussion.user.name}</strong>
                                      { discussion.question}
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
                name='question'
                onChange={(e) => this.handleInput(e)}
                value={question}
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
    productDetail: state.productDetail,
    discussions: state.discussions,
    newDiscussion: state.newDiscussion
  }
}

const mapDispatchToProps = dispatch => ({
  getProduct: (params) => dispatch(productAction.getProduct(params)),
  getDiscussion: (params) => dispatch(productAction.getDiscussion(params)),
  addDiscussion: (params) => dispatch(productAction.newDiscussion(params))
})

export default connect(mapStateToProps, mapDispatchToProps)(DiscussionProductDetail)
