// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import Head from 'next/head'
import AppConfig from '../Config/AppConfig'
import ReadAbleText from '../Lib/ReadAbleText'

class Header extends Component {
  constructor (props) {
    super(props)
    const { pageType, productDetail, tempMarketplace } = props
    let title = ''
    switch (pageType) {
      case 'product_detail':
        title = this._createTitle(title, productDetail)
        break
      default:
        if (tempMarketplace.code === 200) {
          const { data } = tempMarketplace
          title = data.name
        }
        break
    }

    this.state = {
      title,
      tempMarketplace
    }
  }

  _createTitle (title, productDetail) {
    if (productDetail.isFound) {
      const { product } = productDetail.detail
      title = ReadAbleText(product.name)
    }
    return title
  }

  componentWillReceiveProps (nextProps) {
    const { pageType, productDetail } = nextProps
    let { title } = this.state
    switch (pageType) {
      case 'product_detail':
        title = this._createTitle(title, productDetail)
        break
      default:
        break
    }

    this.setState({ title })
  }

  render () {
    const { title, tempMarketplace } = this.state
    const hostName = `https://${tempMarketplace.data.mobile_domain}/`
    return (
      <Head>
        <title>{ title }</title>
        <link rel='stylesheet prefetch' href={`${hostName}static/dist/css/style.min.css`} />
        <link rel='stylesheet prefetch' href={`${hostName}static/dist/css/effect.min.css`} />
        <link rel='stylesheet prefetch' href={`${hostName}static/dist/css/nprogress.min.css`} />
        <link rel='stylesheet prefetch' href={`${hostName}static/dist/css/react-infinite-calendar.min.css`} />
        <link rel='stylesheet prefetch' href={`${hostName}static/dist/css/notify.min.css`} />
        <link rel='stylesheet prefetch' href={`${hostName}static/slick/slick.css`} />
        <link rel='stylesheet prefetch' href={`${hostName}static/slick/slick-theme.css`} />
        <script type='text/javascript' src={AppConfig.midTrans.BASE_URL} data-client-key={AppConfig.midTrans.ACCESS_KEY} />
        <link rel='manifest' href={`${hostName}manifest.json`} />
      </Head>
    )
  }
}

const mapStateToProps = (state) => ({
  productDetail: state.productDetail,
  tempMarketplace: state.tempMarketplace
})

export default connect(mapStateToProps)(Header)
