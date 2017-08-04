// @flow
import React from 'react'
import { connect } from 'react-redux'
// components
import Link from 'next/link'
import {Images} from '../Themes'

class VerifyNoTelp extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      verify: false
    }
  }

  handleVerify () {
    this.setState({verify: !this.state.verify})
  }

  render () {
    const { verify } = this.state
    return (
      <section className='content'>
        <div className='container is-fluid'>
          <form action='#' className='form edit'>
            <div className='has-text-centered noted'>
              <p>Silahkan menuliskan kode aktivasi yang telah kami kirim ke nomor 082113101585a</p>
            </div>
            <div className='field is-horizontal number-account'>
              <div className='field-body'>
                <div className='field is-grouped'>
                  <p className='control'>
                    <input className='input' type='text' />
                  </p>
                  <p className='control'>
                    <input className='input' type='text' />
                  </p>
                  <p className='control'>
                    <input className='input' type='text' />
                  </p>
                  <p className='control'>
                    <input className='input' type='text' />
                  </p>
                  <p className='control'>
                    <input className='input' type='text' />
                  </p>
                </div>
              </div>
            </div>
            <a className='button is-primary is-large is-fullwidth js-sort' onClick={() => this.handleVerify()}>Verifikasi Nomor Telepon</a>
            <p className='text-ask has-text-centered'>Belum menerima kode aktivasi? <a>Klik Disini</a></p>
          </form>
        </div>
        <div className='sort-option' style={{display: verify && 'block'}}>
          <div className='notif-report'>
            <img src={Images.verifiedPhone} alt='' />
            <h3>Nomor Telepon Telah Terverifikasi</h3>
            <p>Nomor Telepon telah terverifikasi kini Anda bisa melanjutkan proses aktivasi toko Anda</p>
            <Link href='add-information-store' as='ais'>
              <button className='button is-primary is-large is-fullwidth' onClick={() => this.handleVerify()}>Ke Daftar Transaksi</button>
            </Link>
          </div>
        </div>
      </section>
    )
  }
}

export default connect()(VerifyNoTelp)
