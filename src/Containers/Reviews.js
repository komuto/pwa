import React, { Component } from 'react'
import { connect } from 'react-redux'
import NProgress from 'nprogress'
// components
import Section from '../Components/Section'
import Notification from '../Components/Notification'
import MyImage from '../Components/MyImage'
import ReviewItem from '../Components/ReviewItem'
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
      notification: {
        status: false,
        message: 'Error, default message.'
      }
    }
  }

  async componentDidMount () {
    const { id, productDetail } = this.state
    await this.props.dispatch(reviewActions.getReview({ id, page: 1, limit: 10 }))
    if (!productDetail.isFound) {
      // fetch product when isFound false
      NProgress.start()
      await this.props.dispatch(productActions.getProduct({ id }))
    } else if (productDetail.isFound && productDetail.detail.product.id !== id) {
      // fetch product when isFound true but product id is different
      NProgress.start()
      await this.props.dispatch(productActions.getProduct({ id }))
    }
  }

  componentWillReceiveProps (nextProps) {
    const { reviews, productDetail } = nextProps

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
          (reviews.isFound)
          ? this.setState({ reviews })
          : this.setState({ notification: {status: true, message: 'Data reviews tidak ditemukan'} })
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
              <ul className='product-discuss'>
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
            reviews.isFound && reviews.reviews.map((review) => { return <ReviewItem {...review} key={review.id} /> })
          }
      </Section>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    productDetail: state.productDetail,
    reviews: state.review
  }
}

export default connect(mapStateToProps)(Reviews)
