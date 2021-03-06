import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Element, Link, Events } from 'react-scroll'
import Router from 'next/router'
import NProgress from 'nprogress'
import InfiniteScroll from 'react-infinite-scroller'
import _ from 'lodash'
// containers
import { Navbar } from '../Navbar'
// components
import Content from '../../Components/Content'
import MyImage from '../../Components/MyImage'
import Notification from '../../Components/Notification'
import Loading from '../../Components/Loading'
// actions
import * as storeActions from '../../actions/stores'
// Lib
import RupiahFormat from '../../Lib/RupiahFormat'
/** including themes */
import Images from '../../Themes/Images'
import RegexNormal from '../../Lib/RegexNormal'
import ReadAbleText from '../../Lib/ReadAbleText'

const TAB_SHOW_IN_PAGE = 'TAB_SHOW_IN_PAGE'
const TAB_HIDDEN_IN_PAGE = 'TAB_HIDDEN_IN_PAGE'

class ProductList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      storeProducts: props.storeProducts || null,
      hiddenStoreProducts: props.hiddenStoreProducts || null,
      storeCatalogProductsSearch: props.storeCatalogProductsSearch || null,
      search: {
        status: false,
        value: '',
        results: []
      },
      pagination: {
        page: 1,
        limit: 10
      },
      isEmpty: {
        storeProducts: false,
        hiddenProducts: false,
        searchProducts: false
      },
      tabs: TAB_SHOW_IN_PAGE,
      showListCatalog: false,
      dropdownSelected: '',
      notification: {
        type: 'is-success',
        status: false,
        message: 'Error, default message.'
      }
    }
    this.hasMore = false
    this.fetching = { fetchingMore: false, fetchStoreProducts: false, fetchHiddenProducts: false, searchItem: false }
  }

  handleDropdown (e, id) {
    e.preventDefault()
    const { dropdownSelected } = this.state
    if (id === dropdownSelected) {
      this.setState({ dropdownSelected: '' })
    } else {
      this.setState({ dropdownSelected: id })
    }
  }

  productHidden (e, id) {
    e.preventDefault()
    Router.push(`/product-hidden?id=${id}`)
  }

  productDeleteInCatalog (e, id) {
    e.preventDefault()
    Router.push(`/product-delete-in-catalog?id=${id}`)
  }

  productMoveCatalogOther (e, id) {
    e.preventDefault()
    Router.push(`/product-move-catalog-other?id=${id}`)
  }

  productChangeDropship (e, id) {
    e.preventDefault()
    Router.push(`/product-change-dropship?id=${id}`)
  }

  productDetail (e, product) {
    e.preventDefault()
    if (product.hasOwnProperty('dropship_origin')) {
      Router.push(`/product-dropship-detail?id=${product.id}&commission=${product.dropship_origin.commission.percent}&type=detailDropship`)
    } else {
      Router.push(`/product-manage?id=${product.id}`)
    }
  }

  switchTab (e) {
    const { tabs } = this.state
    this.setState({ search: { status: false, value: '', results: [] } })
    this.setState({ tabs: (tabs === TAB_SHOW_IN_PAGE) ? TAB_HIDDEN_IN_PAGE : TAB_SHOW_IN_PAGE })
  }

  showListCatalogPress () { this.setState({ showListCatalog: !this.state.showListCatalog }) }

  componentDidMount () {
    window.scrollTo(0, 0)
    NProgress.start()
    this.props.getStoreProducts({hidden: false})
    this.fetching = { ...this.fetching, fetchHiddenProducts: true, fetchStoreProducts: true }
    this.props.getHiddenStoreProducts()
    Events.scrollEvent.register('begin', (to, element) => {
      if (!/menus/.test(to)) {
        this.setState({ showListCatalog: !this.state.showListCatalog })
      }
    })
  }

  async loadMore () {
    let { id, pagination } = this.state
    if (!this.fetching.fetchingMore) {
      const newState = { pagination }
      pagination['page'] = pagination.page + 1
      this.setState(newState)
      this.fetching = { ...this.fetching, fetchingMore: true }
      await this.props.getHiddenStoreProducts({ id: id, page: this.state.pagination.page })
    }
  }

  searchOnChange (event) {
    const { search, tabs, isEmpty } = this.state
    search.status = true
    search.value = RegexNormal(event.target.value)

    if (tabs === TAB_SHOW_IN_PAGE) {
      if (this.timeout) clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        if (search.value) {
          this.fetching = { ...this.fetching, searchItem: true }
          NProgress.start()
          this.props.getStoreProductsByCatalogSearch({ q: search.value })
        } else {
          search.status = false
          search.results = []
        }
        this.setState({ search, isEmpty: { ...isEmpty, searchProducts: false } })
      }, 3000)
      // if (search.value !== '') {
      //   search.status = true
      //   search.results = []
      //   storeProducts.storeProducts.map((sp) => {
      //     let tamProducts = sp.products.filter((x) => {
      //       let regex = new RegExp(search.value, 'gi')
      //       return regex.test(x.name)
      //     })
      //     if (tamProducts.length > 0) {
      //       sp.products = tamProducts
      //       search.results.push(sp)
      //     }
      //   })
      // } else {
      //   search.status = false
      //   search.results = []
      // }
    }
    if (tabs === TAB_HIDDEN_IN_PAGE) {
      if (this.timeout) clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        if (search.value) {
          this.fetching = { ...this.fetching, searchItem: true }
          NProgress.start()
          this.props.getStoreProductsByCatalogSearch({ q: search.value, hidden: true })
        } else {
          search.status = false
          search.results = []
        }
        this.setState({ search, isEmpty: { ...isEmpty, searchProducts: false } })
      }, 3000)
    }
    this.setState({ search })
  }

  componentWillReceiveProps (nextProps) {
    const { storeProducts, hiddenStoreProducts, storeCatalogProductsSearch } = nextProps
    const { isFetching, isFound, isError, notifError } = this.props

    if (!isFetching(storeProducts) && this.fetching.fetchStoreProducts) {
      NProgress.done()
      this.fetching = { ...this.fetching, fetchStoreProducts: false }
      if (isFound(storeProducts)) {
        let isEmpty = storeProducts.storeProducts.length < 1
        this.setState({ storeProducts, isEmpty: { ...this.state.isEmpty, storeProducts: isEmpty } })
      }
      if (isError(storeProducts)) {
        this.setState({ notification: notifError(storeProducts.message) })
      }
    }

    if (!isFetching(hiddenStoreProducts) && this.fetching.fetchHiddenProducts) {
      NProgress.done()
      this.fetching = { ...this.fetching, fetchHiddenProducts: false }
      if (isFound(hiddenStoreProducts)) {
        this.hasMore = hiddenStoreProducts.products.length > 9
        let isEmpty = hiddenStoreProducts.products.length < 1
        this.setState({ hiddenStoreProducts, isEmpty: { ...this.state.isEmpty, hiddenProducts: isEmpty } })
      }
      if (isError(hiddenStoreProducts)) {
        this.setState({ notification: notifError(hiddenStoreProducts.message) })
      }
    }

    if (!isFetching(hiddenStoreProducts) && this.fetching.fetchingMore) {
      this.fetching = { ...this.fetching, fetchingMore: false }
      if (isFound(hiddenStoreProducts)) {
        let stateHiddenStoreProducts = this.state.hiddenStoreProducts
        this.hasMore = hiddenStoreProducts.products.length > 9
        stateHiddenStoreProducts.products = stateHiddenStoreProducts.products.concat(hiddenStoreProducts.products)
        this.setState({ hiddenStoreProducts: stateHiddenStoreProducts })
      }
      if (isError(hiddenStoreProducts)) {
        this.setState({ notification: notifError(hiddenStoreProducts.message) })
        this.hasMore = false
      }
    }
    // handling search
    if (!isFetching(storeCatalogProductsSearch) && this.fetching.searchItem) {
      NProgress.done()
      this.fetching = { ...this.fetching, searchItem: false }
      this.hasMore = false
      if (isFound(storeCatalogProductsSearch)) {
        let uniqData = storeCatalogProductsSearch.products.filter((data, index, self) =>
          self.findIndex((p) => { return p.id === data.id }) === index
        )
        let { search, isEmpty } = this.state
        let isEmptySearch = storeCatalogProductsSearch.products.length < 1
        let searchStatus = storeCatalogProductsSearch.products.length > 0
        let newState = { storeCatalogProductsSearch, isEmpty, search }
        newState.storeCatalogProductsSearch['products'] = uniqData
        newState.isEmpty['searchProducts'] = isEmptySearch
        newState.search['status'] = searchStatus
        newState.search['results'] = storeCatalogProductsSearch.products
        this.setState(newState)
      }
      if (isError(storeCatalogProductsSearch)) {
        this.setState({ notification: notifError(storeCatalogProductsSearch.message) })
      }
    }
  }

  rounding (number) {
    return Math.ceil(number, -1)
  }

  isEmptyContentShow () {
    const { isEmpty } = this.state
    if (isEmpty.storeProducts) return (<ProductShowEmpty />)
    if (isEmpty.searchProducts) return (<ProductNotFound />)
  }

  isEmptyContentHidden () {
    const { isEmpty } = this.state
    if (isEmpty.hiddenProducts) return (<ProductHiddenEmpty />)
    if (isEmpty.searchProducts) return (<ProductNotFound />)
  }

  render () {
    const { tabs, showListCatalog, storeProducts, hiddenStoreProducts, search, notification, dropdownSelected, isEmpty } = this.state
    const toManageStore = () => {
      Router.push('/manage-store')
    }
    let params = {
      navbar: {
        searchBoox: false,
        path: '/',
        callBack: () => toManageStore(),
        textPath: 'Daftar Produk'
      }
    }
    let catalogProducts = []
    let hiddenProducts = []
    if (tabs === TAB_SHOW_IN_PAGE) {
      // if (search.status) {
      //   catalogProducts = search.results
      // } else {
      // }
      catalogProducts = storeProducts.isFound ? storeProducts.storeProducts : []
    }
    if (tabs === TAB_HIDDEN_IN_PAGE) {
      if (search.status) {
        hiddenProducts = search.results
      } else {
        hiddenProducts = hiddenStoreProducts.isFound ? hiddenStoreProducts.products : []
      }
    }
    return (
      <Content>
        <Navbar {...params} />
        <div className='nav-tabs'>
          <a onClick={(e) => this.switchTab(e)} className={tabs === TAB_SHOW_IN_PAGE && 'active'}>Ditampilkan di Toko</a>
          <a onClick={(e) => this.switchTab(e)} className={tabs === TAB_HIDDEN_IN_PAGE && 'active'}>Disembunyikan</a>
        </div>
        <Notification
          type={notification.type}
          isShow={notification.status}
          activeClose
          onClose={() => this.setState({notification: {status: false, message: ''}})}
          message={notification.message} />
        {
          tabs === TAB_SHOW_IN_PAGE
          ? <ContentShow
            catalogProducts={catalogProducts}
            showListCatalog={showListCatalog}
            showListCatalogPress={() => this.showListCatalogPress()}
            handleDropdown={(e, id) => this.handleDropdown(e, id)}
            productDeleteInCatalog={(e, id) => this.productDeleteInCatalog(e, id)}
            productHidden={(e, id) => this.productHidden(e, id)}
            productMoveCatalogOther={(e, id) => this.productMoveCatalogOther(e, id)}
            productChangeDropship={(e, id) => this.productChangeDropship(e, id)}
            dropdownSelected={dropdownSelected}
            productDetail={(e, product) => this.productDetail(e, product)}
            search={search}
            rounding={(price) => this.rounding(price)}
            isEmpty={isEmpty}
            searchOnChange={(e) => this.searchOnChange(e)}
            searchValue={search.value} />
          : <ContentHidden
            hiddenProducts={hiddenProducts}
            catalogProducts={catalogProducts}
            productDetail={(e, product) => this.productDetail(e, product)}
            loadMore={() => this.loadMore()}
            hasMore={this.hasMore}
            rounding={(price) => this.rounding(price)}
            isEmpty={isEmpty}
            searchOnChange={(e) => this.searchOnChange(e)}
            searchValue={search.value} />
        }
      </Content>
    )
  }
}

