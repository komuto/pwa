/**
 * Safei Muslim
 * Yogyakarta , revamp: 16 Oktober 2017
 * PT Skyshi Digital Indonesa
 */

/** including dependencies */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import Link from 'next/link'
import NProgress from 'nprogress'
import Router from 'next/router'
import url from 'url'
import { animateScroll } from 'react-scroll'
import { StickyContainer, Sticky } from 'react-sticky'
/** including components */
import Slider from 'react-slick'
import Content from '../Components/Content'
import Section, { SectionTitle } from '../Components/Section'
import Notification from '../Components/Notification'
import Product from '../Components/Product'
// import ProductContainers from '../Components/ProductContainers'
import MyImage from '../Components/MyImage'
import Header from './Header'
/** including actions */
import * as homeActions from '../actions/home'
import * as productActions from '../actions/product'
import * as cartActions from '../actions/cart'
import * as otherActions from '../actions/other'
/** including themes */
// import Images from '../Themes/Images'

import Menu from '../Config/Menu'
import Tabbar from '../Containers/Tabbar'
import { Navbar, SearchBoox } from '../Containers/Navbar'

class Home extends Component {
  constructor (props) {
    super(props)

    let textPath = ''

    if (props.tempMarketplace.code === 200) {
      const { data } = props.tempMarketplace
      textPath = data.name
    }
    this.state = {
      textPath,
      products: props.products || null,
      countCart: props.countCart || null,
      category: props.category || null,
      notification: props.notification,
      banners: props.banners,
      isLogin: null,
      width: 0,
      height: 0
    }
    this.submitting = {
      products: false,
      category: false,
      addWishlist: false,
      countCart: false,
      banners: false
    }
    this.wishlistId = null
    this.params = {sort: 'newest', page: 1, limit: 6}
  }

  /** reset scroll */
  scrollToTop () {
    animateScroll.scrollTo(0, {duration: 0})
  }

  /** handling wishlist / love button press  */
  wishlistPress (id) {
    if (this.props.isLogin) {
      this.wishlistId = id
      this.submitting = { ...this.submitting, addWishlist: true }
      this.props.addToWishlist({ id })
    } else {
      this.props.alertLogin()
    }
  }

  handleResize () {
    this.setState({
      width: window.innerWidth,
      height: window.innerHeight
    })
  }

  componentDidMount () {
    this.scrollToTop()
    NProgress.start()
    this.submitting = { ...this.submitting, products: true, category: true }
    this.props.getProducts(this.params)
    this.props.getCategoryList()
    if (this.props.isLogin) {
      this.submitting = { ...this.submitting, countCart: true }
      this.props.getCountCart()
    }

    const { banners } = this.state
    if (!banners.isFound) {
      this.submitting = { ...this.submitting, banners: true }
      this.props.getBanner()
    }

    // bind window resize listeners
    this._handleResize = this.handleResize.bind(this)
    this._handleResize()
    window.addEventListener('resize', this._handleResize)
  }

  componentWillUnmount () {
    // clean up listeners
    window.removeEventListener('resize', this._handleResize)
  }

  componentWillReceiveProps (nextProps) {
    let { products, addWishlist, category, countCart, banners } = nextProps
    let { isFetching, isError, isFound, notifError } = this.props
    /** handling state get banners */
    if (!isFetching(banners) && this.submitting.banners) {
      this.submitting = { ...this.submitting, banners: false }
      if (isError(banners)) {
        this.setState({ notification: notifError(banners.message) })
      }
      if (isFound(banners)) {
        this.setState({ banners })
      }
    }

    /** handling state set wishlist */
    if (!isFetching(addWishlist) && this.submitting.addWishlist) {
      this.submitting = { ...this.submitting, addToWishlist: false }
      if (isError(addWishlist)) {
        this.setState({ notification: notifError(addWishlist.message) })
      }
      if (isFound(addWishlist)) {
        products.products.some((product) => {
          if (product.product.id === this.wishlistId) {
            product.product.is_liked = addWishlist.wishlist.is_liked
            if (addWishlist.wishlist.is_liked) {
              product.product.count_like += 1
            } else {
              product.product.count_like -= 1
            }
            return true
          }
        })
        this.wishlistId = null
        this.setState({ addWishlist, products })
      }
    }

    /** handling state get product */
    if (!isFetching(products) && this.submitting.products) {
      this.submitting = { ...this.submitting, products: false }
      if (isError(products)) {
        this.setState({ notification: notifError(products.message) })
      }
      if (isFound(products)) {
        this.setState({ products })
      }
    }

    /** handling state get category */
    if (!isFetching(category) && this.submitting.category) {
      this.submitting = { ...this.submitting, category: false }
      if (isError(category)) {
        this.setState({ notification: notifError(category.message) })
      }
      if (isFound(category)) {
        this.setState({ category })
      }
    }

    /** handling state get category */
    if (!isFetching(countCart) && this.submitting.countCart) {
      this.submitting = { ...this.submitting, countCart: false }
      if (isError(countCart, false)) {
        // this.setState({ notification: notifError(countCart.message) })
      }
      if (isFound(countCart)) {
        this.setState({ countCart })
      }
    }

    if (!isFetching(products) && !isFetching(category)) {
      NProgress.done()
    }
  }

