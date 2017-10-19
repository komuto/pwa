import React, { Component } from 'react'
import {Images} from '../../Themes'
import { NotificationPage } from '../../Components/Notification'

class ProductAddSuccess extends Component {
  render () {
    return (
      <NotificationPage
        icon={Images.regSuccess}
        title='Berhasil Menambah Produk'
        subTitle='Anda telah berhadil menambah produk baru ke dalam toko anda'
        path='/product-list'
        text='Lihat Daftar Produk' />
    )
  }
}

export default ProductAddSuccess
