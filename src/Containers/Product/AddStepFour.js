import React, { Component } from 'react'
import { connect } from 'react-redux'
import NProgress from 'nprogress'
import FormData from 'form-data'
import Router from 'next/router'
import { animateScroll } from 'react-scroll'
// component
import Content from '../../Components/Content'
import Wizard from '../../Components/Wizard'
import Notification from '../../Components/Notification'
import MyImage from '../../Components/MyImage'
// actions
import * as productActions from '../../actions/product'
import * as storesActions from '../../actions/stores'
class ProductAddStepFour extends Component {
  constructor (props) {
    super(props)
    let { stepFour } = props.tempCreateProduct
    let expeditions = (stepFour.isFound) ? stepFour.expeditions : props.expeditions.expeditions
    this.state = {
      tempCreateProduct: props.tempCreateProduct || null,
      expeditions: {
        ...props.expeditions,
        expeditions
      },
      notification: {
        status: false,
        message: 'Error, message default'
      }
    }
    this.submitting = {
      expeditions: false,
      upload: false,
      alterProducts: false,
      setTempCreateProduct: false
    }
    this.submitting = false
    this.submitingProduct = false
  }

  /** reset scroll */
  scrollToTop () {
    animateScroll.scrollTo(0, {duration: 0})
  }

  componentDidMount () {
    this.scrollToTop()
    let { expeditions } = this.state
    if (!expeditions.isFound) {
      NProgress.start()
      this.submitting = { ...this.submitting, expeditions: true }
      this.props.getExpedition()
    }
  }

  checkAllPress (myExpedition) {
    let { expeditions } = this.state
    expeditions.expeditions.map((expedition) => {
      if (expedition.id === myExpedition.id) {
        let isChecked = !expedition.is_checked
        expedition.is_checked = isChecked
        expedition.services.map((service) => {
          service.is_checked = isChecked
        })
      }
    })
    this.setState({ expeditions })
  }

  checkItemPress (myService) {
    let { expeditions } = this.state
    expeditions.expeditions.map((expedition) => {
      (expedition.id === myService.expedition.id) &&
        expedition.services.map((service) => { if (service.id === myService.id) service.is_checked = !myService.is_checked })
    })

    let expeditionSelected = expeditions.expeditions.filter((expedition) => {
      return expedition.id === myService.expedition.id
    })[0]

    let countItems = expeditionSelected.services.length
    let countItemsChecked = expeditionSelected.services.filter((service) => {
      return service.is_checked === true
    }).length

    expeditions.expeditions.map((expedition) => { if (expedition.id === myService.expedition.id) expedition.is_checked = (countItems === countItemsChecked) })

    this.setState({ expeditions })
  }

  submit () {
    const { expeditions, tempCreateProduct } = this.state
    this.submitting = { ...this.submitting, tempCreateProduct: true }
    this.props.setTempCreateProduct({
      ...tempCreateProduct,
      stepFour: {
        ...expeditions,
        isFound: true
      }
    })
  }

