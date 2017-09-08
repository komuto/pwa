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
import Loading from '../Components/Loading'
import MyImage from '../Components/MyImage'
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
import { validateResponse, isFetching, Status } from '../Services/Status'
import GET_TOKEN from '../Services/GetToken'
// themes
import Images from '../Themes/Images'

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
      productBySearch: props.productBySearch,
      categories: props.subCategory || [],
      expeditionServices: props.expeditionServices || null,
      provinces: props.provinces || null,
      districts: props.districts || null,
      brands: props.brands || null,
      sortActive: false,
      filterActive: false,
      viewActive: 'list',
      selectedSort: null,
      fetching: false,
      pagination: {
        page: 1,
        limit: 10
      },
      notification: {
        status: false,
        message: 'Error, default message.'
      }
    })
    this.filterRealizationStatus = false
    this.wishlistId = null
    this.params = {}
    this.element = []
  }

  // sort button event
  sortOnClick = (e) => {
    if (!e.target.className.includes('sortButton')) return
    this.setState({ sortActive: !this.state.sortActive })
  }
  // filter button event
  filterOnClick = () => this.setState({ filterActive: true })
  // filter view close
  filterClose = () => this.setState({ filterActive: false })
  // fetch district by province id
  onChangeProvinces = (id) => this.props.getDistrict({province_id: id})

  viewOnClick () {
    let { viewActive } = this.state
    viewActive = viewActive === 'list' ? 'grid' : 'list'
    this.setState({ viewActive })
  }

  async wishlistPress (id) {
    let { productBySearch, token } = this.state
    if (token) {
      productBySearch.products.map((myProduct) => {
        if (myProduct.product.id === id) {
          (myProduct.product.is_liked)
          ? myProduct.product.count_like -= 1
          : myProduct.product.count_like += 1
          myProduct.product.is_liked = !myProduct.product.is_liked
        }
      })
      await this.props.addToWishlist({ id })
      this.setState({ productBySearch })
    } else {
      this.setState({notification: {status: true, message: 'Anda harus login'}})
    }
  }

  async handleLoadMore () {
    let { pagination, fetching } = this.state

    if (!fetching) {
      pagination.page += 1
      this.params.page = pagination.page
      this.params.limit = pagination.limit
      await this.props.listProductBySearch(this.params)
      this.setState({ pagination, fetching: true })
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
    const { expeditionServices } = this.state.expeditionServices
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
    if (id) await this.props.subCategory({ id })
    await this.props.listProductBySearch(this.params)
    // fetch init data when data in redux empty
    // fetch expeditionServices
    if (expeditionServices.length < 1) await this.props.getServices()
    // fetch provieces
    if (provinces.length < 1) await this.props.getProvince()
    // fetch brands
    if (myBrands.brands.length < 1) await this.props.getBrand()
    this.setState({ token: await GET_TOKEN.getToken() })
  }

  async filterRealization (filters) {
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
          const idServicesTrue = _.map(filter.options.filter((option) => { return option.selected }), 'id')
          if (idServicesTrue.length > 0) {
            this.params.services = idServicesTrue
          } else {
            delete this.params.services
          }
          break
        case 'brands':
            // set params brands
            // get id service when selected is true
          const idBrandTrue = _.map(filter.options.filter((option) => { return option.selected }), 'id')
          if (idBrandTrue.length > 0) {
            this.params.brands = idBrandTrue
          } else {
            delete this.params.brands
          }
          break
        case 'others':
            // set params 'discount', 'verified', 'wholesaler'
          const idOthersTrue = _.map(filter.options.filter((option) => { return option.selected }), 'id')
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
    delete this.params.page
    delete this.params.limit
    await this.props.listProductBySearch(this.params)
    // close filter
    this.setState({ filterActive: false })
  }

  async componentWillReceiveProps (nextProps) {
    const { productBySearch, subCategory, expeditionServices, provinces, brands, districts, addWishlist } = nextProps
    const { q } = nextProps.query
    let { categories } = this.state
    let stateProductBySearch = this.state.productBySearch
    let products = []

    if (q) this.setState({ q })

    // product data
    if (!isFetching(productBySearch)) {
      if (!this.filterRealizationStatus) {
        // jika page di state kurang dari page di props maka data products di tambahkan
        if (stateProductBySearch.meta.page < productBySearch.meta.page) {
          products = stateProductBySearch.products.concat(productBySearch.products)
        } else {
          products = this.state.productBySearch.products
        }
        this.setState({ fetching: false, productBySearch: { ...productBySearch, products }, notification: validateResponse(productBySearch, 'Data produk tidak ditemukan') })
      } else {
        this.filterRealizationStatus = false
        this.setState({ productBySearch, notification: validateResponse(productBySearch, 'Data produk tidak ditemukan') })
      }
    }

    // category data
    if (!isFetching(subCategory)) {
      if (subCategory.status === Status.SUCCESS && subCategory.isFound) {
        categories = subCategory.categories
      }
      this.setState({ categories, notification: validateResponse(subCategory, 'Data sub kategori tidak ditemukan!') })
    }

    // expeditionServices data
    if (!isFetching(expeditionServices)) {
      this.setState({ expeditionServices, notification: validateResponse(expeditionServices, 'Data ekpedisi tidak ditemukan!') })
    }

    // provinces data
    if (!isFetching(provinces)) {
      this.setState({ provinces, notification: validateResponse(provinces, 'Data provinsi tidak ditemukan!') })
    }

    // districts data
    if (!isFetching(districts)) {
      this.setState({ districts, notification: validateResponse(districts, 'Data kabupaten tidak ditemukan!') })
    }

    // brands data
    if (!isFetching(brands)) {
      this.setState({ brands, notification: validateResponse(brands, 'Data brand tidak ditemukan!') })
    }

    if (!isFetching(addWishlist)) {
      if (addWishlist.status === Status.SUCCESS && addWishlist.isFound) {
        if (this.wishlistId && addWishlist.wishlist.id === this.wishlistId) {
          this.wishlistId = null
          await this.props.listProductBySearch(this.params)
        }
      } else {
        this.setState({ notification: validateResponse(brands, 'Gagal menambah produk ke wishlist') })
      }
    }

    if (!productBySearch.isLoading && !subCategory.isLoading) NProgress.done()
  }

  renderProductList (viewActive, products) {
    return (
      <Content>
        {
          products.map((myProduct, index) => {
            let { product, store } = myProduct
            return (
              <ProductContainers key={product.id}>
                <Product
                  viewActive={viewActive}
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
            const { product, store } = myProduct
            return (
              <Product
                key={product.id}
                viewActive={viewActive}
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
    const { productBySearch, categories, expeditionServices, provinces, brands, districts, notification, sortActive, filterActive, selectedSort, viewActive, pagination } = this.state
    const { q, sort } = this.state.query
    const { products } = productBySearch
    let navbar = {
      searchBoox: false,
      path: '/',
      textPath: 'Produk',
      searchActive: !!q
    }

    let hasMore = products.length >= pagination.limit
    let isProductEmpty = productBySearch.isFound && products.length < 1

    navbar.textPath = (categories.name) && categories.name
    navbar.textPath = (q) && q
    if (sort !== undefined) {
      switch (sort) {
        case 'newest':
          navbar.textPath = 'Produk Terbaru'
          break
        case 'cheapest':
          navbar.textPath = 'Produk Termurah'
          break
        case 'expensive':
          navbar.textPath = 'Produk Termahal'
          break
        case 'selling':
          navbar.textPath = 'Produk Terlaris'
          break
        default:
          navbar.textPath = 'Produk'
          break
      }
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
          { isProductEmpty && <ProductEmpty /> }
          {
            products.length > 1 &&
            <InfiniteScroll
              pageStart={0}
              loadMore={_.debounce(this.handleLoadMore.bind(this), 250)}
              hasMore={hasMore}
              loader={<Loading size={12} color='#ef5656' className='is-fullwidth has-text-centered' />}>
                { listProducts }
              </InfiniteScroll>
          }
        </Section>
        <TabbarCategories
          sortButton
          filterButton
          viewButton
          sortOnClick={(e) => this.sortOnClick(e)}
          filterOnClick={() => this.filterOnClick()}
          viewOnClick={() => this.viewOnClick()}
          viewActive={viewActive} />
        <Sort
          isShow={sortActive}
          selected={selectedSort}
          sortOnClick={(e) => this.sortOnClick(e)}
          sortSelected={(data) => this.sortSelected(data)} />
        <Filter
          isShow={filterActive}
          filterClose={() => this.filterClose()}
          filterRealization={(params) => this.filterRealization(params)}
          onChangeProvinces={(id) => this.onChangeProvinces(id)}
          expeditionServices={expeditionServices.expeditionServices}
          provinces={provinces.provinces}
          brands={brands.brands}
          districts={districts.districts} />
      </Content>
    )
  }
}

const ProductEmpty = () => {
  return (
    <section className='content'>
      <div className='container is-fluid'>
        <div className='desc has-text-centered'>
          <MyImage src={Images.notFound} alt='komuto' />
          <p><strong>Produk tidak ditemukan</strong></p>
          <p>Kami tidak bisa menemukan barang yang anda inginkan</p>
        </div>
      </div>
    </section>
  )
}

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
  listProductBySearch: (params) => dispatch(productActions.listProductBySearch(params)),
  subCategory: (params) => dispatch(homeActions.subCategory(params)),
  getServices: () => dispatch(expeditionActions.getServices()),
  getProvince: () => dispatch(locationActions.getProvince()),
  getBrand: () => dispatch(brandActions.getBrand())
})

export default connect(mapStateToProps, mapDispatchToProps)(MyProduct)
