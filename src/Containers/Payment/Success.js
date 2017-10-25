import React from 'react'
import Router from 'next/router'
import MyImage from '../../Components/MyImage'
// themes
import Images from '../../Themes/Images'

export default () => {
  return (
    <section className='content'>
      <div className='container is-fluid'>
        <div className='desc has-text-centered'>
          <MyImage src={Images.paymentSuccess} alt='paymentSuccess' />
          <p><strong>Pembayaran Telah Berhasil </strong></p>
          <p>Terima kasih Anda telah berhasil melakukan isi ulang Saldo. Saldo Anda kini telah bertambah sesuai dengan nilai transaksi</p>
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
