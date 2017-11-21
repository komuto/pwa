import React from 'react'
import Router from 'next/router'
import MyImage from '../../Components/MyImage'
import Images from '../../Themes/Images'
// themes
// import Images from '../Themes/Images'

export default () => {
  return (
    <section className='content'>
      <div className='container is-fluid'>
        <div className='desc has-text-centered'>
          <MyImage src={Images.transaksiDetail} alt='imageNull' />
          <p><strong>Pembayaran sedang di proses </strong></p>
          <p>Terimakasih telah menunggu, pembayaran sedang kami proses.</p>
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
