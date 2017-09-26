import React, { Component } from 'react'
import Router from 'next/router'
// component
import Content from '../Components/Content'
import Notification from '../Components/Notification'
import Loading from '../Components/Loading'

class PaymentForMobile extends Component {
  constructor (props) {
    super(props)
    this.state = {
      token: props.query.token || null,
      isLoading: false,
      notification: {
        type: 'is-danger',
        status: false,
        message: 'Error, default message.'
      }
    }
  }

  loadMidtrans () {
    const { token } = this.state
    if (!token) {
      this.setState({ notification: {type: 'is-danger', status: true, message: 'Midtrans token invalid!'} })
    } else {
      snap.pay(token, {
        onSuccess: (result) => {
          Router.push('/payment-mobile?type=success')
        },
        onPending: (result) => {
          Router.push('/payment-mobile?type=pending')
        },
        onError: (result) => {
          Router.push('/payment-mobile?type=error')
        },
        onClose: () => {
          Router.push('/payment-mobile?type=close')
        }
      })
    }
  }

  componentDidMount () {
    this.loadMidtrans()
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

export default PaymentForMobile
