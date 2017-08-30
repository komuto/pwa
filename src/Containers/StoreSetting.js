import React, { Component } from 'react'
import { connect } from 'react-redux'
import Router from 'next/router'
// components
import NProgress from 'nprogress'
// actions
import * as actionTypes from '../actions/user'
// services
// import { Status } from '../Services/Status'

class StoreSetting extends Component {
  constructor (props) {
    super(props)
    this.state = {
      profile: props.profile,
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

  componentDidMount () {
  }

  componentWillReceiveProps (nextProps) {
    this.setState({ profile: nextProps.profile })
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
    Router.push(`/information-store?type=setting`)
  }

  toShippingExpedition (e) {
    e.preventDefault()
    Router.push(`/shipping-expedition?type=setting`)
  }

  render () {
    // const { profile, notification } = this.state
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
                <li>
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
                <li>
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
                <li>
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

export default connect(mapStateToProps, mapDispatchToProps)(StoreSetting)

