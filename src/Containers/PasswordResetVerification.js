// @flow
import React from 'react'
import Router from 'next/router'
import {Images} from '../Themes'
import { NotificationPage } from '../Components/Notification'

export default (props:any) => {
  const email = Router.query.email
  return <NotificationPage
    icon={Images.regSuccess}
    title='Link Reset Password telah terkirim'
    subTitle={`Kami telah mengirim link reset password ke ${email}. Silahkan periksa inbox Anda, dan ikuti petunjuk di email tersebut.`}
    path='signin'
    text='Ke Halaman Login' />
}
