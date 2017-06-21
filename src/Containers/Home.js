// @flow
import React, { Component } from 'react'
// import Link from 'next/link'
import {Images} from '../Themes'
// components
import Slider from 'react-slick'

class Home extends Component {
  render () {
    var settings = {
      autoplay: true,
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    }
    return (
      <div>
        <section className='section is-paddingless'>
          <div className='slide-banner'>
            <Slider {...settings}>
              <img src={Images.banner} alt='banner' style={{width: '100%'}} />
              <img src={Images.banner} alt='banner' style={{width: '100%'}} />
              <img src={Images.banner} alt='banner' style={{width: '100%'}} />
            </Slider>
          </div>
        </section>
        <section className='section is-paddingless'>
          <div className='container is-fluid'>
            <div className='title'>
              <h3>Kategori Produk</h3>
            </div>
          </div>
          <div className='columns is-mobile is-multiline custom'>
            <div className='column is-one-third'>
              <div className='has-text-centered'>
                <span className='icon-computer' />
                <p>Komputer & Handphone</p>
              </div>
            </div>
            <div className='column is-one-third'>
              <div className='has-text-centered'>
                <span className='icon-sport' />
                <p>Peralatan Olahraga</p>
              </div>
            </div>
            <div className='column is-one-third'>
              <div className='has-text-centered'>
                <span className='icon-office' />
                <p>Peralatan Kantor</p>
              </div>
            </div>
            <div className='column is-one-third'>
              <div className='has-text-centered'>
                <span className='icon-kitchen' />
                <p>Perlengkapan Dapur</p>
              </div>
            </div>
            <div className='column is-one-third'>
              <div className='has-text-centered'>
                <span className='icon-baby' />
                <p>Perlengkepan Bayi</p>
              </div>
            </div>
            <div className='column is-one-third'>
              <div className='has-text-centered'>
                <span className='icon-tv' />
                <p>Peralatan TV dan Audio</p>
              </div>
            </div>
            <div className='column is-paddingless'>
              <div className='see-all'>
                <span className='link'>Lihat semua kategori <span className='icon-arrow-right' /></span>
              </div>
            </div>
          </div>
        </section>
        <section className='section is-paddingless'>
          <div className='container is-fluid'>
            <div className='title'>
              <h3>Produk Terbaru</h3>
            </div>
          </div>
          <div className='columns is-mobile is-multiline custom'>
            <div className='column is-half'>
              <div className='box grid'>
                <div className='media'>
                  <div className='media-left'>
                    <figure className='image'>
                      <a><img src={Images.thumb} alt='Image' /></a>
                      <div className='pin'><span>Grosir</span></div>
                    </figure>
                  </div>
                  <div className='media-content'>
                    <div className='content'>
                      <h4>Casual and Light Nike Shoes Running</h4>
                      <div className='detail'>
                        <p>GadgetArena <span className='icon-verified' /></p>
                        <div className='discount' />
                        <span className='price'>Rp 10.500.000 </span>
                        <span className='wish'><span className='icon-wishlist wishlisted' />1200</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='column is-half'>
              <div className='box grid'>
                <div className='media'>
                  <div className='media-left'>
                    <figure className='image'>
                      <a><img src={Images.thumb} alt='Image' /></a>
                      <div className='pin disc'><span>58%</span></div>
                    </figure>
                  </div>
                  <div className='media-content'>
                    <div className='content'>
                      <h4>Casual and Light Nike Shoes Running</h4>
                      <div className='detail'>
                        <p>GadgetArena <span className='icon-verified' /></p>
                        <div className='discount'>Rp 10.560.000</div>
                        <span className='price'>Rp 10.500.000 </span>
                        <span className='wish'><span className='icon-wishlist wishlisted' />1200</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='column is-half'>
              <div className='box grid'>
                <div className='media'>
                  <div className='media-left'>
                    <figure className='image'>
                      <a><img src={Images.thumb} alt='Image' /></a>
                      <div className='pin disc'><span>58%</span></div>
                    </figure>
                  </div>
                  <div className='media-content'>
                    <div className='content'>
                      <h4>Casual and Light Nike Shoes Running</h4>
                      <div className='detail'>
                        <p>GadgetArena <span className='icon-verified' /></p>
                        <div className='discount'>Rp 10.560.000</div>
                        <span className='price'>Rp 10.500.000 </span>
                        <span className='wish'><span className='icon-wishlist wishlisted' />1200</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='column is-half'>
              <div className='box grid'>
                <div className='media'>
                  <div className='media-left'>
                    <figure className='image'>
                      <a><img src={Images.thumb} alt='Image' /></a>
                      <div className='pin disc'><span>58%</span></div>
                    </figure>
                  </div>
                  <div className='media-content'>
                    <div className='content'>
                      <h4>Casual and Light Nike Shoes Running</h4>
                      <div className='detail'>
                        <p>GadgetArena <span className='icon-verified' /></p>
                        <div className='discount'>Rp 10.560.000</div>
                        <span className='price'>Rp 10.500.000 </span>
                        <span className='wish'><span className='icon-wishlist' />1200</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='column is-paddingless'>
              <div className='see-all'>
                <span className='link'>Lihat semua produk terbaru <span className='icon-arrow-right' /></span>
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  }
}

export default Home
