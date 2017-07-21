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
import * as wishlistActions from '../actions/wishlist'
import * as productActions from '../actions/product'
// services
import { Status } from '../Services/Status'
import GET_TOKEN from '../Services/GetToken'

class Wishlist extends Component {
  constructor (props) {
    super(props)

    this.state = {
      products: props.products || null,
      viewActive: 'list',
      sortActive: false,
      selectedSort: null,
      token: null,
      search: {
        status: false,
        value: '',
        results: []
      },
      notification: {
        status: false,
        message: 'Error, default message.'
      }
    }
    this.wishlistId = null
  }
  viewOnClick () {
    let { viewActive } = this.state
    viewActive = viewActive === 'list' ? 'grid' : 'list'
    this.setState({ viewActive })
  }
  // sort button event
  sortOnClick = () => this.setState({ sortActive: true })

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

    if (search.value !== '') {
      search.status = true
      search.results = _.filter(products.wishlist, (wishlist) => { return wishlist.product.name.toLowerCase().indexOf(search.value) > -1 })
    } else {
      search.status = false
      search.results = []
    }

    this.setState({ search })
  }

  async componentDidMount () {
    NProgress.start()
    await this.props.dispatch(wishlistActions.wishlist())
    this.setState({ token: await GET_TOKEN.getToken() })
  }

  async wishlistPress (id) {
    let { products, token } = this.state
    if (token) {
      products.wishlist.map((myProduct) => {
        if (myProduct.product.id === id) {
          (myProduct.product.is_liked) ? myProduct.product.count_like -= 1 : myProduct.product.count_like += 1
          myProduct.product.is_liked = !myProduct.product.is_liked
        }
      })
      await this.props.dispatch(productActions.addToWishlist({ id }))
      this.setState({ products })
    } else {
      this.setState({notification: {status: true, message: 'Anda harus login'}})
    }
  }

  async componentWillReceiveProps (nextProps) {
    const { products, addWishlist } = nextProps
    let { notification } = this.state
    // reset notification
    notification = {status: false, message: 'Error, default message.'}

    if (!addWishlist.isLoading) {
      switch (addWishlist.status) {
        case Status.SUCCESS :
          (addWishlist.isFound)
          ? this.setState({ addWishlist })
          : this.setState({ notification: {status: true, message: 'Gagal menambah wishlist'} })
          break
        case Status.OFFLINE :
        case Status.FAILED :
          this.setState({ notification: {status: true, message: addWishlist.message} })
          break
        default:
          break
      }
    }
    // product data
    if (!products.isLoading) {
      NProgress.done()
      switch (products.status) {
        case Status.SUCCESS :
          if (products.isFound) {
            if (products.wishlist.length < 1) notification = {status: true, message: 'Produk tidak tersedia'}
          } else {
            notification = {status: true, message: 'Data produk tidak ditemukan'}
          }
          break
        case Status.OFFLINE :
        case Status.UNAUTHORIZED :
        case Status.FAILED :
          notification = {status: true, message: products.message}
          break
        default:
          break
      }
      this.setState({ products, notification })
    }
  }

  renderProductList (viewActive, products) {
    return (
      <Content>
        {
          products.map((myProduct) => {
            let { images, product, store } = myProduct

            return product.is_liked
                   ? <ProductContainers key={product.id}>
                     <Product
                       viewActive={viewActive}
                       images={images}
                       store={store}
                       product={product}
                       wishlistPress={(id) => this.wishlistPress(id)} />
                   </ProductContainers>
                    : null
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
            return product.is_liked
                   ? <Product
                     key={product.id}
                     viewActive={viewActive}
                     images={images}
                     store={store}
                     product={product}
                     wishlistPress={(id) => this.wishlistPress(id)} />
                    : null
          })
        }
      </ProductContainers>
    )
  }

  render () {
    const { search, sortActive, selectedSort, products, notification, viewActive } = this.state

    const navbar = {
      searchBoox: false,
      path: '/',
      textPath: 'Wishlist'
    }

    let wishlist = []
    if (products.wishlist) wishlist = search.status ? search.results : products.wishlist
    const listProducts = (viewActive === 'list') ? this.renderProductList(viewActive, wishlist) : this.renderProductColoumn(viewActive, wishlist)

    return (
      <Content>
        <Navbar params={navbar} />
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
          sortOnClick={() => this.sortOnClick()}
          filterOnClick={() => this.filterOnClick()}
          viewOnClick={() => this.viewOnClick()}
          viewActive={viewActive} />
        <Sort
          isShow={sortActive}
          selected={selectedSort}
          sortSelected={(data) => this.sortSelected(data)} />
      </Content>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    products: state.wishlist,
    addWishlist: state.addWishlist
  }
}

export default connect(mapStateToProps)(Wishlist)
