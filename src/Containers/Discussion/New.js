import React, { Component } from 'react'
import { connect } from 'react-redux'
import NProgress from 'nprogress'
import Router from 'next/router'
// components
import Section from '../../Components/Section'
import Content from '../../Components/Content'
import MyImage from '../../Components/MyImage'
import Notification from '../../Components/Notification'
// actions
import * as productActions from '../../actions/product'
// lib
import RupiahFormat from '../../Lib/RupiahFormat'
import RegexNormal from '../../Lib/RegexNormal'

class New extends Component {
  constructor (props) {
    super(props)
    this.state = {
      id: props.query.id || null,
      productDetail: props.productDetail || null,
      newDiscussion: props.newDiscussion || null,
      question: {
        value: '',
        error: false,
        errorMessage: null
      },
      notification: {
        type: 'is-success',
        status: false,
        message: 'Error, default message.'
      }
    }
    this.submitting = {
      productDetail: false,
      newDiscussion: false
    }
  }

  componentDidMount () {
    this.reGetProduct()
  }

  reGetProduct () {
    const { id, productDetail } = this.state
    const { isFound } = this.props
    if (isFound(productDetail)) {
      if (String(productDetail.detail.product.id) !== String(id)) {
        this.getProduct(id)
      }
    } else {
      this.getProduct(id)
    }
  }

  getProduct (id) {
    NProgress.start()
    this.submitting = { ...this.submitting, productDetail: true }
    this.props.getProduct({ id })
  }

  componentWillReceiveProps (nextProps) {
    const { productDetail, newDiscussion } = nextProps
    const { isFetching, isError, isFound, notifError } = this.props
    if (!isFetching(productDetail) && this.submitting.productDetail) {
      this.submitting = { ...this.submitting, productDetail: false }
      NProgress.done()
      if (isError(productDetail)) {
        this.setState({ notification: notifError(productDetail.message) })
      }
      if (isFound(productDetail)) {
        this.setState({ productDetail })
      }
    }

    if (!isFetching(newDiscussion) && this.submitting.newDiscussion) {
      this.submitting = { ...this.submitting, newDiscussion: false }
      if (isError(newDiscussion)) {
        this.setState({ notification: notifError(newDiscussion.message) })
      }
      if (isFound(newDiscussion)) {
        this.setState({ newDiscussion })
        Router.back()
      }
    }
  }

  questionOnChange (e) {
    let value = RegexNormal(e.target.value)
    this.setState({ question: { ...this.state.question, error: false, value } })
  }

  submitQuestion () {
    const { id, question } = this.state
    if (question.value === '') {
      this.setState({ question: { ...this.state.question, error: true, errorMessage: 'Silahkan isi pertanyaan anda!' } })
    } else {
      this.submitting = { ...this.submitting, newDiscussion: true }
      this.props.setNewDiscussion({ id, question: question.value })
    }
  }

  render () {
    const { productDetail, question, notification } = this.state
    const { product, images } = productDetail.detail
    const styleError = {
      color: 'red',
      borderColor: 'red'
    }
    return (
      <Content>
        <Section>
          <Notification
            type={notification.type}
            isShow={notification.status}
            activeClose
            onClose={() => this.setState({notification: {status: false, message: ''}})}
            message={notification.message} />
          <div className='discuss gap'>
            <ul className='product-discuss'>
              <li>
                <div className='box is-paddingless'>
                  <article className='media'>
                    <div className='media-left'>
                      {/* <figure className='image product-pict' style={{ width: 40 }}> */}
                      <figure className='image product-pict'>
                        <MyImage src={productDetail.isFound ? images[0].file : ''} alt='product' />
                      </figure>
                    </div>
                    <div className='media-content'>
                      <div className='content'>
                        <p className='products-name'>
                          <strong>{ productDetail.isFound ? product.name : '' }</strong>
                          <br />
                          Rp { RupiahFormat(productDetail.isFound ? product.price : 0) }
                        </p>
                      </div>
                    </div>
                  </article>
                </div>
              </li>
            </ul>

            <div className='add-discussion'>
              <div className='field'>
                <label style={question.error ? styleError : {}}> {question.error ? question.errorMessage : 'Pertanyaan Anda'} </label>
                <p className='control'>
                  <textarea style={question.error ? styleError : {}} onChange={(e) => this.questionOnChange(e)} value={question.value} className='textarea text-discus' placeholder='Tulis Pertanyaan' rows='1' />
                </p>
                <p className='control'>
                  <button
                    className={`button is-primary is-large is-fullwidth ${this.submitting.newDiscussion && 'is-loading'}`}
                    onClick={() => !this.submitting.newDiscussion && this.submitQuestion()}>Kirimkan Pertanyaan</button>
                </p>
              </div>
            </div>

          </div>
        </Section>
      </Content>
    )
  }
}
const mapStateToProps = (state) => ({
  productDetail: state.productDetail,
  newDiscussion: state.newDiscussion
})

const mapDispatchToProps = (dispatch) => ({
  setNewDiscussion: (params) => dispatch(productActions.newDiscussion(params)),
  getProduct: (params) => dispatch(productActions.getProduct(params))
})

export default connect(mapStateToProps, mapDispatchToProps)(New)
