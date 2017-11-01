// @flow
import React from 'react'
import { connect } from 'react-redux'
import NProgress from 'nprogress'
import _ from 'lodash'
import Router from 'next/router'
// components
import Notification from '../../Components/Notification'
import MyImage from '../../Components/MyImage'
// actions
import * as storesActions from '../../actions/stores'
import * as productActions from '../../actions/product'

class ProductExpeditionManage extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      id: props.query.id || null,
      storeProductDetail: props.storeProductDetail || null,
      expeditions: props.expeditions,
      selectedExpeditions: [],
      selectedServices: [],
      submiting: false,
      notification: {
        status: false,
        type: 'is-success',
        message: 'Error, default message.'
      }
    }
    this.fetchingFirst = false
  }

  handleSelectedExpeditions (e, id, expeditionId, getServicesId) {
    e.preventDefault()
    const { selectedServices, selectedExpeditions } = this.state
    let newExpeditions
    if (selectedServices.includes(id)) {
      let filterId = selectedServices.filter(val => val !== id)
      newExpeditions = [...filterId]
    } else {
      newExpeditions = [...selectedServices, id]
    }
    this.setState({ selectedServices: newExpeditions }, () => {
      if (this.state.selectedServices.indexOf(id) !== -1) {
        let isSame = _.difference(getServicesId, this.state.selectedServices).length === 0
        if (isSame) {
          let newExpeditions = [...selectedExpeditions, expeditionId]
          this.setState({ selectedExpeditions: newExpeditions })
        }
      } else {
        let filterId = selectedExpeditions.filter(val => val !== expeditionId)
        this.setState({ selectedExpeditions: filterId })
      }
    })
  }

  handleSelectAll (e, expedition) {
    e.preventDefault()
    const { selectedServices, selectedExpeditions } = this.state
    let newExpeditions
    if (selectedExpeditions.includes(expedition.id)) {
      let filterId = selectedExpeditions.filter(val => val !== expedition.id)
      newExpeditions = [...filterId]
      this.setState({ selectedExpeditions: newExpeditions })
      // remove selectedServices
      const AllServicesId = expedition.services.map((service) => service.id)
      const compareId = selectedServices.filter(val => !AllServicesId.includes(val))
      this.setState({ selectedServices: compareId })
    } else {
      newExpeditions = [...selectedExpeditions, expedition.id]
      this.setState({ selectedExpeditions: newExpeditions })
      // adding selectedServices
      const AllServicesId = expedition.services.map((service) => service.id)
      const compareId = AllServicesId.concat(selectedServices.filter(val => AllServicesId.indexOf(val) < 0))
      this.setState({ selectedServices: compareId })
    }
  }

  updateProductExpedition (e) {
    e.preventDefault()
    const { expeditions, selectedServices, notification, id } = this.state
    if (selectedServices.length !== 0) {
      this.setState({ submiting: true }, () => {
        if (this.state.submiting) {
          const dataServices = []
          expeditions.expeditions.map(expedition => {
            return expedition.services.map(service => {
              return dataServices.push(service.id)
            })
          })
          let newExpedition = []
          dataServices.map(idService => {
            let isSelected = selectedServices.filter((Id) => {
              return Id === idService
            }).length > 0
            let statusSelected = isSelected ? 1 : 2
            newExpedition.push({expedition_service_id: idService, status: statusSelected})
          })
          this.props.updateProduct({ expeditions: newExpedition, id: id.split('.')[0] })
        }
      })
    } else {
      const newNotif = { notification }
      newNotif.notification['status'] = true
      newNotif.notification['message'] = 'Ekspedisi pengiriman harus di isi !'
      newNotif.notification['type'] = 'is-danger'
      this.setState(newNotif)
    }
  }

  async componentDidMount () {
    const { expeditions, id } = this.state
    if (!expeditions.isFound) {
      NProgress.start()
      this.props.storeExpeditionList()
    }
    if (id) {
      NProgress.start()
      this.fetchingFirst = true
      await this.props.getStoreProductDetail({ id })
    }
  }

  async componentWillReceiveProps (nextProps) {
    const { selectedServices, submiting } = this.state
    const { expeditions, storeProductDetail, alterProducts } = nextProps
    const { isFetching, isFound, isError, notifError, notifSuccess } = this.props
    if (!isFetching(expeditions)) {
      NProgress.done()
      if (isFound(expeditions)) {
        this.setState({ expeditions: expeditions })
      }
      if (isError(expeditions)) {
        this.setState({ notification: notifError(expeditions.message) })
      }
    }
    if (!isFetching(storeProductDetail) && this.fetchingFirst) {
      this.fetchingFirst = false
      NProgress.done()
      if (isFound(storeProductDetail)) {
        let serviceId = []
        nextProps.storeProductDetail.storeProductDetail.expedition_services.map(exp => {
          return serviceId.push(exp.id)
        })
        const newService = { selectedServices, storeProductDetail: storeProductDetail }
        newService.selectedServices = serviceId
        this.setState(newService)
      }
      if (isError(storeProductDetail)) {
        this.setState({ notification: notifError(storeProductDetail.message) })
      }
    }

    if (!isFetching(alterProducts) && submiting) {
      this.setState({ submiting: false })
      if (isFound(alterProducts)) {
        this.setState({ notification: notifSuccess(alterProducts.message) })
        if (this.timeout) clearTimeout(this.timeout)
        this.timeout = setTimeout(() => {
          Router.back()
        }, 1000)
      }
      if (isError(alterProducts)) {
        this.setState({ notification: notifError(alterProducts.message) })
      }
    }
  }

  renderProductDetail () {
    const { storeProductDetail } = this.state
    if (storeProductDetail.isFound) {
      return (
        <li>
          <div className='box is-paddingless'>
            <article className='media'>
              <div className='media-left is-bordered'>
                <figure className='image'>
                  <MyImage src={storeProductDetail.storeProductDetail.images[0].file} alt='pict' />
                </figure>
              </div>
              <div className='media-content middle'>
                <div className='content'>
                  <p className='products-name'>
                    <strong>{storeProductDetail.storeProductDetail.product.name}</strong>
                  </p>
                </div>
              </div>
            </article>
          </div>
        </li>
      )
    } else {
      return (
        <p style={{textAlign: 'center', paddingTop: '20px'}}>Product Tidak ada</p>
      )
    }
  }

  render () {
    const { expeditions, selectedServices, selectedExpeditions, notification, submiting } = this.state
    return (
      <div>
        <Notification
          type={notification.type}
          isShow={notification.status}
          activeClose
          onClose={() => this.setState({notification: {status: false, message: ''}})}
          message={notification.message} />
        <section className='section is-paddingless has-shadow'>
          <div className='profile-content rating'>
            <div className='profile-wrapp is-paddingless'>
              <ul className='detail-seller left-margin'>
                {this.renderProductDetail()}
              </ul>
            </div>
          </div>
          <div className='note'>
            Pilihlah ekspedisi pengiriman yang digunakan oleh toko Anda untuk mengirim barang
          </div>
        </section>
        { expeditions.expeditions.map((expedition, index) => {
          let isSelectedExpedition = selectedExpeditions.filter((id) => {
            return id === expedition.id
          }).length > 0
          let getServicesId = expedition.services.map(service => service.id)
          return (
            <section className='section is-paddingless' key={expedition.id}>
              <div className='filter-option active'>
                <div className='sort-list check-all top'>
                  <label
                    className='checkbox'
                    onClick={(e) => this.handleSelectAll(e, expedition)}>
                    <span className={`sort-text ${isSelectedExpedition && 'active'}`}>Pilih Semua</span>
                    <span className={`input-wrapper ${isSelectedExpedition && 'checked'}`} >
                      <input type='checkbox' id='diskon' />
                    </span>
                  </label>
                  <div className='eks-name'>
                    <span>{expedition.name}</span>
                    <span><img src={expedition.logo} alt={expedition.name} /></span>
                  </div>
                </div>

                <div className='sort-list check-list left'>
                  { expedition.services.map((service) => {
                    let isSelected = selectedServices.filter((id) => {
                      return id === service.id
                    }).length > 0
                    return (
                      <label
                        className='checkbox'
                        key={service.id}
                        onClick={(e) => this.handleSelectedExpeditions(e, service.id, expedition.id, getServicesId)}>
                        <span className={`sort-text ${isSelected && 'active'}`}>{service.name}</span>
                        <span className={`input-wrapper ${isSelected && 'checked'}`} >
                          <input type='checkbox' />
                        </span>
                      </label>
                    )
                  })}
                </div>
              </div>
            </section>
          )
        })}
        <section className='section is-paddingless'>
          <div className='payment-detail action'>
            <ul>
              <li>
                <button
                  className={`button is-primary is-large is-fullwidth ${submiting ? 'is-loading' : ''}`}
                  onClick={(e) => this.updateProductExpedition(e)} >
                  Simpan Perubahan
                </button>
              </li>
            </ul>
          </div>
        </section>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    expeditions: state.expeditionListStore,
    storeProductDetail: state.storeProductDetail,
    alterProducts: state.alterProducts
  }
}

const mapDispatchToProps = dispatch => ({
  storeExpeditionList: () => dispatch(storesActions.storeExpeditionList()),
  getStoreProductDetail: (params) => dispatch(storesActions.getStoreProductDetail(params)),
  updateProduct: (params) => dispatch(productActions.updateProduct(params))
})

export default connect(mapStateToProps, mapDispatchToProps)(ProductExpeditionManage)
