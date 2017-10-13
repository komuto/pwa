/**
 * Safei Muslim
 * Yogyakarta , 12 Oktober 2017
 * PT Skyshi Digital Indonesa
 */
/** including dependencies */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import Slider from 'react-slick'
import Nprogress from 'nprogress'
import Router from 'next/router'
import _ from 'lodash'
import InfiniteScroll from 'react-infinite-scroller'
 /** including component */
import Content from '../Components/Content'
import Notification from '../Components/Notification'
import Loading from '../Components/Loading'
import MyImage from '../Components/MyImage'
import Images from '../Themes/Images'
/** including actions */
import * as userActions from '../actions/user'
/** including lib */
import RupiahFormat from '../Lib/RupiahFormat'
/** validations */
import * as inputValidations from '../Validations/Input'

class StoreFavorite extends Component {
  constructor (props) {
    super(props)
    this.state = {
      listFavoriteStore: {
        data: props.listFavoriteStore || null,
        hasMore: false,
        isEmpty: false,
        loadMore: () => this.favoriteLoadMore(),
        delete: (id) => this.favoriteDelete(id),
        search: (p) => this.favoriteSearch(p),
        params: {
          page: 1,
          limit: 5
        }
      },
      notification: props.notification
    }
    this.submitting = {
      listFavoriteStore: false,
      listFavoriteStoreSearch: false,
      favorite: false
    }

    this.deleteStoreId = null
  }

  render () {
    const { listFavoriteStore, notification } = this.state
    const { isFound } = this.props
    return (
      <Content>
        <Notification
          type={notification.type}
          isShow={notification.status}
          activeClose
          onClose={() => this.setState({notification: {status: false, message: ''}})}
          message={notification.message} />
        { isFound(listFavoriteStore.data) && <StoreFavoriteContent {...this.state} submitting={this.submitting} /> }
      </Content>
    )
  }

  componentDidMount () {
    let { params } = this.state.listFavoriteStore
    Nprogress.start()
    this.submitting = { ...this.submitting, listFavoriteStore: true }
    this.props.listFavorite(params)
  }

  componentWillReceiveProps (nextProps) {
    const { listFavoriteStore, favorite } = nextProps
    const { isFetching, isFound, isError, notifError, notifSuccess } = this.props

    /** handling state listFavoriteStore */
    if (!isFetching(listFavoriteStore) && this.submitting.listFavoriteStore) {
      Nprogress.done()
      this.submitting = { ...this.submitting, listFavoriteStore: false }
      if (isError(listFavoriteStore)) {
        this.setState({ notification: notifError(listFavoriteStore.message) })
      }
      if (isFound(listFavoriteStore)) {
        let isEmpty = listFavoriteStore.stores.length < 1
        let hasMore = listFavoriteStore.stores.length > 4
        if (this.submitting.listFavoriteStoreSearch) {
          this.submitting = { ...this.submitting, listFavoriteStoreSearch: false }

          this.setState({ listFavoriteStore: { ...this.state.listFavoriteStore, data: listFavoriteStore, hasMore, isEmpty } })
        } else {
          let tam = listFavoriteStore.stores.concat(this.state.listFavoriteStore.data.stores)

          listFavoriteStore.stores = tam

          this.setState({ listFavoriteStore: { ...this.state.listFavoriteStore, data: listFavoriteStore, hasMore, isEmpty } })
        }
      }
    }

    /** handling state add/delete favorite store */
    if (!isFetching(favorite) && this.submitting.favorite) {
      this.submitting = { ...this.submitting, favorite: false }
      if (isError(favorite)) {
        this.setState({ notification: notifError(favorite.message) })
      }
      if (isFound(favorite)) {
        let tam = _.filter(listFavoriteStore.stores, (store) => {
          return store.store.id !== this.deleteStoreId
        })

        listFavoriteStore.stores = tam

        this.setState({
          listFavoriteStore: { ...this.state.listFavoriteStore, data: listFavoriteStore },
          notification: notifSuccess('Berhasil menghapus toko favorite')
        })
      }
    }
  }
   /** load more favorite store */
  favoriteLoadMore () {
    let { listFavoriteStore } = this.state
    if (!this.submitting.listFavoriteStore) {
      this.submitting = { ...this.submitting, listFavoriteStore: true }
      listFavoriteStore.params.page += 1
      this.props.listFavorite(listFavoriteStore.params)
      this.setState({ listFavoriteStore })
    }
  }

