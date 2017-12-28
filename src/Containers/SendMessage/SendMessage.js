// @flow
import React from 'react'
import { connect } from 'react-redux'
import NProgress from 'nprogress'
import Router from 'next/router'
// components
import Notification from '../../Components/Notification'
import MyImage from '../../Components/MyImage'
// actions
import * as messageAction from '../../actions/message'
import * as transactionAction from '../../actions/transaction'

class SendMessage extends React.Component {
  constructor (props) {
    super(props)
    // let messages = `INVOICE: ${props.newOrderDetail.orderDetail.invoice.invoice_number}`
    // let content = `${messages.substring(0, 20)} ...`
    this.state = {
      id: props.query.id || null,
      msgTo: props.query.msgTo || null,
      proccessOrder: props.query.proccessOrder || null,
      data: props.newOrderDetail || null,
      form: {
        subject: '',
        content: ''
      },
      notification: {
        type: 'is-success',
        status: false,
        message: 'Error, default message.'
      },
      validation: false
    }
    this.submitting = false
    this.fetching = { newOrderDetail: false, processingOrderDetail: false, saleDetail: false }
  }

  handleInput (e) {
    const { value, name } = e.target
    const { form } = this.state
    const newState = { form }
    newState.form[name] = value
    this.setState(newState)
  }

  renderValidation (name, textFailed) {
    const { form } = this.state
    let titleValid = name === 'subject' && form.subject !== ''
    let messageValid = name === 'content' && form.content !== ''
    let result = titleValid || messageValid
    return (
      <span className='error-msg'>
        {result ? '' : textFailed}
      </span>
    )
  }

  submit () {
    const { form, id, msgTo } = this.state
    let titleValid = form.subject !== ''
    let messageValid = form.content !== ''
    let isValid = titleValid && messageValid
    if (isValid) {
      this.submitting = true
      if (msgTo === 'buyer') {
        this.props.messageBuyer({ id, subject: form.subject, content: form.content })
      }
      if (msgTo === 'seller') {
        this.props.messageSeller({ id, subject: form.subject, content: form.content })
      }
      if (msgTo === 'reseller') {
        this.props.messageReseller({ id, subject: form.subject, content: form.content })
      }
    } else {
      this.setState({ validation: true })
    }
  }

  componentDidMount () {
    const { id, proccessOrder } = this.state
    if (id) {
      NProgress.start()
      if (proccessOrder === 'newOrder') {
        this.fetching = { ...this.fetching, newOrderDetail: true }
        this.props.getNewOrderDetail({ id })
      }
      if (proccessOrder === 'processingOrder') {
        this.fetching = { ...this.fetching, processingOrderDetail: true }
        this.props.getProcessingOrderDetail({ id })
      }
      if (proccessOrder === 'sale') {
        this.fetching = { ...this.fetching, saleDetail: true }
        this.props.getSaleDetail({ id })
      }
    }
  }

  componentWillReceiveProps (nextProps) {
    const { newOrderDetail, processingOrderDetail, saleDetail, transactionMessage } = nextProps
    const { isFetching, isFound, isError, notifError, notifSuccess } = this.props
    if (!isFetching(newOrderDetail) && this.fetching.newOrderDetail) {
      NProgress.done()
      this.fetching = { ...this.fetching, newOrderDetail: false }
      if (isFound(newOrderDetail)) {
        this.setState({ data: newOrderDetail })
      }
      if (isError(newOrderDetail)) {
        this.setState({ notification: notifError(newOrderDetail.message) })
      }
    }
    if (!isFetching(processingOrderDetail) && this.fetching.processingOrderDetail) {
      NProgress.done()
      this.fetching = { ...this.fetching, processingOrderDetail: false }
      if (isFound(processingOrderDetail)) {
        this.setState({ data: processingOrderDetail })
      }
      if (isError(processingOrderDetail)) {
        this.setState({ notification: notifError(newOrderDetail.message) })
      }
    }
    if (!isFetching(saleDetail) && this.fetching.saleDetail) {
      NProgress.done()
      this.fetching = { ...this.fetching, saleDetail: false }
      if (isFound(saleDetail)) {
        const { sale } = saleDetail
        const data = { orderDetail: sale, ...saleDetail }
        this.setState({ data })
      }
      if (isError(saleDetail)) {
        this.setState({ notification: notifError(saleDetail.message) })
      }
    }
    if (!isFetching(transactionMessage) && this.submitting) {
      this.submitting = false
      if (isFound(transactionMessage)) {
        this.setState({ notification: notifSuccess('Berhasil mengirim Pesan') })
        if (this.timeout) clearTimeout(this.timeout)
        this.timeout = setTimeout(() => {
          Router.back()
        }, 3000)
      }
      if (isError(transactionMessage)) {
        this.setState({ notification: notifError('Gagal mengirim Pesan') })
      }
    }
  }

