import React, { Component } from 'react'
import { connect } from 'react-redux'
import NProgress from 'nprogress'
import Router from 'next/router'
// import swal from 'sweetalert2'
// components
import Content from '../Components/Content'
import Notification from '../Components/Notification'
// actions
import * as productActions from '../actions/product'
// services
import { Status } from '../Services/Status'
import GET_TOKEN from '../Services/GetToken'
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
      token: null,
      submiting: false,
      submitingDiscussion: false,
      notification: {
        status: false,
        message: 'Error, default message.'
      }
    }
  }

  async componentDidMount () {
    const { id, productDetail } = this.state
    if (!productDetail.isFound || (productDetail.isFound && String(productDetail.detail.product.id) !== String(id))) {
      NProgress.start()
      await this.props.getProduct({ id })
    }
    this.setState({ token: await GET_TOKEN.getToken() })
  }

  async componentWillReceiveProps (nextProps) {
    const { productDetail } = nextProps
    const nextId = nextProps.query.id

    if (!productDetail.isLoading) {
      NProgress.done()
      switch (productDetail.status) {
        case Status.SUCCESS :
          (productDetail.isFound)
          ? this.setState({ productDetail })
          : this.setState({ notification: {status: true, message: 'Data produk tidak ditemukan'} })

          if (String(productDetail.detail.product.id) !== String(nextId)) {
            NProgress.start()
            await this.props.getProduct({ id: nextId })
          }

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

  async wishlistPress (id) {
    let { productDetail, token } = this.state
    if (token) {
      productDetail.detail.other_products.map((product) => {
        if (product.id === id) {
          (product.is_liked) ? product.count_like -= 1 : product.count_like += 1
          product.is_liked = !product.is_liked
        }
      })
      await this.props.addToWishlist({ id })
      this.setState({ productDetail })
    } else {
      this.setState({notification: {status: true, message: 'Anda harus login'}})
    }
  }

  notification = (message) => this.setState({notification: {status: true, message: message}})

  purchaseNow () {
    this.setState({ submiting: !this.state.submiting })
    Router.push(`/purchase?id=${this.state.id}`)
  }

  discussion () {
    this.setState({ submitingDiscussion: !this.state.submitingDiscussion })
    Router.push(`/discussion?id=${this.state.id}`)
  }

  selectProductDropshipper () {
    const { id } = this.state
    this.setState({ submiting: !this.state.submiting })
    Router.push(`/catalog-add-product?id=${id}&commission=${this.props.query.commission}`)
  }

  render () {
    const { productDetail, notification, token, submiting, submitingDiscussion } = this.state
    const { query } = this.props
    const { detail } = productDetail
    const navbar = {
      searchBoox: false,
      path: '/',
      textPath: 'Produk Detail',
      moreButton: true,
      productId: productDetail.isFound && detail.product.id
    }

    console.log(productDetail)
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
                token={token}
                images={detail.images}
                product={detail.product}
                rating={detail.rating}
                notification={(message) => this.notification(message)}
                commission={query.commission} />
              <ProductDetailInformation
                product={detail.product}
                category={detail.category} />
              <ProductDetailReview
                product={detail.product}
                reviews={detail.reviews} />
              <ProductDetailServices
                product={detail.product}
                storeData={detail.store} />
              <ProductDetailRule
                store={detail.store}
                location={detail.location} />
              <ProductDetailSuggestions
                products={detail.other_products}
                store={detail.store}
                wishlistPress={(id) => this.wishlistPress(id)} />
              <ProductDetailNavBottom
                {...detail.product}
                purchaseNow={() => this.purchaseNow()}
                discussion={() => this.discussion()}
                selectProductDropshipper={() => this.selectProductDropshipper()}
                submitingDiscussion={submitingDiscussion}
                submiting={submiting}
                query={query} />
              </Content>
          }

      </Content>
    )
  }
}

const mapStateToProps = (state) => ({
  productDetail: state.productDetail
})

const mapDispatchToProps = (dispatch) => ({
  getProduct: (params) => dispatch(productActions.getProduct(params)),
  addToWishlist: (params) => dispatch(productActions.addToWishlist(params))
})

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail)
