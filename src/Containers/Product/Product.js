/**
 * Safei Muslim
 * Yogyakarta , revamp: 16 Oktober 2017
 * PT Skyshi Digital Indonesa
 */

/** including dependencies */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import NProgress from 'nprogress'
import _ from 'lodash'
import Router from 'next/router'
import InfiniteScroll from 'react-infinite-scroller'
import { animateScroll } from 'react-scroll'
/** including components */
import Content from '../../Components/Content'
import Section from '../../Components/Section'
import Product from '../../Components/Product'
import ProductContainers from '../../Components/ProductContainers'
import Notification from '../../Components/Notification'
import Loading from '../../Components/Loading'
import MyImage from '../../Components/MyImage'
/** including anothers containers */
import TabbarCategories from '../TabbarCategories'
import Sort from '../Sort'
import Filter from '../Filter'
import { Navbar } from '../Navbar'
/** including actions */
import * as homeActions from '../../actions/home'
import * as productActions from '../../actions/product'
import * as expeditionActions from '../../actions/expedition'
import * as locationActions from '../../actions/location'
import * as brandActions from '../../actions/brand'
/** including themes */
import Images from '../../Themes/Images'
/** including Libs */
import ReadAbleText from '../../Lib/ReadAbleText'

class MyProduct extends Component {
  constructor (props) {
    super(props)
    this.state = ({
      max: 50,
      query: {
        slug: props.query.slug || null,
        page: props.query.page || null,
        limit: props.query.limit || null,
        brands: props.query.brands || null,
        other: props.query.other || null,
        condition: props.query.condition || null,
        services: props.query.services || null,
        q: props.query.q || null,
        sort: props.query.sort || null,
        id: props.query.id || null,
        ids: props.query.ids || null, // id store
        idc: props.query.idc || null // id catalog
      },
      productBySearch: null,
      categories: props.subCategory.categories || [],
      expeditionServices: props.expeditionServices || null,
      coba: props.expeditionServices || null,
      provinces: props.provinces || null,
      districts: props.districts || null,
      brands: props.brands || null,
      sortActive: false,
      filterActive: false,
      viewActive: 'list',
      selectedSort: null,
      hasMore: false,
      isEmpty: 'default',
      pagination: {
        page: 1,
        limit: 10
      },
      notification: this.props.notification
    })
    this.filterRealizationStatus = false
    this.wishlistId = null
    this.wishlistReadyToCick = true
    this.params = {}
    this.element = []

    /** define submitting status */
    this.submitting = {
      productBySearch: false,
      subCategory: false,
      expeditionServices: false,
      provinces: false,
      districts: false,
      brands: false,
      addWishlist: false,
      resetAddToWishlist: false,
      sortStatus: false
    }
  }

  /** reset scroll */
  scrollToTop () {
    animateScroll.scrollTo(0, {duration: 0})
  }

  /** handling sort button press */
  sortOnClick (e) {
    if (!e.target.className.includes('sortButton')) return
    this.setState({ sortActive: !this.state.sortActive })
  }

  /** handling filter button press */
  filterOnClick () {
    this.setState({ filterActive: !this.state.filterActive })
  }

  /** handling province changed */
  onChangeProvinces (id) {
    this.submitting = { ...this.submitting, districts: true }
    this.props.getDistrict({ province_id: id })
  }

  /** handling sort button click: list or grid view */
  viewOnClick () {
    this.setState({ viewActive: this.state.viewActive === 'list' ? 'grid' : 'list' })
  }

  /** handling wishlist / love button press */
  wishlistPress (id) {
    if (this.props.isLogin) {
      if (this.wishlistReadyToCick) {
        this.wishlistId = id
        this.wishlistReadyToCick = false
        this.submitting = { ...this.submitting, addWishlist: true }
        this.props.addToWishlist({ id })
      }
    } else {
      this.props.alertLogin()
    }
  }

