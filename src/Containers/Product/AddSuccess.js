import React from 'react'
import {Images} from '../../Themes'
import { NotificationPage } from '../../Components/Notification'
import DefaultLayout from '../../Layout/DefaultLayout'

export default () => (
  <DefaultLayout>
    <NotificationPage
      icon={Images.phoneSuccess}
      title='Berhasil Menambah Produk'
      subTitle='Anda telah berhasil menambah produk baru ke dalam toko Anda'
      path='/product-list'
      alias='/product/list'
      text='Lihat Daftar Produk' />
  </DefaultLayout>
)
