import React, { Component } from 'react'
import { connect } from 'react-redux'
import NProgress from 'nprogress'
import _ from 'lodash'
// components
import ProductContainers from '../Components/ProductContainers'
import Product from '../Components/Product'
import Content from '../Components/Content'
import Section from '../Components/Section'
import Notification from '../Components/Notification'
// containers
import TabbarCategories from './TabbarCategories'
import Sort from './Sort'
import { Navbar } from './Navbar'
// actions
import * as userActions from '../actions/user'
import * as productActions from '../actions/product'

class Wishlist extends Component {
  constructor (props) {
    super(props)
    this.state = {
      products: props.products || null,
      addWishlist: props.addWishlist || null,
      viewActive: 'list',
      sortActive: false,
      selectedSort: null,
      search: {
        status: false,
        value: '',
        results: []
      },
      notification: props.notification
    }
    this.submitting = {
      addWishlist: false,
      products: false
    }
  }

  viewOnClick () {
    this.setState({ viewActive: this.state.viewActive === 'list' ? 'grid' : 'list' })
  }

  sortOnClick (e) {
    this.setState({ sortActive: !this.state.sortActive })
  }

  sortSelected (selectedSort) {
    let { products } = this.state
    switch (selectedSort) {
      case 'termurah':
        products.wishlist = _.orderBy(products.wishlist, ['product.price'], ['asc'])
        break
      case 'termahal':
        products.wishlist = _.orderBy(products.wishlist, ['product.price'], ['desc'])
        break
      case 'terbaru':
        products.wishlist = _.orderBy(products.wishlist, ['product.created_at'], ['desc'])
        break
      case 'terlaris':
        products.wishlist = _.orderBy(products.wishlist, ['product.count_sold'], ['desc'])
        break
      default:
        break
    }
    this.setState({ selectedSort, sortActive: false, products })
  }

  searchOnChange = (event) => {
    let { products, search } = this.state
    search.value = event.target.value.replace(/[^a-zA-Z0-9 ]/g, '')
    search.status = false
    search.results = []

    if (search.value) {
      search.status = true
      search.results = _.filter(products.wishlist, (wishlist) => { return wishlist.product.name.toLowerCase().indexOf(search.value) > -1 })
    }

    this.setState({ search })
  }

  async componentDidMount () {
    NProgress.start()
    this.submitting = { ...this.submitting, products: true }
    await this.props.wishlist()
  }

  async wishlistPress (id) {
    let { products } = this.state
    if (this.props.isLogin) {
      products.wishlist.some((myProduct) => {
        if (myProduct.product.id === id) {
          (myProduct.product.is_liked) ? myProduct.product.count_like -= 1 : myProduct.product.count_like += 1
          myProduct.product.is_liked = !myProduct.product.is_liked
          return true
        }
      })
      this.submitting = { ...this.submitting, addWishlist: true }
      await this.props.addToWishlist({ id })
      this.setState({ products })
    } else {
      this.props.alertLogin()
    }
  }

  componentWillReceiveProps (nextProps) {
    let { isFetching, isError, isFound, notifError } = this.props
    let { products, addWishlist } = nextProps

    // handling state set wishlist
    if (!isFetching(addWishlist) && this.submitting.addWishlist) {
      this.submitting = { ...this.submitting, addWishlist: false }
      if (isError(addWishlist)) {
        this.setState({ notification: notifError(addWishlist.message) })
      }

      if (isFound(addWishlist)) {
        this.setState({ addWishlist })
      }
    }

    // handling state get products
    if (!isFetching(products) && this.submitting.products) {
      NProgress.done()
      this.submitting = { ...this.submitting, products: false }
      if (isError(products)) {
        this.setState({ notification: notifError(products.message) })
      }

      if (isFound(products)) {
        this.setState({ products })
      }
    }
  }

  renderProductList (viewActive, products) {
    return (
      <Content>
        {
          products.map((myProduct, index) => {
            if (myProduct.product.is_liked) {
              return <ProductContainers key={index}>
                <Product
                  {...myProduct}
                  viewActive={viewActive}
                  wishlistPress={(id) => this.wishlistPress(id)} />
              </ProductContainers>
            }
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
            if (myProduct.product.is_liked) {
              return <Product
                {...myProduct}
                key={index}
                viewActive={viewActive}
                wishlistPress={(id) => this.wishlistPress(id)} />
            }
          })
        }
      </ProductContainers>
    )
  }

  render () {
    let { search, products, notification, viewActive } = this.state
    let params = {
      navbar: {
        searchBoox: false,
        path: '/',
        textPath: 'Wishlist'
      }
    }
    let wishlist = []
    if (products.wishlist) wishlist = search.status ? search.results : products.wishlist
    let listProducts = (viewActive === 'list') ? this.renderProductList(viewActive, wishlist) : this.renderProductColoumn(viewActive, wishlist)

    return (
      <Content>
        <Navbar {...params} />
        <Notification
          type='is-danger'
          isShow={notification.status}
          activeClose
          onClose={() => this.setState({notification: {status: false, message: ''}})}
          message={notification.message} />
        <Section className='section is-paddingless'>
          <div className='field search-form'>
            <p className='control has-icons-left'>
              <input onChange={(event) => this.searchOnChange(event)} value={search.value} className='input is-medium' type='text' placeholder='Cari barang atau toko' />
              <span className='icon is-left'>
                <span className='icon-search' />
              </span>
            </p>
          </div>
        </Section>
        <Section className='section is-paddingless' style={{marginBottom: '0px'}}>
          { listProducts }
        </Section>
        <TabbarCategories
          sortButton
          filterButton={false}
          viewButton
          sortOnClick={(e) => this.sortOnClick(e)}
          filterOnClick={() => this.filterOnClick()}
          viewOnClick={() => this.viewOnClick()}
          viewActive={viewActive} />
        <Sort
          {...this.state}
          sortOnClick={(e) => this.sortOnClick(e)}
          sortSelected={(data) => this.sortSelected(data)} />
      </Content>
    )
  }
}

const mapStateToProps = (state) => ({
  products: state.wishlist,
  addWishlist: state.addWishlist
})

const mapDispatchToProps = (dispatch) => ({
  addToWishlist: (params) => dispatch(productActions.addToWishlist(params)),
  wishlist: () => dispatch(userActions.wishlist())
})

export default connect(mapStateToProps, mapDispatchToProps)(Wishlist)
