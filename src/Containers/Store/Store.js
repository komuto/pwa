import React, { Component } from 'react'
import { Element, Link, Events } from 'react-scroll'
import { connect } from 'react-redux'
import NProgress from 'nprogress'
import Router from 'next/router'
import url from 'url'
import Slider from 'react-slick'
import moment from 'moment'
import ReactNotify from 'react-notify'
// component
import Content from '../../Components/Content'
import Section from '../../Components/Section'
import Notification from '../../Components/Notification'
import MyImage from '../../Components/MyImage'
import MyRating from '../../Components/MyRating'
import Message from '../../Components/Message'
import ResponsiveImage from '../../Components/ResponsiveImage'
// containers
import { Navbar } from '../Navbar'
// actions
import * as storeActions from '../../actions/stores'
import * as productActions from '../../actions/product'
import * as userActions from '../../actions/user'
// lib
import RupiahFormat from '../../Lib/RupiahFormat'
import UrlParam from '../../Lib/UrlParam'
import ReadAbleText from '../../Lib/ReadAbleText'

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
      modalMessage: {
        store: null,
        title: {
          value: '',
          onChange: (e) => this.messageHandleChange(e.target)
        },
        description: {
          value: '',
          onChange: (e) => this.messageHandleChange(e.target)
        },
        submit: () => this.messageSubmit(),
        show: false,
        showPress: () => this.modalMessagePress()
      },
      notification: props.notification
    }

    this.submitting = {
      store: false,
      addWishlist: false,
      favorite: false,
      message: false
    }
  }

  modalMessagePress () {
    this.setState({ modalMessage: { ...this.state.modalMessage, show: !this.state.modalMessage.show } })
  }

  messageSubmit () {
    const { store, modalMessage } = this.state
    let id = store.store.id
    let subject = modalMessage.title.value
    let content = modalMessage.description.value
    if (!id || !subject || !content) {
      return
    }

    if (subject === '' || content === '') {
      return
    }

    const params = {
      id,
      subject,
      content
    }

    this.submitting = { ...this.submitting, message: true }
    this.props.setSendMessageStore(params)
  }

  messageHandleChange ({ name, value }) {
    const { modalMessage } = this.state
    modalMessage[name].value = value
    this.setState({ modalMessage })
  }

  componentDidMount () {
    const { id, store } = this.state
    if (!store.isFound) {
      NProgress.start()
      this.submitting = { ...this.submitting, store: true }
      this.props.getStores({ id })
    } else if (store.isFound && store.store.id !== id) {
      NProgress.start()
      this.submitting = { ...this.submitting, store: true }
      this.props.getStores({ id })
    }

    Events.scrollEvent.register('end', (to, element) => {
      this.setState({ showListCatalog: !this.state.showListCatalog })
    })
  }

  favouritePress () {
    const { id } = this.state
    this.submitting = { ...this.submitting, favorite: true }
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

  showNotification (message, error = false) {
    const { notifError, notifSuccess } = this.props
    const notification = error ? notifError(message) : notifSuccess(message)
    this.setState(
      { notification },
      () => {
        setTimeout(() => {
          this.setState({ notification: { ...this.state.notification, status: false } })
        }, 3000)
      }
    )
  }

  async componentWillReceiveProps (nextProps) {
    const { addWishlist, favorite, sendMessageStore } = nextProps
    const { isFetching, isFound, isError, notifError } = this.props
    let { store } = nextProps

    /** handling state message store */
    if (!isFetching(sendMessageStore) && this.submitting.message) {
      this.submitting = { ...this.submitting, message: false }
      if (isError(sendMessageStore)) {
        this.setState({
          notification: notifError(sendMessageStore.message),
          modalMessage: { ...this.state.modalMessage, show: false }
        })
      }
      if (isFound(sendMessageStore)) {
        this.showNotification(sendMessageStore.message)
        this.setState({
          modalMessage: { ...this.state.modalMessage, show: false }
        })
      }
    }

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
      this.refs.notificator.success('', favorite.message, 2000)
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
    if (product.is_discount && product.is_wholesaler) {
      pin = <div>
        <div className='pin disc'><span>{ `${product.discount}%` }</span></div>
        <div className='pin' style={{ marginLeft: '50px' }}><span>Grossir</span></div>
      </div>
    }
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
                <figure className='image img-product' style={{ width: 212 }}>
                  <a><MyImage src={product.image} alt={product.name} /></a>
                  { pin }
                </figure>
              </div>
              <div className='media-content'>
                <div className='content'>
                  <h4>{ ReadAbleText(product.name) }</h4>
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
        textPath: store.isFound && ReadAbleText(myStore.name)
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
          type={notification.type}
          isShow={notification.status}
          activeClose
          onClose={() => this.setState({notification: {status: false, message: ''}})}
          message={notification.message} />
        {
          store.isFound &&
            <Content>
              <Section className='section is-paddingless'>
                <BoxSeller modalMessage={this.state.modalMessage} boxSeller={boxSeller} myStore={myStore} submitting={this.submitting} favouritePress={() => this.favouritePress()} />
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
              <Message {...this.state.modalMessage} store={myStore} submitting={this.submitting} />
            </Content>
        }
        <ReactNotify ref='notificator' />
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
            <Element name={`ID${catalog.id}`} className={`section is-paddingless`} key={index}>
              <div className='columns is-mobile view-all'>
                <div className='column'>
                  <p>{ ReadAbleText(catalog.name) }</p><p /></div>
                <div className='column has-text-right'>
                  <span onClick={() =>
                    Router.push(
                      `/product?slug=${UrlParam(catalog.name)}&ids=${catalog.store_id}&idc=${catalog.id}`,
                      `/p/${UrlParam(catalog.name)}?ids=${catalog.store_id}&idc=${catalog.id}`
                    )} className='link'>Lihat Semuanya<span /></span></div>
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
      <div className='wrapper-sticky'>
        <a className='catalog-button js-option' onClick={() => props.showListCatalogPress()}>
          <span className='icon-catalog' /> Daftar Katalog
        </a>
      </div>
      <div className='sort-option' style={{ display: showListCatalog && 'block' }}>
        <div className='sort-list catalog-list'>
          <ul>
            {
              myStore.catalogs.map((catalog, index) => {
                return <li key={index}>
                  <Link to={`ID${catalog.id}`} className={String(catalog.id)} spy smooth duration={500}>{ ReadAbleText(catalog.name) }</Link>
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
  const { myStore, boxSeller, submitting, modalMessage } = props
  return (
    <div className='box seller' style={boxSeller}>
      <div className='media'>
        <div className='media-left'>
          <figure className='image'>
            <ResponsiveImage image={myStore.logo} borderRadius={50} />
          </figure>
        </div>
        <div className='media-content'>
          <div className='content'>
            <h4>{ ReadAbleText(myStore.name) }</h4>
            <div className='detail'>
              <p className='address'>{ ReadAbleText(myStore.district.name) }</p>
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
          <a className='button is-medium is-fullwidth is-outlined' onClick={() => modalMessage.showPress()}>
            <span className='icon-comment black' />
            Kirim Pesan
          </a>
        </div>
        <div className='column'>
          <a onClick={() => !submitting.favorite && props.favouritePress()} className={`button is-medium is-fullwidth ${submitting.favorite && 'is-loading'} ${myStore.is_favorite ? 'is-primary' : 'is-outlined'}`}>
            {
              !submitting.favorite && <span className={`${myStore.is_favorite ? 'icon-close white' : 'icon-plus'}`} />
            }
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
  favorite: state.favorite,
  sendMessageStore: state.sendMessageStore
})

const mapDispatchToProps = (dispatch) => ({
  getStores: (params) => dispatch(storeActions.getStores(params)),
  addToWishlist: (params) => dispatch(productActions.addToWishlist(params)),
  favoriteStore: (params) => dispatch(userActions.favoriteStore(params)),
  setSendMessageStore: (params) => dispatch(storeActions.sendMessageStore(params))
})

export default connect(mapStateToProps, mapDispatchToProps)(Store)
