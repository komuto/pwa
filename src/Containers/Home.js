// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import Link from 'next/link'
import NProgress from 'nprogress'
import Router from 'next/router'
import url from 'url'
// components
import Slider from 'react-slick'
import Content from '../Components/Content'
import Section, { SectionTitle } from '../Components/Section'
import Notification from '../Components/Notification'
import Product from '../Components/Product'
import ProductContainers from '../Components/ProductContainers'
import MyImage from '../Components/MyImage'
// actions
import * as homeActions from '../actions/home'
import * as productActions from '../actions/product'
// themes
import Images from '../Themes/Images'
// import Wrapper from './Wrapper'

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

  async wishlistPress (id) {
    let { products } = this.state
    if (this.props.isLogin) {
      this.submitting = {
        ...this.submitting,
        addToWishlist: true
      }
      products.products.map((myProduct) => {
        if (myProduct.product.id === id) {
          myProduct.product.is_liked ? myProduct.product.count_like -= 1 : myProduct.product.count_like += 1
          myProduct.product.is_liked = !myProduct.product.is_liked
        }
      })
      await this.props.addToWishlist({ id })
      this.setState({ products })
    } else {
      this.props.alertLogin()
    }
  }

  async componentDidMount () {
    const { products, category } = this.state
    if (!products.isFound) {
      NProgress.start()
      this.submitting = {
        ...this.submitting,
        products: true
      }
      await this.props.getProducts(this.params)
    }
    if (!category.isFound) {
      NProgress.start()
      this.submitting = {
        ...this.submitting,
        category: true
      }
      this.props.getCategoryList()
    }
  }

  async componentWillReceiveProps (nextProps) {
    const { products, addWishlist, category } = nextProps
    const { isFetching, isError, isFound, notifError } = this.props

    // handling state set wishlist
    if (!isFetching(addWishlist) && this.submitting.addWishlist) {
      this.submitting = { ...this.submitting, addToWishlist: false }
      if (isError(addWishlist)) {
        this.setState({ notification: notifError(addWishlist.message) })
      }
      if (isFound(addWishlist)) {
        this.setState({ addWishlist })
      }
    }

    // handling state get product
    if (!isFetching(products) && this.submitting.products) {
      this.submitting = { ...this.submitting, products: false }
      if (isError(products)) {
        this.setState({ notification: notifError(products.message) })
      }
      if (isFound(products)) {
        this.setState({ products })
      }
    }

    // handling state get category
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

  renderProductColoumn (viewActive, products) {
    return (
      <ProductContainers>
        {
          products.map((myProduct) => {
            return (
              <Product
                key={myProduct.product.id}
                {...myProduct}
                viewActive={viewActive}
                wishlistPress={(id) => this.wishlistPress(id)} />
            )
          })
        }
      </ProductContainers>
    )
  }

  render () {
    const { category, products, notification } = this.state
    const { localize } = this.props
    let settings = {
      autoplay: true,
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    }
    return (
      <Content>
        <Notification
          type='is-danger'
          isShow={notification.status}
          activeClose
          onClose={() => this.setState({notification: {status: false, message: ''}})}
          message={notification.message} />
        <Section>
          <Content className='slide-banner'>
            <Slider {...settings}>
              <img src={Images.banner} alt='banner' style={{width: '100%'}} />
              <img src={Images.banner} alt='banner' style={{width: '100%'}} />
              <img src={Images.banner} alt='banner' style={{width: '100%'}} />
            </Slider>
          </Content>
        </Section>
        <Section>
          <SectionTitle title={localize.product_category} />
          <Content className='columns is-mobile is-multiline custom'>
            {
              category.isFound &&
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
                      <MyImage src={category.icon} />
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
        <Section>
          <SectionTitle title={localize.product_new} />
          <Content className='columns is-mobile is-multiline custom'>
            { products.isFound && this.renderProductColoumn('grid', products.products) }
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
      </Content>
    )
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
// export default connect(mapStateToProps)(Home)
