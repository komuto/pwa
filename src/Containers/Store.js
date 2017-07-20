import React, { Component } from 'react'
import { connect } from 'react-redux'
import NProgress from 'nprogress'
import Router from 'next/router'
import url from 'url'
import Slider from 'react-slick'
import moment from 'moment'
// component
import Content from '../Components/Content'
import Section from '../Components/Section'
import Notification from '../Components/Notification'
import MyImage from '../Components/MyImage'
import MyRating from '../Components/MyRating'
// containers
import { Navbar } from './Navbar'
// actions
import * as storeActions from '../actions/stores'
import * as productActions from '../actions/product'
// services
import { Status } from '../Services/Status'
import GET_TOKEN from '../Services/GetToken'
// lib
import RupiahFormat from '../Lib/RupiahFormat'

class Store extends Component {
  constructor (props) {
    super(props)
    this.state = {
      id: props.query.id || null,
      tab: props.query.tab || null,
      store: props.store | null,
      showListCatalog: false,
      token: null,
      tabs: {
        selected: props.query.tab || 'Produk',
        options: ['Produk', 'Profile', 'Penilaian']
      },
      boxSeller: {
        height: props.query.tab === 'Produk' ? 200 : 0,
        overflow: 'hidden',
        paddingBottom: 0,
        transition: 'height 1s'
      },
      notification: {
        status: false,
        message: 'Error, default message.'
      }
    }
  }

  async componentDidMount () {
    const { id, store } = this.state
    if (!store.isFound) {
      NProgress.start()
      await this.props.dispatch(storeActions.getStores({ id }))
    } else if (store.isFound && store.store.id !== id) {
      NProgress.start()
      await this.props.dispatch(storeActions.getStores({ id }))
    }
    this.setState({ token: await GET_TOKEN.getToken() })
  }

  favouritePress = () => console.log('favouritePress()')

  showListCatalogPress = () => { this.setState({ showListCatalog: !this.state.showListCatalog }) }

  // scrollToElement = (id) => scrollToComponent(this.Blue, { offset: 0, align: 'middle', duration: 500, ease: 'inCirc'})
  scrollToElement = (id) => console.log('scrollToElement()')

  tabSelected = (selected) => {
    Router.push(`/store?id=${this.state.id}&tab=${selected}`)
    this.setState({ tabs: {...this.state.tabs, selected}, boxSeller: {...this.state.boxSeller, height: selected === 'Produk' ? 200 : 0} })
  }

  async wishlistPress (e, id) {
    e.stopPropagation()
    let { store, token } = this.state
    if (token) {
      store.store.catalogs.map((catalog) => {
        catalog.products.map((product) => {
          if (product.id === id) {
            (product.is_liked) ? product.count_like -= 1 : product.count_like += 1
            product.is_liked = !product.is_liked
          }
        })
      })
      await this.props.dispatch(productActions.addToWishlist({ id }))
      this.setState({ store })
    } else {
      this.setState({notification: {status: true, message: 'Anda harus login'}})
    }
  }

  async componentWillReceiveProps (nextProps) {
    const { store, addWishlist } = nextProps

    if (!store.isLoading) {
      NProgress.done()
      switch (store.status) {
        case Status.SUCCESS :
          (store.isFound)
          ? this.setState({ store })
          : this.setState({ notification: {status: true, message: 'Data produk tidak ditemukan'} })
          break
        case Status.OFFLINE :
        case Status.FAILED :
          this.setState({ notification: {status: true, message: store.message} })
          break
        default:
          break
      }
    }

    if (!addWishlist.isLoading) {
      switch (addWishlist.status) {
        case Status.SUCCESS :
          (addWishlist.isFound)
          ? this.setState({ addWishlist })
          : this.setState({ notification: {status: true, message: 'Gagal menambah wishlist'} })
          break
        case Status.OFFLINE :
        case Status.FAILED :
          this.setState({ notification: {status: true, message: addWishlist.message} })
          break
        default:
          break
      }
    }
  }

