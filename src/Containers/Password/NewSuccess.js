// @flow
import React from 'react'
import {Images} from '../../Themes'
import { NotificationPage } from '../../Components/Notification'

export default (props:any) => {
  return <NotificationPage
    icon={Images.password}
    title='Password berhasil diubah'
    subTitle='Password Anda telah berhasil diubah. Kini Anda bisa login menggunakan password Anda yang baru.'
    path='signin'
    text='Ke Halaman Login' />
}
