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
          <script src='https://code.jquery.com/jquery-2.1.4.min.js' />
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
