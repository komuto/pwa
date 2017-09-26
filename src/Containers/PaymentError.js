import React from 'react'
import Router from 'next/router'
import MyImage from '../Components/MyImage'
// themes
import Images from '../Themes/Images'

export default () => {
  return (
    <section className='content'>
      <div className='container is-fluid'>
        <div className='desc has-text-centered'>
          <MyImage src={Images.paymentSuccess} />
          <p><strong>Pembayaran Gagal </strong></p>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</p>
        </div>
        <div className='columns is-mobile'>
          <div className='column'>
            <a onClick={() => Router.push('/transaction')} className='button is-primary is-large is-fullwidth'>Lihat daftar transaksi</a>
          </div>
        </div>
      </div>
    </section>
  )
}
