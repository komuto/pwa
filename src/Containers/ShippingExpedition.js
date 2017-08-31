// @flow
import React from 'react'
import { connect } from 'react-redux'
import NProgress from 'nprogress'
// components
import Router from 'next/router'
// actions
import * as actionExpeditionTypes from '../actions/expedition'
import * as actionStoreTypes from '../actions/stores'
// services
import { Status } from '../Services/Status'

class ShippingExpedition extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      manageExpeditions: props.manageExpeditions,
      expeditions: props.expeditions,
      selectedExpeditions: props.processCreateStore.expedition_services.selectedExpeditions,
      selectedServices: props.processCreateStore.expedition_services.selectedServices,
      notification: {
        status: false,
        color: 'is-success',
        message: 'Error, default message.'
      },
      setStateStart: false,
      submitting: false
    }
  }

  handleNotification (e) {
    const { notification } = this.state
    const newState = { notification }
    newState.notification['status'] = !notification.status
    this.setState(newState)
  }

  handleSelectedExpeditions (e, id) {
    e.preventDefault()
    const { selectedServices } = this.state
    let newExpeditions
    if (selectedServices.includes(id)) {
      let filterId = selectedServices.filter(val => val !== id)
      newExpeditions = [...filterId]
    } else {
      newExpeditions = [...selectedServices, id]
    }
    this.setState({selectedServices: newExpeditions})
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
    const { expeditions, selectedServices, selectedExpeditions, notification } = this.state
    const { postExpedition, updateExpedition, query } = this.props
    const isSetting = this.props.hasOwnProperty('query') && query.type === 'settingStore'
    const tempExpeditionServices = {
      selectedExpeditions: selectedExpeditions,
      selectedServices: selectedServices
    }
    if (selectedServices.length !== 0) {
      this.setState({ submitting: true }, () => {
        if (this.state.submitting) {
          if (isSetting) {
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
            postExpedition({ expedition_services: tempExpeditionServices })
          }
        }
      })
    } else {
      const newNotif = { notification }
      newNotif.notification['status'] = true
      newNotif.notification['message'] = 'Ekspedisi pengiriman harus di isi !'
      newNotif.notification['color'] = 'is-danger'
      this.setState(newNotif)
    }
  }

  handleButton () {
    const { submitting } = this.state
    const { query } = this.props
    const isSetting = this.props.hasOwnProperty('query') && query.type === 'settingStore'
    return (
      <button
        className={`button is-primary is-large is-fullwidth ${submitting ? 'is-loading' : ''}`}
        onClick={(e) => this.submitExpedition(e)} >
        { isSetting ? 'Simpan Perubahan' : 'Lanjutkan'}
      </button>
    )
  }

  componentDidMount () {
    const { expeditions, manageExpeditions, selectedServices } = this.state
    const { getExpedition, query, manageStoreExpeditions } = this.props
    if (expeditions.expeditions.length === 0) {
      getExpedition()
    }
    if (this.props.hasOwnProperty('query') && query.type === 'settingStore') {
      if (!manageExpeditions.isFound) {
        this.setState({ setStateStart: true })
        manageStoreExpeditions()
      } else {
        let serviceId = []
        manageExpeditions.manageExpeditions.map(exp => {
          return exp.services.map(service => {
            serviceId.push(service.id)
          })
        })
        const newService = { selectedServices }
        newService.selectedServices = serviceId
        this.setState(newService)
      }
    }
    NProgress.done()
  }

  componentWillReceiveProps (nextProps) {
    const { submitting, setStateStart, notification, selectedServices } = this.state
    const { processCreateStore, expeditions, manageExpeditions, statusUpdateExpedition } = nextProps
    if (!expeditions.isLoading && expeditions.isFound) {
      this.setState({ expeditions: expeditions })
      // selectedExpeditions: processCreateStore.expedition_services.selectedExpeditions, selectedServices: processCreateStore.expedition_services.selectedServices
    }
    if (processCreateStore.expedition_services.selectedServices.length !== 0 && submitting) {
      this.setState({ submitting: false })
      Router.push('/owner-information')
    }
    if (!manageExpeditions.isLoading && manageExpeditions.isFound && setStateStart) {
      let serviceId = []
      manageExpeditions.manageExpeditions.map(exp => {
        return exp.services.map(service => {
          serviceId.push(service.id)
        })
      })
      const newService = { selectedServices, setStateStart: false }
      newService.selectedServices = serviceId
      this.setState(newService)
    }
    if (!statusUpdateExpedition.isLoading && statusUpdateExpedition.isFound && submitting) {
      switch (statusUpdateExpedition.status) {
        case Status.SUCCESS: {
          this.props.manageStoreExpeditions()
          const newNotification = { notification, submitting: false }
          newNotification.notification['status'] = true
          newNotification.notification['message'] = statusUpdateExpedition.message
          newNotification.notification['color'] = 'is-success'
          this.setState(newNotification)
          break
        }
        case Status.OFFLINE :
        case Status.FAILED : {
          const newNotif = { notification, submitting: false }
          newNotif.notification['status'] = true
          newNotif.notification['message'] = statusUpdateExpedition.message
          newNotif.notification['color'] = 'is-danger'
          this.setState(newNotif)
          break
        }
        default:
          break
      }
      this.setState({ notification })
    }
  }

  render () {
    const { expeditions, selectedServices, selectedExpeditions, notification } = this.state
    return (
      <div>
        <div
          className={`notification ${notification.status && notification.color}`}
          style={{display: notification.status ? 'block' : 'none'}}>
          <button className='delete' onClick={(e) => this.handleNotification(e)} />
          {notification.message}
        </div>
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
                        onClick={(e) => this.handleSelectedExpeditions(e, service.id)}>
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
