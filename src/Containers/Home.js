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
/** including components */
import Slider from 'react-slick'
import Content from '../Components/Content'
import Section, { SectionTitle } from '../Components/Section'
import Notification from '../Components/Notification'
import Product from '../Components/Product'
import ProductContainers from '../Components/ProductContainers'
import MyImage from '../Components/MyImage'
/** including actions */
import * as homeActions from '../actions/home'
import * as productActions from '../actions/product'
/** including themes */
import Images from '../Themes/Images'

class Home extends Component {
  constructor (props) {
    super(props)
    this.state = {
      products: props.products || null,
      category: props.category || null,
      notification: props.notification
    }
    this.submitting = {
      products: false,
      category: false,
      addWishlist: false
    }
    this.wishlistId = null
    this.params = {sort: 'newest', page: 1, limit: 6}
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

  componentDidMount () {
    NProgress.start()
    this.submitting = { ...this.submitting, products: true, category: true }
    this.props.getProducts(this.params)
    this.props.getCategoryList()
  }

  componentWillReceiveProps (nextProps) {
    let { products, addWishlist, category } = nextProps
    let { isFetching, isError, isFound, notifError } = this.props
    // console.log(products)
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

    if (!isFetching(products) && !isFetching(category)) {
      NProgress.done()
    }
  }

  render () {
    const { notification } = this.state
    return (
      <Content>
        <Notification
          type='is-danger'
          isShow={notification.status}
          activeClose
          onClose={() => this.setState({notification: {status: false, message: ''}})}
          message={notification.message} />
        <SliderContent {...this.props} />
        <CategoryContent {...this.props} {...this.state} />
        <ProductContent {...this.props} {...this.state} />
      </Content>
    )
  }
}

/** define slider content */
const SliderContent = ({sliders}) => (
  <Section>
    <Content className='slide-banner'>
      <Slider {...sliders}>
        <img src={Images.banner} alt='banner' style={{width: '100%'}} />
        <img src={Images.banner} alt='banner' style={{width: '100%'}} />
        <img src={Images.banner} alt='banner' style={{width: '100%'}} />
      </Slider>
    </Content>
  </Section>
)

/** define category content */
const CategoryContent = ({ localize, category }) => (
  <Content>
    <Section>
      <SectionTitle title={localize.product_category} />
      <Content className='columns is-mobile is-multiline custom'>
        {
          category.categories.map(category => {
            return (
              <div
                className={`column is-one-third effect-display`}
                key={category.id}
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
        <Content className='column is-paddingless'>
          <Content className='see-all'>
            <Link href='categories1' as='c'><a><span className='link'>{localize.product_category_all} <span className='icon-arrow-right' /></span></a></Link>
          </Content>
        </Content>
      </Content>
    </Section>
  </Content>
)

/** define product content */
const ProductContent = ({ localize, products }) => (
  <Section>
    <SectionTitle title={localize.product_new} />
    <Content className='columns is-mobile is-multiline custom'>
      {
        <ProductContainers>
          {
            products.products.map((myProduct) => {
              return (
                <Product
                  key={myProduct.product.id}
                  {...myProduct}
                  viewActive='grid'
                  wishlistPress={(id) => this.wishlistPress(id)} />
              )
            })
          }
        </ProductContainers>
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
    autoplay: true,
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  }
}

const mapStateToProps = (state) => ({
  products: state.products,
  category: state.category,
  addWishlist: state.addWishlist
})

const mapDispatchToProps = (dispatch) => ({
  getProducts: (params) => dispatch(homeActions.products(params)),
  getCategoryList: () => dispatch(homeActions.categoryList()),
  addToWishlist: (params) => dispatch(productActions.addToWishlist(params))
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
