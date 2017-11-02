import React, { Component } from 'react'
import {Images} from '../../Themes'
import { NotificationPage } from '../../Components/Notification'

class ProductAddSuccess extends Component {
  render () {
    return (
      <NotificationPage
        icon={Images.regSuccess}
        title='Berhasil Menambah Produk'
        subTitle='Anda telah berhasil menambah produk baru ke dalam toko anda'
        path='/product-list'
        alias='/product/list'
        text='Lihat Daftar Produk' />
    )
  }
}

export default ProductAddSuccess