  /** handling load more products */
  handleLoadMore () {
    let { pagination } = this.state
    if (!this.submitting.productBySearch) {
      pagination.page += 1
      this.params = { ...this.params, ...pagination }
      this.submitting = { ...this.submitting, productBySearch: true }
      let params = this.generateParamsUrl()
      Router.replace(`/product?${params}`, `/p?${params}`)
      this.props.listProductBySearch(this.params)
      this.setState({ pagination })
    }
  }

  generateParamsUrl () {
    let params = ''
    let { page, limit, sort, q, condition, services, other, brands, ids, idc } = this.params
    let categoryId = this.params.catalog_id // not camel case

    if (sort) params += `sort=${sort}&`
    if (categoryId) params += `id=${categoryId}&`
    if (page) params += `page=${page}&`
    if (limit) params += `limit=${limit}&`
    if (q) params += `q=${q}&`
    if (condition) params += `condition=${condition}&`
    if (services) params += `services=${services}&`
    if (other) params += `other=${other}&`
    if (brands) params += `brands=${brands}&`
    if (idc) params += `idc=${idc}&`
    if (ids) params += `ids=${ids}&`

    return params
  }

  /** sort product price cheapest  */
  sortProductByCheapest () {
    this.params.sort = 'cheapest'
    this.submitting = { ...this.submitting, productBySearch: true, sortStatus: true }
    let params = this.generateParamsUrl()
    Router.replace(`/product?${params}`, `/p?${params}`)
    this.props.listProductBySearch(this.params)
  }

  /** sort product price expensive  */
  sortProductByExpensive () {
    this.params.sort = 'expensive'
    this.submitting = { ...this.submitting, productBySearch: true, sortStatus: true }
    let params = this.generateParamsUrl()
    Router.replace(`/product?${params}`, `/p?${params}`)
    this.props.listProductBySearch(this.params)
  }

  /** sort product newest  */
  sortProductByNewest () {
    this.params.sort = 'newest'
    this.submitting = { ...this.submitting, productBySearch: true, sortStatus: true }
    let params = this.generateParamsUrl()
    Router.replace(`/product?${params}`, `/p?${params}`)
    this.props.listProductBySearch(this.params)
  }

  /** sort product newest  */
  sortProductBySelling () {
    this.params.sort = 'selling'
    this.submitting = { ...this.submitting, productBySearch: true, sortStatus: true }
    let params = this.generateParamsUrl()
    Router.replace(`/product?${params}`, `/p?${params}`)
    this.props.listProductBySearch(this.params)
  }

  /** handling sort changed */
  sortSelected (selectedSort) {
    this.scrollToTop()
    NProgress.start()
    this.params.page = 1
    this.params.limit = 10

    if (selectedSort === 'termurah') {
      this.sortProductByCheapest()
    }

    if (selectedSort === 'termahal') {
      // productBySearch.products = this.sortProductByExpensive()
      this.sortProductByExpensive()
    }

    if (selectedSort === 'terbaru') {
      // productBySearch.products = this.sortProductByNewest()
      this.sortProductByNewest()
    }

    if (selectedSort === 'terlaris') {
      // productBySearch.products = this.sortProductBySelling()
      this.sortProductBySelling()
    }

    this.setState({ selectedSort, sortActive: false, pagination: { page: 1, limit: 10 } })
  }

  componentDidMount () {
    this.scrollToTop()
    const { id, page, limit, sort, q, condition, services, other, brands, ids, idc } = this.state.query
    if (id) this.params.category_id = id
    if (page) this.params.page = page
    if (limit) this.params.limit = limit
    if (sort) this.params.sort = sort
    if (q) this.params.q = q
    if (condition) this.params.condition = condition
    if (services) this.params.services = services
    if (other) this.params.other = other
    if (brands) this.params.brands = brands
    if (ids && idc) {
      this.params.store_id = ids
      this.params.catalog_id = idc
    }

    /** start loading */
    NProgress.start()

    /** fetch product & category */
    // let { id } = this.state.query
    if (id) {
      this.submitting = { ...this.submitting, subCategory: true }
      this.props.getSubCategory({ id })
    }

    this.submitting = {
      ...this.submitting,
      productBySearch: true,
      expeditionServices: true,
      provinces: true,
      brands: true
    }

    /** fetch list product */
    this.props.listProductBySearch(this.params)

    /** fetch services */
    this.props.getServices()

    /** fetch provinces */
    this.props.getProvince()

    /** fetch brands */
    this.props.getBrand()
  }

