/**
 * Safei Muslim
 * Yogyakarta , 17 Oktober 2017
 * PT Skyshi Digital Indonesa
 */

/** including dependencies */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import NProgress from 'nprogress'
import Router from 'next/router'
/** including component */
import Content from '../../Components/Content'
import Notification, { FieldError } from '../../Components/Notification'
import MyImage from '../../Components/MyImage'
import MyRating from '../../Components/MyRating'
/** including actions */
import * as transactionActions from '../../actions/transaction'

class Review extends Component {
  constructor (props) {
    super(props)
    this.state = {
      id: props.query.id || null,
      buyerComplainedOrderDetail: props.buyerComplainedOrderDetail || null,
      addReviews: {
        data: props.addReviews || null,
        onSelectQuality: (v, p) => this.onSelectQuality(v, p),
        onSelectAccuracy: (v, p) => this.onSelectAccuracy(v, p),
        onChangeNote: (v, p) => this.onChangeNote(v, p),
        submit: () => this.submitReview()
      },
      notification: props.notification
    }
    this.submitting = {
      buyerComplainedOrderDetail: false,
      addReviews: false
    }
  }

  render () {
    const { buyerComplainedOrderDetail, notification } = this.state
    const { isFound } = this.props

    return (
      <Content>
        <Notification
          type={notification.type}
          isShow={notification.status}
          activeClose
          onClose={() => this.setState({notification: {status: false, message: ''}})}
          message={notification.message} />
        {
          isFound(buyerComplainedOrderDetail) &&
          <BuyerReviewContent {...this.state} submitting={this.submitting} />
        }
      </Content>
    )
  }

  onSelectQuality (value, myProduct) {
    let { buyerComplainedOrderDetail } = this.state
    buyerComplainedOrderDetail.orderDetail.fine_products.map((product) => {
      if (myProduct.id === product.id) {
        product.quality = value
      }
    })
    this.setState({ buyerComplainedOrderDetail })
  }

  onSelectAccuracy (value, myProduct) {
    let { buyerComplainedOrderDetail } = this.state
    buyerComplainedOrderDetail.orderDetail.fine_products.map((product) => {
      if (myProduct.id === product.id) {
        product.accuracy = value
      }
    })
    this.setState({ buyerComplainedOrderDetail })
  }

  onChangeNote (e, myProduct) {
    e.preventDefault()
    let { buyerComplainedOrderDetail } = this.state
    let { value } = e.target
    buyerComplainedOrderDetail.orderDetail.fine_products.map((product) => {
      if (myProduct.id === product.id) {
        product.note = value
      }
    })
    this.setState({ buyerComplainedOrderDetail })
  }

  submitReview () {
    let { buyerComplainedOrderDetail } = this.state
    let { id } = buyerComplainedOrderDetail.orderDetail
    let error = false
    buyerComplainedOrderDetail.orderDetail.fine_products.some((product) => {
      if (!product.quality) {
        product.error = 'quality'
        error = true
        return true
      } else if (!product.accuracy) {
        product.error = 'accuracy'
        error = true
        return true
      } else if (!product.note || product.note === '') {
        product.error = 'note'
        error = true
        return true
      } else {
        return false
      }
    })

    if (error) {
      this.setState({ buyerComplainedOrderDetail })
      return
    }

    let data = []
    buyerComplainedOrderDetail.orderDetail.fine_products.map((product) => {
      data.push({
        'product_id': product.id,
        'review': product.note,
        'quality': product.quality,
        'accuracy': product.accuracy
      })
    })
    NProgress.start()
    this.submiting = { ...this.submiting, addReviews: true }
    this.props.setAddReviews({ id, data })
  }

  componentDidMount () {
    NProgress.start()
    let { id } = this.state
    this.submitting = { ...this.submitting, buyerComplainedOrderDetail: true }
    this.props.getComplainedOrderDetailBuyer({ id })
  }

  componentWillReceiveProps (nextProps) {
    const { buyerComplainedOrderDetail, addReviews } = nextProps
    const { isFetching, isFound, isError, notifError } = this.props
    /** handling state buyerComplainedOrderDetail  */
    if (!isFetching(buyerComplainedOrderDetail) && this.submitting.buyerComplainedOrderDetail) {
      NProgress.done()
      this.submitting = { ...this.submitting, buyerComplainedOrderDetail: false }
      if (isError(buyerComplainedOrderDetail)) {
        this.setState({ notification: notifError(buyerComplainedOrderDetail.message) })
      }
      if (isFound(buyerComplainedOrderDetail)) {
        this.setState({ buyerComplainedOrderDetail })
      }
    }

    if (!isFetching(addReviews) && this.submiting.addReviews) {
      NProgress.done()
      this.submitting = { ...this.submitting, addReviews: false }
      if (isError(addReviews)) {
        this.setState({ notification: notifError(addReviews.message) })
      }
      if (isFound(addReviews)) {
        Router.back()
      }
    }
  }
}

