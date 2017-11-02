/** including dependencies */
import React from 'react'
import { connect } from 'react-redux'
import Link from 'next/link'
import NProgress from 'nprogress'
import _ from 'lodash'
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
import Wizard from '../../Components/Wizard'
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
/** including validations */
import * as inputValidations from '../../Validations/Input'

class ProductAddFromDropshipper extends React.Component {
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
      dropshipProducts: props.dropshipProducts || null,
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
      isEmpty: false,
      pagination: {
        page: 1,
        limit: 10
      },
      notification: this.props.notification,
      searchText: ''
    })
    this.filterRealizationStatus = false
    this.wishlistId = null
    this.params = {}
    this.element = []

    /** define submitting status */
    this.submitting = {
      dropshipProducts: false,
      subCategory: false,
      expeditionServices: false,
      provinces: false,
      districts: false,
      brands: false,
      addWishlist: false,
      searchItem: false
    }
  }

  doSearch (e) {
    let searchText = inputValidations.inputNormal(e.target.value)
    this.setState({ searchText: searchText })
    if (this.timeout) clearTimeout(this.timeout)
    this.timeout = setTimeout(() => {
      if (searchText) {
        this.submitting = { ...this.submitting, searchItem: true }
        NProgress.start()
        this.props.getDropshipProducts({ q: this.state.searchText })
      } else {
        NProgress.start()
        this.submitting = { ...this.submitting, dropshipProducts: true }
        this.props.getDropshipProducts({ page: 1, limit: 10 })
      }
    }, 1000)
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
      this.wishlistId = id
      this.submitting = { ...this.submitting, addWishlist: true }
      this.props.addToWishlist({ id })
    } else {
      this.props.alertLogin()
    }
  }

  /** handling load more products */
  handleLoadMore () {
    let { pagination } = this.state
    if (!this.submitting.dropshipProducts) {
      pagination.page += 1
      this.params = { ...this.params, ...pagination }
      this.submitting = { ...this.submitting, dropshipProducts: true }
      this.props.getDropshipProducts(this.params)
      this.setState({ pagination })
    }
  }

  /** sort product price cheapest  */
  sortProductByCheapest () {
    return _.orderBy(this.state.dropshipProducts.products, ['product.price'], ['asc'])
  }

  /** sort product price expensive  */
  sortProductByExpensive () {
    return _.orderBy(this.state.dropshipProducts.products, ['product.price'], ['desc'])
  }

  /** sort product newest  */
  sortProductByNewest () {
    return _.orderBy(this.state.dropshipProducts.products, ['product.created_at'], ['desc'])
  }

  /** sort product newest  */
  sortProductBySelling () {
    return _.orderBy(this.state.dropshipProducts.products, ['product.count_sold'], ['desc'])
  }

  /** handling sort changed */
  sortSelected (selectedSort) {
    let { dropshipProducts } = this.state

    if (selectedSort === 'termurah') {
      dropshipProducts.products = this.sortProductByCheapest()
    }

    if (selectedSort === 'termahal') {
      dropshipProducts.products = this.sortProductByExpensive()
    }

    if (selectedSort === 'terbaru') {
      dropshipProducts.products = this.sortProductByNewest()
    }

    if (selectedSort === 'terlaris') {
      dropshipProducts.products = this.sortProductBySelling()
    }

    this.setState({ selectedSort, sortActive: false, dropshipProducts })
  }

  componentDidMount () {
    const { id, page, limit, sort, q, condition, services, other, brands, ids, idc } = this.state.query
    this.scrollToTop()
    if (id) this.params.category_id = id
    if (page) this.params.page = page
    if (limit) this.params.limit = limit
    if (sort) this.params.sort = sort
    if (q) this.params.query = q
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
      dropshipProducts: true,
      expeditionServices: true,
      provinces: true,
      brands: true
    }

    /** fetch list product */
    this.props.getDropshipProducts(this.params)

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
    this.submitting = { ...this.submitting, dropshipProducts: true }
    delete this.params.page
    delete this.params.limit

    this.props.getDropshipProducts(this.params)

    /** close filter */
    this.setState({ filterActive: false, pagination: { page: 1, limit: 10 } })
  }

  componentWillReceiveProps (nextProps) {
    const { dropshipProducts, subCategory, expeditionServices, provinces, brands, districts, addWishlist } = nextProps
    const { isFetching, isError, isFound, notifError } = this.props
    const { q } = nextProps.query
    let products = []

    if (q) this.setState({ q })

    // handling search dropship
    if (!isFetching(dropshipProducts) && this.submitting.searchItem) {
      NProgress.done()
      this.submitting = { ...this.submitting, searchItem: false }
      if (isFound(dropshipProducts)) {
        let uniqData = dropshipProducts.products.filter((data, index, self) =>
          self.findIndex((p) => { return p.product.id === data.product.id }) === index
        )
        let isEmpty = uniqData.length < 1
        let newState = { dropshipProducts, hasMore: false, isEmpty }
        newState.dropshipProducts['products'] = uniqData
        this.setState(newState)
      }
      if (isError(dropshipProducts)) {
        this.setState({ notification: notifError(dropshipProducts.message) })
      }
    }

    /** handling state list dropshipProducts  */
    if (!isFetching(dropshipProducts) && this.submitting.dropshipProducts) {
      NProgress.done()
      this.submitting = { ...this.submitting, dropshipProducts: false }
      if (isError(dropshipProducts)) {
        this.setState({ notification: notifError(dropshipProducts.message) })
      }
      if (isFound(dropshipProducts)) {
        dropshipProducts.products = dropshipProducts.products.filter((data, index, self) =>
          self.findIndex((p) => { return p.product.id === data.product.id }) === index
        )
        let hasMore = dropshipProducts.products.length > 9
        let isEmpty = dropshipProducts.products.length < 1
        if (this.filterRealizationStatus) {
          this.filterRealizationStatus = false
          this.setState({
            dropshipProducts,
            hasMore,
            isEmpty
          })
        } else {
          products = this.state.dropshipProducts.products.concat(dropshipProducts.products)
          this.setState({
            dropshipProducts: { ...dropshipProducts, products },
            hasMore,
            isEmpty
          })
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
      this.submitting = { ...this.submitting, addWishlist: false }
      if (isError(addWishlist)) {
        this.setState({ notification: notifError(addWishlist.message) })
      }
      if (isFound(addWishlist)) {
        /** update love button when status addWishlist success */
        dropshipProducts.products.some((product) => {
          if (product.product.id === this.wishlistId) {
            product.product.is_liked = addWishlist.wishlist.is_liked
            if (addWishlist.wishlist.is_liked) {
              product.product.count_like += 1
            } else {
              product.product.count_like -= 1
            }
            return true
          }
        })
        this.wishlistId = null
        this.setState({ dropshipProducts })
      }
    }
  }

  render () {
    const { searchText, categories, isEmpty, expeditionServices, provinces, brands, districts, notification, filterActive, viewActive } = this.state
    const { isFound } = this.props
    const { q, sort, ids, idc, slug } = this.state.query

    const isCatalog = ids && idc
    /** define params for navbar */
    let params = {
      navbar: {
        searchBoox: false,
        path: '/',
        textPath: 'Produk',
        searchActive: !!q
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
    return (
      <Content>
        <Navbar {...params} />
        <Notification
          type={notification.type}
          isShow={notification.status}
          activeClose
          onClose={() => this.setState({notification: {status: false, message: ''}})}
          message={notification.message} />
        <Wizard total={3} active={1} />
        <section className='section is-paddingless'>
          <div className='field search-form paddingless'>
            <p className='control has-icons-left'>
              <input
                className='input is-medium'
                type='text'
                name='search'
                onChange={(e) => this.doSearch(e)}
                placeholder='Cari barang'
                value={searchText} />
              <span className='icon is-left'>
                <span className='icon-search' />
              </span>
            </p>
          </div>
          <ul>
            {/* {
              searchProduct.isFound
              ? searchProduct.products.map((product, index) => {
                return (
                  <li
                    key={index}
                    onClick={() => {
                      Router.push(
                          url.format({
                            pathname: '/product',
                            query: {q: product.name}
                          }),
                          `/p?q=${product.name}`
                      )
                    }} >{ product.name }</li>
                )
              })
              : ''
            } */}
          </ul>
        </section>
        <section className='section is-paddingless'>
          <div className='categories-option'>
            <Link href='/categories1?type=dropship'>
              <a className='choose-option modal-button' data-target='#modal-categories'>
                <span>Kategori : Semua Kategori</span><span className='icon-arrow-down' /></a>
            </Link>
          </div>
        </section>

        <Section style={{marginBottom: '45px', overflowAnchor: 'none'}}>
          {
            isEmpty
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
const ProductContent = ({dropshipProducts, viewActive, hasMore, wishlistPress, handleLoadMore}) => {
  return (
    <InfiniteScroll
      pageStart={0}
      loadMore={_.debounce(handleLoadMore, 250)}
      hasMore={hasMore}
      loader={<Loading size={12} color='#ef5656' className='is-fullwidth has-text-centered' />}>
      {
        (viewActive === 'list')
          ? <ListContent {...dropshipProducts} viewActive={viewActive} wishlistPress={wishlistPress} />
          : <GridContent {...dropshipProducts} viewActive={viewActive} wishlistPress={wishlistPress} />
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
          wishlistPress={(p) => wishlistPress(p)}
          type='dropship' />
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
        wishlistPress={(p) => wishlistPress(p)}
        type='dropship' />
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
  dropshipProducts: state.dropshipProducts,
  subCategory: state.subCategory,
  expeditionServices: state.expeditionServices,
  provinces: state.provinces,
  districts: state.districts,
  brands: state.brands,
  addWishlist: state.addWishlist
})

const mapDispatchToProps = dispatch => ({
  getDropshipProducts: (params) => dispatch(productActions.getDropshipProducts(params)),
  getDistrict: (params) => dispatch(locationActions.getDistrict(params)),
  addToWishlist: (params) => dispatch(productActions.addToWishlist(params)),
  getSubCategory: (params) => dispatch(homeActions.subCategory(params)),
  search: (params) => dispatch(homeActions.search(params)),
  getServices: () => dispatch(expeditionActions.getServices()),
  getProvince: () => dispatch(locationActions.getProvince()),
  getBrand: () => dispatch(brandActions.getBrand())
})

export default connect(mapStateToProps, mapDispatchToProps)(ProductAddFromDropshipper)
