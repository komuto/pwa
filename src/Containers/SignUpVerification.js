// @flow
import React from 'react'
import {Images} from '../Themes'
import { NotificationPage } from '../Components/Notification'

export default (props:any) => {
  return <NotificationPage
    icon={Images.password}
    title='Link Verifikasi Email telah terkirim'
    subTitle='Kami telah mengirim link verifikasi email ke dwinawan@gmail.com. Silahkan periksa inbox Anda, dan ikuti petunjuk di email tersebut.'
    path='signin'
    text='Ke Halaman Login' />
}