const ContentHidden = (props) => {
  const { isEmpty, searchValue } = props
  if (isEmpty.hiddenProducts) return (<ProductHiddenEmpty />)
  if (isEmpty.searchProducts) return (<ProductNotFound />)
  return (
    <div>
      <section className='section is-paddingless'>
        <div className='field search-form paddingless'>
          <p className='control has-icons-left'>
            <input className='input is-medium' type='text' value={searchValue} placeholder='Cari Produk ' onChange={(e) => props.searchOnChange(e)} />
            <span className='icon is-left'>
              <span className='icon-search' />
            </span>
          </p>
        </div>
      </section>
      {
        <InfiniteScroll
          pageStart={0}
          loadMore={_.debounce(props.loadMore.bind(this), 500)}
          hasMore={props.hasMore}
          loader={<Loading size={12} color='#ef5656' className='is-fullwidth has-text-centered' />}>
          {
            props.hiddenProducts.map((p, i) => {
              let priceAfterDiscount = (p.is_discount) ? props.rounding(p.price - ((p.price * p.discount) / 100)) : p.price
              let commissionKomuto = p.commission ? p.commission : 0
              let commision = props.rounding(priceAfterDiscount * (commissionKomuto / 100))
              let priceReceive = props.rounding(priceAfterDiscount - commision)
              return (
                <Element name={String(p.id)} className={`section is-paddingless detail`} key={i} style={{ marginBottom: 20 }}>
                  <div className='detail-product' key={i} onClick={(e) => props.productDetail(e, p)}>
                    <div className='remove rightTop'>
                      { p.is_discount && <span className='icon-discount-sign' /> }
                      { p.is_wholesaler && <span className='icon-grosir-sign' /> }
                    </div>
                    <div className='purchase'>
                      <figure className='img-item xx'>
                        <MyImage src={p.image} alt='image' />
                      </figure>
                      <div className='content-product'>
                        <h3>{ p.name }</h3>
                        { (p.dropship_origin !== undefined) && <p className='dropship-worldsports'>Dropship dari {p.dropship_origin.name}</p> }
                        { (!p.hasOwnProperty('dropship_origin') && p.is_dropship) && <p className='dropship-item'>Terbuka untuk dropshipper</p> }
                        <p>Jumlah Stok : { p.stock }</p>
                        <p>Harga jual setelah diskon : Rp { RupiahFormat(priceAfterDiscount) }</p>
                        <p>{ p.dropship_origin ? 'Komisi' : 'Uang' } yang diterima : Rp { RupiahFormat(priceReceive) }</p>
                      </div>
                    </div>
                  </div>
                </Element>
              )
            })
          }
        </InfiniteScroll>
      }
    </div>
  )
}

