import React, { Component } from 'react'
import { connect } from 'react-redux'
import NProgress from 'nprogress'
import _ from 'lodash'
import InfiniteScroll from 'react-infinite-scroller'
// components
import Section from '../Components/Section'
import Notification from '../Components/Notification'
import MyImage from '../Components/MyImage'
import ReviewItem from '../Components/ReviewItem'
import Loading from '../Components/Loading'
// actions
import * as reviewActions from '../actions/review'
import * as productActions from '../actions/product'
// services
import { Status } from '../Services/Status'
// lib
import RupiahFormat from '../Lib/RupiahFormat'

class Reviews extends Component {
  constructor (props) {
    super(props)
    this.state = {
      id: props.query.id || null,
      reviews: props.reviews || null,
      productDetail: props.productDetail || null,
      fetching: false,
      hasMore: true,
      pagination: {
        page: 1,
        limit: 10
      },
      notification: {
        status: false,
        message: 'Error, default message.'
      }
    }
  }

  async componentDidMount () {
    const { id, productDetail } = this.state
    NProgress.start()
    if (!productDetail.isFound || (productDetail.isFound && String(productDetail.detail.product.id) !== String(id))) {
      NProgress.start()
      await this.props.dispatch(productActions.getProduct({ id }))
    }
    await this.props.dispatch(reviewActions.listReviews({ id, ...this.state.pagination }))
  }

  async handleLoadMore () {
    let { id, pagination, fetching } = this.state
    if (!fetching) {
      pagination.page += 1
      await this.props.dispatch(reviewActions.listReviews({ id, ...this.state.pagination }))
      this.setState({ pagination, fetching: true })
    }
  }

  componentWillReceiveProps (nextProps) {
    const { reviews, productDetail } = nextProps
    const stateReviews = this.state.reviews

    if (!productDetail.isLoading) {
      NProgress.done()
      switch (productDetail.status) {
        case Status.SUCCESS :
          (productDetail.isFound)
          ? this.setState({ productDetail })
          : this.setState({ notification: {status: true, message: 'Data produk tidak ditemukan'} })
          break
        case Status.OFFLINE :
        case Status.FAILED :
          this.setState({ notification: {status: true, message: productDetail.message} })
          break
        default:
          break
      }
    }

    if (!reviews.isLoading) {
      NProgress.done()
      switch (reviews.status) {
        case Status.SUCCESS :
          if (reviews.isFound) {
            let hasMore = reviews.reviews.length > 0
            // jika page di state kurang dari page di props maka data reviews di tambahkan
            if ((stateReviews.meta.page < reviews.meta.page) && reviews.reviews.length > 0) {
              reviews.reviews = stateReviews.reviews.concat(reviews.reviews)
            } else {
              reviews.reviews = stateReviews.reviews
            }
            // reviews.reviews = this.state.reviews.reviews.concat(reviews.reviews)
            this.setState({ fetching: false, hasMore, reviews })
          } else {
            this.setState({ notification: {status: true, message: 'Data reviews tidak ditemukan'} })
          }
          break
        case Status.OFFLINE :
        case Status.FAILED :
          this.setState({ notification: {status: true, message: reviews.message} })
          break
        default:
          break
      }
    }
  }

  render () {
    const { reviews, productDetail, notification } = this.state
    const { product, images } = productDetail.detail
    if (!productDetail.isFound) return null
    return (
      <Section>
        <Notification
          type='is-danger'
          isShow={notification.status}
          activeClose
          onClose={() => this.setState({notification: {status: false, message: ''}})}
          message={notification.message} />
        {
            productDetail.isFound &&
            <div className='discuss'>
              <ul className='product-discuss' style={{ backgroundColor: '#fff' }}>
                <li>
                  <div className='box is-paddingless'>
                    <article className='media'>
                      <div className='media-left'>
                        <figure className='image product-pict' style={{ width: 40, height: 40 }}>
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
              </div>
          }
        {
            reviews.reviews.length > 0 &&
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

const mapStateToProps = (state) => {
  return {
    productDetail: state.productDetail,
    reviews: state.productReview
  }
}

export default connect(mapStateToProps)(Reviews)
