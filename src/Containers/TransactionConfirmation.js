import React, { Component } from 'react'
import { connect } from 'react-redux'
import NProgress from 'nprogress'
import moment from 'moment'
import Router from 'next/router'
import winurl from 'winurl'
import FormData from 'form-data'
// actions
import * as transactionActions from '../actions/transaction'
import * as reviewActions from '../actions/review'
import * as storesActions from '../actions/stores'
// components
import Content from '../Components/Content'
import Notification from '../Components/Notification'
// services
import { Status, validateResponse, isFetching } from '../Services/Status'
import { INVOICE_TRANSACTION_CLASS, INVOICE_TRANSACTION_MESSAGE } from './TransactionDetail'
// containers
import MatchingContent from './TransactionConfirmationMContent'
import NotMatchingContent from './TransactionConfirmationNMContent'

class TransactionConfirmation extends Component {
  constructor (props) {
    super(props)
    this.state = {
      id: props.query.id || null,
      invoiceId: props.query.idInv || null,
      buyerInvoiceDetail: props.buyerInvoiceDetail || null,
      isMatching: null,
      problems: [
        {
          name: 'Barang tidak sesuai deskripsi',
          selected: false
        },
        {
          name: 'Barang rusak',
          selected: false
        },
        {
          name: 'Produk tidak lengkap',
          selected: false
        },
        {
          name: 'Kurir Pengiriman Berbeda',
          selected: false
        }
      ],
      solution: {
        selected: null,
        data: ['Refund', 'Tukar Baru']
      },
      note: {
        complaint: '',
        review: ''
      },
      images: [],
      notAcceptedFileType: [],
      notAcceptedFileSize: [],
      error: null,
      notification: {
        status: false,
        message: 'Error, default message.'
      }
    }

    this.field = {
      productProblem: 'productProblem',
      problems: 'problems',
      solution: 'solution',
      photo: 'photo',
      rating: 'rating'
    }

    this.fieldComplaint = [
      {
        name: this.field.productProblem,
        required: true,
        validate: () => { return this.validateProducts() }
      },
      {
        name: this.field.problems,
        required: true,
        validate: () => { return this.validateProblem() }
      },
      {
        name: this.field.solution,
        required: true,
        validate: () => { return this.validateSolution() }
      },
      {
        name: this.field.photo,
        required: true,
        validate: () => { return this.validatePhoto() }
      }
    ]

    this.submiting = {
      upload: false,
      complaint: false,
      review: false
    }

    moment.locale('id')
  }

  onCheckProducts (e, myItem) {
    e.preventDefault()
    let { buyerInvoiceDetail } = this.state
    buyerInvoiceDetail.invoice.items.map((item) => {
      if (myItem.id === item.id) {
        if (item.selected === undefined) {
          item.selected = true
        } else {
          let tam = item.selected
          item.selected = !tam
        }
      }
    })
    this.setState({ buyerInvoiceDetail })
  }

  onCheckProblems (e, myProblem) {
    e.preventDefault()
    let { problems } = this.state
    problems.map((p) => {
      if (p.name === myProblem.name) {
        let tam = p.selected
        p.selected = !tam
      }
    })
    this.setState({ problems })
  }

  onSelectSolution (e, selected) {
    e.preventDefault()
    this.setState({ solution: { ...this.state.solution, selected } })
  }

  onChangeNoteComplaint (e) {
    e.preventDefault()
    this.setState({ note: { ...this.state.note, complaint: e.target.value } })
  }

  triggerFileUpload () {
    this.inputElementPress.click()
  }

  onDropFile (e) {
    let files = e.target.files
    let { images, notAcceptedFileType, notAcceptedFileSize, notification } = this.state
    notification = {
      status: false,
      message: 'Error, default message.'
    }
    // Iterate over all uploaded files
    for (let i = 0; i < files.length; i++) {
      let f = files[i]
      // Check for file extension
      if (!this.hasExtension(f.name)) {
        notAcceptedFileType.push(f.name)
        notification = {
          status: true,
          message: this.props.fileTypeError + ' ' + this.props.label
        }
        this.setState({ notAcceptedFileType, notification })
        continue
      }
      // Check for file size
      if (f.size > this.props.maxFileSize) {
        notAcceptedFileSize.push(f.name)
        notification = {
          status: true,
          message: this.props.fileSizeError + ' ' + this.props.label
        }
        this.setState({ notAcceptedFileSize, notification })
        continue
      }
      f['preview'] = winurl.createObjectURL(f)
      images.push(f)
      this.setState({ images })
    }
  }

  inputElement (input) {
    this.inputElementPress = input
  }

  hasExtension (fileName) {
    return (new RegExp('(' + this.props.imgExtension.join('|').replace(/\./g, '\\.') + ')$')).test(fileName)
  }

  removeImage (picture) {
    const filteredAry = this.state.images.filter((e) => e !== picture)
    this.setState({images: filteredAry})
  }

  onSelectQualityProduct (v, myItem) {
    let { buyerInvoiceDetail } = this.state
    buyerInvoiceDetail.invoice.items.map((item) => {
      if (myItem.id === item.id) {
        item.quality = v
      }
    })
    this.setState({ buyerInvoiceDetail })
  }

