// @flow
import React from 'react'
import { connect } from 'react-redux'
import Router from 'next/router'
import moment from 'moment'
import NProgress from 'nprogress'
import InfiniteScroll from 'react-infinite-scroller'
import _ from 'lodash'
// components
import MyImage from '../Components/MyImage'
import Loading from '../Components/Loading'
import { Navbar } from './Navbar'
import Notification from '../Components/Notification'
// actions
import * as productAction from '../actions/product'
// services
import { Status, isFetching, validateResponse } from '../Services/Status'

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
    this.isAddNewDiscussion = false
    this.sendQuestion = false
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
      await this.props.getProduct({ id })
    }
    await this.props.getDiscussion({ id, ...this.state.pagination })
  }

  async handleLoadMore () {
    let { id, pagination, fetching } = this.state
    if (!fetching) {
      pagination.page += 1
      await this.props.getDiscussion({ id, ...this.state.pagination })
      this.setState({ pagination, fetching: true })
    }
  }

  componentWillReceiveProps (nextProps) {
    const { productDetail, discussions } = nextProps
    const beforeDiscuss = this.props.newDiscussion
    const nextDiscuss = nextProps.newDiscussion
    let stateDiscussions = this.state.discussions

    if (!isFetching(productDetail)) {
      NProgress.done()
      this.setState({ productDetail, notification: validateResponse(productDetail, 'Data produk tidak ditemukan!') })
    }

    if (nextDiscuss.isFound && (nextDiscuss.discussion.id !== beforeDiscuss.discussion.id)) {
      this.isAddNewDiscussion = true
      stateDiscussions.discussions.unshift(nextDiscuss.discussion)
      this.setState({ discussions: stateDiscussions, notification: {type: 'is-success', status: true, message: 'Berhasil mengirim diskusi'} })
    } else if (!isFetching(discussions)) {
      NProgress.done()
      if (discussions.status === Status.SUCCESS && discussions.isFound) {
        // jika page di state kurang dari page di props maka data discussion di tambahkan
        if ((stateDiscussions.meta.page < discussions.meta.page) && discussions.discussions.length > 0) {
          discussions.discussions = _.uniqBy(stateDiscussions.discussions.concat(discussions.discussions), 'id')
          this.isAddNewDiscussion = false
        } else {
          discussions.discussions = stateDiscussions.discussions
        }
      }
      this.setState({ fetching: false, discussions, notification: validateResponse(productDetail, 'Data produk tidak ditemukan!') })
    } else if (nextDiscuss.status === Status.OFFLINE || nextDiscuss.status === Status.FAILED) {
      this.setState({ notification: validateResponse(nextDiscuss, '') })
    }
  }

  render () {
    const { productDetail, discussions, pagination, notification, question } = this.state
    const { product, images } = productDetail.detail
    let hasMore = discussions.discussions.length >= pagination.limit
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
            <span className='link'>Lihat Produk <span className='icon-arrow-right' /></span>
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
                  loadMore={_.debounce(this.handleLoadMore.bind(this), 500)}
                  hasMore={hasMore}
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
                                <div className='media-left top sm'>
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
