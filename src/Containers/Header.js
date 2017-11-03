// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import Head from 'next/head'
import AppConfig from '../Config/AppConfig'
import ReadAbleText from '../Lib/ReadAbleText'

class Header extends Component {
  constructor (props) {
    super(props)
    const { pageType, productDetail, marketplace } = props
    console.log('marketplace: ', marketplace)
    let title = ''
    switch (pageType) {
      case 'product_detail':
        title = this._createTitle(title, productDetail)
        break
      default:
        if (marketplace.isFound) {
          const { data } = marketplace
          title = data.name
        }
        break
    }

    this.state = {
      title
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
    const { title } = this.state
    return (
      <Head>
        <title>{ title }</title>
        { <link rel='stylesheet prefetch' href={`${AppConfig.baseURL}static/dist/css/style.min.css`} /> }
        { <link rel='stylesheet prefetch' href={`${AppConfig.baseURL}static/dist/css/effect.min.css`} /> }
        { <link rel='stylesheet prefetch' href={`${AppConfig.baseURL}static/dist/css/nprogress.min.css`} /> }
        { <link rel='stylesheet prefetch' href={`${AppConfig.baseURL}static/dist/css/react-infinite-calendar.min.css`} /> }
        { <link rel='stylesheet prefetch' href={`${AppConfig.baseURL}static/dist/css/notify.min.css`} /> }
        { <script type='text/javascript' src={AppConfig.midTrans.BASE_URL} data-client-key={AppConfig.midTrans.ACCESS_KEY} /> }
      </Head>
    )
  }
}

const mapStateToProps = (state) => ({
  productDetail: state.productDetail,
  marketplace: state.marketplace
})

export default connect(mapStateToProps)(Header)