  onSelectAccuracyProduct (v, myItem) {
    let { buyerInvoiceDetail } = this.state
    buyerInvoiceDetail.invoice.items.map((item) => {
      if (myItem.id === item.id) {
        item.accuracy = v
      }
    })
    this.setState({ buyerInvoiceDetail })
  }

  onChangeNoteReview (e, myItem) {
    let { buyerInvoiceDetail } = this.state
    buyerInvoiceDetail.invoice.items.map((item) => {
      if (myItem.id === item.id) {
        item.note = e.target.value
      }
    })
    this.setState({ buyerInvoiceDetail })
  }

  validateProducts () {
    return this.state.buyerInvoiceDetail.invoice.items.filter((item) => {
      return item.selected
    }).length < 1
  }

  validateProblem () {
    return this.state.problems.filter((p) => {
      return p.selected
    }).length < 1
  }

  validateSolution () {
    return this.state.solution.selected === null
  }

  validatePhoto () {
    return this.state.images < 1
  }

  async submitComplaint () {
    let error = false
    this.fieldComplaint.some((f) => {
      if (f.required && typeof f.validate === 'function') {
        if (f.validate()) {
          error = true
          this.setState({ error: f.name })
          return true
        } else {
          this.setState({ error: null })
          return false
        }
      }
    })

    if (error) return

    // define products selected
    let products = []
    this.state.buyerInvoiceDetail.invoice.items.map((item) => {
      if (item.selected) {
        products.push(item.product.id)
      }
    })

    // define problems selected
    let problems = []
    this.state.problems.map((p, index) => {
      if (p.selected) {
        problems.push(index)
      }
    })

    // define solutions selected
    let solution = 1
    this.state.solution.data.map((d, index) => {
      if (this.state.solution.selected === d) {
        solution = index
      }
    })

    // define note
    let note = this.state.note.complaint

    // define image upload
    let images = new FormData()
    this.state.images.map((image) => {
      images.append('images', image)
    })
    images.append('type', 'product')

    // define params
    this.params = {
      products,
      problems,
      solution,
      note
    }

    // run upload image
    if (images) {
      NProgress.start()
      await this.props.photoUpload(images)
    }

    NProgress.start()
    this.submiting = {
      ...this.submiting,
      upload: true
    }
  }

  submitReview () {
    let { buyerInvoiceDetail, id, invoiceId } = this.state
    let error = false
    buyerInvoiceDetail.invoice.items.some((item) => {
      if (item.quality === undefined) {
        item.error = 'quality'
        error = true
        return true
      } else if (item.accuracy === undefined) {
        item.error = 'accuracy'
        error = true
        return true
      } else if (item.note === undefined || item.note === '') {
        item.error = 'note'
        error = true
        return true
      } else {
        return false
      }
    })

    this.setState({ buyerInvoiceDetail })

    if (error) return

    let reviews = []
    buyerInvoiceDetail.invoice.items.map((item) => {
      reviews.push({
        'product_id': item.product.id,
        'review': item.note,
        'quality': item.quality,
        'accuracy': item.accuracy
      })
    })

    NProgress.start()
    this.submiting = {
      ...this.submiting,
      review: true
    }

    this.props.setAddReviews({
      transId: id,
      invoiceId,
      reviews
    })
  }

  componentDidMount () {
    const { id, invoiceId } = this.state
    NProgress.start()
    this.props.getBuyerInvoiceDetail({ id, invoiceId })
  }

  componentWillReceiveProps (nextProps) {
    const { buyerInvoiceDetail, upload, addComplaint, addReviews } = nextProps
    let { id, invoiceId } = this.state

    if (!isFetching(buyerInvoiceDetail)) {
      NProgress.done()
      this.setState({ buyerInvoiceDetail, notification: validateResponse(buyerInvoiceDetail, 'Data transaksi dengan invoice tersebut tidak ditemukan') })
    }

    if (this.submiting.upload && !upload.isLoading) {
      this.props.setAddComplaint({
        id,
        invoiceId,
        ...this.params,
        ...upload.payload
      })
      this.submiting = {
        ...this.submiting,
        upload: false,
        complaint: true
      }
    }

    if (this.submiting.complaint && !isFetching(addComplaint)) {
      NProgress.done()
      this.submiting = {
        ...this.submiting,
        complaint: false
      }
      if (addComplaint.status === Status.SUCCESS) {
        Router.push('/transaction-confirmation-complaint')
      } else {
        this.setState({ addComplaint, notification: validateResponse(addComplaint, 'Gagal melakukan komplain') })
      }
    }

    if (this.submiting.review && !isFetching(addReviews)) {
      NProgress.done()
      this.submiting = {
        ...this.submiting,
        review: false
      }
      if (addReviews.status === Status.SUCCESS) {
        Router.push('/transaction-confirmation-review')
      } else {
        this.setState({ notification: validateResponse(addReviews, 'Gagal melakukan review') })
      }
    }
  }

