// @flow
import React from 'react'
import Router from 'next/router'
import { Images } from '../Themes'
import { NotificationPage } from '../Components/Notification'

export default (props:any) => {
  const email = Router.query.email
  return <NotificationPage
    icon={Images.password}
    title='Link Verifikasi Email telah terkirim'
    subTitle={`Kami telah mengirim link verifikasi email ke ${email}. Silahkan periksa inbox Anda, dan ikuti petunjuk di email tersebut.`}
    path='signin'
    text='Ke Halaman Login' />
}