  /** handling filter button press */
  filterRealization (filters) {
    this.scrollToTop()
    filters.map((filter) => {
      switch (filter.id) {
        case 'condition':
          // set params conditions 'new' or 'used
          let isNew = (_.find(filter.options, (option) => { return option.id === 'new' }).selected)
          let isUsed = (_.find(filter.options, (option) => { return option.id === 'used' }).selected)
          if (isNew) this.params.condition = 'new'
          if (isUsed) this.params.condition = 'used'
          if (isNew && isUsed) delete this.params.condition
          break
        case 'expeditionServices':
          // set params expeditionServices services
          // get id service when selected is true
          let idServicesTrue = _.map(filter.options.filter((option) => { return option.selected }), 'id')
          if (idServicesTrue.length > 0) {
            this.params.services = idServicesTrue
          } else {
            delete this.params.services
          }
          break
        case 'brands':
          // set params brands
          // get id service when selected is true
          let idBrandTrue = _.map(filter.options.filter((option) => { return option.selected }), 'id')
          if (idBrandTrue.length > 0) {
            this.params.brands = idBrandTrue
          } else {
            delete this.params.brands
          }
          break
        case 'others':
          // set params 'discount', 'verified', 'wholesaler'
          let idOthersTrue = _.map(filter.options.filter((option) => { return option.selected }), 'id')
          if (idOthersTrue.length > 0) {
            this.params.other = idOthersTrue
          } else {
            delete this.params.other
          }
          break
        case 'sendFrom':
          // set params districs/kota pengiriman
          if (filter.districtsSelected) {
            this.params.address = filter.districtsSelected
          } else {
            delete this.params.address
          }
          break
        case 'harga':
          // set params for price range
          this.params.price = filter.priceMinimum + '-' + filter.priceMaximum
          if (Number(filter.priceMinimum) === 0 && Number(filter.priceMaximum) === 0) delete this.params.price
          break
        default:
          break
      }
    })
    // start loading
    NProgress.start()
    // fetch product by params
    this.filterRealizationStatus = true
    this.submitting = { ...this.submitting, productBySearch: true }
    this.params.page = 1
    this.params.limit = 10
    delete this.params.sort
    let params = this.generateParamsUrl()
    Router.replace(`/product?${params}`, `/p?${params}`)
    this.props.listProductBySearch(this.params)

    /** close filter */
    this.setState({ filterActive: false, pagination: { page: 1, limit: 10 } })
  }

