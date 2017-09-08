/**
 * Created by safei muslim
 * yogyakarta, 6 september 2017
 * HOC: High Order Component
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'

// https://stackoverflow.com/questions/40866308/react-redux-use-hoc-with-connected-component
// http://www.avitzurel.com/blog/2016/08/03/connected-higher-order-components-with-react-and-redux/

const Wrapper = (MyComponent) => {
  class BaseComponent extends Component {
    constructor (props) {
      super(props)
      this.state = {
        title: 'Wrapper HOC',
        user: props.user
      }
    }

    componentWillReceiveProps (nextProps) {
      const { user } = nextProps
      if (!user.isLoading) {
        this.setState({ user })
      }
    }

    render () {
      return <MyComponent />
    }
  }
  const mapStateToProps = (state) => ({
    user: state.user
  })

  const mapDispatchToProps = () => ({

  })

  return connect(mapStateToProps, mapDispatchToProps)(BaseComponent)
}

export default Wrapper
