// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import NProgress from 'nprogress'
import _ from 'lodash'
// components
import Content from '../Components/Content'
import Section from '../Components/Section'
import {Images} from '../Themes'
import Product from '../Components/Product'
import ProductContainers from '../Components/ProductContainers'
import Notification from '../Components/Notification'
// containers
import TabbarCategories from './TabbarCategories'
import Sort from './Sort'
import Filter from './Filter'
import { Navbar } from './Navbar'
// actions
import * as homeActions from '../actions/home'
import * as productActions from '../actions/product'
// utils
import { Status } from '../Services/Status'

class MyProduct extends Component {
  constructor (props) {
    super(props)
    this.state = ({
      q: props.query.q || null,
      sort: props.query.sort || null,
      id: props.query.id || null,
      productBySearch: props.productBySearch || null,
      categories: props.subCategory || [],
      sortActive: false,
      filterActive: false,
      viewActive: 'list',
      selectedSort: null,
      notification: {
        status: false,
        message: 'Error, default message.'
      }
    })
    this.titleNavbar = this.createTitleNavbar(this.state.sort)
    this.params = {}
  }

  createTitleNavbar (params) {
    let data = ''
    switch (params) {
      case 'newest':
        data = 'Produk Terbaru'
        break
      case 'cheapest':
        data = 'Produk Termurah'
        break
      case 'expensive':
        data = 'Produk Termahal'
        break
      case 'selling':
        data = 'Produk Terlaris'
        break
      default:
        break
    }

    return data
  }

  sortOnClick () {
    this.setState({ sortActive: true })
  }

  filterOnClick () {
    this.setState({ filterActive: true })
  }

  viewOnClick () {
    let { viewActive } = this.state
    viewActive = viewActive === 'list' ? 'grid' : 'list'
    this.setState({ viewActive })
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

  filterClose () {
    this.setState({ filterActive: false })
  }

  async componentDidMount () {
    const { id, sort, q } = this.state
    if (id) this.params.category_id = id
    if (sort) this.params.sort = sort
    if (q) this.params.query = q
    NProgress.start()
    if (id) await this.props.dispatch(homeActions.subCategory({ id }))
    await this.props.dispatch(productActions.listProductBySearch(this.params))
  }

  async filterRealization (filters) {
    filters.map((filter) => {
      if (filter.id === 'condition') {
        if (_.find(filter.options, (option) => { return option.id === 'new' }).selected) this.params.condition = 'new'
        if (_.find(filter.options, (option) => { return option.id === 'used' }).selected) this.params.condition = 'used'
        if (filter.selectedAll) this.params.condition = ''
      }
    })
    NProgress.start()
    await this.props.dispatch(productActions.listProductBySearch(this.params))
    this.setState({ filterActive: false })
  }

  componentWillReceiveProps (nextProps) {
    const { productBySearch, subCategory } = nextProps
    const { q } = nextProps.query
    let { notification, categories } = this.state
    // reset notification
    notification = {status: false, message: 'Error, default message.'}

    if (q) this.setState({ q })

    if (!productBySearch.isLoading) {
      NProgress.done()
      switch (productBySearch.status) {
        case Status.SUCCESS :
          if (productBySearch.isFound) {
            if (productBySearch.products.length < 1) notification = {status: true, message: 'Produk tidak tersedia'}
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
      this.setState({ productBySearch, notification })
    }

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

    if (!productBySearch.isLoading && !subCategory.isLoading) NProgress.done()
  }

  renderProductList (viewActive, products) {
    return (
      <Content>
        {
          products.map((myProduct) => {
            let { images, product, store } = myProduct
            return (
              <ProductContainers key={product.id}>
                <Product
                  viewActive={viewActive}
                  imagesDefault={Images.thumb}
                  images={images}
                  store={store}
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
          products.map((myProduct) => {
            const { images, product, store } = myProduct
            return (
              <Product
                key={product.id}
                viewActive={viewActive}
                imagesDefault={Images.thumb}
                images={images}
                store={store}
                product={product} />
            )
          })
        }
      </ProductContainers>
    )
  }

  render () {
    const { q, categories, notification, sortActive, filterActive, selectedSort, viewActive } = this.state
    const { products } = this.state.productBySearch
    const navbar = {
      searchBoox: false,
      path: '/',
      textPath: categories.name || this.titleNavbar || q,
      searchActive: !!q
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
        <Section
          style={{marginBottom: '40px'}}>
          {
            (viewActive === 'list')
            ? this.renderProductList(viewActive, products)
            : this.renderProductColoumn(viewActive, products)
          }
        </Section>
        <TabbarCategories
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
          filterRealization={(params) => this.filterRealization(params)} />
      </Content>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    productBySearch: state.productBySearch,
    subCategory: state.subCategory
  }
}
export default connect(mapStateToProps)(MyProduct)