const ContentShow = (props) => {
  const { isEmpty, searchValue } = props
  if (isEmpty.storeProducts) return (<ProductShowEmpty />)
  if (isEmpty.searchProducts) return (<ProductNotFound />)
  return (
    <div>
      <section className='section is-paddingless'>
        <div className='field search-form paddingless'>
          <p className='control has-icons-left'>
            <input className='input is-medium' type='text' value={searchValue} placeholder='Cari Produk ' onChange={(e) => props.searchOnChange(e)} />
            <span className='icon is-left'>
              <span className='icon-search' />
            </span>
          </p>
        </div>
      </section>
      {
        props.search.status ? <SearchContent search={props.search} /> : props.catalogProducts.map((sp, index) => {
          let isLastCatalog = (props.catalogProducts.length - 1) === index
          if (isLastCatalog) {
            sp.catalog['id'] = 0
          }
          return (
            <Element name={String(sp.catalog.id)} className={`section is-paddingless detail`} key={index} style={{ marginBottom: 20 }}>
              <div className='info-purchase'>
                <div className='detail-rate is-purchase'>
                  <div className='columns total-items is-mobile is-multiline no-margin-bottom'>
                    <div className='column is-half'>
                      <div className='rating-content is-left'>
                        <strong>{ ReadAbleText(sp.catalog.name)} ({sp.catalog.count_product})</strong>
                      </div>
                    </div>
                    {
                      isLastCatalog ? <Link activeClass='active' className={`column is-half ${String(sp.catalog.id)}`} to={`menus ${String(sp.catalog.id)}`} spy smooth duration={500} onClick={(e) => props.handleDropdown(e, sp.catalog.id)}>
                        <Element name={`menus ${String(sp.catalog.id)}`} className={`rating-content has-text-right menu-top ${props.dropdownSelected === sp.catalog.id && 'open'}`}>
                          <a className='option-content'><span /><span /><span /></a>
                          <ul className='option-dropdown'>
                            <li><a className='js-option' onClick={(e) => props.productHidden(e, sp.catalog.id)} >Sembunyikan Barang</a></li>
                            <li><a className='js-option' onClick={(e) => props.productDeleteInCatalog(e, sp.catalog.id)} >Hapus Barang di Katalog</a></li>
                            <li><a className='js-option' onClick={(e) => props.productMoveCatalogOther(e, sp.catalog.id)} >Pindahkan Barang ke Katalog Lain</a></li>
                            <li><a className='js-option' onClick={(e) => props.productChangeDropship(e, sp.catalog.id)} >Pindahkan Barang ke Dropshipping</a></li>
                          </ul>
                        </Element>
                      </Link>
                      : <div className='column is-half' onClick={(e) => props.handleDropdown(e, sp.catalog.id)}>
                        <Element name={`menus ${String(sp.catalog.id)}`} className={`rating-content has-text-right menu-top ${props.dropdownSelected === sp.catalog.id && 'open'}`}>
                          <a className='option-content'><span /><span /><span /></a>
                          <ul className='option-dropdown'>
                            <li><a className='js-option' onClick={(e) => props.productHidden(e, sp.catalog.id)} >Sembunyikan Barang</a></li>
                            <li><a className='js-option' onClick={(e) => props.productDeleteInCatalog(e, sp.catalog.id)} >Hapus Barang di Katalog</a></li>
                            <li><a className='js-option' onClick={(e) => props.productMoveCatalogOther(e, sp.catalog.id)} >Pindahkan Barang ke Katalog Lain</a></li>
                            <li><a className='js-option' onClick={(e) => props.productChangeDropship(e, sp.catalog.id)} >Pindahkan Barang ke Dropshipping</a></li>
                          </ul>
                        </Element>
                      </div>
                    }
                  </div>
                </div>
              </div>
              {
                sp.products.map((p, i) => {
                  let priceAfterDiscount = (p.is_discount) ? props.rounding(p.price - ((p.price * p.discount)) / 100) : p.price
                  let commissionKomuto = p.commission ? p.commission : 0
                  let commision = props.rounding(priceAfterDiscount * (commissionKomuto / 100))
                  let priceReceive = props.rounding(priceAfterDiscount - commision)
                  return (
                    <div className='detail-product' key={i}>
                      <div className='remove rightTop'>
                        { p.is_discount && <span className='icon-discount-sign' /> }
                        { p.is_wholesaler && <span className='icon-grosir-sign' /> }
                      </div>
                      <div className='purchase' onClick={(e) => props.productDetail(e, p)}>
                        <figure className='img-item xx'>
                          <MyImage src={p.image} alt='image' />
                        </figure>
                        <div className='content-product'>
                          <h3>{ p.name }</h3>
                          { (p.dropship_origin !== undefined) && <p className='dropship-worldsports'>Dropship dari {p.dropship_origin.name}</p> }
                          { (!p.hasOwnProperty('dropship_origin') && p.is_dropship) && <p className='dropship-item'>Terbuka untuk dropshipper</p> }
                          <p>Jumlah Stok : { p.stock }</p>
                          { p.is_discount && <p>Harga jual setelah diskon : Rp { RupiahFormat(priceAfterDiscount) }</p> }
                          <p>{ p.dropship_origin ? 'Komisi' : 'Uang' } yang diterima : Rp { RupiahFormat(priceReceive) }</p>
                        </div>
                      </div>
                    </div>
                  )
                })
              }
              <div className='see-all'>
                <span className='link'
                  onClick={() => Router.push(`/catalog?id=${sp.catalog.id}`)}>Lihat semua produk di katalog ini
                  <span className='icon-arrow-right' />
                </span>
              </div>
            </Element>
          )
        })
      }
      <div className='wrapper-sticky'>
        <a className='catalog-button js-option' onClick={() => props.showListCatalogPress()}>
          <span className='icon-catalog' /> Daftar Katalog
        </a>
      </div>

      <div className='sort-option' style={{ display: props.showListCatalog && 'block' }}>
        <div className='sort-list catalog-list' style={{ overflowY: 'inherit' }}>
          <ul>
            {
              props.catalogProducts.map((sp, index) => {
                return <li key={index}>
                  <Link activeClass='active' className={String(sp.catalog.id)} to={String(sp.catalog.id)} spy smooth duration={500}>{ sp.catalog.name }</Link>
                </li>
              })
            }
          </ul>
        </div>
        <a className='close-option js-close' onClick={() => props.showListCatalogPress()}>
          <span className='icon-close white' />
        </a>
      </div>
      <div className='wrapper-sticky'>
        <a className='sticky-button' onClick={() => Router.push('/product-add', '/product/add')}><span className='txt'>+</span></a>
      </div>
    </div>
  )
}

