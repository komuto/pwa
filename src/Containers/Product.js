// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import NProgress from 'nprogress'
import _ from 'lodash'
import InfiniteScroll from 'react-infinite-scroller'
// components
import Content from '../Components/Content'
import Section from '../Components/Section'
import Product from '../Components/Product'
import ProductContainers from '../Components/ProductContainers'
import Notification from '../Components/Notification'
import LoadMoreLoading from '../Components/LoadMoreLoading'
// containers
import TabbarCategories from './TabbarCategories'
import Sort from './Sort'
import Filter from './Filter'
import { Navbar } from './Navbar'
// actions
import * as homeActions from '../actions/home'
import * as productActions from '../actions/product'
import * as expeditionActions from '../actions/expedition'
import * as locationActions from '../actions/location'
import * as brandActions from '../actions/brand'
// services
import { Status } from '../Services/Status'
import GET_TOKEN from '../Services/GetToken'

class MyProduct extends Component {
  constructor (props) {
    super(props)
    this.state = ({
      max: 50,
      token: null,
      query: {
        page: props.query.page || null,
        limit: props.query.limit || null,
        brands: props.query.brands || null,
        other: props.query.other || null,
        condition: props.query.condition || null,
        services: props.query.services || null,
        q: props.query.q || null,
        sort: props.query.sort || null,
        id: props.query.id || null
      },
      hasMore: true,
      pagination: {
        page: 1,
        limit: 10
      },
      hasMoreItems: true,
      productBySearch: props.productBySearch || null,
      categories: props.subCategory || [],
      expeditions: props.expeditions || null,
      provinces: props.provinces || null,
      districts: props.districts || null,
      brands: props.brands || null,
      sortActive: false,
      filterActive: false,
      viewActive: 'list',
      selectedSort: null,
      fetching: false,
      notification: {
        status: false,
        message: 'Error, default message.'
      }
    })
    this.wishlistId = null
    this.titleNavbar = this.createTitleNavbar(this.state.sort)
    this.params = {}
    this.element = []
  }

  // create title for navbar
  createTitleNavbar (param) {
    let result = ''
    switch (param) {
      case 'newest': result = 'Produk Terbaru'; break
      case 'cheapest': result = 'Produk Termurah'; break
      case 'expensive': result = 'Produk Termahal'; break
      case 'selling': result = 'Produk Terlaris'; break
      default: result = 'Produk'; break
    }
    return result
  }

  // sort button event
  sortOnClick = () => this.setState({ sortActive: true })
  // filter button event
  filterOnClick = () => this.setState({ filterActive: true })
  // filter view close
  filterClose = () => this.setState({ filterActive: false })
  // fetch district by province id
  onChangeProvinces = (id) => this.props.dispatch(locationActions.getDistrict({province_id: id}))

  viewOnClick () {
    let { viewActive } = this.state
    viewActive = viewActive === 'list' ? 'grid' : 'list'
    this.setState({ viewActive })
  }

  async loadMore () {
    console.log('loadMore()')
    // !this.props.productBySearch.isLoading &&
    // console.log(this.props.productBySearch)
    // const { pagination } = this.state
    // pagination.limit +=10
    // this.params.limit = pagination.limit
    // this.params.page = pagination.page
    // await this.props.dispatch(productActions.listProductBySearch(this.params))
    // this.setState({ pagination })
  }

  async wishlistPress (id) {
    let { productBySearch, token } = this.state
    if (token) {
      productBySearch.products.map((myProduct) => {
        if (myProduct.product.id === id) {
          (myProduct.product.is_liked) ? myProduct.product.count_like -= 1 : myProduct.product.count_like += 1
          myProduct.product.is_liked = !myProduct.product.is_liked
        }
      })
      await this.props.dispatch(productActions.addToWishlist({ id }))
      this.setState({ productBySearch })
    } else {
      this.setState({notification: {status: true, message: 'Anda harus login'}})
    }
  }

  sortSelected (selectedSort) {
    let { productBySearch } = this.state
    switch (selectedSort) {
      case 'termurah':
        productBySearch.products = _.orderBy(productBySearch.products, ['product.price'], ['asc'])
        break
      case 'termahal':
        productBySearch.products = _.orderBy(productBySearch.products, ['product.price'], ['desc'])
        break
      case 'terbaru':
        productBySearch.products = _.orderBy(productBySearch.products, ['product.created_at'], ['desc'])
        break
      case 'terlaris':
        productBySearch.products = _.orderBy(productBySearch.products, ['product.count_sold'], ['desc'])
        break
      default:
        break
    }
    this.setState({ selectedSort, sortActive: false, productBySearch })
  }

