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
// actions
import * as homeActions from '../actions/home'
import * as productActions from '../actions/product'
// services
import { Status } from '../Services/Status'
// themes
import Images from '../Themes/Images'

class Home extends Component {
  constructor (props) {
    super(props)
    this.state = {
      products: props.products || null,
      category: props.category || null,
      notification: {
        status: false,
        message: 'Error, default message.'
      }
    }
    this.params = {sort: 'newest', page: 1, limit: 6}
  }

  async wishlistPress (id) {
    await this.props.dispatch(productActions.addToWishlist({ id })) && this.props.dispatch(homeActions.products(this.params))
  }

  async componentDidMount () {
    const { products } = this.state.products
    const { categories } = this.state.category
    if (products.length < 1 && categories.length < 1) {
      NProgress.start()
      await this.props.dispatch(homeActions.products(this.params)) && this.props.dispatch(homeActions.categoryList())
    }
  }

  componentWillReceiveProps (nextProps) {
    const { products, category } = nextProps

    if (!products.isLoading) {
      switch (products.status) {
        case Status.SUCCESS :
          (products.isFound)
          ? this.setState({ products })
          : this.setState({ notification: {status: true, message: 'Data produk tidak ditemukan'} })
          break
        case Status.OFFLINE :
        case Status.FAILED :
          this.setState({ notification: {status: true, message: products.message} })
          break
        default:
          break
      }
    }

    if (!category.isLoading) {
      switch (category.status) {
        case Status.SUCCESS :
          (category.isFound)
          ? this.setState({ category })
          : this.setState({ notification: {status: true, message: 'Data kategori tidak ditemukan'} })
          break
        case Status.OFFLINE :
        case Status.FAILED :
          this.setState({ notification: {status: true, message: category.message} })
          break
        default:
          break
      }
    }

    if (!products.isLoading && !category.isLoading) NProgress.done()
  }

  renderProductColoumn (viewActive, products) {
    return (
      <ProductContainers>
        {
          products.map((myProduct) => {
            const { images, product, store } = myProduct
            return (
              <Product
                key={product.id}
                viewActive={viewActive}
                images={images}
                store={store}
                wishlistPress={(id) => this.wishlistPress(id)}
                product={product} />
            )
          })
        }
      </ProductContainers>
    )
  }

  render () {
    const { categories } = this.state.category
    const { products } = this.state.products
    const { notification } = this.state

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
          <SectionTitle title='Kategori Produk' />
          <Content className='columns is-mobile is-multiline custom'>
            {
              categories.map(category => {
                return (
                  <div
                    className='column is-one-third'
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
                      <img src={category.icon} />
                      <p> {category.name} </p>
                    </div>
                  </div>
                )
              })
            }
            <Content className='column is-paddingless'>
              <Content className='see-all'>
                <Link href='categories1' as='c'><a><span className='link'>Lihat semua kategori <span className='icon-arrow-right' /></span></a></Link>
              </Content>
            </Content>
          </Content>
        </Section>
        <Section>
          <SectionTitle title='Produk Terbaru' />
          <Content className='columns is-mobile is-multiline custom'>
            { products.length > 0 ? this.renderProductColoumn('grid', products) : '' }
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
                  <span className='link'>Lihat semua produk terbaru <span className='icon-arrow-right' /></span>
                </a>
              </Content>
            </Content>
          </Content>
        </Section>
      </Content>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    products: state.products,
    category: state.category,
    addWishlist: state.addWishlist
  }
}

export default connect(mapStateToProps)(Home)
