import React, { Component } from 'react'
import { connect } from 'react-redux'

class TransactionDetail extends Component {
  // constructor (props) {
  //   super(props)
  // }

  render () {
    return (
      <h1>TransactionDetail</h1>
    )
  }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = (dispatch) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(TransactionDetail)
