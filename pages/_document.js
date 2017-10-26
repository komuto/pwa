// @flow
import Document, { Head, Main, NextScript } from 'next/document'
import AppConfig from '../src/Config/AppConfig'
export default class HomeDocument extends Document {
  static async getInitialProps (ctx) {
    const props = await Document.getInitialProps(ctx)
    return { ...props }
  }

  randomStringDate () {
    return new Date(+(new Date()) - Math.floor(Math.random() * 10000000000))
  }

  render () {
    return (
      <html lang='id'>
        <Head>
          <meta charset='UTF-8' />
          <title>Komuto</title>
          <meta content='width=device-width, initial-scale=1, maximum-scale=1' name='viewport' />
          <meta name='apple-mobile-web-app-status-bar-style' content='black' />
          <link rel='stylesheet prefetch' href={`${AppConfig.baseURL}static/dist/css/style.css?${this.randomStringDate()}`} />
          <link rel='stylesheet prefetch' href={`${AppConfig.baseURL}static/dist/css/effect.css?${this.randomStringDate()}`} />
          <link rel='stylesheet prefetch' href={`${AppConfig.baseURL}static/dist/css/nprogress.css?${this.randomStringDate()}`} />
          <link rel='stylesheet prefetch' href={`${AppConfig.baseURL}static/dist/css/react-infinite-calendar.css?${this.randomStringDate()}`} />
          <link rel='stylesheet prefetch' href={`${AppConfig.baseURL}static/dist/css/notify.css?${this.randomStringDate()}`} />
          <link rel='stylesheet' type='text/css' href='https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css' />
          <link rel='stylesheet' type='text/css' href='https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css' />
          <script src='https://code.jquery.com/jquery-2.1.4.min.js' />
          <script type='text/javascript' src={AppConfig.midTrans.BASE_URL} data-client-key={AppConfig.midTrans.ACCESS_KEY} />
          {/* Chrome, Firefox OS and Opera */}
          <meta name='theme-color' content='#ef5656' />
          {/* Windows Phone */}
          <meta name='msapplication-navbutton-color' content='#ef5656' />
          {/* iOS Safari */}
          <meta name='apple-mobile-web-app-status-bar-style' content='#ef5656' />
          <link rel='manifest' href={`../static/manifest.json`} />
        </Head>
        <body>
          <Main />
          <script src={`${AppConfig.baseURL}static/js/index.js`} />
          <NextScript />
          {/* <script src='https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js' />
          <script src='http://staging.doku.com/doku-js/assets/js/doku.js' /> */}
          <script src={`${AppConfig.baseURL}static/js/nprogress.js`} />
        </body>
      </html>
    )
  }
}