  render () {
    const { data, form, validation, msgTo, notification } = this.state
    let photo
    let nameType
    let typeInvoice
    if (data.isFound) {
      if (msgTo === 'buyer') {
        photo = data.orderDetail.buyer.photo
        nameType = data.orderDetail.buyer.name
        typeInvoice = 'Pembeli'
      }
      if (msgTo === 'seller') {
        photo = data.orderDetail.seller.photo
        nameType = data.orderDetail.seller.name
        typeInvoice = 'Seller'
      }
      if (msgTo === 'reseller') {
        photo = data.orderDetail.reseller.store.logo
        nameType = data.orderDetail.reseller.store.name
        typeInvoice = 'Reseller'
      }
    }
    return (
      <section className='section is-paddingless bg-white'>
        <Notification
          type={notification.type}
          isShow={notification.status}
          activeClose
          onClose={() => this.setState({notification: {status: false, message: ''}})}
          message={notification.message} />
        {
          this.props.isFound(data) && <div>
            <div className='profile-wrapp border-bottom'>
              <ul>
                <li>
                  <div className='box is-paddingless'>
                    <article className='media'>
                      <div className='media-left'>
                        <figure className='image user-pict'>
                          <MyImage src={photo} alt='pict' />
                        </figure>
                      </div>
                      <div className='media-content'>
                        <div className='content reseller'>
                          <p className='products-name'>
                            <strong>{ nameType }</strong>
                            <br />
                            <span>{ typeInvoice }</span>
                          </p>
                        </div>
                      </div>
                    </article>
                  </div>
                </li>
              </ul>
            </div>
            <div className='add-discussion'>
              <div className='field'>
                <label>Judul Pesan</label>
                <p className={`control ${validation && 'is-error'}`}>
                  <input type='text' className='input' name='subject' value={form.subject} onChange={(e) => this.handleInput(e)} />
                  {validation && this.renderValidation('subject', 'Mohon isi judul')}
                </p>
              </div>
              <div className='field'>
                <label>Pesan Anda</label>
                <p className={`control ${validation && 'is-error'}`}>
                  <textarea className='textarea text-discus' rows='3' name='content' value={form.content} onChange={(e) => this.handleInput(e)} />
                  {validation && this.renderValidation('content', 'Mohon isi pesan')}
                </p>
                <p className='control'>
                  <button className={`button is-primary is-large is-fullwidth ${this.submitting && 'is-loading'}`} onClick={() => this.submit()}>Kirim Pesan</button>
                </p>
              </div>
            </div>
          </div>
        }
      </section>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    newOrderDetail: state.newOrderDetail,
    processingOrderDetail: state.processingOrderDetail,
    saleDetail: state.saleDetail,
    transactionMessage: state.transactionMessage
  }
}

const mapDispatchToProps = dispatch => ({
  getNewOrderDetail: (params) => dispatch(transactionAction.getNewOrderDetail(params)),
  getProcessingOrderDetail: (params) => dispatch(transactionAction.getProcessingOrderDetail(params)),
  getSaleDetail: (params) => dispatch(transactionAction.getSaleDetail(params)),
  messageBuyer: (params) => dispatch(messageAction.messageBuyer(params)),
  messageSeller: (params) => dispatch(messageAction.messageSeller(params)),
  messageReseller: (params) => dispatch(messageAction.messageReseller(params))
})

export default connect(mapStateToProps, mapDispatchToProps)(SendMessage)
