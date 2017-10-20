/**
 * Safei Muslim
 * Yogyakarta , 17 Oktober 2017
 * PT Skyshi Digital Indonesa
 */

/** including dependencies */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import NProgress from 'nprogress'
// import Router from 'next/router'
// import { animateScroll } from 'react-scroll'
// import moment from 'moment'
/** including component */
// import Comment from '../../Components/Comment'
import Content from '../../Components/Content'
// import { ButtonFullWidth } from '../../Components/Button'
// import Section from '../../Components/Section'
import Notification from '../../Components/Notification'
import MyImage from '../../Components/MyImage'
// import Card, { WrapperMedia, WrapperMediaColoumn, WrapperInfo } from '../../Components/Card'
// import { Navbar, Navtab } from '../Navbar'
/** including actions */
import * as transactionActions from '../../actions/transaction'
/** including custom lib */
// import RupiahFormat from '../../Lib/RupiahFormat'
/** including validations */
// import * as validations from '../../Validations/Input'
/** including themes */
// import Images from '../../Themes/Images'

class Review extends Component {
  constructor (props) {
    super(props)
    this.state = {
      id: props.query.id || null,
      buyerComplainedOrderDetail: props.buyerComplainedOrderDetail || null,
      notification: props.notification
    }
    this.submitting = {
      buyerComplainedOrderDetail: false
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
          <BuyerReviewContent {...this.state} />
        }
      </Content>
    )
  }

  componentDidMount () {
    NProgress.start()
    let { id } = this.state
    this.submitting = { ...this.submitting, buyerComplainedOrderDetail: true }
    this.props.getComplainedOrderDetailBuyer({ id })
  }

  componentWillReceiveProps (nextProps) {
    const { buyerComplainedOrderDetail } = nextProps
    console.log('buyerComplainedOrderDetail: ', buyerComplainedOrderDetail)
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
  }
}

const BuyerReviewContent = ({ buyerComplainedOrderDetail }) => (
  <Content>
    <ProductRefund {...buyerComplainedOrderDetail.orderDetail} />
    <ProductReview {...buyerComplainedOrderDetail.orderDetail} />
  </Content>
)

const ProductRefund = ({ dispute_products }) => (
  <section className='section is-paddingless has-shadow'>
    <div className='container is-fluid'>
      <div className='title'>
        <br />
        <h3>Daftar Barang yang di refund</h3>
      </div>
    </div>
    {
      dispute_products.map((product, index) => (
        <div className='info-purchase space-left'>
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
              <strong className='text-green'><span className='icon-success-saldo' />Refund</strong>
            </div>
          </div>
        </div>
      ))
    }
  </section>
)

const ProductReview = ({ fine_products }) => (
  <section className='section is-paddingless has-shadow'>
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
              <h3>Kualitas Produk</h3>
              <span className='star-rating'>
                <input type='radio' name='rating' value='1' /><i />
                <input type='radio' name='rating' value='2' /><i />
                <input type='radio' name='rating' value='3' /><i />
                <input type='radio' name='rating' value='4' /><i />
                <input type='radio' name='rating' value='5' /><i />
              </span>

              <span className='review-result'>Bagus</span>
            </div>
          </div>
        </div>
        <div className='columns detail-rating is-mobile is-multiline no-margin-bottom'>
          <div className='column'>
            <div className='rating-content is-left'>
              <h3>Akurasi Produk</h3>
              <span className='star-rating'>
                <input type='radio' name='rating' value='1' /><i />
                <input type='radio' name='rating' value='2' /><i />
                <input type='radio' name='rating' value='3' /><i />
                <input type='radio' name='rating' value='4' /><i />
                <input type='radio' name='rating' value='5' /><i />
              </span>

              <span className='review-result'>Bagus</span>
            </div>
          </div>
        </div>
        <br />
        <div className='field'>
          <p className='control'>
            <input className='input' type='text' placeholder='Apa pendapat Anda tentang barang ini?' />
          </p>
        </div>
      </form>
    </div>
  </section>
)

const mapStateToProps = (state) => ({
  buyerComplainedOrderDetail: state.buyerComplainedOrderDetail
})

const mapDispatchToProps = (dispatch) => ({
  getComplainedOrderDetailBuyer: (params) => dispatch(transactionActions.getComplainedOrderDetailBuyer(params))
})

export default connect(mapStateToProps, mapDispatchToProps)(Review)