   /** delete favorite store */
  favoriteDelete (id) {
    this.submitting = { ...this.submitting, favorite: true }
    this.deleteStoreId = id
    this.props.favoriteStore({ id })
  }

   /** search favorite store */
  favoriteSearch ({ value }) {
    var searchText = inputValidations.inputNormal(value)
    if (this.timeout) clearTimeout(this.timeout)
    this.timeout = setTimeout(() => {
      let { listFavoriteStore } = this.state

      this.submitting = { ...this.submitting, listFavoriteStore: true, listFavoriteStoreSearch: true }

      listFavoriteStore.params.q = searchText

      this.props.listFavorite(listFavoriteStore.params)
      this.setState({ listFavoriteStore })
    }, 1000)
  }
 }

const StoreFavoriteContent = ({ listFavoriteStore, submitting }) => {
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
      <section className='section is-paddingless'>
        <div className='field search-form paddingless'>
          <p className='control has-icons-left'>
            <span className={`${submitting.listFavoriteStoreSearch && 'button self is-loading right'}`} />
            <input onChange={(e) => listFavoriteStore.search(e.target)} className='input is-medium' type='text' placeholder='Cari toko Anda di sini' />
            <span className='icon is-left'>
              <span className='icon-search' />
            </span>
          </p>
        </div>
      </section>
      <InfiniteScroll
        pageStart={0}
        loadMore={_.debounce(listFavoriteStore.loadMore, 500)}
        hasMore={listFavoriteStore.hasMore}
        loader={<Loading size={12} color='#ef5656' className='is-fullwidth has-text-centered' />}>
        {
            // need respon isVerified
            listFavoriteStore.data.stores.map((data, index) => {
              let list = data.products.map((product, index) => {
                let price = product.price
                let priceAterDiscount = 0
                let isDiscount = product.is_discount
                if (isDiscount) {
                  priceAterDiscount = price - ((price * product.discount) / 100)
                }
                return (
                  <div key={index} className='item'>
                    <div className='column'>
                      <div className='box grid'>
                        <div className='media'>
                          <div className='media-left'>
                            <figure className='image' style={{ width: 212 }}>
                              <a><MyImage src={product.image} alt='Image' /></a>
                            </figure>
                          </div>
                          <div className='media-content'>
                            <div className='content'>
                              <h4>{product.name}</h4>
                              <div className='detail'>
                                { isDiscount && <div className='discount'>Rp {RupiahFormat(price)}</div> }
                                <span className='price'>Rp {RupiahFormat(priceAterDiscount)} </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })

              return (
                <section key={index} className='section is-paddingless'>
                  <div className='detail'>
                    <div className='detail-product'>
                      <div className='purchase'>
                        <figure className='img-item is-bordered ms'>
                          <MyImage src={data.store.logo} alt={data.store.name} />
                        </figure>
                        <h3>{data.store.name} <span className='icon-verified' /></h3>
                        <span className='price'>{data.store.province.name}</span>
                      </div>
                      <a onClick={() => listFavoriteStore.delete(data.store.id)} className='remove-item'><span className='icon-trash' /></a>
                    </div>
                  </div>
                  <div className='columns custom'>
                    <div className='slide-items owl-theme'>
                      {
                        data.products.length > 0 &&
                        <Slider {...settings}>
                          { list }
                          <div onClick={() => Router.push(`/store?id=${data.store.id}&tab=Produk`)} className='item' style={{ width: '262px' }}>
                            <div className='column' style={{ height: '317px' }}>
                              <div className='box grid'>
                                <div className='media'>
                                  <div className='media-left' style={{ marginTop: '150px' }}>
                                    <figure className='image' style={{ width: 40, display: 'block', marginLeft: 'auto', marginRight: 'auto' }}>
                                      <MyImage src={Images.listProduct} alt='listProduct' />
                                    </figure>
                                  </div>
                                  <div className='media-content' style={{ textAlign: 'center' }}>
                                    <div className='content'>
                                      <span>Lihat Barang Selengkapnya</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Slider>
                      }
                    </div>
                  </div>
                </section>
              )
            })
          }
      </InfiniteScroll>
    </Content>
  )
}

const mapStateToProps = (state) => ({
  listFavoriteStore: state.listFavoriteStore,
  favorite: state.favorite
})

const mapDispatchToProps = (dispatch) => ({
  listFavorite: (params) => dispatch(userActions.listFavorite(params)),
  favoriteStore: (params) => dispatch(userActions.favoriteStore(params))
})

export default connect(mapStateToProps, mapDispatchToProps)(StoreFavorite)