  componentWillReceiveProps (nextProps) {
    const { productBySearch, subCategory, expeditionServices, provinces, brands, districts, addWishlist, query } = nextProps
    const { isFetching, isError, isFound, notifError } = this.props
    let products = []

    // if (q) this.setState({ q })
    /** handling state list productBySearch  */
    if (!isFetching(productBySearch) && this.submitting.productBySearch) {
      NProgress.done()
      this.submitting = { ...this.submitting, productBySearch: false }
      if (isError(productBySearch)) {
        this.setState({ notification: notifError(productBySearch.message) })
      }
      if (isFound(productBySearch)) {
        let hasMore = productBySearch.products.length > 9
        if (this.filterRealizationStatus) {
          // when user filter
          this.filterRealizationStatus = false
          this.setState({
            productBySearch,
            query: { ...this.state.query, ...query },
            hasMore
          })
        } else if (this.submitting.sortStatus) {
          // when user sort
          this.submitting = { ...this.submitting, sortStatus: false }
          this.setState({
            productBySearch,
            query: { ...this.state.query, ...query },
            hasMore
          })
        } else {
          if (this.state.productBySearch) {
            // when user scroll
            products = this.state.productBySearch.products.concat(productBySearch.products)
            this.setState({
              productBySearch: { ...productBySearch, products },
              hasMore
            })
          } else {
            // default state
            this.setState({
              productBySearch,
              hasMore
            })
          }
        }
      }
    }

    /** handling state category */
    if (!isFetching(subCategory) && this.submitting.subCategory) {
      this.submitting = { ...this.submitting, subCategory: false }
      if (isError(subCategory)) {
        this.setState({ notification: notifError(subCategory.message) })
      }
      if (isFound(subCategory)) {
        this.setState({ categories: subCategory.categories })
      }
    }

    /** handling state provinces */
    if (!isFetching(expeditionServices) && this.submitting.expeditionServices) {
      this.submitting = { ...this.submitting, expeditionServices: false }
      if (isError(expeditionServices)) {
        this.setState({ notification: notifError(expeditionServices.message) })
      }
      if (isFound(expeditionServices)) {
        this.setState({ expeditionServices })
      }
    }

    /** handling state provinces */
    if (!isFetching(provinces) && this.submitting.provinces) {
      this.submitting = { ...this.submitting, provinces: false }
      if (isError(provinces)) {
        this.setState({ notification: notifError(provinces.message) })
      }
      if (isFound(provinces)) {
        this.setState({ provinces })
      }
    }

    /** handling state districts */
    if (!isFetching(districts) && this.submitting.districts) {
      this.submitting = { ...this.submitting, districts: false }
      if (isError(districts)) {
        this.setState({ notification: notifError(districts.message) })
      }
      if (isFound(districts)) {
        this.setState({ districts })
      }
    }

    /** handling state brands */
    if (!isFetching(brands) && this.submitting.brands) {
      this.submitting = { ...this.submitting, brands: false }
      if (isError(brands)) {
        this.setState({ notification: notifError(brands.message) })
      }
      if (isFound(brands)) {
        this.setState({ brands })
      }
    }

    /** handling state addWishlist, when user click love buntton */
    if (!isFetching(addWishlist) && this.submitting.addWishlist) {
      if (isError(addWishlist)) {
        this.setState({ notification: notifError(addWishlist.message) })
      }
      if (isFound(addWishlist)) {
        /** update love button when status addWishlist success */
        productBySearch.products.some((product) => {
          if (product.product.id === this.wishlistId) {
            product.product.is_liked = addWishlist.wishlist.is_liked
            let minCountLiked = 0
            if (addWishlist.wishlist.is_liked) {
              product.product.count_like += 1
            } else {
              if (product.product.count_like > minCountLiked) {
                product.product.count_like -= 1
              }
            }
            return true
          }
        })
        this.wishlistId = null
        this.setState({ productBySearch })
        this.submitting = { ...this.submitting, addWishlist: false, resetAddToWishlist: true }
      }
    }

    if (this.submitting.resetAddToWishlist) {
      this.props.resetAddToWishlist()
      if (!addWishlist.isFound) {
        this.wishlistReadyToCick = true
        this.submitting = { ...this.submitting, resetAddToWishlist: false }
      }
    }
  }

