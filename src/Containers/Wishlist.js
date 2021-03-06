import React, { Component } from 'react'
import { connect } from 'react-redux'
import NProgress from 'nprogress'
import Router from 'next/router'
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
import Images from '../Themes/Images'
import RegexNormal from '../Lib/RegexNormal'

class Wishlist extends Component {
  constructor (props) {
    super(props)
    this.state = {
      products: props.products || null,
      addWishlist: props.addWishlist || null,
      viewActive: 'grid',
      sortActive: false,
      selectedSort: null,
      emptyWishlist: 'default',
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

  searchOnChange (event) {
    let { products, search } = this.state
    search.value = RegexNormal(event.target.value)
    search.status = false
    search.results = []

    if (search.value) {
      search.status = true
      search.results = _.filter(products.wishlist, (wishlist) => { return wishlist.product.name.toLowerCase().indexOf(search.value) > -1 })
    }

    this.setState({ search })
  }

  componentDidMount () {
    NProgress.start()
    this.submitting = { ...this.submitting, products: true }
    this.props.wishlist()
  }

  wishlistPress (id) {
    if (this.props.isLogin) {
      this.submitting = { ...this.submitting, addWishlist: true }
      this.props.addToWishlist({ id })
    } else {
      this.props.alertLogin()
    }
  }

  componentWillReceiveProps (nextProps) {
    const { isFetching, isError, isFound, notifError } = this.props
    let { products, addWishlist } = nextProps

    /** handling state set wishlist */
    if (!isFetching(addWishlist) && this.submitting.addWishlist) {
      this.submitting = { ...this.submitting, addWishlist: false }
      if (isError(addWishlist)) {
        this.setState({ notification: notifError(addWishlist.message) })
      }
      if (isFound(addWishlist)) {
        let idAddToWishlist = addWishlist.wishlist.id
        products.wishlist.some((myProduct) => {
          if (myProduct.product.id === idAddToWishlist) {
            (myProduct.product.is_liked) ? myProduct.product.count_like -= 1 : myProduct.product.count_like += 1
            myProduct.product.is_liked = !myProduct.product.is_liked
            return true
          }
        })
        this.setState({ addWishlist, products })
      }
    }

    /** handling state get products */
    if (!isFetching(products) && this.submitting.products) {
      NProgress.done()
      this.submitting = { ...this.submitting, products: false }
      if (isError(products)) {
        this.setState({ notification: notifError(products.message) })
      }
      if (isFound(products)) {
        let emptyWishlist = (products.wishlist.length < 1)
        this.setState({ products, emptyWishlist })
      }
    }
  }

  render () {
    let { search, products, notification, viewActive, emptyWishlist } = this.state
    let params = {
      navbar: {
        searchBoox: false,
        path: '/',
        textPath: 'Wishlist'
      }
    }
    let wishlist = []
    if (products.wishlist) {
      wishlist = search.status ? search.results : products.wishlist
    }
    let isEmpty = emptyWishlist !== 'default' && emptyWishlist
    return (
      <Content>
        <Navbar {...params} />
        <Section className='section is-paddingless'>
          {
            !isEmpty &&
            <div className='field search-form paddingless is-fixed'>
              <p className='control has-icons-left'>
                <input onChange={(event) => this.searchOnChange(event)} value={search.value} className='input is-medium' type='text' placeholder='Cari Produk Favorit Anda disini' />
                <span className='icon is-left'>
                  <span className='icon-search' />
                </span>
              </p>
            </div>
          }
          <Notification
            type='is-danger'
            isShow={notification.status}
            activeClose
            onClose={() => this.setState({notification: {status: false, message: ''}})}
            message={notification.message} />
        </Section>
        {
          isEmpty
            ? <WishlistContentEmpty />
            : <WishlistContent
              viewActive={viewActive}
              wishlist={wishlist}
              wishlistPress={(id) => this.wishlistPress(id)} />
        }
        {
          !isEmpty &&
          <TabbarCategories
            sortButton
            filterButton={false}
            viewButton
            sortOnClick={(e) => this.sortOnClick(e)}
            filterOnClick={() => this.filterOnClick()}
            viewOnClick={() => this.viewOnClick()}
            viewActive={viewActive} />
        }

        {
          !isEmpty &&
          <Sort
            {...this.state}
            sortOnClick={(e) => this.sortOnClick(e)}
            sortSelected={(data) => this.sortSelected(data)} />
        }
      </Content>
    )
  }
}

const WishlistContentEmpty = () => (
  <section className='content'>
    <div className='container is-fluid'>
      <div className='desc has-text-centered'>
        <img src={`${Images.wishlistEmpty}`} alt='komuto' />
        <p><strong>Wishlist Anda Kosong</strong></p>
        <p>Anda belum memasukkan barang apapun ke dalam wishlist Anda</p>
      </div>
      <a onClick={() => Router.push('/product?sort=newest', '/p?sort=newest')} className='button is-primary is-large is-fullwidth'>Mulai Lihat Barang</a>
    </div>
  </section>
)

const WishlistContent = ({ wishlist, viewActive, wishlistPress }) => (
  <Section className='section is-paddingless' style={{marginBottom: '0px'}}>
    {
      viewActive === 'list'
      ? <Content>
        {
          wishlist.map((myProduct, index) => {
            if (myProduct.product.is_liked) {
              let idProduct = `${myProduct.product.id}`
              return <ProductContainers key={index}>
                <Product
                  {...myProduct}
                  isWishlist
                  viewActive={viewActive}
                  wishlistPress={() => wishlistPress(idProduct)} />
              </ProductContainers>
            }
          })
        }
      </Content>
      : <ProductContainers>
        {
          wishlist.map((myProduct, index) => {
            let idProduct = `${myProduct.product.id}`
            if (myProduct.product.is_liked) {
              return <Product
                {...myProduct}
                key={index}
                isWishlist
                viewActive={viewActive}
                wishlistPress={() => wishlistPress(idProduct)} />
            }
          })
        }
      </ProductContainers>
    }
  </Section>
)

const mapStateToProps = (state) => ({
  products: state.wishlist,
  addWishlist: state.addWishlist
})

const mapDispatchToProps = (dispatch) => ({
  addToWishlist: (params) => dispatch(productActions.addToWishlist(params)),
  wishlist: () => dispatch(userActions.wishlist())
})

export default connect(mapStateToProps, mapDispatchToProps)(Wishlist)