/** search product */
const SearchContent = (props) => {
  if (props.search === undefined) return null
  return (
    <div>
      {
        // <InfiniteScroll
        //   pageStart={0}
        //   loadMore={_.debounce(props.loadMore.bind(this), 500)}
        //   hasMore={props.hasMore}
        //   loader={<Loading size={12} color='#ef5656' className='is-fullwidth has-text-centered' />}>
        //   {
            props.search.results.map((p, i) => {
              let priceAfterDiscount = (p.is_discount) ? p.price - ((p.price * p.discount) / 100) : p.price
              return (
                <Element name={String(p.id)} className={`section is-paddingless detail`} key={i} style={{ marginBottom: 20 }}>
                  <div className='detail-product' key={i} onClick={(e) => props.productDetail(e, p)}>
                    <div className='remove rightTop'>
                      { p.is_discount && <span className='icon-discount-sign' /> }
                      { p.is_wholesaler && <span className='icon-grosir-sign' /> }
                    </div>
                    <div className='purchase'>
                      <figure className='img-item xx'>
                        <MyImage src={p.image} alt='image' />
                      </figure>
                      <div className='content-product'>
                        <h3>{ p.name }</h3>
                        { (p.dropship_origin !== undefined) && <p className='dropship-worldsports'>Dropship dari {p.dropship_origin.name}</p> }
                        { (!p.hasOwnProperty('dropship_origin') && p.is_dropship) && <p className='dropship-item'>Terbuka untuk dropshipper</p> }
                        <p>Jumlah Stok : { p.stock }</p>
                        <p>Harga jual setelah diskon : Rp { RupiahFormat(priceAfterDiscount) }</p>
                      </div>
                    </div>
                  </div>
                </Element>
              )
            })
        //   }
        // </InfiniteScroll>
      }
    </div>
  )
}

