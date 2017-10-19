import React, { Component } from 'react'
import { connect } from 'react-redux'
import Router from 'next/router'
// components
import Content from '../../Components/Content'

class ProductAdd extends Component {
  // constructor (props) {
  //   super(props)
  // }

  render () {
    return (
      <Content>
        <section className='section is-paddingless'>
          <div className='add-product'>
            <div className='container is-fluid'>
              <div className='title'>
                <h3>Tentukan produk yang akan ditambah</h3>
              </div>
            </div>
            <div className='container is-fluid'>
              <ul className='add-option'>
                <li>
                  <div className='box'>
                    <article className='media'>
                      <div className='media-left'>
                        <figure className='image'>
                          <span className='icon-upload-product' />
                        </figure>
                      </div>
                      <div className='media-content' onClick={() => Router.push('/product-add-step-one')}>
                        <div className='content'>
                          <p>
                            <strong>Upload Produk Baru</strong><br />
                            Tambahkan produk baru untuk dijual
                          </p>
                        </div>
                      </div>
                    </article>
                  </div>
                  <span className='icon-arrow-right black' />
                </li>
                <li onClick={() => Router.push('/about-dropshipping')}>
                  <div className='box'>
                    <article className='media'>
                      <div className='media-left'>
                        <figure className='image'>
                          <span className='icon-upload-dropshipper' />
                        </figure>
                      </div>
                      <div className='media-content'>
                        <div className='content'>
                          <p>
                            <strong>Ambil dari Dropshipper</strong><br />
                            Ambil produk dari dropshipper. Dan Anda akan mendapat komisi. penjualan sebesar 10%
                          </p>
                        </div>
                      </div>
                    </article>
                  </div>
                  <span className='icon-arrow-right' />
                </li>
              </ul>
            </div>
          </div>
        </section>
      </Content>
    )
  }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = (dispatch) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(ProductAdd)
