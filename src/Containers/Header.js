// @flow
import React from 'react'
import Head from 'next/head'
import AppConfig from '../Config/AppConfig'

const Header = (props) => {
  const { title } = props.params
  return (
    <Head>
      <meta charset='UTF-8' />
      <title>{ title }</title>
      <meta content='width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no' name='viewport' />
      <meta name='apple-mobile-web-app-status-bar-style' content='black' />
      <link rel='stylesheet prefetch' href={`${AppConfig.baseURL}static/dist/css/style.css`} />
      <link rel='stylesheet prefetch' href={`${AppConfig.baseURL}static/dist/css/effect.css`} />
      <link rel='stylesheet prefetch' href={`${AppConfig.baseURL}static/dist/css/nprogress.css`} />
      <link rel='stylesheet' type='text/css' href='https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css' />
      <link rel='stylesheet' type='text/css' href='https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css' />

      {/* Chrome, Firefox OS and Opera */}
      <meta name='theme-color' content='#ef5656' />
      {/* Windows Phone */}
      <meta name='msapplication-navbutton-color' content='#ef5656' />
      {/* iOS Safari */}
      <meta name='apple-mobile-web-app-status-bar-style' content='#ef5656' />
      <link rel='manifest' href={`${AppConfig.baseURL}static/manifest.json`} />
    </Head>
  )
}

export default Header
