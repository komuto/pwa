// @flow
import React from 'react'
import {Images} from '../Themes'
import { NotificationPage } from '../Components/Notification'

export default (props:any) => {
  return <NotificationPage
    icon={Images.regSuccess}
    title='Selamat Datang di Komuto'
    subTitle='Selamat bergabung dengan komuto. Disini Anda bisa melakukan lorem ipsum dolor sit amet consequence dolor'
    path='profile'
    text='Ke Halaman Profil' />
}
