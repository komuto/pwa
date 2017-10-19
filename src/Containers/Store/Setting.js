import React, { Component } from 'react'
import Router from 'next/router'
// components
import NProgress from 'nprogress'

class StoreSetting extends Component {
  constructor (props) {
    super(props)
    this.state = {
      data: ''
    }
  }

  toManageBiodata (e) {
    e.preventDefault()
    this.setState({ loadingBiodata: true })
    NProgress.start()
    Router.push('/manage-biodata')
  }

  toInformationStore (e) {
    e.preventDefault()
    NProgress.start()
    Router.push(`/information-store?type=settingStore`)
  }

  toShippingExpedition (e) {
    e.preventDefault()
    Router.push(`/shipping-expedition?type=settingStore`)
  }

  toCatalogList (e) {
    e.preventDefault()
    Router.push(`/catalog-list?type=settingStore`)
  }

  toAddressData (e) {
    e.preventDefault()
    Router.push('/address-data')
  }

  toTermCondition (e) {
    e.preventDefault()
    Router.push('/term-condition')
  }

  render () {
    return (
      <div>
        <section className='section is-paddingless has-shadow'>
          <div className='seller-akun'>
            <div className='profile-wrapp'>
              <ul>
                <li onClick={(e) => this.toInformationStore(e)}>
                  <div className='box is-paddingless'>
                    <article className='media'>
                      <div className='media-left'>
                        <figure className='image'>
                          <span className='icon-info-toko' />
                        </figure>
                      </div>
                      <div className='media-content'>
                        <div className='content'>
                          <p>
                            <strong>Informasi Toko</strong><br />
                          </p>
                        </div>
                      </div>
                    </article>
                  </div>
                  <span className='icon-arrow-right' />
                </li>
                <li onClick={(e) => this.toShippingExpedition(e)}>
                  <div className='box is-paddingless'>
                    <article className='media'>
                      <div className='media-left'>
                        <figure className='image'>
                          <span className='icon-ekspedisi' />
                        </figure>
                      </div>
                      <div className='media-content'>
                        <div className='content'>
                          <p>
                            <strong>Ekspedisi Pengiriman</strong><br />
                          </p>
                        </div>
                      </div>
                    </article>
                  </div>
                  <span className='icon-arrow-right' />
                </li>
                <li onClick={(e) => this.toCatalogList(e)}>
                  <div className='box is-paddingless'>
                    <article className='media'>
                      <div className='media-left'>
                        <figure className='image'>
                          <span className='icon-katalog' />
                        </figure>
                      </div>
                      <div className='media-content'>
                        <div className='content'>
                          <p>
                            <strong>Katalog</strong><br />
                          </p>
                        </div>
                      </div>
                    </article>
                  </div>
                  <span className='icon-arrow-right' />
                </li>
                <li onClick={(e) => this.toAddressData(e)}>
                  <div className='box is-paddingless'>
                    <article className='media'>
                      <div className='media-left'>
                        <figure className='image'>
                          <span className='icon-location' />
                        </figure>
                      </div>
                      <div className='media-content'>
                        <div className='content'>
                          <p>
                            <strong>Alamat Toko</strong><br />
                          </p>
                        </div>
                      </div>
                    </article>
                  </div>
                  <span className='icon-arrow-right' />
                </li>
                <li onClick={(e) => this.toTermCondition(e)}>
                  <div className='box is-paddingless'>
                    <article className='media'>
                      <div className='media-left'>
                        <figure className='image'>
                          <span className='icon-tc' />
                        </figure>
                      </div>
                      <div className='media-content'>
                        <div className='content'>
                          <p>
                            <strong>Terms and Conditions</strong><br />
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
      </div>
    )
  }
}

export default StoreSetting