  render () {
    const { textPath, notification, countCart, banners } = this.state
    const { localize, isFound } = this.props
    let params = {
      style: 'home bg-grey',
      header: {
        title: localize.home
      },
      navbar: {
        searchBoox: true,
        textPath,
        countCart: 0
      },
      tabbar: {
        active: Menu.HOME,
        isShow: true
      }
    }

    if (isFound(countCart)) {
      params.navbar.countCart = countCart.cartCount
    }

    return (
      <Content style={{ height: '100%', width: '100%', position: 'absolute' }}>
        <Header {...this.props} {...params} />
        <Content className={`main ${params.style}`}>
          <Navbar {...this.props} {...params} />
          <StickyContainer>
            <Sticky>
              {
                ({ isSticky, wasSticky, style, distanceFromTop, distanceFromBottom, calculatedHeight }) => {
                  return <SearchBoox sbStyle={style} isSticky={isSticky} {...this.props} />
                }
              }
            </Sticky>
            <Notification
              type={notification.type}
              isShow={notification.status}
              activeClose
              onClose={() => this.setState({notification: {status: false, message: ''}})}
              message={notification.message} />
            { banners.isFound && <SliderContent {...this.props} {...this.state} /> }
            <CategoryContent {...this.props} {...this.state} />
            <ProductContent {...this.props} {...this.state} wishlistPress={(id) => this.wishlistPress(id)} />
            { (params.tabbar) && <Tabbar {...this.props} {...params} /> }
          </StickyContainer>
        </Content>
      </Content>
    )
  }
}

/** define slider content */
const SliderContent = ({ sliders, banners, height, width }) => {
  const hasBanner = banners.data.length > 0
  // window.location.replace(banner.link)
  const listImages = banners.data.map((banner, index) => (
    <div onClick={() => Router.push(`/product-detail?id=${banner.product_id}`)} key={index} style={{ width, height: height / 3, backgroundImage: `url(${banner.image})`, backgroundPosition: 'center', backgroundSize: 'cover' }} />
  ))
  return (
    <Section>
      <Content className='slide-banner'>
        {
          hasBanner &&
          <Slider {...sliders}>
            { listImages }
          </Slider>
        }
      </Content>
    </Section>
  )
}

/** define category content */
const CategoryContent = ({ localize, category }) => (
  <Content>
    <Section>
      <SectionTitle title={localize.product_category} />
      <Content className='columns is-mobile is-multiline custom bg-white'>
        {
          category.categories.map((category, index) => {
            if (index > 5) return null
            return (
              <div
                className={`column is-one-third image-categories effect-display`}
                key={index}
                onClick={() => {
                  Router.push(
                    url.format({
                      pathname: '/product',
                      query: {id: category.id}
                    }),
                    `/p/${category.slug}?id=${category.id}`
                  )
                }} >
                <div className='has-text-centered'>
                  <MyImage src={category.icon} alt={category.name} />
                  <p> {category.name} </p>
                </div>
              </div>
            )
          })
        }
        <Content className='column is-paddingless no-flex'>
          <Content className='see-all'>
            <Link href='categories1' as='c'><a><span className='link'>{localize.product_category_all} <span className='icon-arrow-right' /></span></a></Link>
          </Content>
        </Content>
      </Content>
    </Section>
  </Content>
)

/** define product content */
const ProductContent = ({ localize, products, wishlistPress }) => (
  <Section>
    <SectionTitle title={localize.product_new} />
    <Content className='columns is-mobile is-multiline custom'>
      {
        products.products.map((myProduct) => {
          return (
            <Product
              key={myProduct.product.id}
              {...myProduct}
              viewActive='grid'
              wishlistPress={(id) => wishlistPress(id)} />
          )
        })
      }
      <Content className='column is-paddingless'>
        <Content className='see-all'>
          <a
            onClick={() => {
              Router.push(
                url.format({
                  pathname: '/product',
                  query: {sort: 'newest'}
                }),
                `/p?sort=newest`
              )
            }}>
            <span className='link'>{localize.product_new_all} <span className='icon-arrow-right' /></span>
          </a>
        </Content>
      </Content>
    </Content>
  </Section>
)

/** define defaultProps  */
Home.defaultProps = {
  sliders: {
    infinite: true,
    autoplay: true,
    dots: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  }
}

const mapStateToProps = (state) => ({
  products: state.products,
  category: state.category,
  addWishlist: state.addWishlist,
  countCart: state.countCart,
  tempMarketplace: state.tempMarketplace,
  banners: state.getBanner
})

const mapDispatchToProps = (dispatch) => ({
  getProducts: (params) => dispatch(homeActions.products(params)),
  getCategoryList: () => dispatch(homeActions.categoryList()),
  addToWishlist: (params) => dispatch(productActions.addToWishlist(params)),
  getCountCart: (params) => dispatch(cartActions.countCart()),
  getBanner: (params) => dispatch(otherActions.getBanner())
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