const BuyerReviewContent = ({ buyerComplainedOrderDetail, addReviews, submitting }) => (
  <Content>
    <ProductRefund {...buyerComplainedOrderDetail.orderDetail} />
    <ProductReview
      {...buyerComplainedOrderDetail.orderDetail}
      addReviews={addReviews}
      submitting={submitting} />
  </Content>
)

const ProductRefund = ({ solution, dispute_products }) => (
  <section className='section is-paddingless has-shadow'>
    <div className='container is-fluid'>
      <div className='title'>
        <br />
        <h3>Daftar Barang yang di refund</h3>
      </div>
    </div>
    {
      dispute_products.map((product, index) => (
        <div key={index} className='info-purchase space-left'>
          <div className='box'>
            <div className='media'>
              <div className='media-left is-bordered'>
                <figure className='image list-transaction sm'>
                  <a><MyImage src={product.image} alt={product.name} /></a>
                </figure>
              </div>
              <div className='media-content middle'>
                <div className='content'>
                  <h4>{product.name}</h4>
                </div>
              </div>
            </div>
            <div className='right-middle rightMargin'>
              <strong className='text-green'><span className='icon-success-saldo' />{ solution === 1 ? 'Refund' : 'Exchange' }</strong>
            </div>
          </div>
        </div>
      ))
    }
  </section>
)

const ProductReview = ({ fine_products, addReviews, submitting }) => (
  <Content>
    {
      fine_products.map((product, index) => (
        <section key={index} className='section is-paddingless has-shadow'>
          <div className='edit-data-delivery bg-white'>
            <div className='box'>
              <div className='media'>
                <div className='media-left is-bordered'>
                  <figure className='image list-transaction'>
                    <a><MyImage src='../images/thumb.jpg' alt='Image' /></a>
                  </figure>
                </div>
                <div className='media-content middle'>
                  <div className='content'>
                    <h4>Kaos Training Kit Manchester United</h4>
                  </div>
                </div>
              </div>
            </div>
            <form action='#' className='form edit'>
              <div className='columns detail-rating is-mobile is-multiline no-margin-bottom'>
                <div className='column'>
                  <div className='rating-content is-left'>
                    <h3>Kualitas Produk { product.error !== 'quality' ? '' : <FieldError /> }</h3>
                    <MyRating
                      onChange={(e) => addReviews.onSelectQuality(e, product)}
                      size={24}
                      initialRate={product.quality ? product.quality : 0}
                      start={0}
                      stop={5} />
                    <span className='review-result'>Bagus</span>
                  </div>
                </div>
              </div>
              <div className='columns detail-rating is-mobile is-multiline no-margin-bottom'>
                <div className='column'>
                  <div className='rating-content is-left'>
                    <h3>Akurasi Produk { product.error !== 'accuracy' ? '' : <FieldError /> }</h3>
                    <MyRating
                      onChange={(e) => addReviews.onSelectAccuracy(e, product)}
                      size={24}
                      initialRate={product.accuracy ? product.accuracy : 0}
                      start={0}
                      stop={5} />
                    <span className='review-result'>Bagus</span>
                  </div>
                </div>
              </div>
              <br />
              <div className='field'>
                <p className='control'>
                  { product.error !== 'note' ? '' : <FieldError /> }
                  <input onChange={(e) => addReviews.onChangeNote(e, product)} className={`input`} type='text' placeholder='Apa pendapat Anda tentang barang ini?' />
                </p>
              </div>
            </form>
          </div>
        </section>
      ))
    }
    <section className='section is-paddingless'>
      <div className='container is-fluid'>
        <a onClick={() => !submitting.addReviews && addReviews.submit()} className={`button is-primary is-large is-fullwidth ${submitting.addReviews ? 'is-loading' : ''}`} >Kirim Ulasan</a>
      </div>
    </section>
  </Content>
)

const mapStateToProps = (state) => ({
  buyerComplainedOrderDetail: state.buyerComplainedOrderDetail,
  addReviews: state.buyerReceived
})

const mapDispatchToProps = (dispatch) => ({
  getComplainedOrderDetailBuyer: (params) => dispatch(transactionActions.getComplainedOrderDetailBuyer(params)),
  // setAddReviews: (params) => console.log('params: ', params)
  setAddReviews: (params) => dispatch(transactionActions.buyerDisputeReceived(params))
})

export default connect(mapStateToProps, mapDispatchToProps)(Review)