  itemCatalog (product, index) {
    // set pin
    let pin = null
    if (product.is_discount) pin = <div className='pin disc'><span>{ `${product.discount}%` }</span></div>
    if (product.is_wholesaler) pin = <div className='pin'><span>Grossir</span></div>
    // set real price
    const priceBeforeDiscount = (product.discount > 0) ? <div className='discount'> Rp { RupiahFormat(product.price) } </div> : ''
    // set price - dicsount
    const priceAfterDiscount = (product.discount > 0) ? (product.price - (product.price * (product.discount / 100))) : product.price

    return (
      <div key={index} className='item'>
        <div className='column'>
          <div
            className='box grid'
            onClick={() =>
              Router.push(
                url.format({
                  pathname: '/product-detail',
                  query: {id: product.id}
                }),
                `/product-detail?id=${product.id}`
              )
            } >
            <div className='media'>
              <div className='media-left'>
                <figure className='image'>
                  <a><MyImage src={product.image} alt='Image' /></a>
                  { pin }
                </figure>
              </div>
              <div className='media-content'>
                <div className='content'>
                  <h4>{ product.name }</h4>
                  <div className='detail'>
                    { priceBeforeDiscount }
                    <span className='price'>Rp { RupiahFormat(priceAfterDiscount) } </span>
                    <span className='wish'>
                      <span style={{ zIndex: 100 }} className={`icon-wishlist ${product.is_liked ? 'wishlisted' : ''}`} onClick={(e) => this.wishlistPress(e, product.id)} />
                      { product.count_like }
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  render () {
    const { store, tabs, boxSeller, showListCatalog, notification } = this.state
    const myStore = store.store
    const navbar = {
      searchBoox: false,
      path: '/',
      textPath: store.isFound && myStore.name
    }
    let settings = {
      className: 'slider variable-width',
      dots: false,
      infinite: false,
      centerMode: false,
      slidesToShow: 1,
      slidesToScroll: 1,
      variableWidth: true
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
            store.isFound &&
              <Content>
                <Section className='section is-paddingless'>
                  <BoxSeller boxSeller={boxSeller} myStore={myStore} />
                  <Tabs {...tabs} tabSelected={(selected) => this.tabSelected(selected)} />
                </Section>
                {
                  tabs.selected === 'Produk' &&
                  <ContentProduk
                    settings={settings}
                    myStore={myStore}
                    showListCatalog={showListCatalog}
                    itemCatalog={(product, index) => this.itemCatalog(product, index)}
                    showListCatalogPress={() => this.showListCatalogPress()}
                    scrollToElement={(id) => console.log(id)} />
                }
                {
                  tabs.selected === 'Profile' &&
                  <ContentProfile {...myStore} />
                }
                {
                  tabs.selected === 'Penilaian' &&
                  <ContentPenilaian {...myStore} />
                }
              </Content>
          }

      </Content>
    )
  }
}

const ContentPenilaian = (store) => {
  return (
    <Content>
      <Section>
        <div className='columns detail-rating is-mobile is-multiline no-margin-bottom'>
          <div className='column'>
            <div className='rating-content'>
              <h3>Kualitas Produk</h3>
              <span className='value-rate' style={{display: 'block'}}>{store.rating.quality.toFixed(1) || 0}</span>
              <MyRating
                readonly
                initialRate={store.rating.quality}
                start={0}
                stop={5} />
            </div>
          </div>
          <div className='column'>
            <div className='rating-content'>
              <h3>Akurasi Produk</h3>
              <span className='value-rate' style={{display: 'block'}}>{store.rating.accuracy.toFixed(1) || 0}</span>
              <MyRating
                readonly
                initialRate={store.rating.accuracy}
                start={0}
                stop={5} />
            </div>
          </div>
        </div>
      </Section>
      {
        store.rating.reviews.map((review, index) => {
          let reviewDate = moment.unix(review.created_at).format('MM/DD/YYYY')
          let longDay = moment().diff(reviewDate, 'days')
          return (
            <Section className='section is-paddingless' key={index}>
              <div className='profile-content rating'>
                <div className='profile-wrapp is-paddingless'>
                  <ul className='detail-seller'>
                    <li>
                      <div className='box is-paddingless'>
                        <article className='media'>
                          <div className='media-left'>
                            <figure className='image user-pict'>
                              <MyImage src={review.user.photo} />
                            </figure>
                          </div>
                          <div className='media-content'>
                            <div className='content'>
                              <p className='user-name'>
                                <strong>{review.user.name}</strong>
                                <br />
                                <span>{ longDay > 30 ? reviewDate : longDay + ' hari yang lalu' }</span>
                              </p>
                            </div>
                          </div>
                        </article>
                      </div>
                    </li>
                    <li onClick={() => Router.push(
                        url.format({
                          pathname: '/product-detail',
                          query: {id: review.product.id}
                        }),
                        `/product-detail?id=${review.product.id}`
                      )}>
                      <div className='box is-paddingless'>
                        <article className='media'>
                          <div className='media-left'>
                            <figure className='image'>
                              <MyImage src={review.product.image} />
                            </figure>
                          </div>
                          <div className='media-content'>
                            <div className='content'>
                              <p>
                                <strong>{review.product.name}</strong>
                                <br />
                                <span>{review.product.description}</span>
                              </p>
                            </div>
                          </div>
                        </article>
                      </div>
                      <span className='icon-arrow-right' />
                    </li>
                  </ul>
                </div>
              </div>
              <div className='columns detail-rating is-mobile is-multiline no-margin-bottom'>
                <div className='column is-half'>
                  <div className='rating-content is-left'>
                    <h3>Kualitas Produk</h3>
                    <span className='value-rate' style={{display: 'block'}}>{review.quality.toFixed(1) || 0}</span>
                    <MyRating
                      readonly
                      initialRate={review.quality}
                      start={0}
                      stop={5} />
                  </div>
                </div>
                <div className='column is-half'>
                  <div className='rating-content is-left'>
                    <h3>Akurasi Produk</h3>
                    <span className='value-rate' style={{display: 'block'}}>{review.accuracy.toFixed(1) || 0}</span>
                    <MyRating
                      readonly
                      initialRate={review.accuracy}
                      start={0}
                      stop={5} />
                  </div>
                </div>
                <div className='column'>
                  <p className='desc'>{review.review}</p>
                </div>
              </div>
            </Section>
          )
        })
      }
    </Content>
  )
}

const ContentProfile = (store) => {
  console.log(store)
  let verificationDate = moment.unix(store.verification_at).format('MM/DD/YYYY')
  console.log(verificationDate)
  let longMonth = moment().diff(verificationDate, 'months')
  let openUntil = 'bulan yang lalu'
  if (longMonth < 1) {
    longMonth = moment().diff(verificationDate, 'days')
    openUntil = 'hari yang lalu'
  }
  return (
    <Content>
      <Section>
        <div className='profile-content'>
          <h3>Slogan</h3>
          <p>{ store.slogan }</p>
        </div>
      </Section>
      <Section className='section is-paddingless'>
        <div className='profile-content'>
          <h3>Deskripsi Toko</h3>
          <p>{ store.description }</p>
        </div>
      </Section>
      <Section>
        <div className='profile-content is-paddingless'>
          <div className='profile-wrapp is-paddingless'>
            <ul className='detail-seller'>
              <li className='padding-side'>
                <div className='box is-paddingless'>
                  <article className='media'>
                    <div className='media-left'>
                      <figure className='image'>
                        <span className='icon-location' />
                      </figure>
                    </div>
                    <div className='media-content'>
                      <div className='content no-margin-right'>
                        <p>
                          Lokasi Toko
                        </p>
                        <div className='val-right'><span>{ store.district.name }</span></div>
                      </div>
                    </div>
                  </article>
                </div>
              </li>
              <li className='padding-side'>
                <div className='box is-paddingless'>
                  <article className='media'>
                    <div className='media-left'>
                      <figure className='image'>
                        <span className='icon-calendar' />
                      </figure>
                    </div>
                    <div className='media-content'>
                      <div className='content no-margin-right'>
                        <p>
                          Buka Sejak
                        </p>
                        <div className='val-right'><span>{ longMonth } { openUntil }</span></div>
                      </div>
                    </div>
                  </article>
                </div>
              </li>
              <li className='padding-side'>
                <div className='box is-paddingless'>
                  <article className='media'>
                    <div className='media-left'>
                      <figure className='image'>
                        <span className='icon-favorite' />
                      </figure>
                    </div>
                    <div className='media-content'>
                      <div className='content no-margin-right'>
                        <p>
                          Favorit
                        </p>
                        <div className='val-right'><span>{ store.total_favorite }</span></div>
                      </div>
                    </div>
                  </article>
                </div>
              </li>
              <li className='padding-side'>
                <div className='box is-paddingless'>
                  <article className='media'>
                    <div className='media-left'>
                      <figure className='image'>
                        <span className='icon-note' />
                      </figure>
                    </div>
                    <div className='media-content'>
                      <div className='content no-margin-right'>
                        <p>
                          Produk Terjual
                        </p>
                        <div className='val-right'><span>{ store.total_product_sold }</span></div>
                      </div>
                    </div>
                  </article>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </Section>
    </Content>
  )
}

const ContentProduk = (props) => {
  const { myStore, settings, showListCatalog } = props
  return (
    <Content>
      {
        myStore.catalogs.map((catalog, index) => {
          let listCatalog = catalog.products.map((product, index) => { return props.itemCatalog(product, index) })
          return (
            <Section id={catalog.id} className='section is-paddingless' key={index}>
              <div className='columns is-mobile view-all'>
                <div className='column'>
                  <p>{ catalog.name }</p><p /></div>
                <div className='column has-text-right'>
                  <span className='link'>Lihat Semuanya<span /></span></div>
              </div>
              {
                catalog.products.length > 0 &&
                <div className='columns custom'>
                  <div className='slide-items'>
                    <Slider {...settings}>
                      { listCatalog }
                    </Slider>
                  </div>
                </div>
              }
            </Section>
          )
        })
      }
      <a className='catalog-button js-option' onClick={() => props.showListCatalogPress()}>
        <span className='icon-catalog' /> Daftar Katalog
      </a>
      <div className='sort-option' style={{ display: showListCatalog && 'block' }}>
        <div className='sort-list catalog-list'>
          <ul>
            {
              myStore.catalogs.map((catalog, index) => {
                return <li key={index} onClick={() => props.scrollToElement(catalog.id)}><a>{ catalog.name }</a></li>
              })
            }
          </ul>
        </div>
        <a className='close-option js-close' onClick={() => props.showListCatalogPress()}>
          <span className='icon-close white' />
        </a>
      </div>
    </Content>
  )
}

const BoxSeller = (props) => {
  const { myStore, boxSeller } = props
  return (
    <div className='box seller' style={boxSeller}>
      <div className='media'>
        <div className='media-left'>
          <figure className='image'>
            <a>
              <MyImage src='../images/thumb.jpg' alt='Image' />
            </a>
          </figure>
        </div>
        <div className='media-content'>
          <div className='content'>
            <h4>{ myStore.name }</h4>
            <div className='detail'>
              <p className='address'>{ myStore.district.name }</p>
              <p>
                <span className={`icon-verified md ${!myStore.is_verified ? 'unverified' : ''}`} />
                { myStore.is_verified ? 'Terverifikasi' : 'Belum Terverifikasi' }
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className='columns is-mobile'>
        <div className='column'>
          <a className='button is-medium is-fullwidth is-outlined' onClick={() => Router.push(`/message?id=${myStore.id}`)}>
            <span className='icon-comment black' />
            Kirim Pesan
          </a>
        </div>
        <div className='column'>
          <a className='button is-medium is-fullwidth is-outlined' onClick={() => this.favouritePress()}>
            <span className='icon-plus' />
            Favorit
          </a>
        </div>
      </div>
    </div>
  )
}

const Tabs = (props) => {
  return (
    <nav className='nav nav-seller has-shadow'>
      <div className='container'>
        <div className='nav-left nav-info'>
          {
            props.options.map((option, index) => {
              return (
                <div className={`nav-item ${option === props.selected && 'is-active'}`} key={index} onClick={() => props.tabSelected(option)}>
                  <a>{ option }</a>
                </div>
              )
            })
          }
        </div>
      </div>
    </nav>
  )
}

const mapStateToProps = (state) => {
  return {
    store: state.stores,
    addWishlist: state.addWishlist
  }
}

export default connect(mapStateToProps)(Store)
