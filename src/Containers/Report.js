import React, { Component } from 'react'
import { connect } from 'react-redux'
import NProgress from 'nprogress'
import Router from 'next/router'
import _ from 'lodash'
// components
import Content from '../Components/Content'
import Notification from '../Components/Notification'
import MyImage from '../Components/MyImage'
// actions
import * as productActions from '../actions/product'
// services
import { Status } from '../Services/Status'
// lib
import RupiahFormat from '../Lib/RupiahFormat'
// themes
import Images from '../Themes/Images'

class Report extends Component {
  constructor (props) {
    super(props)
    this.state = {
      id: props.query.id || null,
      productDetail: props.productDetail || null,
      notifReport: false,
      report: {
        options: ['Salah Kategori', 'Iklan Situs Luar', 'Pornografi', 'Pelanggaran Merk Dagang', 'Lainnya'],
        selected: 'Salah Kategori',
        description: {
          value: '',
          error: false,
          errorMessage: null
        }
      },
      notification: {
        status: false,
        message: 'Error, default message.'
      }
    }
  }

  async componentDidMount () {
    const { id, productDetail } = this.state
    if (!productDetail.isFound || (productDetail.isFound && String(productDetail.detail.product.id) !== String(id))) {
      NProgress.start()
      await this.props.dispatch(productActions.getProduct({ id }))
    }
  }

  reportSelected = (selected) => this.setState({ report: { ...this.state.report, selected } })

  descriptionOnChange (e) {
    let value = e.target.value.replace(/[^a-zA-Z0-9 ]/g, '')
    this.setState({ report: { ...this.state.report, description: {error: false, value, errorMessage: ''} } })
  }

  submitReport () {
    const { id, report } = this.state
    if (report.description.value === '') {
      this.setState({ report: { ...this.state.report, description: {value: '', error: true, errorMessage: 'Silahkan isi deskripsi laporan anda!'} } })
    } else {
      this.props.dispatch(productActions.reportProduct({ id, report_type: _.indexOf(report.options, report.selected) + 1, description: report.description.value }))
    }
  }

  componentWillReceiveProps (nextProps) {
    const { productDetail, report } = nextProps

    if (!productDetail.isLoading) {
      NProgress.done()
      switch (productDetail.status) {
        case Status.SUCCESS :
          (productDetail.isFound)
          ? this.setState({ productDetail })
          : this.setState({ notification: {status: true, message: 'Data produk tidak ditemukan'} })
          break
        case Status.OFFLINE :
        case Status.FAILED :
          this.setState({ notification: {status: true, message: productDetail.message} })
          break
        default:
          break
      }
    }

    if (!report.isLoading) {
      NProgress.done()
      switch (report.status) {
        case Status.SUCCESS :
          (report.isFound)
          ? this.setState({ notifReport: true })
          : this.setState({ notification: {status: true, message: 'Report gagal'} })
          break
        case Status.OFFLINE :
        case Status.FAILED :
          this.setState({ notification: {status: true, message: productDetail.message} })
          break
        default:
          break
      }
    }
  }

  render () {
    const { productDetail, report, notifReport, notification } = this.state
    const { product, images } = productDetail.detail
    const styleError = {
      color: 'red',
      borderColor: 'red'
    }
    return (
      <Content>
        <Notification
          type='is-danger'
          isShow={notification.status}
          activeClose
          onClose={() => this.setState({notification: {status: false, message: ''}})}
          message={notification.message} />
        {
          productDetail.isFound &&
          <section className='section is-paddingless bg-white'>
            <div className='discuss'>
              <ul className='product-discuss'>
                <li>
                  <div className='box is-paddingless'>
                    <article className='media'>
                      <div className='media-left'>
                        <figure className='image product-pict' style={{ width: 40, height: 40 }}>
                          <MyImage src={images[0].file} />
                        </figure>
                      </div>
                      <div className='media-content'>
                        <div className='content'>
                          <p className='products-name'>
                            <strong>{ product.name }</strong>
                            <br />
                              Rp { RupiahFormat(product.price) }
                          </p>
                        </div>
                      </div>
                    </article>
                  </div>
                </li>
              </ul>
            </div>
            <div className='add-discussion report'>
              <div className='field'>
                <label>Jenis Laporan</label>
                <form action='#' className='form'>
                  <div className='field'>
                    <p className='control'>
                      {
                          report.options.map((option, index) => {
                            return <label key={index} className={`radio ${report.selected === option && 'checked'}`} onClick={() => this.reportSelected(option)}>
                              <input type='radio' name='report' />
                              { option }
                            </label>
                          })
                        }
                    </p>
                  </div>
                </form>
              </div>
              <div className='field'>
                <label style={report.description.error ? styleError : {}}> { report.description.error ? report.description.errorMessage : 'Laporan Anda' }</label>
                <p className='control'>
                  <textarea style={report.description.error ? styleError : {}} onChange={(event) => this.descriptionOnChange(event)} value={report.description.value} className='textarea text-discus' placeholder='Tulis Laporan' rows='1' />
                </p>
                <p className='control'>
                  <button onClick={() => this.submitReport()} className='button is-primary is-large is-fullwidth js-sort'>Kirimkan Lapporan</button>
                </p>
              </div>
            </div>
            </section>
        }
        <div className='sort-option' style={{ display: notifReport && 'block' }}>
          <div className='notif-report'>
            <MyImage src={Images.phoneAccount} />
            <h3>Laporan Terkirim</h3>
            <p>Laporan Anda telah berhasil dikirim. Kami akan menindaklanjuti laporan Anda.</p>
            <button
              className='button is-primary is-large is-fullwidth'
              onClick={() => Router.back()}
              >Kembali ke Halaman Detail Barang</button>
          </div>
        </div>
      </Content>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    productDetail: state.productDetail,
    report: state.report
  }
}

export default connect(mapStateToProps)(Report)
