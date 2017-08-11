import React, { Component } from 'react'
// Component
import Content from '../Components/Content'

class PayWithBalance extends Component {
  // constructor (props) {
  //   super(props)
  // }

  render () {
    return (
      <Content>
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
                          <span className='pay-code'> Rp -20.000</span>
                        </div>
                      </div>
                    </div>
                    <div className='columns is-mobile is-multiline no-margin-bottom'>
                      <div className='column'>
                        <div className='label-text is-left'>
                          <span className='pay-code'>
                            Saldo
                          </span>
                        </div>
                      </div>
                      <div className='column is-one-third'>
                        <div className='has-text-right'>
                          <span className='pay-code'> Rp -300.000</span>
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
                          <span>Rp 0</span>
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
                <a className='button is-primary is-large is-fullwidth'>Bayar dengan Saldo</a>
              </li>
            </ul>
          </div>
        </section>
      </Content>
    )
  }
}

export default PayWithBalance
