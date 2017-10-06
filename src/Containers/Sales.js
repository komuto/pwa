// @flow
import React from 'react'
import { connect } from 'react-redux'
// components
import Router from 'next/router'
// actions
import * as actionTypes from '../actions/user'

class Sales extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      submitting: false
    }
  }

  render () {
    return (
      <section className='section is-paddingless has-shadow'>
        <div className='seller-akun'>
          <div className='profile-wrapp'>
            <ul>
              <li onClick={() => Router.push(`/orders-new`)}>
                <div className='box is-paddingless'>
                  <article className='media'>
                    <div className='media-left'>
                      <figure className='image'>
                        <span className='icon-pesanan-baru' />
                      </figure>
                    </div>
                    <div className='media-content'>
                      <div className='content'>
                        <p>
                          <strong>Pesanan Baru</strong>
                        </p>
                        <div className='val-right'><strong>30</strong></div>
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
                        <span className='icon-konfirmasi-pengiriman' />
                      </figure>
                    </div>
                    <div className='media-content'>
                      <div className='content'>
                        <p>
                          <strong>Konfirmasi Pengiriman</strong>
                        </p>
                        <div className='val-right'><strong>20</strong></div>
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
                        <span className='icon-daftar-penjualan' />
                      </figure>
                    </div>
                    <div className='media-content'>
                      <div className='content'>
                        <p>
                          <strong>Daftar Penjualan</strong><br />
                        </p>
                        <div className='val-right'><span className='notif-akun'>5</span></div>
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
    )
  }
}

const mapStateToProps = (state) => {
  return {
    profile: state.profile
  }
}

const mapDispatchToProps = dispatch => ({
  getProfile: () => dispatch(actionTypes.getProfile())
})

export default connect(mapStateToProps, mapDispatchToProps)(Sales)