  componentWillReceiveProps (nextProps) {
    const { expeditions, tempCreateProduct, alterProducts, upload } = nextProps
    const { isFetching, isFound, isError, notifError } = this.props

    if (!isFetching(expeditions) && this.submitting.expeditions) {
      NProgress.done()
      this.submitting = { ...this.submitting, expeditions: false }
      if (isError(expeditions)) {
        this.setState({ notification: notifError(expeditions.message) })
      }
      if (isFound(expeditions)) {
        this.setState({ expeditions })
      }
    }

    if (!isFetching(alterProducts) && this.submitting.alterProducts) {
      this.submitting = { ...this.submitting, alterProducts: false }
      if (isError(alterProducts)) {
        this.setState({ notification: notifError(alterProducts.message) })
      }
      if (isFound(alterProducts)) {
        Router.push('/product-add-success', '/product/add/success')
      }
    }

    if (!isFetching(upload) && this.submitting.upload) {
      NProgress.done()
      this.submitting = { ...this.submitting, upload: false }
      if (isError(upload)) {
        this.setState({ notification: notifError(upload.message) })
      }
      if (isFound(upload)) {
        /** finish uploading image */
        /** upload product with respon image */
        const { stepOne, stepTwo, stepThree, stepFour } = tempCreateProduct
        let expeditionsSelected = []
        stepFour.expeditions.map((expedition) => {
          expedition.services.map((service) => {
            service.is_checked && expeditionsSelected.push({expedition_service_id: service.id})
          })
        })
        // check when user not select brand
        if (stepTwo.brand_id === 'default') {
          delete stepTwo.brand_id
        } else {
          stepTwo.brand_id = Number(stepTwo.brand_id)
        }
        // converting to number
        stepTwo.categoryOne = Number(stepTwo.categoryOne)
        stepTwo.categoryTwo = Number(stepTwo.categoryTwo)
        stepTwo.categoryThree = Number(stepTwo.categoryThree)
        stepTwo.category_id = Number(stepTwo.category_id)
        // check when user not select catalog
        if (stepThree.catalog_id === 'default') {
          delete stepThree.catalog_id
        } else {
          stepThree.catalog_id = Number(stepThree.catalog_id)
        }
        // check when user not select discount
        if (stepThree.discount) {
          stepThree.discount = Number(stepThree.discount)
        } else {
          stepThree.discount = 0
        }
        // converting value
        stepThree.is_dropship = (stepThree.is_dropship === 'true')
        stepThree.is_insurance = (stepThree.is_insurance === 'true')
        stepThree.price = Number(stepThree.price)
        stepThree.stock = Number(stepThree.stock)
        stepThree.weight = Number(stepThree.weight)
        stepThree.condition = Number(stepThree.condition)
        // define params
        let params = {
          ...stepOne,
          ...stepTwo,
          ...stepThree,
          expeditions: [...expeditionsSelected],
          status: Number(stepThree.status),
          ...upload.payload
        }
        // start upload product
        NProgress.start()
        this.submitting = { ...this.submitting, alterProducts: true }
        this.props.createProduct(params)
        /** upload product with respon image done */
      }
    }

    if (tempCreateProduct.stepFour.isFound && this.submitting.tempCreateProduct) {
      this.submitting = { ...this.submitting, tempCreateProduct: false }
      const { stepOne, stepTwo, stepThree } = tempCreateProduct
      if (!stepOne.isFound) {
        Router.push('/product-add-step-one', '/product/add/one')
      } else if (!stepTwo.isFound) {
        Router.push('/product-add-step-two', '/product/add/two')
      } else if (!stepThree.isFound) {
        Router.push('/product-add-step-three', '/product/add/three')
      } else {
        /** uploading image */
        const images = new FormData()
        stepOne.images.map((image) => {
          images.append('images', image)
        })
        images.append('type', 'product')
        if (images) {
          NProgress.start()
          this.submitting = { ...this.submitting, upload: true }
          this.props.photoUpload(images)
        }
      }
    }
  }

  render () {
    const { expeditions, notification } = this.state
    return (
      <Content>
        <Notification
          type='is-danger'
          isShow={notification.status}
          activeClose
          onClose={() => this.setState({notification: {status: false, message: ''}})}
          message={notification.message} />
        <section className='section is-paddingless has-shadow'>
          <Wizard total={4} active={4} />
          <div className='note'>
            Pilihlah ekspedisi pengiriman yang digunakan oleh toko Anda untuk mengirim barang
          </div>
          {
            expeditions.isFound &&
            expeditions.expeditions.map((expedition) => {
              return (
                <div className='filter-option active' key={expedition.id}>
                  <div className='sort-list check-all top'>
                    <label className='checkbox'>
                      <span className='sort-text'>Pilih Semua</span>
                      <span className={`input-wrapper ${expedition.is_checked ? 'checked' : ''}`}>
                        <input type='checkbox' onClick={() => this.checkAllPress(expedition)} />
                      </span>
                    </label>
                    <div className='eks-name'>
                      <span>{expedition.name}</span>
                      <span>
                        <MyImage src={expedition.logo} alt={expedition.name} />
                      </span>
                    </div>
                  </div>
                  <div className='sort-list check-list left'>
                    {
                      expedition.services.map((service) => {
                        return (
                          <label className='checkbox' key={service.id}>
                            <span className='sort-text'>{ service.name }</span>
                            <span className={`input-wrapper ${service.is_checked ? 'checked' : ''}`}>
                              <input type='checkbox' onClick={() => this.checkItemPress(service)} />
                            </span>
                          </label>
                        )
                      })
                    }
                  </div>
                </div>
              )
            })
          }
        </section>
        <section className='section is-paddingless'>
          <div className='payment-detail action'>
            <ul>
              <li>
                <a onClick={() => !(this.submitting.upload || this.submitting.alterProducts) && this.submit()} className={`button is-primary is-large is-fullwidth ${(this.submitting.upload || this.submitting.alterProducts) && 'is-loading'}`}>Lanjutkan</a>
              </li>
            </ul>
          </div>
        </section>
      </Content>
    )
  }
}

const mapStateToProps = (state) => ({
  upload: state.upload,
  expeditions: state.expeditionListStore,
  tempCreateProduct: state.tempCreateProduct,
  alterProducts: state.alterProducts
})

const mapDispatchToProps = (dispatch) => ({
  getExpedition: () => dispatch(storesActions.storeExpeditionList()),
  setTempCreateProduct: (params) => dispatch(productActions.tempCreateProduct(params)),
  createProduct: (params) => dispatch(productActions.createProduct(params)),
  photoUpload: (params) => dispatch(storesActions.photoUpload({ data: params }))
})

export default connect(mapStateToProps, mapDispatchToProps)(ProductAddStepFour)
