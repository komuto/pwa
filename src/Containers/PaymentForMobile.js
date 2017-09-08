import React, { Component } from 'react'
import { connect } from 'react-redux'
import Router from 'next/router'
// component
import Content from '../Components/Content'
import Notification from '../Components/Notification'
import Loading from '../Components/Loading'
// actions
import * as paymentActions from '../actions/payment'
// services
import { Status } from '../Services/Status'

class PaymentForMobile extends Component {
  constructor (props) {
    super(props)
    this.state = {
      token: props.query.token || null,
      snapTokenForMobile: props.snapTokenForMobile || null,
      isLoading: true,
      notification: {
        type: 'is-danger',
        status: false,
        message: 'Error, default message.'
      }
    }
  }

  async componentWillMount () {
    const { token } = this.state
    await this.props.getMidtransTokenForMobile({ token })
  }

  componentWillReceiveProps (nextProps) {
    const { snapTokenForMobile } = nextProps
    let { notification } = this.state
    notification = {status: false, message: 'Error, default message.'}
    if (!snapTokenForMobile.isLoading) {
      switch (snapTokenForMobile.status) {
        case Status.SUCCESS :
          if (!snapTokenForMobile.isFound) {
            notification = {type: 'is-danger', status: true, message: 'Token tidak ditemukan'}
          } else {
            snap.pay(snapTokenForMobile.token, {
              onSuccess: (result) => {
                // console.log('success')
                // console.log(result)
                Router.push('/payment-mobile-success')
              },
              onPending: (result) => {
                // console.log('pending')
                // console.log(result)
                Router.push('/payment-mobile-pending')
              },
              onError: (result) => {
                // console.log('error')
                // console.log(result)
                Router.push('/payment-mobile-error')
              },
              onClose: () => {
                // console.log('customer closed the popup without finishing the payment')
                Router.push('/payment-mobile-close')
              }
            })
          }
          break
        case Status.OFFLINE :
        case Status.FAILED :
        case Status.UNAUTHORIZED :
          notification = {type: 'is-danger', status: true, message: snapTokenForMobile.message}
          break
        default:
          break
      }
      this.setState({ snapTokenForMobile, notification, isLoading: false })
    }
  }

  render () {
    const { isLoading, notification } = this.state
    return (
      <Content>
        <Notification
          type='is-danger'
          isShow={notification.status}
          activeClose
          onClose={() => this.setState({notification: {status: false, message: ''}})}
          message={notification.message} />
        {
            isLoading &&
            <div style={{ margin: 20 }}>
              <Loading size={20} type='ovals' color='#ef5656' className='is-fullwidth has-text-centered' />
            </div>

          }
      </Content>
    )
  }
}

const mapStateToProps = (state) => ({
  snapTokenForMobile: state.snapToken2
})

const mapDispatchToProps = (dispatch) => ({
  getMidtransTokenForMobile: (params) => dispatch(paymentActions.getMidtransToken2(params))
})

export default connect(mapStateToProps, mapDispatchToProps)(PaymentForMobile)
