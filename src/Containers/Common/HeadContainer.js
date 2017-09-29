import React, { Component } from 'react'
import { connect } from 'react-redux'
import Head from 'next/head'
import AppConfig from '../../Config/AppConfig'
const defTitle = 'Komuto.com: cara cepat bikin online store'
const defMetaKeywords = 'Komuto, Komuto.com,  Belanja Online, Online Shopping, Kebutuhan Rumah Tangga, Dapur Minimalis, Kamar Mandi, Perbaikan Rumah, Renovasi Rumah, Furniture, Otomotif, Pets, Hewan Peliharaan, Fashion, Hobi, Kesehatan, Olahraga, Barang Elektronik, Gadget, Mainan Anak, Kebutuhan Bayi, Vacuum Cleaner, ACE, ACE Hardware, Informa, Toys Kingdom'
const defMetaDescription = `ACE Hardware, Informa, Toys Kingdom, etc. Jaminan 100% Produk ASLI, Garansi, Belanja Online Aman &amp; Nyaman. Semua ada disini. Let's Get MORE!`
const AssembleMeta = (props:any) => {
  const {attributes} = props
  if (attributes[0].hasOwnProperty('name')) {
    return (<meta name={attributes[0].name} content={attributes[1].content} />)
  } else if (attributes[0].hasOwnProperty('itemprop')) {
    return (<meta itemProp={attributes[0].itemprop} content={attributes[1].content} />)
  } else if (attributes[0].hasOwnProperty('property')) {
    return (<meta name={attributes[0].property} content={attributes[1].content} />)
  }
}
const AssembleLink = (props:any) => {
  const {attributes, index} = props
  if (attributes[0].hasOwnProperty('rel')) {
    return (<link rel={attributes[0].rel} href={attributes[1].href} key={`link_` + index} />)
  }
}
class HeadContainer extends Component {
  state: {
    metaDescription: string,
    metaKeywords: string,
    title: string,
    additionalHeader: string,
    inlineScript: string
  }
  constructor (props: any) {
    super(props)
    const {pageType, productDetail, title: initTitle, categoryUrl} = props
    let {category} = props
    let metaKeywords
    let metaDescription
    let additionalHeader
    let inlineScript
    let title
    if (pageType) {
      switch (pageType) {
        case 'product':
          metaKeywords = productDetail.payload ? productDetail.payload.meta_keyword : defMetaKeywords
          metaDescription = productDetail.payload ? productDetail.payload.meta_description : defMetaDescription
          title = productDetail.payload ? productDetail.payload.meta_title : defTitle
          additionalHeader = productDetail.additionalHeader ? productDetail.payload.additionalHeader : ''
          break
        case 'static':
          metaKeywords = defMetaKeywords
          metaDescription = defMetaDescription
          title = initTitle ? `${initTitle} || ${defTitle}` : defTitle
          break
        case 'category':
          let urlKey = categoryUrl.split('/')
          let rootUrlKey = ''
          let categoryNow = category
          urlKey.map((urlKeyData) => {
            urlKeyData = ((rootUrlKey === '') ? rootUrlKey : rootUrlKey + '/') + urlKeyData
            rootUrlKey = urlKeyData
            const indexCategory = categoryNow.findIndex((categoryData) => {
              return (categoryData.url_key === urlKeyData || categoryData.url_key === urlKeyData + '.html')
            })
            if (indexCategory !== -1) {
              additionalHeader = categoryNow[indexCategory].additional_header
              title = categoryNow[indexCategory].document_title
              inlineScript = categoryNow[indexCategory].inline_script
              if (categoryNow[indexCategory].children.length > 0) {
                categoryNow = categoryNow[indexCategory].children
              }
            }
          })
      }
    } else {
      title = defTitle
      metaDescription = defMetaDescription
      metaKeywords = defMetaKeywords
    }
    this.state = {
      metaKeywords,
      metaDescription,
      title,
      additionalHeader,
      inlineScript
    }
  }
  componentWillReceiveProps (newProps) {
    const {pageType, productDetail, title: newTitle, categoryUrl, category} = newProps
    let metaKeywords
    let metaDescription
    let additionalHeader
    let inlineScript
    let title
    if (pageType) {
      switch (pageType) {
        case 'product':
          metaKeywords = productDetail.payload ? productDetail.payload.meta_keyword : defMetaKeywords
          metaDescription = productDetail.payload ? productDetail.payload.meta_description : defMetaDescription
          title = productDetail.payload ? productDetail.payload.meta_title : defTitle
          break
        case 'static':
          metaKeywords = defMetaKeywords
          metaDescription = defMetaDescription
          title = newTitle ? `${newTitle} || ${defTitle}` : defTitle
          break
        case 'category':
          let urlKey = categoryUrl.split('/')
          let rootUrlKey = ''
          let categoryNow = category
          urlKey.map((urlKeyData) => {
            urlKeyData = ((rootUrlKey === '') ? rootUrlKey : rootUrlKey + '/') + urlKeyData
            rootUrlKey = urlKeyData
            const indexCategory = categoryNow.findIndex((categoryData) => {
              return (categoryData.url_key === urlKeyData || categoryData.url_key === urlKeyData + '.html')
            })
            if (indexCategory !== -1) {
              additionalHeader = categoryNow[indexCategory].additional_header
              title = categoryNow[indexCategory].name
              inlineScript = categoryNow[indexCategory].inline_script
              if (categoryNow[indexCategory].children.length > 0) {
                categoryNow = categoryNow[indexCategory].children
              }
            }
          })
      }
    } else {
      title = defTitle
      metaDescription = defMetaDescription
      metaKeywords = defMetaKeywords
    }
    this.setState({
      metaKeywords,
      metaDescription,
      title,
      inlineScript,
      additionalHeader
    })
  }
  render () {
    const {metaDescription, metaKeywords, title, additionalHeader, inlineScript} = this.state
    if (additionalHeader) {
      return (<Head>
        <title>{title}</title>
        <meta http-equiv='Content-Type' content='text/html; charset=utf-8' />
        <meta name='apple-mobile-web-app-status-bar-style' content='black' />
        <meta name='theme-color' content='#F36525' />
        <meta name='msapplication-navbutton-color' content='#F36525' />
        <meta name='msvalidate.01' content='9230D2514B0FDEC9BC3CAB2A1007608F' />
        <meta name='robots' content='INDEX,FOLLOW' />
        {additionalHeader.map((thisData, index) => {
          switch (thisData.tag) {
            case 'meta':
              return (<AssembleMeta attributes={thisData.attributes} key={index} />)
            case 'link':
              return (<AssembleLink attributes={thisData.attributes} key={index} />)
          }
        })}
        <link rel='canonical' href='https://www.ruparupa.com' />
        <link rel='dns-prefetch' href='//res.cloudinary.com' />
        <link rel='stylesheet prefetch' href='https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/css/bootstrap.min.css' />
        <link rel='stylesheet prefetch' href='https://cdnjs.cloudflare.com/ajax/libs/Swiper/3.4.1/css/swiper.min.css' />
        <link rel='stylesheet prefetch' href='https://file.myfontastic.com/CcKHnLQg2N6K9Z2gZL5Sne/icons.css' />
        <link rel='stylesheet prefetch' href='https://cdn.linearicons.com/free/1.0.0/icon-font.min.css' />
        <link rel='stylesheet prefetch' href='https://fonts.googleapis.com/css?family=Source+Sans+Pro:200,300,400,600,700,900' />
        <link rel='stylesheet prefetch' href='https://blokkfont-losgordos.netdna-ssl.com/v2/blokkfont.css' />
        <link rel='stylesheet prefetch' href='https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css' />
        <link rel='stylesheet prefetch' href={`${AppConfig.baseURL}static/css/pure-drawer.css`} />
        <link rel='stylesheet prefetch' href={`${AppConfig.baseURL}static/css/nprogress.css`} />
        <link rel='stylesheet prefetch' href={`${AppConfig.baseURL}static/css/style.css`} />
        <link rel='stylesheet prefetch' href={`${AppConfig.baseURL}static/icon/style.css`} />
        <link rel='stylesheet prefetch' href={`${AppConfig.baseURL}static/css/react-datetime.css`} />
        <script dangerouslySetInnerHTML={{__html: AppConfig.gtmScript}} />
        {inlineScript
        ? <script dangerouslySetInnerHTML={{__html: inlineScript}} />
        : null }
      </Head>)
    } else {
      return (<Head>
        <meta http-equiv='Content-Type' content='text/html; charset=utf-8' />
        <meta content='width=device-width, initial-scale=1, maximum-scale=1' name='viewport' />
        <meta name='apple-mobile-web-app-status-bar-style' content='black' />
        <meta name='theme-color' content='#F36525' />
        <meta name='msapplication-navbutton-color' content='#F36525' />
        <meta name='msvalidate.01' content='9230D2514B0FDEC9BC3CAB2A1007608F' />
        <meta name='robots' content='INDEX,FOLLOW' />
        <title>{title}</title>
        <meta name='description' content={metaDescription} />
        <meta name='keywords' content={metaKeywords} />
        {/* schema */}
        { AppConfig.schema.map((data, index) => <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{__html: data}}
          key={`schema_${index}`}
          />) }
        {/* google plus */}
        <meta itemprop='name' content='Ruparupa: Situs Belanja Online Berbagai Kebutuhan' />
        <meta itemprop='description' content={`Online Store: ACE Hardware, Informa, Toys Kingdom, etc. Jaminan 100% Produk ASLI, Garansi, Belanja Online Aman & Nyaman. Semua ada disini. Let's Get MORE!`} />
        <meta itemprop='image' content='https://blog.ruparupa.id/wp-content/uploads/2017/04/Ruparupa-Logo-Square.jpg' />
        {/* twitter */}
        <meta name='twitter:card' content='summary_large_image' />
        <meta name='twitter:site' content='@ruparupacom' />
        <meta name='twitter:title' content='Ruparupa: Situs Belanja Online Berbagai Kebutuhan' />
        <meta name='twitter:image:src' content='https://blog.ruparupa.id/wp-content/uploads/2017/04/Ruparupa-Logo-Square.jpg' />
        <meta name='twitter:description' content={`Online Store: ACE Hardware, Informa, Toys Kingdom, etc. Jaminan 100% Produk ASLI, Garansi, Belanja Online Aman & Nyaman. Semua ada disini. Let's Get MORE!`} />
        <meta name='twitter:creator' content='@ruparupacom' />
        {/* openGraph */}
        {AppConfig.openGraph.meta.map(value => <meta property={value.property} content={value.content} key={`meta_property_${value.property}`} />)}
        <link rel='canonical' href='https://www.ruparupa.com' />
        <link rel='dns-prefetch' href='//res.cloudinary.com' />
        <link rel='stylesheet prefetch' href='https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/css/bootstrap.min.css' />
        <link rel='stylesheet prefetch' href='https://cdnjs.cloudflare.com/ajax/libs/Swiper/3.4.1/css/swiper.min.css' />
        <link rel='stylesheet prefetch' href='https://file.myfontastic.com/CcKHnLQg2N6K9Z2gZL5Sne/icons.css' />
        <link rel='stylesheet prefetch' href='https://cdn.linearicons.com/free/1.0.0/icon-font.min.css' />
        <link rel='stylesheet prefetch' href='https://fonts.googleapis.com/css?family=Source+Sans+Pro:200,300,400,600,700,900' />
        <link rel='stylesheet prefetch' href='https://blokkfont-losgordos.netdna-ssl.com/v2/blokkfont.css' />
        <link rel='stylesheet prefetch' href='https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css' />
        <link rel='stylesheet prefetch' href={`${AppConfig.baseURL}static/css/pure-drawer.css`} />
        <link rel='stylesheet prefetch' href={`${AppConfig.baseURL}static/css/nprogress.css`} />
        <link rel='stylesheet prefetch' href={`${AppConfig.baseURL}static/css/style.css`} />
        <link rel='stylesheet prefetch' href={`${AppConfig.baseURL}static/icon/style.css`} />
        <link rel='stylesheet prefetch' href={`${AppConfig.baseURL}static/css/react-datetime.css`} />
        <script dangerouslySetInnerHTML={{__html: AppConfig.gtmScript}} />
        {inlineScript
        ? <script dangerouslySetInnerHTML={{__html: inlineScript}} />
        : null }
      </Head>)
    }
  }
}
const stateToProps = (state) => ({
  productDetail: state.productDetail,
  category: state.category.payload || []
})
export default connect(stateToProps)(HeadContainer)
