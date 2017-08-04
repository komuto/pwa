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
import { Status } from '../Services/Status'
// lib
import RupiahFormat from '../Lib/RupiahFormat'

class Discussion extends Component {
  constructor (props) {
    super(props)
    this.state = {
      id: props.query.id || null,
      productDetail: props.productDetail || null,
      discussions: props.discussions || null,
      newDiscussion: props.newDiscussion || null,
      fetching: false,
      hasMore: true,
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
    let { notification } = this.state
    let stateDiscussions = this.state.discussions

    // console.log(stateDiscussions)
    console.log(discussions)

    notification = {status: false, message: 'Error, default message.'}

    if (nextDiscuss.isFound && (nextDiscuss.discussion.id !== beforeDiscuss.discussion.id)) {
      console.log(stateDiscussions)
      console.log(discussions)
      // discussions.discussions = stateDiscussions.discussions.splice(0, 0, nextDiscuss.discussion)
      // this.setState({ discussions, notification: {type: 'is-success', status: true, message: 'Berhasil mengirim diskusi'} })
    } else if (nextDiscuss.status === Status.OFFLINE || nextDiscuss.status === Status.FAILED) {
      this.setState({ notification: {type: 'is-danger', status: true, message: nextDiscuss.message} })
    }

    if (!productDetail.isLoading) {
      NProgress.done()
      switch (productDetail.status) {
        case Status.SUCCESS :
          if (!productDetail.isFound) notification = {type: 'is-danger', status: true, message: 'Data produk tidak ditemukan'}
          break
        case Status.OFFLINE :
        case Status.FAILED :
          notification = {type: 'is-danger', status: true, message: productDetail.message}
          break
        default:
          break
      }
      this.setState({ productDetail, notification })
    }

    if (!discussions.isLoading) {
      NProgress.done()
      let hasMore = false
      switch (discussions.status) {
        case Status.SUCCESS :
          if (discussions.isFound) {
            hasMore = discussions.discussions.length > 0
            // jika page di state kurang dari page di props maka data discussion di tambahkan
            // if ((stateDiscussions.meta.page < discussions.meta.page) && discussions.discussions.length > 0) {
            //   discussions.discussions = stateDiscussions.discussions.concat(discussions.discussions)
            // } else {
            //   discussions.discussions = stateDiscussions.discussions
            // }
          } else {
            notification = {type: 'is-danger', status: true, message: 'Data produk tidak ditemukan'}
          }
          break
        case Status.OFFLINE :
        case Status.FAILED :
          notification = {type: 'is-danger', status: true, message: discussions.message}
          break
        default:
          break
      }
      this.setState({ fetching: false, hasMore, discussions, notification })
    }
  }

  render () {
    const { productDetail, discussions, notification } = this.state
    const { product, images } = productDetail.detail
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
                        <MyImage src={images[0].file} alt='pict' />
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
                  hasMore={this.state.hasMore}
                  loader={<Loading size={12} color='#ef5656' className='is-fullwidth has-text-centered' />}>
                  {
                      discussions.discussions.map((discussion, index) => {
                        moment.locale('id')
                        let createDate = moment.unix(discussion.created_at).format('Do MMMM YY')
                        return (
                          <li
                            key={discussion.id}
                            onClick={() => {
                              Router.push(`/discussion-detail?id=${product.id}&idd=${discussion.id}`)
                            }}>
                            <div className='box is-paddingless'>
                              <article className='media'>
                                <div className='media-left'>
                                  <figure className='image user-pict'>
                                    <MyImage src={discussion.user.photo} alt='pict' />
                                  </figure>
                                </div>
                                <div className='media-content'>
                                  <div className='content'>
                                    <p className='user-name'>
                                      <strong>{discussion.user.name}</strong>
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
