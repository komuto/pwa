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
      type: props.query.type || null,
      newOrderDetail: props.newOrderDetail,
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
  }

  handleInput (e) {
    const { value, name } = e.target
    const { form } = this.state
    const newState = { form }
    newState.form[name] = value
    this.setState(newState)
  }

  componentDidMount () {
    const { id } = this.state
    if (id) {
      NProgress.start()
      this.props.getNewOrderDetail({ id })
      // if (type === 'buyer') {
      // }
      // if (type === 'seller') {
      //   this.props.getProcessingOrderDetail({ id })
      // }
      // if (type === 'reseller') {
      //   this.props.getSaleDetail({ id })
      // }
    }
  }

  photoType (type, newOrderDetail) {
    let photo
    if (type === 'buyer') {
      photo = newOrderDetail.orderDetail.buyer.photo
    }
    if (type === 'seller') {
      photo = newOrderDetail.orderDetail.seller.photo
    }
    if (type === 'reseller') {
      photo = newOrderDetail.orderDetail.reseller.store.logo
    }
    return photo
  }

  nameType (type, newOrderDetail) {
    let nameType
    if (type === 'buyer') {
      nameType = newOrderDetail.orderDetail.buyer.name
    }
    if (type === 'seller') {
      nameType = newOrderDetail.orderDetail.seller.name
    }
    if (type === 'reseller') {
      nameType = newOrderDetail.orderDetail.reseller.store.name
    }
    return nameType
  }

  typeInvoice (type) {
    let typeInvoice
    if (type === 'buyer') {
      typeInvoice = 'Pembeli'
    }
    if (type === 'seller') {
      typeInvoice = 'Seller'
    }
    if (type === 'reseller') {
      typeInvoice = 'Reseller'
    }
    return typeInvoice
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
    const { form, type, id } = this.state
    let titleValid = form.subject !== ''
    let messageValid = form.content !== ''
    let isValid = titleValid && messageValid
    if (isValid) {
      this.submitting = true
      if (type === 'buyer') {
        this.props.messageBuyer({ id, subject: form.subject, content: form.content })
      }
      if (type === 'seller') {
        this.props.messageSeller({ id, subject: form.subject, content: form.content })
      }
      if (type === 'reseller') {
        this.props.messageReseller({ id, subject: form.subject, content: form.content })
      }
    } else {
      this.setState({ validation: true })
    }
  }

  componentWillReceiveProps (nextProps) {
    const { newOrderDetail, transactionMessage } = nextProps
    const { isFetching, isFound, isError, notifError, notifSuccess } = this.props
    if (!isFetching(newOrderDetail)) {
      NProgress.done()
      if (isFound(newOrderDetail)) {
        this.setState({ newOrderDetail })
      }
      if (isError(newOrderDetail)) {
        this.setState({ notification: notifError(newOrderDetail.message) })
      }
    }
    if (!isFetching(transactionMessage) && this.submitting) {
      this.submitting = false
      if (isFound(transactionMessage)) {
        this.setState({ notification: notifSuccess(transactionMessage.message) })
        if (this.timeout) clearTimeout(this.timeout)
        this.timeout = setTimeout(() => {
          Router.back()
        }, 3000)
      }
      if (isError(transactionMessage)) {
        this.submitting = false
        this.setState({ notification: notifError(transactionMessage.message) })
      }
    }
  }

  render () {
    const { newOrderDetail, type, form, validation, notification } = this.state
    return (
      <section className='section is-paddingless bg-white'>
        <Notification
          type={notification.type}
          isShow={notification.status}
          activeClose
          onClose={() => this.setState({notification: {status: false, message: ''}})}
          message={notification.message} />
        {
          this.props.isFound(newOrderDetail) && <div>
            <div className='profile-wrapp border-bottom'>
              <ul>
                <li>
                  <div className='box is-paddingless'>
                    <article className='media'>
                      <div className='media-left'>
                        <figure className='image user-pict'>
                          <MyImage src={this.photoType(type, newOrderDetail)} alt='pict' />
                        </figure>
                      </div>
                      <div className='media-content'>
                        <div className='content reseller'>
                          <p className='products-name'>
                            <strong>{this.nameType(type, newOrderDetail)}</strong>
                            <br />
                            <span>{this.typeInvoice(type)}</span>
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
