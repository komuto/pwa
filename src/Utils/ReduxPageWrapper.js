// @flow
import React, {Component} from 'react'
import dataSaga from '../saga/saga'
import { sagaMiddleware, store } from '../store'
import withRedux from 'next-redux-wrapper'
import Raven from 'raven-js'
import * as otherActions from '../actions/other'
import GET_TOKEN from '../Services/GetToken'
import Content from '../Components/Content'
import LoginAlert from '../Components/LoginAlert'
import Localize from '../Utils/Localize'
import AppConfig from '../Config/AppConfig'
import * as handlingState from '../Services/Status'
import {END} from 'redux-saga'
let clientTask = null
export default function reduxWrapper (ReduxComponent) {
  class ReduxContainer extends Component {
    static async getInitialProps ({ store, req, isServer, query }) {
      if (req) {
        if (req.marketplace) {
          store.dispatch(otherActions.setMarketPlaceTemp(req.marketplace))
        }
      }
      if (isServer) {
        const rootTask = sagaMiddleware.run(dataSaga)
        store.dispatch(otherActions.resetMarketPlace())
        store.dispatch(otherActions.getMarketPlace())
        store.dispatch(END)

        await rootTask.done.then(() => {
          return null
        })

        return {query, isServer}
      } else {
        return {query}
      }
    }

    constructor (props) {
      super(props)
      if (!clientTask) {
        clientTask = sagaMiddleware.run(dataSaga)
      }
      this.state = {
        token: 'default',
        mustLogin: false,
        error: null
      }
      Raven.config(`https://${AppConfig.raven.secretKey}@sentry.io/${AppConfig.raven.id}`, {
        environment: 'production'
      }).install()
    }

    async componentDidMount () {
      if (this.state.token === 'default') {
        let token = await GET_TOKEN.getToken()
        this.setState({ token })
      }
    }

    componentDidCatch (error, errorInfo) {
      // this.setState({ error })
      Raven.captureException(error, { extra: errorInfo })
    }

    render () {
      let { token, mustLogin } = this.state
      let localize = Localize(AppConfig.languages)
      let notification = {
        type: 'is-danger',
        status: false,
        message: 'Error, default message.'
      }
      // this.props
      // console.log('this.props: ', this.props.marketplace)
      return (
        <Content>
          <LoginAlert
            show={mustLogin}
            localize={localize}
            close={() => this.setState({ mustLogin: !this.state.mustLogin })} />
          <ReduxComponent
            {...this.props}
            {...handlingState}
            notification={notification}
            localize={localize}
            isLogin={!!token}
            token={token}
            error={this.state.error}
            alertLogin={() => this.setState({ mustLogin: true })} />
        </Content>
      )
    }
  }
  return withRedux(store)(ReduxContainer)
}
