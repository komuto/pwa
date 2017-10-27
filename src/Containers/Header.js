// @flow
import React from 'react'
import Head from 'next/head'
import AppConfig from '../Config/AppConfig'

// const randomStringDate = () => {
//   return new Date(+(new Date()) - Math.floor(Math.random() * 10000000000))
// }

const Header = (props) => {
  const { title } = props
  return (
    <Head>
      <title>KOMUTO</title>
      <link rel='stylesheet prefetch' href={`${AppConfig.baseURL}static/dist/css/style.min.css`} />
      <link rel='stylesheet prefetch' href={`${AppConfig.baseURL}static/dist/css/effect.min.css`} />
      <link rel='stylesheet prefetch' href={`${AppConfig.baseURL}static/dist/css/nprogress.min.css`} />
      <link rel='stylesheet prefetch' href={`${AppConfig.baseURL}static/dist/css/react-infinite-calendar.min.css`} />
      <link rel='stylesheet prefetch' href={`${AppConfig.baseURL}static/dist/css/notify.min.css`} />
      <script type='text/javascript' src={AppConfig.midTrans.BASE_URL} data-client-key={AppConfig.midTrans.ACCESS_KEY} />
    </Head>
  )
}

export default Header
