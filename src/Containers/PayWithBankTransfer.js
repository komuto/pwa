import React, { Component } from 'react'
import Router from 'next/router'
// component
import Content from '../Components/Content'

class PayWithBankTransfer extends Component {
  // constructor (props) {
  //   super(props)
  // }

  render () {
    return (
      <Content>
        <section className='section is-paddingless has-shadow'>
          <div className='columns is-mobile no-margin-bottom notif-alfa'>
            <div className='column'>
              <div className='is-left'>
                <ul className='list-inline col2'>
                  <li className='label-text'>
                    <span>Batas Pembayaran</span>
                  </li>
                  <li>
                    <span>1 hari  :  20 jam  :  30 menit</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className='payment-detail other'>
            <ul>
              <li>
                <div className='columns is-mobile is-multiline no-margin-bottom'>
                  <div className='column'>
                    <div className='label-text is-left'>
                      <span><i className='icon-info-blue' /> Informasi Penting</span>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <ul className='list-bullet'>
                  <li>Transfer beda bank akan dikenakan biaya sebesar Rp 6.500</li>
                  <li>Setelah menekan tombol "Bayar", Anda tidak bisa mengubah metode pembayaran untuk transaksi ini</li>
                </ul>
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
                      <span>Rincian Harga</span>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <ul className='total-pay'>
                  <li>
                    <div className='columns is-mobile is-multiline no-margin-bottom'>
                      <div className='column'>
                        <div className='label-text is-left'>
                          <span>
                            Total Belanja
                          </span>
                        </div>
                      </div>
                      <div className='column is-one-third'>
                        <div className='has-text-right'>
                          <span>Rp 320.000</span>
                        </div>
                      </div>
                    </div>
                    <div className='columns is-mobile is-multiline no-margin-bottom'>
                      <div className='column'>
                        <div className='label-text is-left'>
                          <span className='pay-code'>
                            Kode Voucher BELANJAENAK
                          </span>
                        </div>
                      </div>
                      <div className='column is-one-third'>
                        <div className='has-text-right'>
                          <span className='pay-code'> - Rp 20.000</span>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className='columns is-mobile is-multiline no-margin-bottom'>
                      <div className='column'>
                        <div className='label-text is-left'>
                          <span>
                            Sisa Pembayaran
                          </span>
                        </div>
                      </div>
                      <div className='column is-one-third'>
                        <div className='has-text-right'>
                          <span>Rp 250.219</span>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </section>
        <section className='section is-paddingless'>
          <div className='payment-detail action'>
            <ul>
              <li>
                <span>Dengan menekan tombol "Lanjutkan" Anda telah menyetujui Syarat dan Ketentuan dari Komuto</span>
                <a onClick={() => Router.push('/transaction-detail-bank-transfer')} className='button is-primary is-large is-fullwidth'>Bayar dengan Transfer Bank</a>
              </li>
            </ul>
          </div>
        </section>
      </Content>
    )
  }
}

export default PayWithBankTransfer
