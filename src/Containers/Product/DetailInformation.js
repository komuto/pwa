import React, { Component } from 'react'
// components
import Section from '../../Components/Section'

class ProductDetailInformation extends Component {
  constructor (props) {
    super(props)
    this.state = {
      openDescription: false
    }
  }

  openDescription () {
    this.setState({ openDescription: !this.state.openDescription })
  }

  render () {
    const { product, category } = this.props
    const { openDescription } = this.state
    return (
      <Section className='class="section is-paddingless has-shadow'>
        <div className='container is-fluid'>
          <div className='title'>
            <h3>Informasi Produk</h3>
          </div>
        </div>
        <div className='info-product'>
          <div className='detail-rate'>
            <div className='columns detail-rating is-mobile is-multiline no-margin-bottom'>
              <div className='column is-half'>
                <div className='rating-content is-left'>
                  <h3>Berat</h3>
                  <span>{ product.weight } gram</span>
                </div>
              </div>
              <div className='column is-half'>
                <div className='rating-content is-left'>
                  <h3>Kondisi</h3>
                  <span> { product.condition === 1 ? 'Baru' : 'Bekas' } </span>
                </div>
              </div>
            </div>
          </div>
          <div className='detail-rate'>
            <div className='columns detail-rating is-mobile is-multiline no-margin-bottom'>
              <div className='column is-half'>
                <div className='rating-content is-left'>
                  <h3>Asuransi</h3>
                  <span>{ product.is_insurance ? 'Ya' : 'Tidak' }</span>
                </div>
              </div>
              <div className='column is-half'>
                <div className='rating-content is-left'>
                  <h3>Kategori</h3>
                  <span>{ category.name }</span>
                </div>
              </div>
            </div>
          </div>
          <div className='detail-rate'>
            <div className='columns detail-rating is-mobile is-multiline no-margin-bottom'>
              <div className='column'>
                <div className='rating-content is-left'>
                  <h3>Deskripsi</h3>
                  <div className={`desc-wrapp ${openDescription ? 'open' : ''}`}>
                    <span>
                      { product.decription }
                    </span>
                  </div>
                  <a className={`js-desc open-desc has-text-centered ${openDescription ? 'close' : ''}`} onClick={() => this.openDescription()}>
                    <span className='icon-arrow-down' />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>
    )
  }
}

export default ProductDetailInformation
