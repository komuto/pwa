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
// lib
import RupiahFormat from '../Lib/RupiahFormat'
// themes
import Images from '../Themes/Images'
import RegexNormal from '../Lib/RegexNormal'

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
    this.submitting = {
      productDetail: false
    }
  }

  componentDidMount () {
    const { id } = this.state
    NProgress.start()
    this.submitting = { ...this.submitting, productDetail: true }
    this.props.dispatch(productActions.getProduct({ id }))
  }

  reportSelected (selected) {
    this.setState({ report: { ...this.state.report, selected } })
  }

  descriptionOnChange (e) {
    let value = RegexNormal(e.target.value)
    this.setState({ report: { ...this.state.report, description: {error: false, value, errorMessage: ''} } })
  }

  submitReport () {
    const { id, report } = this.state
    if (report.description.value === '') {
      this.setState({ report: { ...this.state.report, description: {value: '', error: true, errorMessage: 'Silahkan isi deskripsi laporan anda!'} } })
    } else {
      this.submitting = { ...this.submitting, report: true }
      this.props.reportProduct({
        id,
        report_type: _.indexOf(report.options, report.selected) + 1,
        description: report.description.value
      })
    }
  }

  componentWillReceiveProps (nextProps) {
    const { productDetail, report } = nextProps
    const { isFetching, isFound, isError, notifError } = this.props

    if (!isFetching(productDetail) && this.submitting.productDetail) {
      NProgress.done()
      this.submitting = { ...this.submitting, productDetail: false }
      if (isError(productDetail)) {
        this.setState({notification: notifError(productDetail.message)})
      }
      if (isFound(productDetail)) {
        this.setState({ productDetail })
      }
    }

    if (!isFetching(report) && this.submitting.report) {
      this.submitting = { ...this.submitting, report: false }
      if (isError(report)) {
        this.setState({ notification: notifError(report.message) })
      }
      if (isFound(report)) {
        this.setState({ notifReport: true })
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
                        {/* <figure className='image product-pict' style={{ width: 40, height: 40 }}> */}
                        <figure className='image product-pict'>
                          <MyImage src={images[0].file} alt={product.name} />
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
                  <button onClick={() => !this.submitting.report && this.submitReport()} className={`button is-primary is-large is-fullwidth js-sort ${this.submitting.report && 'is-loading'}`}>Kirimkan Lapporan</button>
                </p>
              </div>
            </div>
            </section>
        }
        <div className='sort-option' style={{ display: notifReport && 'block' }}>
          <div className='notif-report'>
            <MyImage src={Images.phoneAccount} alt='phoneAccount' />
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

const mapStateToProps = (state) => ({
  productDetail: state.productDetail,
  report: state.report
})

const mapDispatchToProps = (dispatch) => ({
  reportProduct: (params) => dispatch(productActions.reportProduct(params))
})

export default connect(mapStateToProps, mapDispatchToProps)(Report)
