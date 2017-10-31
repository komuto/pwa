// @flow
import React from 'react'
import Head from 'next/head'
import AppConfig from '../Config/AppConfig'

// const randomStringDate = () => {
//   return new Date(+(new Date()) - Math.floor(Math.random() * 10000000000))
// }

const Header = (props) => {
  const isBrowser = typeof window !== 'undefined'
  return (
    <Head>
      <title>KOMUTO</title>
      { isBrowser && <link rel='stylesheet prefetch' href={`${AppConfig.baseURL}static/dist/css/style.min.css`} /> }
      { isBrowser && <link rel='stylesheet prefetch' href={`${AppConfig.baseURL}static/dist/css/effect.min.css`} /> }
      { isBrowser && <link rel='stylesheet prefetch' href={`${AppConfig.baseURL}static/dist/css/nprogress.min.css`} /> }
      { isBrowser && <link rel='stylesheet prefetch' href={`${AppConfig.baseURL}static/dist/css/react-infinite-calendar.min.css`} /> }
      { isBrowser && <link rel='stylesheet prefetch' href={`${AppConfig.baseURL}static/dist/css/notify.min.css`} /> }
      { isBrowser && <script type='text/javascript' src={AppConfig.midTrans.BASE_URL} data-client-key={AppConfig.midTrans.ACCESS_KEY} /> }
    </Head>
  )
}

export default Header
