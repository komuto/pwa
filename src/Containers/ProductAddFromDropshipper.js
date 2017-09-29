// @flow
import React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import InfiniteScroll from 'react-infinite-scroller'
import Link from 'next/link'
import NProgress from 'nprogress'
// components
import Wizard from '../Components/Wizard'
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
// validations
import * as inputValidations from '../Validations/Input'
// actions
import * as homeActions from '../actions/home'
import * as productActions from '../actions/product'
import * as expeditionActions from '../actions/expedition'
import * as locationActions from '../actions/location'
import * as brandActions from '../actions/brand'
// services
import { Status } from '../Services/Status'
import GET_TOKEN from '../Services/GetToken'
// themes
import Images from '../Themes/Images'

class ProductAddFromDropshipper extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      searchProduct: props.searchProduct || [],
      dropshipProducts: props.dropshipProducts,
      max: 50,
      token: null,
      query: {
        page: props.query.page || null,
        limit: props.query.limit || null,
        brands: props.query.brands || null,
        other: props.query.other || null,
        condition: props.query.condition || null,
        services: props.query.services || null,
        q: props.query.q || 'bantal',
        sort: props.query.sort || null,
        id: props.query.id || null
      },
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
      notFound: false,
      hasMore: true,
      submitting: false,
      pagination: {
        page: 1,
        limit: 10
      },
      notification: {
        status: false,
        message: 'Error, default message.'
      }
    }
    this.filterRealizationStatus = false
    this.wishlistId = null
    this.params = {}
    this.element = []
  }

  doSearch (evt) {
    var searchText = inputValidations.inputNormal(evt.target.value) // this is the search text
    if (this.timeout) clearTimeout(this.timeout)
    this.timeout = setTimeout(() => {
      searchText && this.props.search({query: searchText}) && this.setState({ submitting: true })
    }, 1000)
  }

  toProfile (e) {
    e.preventDefault()
    this.setState({ submitting: true })
    this.props.getProfile()
  }

  handleModalCategories (e) {
    e.preventDefault()
    const { modalCategories } = this.state
    this.setState({ modalCategories: !modalCategories })
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
    let { dropshipProducts, token } = this.state
    if (token) {
      dropshipProducts.products.map((myProduct) => {
        if (myProduct.product.id === id) {
          (myProduct.product.is_liked)
          ? myProduct.product.count_like -= 1
          : myProduct.product.count_like += 1
          myProduct.product.is_liked = !myProduct.product.is_liked
        }
      })
      await this.props.addToWishlist({ id })
      this.setState({ dropshipProducts })
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
      await this.props.getDropshipProducts(this.params)
      this.setState({ pagination, fetching: true })
    }
  }

  sortSelected (selectedSort) {
    let { dropshipProducts } = this.state
    switch (selectedSort) {
      case 'termurah':
        dropshipProducts.products = _.orderBy(dropshipProducts.products, ['product.price'], ['asc'])
        break
      case 'termahal':
        dropshipProducts.products = _.orderBy(dropshipProducts.products, ['product.price'], ['desc'])
        break
      case 'terbaru':
        dropshipProducts.products = _.orderBy(dropshipProducts.products, ['product.created_at'], ['desc'])
        break
      case 'terlaris':
        dropshipProducts.products = _.orderBy(dropshipProducts.products, ['product.count_sold'], ['desc'])
        break
      default:
        break
    }
    this.setState({ selectedSort, sortActive: false, dropshipProducts })
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
    await this.props.getDropshipProducts(this.params)
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
    await this.props.getDropshipProducts(this.params)
    // close filter
    this.setState({ filterActive: false })
  }

  async componentWillReceiveProps (nextProps) {
    const { searchProduct, dropshipProducts, subCategory, expeditionServices, provinces, brands, districts, addWishlist } = nextProps
    const { q } = nextProps.query
    let { notification, notFound, categories } = this.state
    let stateProductBySearch = this.state.dropshipProducts
    // reset notification
    notification = {status: false, message: 'Error, default message.'}
    if (q) this.setState({ q })
    // product data
    if (!dropshipProducts.isLoading) {
      NProgress.done()
      switch (dropshipProducts.status) {
        case Status.SUCCESS :
          if (dropshipProducts.isFound) {
            if (dropshipProducts.products.length < 1 && this.state.dropshipProducts.products.length < 1) notFound = {status: true, message: 'Produk tidak tersedia'}
          } else {
            notification = {status: true, message: 'Data produk tidak ditemukan'}
          }
          notFound = (!dropshipProducts.isFound || dropshipProducts.products.length < 1)
          break
        case Status.OFFLINE :
        case Status.FAILED :
          notification = {status: true, message: dropshipProducts.message}
          break
        default:
          break
      }

      if (!this.filterRealizationStatus) {
        let products = []
        // jika page di state kurang dari page di props maka data products di tambahkan
        if ((stateProductBySearch.meta.page < dropshipProducts.meta.page) && dropshipProducts.products.length > 0) {
          products = stateProductBySearch.products.concat(dropshipProducts.products)
        } else {
          products = this.state.dropshipProducts.products
        }
        this.setState({ fetching: false, hasMore: (dropshipProducts.products.length > 0), dropshipProducts: { ...dropshipProducts, products }, notification, notFound })
      } else {
        this.filterRealizationStatus = false
        this.setState({ dropshipProducts, notification, notFound })
      }
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

    // expeditionServices data
    if (!expeditionServices.isLoading) {
      switch (expeditionServices.status) {
        case Status.SUCCESS :
          if (!expeditionServices.isFound) notification = {status: true, message: 'Data ekpedisi tidak ditemukan'}
          break
        case Status.OFFLINE :
        case Status.FAILED :
          notification = {status: true, message: expeditionServices.message}
          break
        default:
          break
      }
      this.setState({ expeditionServices, notification })
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
          if (!districts.isFound) notification = {status: true, message: 'Data kabupaten tidak ditemukan'}
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
              await this.props.getDropshipProducts(this.params)
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
    if (!searchProduct.isLoading) {
      switch (searchProduct.status) {
        case Status.SUCCESS :
          notFound = (!searchProduct.isFound || searchProduct.products.length < 1)
          break
        case Status.OFFLINE :
        case Status.FAILED :
          notification = {status: true, message: searchProduct.message}
          break
        default:
          break
      }
      this.setState({ searchProduct, submitting: false, notification, notFound })
    }
    if (!dropshipProducts.isLoading && !subCategory.isLoading) NProgress.done()
  }

  renderProductList (viewActive, products) {
    return (
      <Content>
        {
          products.map((myProduct, index) => {
            let { product, store } = myProduct
            const type = 'dropship'
            return (
              <ProductContainers key={product.id}>
                <Product
                  viewActive={viewActive}
                  store={store}
                  wishlistPress={(productId) => this.wishlistPress(productId)}
                  product={product}
                  type={type} />
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
            const type = 'dropship'
            return (
              <Product
                key={product.id}
                viewActive={viewActive}
                store={store}
                wishlistPress={(productId) => this.wishlistPress(productId)}
                product={product}
                type={type} />
            )
          })
        }
      </ProductContainers>
    )
  }

  render () {
    const { dropshipProducts, expeditionServices, provinces, brands, districts, notification, filterActive, viewActive, notFound } = this.state
    const { products } = dropshipProducts
    const listProducts = (viewActive === 'list') ? this.renderProductList(viewActive, products) : this.renderProductColoumn(viewActive, products)
    return (
      <div>
        <Content>
          <Notification
            type='is-danger'
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
                  placeholder='Cari barang atau toko' />
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
            <div className='categories-option' onClick={(e) => this.handleModalCategories(e)}>
              <Link href='/categories1?type=dropship'>
                <a className='choose-option modal-button' data-target='#modal-categories'>
                  <span>Kategori : Semua Kategori</span><span className='icon-arrow-down' /></a>
              </Link>
            </div>
          </section>

          <Section style={{marginBottom: '45px', overflowAnchor: 'none'}}>
            {
              notFound && <EmptyProduct />
            }
            {
              products.length < 1
              ? null
              : <InfiniteScroll
                pageStart={0}
                loadMore={_.debounce(this.handleLoadMore.bind(this), 250)}
                hasMore={this.state.hasMore}
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
            {...this.state}
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

      </div>
    )
  }
}

const EmptyProduct = () => {
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

const mapStateToProps = (state) => {
  return {
    searchProduct: state.searchProduct,
    dropshipProducts: state.dropshipProducts,
    subCategory: state.subCategory,
    expeditionServices: state.expeditionServices,
    provinces: state.provinces,
    districts: state.districts,
    brands: state.brands,
    addWishlist: state.addWishlist
  }
}

const mapDispatchToProps = dispatch => ({
  getDropshipProducts: (params) => dispatch(productActions.getDropshipProducts(params)),
  getDistrict: (params) => dispatch(locationActions.getDistrict(params)),
  addToWishlist: (params) => dispatch(productActions.addToWishlist(params)),
  subCategory: (params) => dispatch(homeActions.subCategory(params)),
  search: (params) => dispatch(homeActions.search(params)),
  getServices: () => dispatch(expeditionActions.getServices()),
  getProvince: () => dispatch(locationActions.getProvince()),
  getBrand: () => dispatch(brandActions.getBrand())
})

export default connect(mapStateToProps, mapDispatchToProps)(ProductAddFromDropshipper)
