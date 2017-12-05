import React, { Component } from 'react'
import { connect } from 'react-redux'
// import Router from 'next/router'
import NProgress from 'nprogress'
// actions
import * as cartActions from '../../actions/cart'
// components
// import Notification from '../../Components/Notification'

class Preview extends Component {
  constructor (props) {
    super(props)
    this.state = {
      cart: props.cart || null,
      notification: props.notification
    }
    this.submitting = { cart: false }
  }

  componentDidMount () {
    NProgress.start()
    this.submitting = { ...this.submitting, cart: true }
    this.props.getCart()
  }

  componentWillReceiveProps (nextProps) {
    const { cart } = nextProps
    const { isFetching, isError, isFound, notifError } = this.props
    // state cart
    if (!isFetching(cart) && this.submitting.cart) {
      NProgress.done()
      this.submitting = { ...this.submitting, cart: false }
      if (isError(cart)) {
        this.setState({ notification: notifError(cart.message) })
      }
      if (isFound(cart)) {
        this.setState({ cart })
      }
    }
  }

  render () {
    const { cart } = this.state
    console.log('cart: ', cart)
    return (
      <h1>Waiting for slicing...</h1>
    )
  }
}

const mapStateToProps = (state) => ({
  cart: state.cart
})
const mapDispatchToProps = (dispatch) => ({
  getCart: () => dispatch(cartActions.getCart())
})

export default connect(mapStateToProps, mapDispatchToProps)(Preview)
