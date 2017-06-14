// @flow
import React, {Component} from 'react'
import dataSaga from '../saga/saga'
import { sagaMiddleware, store } from '../store'
import withRedux from 'next-redux-wrapper'
// import {END} from 'redux-saga'

let clientTask = null

export default function reduxWrapper (ReduxComponent:Object) {
  class ReduxContainer extends Component {
    static async getInitialProps ({ req, isServer, query }) {
      if (isServer) {
        // /const rootTask = sagaMiddleware.run(dataSaga)
        sagaMiddleware.run(dataSaga)
        return {query}
      } else {
        return {query}
      }
    }

    constructor (props:any) {
      super(props)
      if (!clientTask) {
        clientTask = sagaMiddleware.run(dataSaga)
      }
    }

    render () {
      return (
        <ReduxComponent {...this.props} />
      )
    }
  }
  return withRedux(store)(ReduxContainer)
}
