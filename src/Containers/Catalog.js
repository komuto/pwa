import React, { Component } from 'react'
import { connect } from 'react-redux'
import NProgress from 'nprogress'
// containers
import { Navbar } from './Navbar'
// components
import Content from '../Components/Content'
import MyImage from '../Components/MyImage'
// actions
import * as storeActions from '../actions/stores'
// services
import { validateResponse, isFetching } from '../Services/Status'
// Lib
import RupiahFormat from '../Lib/RupiahFormat'

class Catalog extends Component {
  constructor (props) {
    super(props)
    this.state = {
      id: props.query.id || null,
      storeCatalogProducts: props.storeCatalogProducts || null,
      notification: {
        status: false,
        message: 'Error, default message.'
      }

    }
  }

  componentDidMount () {
    const { id } = this.state
    this.props.getStoreCatalogProducts({ id })
  }

  componentWillReceiveProps (nextProps) {
    const { storeCatalogProducts } = nextProps
    if (!isFetching(storeCatalogProducts)) {
      NProgress.done()
      this.setState({ storeCatalogProducts, notification: validateResponse(storeCatalogProducts, 'Data katalog tidak ditemukan!') })
    }
  }

  render () {
    const { storeCatalogProducts } = this.state
    const { catalog, products } = storeCatalogProducts.storeCatalogProducts
    let params = {
      navbar: {
        searchBoox: false,
        path: '/',
        textPath: storeCatalogProducts.isFound && catalog.name
      }
    }
    console.log(storeCatalogProducts)
    return (
      <Content>
        <Navbar params={params} />
        <section className='section is-paddingless'>
          <div className='field search-form paddingless'>
            <p className='control has-icons-left'>
              <input className='input is-medium' type='text' placeholder='Cari barang atau toko' />
              <span className='icon is-left'>
                <span className='icon-search' />
              </span>
            </p>
          </div>
        </section>
        <section className='section is-paddingless detail'>
          {
            storeCatalogProducts.isFound && products.map((p, index) => {
              let priceAfterDiscount = (p.is_discount) ? p.price - ((p.price * p.discount) / 100) : p.price
              return (
                <div className='detail-product' key={index}>
                  <div className='remove rightTop'>
                    <span className='icon-discount-sign' />
                    <span className='icon-grosir-sign' />
                  </div>
                  <div className='purchase'>
                    <figure className='img-item xx'>
                      <MyImage src='../images/pict.jpg' alt='pict' />
                    </figure>
                    <div className='content-product'>
                      <h3>{ p.name }</h3>
                      { (p.dropship_origin !== undefined) && <p className='dropship-worldsports'>Dropship dari {p.dropship_origin.name}</p> }
                      { (p.is_dropshipper) && <p className='dropship-item'>Terbuka untuk dropshipper</p> }
                      <p>Jumlah Stok : { p.stock }</p>
                      <p>Harga jual setelah diskon : Rp { RupiahFormat(priceAfterDiscount) }</p>
                    </div>
                  </div>
                </div>
              )
            })
          }
        </section>
      </Content>

    )
  }
}
const mapStateToProps = (state) => ({
  storeCatalogProducts: state.storeCatalogProducts
})

const mapDispatchToProps = (dispatch) => ({
  getStoreCatalogProducts: (params) => dispatch(storeActions.getStoreCatalogProducts(params))
})

export default connect(mapStateToProps, mapDispatchToProps)(Catalog)
