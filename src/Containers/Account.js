// @flow
import React, { Component } from 'react'

// components
import Content from '../Components/Content'
import Section from '../Components/Section'
// import Link from 'next/link'
import {Images} from '../Themes'

class Account extends Component {
  render () {
    const { data } = this.props.user.user
    return (
      <Content>
        <Section className='bg-white'>
          {
          data.status === 0
          ? <div className='notif-verify'>
            <div className='box is-paddingless'>
              <article className='media'>
                <div className='media-left'>
                  <figure className='image'>
                    <span className='icon-verify' />
                  </figure>
                </div>
                <div className='media-content'>
                  <div className='content'>
                    <p>
                      <strong>Verifikasikan email untuk mengakses semua menu</strong>
                      Silahkan klik link verifikasi yang telah kami kirimkan ke dwinawan@gmail.com
                      <a className='button is-warning is-outlined'>Kirim Ulang link verifikasi</a>
                    </p>
                  </div>
                </div>
              </article>
            </div>
          </div>
          : ''
        }
          <div className='profile-wrapp'>
            <ul>
              <li>
                <div className='box is-paddingless'>
                  <article className='media'>
                    <div className='media-left'>
                      <figure className='image user-pict'>
                        <img src={(data.photo) ? data.photo : Images.noImage} alt='pict' />
                      </figure>
                    </div>
                    <div className='media-content'>
                      <div className='content'>
                        <p className='user-name'>
                          <strong>{ data.name }</strong>
                          <br />
                          Kelola Akun
                        </p>
                        <div className='val-right'><span className='notif-akun'>1</span></div>
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
                        <span className='icon-saldo' />
                      </figure>
                    </div>
                    <div className='media-content'>
                      <div className='content'>
                        <p>
                          <strong>Saldo</strong>
                        </p>
                        <div className='val-right'><span>Rp { data.saldo_wallet }</span></div>
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
                        <span className='icon-list-lg' />
                      </figure>
                    </div>
                    <div className='media-content'>
                      <div className='content'>
                        <p>
                          <strong>Daftar Toko Favorit</strong>
                        </p>
                      </div>
                    </div>
                  </article>
                </div>
                <span className='icon-arrow-right' />
              </li>
            </ul>
          </div>
        </Section>
        <Section className='bg-white'>
          <div className='profile-wrapp'>
            <ul>
              <li>
                <div className='box is-paddingless'>
                  <article className='media'>
                    <div className='media-left'>
                      <figure className='image'>
                        <span className='icon-toko' />
                      </figure>
                    </div>
                    <div className='media-content'>
                      <div className='content'>
                        <p>
                          <strong>Anda belum memiliki Toko</strong><br />
                          Buat Sekarang
                        </p>
                      </div>
                    </div>
                  </article>
                </div>
                <span className='icon-arrow-right' />
              </li>
            </ul>
          </div>
        </Section>
      </Content>
    )
  }
}

export default Account
