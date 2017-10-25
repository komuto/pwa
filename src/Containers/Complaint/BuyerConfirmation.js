/**
 * Safei Muslim
 * Yogyakarta , 24 Oktober 2017
 * PT Skyshi Digital Indonesa
 */

/** including dependencies */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import NProgress from 'nprogress'
import Router from 'next/router'
import moment from 'moment'
import winurl from 'winurl'
import FormData from 'form-data'
/** including component */
import Content from '../../Components/Content'
import Section from '../../Components/Section'
// import Notification, { FieldError } from '../../Components/Notification'
// import MyImage from '../../Components/MyImage'
// import MyRating from '../../Components/MyRating'
/** including actions */
import * as transactionActions from '../../actions/transaction'
import * as reviewActions from '../../actions/review'
import * as storesActions from '../../actions/stores'
/** including containter */
import { Item, SolutionWaiting, SolutionDone, SellerInfo } from './BuyerDetail'
import MatchingContent from '../Transaction/ConfirmationMContent'
import NotMatchingContent from '../Transaction/ConfirmationNMContent'
import { PROBLEMS, SOLUTIONS } from '../Transaction/Confirmation'

class BuyerConfirmation extends Component {
  constructor (props) {
    super(props)
    this.state = {
      id: props.query.id,
      buyerComplainedOrderDetail: props.buyerComplainedOrderDetail || null,
      isMatching: null,
      problems: [
        {
          name: PROBLEMS[0],
          selected: false
        },
        {
          name: PROBLEMS[1],
          selected: false
        },
        {
          name: PROBLEMS[2],
          selected: false
        },
        {
          name: PROBLEMS[3],
          selected: false
        }
      ],
      solution: {
        selected: null,
        data: SOLUTIONS
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
      },
      method: {
        matching: {
          onSelectQualityProduct: (e, p) => this.onSelectQualityProduct(e, p),
          onSelectAccuracyProduct: (e, p) => this.onSelectAccuracyProduct(e, p),
          onChangeNoteReview: (e, p) => this.onChangeNoteReview(e, p),
          submitReview: () => this.submitReview()
        },
        notMatching: {
          onCheckProducts: (e, p) => this.onCheckProducts(e, p),
          onCheckProblems: (e, p) => this.onCheckProblems(e, p),
          onSelectSolution: (e, p) => this.onSelectSolution(e, p),
          onChangeNoteComplaint: (e) => this.onChangeNoteComplaint(e),
          triggerFileUpload: () => this.triggerFileUpload(),
          inputElement: (i) => this.inputElement(i),
          onDropFile: (e) => this.onDropFile(e),
          removeImage: (p) => this.removeImage(p),
          submitComplaint: () => this.submitComplaint()
        }
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
      buyerComplainedOrderDetail: false,
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
    NProgress.start()
    let { id } = this.state
    this.submitting = { ...this.submitting, buyerComplainedOrderDetail: true }
    this.props.getComplainedOrderDetailBuyer({ id })
  }

  componentWillReceiveProps (nextProps) {
    const { buyerComplainedOrderDetail, upload, addComplaint } = nextProps
    const { isFetching, isError, isFound, notifError } = this.props
    /** handling state status complaint resolved true */
    if (!isFetching(buyerComplainedOrderDetail) && this.submitting.buyerComplainedOrderDetail) {
      NProgress.done()
      this.submitting = { ...this.submitting, buyerComplainedOrderDetail: false }
      if (isError(buyerComplainedOrderDetail)) {
        this.setState({ notification: notifError(buyerComplainedOrderDetail.message) })
      }
      if (isFound(buyerComplainedOrderDetail)) {
        console.log('buyerComplainedOrderDetail: ', buyerComplainedOrderDetail)
        this.setState({
          buyerComplainedOrderDetail,
          comment: {
            ...this.state.comment,
            data: [...buyerComplainedOrderDetail.orderDetail.discussions]
          }
        })
      }
    }

    /** uploading photo */
    if (!isFetching(upload) && this.submiting.upload) {
      if (isError(upload)) {
        this.setState({ notification: notifError(upload.message) })
      }
      if (isFound(upload)) {
        let { orderDetail } = buyerComplainedOrderDetail
        this.props.setAddComplaint({
          id: orderDetail.id,
          invoiceId: orderDetail.invoice.id,
          ...this.params,
          ...upload.payload
        })
        this.submiting = {
          ...this.submiting,
          upload: false,
          complaint: true
        }
      }
    }

    if (!isFetching(addComplaint) && this.submiting.complaint) {
      NProgress.done()
      this.submiting = { ...this.submiting, complaint: false }
      if (isError(addComplaint)) {
        this.setState({ notification: notifError(addComplaint.message) })
      }
      if (isFound(addComplaint)) {
        Router.push(
          '/transaction-confirmation-complaint',
          '/transaction-confirmation/complaint'
        )
      }
    }
  }
  render () {
    const { buyerComplainedOrderDetail } = this.state
    const { isFound } = this.props
    return (
      <Content>
        {
          isFound(buyerComplainedOrderDetail) &&
          <BuyerConfimationContent
            {...this.state.buyerComplainedOrderDetail}
            setMatching={(isMatching) => this.setState({ isMatching })}
            state={this.state}
            props={this.props}
            submiting={this.submiting}
            field={this.field} />
        }
      </Content>
    )
  }
}

const BuyerConfimationContent = ({ props, state, submiting, field, setMatching, orderDetail }) => {
  const { invoice } = orderDetail
  let createdAt = moment.unix(invoice.created_at).format('Do MMMM YYYY')
  let statusComplaint = orderDetail.solution !== 0
  let { isMatching } = state
  return (
    <Content>
      <Section className='has-shadow'>
        <Item title='No Invoice' data={invoice.invoice_number} type='standard' />
        <Item title='Tanggal Transaksi' data={createdAt} type='standard' />
        <Item title='Status Komplain' data={statusComplaint ? <SolutionDone /> : <SolutionWaiting />} type='status' />
        <Item title='Penjual' data={<SellerInfo {...orderDetail} />} type='custom' />
      </Section>
      <section className='section is-paddingless'>
        <div className='confirm-transaction has-text-centered bg-grey'>
          <p style={{ marginLeft: 20, marginRight: 20 }}>Apakah memiliki komplain terhadap barang yang Anda terima?</p>
          <ul className='list-inline'>
            <li onClick={() => setMatching(false)} className={`${isMatching !== null ? !isMatching && 'active' : ''}`}><div className='confirm-btn confirm-no'><div><span className='icon-tidak' /><span>Tidak</span></div></div></li>
            <li onClick={() => setMatching(true)} className={`${isMatching !== null ? isMatching && 'active' : ''}`}><div className='confirm-btn confirm-yes active'><div><span className='icon-ya' /><span>Ya</span></div></div></li>
          </ul>
        </div>
        {
          isMatching !== null
            ? isMatching
              ? <MatchingContent
                submiting={submiting}
                {...orderDetail}
                {...state}
                {...state.method.matching} />
              : <NotMatchingContent
                submiting={submiting}
                {...orderDetail}
                {...state}
                {...props}
                field={field}
                {...state.method.notMatching} />
            : null
        }
      </section>
    </Content>
  )
}

BuyerConfirmation.defaultProps = {
  accept: 'accept=image/*',
  withLabel: true,
  label: 'Max file size: 5mb, accepted: jpg|gif|png|JPG',
  imgExtension: ['.jpg', '.JPG', '.png'],
  maxFileSize: 5242880,
  fileSizeError: ' file size is too big',
  fileTypeError: ' is not supported file extension'
}

const mapStateToProps = (state) => ({
  buyerComplainedOrderDetail: state.buyerComplainedOrderDetail,
  addComplaint: state.addComplaint,
  addReviews: state.addReviews,
  upload: state.upload
})

const mapDispatchToProps = (dispatch) => ({
  getComplainedOrderDetailBuyer: (params) => dispatch(transactionActions.getComplainedOrderDetailBuyer(params)),
  setAddComplaint: (params) => dispatch(transactionActions.addComplaint(params)),
  setAddReviews: (params) => dispatch(reviewActions.addReviews(params)),
  photoUpload: (params) => dispatch(storesActions.photoUpload({ data: params }))
})

export default connect(mapStateToProps, mapDispatchToProps)(BuyerConfirmation)
