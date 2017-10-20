// @flow
import React from 'react'
import { connect } from 'react-redux'
// components
import Router from 'next/router'
// actions
import * as actionTypes from '../actions/user'

class Notification extends React.Component {
  render () {
    return (
      <section className='section is-paddingless'>
        <div className='seller-akun'>
          <div className='profile-wrapp'>
            <ul>
              <li onClick={() => Router.push(`/messages`, `/messages`)}>
                <div className='box is-paddingless'>
                  <article className='media'>
                    <div className='media-left'>
                      <figure className='image'>
                        <span className='icon-amplop' />
                      </figure>
                    </div>
                    <div className='media-content'>
                      <div className='content'>
                        <p>
                          <strong>Pesan</strong><br />
                        </p>
                      </div>
                    </div>
                  </article>
                </div>
                <span className='icon-arrow-right' />
              </li>
              <li onClick={() => Router.push(`/discussion-product`, `/discussion/product`)}>
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
              <li onClick={() => Router.push(`/review-products`, `/review/products`)}>
                <div className='box is-paddingless'>
                  <article className='media'>
                    <div className='media-left'>
                      <figure className='image'>
                        <span className='icon-star' />
                      </figure>
                    </div>
                    <div className='media-content'>
                      <div className='content'>
                        <p>
                          <strong>Review</strong><br />
                        </p>
                      </div>
                    </div>
                  </article>
                </div>
                <span className='icon-arrow-right' />
              </li>
              <li onClick={() => Router.push(`/resolution-center`, `/resolution/center`)}>
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
              <li onClick={() => Router.push(`/complaint?type=buyer`, `/complaint/buyer`)}>
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
                          <strong>Komplain</strong><br />
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

export default connect(mapStateToProps, mapDispatchToProps)(Notification)