  render () {
    const { productBySearch, categories, expeditionServices, provinces, brands, districts, notification, filterActive, viewActive } = this.state
    const { isFound } = this.props
    const { q, sort, ids, idc, slug } = this.state.query
    let { isEmpty } = this.state

    const isCatalog = ids && idc
    /** define params for navbar */
    let params = {
      navbar: {
        searchBoox: false,
        path: '/',
        callBack: () => Router.push('/'),
        textPath: 'Produk',
        searchActive: !!q,
        searchStandard: true
      }
    }

    /** define textpath when categories.name ready  */
    if (categories.name) {
      params.navbar.textPath = categories.name
    }

    /** define textpath when q ready  */
    if (q) {
      params.navbar.textPath = q
    }

    /** define textpath when sort ready  */
    if (sort) {
      let indexSortType = SortType.indexOf(sort)
      params.navbar.textPath = indexSortType > -1 ? SortTypeMessage[indexSortType] : 'Produk'
    }

    /** calog product */
    if (isCatalog) {
      params.navbar.textPath = ReadAbleText(slug)
    }

    if (productBySearch) {
      if (isFound(productBySearch)) {
        isEmpty = (productBySearch.products.length < 1)
      }
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
        <Section style={{marginBottom: '45px', overflowAnchor: 'none'}}>
          {
            (isEmpty !== 'default' && isEmpty)
              ? <ProductEmpty />
              : <ProductContent
                {...this.state}
                wishlistPress={(id) => this.wishlistPress(id)}
                handleLoadMore={() => this.handleLoadMore()} />
          }
        </Section>
        <TabbarCategories
          sortButton
          filterButton={!isCatalog}
          viewButton
          sortOnClick={(e) => this.sortOnClick(e)}
          filterOnClick={() => this.filterOnClick()}
          viewOnClick={() => this.viewOnClick()}
          viewActive={viewActive} />
        <Sort
          {...this.state}
          sortOnClick={(e) => this.sortOnClick(e)}
          sortSelected={(data) => this.sortSelected(data)} />
        {
          isFound(expeditionServices) && isFound(provinces) && isFound(brands) &&
          <Filter
            {...this.state}
            {...expeditionServices}
            {...provinces}
            {...brands}
            {...districts}
            isShow={filterActive}
            filterOnClick={() => this.filterOnClick()}
            filterRealization={(params) => this.filterRealization(params)}
            onChangeProvinces={(id) => this.onChangeProvinces(id)} />
        }
      </Content>
    )
  }
}

/** product content */
const ProductContent = ({productBySearch, viewActive, hasMore, wishlistPress, handleLoadMore}) => {
  if (!productBySearch) return null
  return (
    <InfiniteScroll
      pageStart={0}
      loadMore={_.debounce(handleLoadMore, 0)}
      hasMore={hasMore}
      loader={<Loading size={12} color='#ef5656' className='is-fullwidth has-text-centered' />}>
      {
        (viewActive === 'list')
          ? <ListContent {...productBySearch} viewActive={viewActive} wishlistPress={wishlistPress} />
          : <GridContent {...productBySearch} viewActive={viewActive} wishlistPress={wishlistPress} />
      }
    </InfiniteScroll>
  )
}

/** product with list content */
const ListContent = ({ products, viewActive, wishlistPress }) => (
  <Content>
    {
    products.map((myProduct, index) => (
      <ProductContainers key={index}>
        <Product
          {...myProduct}
          viewActive={viewActive}
          wishlistPress={(p) => wishlistPress(p)} />
      </ProductContainers>
    ))
  }
  </Content>
)

/** product with grid content */
const GridContent = ({ products, viewActive, wishlistPress }) => (
  <ProductContainers>
    {
    products.map((myProduct, index) => (
      <Product
        {...myProduct}
        key={index}
        viewActive={viewActive}
        wishlistPress={(p) => wishlistPress(p)} />
  ))
  }
  </ProductContainers>
)

/** product empty content */
const ProductEmpty = () => {
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

/** type of sorting */
export const SortType = ['newest', 'cheapest', 'expensive', 'selling']

/** type of sorting message text for user  */
export const SortTypeMessage = ['Produk Terbaru', 'Produk Termurah', 'Produk Termahal', 'Produk Terlaris']

const mapStateToProps = (state) => ({
  productBySearch: state.productBySearch,
  subCategory: state.subCategory,
  expeditionServices: state.expeditionServices,
  provinces: state.provinces,
  districts: state.districts,
  brands: state.brands,
  addWishlist: state.addWishlist
})

const mapDispatchToProps = (dispatch) => ({
  getDistrict: (params) => dispatch(locationActions.getDistrict(params)),
  addToWishlist: (params) => dispatch(productActions.addToWishlist(params)),
  resetAddToWishlist: (params) => dispatch(productActions.resetAddToWishlist(params)),
  listProductBySearch: (params) => dispatch(productActions.listProductBySearch(params)),
  getSubCategory: (params) => dispatch(homeActions.subCategory(params)),
  getServices: () => dispatch(expeditionActions.getServices()),
  getProvince: () => dispatch(locationActions.getProvince()),
  getBrand: () => dispatch(brandActions.getBrand())
})

export default connect(mapStateToProps, mapDispatchToProps)(MyProduct)
