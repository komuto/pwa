import React, { Component } from 'react'
import { connect } from 'react-redux'

class Transaction extends Component {
  constructor (props) {
    super(props)
    this.state = {
      transaction: props.transaction || null
    }
  }

  render () {
    return (
      <h1>Transaction</h1>
    )
  }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = (dispatch) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(Transaction)
