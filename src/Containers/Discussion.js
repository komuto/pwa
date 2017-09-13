import React, { Component } from 'react'
import { connect } from 'react-redux'
import NProgress from 'nprogress'
import Router from 'next/router'
import moment from 'moment'
import _ from 'lodash'
import InfiniteScroll from 'react-infinite-scroller'
// components
import Section from '../Components/Section'
import Content from '../Components/Content'
import MyImage from '../Components/MyImage'
import Notification from '../Components/Notification'
import Loading from '../Components/Loading'
// actions
import * as productActions from '../actions/product'
// services
import { validateResponse, isFetching, Status } from '../Services/Status'
// lib
import RupiahFormat from '../Lib/RupiahFormat'

class Discussion extends Component {
  constructor (props) {
    super(props)
    this.state = {
      id: props.query.id || null,
      productDetail: props.productDetail || null,
      discussions: props.discussions || null,
      fetching: false,
      pagination: {
        page: 1,
        limit: 10
      },
      notification: {
        type: 'is-danger',
        status: false,
        message: 'Error, default message.'
      }
    }
    this.isAddNewDiscussion = false
  }

  async componentDidMount () {
    const { id, productDetail } = this.state
    if (!productDetail.isFound || (productDetail.isFound && String(productDetail.detail.product.id) !== String(id))) {
      NProgress.start()
      await this.props.dispatch(productActions.getProduct({ id }))
    }
    await this.props.dispatch(productActions.getDiscussion({ id, ...this.state.pagination }))
  }

  async handleLoadMore () {
    let { id, pagination, fetching } = this.state
    if (!fetching) {
      pagination.page += 1
      await this.props.dispatch(productActions.getDiscussion({ id, ...this.state.pagination }))
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
    const { productDetail, discussions, pagination, notification } = this.state
    const { product, images } = productDetail.detail
    let hasMore = discussions.discussions.length >= pagination.limit

    if (!productDetail.isFound) return null
    return (
      <Content style={{paddingBottom: 0}}>
        <Notification
          type={notification.type}
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
                        <MyImage src={images[0] && images[0].file} alt='pict' />
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
                discussions.discussions.length < 1
                ? null
                : <InfiniteScroll
                  pageStart={0}
                  loadMore={_.debounce(this.handleLoadMore.bind(this), 500)}
                  hasMore={hasMore}
                  loader={<Loading size={12} color='#ef5656' className='is-fullwidth has-text-centered' />}>
                  {
                      discussions.discussions.map((discussion, index) => {
                        let createDate = moment.unix(discussion.created_at).format('Do MMMM YY')
                        let sttNewDisscussion = this.isAddNewDiscussion && index === 0
                        return (
                          <li
                            className={` ${sttNewDisscussion && ''}`}
                            key={discussion.id}
                            onClick={() => {
                              Router.push(`/discussion-detail?id=${product.id}&idd=${discussion.id}`)
                            }}>
                            <div className={`box is-paddingless ${sttNewDisscussion && 'effect-slide-down'}`}>
                              <article className={`media`}>
                                <div className='media-left'>
                                  <figure className='image user-pict'>
                                    <MyImage src={discussion.user.photo} alt='pict' />
                                  </figure>
                                </div>
                                <div className='media-content'>
                                  <div className='content'>
                                    <p className='user-name'>
                                      <strong>{discussion.user.name} {discussion.id} </strong>
                                      <span className='date-discuss'>{ createDate }</span>
                                      { discussion.question}
                                    </p>
                                  </div>
                                </div>
                              </article>
                              <a className='comment-count'><span className='icon-comment' /> { discussion.count_comments } komentar</a>
                            </div>
                          </li>
                        )
                      })
                    }
                </InfiniteScroll>
              }
            </ul>
          </div>
        </Section>
        <a
          className='sticky-button' style={{ position: 'fixed' }}
          onClick={() => {
            Router.push(`/discussion-new?id=${product.id}`)
          }}>
          <span className='icon-comment-sticky' />
        </a>
      </Content>
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

export default connect(mapStateToProps)(Discussion)
