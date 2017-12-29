// @flow
import Document, { Head, Main, NextScript } from 'next/document'
import AppConfig from '../src/Config/AppConfig'

export default class HomeDocument extends Document {
  static async getInitialProps (ctx) {
    const props = await Document.getInitialProps(ctx)
    return { ...props }
  }

  render () {
    return (
      <html lang='id'>
        <Head>
          <meta charset='UTF-8' />
          <meta content='width=device-width, initial-scale=1, maximum-scale=1' name='viewport' />
          <meta name='apple-mobile-web-app-status-bar-style' content='black' />
          {/* Chrome, Firefox OS and Opera */}
          <meta name='theme-color' content='#ef5656' />
          {/* Windows Phone */}
          <meta name='msapplication-navbutton-color' content='#ef5656' />
          {/* iOS Safari */}
          <meta name='apple-mobile-web-app-status-bar-style' content='#ef5656' />
          {/* <link rel='manifest' href={`https://gist.githubusercontent.com/ericelliott/90602152915b615b761c113f82243146/raw/fa81347cc2d851409c77cc8fd9418185dbf537f4/manifest.json`} /> */}
        </Head>
        <body>
          <Main />
          <script src={`${AppConfig.baseURL}static/js/index.js`} />
          <NextScript />
          <script src='https://code.jquery.com/jquery-2.1.4.min.js' />
          <script src={`${AppConfig.baseURL}static/js/nprogress.js`} />
          <link rel='stylesheet' type='text/css' href='https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css' />
          <link rel='stylesheet' type='text/css' href='https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css' />
        </body>
      </html>
    )
  }
}