  render () {
    const { buyerInvoiceDetail, isMatching, notification } = this.state
    const { invoice } = buyerInvoiceDetail
    if (!buyerInvoiceDetail.isFound) return null

    return (
      <Content>
        <Notification
          type='is-danger'
          isShow={notification.status}
          activeClose
          onClose={() => this.setState({notification: {status: false, message: ''}})}
          message={notification.message} />
        <section className='section is-paddingless'>
          <div className='info-purchase'>
            <div className='detail-rate is-purchase'>
              <div className='columns total-items is-mobile is-multiline no-margin-bottom'>
                <div className='column is-half'>
                  <div className='rating-content is-left'>
                    <strong>No Invoice</strong>
                  </div>
                </div>
                <div className='column is-half'>
                  <div className='rating-content item-qty has-text-right'>
                    <span className='has-text-left'>{invoice.invoice_number}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='info-purchase'>
            <div className='detail-rate is-purchase'>
              <div className='columns total-items is-mobile is-multiline no-margin-bottom'>
                <div className='column is-half'>
                  <div className='rating-content is-left'>
                    <strong>Tanggal Transaksi</strong>
                  </div>
                </div>
                <div className='column is-half'>
                  <div className='rating-content item-qty has-text-right'>
                    <span className='has-text-left'>{moment.unix(invoice.created_at).format('Do MMMM YYYY')}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='info-purchase'>
            <div className='detail-rate is-purchase'>
              <div className='columns total-items is-mobile is-multiline no-margin-bottom'>
                <div className='column is-half'>
                  <div className='rating-content is-left'>
                    <strong>Status Barang</strong>
                  </div>
                </div>
                <div className='column is-half'>
                  <div className='rating-content item-qty has-text-right'>
                    <div className={`item-status md right ${INVOICE_TRANSACTION_CLASS[invoice.transaction_status]}`}>{INVOICE_TRANSACTION_MESSAGE[invoice.transaction_status]}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className='section is-paddingless'>
          <div className='confirm-transaction has-text-centered bg-grey'>
            <p>Apakah barang yang anda terima sesuai?</p>
            <ul className='list-inline'>
              <li onClick={() => this.setState({ isMatching: false })} className={`${isMatching !== null ? !isMatching && 'active' : ''}`}><div className='confirm-btn confirm-no'><div><span className='icon-tidak' /><span>Tidak</span></div></div></li>
              <li onClick={() => this.setState({ isMatching: true })} className={`${isMatching !== null ? isMatching && 'active' : ''}`}><div className='confirm-btn confirm-yes active'><div><span className='icon-ya' /><span>Ya</span></div></div></li>
            </ul>
          </div>
          {
            isMatching !== null
              ? isMatching
                ? <MatchingContent
                  {...buyerInvoiceDetail}
                  {...this.state}
                  submiting={this.submiting}
                  onSelectQualityProduct={(e, p) => this.onSelectQualityProduct(e, p)}
                  onSelectAccuracyProduct={(e, p) => this.onSelectAccuracyProduct(e, p)}
                  onChangeNoteReview={(e, p) => this.onChangeNoteReview(e, p)}
                  submitReview={() => this.submitReview()} />
                : <NotMatchingContent
                  {...buyerInvoiceDetail}
                  {...this.state}
                  {...this.props}
                  field={this.field}
                  submiting={this.submiting}
                  onCheckProducts={(e, p) => this.onCheckProducts(e, p)}
                  onCheckProblems={(e, p) => this.onCheckProblems(e, p)}
                  onSelectSolution={(e, p) => this.onSelectSolution(e, p)}
                  onChangeNoteComplaint={(e) => this.onChangeNoteComplaint(e)}
                  triggerFileUpload={() => this.triggerFileUpload()}
                  inputElement={(i) => this.inputElement(i)}
                  onDropFile={(e) => this.onDropFile(e)}
                  removeImage={(p) => this.removeImage(p)}
                  submitComplaint={() => this.submitComplaint()} />
              : null
          }
        </section>
      </Content>
    )
  }
}

TransactionConfirmation.defaultProps = {
  accept: 'accept=image/*',
  withLabel: true,
  label: 'Max file size: 5mb, accepted: jpg|gif|png|JPG',
  imgExtension: ['.jpg', '.JPG', '.png'],
  maxFileSize: 5242880,
  fileSizeError: ' file size is too big',
  fileTypeError: ' is not supported file extension'
}

const mapStateToProps = (state) => ({
  buyerInvoiceDetail: state.buyerInvoiceDetail,
  addComplaint: state.addComplaint,
  addReviews: state.addReviews,
  upload: state.upload
})

const mapDispatchToProps = (dispatch) => ({
  getBuyerInvoiceDetail: (params) => dispatch(transactionActions.getBuyerInvoiceDetail(params)),
  setAddComplaint: (params) => dispatch(transactionActions.addComplaint(params)),
  setAddReviews: (params) => dispatch(reviewActions.addReviews(params)),
  photoUpload: (params) => dispatch(storesActions.photoUpload({ data: params }))
})
export default connect(mapStateToProps, mapDispatchToProps)(TransactionConfirmation)
