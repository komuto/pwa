import React, { Component } from 'react'
import { connect } from 'react-redux'
import NProgress from 'nprogress'
import Router from 'next/router'
// components
import Section from '../Components/Section'
import Content from '../Components/Content'
import MyImage from '../Components/MyImage'
// actions
import * as productActions from '../actions/product'
// services
import { Status } from '../Services/Status'
// lib
import RupiahFormat from '../Lib/RupiahFormat'

class DiscussionNew extends Component {
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

  componentWillReceiveProps (nextProps) {
    const { productDetail, newDiscussion } = nextProps
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

    if (!newDiscussion.isLoading) {
      (newDiscussion.status) ? this.setState({ newDiscussion }) : this.setState({ notification: {status: true, message: productDetail.message} })
    }
  }

  questionOnChange (e) {
    let value = e.target.value.replace(/[^a-zA-Z0-9 ]/g, '')
    this.setState({ question: { ...this.state.question, error: false, value } })
  }

  async submitQuestion () {
    const { id, question } = this.state
    if (question.value === '') {
      this.setState({ question: { ...this.state.question, error: true, errorMessage: 'Silahkan isi pertanyaan anda!' } })
    } else {
      NProgress.start()
      await this.props.dispatch(productActions.newDiscussion({ id, question: question.value }))
      Router.back()
    }
  }

  render () {
    const { productDetail, question } = this.state
    const { product, images } = productDetail.detail
    const styleError = {
      color: 'red',
      borderColor: 'red'
    }

    if (!productDetail.isFound) return null
    return (
      <Content>
        <Section>
          <div className='discuss gap'>
            <ul className='product-discuss'>
              <li>
                <div className='box is-paddingless'>
                  <article className='media'>
                    <div className='media-left'>
                      <figure className='image product-pict' style={{ width: 40 }}>
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

            <div className='add-discussion'>
              <div className='field'>
                <label style={question.error ? styleError : {}}> {question.error ? question.errorMessage : 'Pertanyaan Anda'} </label>
                <p className='control'>
                  <textarea style={question.error ? styleError : {}} onChange={(e) => this.questionOnChange(e)} value={question.value} className='textarea text-discus' placeholder='Tulis Pertanyaan' rows='1' />
                </p>
                <p className='control'>
                  <button
                    className='button is-primary is-large is-fullwidth'
                    onClick={() => this.submitQuestion()}>Kirimkan Pertanyaan</button>
                </p>
              </div>
            </div>

          </div>
        </Section>
      </Content>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    productDetail: state.productDetail,
    newDiscussion: state.newDiscussion
  }
}

export default connect(mapStateToProps)(DiscussionNew)