  async componentDidMount () {
    const { id, page, limit, sort, q, condition, services, other, brands } = this.state.query
    const { expeditions } = this.state.expeditions
    const { provinces } = this.state.provinces
    const myBrands = this.state.brands
    // generate params
    if (id) this.params.category_id = id
    if (page) this.params.page = page
    if (limit) this.params.limit = limit
    if (sort) this.params.sort = sort
    if (q) this.params.query = q
    if (condition) this.params.condition = condition
    if (services) this.params.services = services
    if (other) this.params.other = other
    if (brands) this.params.brands = brands
    // start loading
    NProgress.start()
    // fetch product & category
    if (id) await this.props.dispatch(homeActions.subCategory({ id }))
    await this.props.dispatch(productActions.listProductBySearch(this.params))
    // fetch init data when data in redux empty
    // fetch expeditions
    if (expeditions.length < 1) await this.props.dispatch(expeditionActions.getServices())
    // fetch provieces
    if (provinces.length < 1) await this.props.dispatch(locationActions.getProvince())
    // fetch brands
    if (myBrands.brands.length < 1) await this.props.dispatch(brandActions.getBrand())
    this.setState({ token: await GET_TOKEN.getToken() })
  }

  async filterRealization (filters) {
    filters.map((filter) => {
      switch (filter.id) {
        case 'condition':
            // set params conditions 'new' or 'used' or '' for both
          this.params.condition = ''
            // get status selected by id condition new
          if (_.find(filter.options, (option) => { return option.id === 'new' }).selected) this.params.condition = 'new'
            // get status selected by id condition used
          if (_.find(filter.options, (option) => { return option.id === 'used' }).selected) this.params.condition = 'used'
            // when selectedAll is checked so condition is ''
          if (filter.selectedAll) this.params.condition = ''
          break
        case 'expeditions':
            // set params expeditions services
            // get id service when selected is true
          const idServicesTrue = _.map(filter.options.filter((option) => { return option.selected }), 'id')
          this.params.services = (idServicesTrue.length > 0) ? idServicesTrue : []
          break
        case 'brands':
            // set params brands
            // get id service when selected is true
          const idBrandTrue = _.map(filter.options.filter((option) => { return option.selected }), 'id')
          this.params.brands = (idBrandTrue.length > 0) ? idBrandTrue : []
          break
        case 'others':
            // set params 'discount', 'verified', 'wholesaler'
          const idOthersTrue = _.map(filter.options.filter((option) => { return option.selected }), 'id')
          this.params.other = (idOthersTrue.length > 0) ? idOthersTrue : []
          break
        case 'sendFrom':
            // set params districs/kota pengiriman
          this.params.address = filter.districtsSelected ? filter.districtsSelected : ''
          break
        case 'harga':
          // set params for price range
          this.params.price = filter.priceMinimum + '-' + filter.priceMaximum
          break
        default:
          break
      }
    })
    // start loading
    NProgress.start()
    // fetch product by params
    await this.props.dispatch(productActions.listProductBySearch(this.params))
    // close filter
    this.setState({ filterActive: false })
  }

  async handleLoadMore () {
    let { pagination, fetching } = this.state
    if (!fetching) {
      pagination.page += 1
      this.params.page = pagination.page
      this.params.limit = pagination.limit
      await this.props.dispatch(productActions.listProductBySearch(this.params))
      this.setState({ pagination, fetching: true })
    }
  }

  async componentWillReceiveProps (nextProps) {
    const { productBySearch, subCategory, expeditions, provinces, brands, districts, addWishlist } = nextProps
    const { q } = nextProps.query
    let { notification, categories } = this.state
    // reset notification
    notification = {status: false, message: 'Error, default message.'}

    if (q) this.setState({ q })

    // console.log(productBySearch)

    // product data
    if (!productBySearch.isLoading) {
      NProgress.done()
      switch (productBySearch.status) {
        case Status.SUCCESS :
          if (productBySearch.isFound) {
            if (productBySearch.products.length < 1 && this.state.productBySearch.products.length < 1) notification = {status: true, message: 'Produk tidak tersedia'}
          } else {
            notification = {status: true, message: 'Data produk tidak ditemukan'}
          }
          break
        case Status.OFFLINE :
        case Status.FAILED :
          notification = {status: true, message: productBySearch.message}
          break
        default:
          break
      }
      let products = productBySearch.products.length > 0 ? this.state.productBySearch.products.concat(productBySearch.products) : this.state.productBySearch.products
      this.setState({ fetching: false, hasMore: (productBySearch.products.length > 0), productBySearch: { ...productBySearch, products }, notification })
    }

    // category data
    if (!subCategory.isLoading) {
      switch (subCategory.status) {
        case Status.SUCCESS :
          if (subCategory.isFound) { categories = subCategory.categories } else { notification = {status: true, message: 'Data kategori tidak ditemukan'} }
          break
        case Status.OFFLINE :
        case Status.FAILED :
          notification = {status: true, message: subCategory.message}
          break
        default:
          break
      }
      this.setState({ categories, notification })
    }

    // expeditions data
    if (!expeditions.isLoading) {
      switch (expeditions.status) {
        case Status.SUCCESS :
          if (!expeditions.isFound) notification = {status: true, message: 'Data ekpedisi tidak ditemukan'}
          break
        case Status.OFFLINE :
        case Status.FAILED :
          notification = {status: true, message: expeditions.message}
          break
        default:
          break
      }
      this.setState({ expeditions, notification })
    }

    // provinces data
    if (!provinces.isLoading) {
      switch (provinces.status) {
        case Status.SUCCESS :
          if (!provinces.isFound) notification = {status: true, message: 'Data provinsi tidak ditemukan'}
          break
        case Status.OFFLINE :
        case Status.FAILED :
          notification = {status: true, message: provinces.message}
          break
        default:
          break
      }
      this.setState({ provinces, notification })
    }

    // districs data
    if (!districts.isLoading) {
      switch (districts.status) {
        case Status.SUCCESS :
          if (!districts.isFound) notification = {status: true, message: 'Data provinsi tidak ditemukan'}
          break
        case Status.OFFLINE :
        case Status.FAILED :
          notification = {status: true, message: districts.message}
          break
        default:
          break
      }
      this.setState({ districts, notification })
    }

    // brands data
    if (!brands.isLoading) {
      switch (brands.status) {
        case Status.SUCCESS :
          if (!brands.isFound) notification = {status: true, message: 'Data brand tidak ditemukan'}
          break
        case Status.OFFLINE :
        case Status.FAILED :
          notification = {status: true, message: brands.message}
          break
        default:
          break
      }
      this.setState({ brands, notification })
    }

    if (!addWishlist.isLoading) {
      switch (addWishlist.status) {
        case Status.SUCCESS :
          if (addWishlist.isFound) {
            if (this.wishlistId && addWishlist.wishlist.id === this.wishlistId) {
              this.wishlistId = null
              await this.props.dispatch(productActions.listProductBySearch(this.params))
            }
          }
          break
        case Status.OFFLINE :
        case Status.FAILED :
          notification = {status: true, message: brands.message}
          break
        default:
          break
      }
    }
    if (!productBySearch.isLoading && !subCategory.isLoading) NProgress.done()
  }

