import React, { Component } from 'react'
import { connect } from 'react-redux'
import NProgress from 'nprogress'
import _ from 'lodash'
import InfiniteScroll from 'react-infinite-scroller'
// components
import Section from '../../Components/Section'
import Notification from '../../Components/Notification'
import MyImage from '../../Components/MyImage'
import ReviewItem from '../../Components/ReviewItem'
import Loading from '../../Components/Loading'
// actions
import * as reviewActions from '../../actions/review'
import * as productActions from '../../actions/product'
// lib
import RupiahFormat from '../../Lib/RupiahFormat'

class Reviews extends Component {
  constructor (props) {
    super(props)
    this.state = {
      id: props.query.id || null,
      reviews: props.reviews || null,
      productDetail: props.productDetail || null,
      fetching: false,
      hasMore: false,
      pagination: {
        page: 1,
        limit: 10
      },
      notification: {
        status: false,
        message: 'Error, default message.'
      }
    }

    this.submitting = {
      productDetail: false,
      reviews: false
    }
  }

  componentDidMount () {
    const { id, productDetail } = this.state
    NProgress.start()
    if (!productDetail.isFound || (productDetail.isFound && String(productDetail.detail.product.id) !== String(id))) {
      this.submitting = { ...this.submitting, productDetail: true }
      this.props.getProduct({ id })
    }
    this.submitting = { ...this.submitting, reviews: true }
    this.props.listReviews({ id, ...this.state.pagination })
  }

  handleLoadMore () {
    let { id, pagination } = this.state
    if (!this.submitting.reviews) {
      pagination.page += 1
      this.submitting = { ...this.submitting, reviews: true }
      this.props.listReviews({ id, ...this.state.pagination })
      this.setState({ pagination })
    }
  }

  componentWillReceiveProps (nextProps) {
    const { isFetching, isFound, isError, notifError } = this.props
    let { reviews, productDetail } = nextProps

    if (!isFetching(productDetail) && this.submitting.productDetail) {
      this.submitting = { ...this.submitting, productDetail: false }
      if (isError(productDetail)) {
        this.setState({ notification: notifError(productDetail.message) })
      }
      if (isFound(productDetail)) {
        this.setState({ productDetail })
      }
    }

    if (!isFetching(reviews) && this.submitting.reviews) {
      NProgress.done()
      this.submitting = { ...this.submitting, reviews: false }
      if (isError(reviews)) {
        this.setState({ notification: notifError(reviews.message) })
      }
      if (isFound(reviews)) {
        let hasMore = reviews.reviews.length > 8
        let tam = this.state.reviews.reviews.concat(reviews.reviews)
        reviews.reviews = tam
        this.setState({ reviews, hasMore })
      }
    }
  }

  render () {
    const { reviews, productDetail, notification } = this.state
    const { product, images } = productDetail.detail
    const { isFound } = this.props
    return (
      <Section>
        <Notification
          type='is-danger'
          isShow={notification.status}
          activeClose
          onClose={() => this.setState({notification: {status: false, message: ''}})}
          message={notification.message} />
        {
          isFound(productDetail) &&
            <div className='discuss'>
              <ul className='product-discuss' style={{ backgroundColor: '#fff' }}>
                <li>
                  <div className='box is-paddingless'>
                    <article className='media'>
                      <div className='media-left'>
                        {/* <figure className='image product-pict' style={{ width: 40, height: 40 }}> */}
                        <figure className='image product-pict'>
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
            </div>
        }
        {
          isFound(reviews) &&
            <InfiniteScroll
              pageStart={0}
              loadMore={_.debounce(this.handleLoadMore.bind(this), 500)}
              hasMore={this.state.hasMore}
              loader={<Loading size={12} color='#ef5656' className='is-fullwidth has-text-centered' />}>
              { reviews.reviews.map((review, index) => { return <ReviewItem {...review} key={review.id} /> }) }
            </InfiniteScroll>
        }
      </Section>
    )
  }
}

const mapStateToProps = (state) => ({
  productDetail: state.productDetail,
  reviews: state.productReview
})

const mapDispatchToProps = (dispatch) => ({
  getProduct: (params) => dispatch(productActions.getProduct(params)),
  listReviews: (params) => dispatch(reviewActions.listReviews(params))
})

export default connect(mapStateToProps, mapDispatchToProps)(Reviews)