/** product empty content */
const ProductShowEmpty = () => {
  return (
    <section className='content'>
      <div className='container is-fluid'>
        <div className='desc has-text-centered'>
          <MyImage src={Images.emptyProduct} alt='notFound' />
          <p><strong>Tidak ada Produk yang Ditampilkan</strong></p>
          <p>Anda belum memiliki produk yang ditampilkan</p>
        </div>
      </div>
    </section>
  )
}

/** product empty content */
const ProductHiddenEmpty = () => {
  return (
    <section className='content'>
      <div className='container is-fluid'>
        <div className='desc has-text-centered'>
          <MyImage src={Images.emptyProduct} alt='notFound' />
          <p><strong>Tidak ada Produk yang disembunyikan</strong></p>
          <p>Anda belum memiliki produk yang disembunyikan</p>
        </div>
      </div>
    </section>
  )
}

/** product empty content */
const ProductNotFound = () => {
  return (
    <section className='content'>
      <div className='container is-fluid'>
        <div className='desc has-text-centered'>
          <MyImage src={Images.notFound} alt='notFound' />
          <p><strong>Produk tidak ditemukan</strong></p>
          <p>Kami tidak bisa menemukan barang yang anda inginkan</p>
        </div>
      </div>
    </section>
  )
}

const mapStateToProps = (state) => ({
  storeProducts: state.storeProducts,
  hiddenStoreProducts: state.hiddenStoreProducts,
  storeCatalogProductsSearch: state.storeCatalogProductsSearch
})

const mapDispatchToProps = (dispatch) => ({
  getStoreProducts: (params) => dispatch(storeActions.getStoreProducts(params)),
  getHiddenStoreProducts: (params) => dispatch(storeActions.getHiddenStoreProducts(params)),
  getStoreProductsByCatalogSearch: (params) => dispatch(storeActions.getStoreProductsByCatalogSearch(params))
})

export default connect(mapStateToProps, mapDispatchToProps)(ProductList)
