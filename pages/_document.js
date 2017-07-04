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
      <html>
        <Head>
          <meta charset='UTF-8' />
          <title>Komuto</title>
          <meta content='width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no' name='viewport' />
          <meta name='apple-mobile-web-app-status-bar-style' content='black' />
          {/* Chrome, Firefox OS and Opera */}
          <meta name='theme-color' content='#ef5656' />
          {/* Windows Phone */}
          <meta name='msapplication-navbutton-color' content='#ef5656' />
          {/* iOS Safari */}
          <meta name='apple-mobile-web-app-status-bar-style' content='#ef5656' />
          <link rel='manifest' href='static/manifest.json' />
        </Head>
        <body>
          <Main />
          <script src={`${AppConfig.baseURL}static/js/index.js`} />
          <NextScript />
          <script src='https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js' />
          <script src={`${AppConfig.baseURL}static/js/nprogress.js`} />
        </body>
      </html>
    )
  }
}
