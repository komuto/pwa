import React, { Component } from 'react'
// components
import Content from '../Components/Content'

class TransactionDetailBankTransfer extends Component {
  // constructor (props) {
  //   super(props)
  // }

  render () {
    return (
      <Content>
        <section className='section is-paddingless has-shadow'>
          <div className='box notif-payment'>
            <article className='media'>
              <div className='media-left'>
                <figure className='image user-pict'>
                  <img src='../images/icon-waiting.svg' alt='pict' />
                </figure>
              </div>
              <div className='media-content'>
                <div className='content'>
                  <p>
                    <strong>Menunggu Pembayaran</strong>
                    <br />
                    1 hari  :  20 jam  :  30 menit
                  </p>
                </div>
              </div>
            </article>
          </div>
          <div className='payment-detail bank-transfer'>
            <ul>
              <li>
                <div className='columns is-mobile is-multiline no-margin-bottom'>
                  <div className='column is-one-third'>
                    <div className='label-text is-left'>
                      <span>No Invoice</span>
                    </div>
                  </div>
                  <div className='column'>
                    <div className='is-left has-text-right'>
                      <span>Invoice-83273847492/04/2017</span>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div className='columns is-mobile is-multiline no-margin-bottom'>
                  <div className='column is-one-third'>
                    <div className='rating-content is-left'>
                      <span>Total Tagihan</span>
                    </div>
                  </div>
                  <div className='column'>
                    <div className='rating-content is-left has-text-right'>
                      <span>Rp 250.257</span>
                      <a className='detail-collapsed'>Detail <span className='icon-arrow-down blue' /></a>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </section>
        <section className='section is-paddingless has-shadow'>
          <div className='container is-fluid'>
            <div className='title step-transfer'>
              <h3>Cara Pembayaran</h3>
            </div>
          </div>
          <div className='payment-detail step-pay step-transfer'>
            <ul>
              <li>
                <div className='columns is-mobile is-multiline no-margin-bottom'>
                  <div className='column'>
                    <div className='is-left'>
                      <span className='step-num'>1</span>
                      <div className='step-val'>
                        Catat Kode Pembayaran Anda dan pergilah ke Indomaret terdekat
                        <div className='list-bank'>
                          <ul className='list-inline col2w'>
                            <li className='label-text'>
                              <span>Bank Mandiri</span>
                            </li>
                            <li>
                              <div className='has-text-right img-method'>
                                <img src='../images/mandiri.png' alt='' />
                              </div>
                            </li>
                          </ul>
                          <ul className='rek-info'>
                            <li>
                              <div className='field-left'>No Rek</div>
                              <div className='field-right'><span>:</span> 8179  8387  28</div>
                            </li>
                            <li>
                              <div className='field-left'>Atas nama</div>
                              <div className='field-right'><span>:</span> PT Aptamedia Indonesia</div>
                            </li>
                            <li>
                              <div className='field-left'>Cabang</div>
                              <div className='field-right'><span>:</span> Pondok Gede</div>
                            </li>
                          </ul>
                        </div>
                        <div className='list-bank'>
                          <ul className='list-inline col2w'>
                            <li className='label-text'>
                              <span>Bank BNI</span>
                            </li>
                            <li>
                              <div className='has-text-right img-method'>
                                <img src='../images/bni.png' alt='' />
                              </div>
                            </li>
                          </ul>
                          <ul className='rek-info'>
                            <li>
                              <div className='field-left'>No Rek</div>
                              <div className='field-right'><span>:</span> 8179  8387  28</div>
                            </li>
                            <li>
                              <div className='field-left'>Atas nama</div>
                              <div className='field-right'><span>:</span> PT Aptamedia Indonesia</div>
                            </li>
                            <li>
                              <div className='field-left'>Cabang</div>
                              <div className='field-right'><span>:</span> Pondok Gede</div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div className='columns is-mobile is-multiline no-margin-bottom'>
                  <div className='column'>
                    <div className='is-left'>
                      <span className='step-num'>2</span>
                      <div className='step-val'>
                        Lakukan Pembayaran sampai 3 digit terakhir
                        <p className='price-unique'>Rp 250.<span>257</span></p>
                      </div>
                      <div className='box digit notif-payment'>
                        <p>Lakukan pembayaran sampai 3 digit terakhir agar pembayaran bisa diproses</p>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div className='columns is-mobile is-multiline no-margin-bottom'>
                  <div className='column'>
                    <div className='is-left'>
                      <span className='step-num'>3</span>
                      <span className='step-val'>
                        Lakukan konfirmasi agar pembayaran Anda dapat diproses.
                      </span>
                      <br />
                      <a className='button is-primary is-large is-fullwidth'>Proses Pembayaran</a>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </section>
        <section className='section is-paddingless has-shadow'>
          <div className='payment-detail step-pay'>
            <ul>
              <li>
                <div className='columns is-mobile is-multiline no-margin-bottom'>
                  <div className='column'>
                    <div className='label-text is-left'>
                      <span>Daftar Barang yang dibeli</span>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div className='columns is-mobile is-multiline no-margin-bottom'>
                  <div className='column'>
                    <div className='box'>
                      <div className='media'>
                        <div className='media-left'>
                          <figure className='image'>
                            <a><img src='../images/thumb.jpg' alt='Image' /></a>
                          </figure>
                        </div>
                        <div className='media-content'>
                          <div className='content'>
                            <h4>Sepatu Jogging Nike Hitam </h4>
                            <a className='btn-detail'><span className='icon-arrow-right' /></a>
                            <div className='detail'>
                              <p>Sports Stations Shop</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </section>
      </Content>
    )
  }
}

export default TransactionDetailBankTransfer
