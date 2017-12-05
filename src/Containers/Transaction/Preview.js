import React, { Component } from 'react'
import { connect } from 'react-redux'
// import Router from 'next/router'

class Preview extends Component {
  constructor (props) {
    super(props)
    this.state = {
      cart: props.cart || null,
      notification: props.notification
    }
    this.submitting = { cart: false }
  }

  render () {
    return (
      <h1>Waiting for slicing...</h1>
    )
  }
}

const mapStateToProps = () => ({

})
const mapDispatchToProps = () => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(Preview)
