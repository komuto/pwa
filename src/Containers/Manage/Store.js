import React, { Component } from 'react'
import { connect } from 'react-redux'
import Router from 'next/router'
import NProgress from 'nprogress'
import { animateScroll } from 'react-scroll'
// components
import Content from '../../Components/Content'
// actions
import * as actionTypes from '../../actions/user'
import * as storesAction from '../../actions/stores'
// services
// import { Status } from '../Services/Status'

class ManageStore extends Component {
  constructor (props) {
    super(props)
    this.state = {
      profile: props.profile,
      loadingBiodata: false,
      unreadDisputesStore: null,
      notification: {
        status: false,
        color: 'is-success',
        message: 'Error, default message.'
      }
    }
    this.submitting = {
      unreadDisputesStore: false,
      profile: false
    }
  }

  /** reset scroll */
  scrollToTop () {
    animateScroll.scrollTo(0, {duration: 0})
  }

  handleNotification (e) {
    const { notification } = this.state
    const newState = { notification }
    newState.notification['status'] = !notification.status
    this.setState(newState)
  }

  componentDidMount () {
    this.scrollToTop()
    const { isFound } = this.props
    if (!isFound(this.state.profile)) {
      NProgress.start()
      this.submitting = { ...this.submitting, profile: true }
      this.props.getProfile()
    }
    this.submitting = { ...this.submitting, unreadDisputesStore: true }
    this.props.getUnreadDisputeStore()
  }

  componentWillReceiveProps (nextProps) {
    const { profile, unreadDisputesStore } = nextProps

    console.log('unreadDisputesStore: ', unreadDisputesStore)

    const { isFetching, isError, isFound, notifError } = this.props

    if (!isFetching(unreadDisputesStore) && this.submitting.unreadDisputesStore) {
      this.submitting = { ...this.submitting, unreadDisputesStore: false }
      if (isError(unreadDisputesStore)) {
        this.setState({ notification: notifError(unreadDisputesStore.message) })
      }
      if (isFound(unreadDisputesStore)) {
        this.setState({ unreadDisputesStore })
      }
    }

    if (!isFetching(profile) && this.submitting.profile) {
      NProgress.done()
      this.submitting = { ...this.submitting, profile: false }
      if (isError(profile)) {
        this.setState({ notification: notifError(profile.message) })
      }
      if (isFound(profile)) {
        this.setState({ profile })
      }
    }
  }

  toManageBiodata (e) {
    e.preventDefault()
    this.setState({ loadingBiodata: true })
    Router.push('/manage-biodata')
  }

  toStoreSetting (e) {
    e.preventDefault()
    Router.push('/store-setting')
  }

  toListProducts (e) {
    e.preventDefault()
    Router.push('/product-list', '/product/list')
  }

  toSales (e) {
    e.preventDefault()
    Router.push('/sales')
  }

  render () {
    const { profile, unreadDisputesStore } = this.state
    const { isFound } = this.props
    let countDispute = 0

    if (unreadDisputesStore) {
      if (isFound(unreadDisputesStore)) {
        const { disputes } = unreadDisputesStore
        countDispute = disputes.disputes
        console.log('countDispute: ', countDispute)
      }
    }

    return (
      <div>
        {
          isFound(profile) && !profile.user.store.is_verified && <VerificationContent {...this.state.profile.user} />
        }
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
                <li onClick={() => Router.push('/complain-seller')}>
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
                          {
                            countDispute > 0 &&
                            <div className='val-right'><span className='notif-akun'>{ countDispute }</span></div>
                          }
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

const VerificationContent = ({ store }) => (
  <Content>
    <div className='columns is-mobile no-margin-bottom notif-alfa'>
      <div className='column'>
        <div className='is-left'>
          <ul className='list-inline col2'>
            <li className='label-text'>
              <span><strong>Batas Pembayaran :</strong> {store.verification_left} hari</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <section className='section is-paddingless bg-white has-shadow'>
      <div className='verify-wrapp'>
        <h4>Toko belum diverifikasi.</h4>
        <p>Lakukan verifikasi agar bisa melakukan aktifitas penjualan lebih dari 30 hari</p>
        <button onClick={() => Router.push('/store-verification', '/store/verification')} className='button is-primary is-medium is-fullwidth'>Lanjutkan</button>
      </div>
    </section>
  </Content>
)

const mapStateToProps = (state) => ({
  profile: state.profile,
  changePassword: state.changePassword,
  unreadDisputesStore: state.unreadDisputesStore
})

const mapDispatchToProps = dispatch => ({
  getProfile: () => dispatch(actionTypes.getProfile()),
  logout: () => dispatch(actionTypes.logout()),
  getUnreadDisputeStore: () => dispatch(storesAction.getUnreadDisputeStore())
})

export default connect(mapStateToProps, mapDispatchToProps)(ManageStore)
