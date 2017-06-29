// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import Link from 'next/link'
import {Images} from '../Themes'
import NProgress from 'nprogress'
// lib
import RupiahFormat from '../Lib/RupiahFormat'
// components
import Slider from 'react-slick'
// actions
import * as homeActions from '../actions/home'

class Home extends Component {
  constructor (props) {
    super(props)
    this.state = {
      products: props.products || null,
      category: props.category || null
    }
  }

  async componentWillMount () {
    const { products, category } = this.state
    if (products && category) {
      NProgress.start()
      await this.props.dispatch(homeActions.products({sort: 'newest'})) && this.props.dispatch(homeActions.categoryList())
    }
  }

  componentWillReceiveProps (nextProps) {
    const { products, category } = nextProps

    if (!products.isLoading) {
      this.setState({ products })
    }

    if (!category.isLoading) {
      this.setState({ category })
    }

    if (!products.isLoading && !category.isLoading) {
      NProgress.done()
    }
  }

  receiveData (data, state = '') {
    switch (data.status) {
      case 200:
        this.setState({state: data})
        break
      case 400:
        break
      default:
        break
    }
  }

  render () {
    const { categories } = this.state.category
    const { products } = this.state.products

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
          <div className='column is-one-third' key={category.id}>
            <div className='has-text-centered'>
              <img src={category.icon} />
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
                    <a><img src={product.images[0].file} alt='Image' /></a>
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
      <div>
        <section className='section is-paddingless'>
          <div className='slide-banner'>
            <Slider {...settings}>
              <img src={Images.banner} alt='banner' style={{width: '100%'}} />
              <img src={Images.banner} alt='banner' style={{width: '100%'}} />
              <img src={Images.banner} alt='banner' style={{width: '100%'}} />
            </Slider>
          </div>
        </section>
        <section className='section is-paddingless'>
          <div className='container is-fluid'>
            <div className='title'>
              <h3>Kategori Produk</h3>
            </div>
          </div>
          <div className='columns is-mobile is-multiline custom'>
            { categoryItem }
            <div className='column is-paddingless'>
              <div className='see-all'>
                <Link href='categories1'><a><span className='link'>Lihat semua kategori <span className='icon-arrow-right' /></span></a></Link>
              </div>
            </div>
          </div>
        </section>
        <section className='section is-paddingless'>
          <div className='container is-fluid'>
            <div className='title'>
              <h3>Produk Terbaru</h3>
            </div>
          </div>
          <div className='columns is-mobile is-multiline custom'>
            { productItem }
            <div className='column is-paddingless'>
              <div className='see-all'>
                <Link href='product-new'><a><span className='link'>Lihat semua produk terbaru <span className='icon-arrow-right' /></span></a></Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    products: state.products,
    category: state.category,
    subCategory: state.subCategory
  }
}

export default connect(mapStateToProps)(Home)
