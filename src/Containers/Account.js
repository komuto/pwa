// @flow
import React from 'react'
// import Link from 'next/link'
import {Images} from '../Themes'

export default (props:any) => {
  const user = props.user.user.data
  console.log(user)
  return (
    <div>
      <section className='section is-paddingless bg-white'>
        <div className='profile-wrapp'>
          <ul>
            <li>
              <div className='box is-paddingless'>
                <article className='media'>
                  <div className='media-left'>
                    <figure className='image user-pict'>
                      <img src={Images.user} alt='pict' />
                    </figure>
                  </div>
                  <div className='media-content'>
                    <div className='content'>
                      <p className='user-name'>
                        <strong>{ user.name }</strong>
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
                      <div className='val-right'><span>Rp { user.saldo_wallet }</span></div>
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
      </section>
      <section className='section is-paddingless bg-white'>
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
      </section>
    </div>
  )
}
