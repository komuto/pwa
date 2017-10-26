import React, { Component } from 'react'
import { Element, Link, Events } from 'react-scroll'
import { connect } from 'react-redux'
import NProgress from 'nprogress'
import Router from 'next/router'
import url from 'url'
import Slider from 'react-slick'
import moment from 'moment'
// component
import Content from '../../Components/Content'
import Section from '../../Components/Section'
import Notification from '../../Components/Notification'
import MyImage from '../../Components/MyImage'
import MyRating from '../../Components/MyRating'
// containers
import { Navbar } from '../Navbar'
// actions
import * as storeActions from '../../actions/stores'
import * as productActions from '../../actions/product'
import * as userActions from '../../actions/user'
// lib
import RupiahFormat from '../../Lib/RupiahFormat'

class Store extends Component {
  constructor (props) {
    super(props)
    this.state = {
      id: props.query.id || null,
      idProduct: props.query.idProduct || null,
      tab: props.query.tab || null,
      store: props.store | null,
      showListCatalog: false,
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

    this.submitting = {
      store: false,
      addWishlist: false,
      favorite: false
    }
  }

  async componentDidMount () {
    const { id, store } = this.state
    if (!store.isFound) {
      NProgress.start()
      this.submitting = { ...this.submitting, store: true }
      await this.props.getStores({ id })
    } else if (store.isFound && store.store.id !== id) {
      NProgress.start()
      this.submitting = { ...this.submitting, store: true }
      await this.props.getStores({ id })
    }

    Events.scrollEvent.register('end', (to, element) => {
      this.setState({ showListCatalog: !this.state.showListCatalog })
    })
  }

  favouritePress () {
    const { id } = this.state
    this.submitting = { ...this.submitting, favorite: false }
    this.props.favoriteStore({ id })
  }

  showListCatalogPress () { this.setState({ showListCatalog: !this.state.showListCatalog }) }

  tabSelected (selected) {
    Router.push(`/store?id=${this.state.id}&idProduct=${this.state.idProduct}&tab=${selected}`)
    this.setState({ tabs: {...this.state.tabs, selected}, boxSeller: {...this.state.boxSeller, height: selected === 'Produk' ? 200 : 0} })
  }

  async wishlistPress (e, id) {
    e.stopPropagation()
    let { store } = this.state
    if (this.props.isLogin) {
      store.store.catalogs.map((catalog) => {
        catalog.products.map((product) => {
          if (product.id === id) {
            (product.is_liked) ? product.count_like -= 1 : product.count_like += 1
            product.is_liked = !product.is_liked
          }
        })
      })
      this.submitting = { ...this.submitting, addWishlist: true }
      await this.props.addToWishlist({ id })
      this.setState({ store })
    } else {
      this.props.alertLogin()
    }
  }

  async componentWillReceiveProps (nextProps) {
    const { addWishlist, favorite } = nextProps
    const { isFetching, isFound, isError, notifError } = this.props
    let { store } = nextProps

    /** handling state store */
    if (!isFetching(store) && this.submitting.store) {
      NProgress.done()
      this.submitting = { ...this.submitting, store: false }
      if (isError(store)) {
        this.setState({ notification: notifError(store.message) })
      }
      if (isFound(store)) {
        this.setState({ store })
      }
    }

    /** handling state addwishlist */
    if (!isFetching(addWishlist) && this.submitting.addWishlist) {
      this.submitting = { ...this.submitting, addWishlist: false }
      if (isError(addWishlist)) {
        this.setState({ notification: notifError(addWishlist.message) })
      }
      if (isFound(addWishlist)) {
        this.setState({ addWishlist })
      }
    }
    /** handling state favorite */
    if (!isFetching(favorite) && this.submitting.favorite) {
      this.submitting = { ...this.submitting, favorite: false }
      if (isError(favorite)) {
        this.setState({ notification: notifError(favorite.message) })
      }
      if (isFound(favorite)) {
        let isFavorite = store.store.is_favorite
        store.store.is_favorite = !isFavorite
        this.setState({ store })
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
                <figure className='image' style={{ width: 212 }}>
                  <a><MyImage src={product.image} alt={product.name} /></a>
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
                      <span style={{ zIndex: 100 }} className={`icon-wishlist ${product.is_liked ? 'solid' : ''}`} onClick={(e) => this.wishlistPress(e, product.id)} />
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
    const params = {
      navbar: {
        searchBoox: false,
        path: '/',
        // callBack: () => Router.push(`/product-detail?id=${idProduct}`),
        textPath: store.isFound && myStore.name
      }
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
        <Navbar {...params} />
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
                  <BoxSeller boxSeller={boxSeller} myStore={myStore} favouritePress={() => this.favouritePress()} />
                  <Tabs {...tabs} tabSelected={(selected) => this.tabSelected(selected)} />
                </Section>
                {
                  tabs.selected === 'Produk' &&
                  <ContentProduk
                    settings={settings}
                    myStore={myStore}
                    showListCatalog={showListCatalog}
                    itemCatalog={(product, index) => this.itemCatalog(product, index)}
                    showListCatalogPress={() => this.showListCatalogPress()} />
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
              <span className='value-rate' style={{display: 'block'}}>{(store.rating.quality && store.rating.quality.toFixed(1)) || 0}</span>
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
              <span className='value-rate' style={{display: 'block'}}>{(store.rating.accuracy && store.rating.accuracy.toFixed(1)) || 0}</span>
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
                              <MyImage src={review.user.photo} alt={review.user.name} />
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
                              <MyImage src={review.product.image} alt={review.product.name} />
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
  let verificationDate = moment.unix(store.verification_at).format('MM/DD/YYYY')
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
            <Element name={String(catalog.id)} className={`section is-paddingless`} key={index}>
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
            </Element>
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
                return <li key={index}>
                  <Link activeClass='active' className={String(catalog.id)} to={String(catalog.id)} spy smooth duration={500}>{ catalog.name }</Link>
                </li>
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
              <MyImage src='../../images/thumb.jpg' alt='thumbs' />
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
          <a onClick={() => props.favouritePress()} className={`button is-medium is-fullwidth ${myStore.is_favorite ? 'is-primary' : 'is-outlined'}`}>
            <span className={`${myStore.is_favorite ? 'icon-close white' : 'icon-plus'}`} />
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

const mapStateToProps = (state) => ({
  store: state.stores,
  addWishlist: state.addWishlist,
  favorite: state.favorite
})

const mapDispatchToProps = (dispatch) => ({
  getStores: (params) => dispatch(storeActions.getStores(params)),
  addToWishlist: (params) => dispatch(productActions.addToWishlist(params)),
  favoriteStore: (params) => dispatch(userActions.favoriteStore(params))
})

export default connect(mapStateToProps, mapDispatchToProps)(Store)
