import React, { Component } from 'react'
import { connect } from 'react-redux'
import NProgress from 'nprogress'
import _ from 'lodash'
// components
import MyRating from '../../Components/MyRating'
import Content from '../../Components/Content'
import Images from '../../Themes/Images'
import Notification from '../../Components/Notification'
import InfiniteScroll from 'react-infinite-scroller'
import Loading from '../../Components/Loading'
import MyImage from '../../Components/MyImage'
// actions
import * as reviewActions from '../../actions/review'

class ReviewProducts extends Component {
  constructor (props) {
    super(props)
    this.state = {
      buyerReview: props.buyerReview || null,
      isEmpty: false,
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
    this.hasMore = false
    this.fetching = false
    this.fetchingFirst = false
    this.afterAddComment = false
  }

  async loadMore () {
    let { pagination } = this.state
    if (!this.fetching) {
      const newState = { pagination }
      pagination['page'] = pagination.page + 1
      this.setState(newState)
      this.fetching = true
      await this.props.getBuyerReview(this.state.pagination)
    }
  }

  async componentDidMount () {
    NProgress.start()
    this.fetchingFirst = true
    this.props.getBuyerReview({ page: 1, limit: 10 })
  }

  componentWillReceiveProps (nextProps) {
    const { buyerReview } = nextProps
    const { isFetching, isFound, isError, notifError } = this.props

    if (!isFetching(buyerReview) && this.fetchingFirst) {
      NProgress.done()
      this.fetchingFirst = false
      if (isFound(buyerReview)) {
        let isEmpty = buyerReview.buyerReview.length < 1
        this.hasMore = buyerReview.buyerReview.length > 9
        this.setState({ buyerReview, isEmpty })
      }
      if (isError(buyerReview)) {
        this.setState({ notification: notifError(buyerReview.message) })
      }
    }
    if (!isFetching(buyerReview) && this.fetching) {
      this.fetching = false
      if (isFound(buyerReview)) {
        let stateBuyerReview = this.state.buyerReview
        this.hasMore = buyerReview.buyerReview.length > 9
        stateBuyerReview.buyerReview = stateBuyerReview.buyerReview.concat(buyerReview.buyerReview)
        this.setState({ buyerReview: stateBuyerReview })
      }
      if (isError(buyerReview)) {
        this.setState({ notification: notifError(buyerReview.message) })
        this.hasMore = false
      }
    }
    // if (!isFetching(buyerReview) && this.fetching) {
    //   let stateBuyerReview = this.state.buyerReview
    //   this.fetching = false
    //   this.setState({ hasMore: false })
    //   if (buyerReview.resolutions.length === 0) {
    //     this.setState({ hasMore: false })
    //   } else {
    //     stateBuyerReview.buyerReview.concat(buyerReview.buyerReview)
    //     this.setState({ unresolvedResolutions: stateBuyerReview, notification: validateResponse(buyerReview, 'Data review tidak ditemukan!') })
    //   }
    // }
  }

  render () {
    const { buyerReview, isEmpty, notification } = this.state
    return (
      <Content>
        <Notification
          type={notification.type}
          isShow={notification.status}
          activeClose
          onClose={() => this.setState({notification: {status: false, message: ''}})}
          message={notification.message} />
        <InfiniteScroll
          pageStart={0}
          loadMore={_.debounce(this.loadMore.bind(this), 500)}
          hasMore={this.hasMore}
          loader={<Loading size={12} color='#ef5656' className='is-fullwidth has-text-centered' />}>
          {
          isEmpty ? <EmptyReview /> : buyerReview.buyerReview.map((review, i) => {
            return (
              <section key={i}>
                <div className='profile-content rating'>
                  <div className='profile-wrapp is-paddingless'>
                    <ul className='detail-seller left-margin'>
                      <li>
                        <div className='box is-paddingless'>
                          <article className='media'>
                            <div className='media-left is-bordered'>
                              <figure className='image'>
                                <MyImage src={review.product.image} alt='pict' />
                              </figure>
                            </div>
                            <div className='media-content'>
                              <div className='content'>
                                <p>
                                  <strong>{review.product.name}</strong>
                                  <br />
                                  <span>{review.product.store.name}</span>
                                </p>
                              </div>
                            </div>
                          </article>
                        </div>
                        <span className='icon-arrow-right' />
                      </li>
                    </ul>
                  </div>
                </div>
                <div className='columns detail-rating is-mobile is-multiline no-margin-bottom'>
                  <div className='column is-half'>
                    <div className='rating-content is-left'>
                      <h3>Kualitas Produk</h3>
                      <span className='value-rate'>{review.quality}</span>
                      <span className='star-rating'>
                        <MyRating
                          readonly
                          initialRate={review.quality}
                          start={0}
                          stop={5} />
                      </span>
                    </div>
                  </div>
                  <div className='column is-half'>
                    <div className='rating-content is-left'>
                      <h3>Akurasi Produk</h3>
                      <span className='value-rate'>{review.accuracy}</span>
                      <span className='star-rating'>
                        <MyRating
                          readonly
                          initialRate={review.accuracy}
                          start={0}
                          stop={5} />
                      </span>
                    </div>
                  </div>
                  <div className='column'>
                    <p className='desc'>{review.review}</p>
                  </div>
                </div>
              </section>
            )
          })
        }
        </InfiniteScroll>
      </Content>
    )
  }
}

const EmptyReview = () => {
  return (
    <div style={{ width: '100%', height: '100%', position: 'absolute', paddingTop: '10%' }}>
      <div className='content' style={{ paddingTop: '10%' }}>
        <div className='container is-fluid'>
          <div className='desc has-text-centered'>
            <MyImage src={Images.review} alt='komuto' />
            <br /><br />
            <p><strong className='bold' /></p>
            <p>Anda belum pernah meninggalkan review untuk barang manapun</p>
          </div>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    buyerReview: state.buyerReview
  }
}

const mapDispatchToProps = dispatch => ({
  getBuyerReview: (params) => dispatch(reviewActions.getBuyerReview(params))
})

export default connect(mapStateToProps, mapDispatchToProps)(ReviewProducts)
