/**
 * Safei Muslim
 * Yogyakarta , 12 Oktober 2017
 * PT Skyshi Digital Indonesa
 */

/** including dependencies */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import Router from 'next/router'
import moment from 'moment'
import NProgress from 'nprogress'
import _ from 'lodash'
import InfiniteScroll from 'react-infinite-scroller'

/** including component */
import Content from '../../Components/Content'
import Notification from '../../Components/Notification'
import MyImage from '../../Components/MyImage'
import MyRating from '../../Components/MyRating'
import Loading from '../../Components/Loading'
import Images from '../../Themes/Images'
/** including actions */
import * as reviewActions from '../../actions/review'

class Discussion extends Component {
  constructor (props) {
    super(props)
    this.state = {
      sellerReview: {
        data: props.sellerReview || null,
        hasMore: false,
        isEmpty: false,
        loadMore: () => this.productReviewLoadMore(),
        params: {
          page: 1,
          limit: 10
        }
      },
      notification: props.notification
    }
    this.submitting = {
      sellerReview: false
    }
    moment.locale('id')
  }

  render () {
    let { sellerReview, notification } = this.state
    let { isFound } = this.props
    return (
      <Content>
        <Notification
          type={notification.type}
          isShow={notification.status}
          activeClose
          onClose={() => this.setState({notification: {status: false, message: ''}})}
          message={notification.message} />
        { isFound(sellerReview.data) &&
            sellerReview.isEmpty
            ? <EmptyContent />
            : <ProductReviewContent {...this.state} />
        }
      </Content>
    )
  }

  componentDidMount () {
    NProgress.start()
    let { params } = this.state.sellerReview
    this.submitting = { ...this.submitting, sellerReview: true }
    this.props.getSellerReview(params)
  }

  componentWillReceiveProps (nextProps) {
    const { sellerReview } = nextProps
    const { isFetching, isError, isFound, notifError } = this.props

    /** handling seller review message */
    if (!isFetching(sellerReview) && this.submitting.sellerReview) {
      NProgress.done()
      this.submitting = { ...this.submitting, sellerReview: false }
      if (isError(sellerReview)) {
        this.setState({ notification: notifError(sellerReview.message) })
      }
      if (isFound(sellerReview)) {
        let isEmpty = sellerReview.sellerReview.length < 1
        let hasMore = sellerReview.sellerReview.length > 9
        let tam = sellerReview.sellerReview.concat(this.state.sellerReview.data.sellerReview)
        sellerReview.sellerReview = tam
        this.setState({ sellerReview: { ...this.state.sellerReview, data: sellerReview, hasMore, isEmpty } })
      }
    }
  }

  productReviewLoadMore () {
    let { sellerReview } = this.state
    if (!this.submitting.sellerReview) {
      this.submitting = { ...this.submitting, sellerReview: true }
      sellerReview.params.page += 1
      this.props.getSellerReview(sellerReview.params)
      this.setState({ sellerReview })
    }
  }
}

const ProductReviewContent = ({ sellerReview }) => (
  <InfiniteScroll
    pageStart={0}
    loadMore={_.debounce(sellerReview.loadMore, 500)}
    hasMore={sellerReview.hasMore}
    loader={<Loading size={12} color='#ef5656' className='is-fullwidth has-text-centered' />}>
    {
      sellerReview.data.sellerReview.map((sellerReview, index) =>
        <List key={index} sellerReview={sellerReview} />
      )
    }
  </InfiniteScroll>
)

const EmptyContent = () => (
  <section className='content'>
    <div className='container is-fluid'>
      <div className='desc has-text-centered'>
        <MyImage src={Images.review} alt='Diskusi kosong' />
        <br />
        <br />
        <p><strong className='bold'>Review Anda Kosong</strong></p>
        <p>Anda belum pernah meninggalkan review untuk barang manapun</p>
      </div>
    </div>
  </section>
)

const List = ({ sellerReview }) => {
  let reviewDate = moment.unix(sellerReview.created_at).format('MM/DD/YYYY')
  let longDay = moment().diff(reviewDate, 'days')
  return (
    <section className='section is-paddingless'>
      <div className='profile-content rating'>
        <div className='profile-wrapp is-paddingless'>
          <ul className='detail-seller left-margin'>
            <li>
              <div className='box is-paddingless'>
                <article className='media'>
                  <div className='media-left is-bordered'>
                    <figure className='image'>
                      <MyImage src={sellerReview.user.photo} alt='pict' />
                    </figure>
                  </div>
                  <div className='media-content'>
                    <div className='content'>
                      <p>
                        <strong> {sellerReview.user.name} </strong>
                        <br />
                        <span>{ longDay > 30 ? reviewDate : longDay + ' hari yang lalu' }</span>
                      </p>
                    </div>
                  </div>
                </article>
              </div>
            </li>
            <li onClick={() => Router.push(`/product-detail?id=${sellerReview.product.id}`)}>
              <div className='box is-paddingless'>
                <article className='media'>
                  <div className='media-left is-bordered'>
                    <figure className='image'>
                      <MyImage src={sellerReview.product.image} alt='pict' />
                    </figure>
                  </div>
                  <div className='media-content'>
                    <div className='content'>
                      <p>
                        <strong>{sellerReview.product.name}</strong>
                        <br />
                        <span>{sellerReview.product.store.name}</span>
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
            <MyRating
              readonly
              initialRate={sellerReview.quality}
              start={0}
              stop={5} />
          </div>
        </div>
        <div className='column is-half'>
          <div className='rating-content is-left'>
            <h3>Akurasi Produk</h3>
            <MyRating
              readonly
              initialRate={sellerReview.accuracy}
              start={0}
              stop={5} />
          </div>
        </div>
        <div className='column'>
          <p className='desc'>{sellerReview.review}</p>
        </div>
      </div>
    </section>
  )
}

const mapStateToProps = (state) => ({
  sellerReview: state.sellerReview
})

const mapDispatchToProps = (dispatch) => ({
  getSellerReview: (params) => dispatch(reviewActions.getSellerReview(params))
})

export default connect(mapStateToProps, mapDispatchToProps)(Discussion)
