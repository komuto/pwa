/**
 * Safei Muslim
 * Yogyakarta , revamp => 16 Oktober 2017
 * PT Skyshi Digital Indonesa
 */

 /** including dependencies */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import NProgress from 'nprogress'
import Router from 'next/router'
import moment from 'moment'
import _ from 'lodash'
import InfiniteScroll from 'react-infinite-scroller'
/** including components */
import Section from '../../Components/Section'
import Content from '../../Components/Content'
import MyImage from '../../Components/MyImage'
import Notification from '../../Components/Notification'
import Loading from '../../Components/Loading'
/** including actions */
import * as productActions from '../../actions/product'
/** including services */
// import { validateResponse, Status } from '../../Services/Status'
/** including lib */
import RupiahFormat from '../../Lib/RupiahFormat'

class Discussion extends Component {
  constructor (props) {
    super(props)
    this.state = {
      id: props.query.id || null,
      productDetail: props.productDetail || null,
      newDiscussion: props.newDiscussion || null,
      discussions: null,
      hasMore: false,
      pagination: {
        page: 1,
        limit: 10
      },
      notification: props.notification
    }
    this.submitting = {
      productDetail: false
    }
    this.isAddNewDiscussion = false
    moment.locale('id')
  }

  componentDidMount () {
    const { id } = this.state
    NProgress.start()
    this.submitting = { ...this.submitting, discussions: true }
    this.reGetProduct()
    this.props.getDiscussion({ id, ...this.state.pagination })
  }

  reGetProduct () {
    const { id, productDetail } = this.state
    const { isFound } = this.props
    if (isFound(productDetail)) {
      NProgress.start()
      if (String(productDetail.detail.product.id) !== String(id)) {
        this.getProduct(id)
      }
    } else {
      this.getProduct(id)
    }
  }

  getProduct (id) {
    NProgress.start()
    this.submitting = { ...this.submitting, productDetail: true }
    this.props.getProduct({ id })
  }

  async handleLoadMore () {
    if (!this.submitting.discussions) {
      let { id, pagination } = this.state
      pagination.page += 1
      this.submitting = { ...this.submitting, discussions: true }
      await this.props.getDiscussion({ id, ...this.state.pagination })
      this.setState({ pagination })
    }
  }

  addNewDiscussion () {
    if (this.props.isLogin) {
      let { id } = this.state
      Router.push(
        `/discussion?type=new&id=${id}`,
        `/discussion/new?id=${id}`
      )
    } else {
      this.props.alertLogin()
    }
  }

  componentWillReceiveProps (nextProps) {
    const { productDetail, discussions, newDiscussion } = nextProps
    const { isFetching, isError, isFound, notifError, notifSuccess } = this.props

    /** handling state product detail */
    if (!isFetching(productDetail) && this.submitting.productDetail) {
      this.submitting = { ...this.submitting, productDetail: false }
      if (isError(productDetail)) {
        this.setState({ notification: notifError(productDetail.message) })
      }
      if (isFound(productDetail)) {
        this.setState({ productDetail })
      }
    }

    /** handling state new discussion */
    if (!isFetching(newDiscussion)) {
      if (isError(newDiscussion)) {
        this.setState({ notification: notifError(newDiscussion.message) })
      }
      if (isFound(newDiscussion)) {
        this.isAddNewDiscussion = true
        this.props.resetDiscussion()
        discussions.discussions.unshift(newDiscussion.discussion)
        this.setState({ notification: notifSuccess(newDiscussion.message) })
        if (this.timeout) clearTimeout(this.timeout)
        this.timeout = setTimeout(() => {
          this.setState({ notification: { ...this.state.notification, status: false } })
        }, 3000)
      }
    }

    /** handling state discussions */
    if (!isFetching(discussions) && this.submitting.discussions) {
      NProgress.done()
      this.submitting = { ...this.submitting, discussions: false }
      if (isError(discussions)) {
        this.setState({ notification: notifError(discussions.message) })
      }
      if (isFound(discussions)) {
        let hasMore = (discussions.discussions.length > 8)
        if (this.state.discussions) {
          let tam = this.state.discussions.discussions.concat(discussions.discussions)
          discussions.discussions = tam
        }
        this.setState({ discussions, hasMore })
      }
    }
  }

