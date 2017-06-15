// @flow
import React from 'react'
import {Images} from '../Themes'
import { NotificationPage } from '../Components/Notification'

export default (props:any) => {
  return <NotificationPage
    icon={Images.regSuccess}
    title='Link Reset Password telah terkirim'
    subTitle='Kami telah mengirim link reset password ke dwinawan@gmail.com. Silahkan periksa inbox Anda, dan ikuti petunjuk di email tersebut.'
    path='signin'
    text='Ke Halaman Login' />
}
