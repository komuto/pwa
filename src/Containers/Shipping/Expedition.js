// @flow
import React from 'react'
import { connect } from 'react-redux'
import NProgress from 'nprogress'
// components
import Router from 'next/router'
import Notification from '../../Components/Notification'
// actions
import * as actionExpeditionTypes from '../../actions/expedition'
import * as actionStoreTypes from '../../actions/stores'

class ShippingExpedition extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      manageExpeditions: props.manageExpeditions,
      expeditions: props.expeditions,
      selectedExpeditions: props.processCreateStore.expedition_services.selectedExpeditions,
      selectedServices: props.processCreateStore.expedition_services.selectedServices,
      notification: {
        type: 'is-success',
        status: false,
        message: 'Error, default message.'
      },
      submiting: {
        createStore: false,
        updateStore: false
      }
    }
    this.fetchingFirst = false
  }

  handleNotification (e) {
    const { notification } = this.state
    const newState = { notification }
    newState.notification['status'] = !notification.status
    this.setState(newState)
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
        let isSame = this.state.selectedServices.filter(id => getServicesId.includes(id))
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

  submitExpedition (e) {
    e.preventDefault()
    const { expeditions, selectedServices, selectedExpeditions, notification, submiting } = this.state
    const { postExpedition, updateExpedition, query } = this.props
    const isSetting = this.props.hasOwnProperty('query') && query.type === 'settingStore'
    const tempExpeditionServices = {
      selectedExpeditions: selectedExpeditions,
      selectedServices: selectedServices
    }
    if (selectedServices.length !== 0) {
      if (isSetting) {
        this.setState({ submiting: { ...submiting, updateStore: true } })
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
        updateExpedition({ data: newExpedition })
      } else {
        this.setState({ submiting: { ...submiting, createStore: true } })
        postExpedition({ expedition_services: tempExpeditionServices })
      }
    } else {
      const newNotif = { notification }
      newNotif.notification['status'] = true
      newNotif.notification['message'] = 'Ekspedisi pengiriman harus di isi !'
      newNotif.notification['type'] = 'is-danger'
      this.setState(newNotif)
    }
  }

  handleButton () {
    const { query } = this.props
    const isSetting = this.props.hasOwnProperty('query') && query.type === 'settingStore'
    return (
      <button
        className={`button is-primary is-large is-fullwidth ${this.submiting ? 'is-loading' : ''}`}
        onClick={(e) => this.submitExpedition(e)} >
        { isSetting ? 'Simpan Perubahan' : 'Lanjutkan'}
      </button>
    )
  }

  componentDidMount () {
    const { expeditions, manageExpeditions, selectedServices, selectedExpeditions } = this.state
    const { getExpedition, query, manageStoreExpeditions, isFound } = this.props
    if (!isFound(expeditions)) {
      getExpedition()
      NProgress.start()
    }
    if (this.props.hasOwnProperty('query') && query.type === 'settingStore') {
      if (!manageExpeditions.isFound) {
        this.fetchingFirst = true
        manageStoreExpeditions()
        NProgress.start()
      } else {
        let expeditionId = []
        let serviceId = []
        manageExpeditions.manageExpeditions.map(exp => {
          if (exp.is_active) {
            expeditionId.push(exp.id)
          }
          return exp.services.map(service => {
            if (service.is_checked) {
              serviceId.push(service.id)
            }
          })
        })
        const newService = { selectedServices, selectedExpeditions }
        newService.selectedServices = serviceId
        newService.selectedExpeditions = expeditionId
        this.setState(newService)
      }
    }
  }

  componentWillReceiveProps (nextProps) {
    const { selectedServices, selectedExpeditions, submiting } = this.state
    const { processCreateStore, expeditions, manageExpeditions, statusUpdateExpedition } = nextProps
    const { isFetching, isFound, isError, notifError, notifSuccess } = this.props
    if (!isFetching(expeditions)) {
      if (isFound(expeditions)) {
        this.setState({ expeditions: expeditions })
        NProgress.done()
      }
      if (isError(expeditions)) {
        this.setState({ notification: notifError(expeditions.message) })
      }
    }
    if (processCreateStore.expedition_services.selectedServices.length !== 0 && submiting.createStore) {
      this.setState({ submiting: { updateStore: false, createStore: false } })
      Router.push('/owner-information')
    }

    if (!isFetching(manageExpeditions) && this.fetchingFirst) {
      this.fetchingFirst = false
      NProgress.done()
      if (isFound(manageExpeditions)) {
        let serviceId = []
        let expeditionId = []
        manageExpeditions.manageExpeditions.map(exp => {
          if (exp.is_active) {
            expeditionId.push(exp.id)
          }
          return exp.services.map(service => {
            if (service.is_checked) {
              serviceId.push(service.id)
            }
          })
        })
        const newService = { selectedServices, selectedExpeditions }
        newService.selectedServices = serviceId
        newService.selectedExpeditions = expeditionId
        this.setState(newService)
      }
      if (isError(manageExpeditions)) {
        this.setState({ notification: notifError(manageExpeditions.message) })
      }
    }
    if (!isFetching(statusUpdateExpedition) && submiting.updateStore) {
      this.setState({ submiting: { updateStore: false, createStore: false } })
      if (isFound(statusUpdateExpedition)) {
        this.props.manageStoreExpeditions()
        this.setState({ notification: notifSuccess(statusUpdateExpedition.message) })
      }
      if (isError(statusUpdateExpedition)) {
        this.setState({ notification: notifError(statusUpdateExpedition.message) })
      }
    }
  }

  render () {
    const { expeditions, selectedServices, selectedExpeditions, notification } = this.state
    return (
      <div>
        <Notification
          type={notification.type}
          isShow={notification.status}
          activeClose
          onClose={() => this.setState({notification: {status: false, message: ''}})}
          message={notification.message} />
        <section className='section is-paddingless has-shadow'>
          <div className='seller-bar'>
            <div className='seller-step active2'>
              <div className='step1'><span>1</span></div>
              <div className='step2'><span>2</span></div>
              <div className='step3'><span>3</span></div>
              <div className='step4'><span>4</span></div>
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
                      <input type='checkbox' />
                    </span>
                  </label>
                  <div className='eks-name'>
                    <span>{expedition.name}</span>
                    <span><img src={expedition.logo} alt='' /></span>
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
                        <span className={`sort-text ${isSelected && 'active'}`}>{service.full_name}</span>
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
                {this.handleButton()}
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
    processCreateStore: state.tempCreateStore,
    expeditions: state.expeditions,
    manageExpeditions: state.manageExpeditions,
    statusUpdateExpedition: state.updateExpedition
  }
}

const mapDispatchToProps = dispatch => ({
  postExpedition: (params) => dispatch(actionStoreTypes.tempCreateStore(params)),
  getExpedition: () => dispatch(actionExpeditionTypes.getExpedition()),
  manageStoreExpeditions: () => dispatch(actionExpeditionTypes.manageStoreExpeditions()),
  updateExpedition: (params) => dispatch(actionExpeditionTypes.updateExpedition(params))
})

export default connect(mapStateToProps, mapDispatchToProps)(ShippingExpedition)