  render () {
    const { notification } = this.state
    const { isFound } = this.props

    return (
      <Content style={{paddingBottom: 0}}>
        <Notification
          type={notification.type}
          isShow={notification.status}
          activeClose
          onClose={() => this.setState({notification: {status: false, message: ''}})}
          message={notification.message} />
        {
          <Content>
            <DiscussionContent
              {...this.state}
              isFound={isFound}
              isAddNewDiscussion={this.isAddNewDiscussion}
              handleLoadMore={() => this.handleLoadMore()} />
            <NewDiscussionContent addNewDiscussion={() => this.addNewDiscussion()} />
          </Content>
        }
      </Content>
    )
  }
}

const DiscussionContent = ({ isFound, productDetail, discussions, pagination, hasMore, handleLoadMore, isAddNewDiscussion }) => (
  <Section>
    <div className='discuss gap'>
      {
        isFound(productDetail) && <DetailProduct {...productDetail.detail} />
      }
      <ul className='main-discuss' style={{ paddingTop: 15 }}>
        {
          discussions && isFound(discussions) && discussions.discussions.length > 0 &&
          <InfiniteScroll
            pageStart={0}
            loadMore={_.debounce(handleLoadMore.bind(this), 500)}
            hasMore={hasMore}
            loader={<Loading size={12} color='#ef5656' className='is-fullwidth has-text-centered' />}>
            {
              discussions.discussions.map((discussion, index) => {
                let createDate = moment.unix(discussion.created_at).format('Do MMMM YY')
                let sttNewDisscussion = isAddNewDiscussion && index === 0
                return <ListDiscussion
                  key={index}
                  {...productDetail.detail}
                  sttNewDisscussion={sttNewDisscussion}
                  discussion={discussion}
                  createDate={createDate} />
              })
            }
          </InfiniteScroll>
        }
      </ul>
    </div>
  </Section>
)

const DetailProduct = ({ product, images }) => (
  <ul className='product-discuss is-fixed' style={{ zIndex: 2, marginBottom: '15px' }}>
    <li>
      <div className='box is-paddingless'>
        <article className='media'>
          <div className='media-left'>
            {/* <figure className='image product-pict' style={{ width: 40 }}> */}
            <figure className='image product-pict'>
              <MyImage src={images[0] && images[0].file} alt={product.name} />
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
)

const ListDiscussion = ({ sttNewDisscussion, product, discussion, createDate }) => (
  <li
    className={` ${sttNewDisscussion && ''}`}
    key={discussion.id}
    onClick={() => {
      Router.push(
        `/discussion?type=detail&id=${product.id}&idd=${discussion.id}`,
        `/discussion/detail?id=${product.id}&idd=${discussion.id}`
      )
    }}>
    <div className={`box is-paddingless ${sttNewDisscussion && 'effect-display'}`}>
      <article className={`media`}>
        <div className='media-left top'>
          <figure className='image user-pict'>
            <MyImage src={discussion.user.photo} alt={discussion.user.name} />
          </figure>
        </div>
        <div className='media-content'>
          <div className='content'>
            <p className='user-name'>
              <strong>{discussion.user.name} </strong>
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

const NewDiscussionContent = ({ addNewDiscussion }) => (
  <a
    className='sticky-button' style={{ position: 'fixed' }}
    onClick={() => addNewDiscussion()}>
    <span className='icon-comment-sticky' />
  </a>
)

const mapStateToProps = (state) => ({
  productDetail: state.productDetail,
  discussions: state.discussions,
  newDiscussion: state.newDiscussion
})

const mapDispatchToProps = (dispatch) => ({
  getDiscussion: (params) => dispatch(productActions.getDiscussion(params)),
  resetDiscussion: (params) => dispatch(productActions.resetDiscussion(params)),
  getProduct: (params) => dispatch(productActions.getProduct(params))
})

export default connect(mapStateToProps, mapDispatchToProps)(Discussion)
