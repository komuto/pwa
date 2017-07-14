import React, { Component } from 'react'
import { connect } from 'react-redux'
import NProgress from 'nprogress'

// components
import Content from '../Components/Content'
import Notification from '../Components/Notification'
// actions
import * as productActions from '../actions/product'
// services
import { Status } from '../Services/Status'
// containers
import { Navbar } from './Navbar'
import ProductDetailItem from './ProductDetailItem'
import ProductDetailInformation from './ProductDetailInformation'
import ProductDetailReview from './ProductDetailReview'
import ProductDetailServices from './ProductDetailServices'
import ProductDetailRule from './ProductDetailRule'
import ProductDetailSuggestions from './ProductDetailSuggestions'
import ProductDetailNavBottom from './ProductDetailNavBottom'

class ProductDetail extends Component {
  constructor (props) {
    super(props)
    this.state = {
      id: props.query.id || null,
      productDetail: props.productDetail || null,
      notification: {
        status: false,
        message: 'Error, default message.'
      }
    }
  }

  async componentDidMount () {
    const { id, productDetail } = this.state
    if (!productDetail.isFound) {
      NProgress.start()
      await this.props.dispatch(productActions.getProduct({ id }))
    } else if (productDetail.isFound && productDetail.detail.product.id !== id) {
      NProgress.start()
      await this.props.dispatch(productActions.getProduct({ id }))
    }
  }

  componentWillReceiveProps (nextProps) {
    const { productDetail } = nextProps
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
  }

  wishlistPress = (id) => console.log(id)
  notification = (message) => this.setState({notification: {status: true, message: message}})

  render () {
    const { productDetail, notification } = this.state
    const { detail } = productDetail
    const navbar = {
      searchBoox: false,
      path: '/',
      textPath: 'Produk Detail'
    }

    return (
      <Content>
        <Navbar params={navbar} />
        <Notification
          type='is-danger'
          isShow={notification.status}
          activeClose
          onClose={() => this.setState({notification: {status: false, message: ''}})}
          message={notification.message} />
        {
            productDetail.isFound &&
            <Content>
              <ProductDetailItem
                images={detail.images}
                product={detail.product}
                rating={detail.rating}
                notification={(message) => this.notification(message)} />
              <ProductDetailInformation
                product={detail.product}
                category={detail.category} />
              <ProductDetailReview
                product={detail.product}
                reviews={detail.reviews} />
              <ProductDetailServices
                product={detail.product} />
              <ProductDetailRule
                store={detail.store} />
              <ProductDetailSuggestions
                products={detail.other_products}
                store={detail.store}
                wishlistPress={(id) => this.wishlistPress(id)} />
              <ProductDetailNavBottom />
              </Content>
          }

      </Content>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    productDetail: state.productDetail
  }
}

export default connect(mapStateToProps)(ProductDetail)
