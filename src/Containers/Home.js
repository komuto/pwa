// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import Link from 'next/link'
import {Images} from '../Themes'
import NProgress from 'nprogress'
import Router from 'next/router'
import url from 'url'
// lib
import RupiahFormat from '../Lib/RupiahFormat'
// components
import Slider from 'react-slick'
import Content from '../Components/Content'
import Section, { SectionTitle } from '../Components/Section'
import Notification from '../Components/Notification'
// actions
import * as homeActions from '../actions/home'
// Utils
import { Status } from '../Services/Status'

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
  }

  async componentDidMount () {
    const { products } = this.state.products
    const { categories } = this.state.category
    if (products.length < 1 && categories.length < 1) {
      NProgress.start()
      await this.props.dispatch(homeActions.products({sort: 'newest'})) && this.props.dispatch(homeActions.categoryList())
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

  render () {
    const { categories } = this.state.category
    const { products } = this.state.products
    const { notification } = this.state

    let categoryItem = null
    let productItem = null
    let settings = {
      autoplay: true,
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    }

    if (categories.length > 0) {
      categoryItem = categories.map(category => {
        return (
          <div
            className='column is-one-third'
            key={category.id}
            onClick={() => {
              Router.push(
                url.format({
                  pathname: '/categories2',
                  query: {id: category.id}
                }),
                `/c/${category.slug}/${category.id}`
              )
            }} >
            <div className='has-text-centered'>
              {/* <img src={category.icon} /> */}
              <span className='icon-computer' />
              <p> {category.name} </p>
            </div>
          </div>
        )
      })
    }

    if (products.length > 0) {
      productItem = products.map(product => {
        return (
          <div className='column is-half' key={product.product.id}>
            <div className='box grid'>
              <div className='media'>
                <div className='media-left'>
                  <figure className='image'>
                    {/* <a><img src={product.images[0].file} alt='Image' /></a> */}
                    <a><img src='http://lorempixel.com/400/200/sports/' alt='Image' /></a>
                    { (product.product.discount > 0) ? <div className='pin disc'><span> { product.product.discount }%</span></div> : null }
                    { (product.product.is_wholesaler) ? <div className='pin'><span>Grosir</span></div> : null }
                  </figure>
                </div>
                <div className='media-content'>
                  <div className='content'>
                    <h4>{ product.product.name }</h4>
                    <div className='detail'>
                      <p>GadgetArena <span className='icon-verified' /></p>
                      <div className='discount' />
                      <span className='price'> Rp { RupiahFormat(product.product.price) } </span>
                      <span className='wish'><span className='icon-wishlist wishlisted' />1200</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      })
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
          <div className='columns is-mobile is-multiline custom'>
            { categoryItem }
            <div className='column is-paddingless'>
              <div className='see-all'>
                <Link href='categories1' as='c'><a><span className='link'>Lihat semua kategori <span className='icon-arrow-right' /></span></a></Link>
              </div>
            </div>
          </div>
        </Section>
        <Section>
          <SectionTitle title='Produk Terbaru' />
          <div className='columns is-mobile is-multiline custom'>
            { productItem }
            <div className='column is-paddingless'>
              <div className='see-all'>
                <Link href='product'><a><span className='link'>Lihat semua produk terbaru <span className='icon-arrow-right' /></span></a></Link>
              </div>
            </div>
          </div>
        </Section>
      </Content>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    products: state.products,
    category: state.category
  }
}

export default connect(mapStateToProps)(Home)
