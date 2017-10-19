import React, { Component } from 'react'
import { connect } from 'react-redux'
import Router from 'next/router'
// components
import NProgress from 'nprogress'
// actions
import * as actionTypes from '../actions/user'
// services
// import { Status } from '../Services/Status'

class ManageStore extends Component {
  constructor (props) {
    super(props)
    this.state = {
      profile: props.profile,
      loadingBiodata: false,
      notification: {
        status: false,
        color: 'is-success',
        message: 'Error, default message.'
      }
    }
  }

  handleNotification (e) {
    const { notification } = this.state
    const newState = { notification }
    newState.notification['status'] = !notification.status
    this.setState(newState)
  }

  // componentDidMount () {
  // }

  componentWillReceiveProps (nextProps) {
    this.setState({ profile: nextProps.profile })
  }

  toManageBiodata (e) {
    e.preventDefault()
    this.setState({ loadingBiodata: true })
    NProgress.start()
    Router.push('/manage-biodata')
  }

  toStoreSetting (e) {
    e.preventDefault()
    Router.push('/store-setting')
  }

  toListProducts (e) {
    e.preventDefault()
    Router.push('/product-list')
  }

  toSales (e) {
    e.preventDefault()
    Router.push('/sales')
  }

  render () {
    return (
      <div>
        <section className='section is-paddingless bg-white has-shadow'>
          <div className='profile-wrapp'>
            <ul>
              <li onClick={(e) => this.toStoreSetting(e)}>
                <div className='box is-paddingless'>
                  <article className='media'>
                    <div className='media-left'>
                      <figure className='image'>
                        <span className='icon-gear' />
                      </figure>
                    </div>
                    <div className='media-content'>
                      <div className='content'>
                        <p>
                          <strong>Pengaturan Toko</strong><br />
                        </p>
                      </div>
                    </div>
                  </article>
                </div>
                <span className='icon-arrow-right' />
              </li>
            </ul>
          </div>
        </section>

        <section className='section is-paddingless has-shadow'>
          <div className='seller-akun'>
            <div className='container is-fluid'>
              <div className='title'>
                <h3>Menu Toko</h3>
              </div>
            </div>
            <div className='profile-wrapp'>
              <ul>
                <li onClick={(e) => this.toListProducts(e)}>
                  <div className='box is-paddingless'>
                    <article className='media'>
                      <div className='media-left'>
                        <figure className='image'>
                          <span className='icon-register' />
                        </figure>
                      </div>
                      <div className='media-content'>
                        <div className='content'>
                          <p>
                            <strong>Daftar Produk</strong><br />
                          </p>
                        </div>
                      </div>
                    </article>
                  </div>
                  <span className='icon-arrow-right' />
                </li>
                <li onClick={(e) => this.toSales(e)}>
                  <div className='box is-paddingless'>
                    <article className='media'>
                      <div className='media-left'>
                        <figure className='image'>
                          <span className='icon-bag bag2' />
                        </figure>
                      </div>
                      <div className='media-content'>
                        <div className='content'>
                          <p>
                            <strong>Penjualan</strong><br />
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

        <section className='section is-paddingless has-shadow'>
          <div className='seller-akun'>
            <div className='container is-fluid'>
              <div className='title'>
                <h3>Notifikasi</h3>
              </div>
            </div>
            <div className='profile-wrapp'>
              <ul>
                <li onClick={() => Router.push('/notification-message')}>
                  <div className='box is-paddingless'>
                    <article className='media'>
                      <div className='media-left'>
                        <figure className='image'>
                          <span className='icon-chat' />
                        </figure>
                      </div>
                      <div className='media-content'>
                        <div className='content'>
                          <p>
                            <strong>Chat dengan Pelanggan</strong><br />
                          </p>
                        </div>
                      </div>
                    </article>
                  </div>
                  <span className='icon-arrow-right' />
                </li>
                <li onClick={() => Router.push('/notification-discussion')}>
                  <div className='box is-paddingless'>
                    <article className='media'>
                      <div className='media-left'>
                        <figure className='image'>
                          <span className='icon-discuss' />
                        </figure>
                      </div>
                      <div className='media-content'>
                        <div className='content'>
                          <p>
                            <strong>Diskusi Produk</strong><br />
                          </p>
                        </div>
                      </div>
                    </article>
                  </div>
                  <span className='icon-arrow-right' />
                </li>
                <li onClick={() => Router.push('/notification-product-review')}>
                  <div className='box is-paddingless'>
                    <article className='media'>
                      <div className='media-left'>
                        <figure className='image'>
                          <span className='icon-review' />
                        </figure>
                      </div>
                      <div className='media-content'>
                        <div className='content'>
                          <p>
                            <strong>Produk Direview</strong><br />
                          </p>
                        </div>
                      </div>
                    </article>
                  </div>
                  <span className='icon-arrow-right' />
                </li>
                <li>
                  <div className='box is-paddingless'>
                    <article className='media'>
                      <div className='media-left'>
                        <figure className='image'>
                          <span className='icon-help' />
                        </figure>
                      </div>
                      <div className='media-content'>
                        <div className='content'>
                          <p>
                            <strong>Pusat Resolusi</strong><br />
                          </p>
                        </div>
                      </div>
                    </article>
                  </div>
                  <span className='icon-arrow-right' />
                </li>
                <li onClick={() => Router.push('/complain-items')}>
                  <div className='box is-paddingless'>
                    <article className='media'>
                      <div className='media-left'>
                        <figure className='image'>
                          <span className='icon-komplain-produk' />
                        </figure>
                      </div>
                      <div className='media-content'>
                        <div className='content'>
                          <p>
                            <strong>Komplain Barang</strong><br />
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

const mapStateToProps = (state) => {
  return {
    profile: state.profile,
    changePassword: state.changePassword
  }
}

const mapDispatchToProps = dispatch => ({
  getProfile: () => dispatch(actionTypes.getProfile()),
  logout: () => dispatch(actionTypes.logout())
})

export default connect(mapStateToProps, mapDispatchToProps)(ManageStore)
