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
// utils
import { Status } from '../Services/Status'

class MyProduct extends Component {
  constructor (props) {
    super(props)
    this.state = ({
      q: props.query.q || null,
      sort: props.query.sort || null,
      id: props.query.id || null,
      products: props.products || null,
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
    const { products } = this.state
    switch (selectedSort) {
      case 'termurah':
        products.products = _.orderBy(products.products, ['product.price'], ['asc'])
        break
      case 'termahal':
        products.products = _.orderBy(products.products, ['product.price'], ['desc'])
        break
      case 'terbaru':
        products.products = _.orderBy(products.products, ['product.created_at'], ['desc'])
        break
      case 'terlaris':
        products.products = _.orderBy(products.products, ['product.count_sold'], ['desc'])
        break
      default:
        break
    }

    this.setState({ selectedSort, sortActive: false, products })
  }

  filterClose () {
    this.setState({ filterActive: false })
  }

  async componentDidMount () {
    const { id, sort, q } = this.state
    if (id) {
      NProgress.start()
      await this.props.dispatch(homeActions.products({category_id: id})) && this.props.dispatch(homeActions.subCategory({ id }))
    }

    if (sort) {
      NProgress.start()
      await this.props.dispatch(homeActions.products({sort: 'newest'}))
    }

    if (q) {
      NProgress.start()
      await this.props.dispatch(homeActions.products({query: q}))
    }
  }

  componentWillReceiveProps (nextProps) {
    const { products, subCategory } = nextProps
    const { q } = nextProps.query
    let { notification } = nextProps
    // reset notification
    notification = {status: false, message: 'Error, default message.'}

    if (q) this.setState({ q })

    if (!products.isLoading) {
      NProgress.done()
      switch (products.status) {
        case Status.SUCCESS :
          if (products.isFound) {
            if (products.products.length < 1) notification = {status: true, message: 'Produk tidak tersedia'}
          } else {
            notification = {status: true, message: 'Data produk tidak ditemukan'}
          }
          break
        case Status.OFFLINE :
        case Status.FAILED :
          notification = {status: true, message: products.message}
          break
        default:
          break
      }
      this.setState({ products, notification })
    }

    if (!subCategory.isLoading) {
      switch (subCategory.status) {
        case Status.SUCCESS :
          (subCategory.isFound)
          ? this.setState({ categories: subCategory.categories })
          : this.setState({ notification: {status: true, message: 'Data kategori tidak ditemukan'} })
          break
        case Status.OFFLINE :
        case Status.FAILED :
          this.setState({ notification: {status: true, message: subCategory.message} })
          break
        default:
          break
      }
    }

    if (!products.isLoading && !subCategory.isLoading) NProgress.done()
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
    const { products } = this.state.products
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
          type='is-warning'
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
          filterClose={() => this.filterClose()} />
      </Content>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    products: state.products,
    subCategory: state.subCategory
  }
}
export default connect(mapStateToProps)(MyProduct)
