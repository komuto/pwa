import React, { Component } from 'react'
import { connect } from 'react-redux'
import NProgress from 'nprogress'
import _ from 'lodash'
// components
import MyRating from '../Components/MyRating'
import Content from '../Components/Content'
import Images from '../Themes/Images'
import Notification from '../Components/Notification'
import InfiniteScroll from 'react-infinite-scroller'
import Loading from '../Components/Loading'
// actions
import * as reviewActions from '../actions/review'
// services
import { validateResponse, isFetching } from '../Services/Status'

class ReviewProducts extends Component {
  constructor (props) {
    super(props)
    this.state = {
      buyerReview: props.buyerReview || null,
      pagination: {
        page: 1,
        limit: 10
      },
      hasMore: true,
      notification: {
        status: false,
        message: 'Error, default message.'
      }
    }
    this.fetching = false
    this.fetchingFirst = false
    this.afterAddComment = false
  }

  async loadMore () {
    // let { pagination } = this.state
    if (!this.fetching) {
      // const newState = { pagination }
      // pagination['page'] = pagination.page + 1
      // this.setState(newState)
      // await this.props.getBuyerReview(pagination)
    }
  }

  async componentDidMount () {
    const { buyerReview, pagination } = this.state
    if (!buyerReview.isFound) {
      NProgress.start()
      // this.fetchingFirst = true
      this.props.getBuyerReview(pagination)
    }
  }

  componentWillReceiveProps (nextProps) {
    const { buyerReview } = nextProps

    if (!isFetching(buyerReview)) {
      NProgress.done()
      this.setState({ buyerReview, notification: validateResponse(buyerReview, 'Data review tidak ditemukan!') })
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
    console.log('state', this.state)
    const { buyerReview, notification, hasMore } = this.state
    if (!buyerReview.isFound) return null
    return (
      <Content>
        <Notification
          type='is-danger'
          isShow={notification.status}
          activeClose
          onClose={() => this.setState({notification: {status: false, message: ''}})}
          message={notification.message} />
        <InfiniteScroll
          pageStart={0}
          loadMore={_.debounce(this.loadMore.bind(this), 500)}
          hasMore={hasMore}
          loader={<Loading size={12} color='#ef5656' className='is-fullwidth has-text-centered' />}>
          {
          buyerReview.buyerReview.length > 0
          ? buyerReview.buyerReview.map((review, i) => {
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
                                <img src={review.product.image} alt='pict' />
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
        : <EmptyReview />
        }
        </InfiniteScroll>
      </Content>
    )
  }
}

const EmptyReview = () => {
  return (
    <div className='container is-fluid'>
      <div className='desc has-text-centered'>
        <img src={Images.emptyStatesReview} alt='komuto' />
        <br /><br />
        <p><strong className='bold'>Review Anda Kosong</strong></p>
        <p>Anda belum pernah meninggalkan review untuk barang manapun</p>
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