  renderProductList (viewActive, products) {
    return (
      <Content>
        {
          products.map((myProduct, index) => {
            let { images, product, store } = myProduct
            return (
              <ProductContainers key={index}>
                <Product
                  viewActive={viewActive}
                  images={images}
                  store={store}
                  wishlistPress={(productId) => this.wishlistPress(productId)}
                  product={product} />
              </ProductContainers>
            )
          })
        }
      </Content>
    )
  }

  renderProductColoumn (viewActive, products) {
    return (
      <ProductContainers>
        {
          products.map((myProduct, index) => {
            const { images, product, store } = myProduct
            return (
              <Product
                key={index}
                viewActive={viewActive}
                images={images}
                store={store}
                wishlistPress={(productId) => this.wishlistPress(productId)}
                product={product} />
            )
          })
        }
      </ProductContainers>
    )
  }

  render () {
    const { q, categories, expeditions, provinces, brands, districts, notification, sortActive, filterActive, selectedSort, viewActive } = this.state
    const { products } = this.state.productBySearch
    const navbar = {
      searchBoox: false,
      path: '/',
      textPath: categories.name || this.titleNavbar || q,
      searchActive: !!q
    }
    const listProducts = (viewActive === 'list') ? this.renderProductList(viewActive, products) : this.renderProductColoumn(viewActive, products)

    return (
      <Content>
        <Navbar params={navbar} />
        <Notification
          type='is-danger'
          isShow={notification.status}
          activeClose
          onClose={() => this.setState({notification: {status: false, message: ''}})}
          message={notification.message} />
        <Section style={{marginBottom: '45px', overflowAnchor: 'none'}}>
          {
            products.length < 1
            ? null
            : <InfiniteScroll
              pageStart={0}
              loadMore={_.debounce(this.handleLoadMore.bind(this), 500)}
              hasMore={this.state.hasMore}
              loader={<LoadMoreLoading text='Loading...' />}>
              {
                    listProducts
                  }
            </InfiniteScroll>
          }
        </Section>
        <TabbarCategories
          sortButton
          filterButton
          viewButton
          sortOnClick={() => this.sortOnClick()}
          filterOnClick={() => this.filterOnClick()}
          viewOnClick={() => this.viewOnClick()}
          viewActive={viewActive} />
        <Sort
          isShow={sortActive}
          selected={selectedSort}
          sortSelected={(data) => this.sortSelected(data)} />
        <Filter
          isShow={filterActive}
          filterClose={() => this.filterClose()}
          filterRealization={(params) => this.filterRealization(params)}
          onChangeProvinces={(id) => this.onChangeProvinces(id)}
          expeditions={expeditions.expeditions}
          provinces={provinces.provinces}
          brands={brands.brands}
          districts={districts.districts} />
      </Content>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    productBySearch: state.productBySearch,
    subCategory: state.subCategory,
    expeditions: state.expeditionServices,
    provinces: state.provinces,
    districts: state.districts,
    brands: state.brands,
    addWishlist: state.addWishlist
  }
}
export default connect(mapStateToProps)(MyProduct)
