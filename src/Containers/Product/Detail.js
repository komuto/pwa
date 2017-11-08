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
      productDetail: null,
      addWishlist: props.addWishlist || null,
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

    this.addWishlistId = null
    this.addWishlistType = null
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
    const { productDetail, favorite, addWishlist } = nextProps

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

    if (!isFetching(addWishlist) && this.submiting.addWishlist) {
      this.addWishlist = { ...this.addWishlist, addWishlist: false }
      if (isError(addWishlist)) {
        this.setState({ notification: notifError(addWishlist.message) })
      }
      if (isFound(addWishlist)) {
        if (this.addWishlistType === 'product_sugesstion') {
          productDetail.detail.other_products.some((product) => {
            if (product.id === this.addWishlistId) {
              (product.is_liked) ? product.count_like -= 1 : product.count_like += 1
              product.is_liked = !product.is_liked
              return true
            }
          })
        }

        if (this.addWishlistType === 'product') {
          productDetail.detail.product.is_liked = addWishlist.wishlist.is_liked
        }
        this.addWishlistType = null
        this.addWishlistId = null
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

  wishlistPress (id, status) {
    if (this.props.isLogin) {
      this.submiting = { ...this.submiting, addWishlist: true }
      this.addWishlistType = status
      this.addWishlistId = id
      this.props.addToWishlist({ id })
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
    const { isFound, query } = this.props

    const productDetailReady = productDetail && isFound(productDetail)

    let detail = null
    let productId = null
    let shareLink = null
    let productName = null

    if (productDetailReady) {
      detail = productDetail.detail
      productId = detail.product.id
      productName = detail.product.name
      shareLink = detail.share_link
    }

    const params = {
      navbar: {
        searchBoox: false,
        path: '/',
        callBack: () => Router.push('/product', '/p'),
        textPath: 'Produk Detail'
      },
      moreButton: true,
      productId: productId,
      share: {
        link: shareLink,
        title: productName
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
          productDetailReady &&
            <Content>
              <ProductDetailItem
                {...this.props}
                images={detail.images}
                product={detail.product}
                wholesaler={detail.wholesaler}
                rating={detail.rating}
                notification={(message) => this.notification(message)}
                wishlistPress={(id) => this.wishlistPress(id, 'product')}
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
                wishlistPress={(id) => this.wishlistPress(id, 'product_sugesstion')} />
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
  favorite: state.favorite,
  addWishlist: state.addWishlist
})

const mapDispatchToProps = (dispatch) => ({
  getProduct: (params) => dispatch(productActions.getProduct(params)),
  addToWishlist: (params) => dispatch(productActions.addToWishlist(params)),
  favoriteStore: (params) => dispatch(userActions.favoriteStore(params))
})

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail)
