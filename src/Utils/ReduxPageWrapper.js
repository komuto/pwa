// @flow
import React, {Component} from 'react'
import initStore from '../Redux'
import rootSaga from '../Sagas'
import { sagaMiddleware } from '../Redux/CreateStore'
import BannerActions from '../Redux/BannerRedux'
import withRedux from 'next-redux-wrapper'
import {END} from 'redux-saga'

let clientTask = null

export default function reduxWrapper (ReduxComponent:Object) {
  class ReduxContainer extends Component {
    static async getInitialProps ({ store, req, isServer, query }) {
      if (isServer) {
        const rootTask = sagaMiddleware.run(rootSaga)
        // dispatch server sagas here
        store.dispatch(BannerActions.bannerServer())
        store.dispatch(END)
        await rootTask.done.then(() => {
          return
        })
        return {query}
      } else {
        return {query}
      }
    }

    constructor (props:any) {
      super(props)
      if (!clientTask) {
        clientTask = sagaMiddleware.run(rootSaga)
      }
    }

    render () {
      return (
        <ReduxComponent {...this.props} />
      )
    }
  }
  return withRedux(initStore)(ReduxContainer)
}
