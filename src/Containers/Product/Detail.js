import React, { Component } from 'react'
import { connect } from 'react-redux'
import NProgress from 'nprogress'
import Router from 'next/router'
import { animateScroll } from 'react-scroll'
// components
import Content from '../../Components/Content'
import Notification from '../../Components/Notification'
// actions
import * as productActions from '../../actions/product'
import * as userActions from '../../actions/user'
// containers
import { Navbar } from '../Navbar'
import ProductDetailItem from './DetailItem'
import ProductDetailInformation from './DetailInformation'
import ProductDetailReview from './DetailReview'
import ProductDetailServices from './DetailServices'
import ProductDetailRule from './DetailRule'
import ProductDetailSuggestions from './DetailSuggestions'
import ProductDetailNavBottom from './DetailNavBottom'

class ProductDetail extends Component {
  constructor (props) {
    super(props)
    this.state = {
      id: props.query.id || null,
      productDetail: props.productDetail || null,
      submiting: false,
      submitingDiscussion: false,
      notification: {
        status: false,
        message: 'Error, default message.'
      }
    }

    this.submiting = {
      favorite: false,
      productDetail: false
    }
  }
  /** reset scroll */
  scrollToTop () {
    animateScroll.scrollTo(0, {duration: 0})
  }

  componentDidMount () {
    const { id } = this.state
    this.scrollToTop()
    NProgress.start()
    this.submiting = { ...this.submiting, productDetail: true }
    this.props.getProduct({ id })
  }

  componentWillReceiveProps (nextProps) {
    const { productDetail, favorite } = nextProps

    const { isFetching, isFound, isError, notifError } = this.props
    const nextId = nextProps.query.id
    /** get detail store  */
    if (!isFetching(productDetail) && this.submiting.productDetail) {
      NProgress.done()
      this.submiting = { ...this.submiting, productDetail: false }
      if (isError(productDetail)) {
        this.setState({ notification: notifError(productDetail.message) })
      }
      if (isFound(productDetail)) {
        this.setState({ productDetail })
        if (String(productDetail.detail.product.id) !== String(nextId)) {
          NProgress.start()
          this.props.getProduct({ id: nextId })
        }
      }
    }

    /** delete/add favorite store  */
    if (!isFetching(favorite) && this.submiting.favorite) {
      this.submiting = { ...this.submiting, favorite: false }
      if (isError(favorite)) {
        this.setState({ notification: notifError(favorite.message) })
      }
      if (isFound(favorite)) {
        let isFavorite = productDetail.detail.store.is_favorite
        productDetail.detail.store.is_favorite = !isFavorite
        this.setState({ productDetail })
      }
    }

    /** load new product when route change */
    let oldId = this.props.query.id
    let newId = nextProps.query.id
    if (oldId !== newId) {
      NProgress.start()
      this.submiting = { ...this.submiting, productDetail: true }
      this.props.getProduct({ id: newId })
    }
  }

  async wishlistPress (id) {
    let { productDetail } = this.state
    if (this.props.isLogin) {
      productDetail.detail.other_products.map((product) => {
        if (product.id === id) {
          (product.is_liked) ? product.count_like -= 1 : product.count_like += 1
          product.is_liked = !product.is_liked
        }
      })
      await this.props.addToWishlist({ id })
      this.setState({ productDetail })
    } else {
      this.props.alertLogin()
    }
  }

  notification (notification) {
    this.setState({ notification })
  }

  purchaseNow () {
    if (this.props.isLogin) {
      this.setState({ submiting: !this.state.submiting })
      Router.push(`/purchase?id=${this.state.id}`)
    } else {
      this.props.alertLogin()
    }
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

  favoritePress () {
    if (this.props.isLogin) {
      const { store } = this.state.productDetail.detail
      this.submiting = { ...this.submiting, favorite: true }
      this.props.favoriteStore({ id: store.id })
    } else {
      this.props.alertLogin()
    }
  }

  render () {
    const { productDetail, notification, submiting, submitingDiscussion } = this.state
    const { query } = this.props
    const { detail } = productDetail
    const params = {
      navbar: {
        searchBoox: false,
        path: '/',
        textPath: 'Produk Detail'
      },
      moreButton: true,
      productId: productDetail.isFound && detail.product.id,
      share: {
        link: detail.share_link,
        title: productDetail.isFound && detail.product.name
      }
    }
    return (
      <Content>
        <Navbar {...params} />
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
                {...this.props}
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
                {...this.props}
                location={detail.location}
                product={detail.product}
                storeData={detail.store} />
              <ProductDetailRule
                product={detail.product}
                store={detail.store}
                location={detail.location}
                favoritePress={() => this.favoritePress()} />
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
  productDetail: state.productDetail,
  favorite: state.favorite
})

const mapDispatchToProps = (dispatch) => ({
  getProduct: (params) => dispatch(productActions.getProduct(params)),
  addToWishlist: (params) => dispatch(productActions.addToWishlist(params)),
  favoriteStore: (params) => dispatch(userActions.favoriteStore(params))
})

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail)
