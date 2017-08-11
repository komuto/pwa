// @flow
import React from 'react'
import { connect } from 'react-redux'
// components
import Router from 'next/router'
import Notification from '../Components/Notification'
// actions
import * as actionExpeditionTypes from '../actions/expedition'
import * as actionStoreTypes from '../actions/stores'
// themes
import Images from '../Themes/Images'

class ShippingExpedition extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      expeditions: props.expeditions,
      selectedExpeditions: props.processCreateStore.expedition_services.selectedExpeditions,
      selectedServices: props.processCreateStore.expedition_services.selectedServices,
      submitting: false,
      notification: {
        status: false,
        message: 'Error, default message.'
      }
    }
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

  componentWillMount () {
    const { expeditions } = this.state
    const { getExpedition } = this.props
    if (expeditions.expeditions.length === 0) {
      getExpedition()
    }
  }

  componentWillReceiveProps (nextProps) {
    this.setState({ expeditions: nextProps.expeditions })
    this.setState({ selectedExpeditions: nextProps.processCreateStore.expedition_services.selectedExpeditions })
    this.setState({ selectedServices: nextProps.processCreateStore.expedition_services.selectedServices })
    if (nextProps.processCreateStore.expedition_services.selectedServices.length !== 0) {
      Router.push('/owner-information')
    }
    console.log('nextProps : ', nextProps.processCreateStore)
  }

  submitExpedition (e) {
    e.preventDefault()
    const { selectedServices, selectedExpeditions } = this.state
    const { postExpedition } = this.props
    const tempExpeditionServices = {
      selectedExpeditions: selectedExpeditions,
      selectedServices: selectedServices
    }
    let { notification } = this.state
    if (selectedServices.length !== 0) {
      postExpedition(tempExpeditionServices)
    } else {
      notification = {status: true, message: 'Ekspedisi pengiriman harus di isi !'}
      this.setState({ notification })
    }
  }

  render () {
    const { expeditions, selectedServices, selectedExpeditions, notification } = this.state
    return (
      <div>
        <Notification
          style={{position: 'fixed'}}
          type='is-danger'
          isShow={notification.status}
          activeClose
          onClose={() => this.setState({notification: {status: false, message: ''}})}
          message={notification.message}
          />
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
        <section>
          { expeditions.expeditions.map((expedition, index) => {
            let isSelectedExpedition = selectedExpeditions.filter((id) => {
              return id === expedition.id
            }).length > 0
            return (
              <section className='section is-paddingless' key={expedition.id}>
                <div className='filter-option active'>
                  <div className='sort-list check-all'>
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

                  <div className='sort-list check-list'>
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
          <div className='filter-option active'>
            <div className='sort-list check-all'>
              <label className='checkbox'>
                <span className='sort-text'>Pilih Semua</span>
                <span className='input-wrapper'>
                  <input type='checkbox' />
                </span>
              </label>
              <div className='eks-name'>
                <span>TIKI</span>
                <span><img src={Images.tiki} alt='' /></span>
              </div>
            </div>
            <div className='sort-list check-list'>
              <label className='checkbox' >
                <span className='sort-text'>TIKI ONS (Over Night Service)</span>
                <span className='input-wrapper'>
                  <input type='checkbox' />
                </span>
              </label>
              <label className='checkbox'>
                <span className='sort-text'>TIKI Reguler</span>
                <span className='input-wrapper'>
                  <input type='checkbox' />
                </span>
              </label>
              <label className='checkbox'>
                <span className='sort-text'>TIKI Ekonomi</span>
                <span className='input-wrapper'>
                  <input type='checkbox' />
                </span>
              </label>
              <label className='checkbox'>
                <span className='sort-text'>TIKI HDS</span>
                <span className='input-wrapper'>
                  <input type='checkbox' />
                </span>
              </label>
            </div>
          </div>
        </section>

        <section className='section is-paddingless'>
          <div className='payment-detail action'>
            <ul>
              <li>
                <a
                  className='button is-primary is-large is-fullwidth'
                  onClick={(e) => this.submitExpedition(e)}>
                  Lanjutkan
                </a>
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
    processCreateStore: state.processCreateStore,
    expeditions: state.expeditions
  }
}

const mapDispatchToProps = dispatch => ({
  postExpedition: (params) => dispatch(actionStoreTypes.shippingExpedition(params)),
  getExpedition: () => dispatch(actionExpeditionTypes.getExpedition())
})

export default connect(mapStateToProps, mapDispatchToProps)(ShippingExpedition)
