// @flow
import React, {Component} from 'react'
import dataSaga from '../saga/saga'
import { sagaMiddleware, store } from '../store'
import withRedux from 'next-redux-wrapper'
import GET_TOKEN from '../Services/GetToken'
import Content from '../Components/Content'
import LoginAlert from '../Components/LoginAlert'
import Localize from '../Utils/Localize'
import AppConfig from '../Config/AppConfig'
let clientTask = null
let token = null
export default function reduxWrapper (ReduxComponent) {
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

    constructor (props) {
      super(props)
      if (!clientTask) {
        clientTask = sagaMiddleware.run(dataSaga)
      }
      this.state = {
        token: 'default',
        mustLogin: false
      }
    }

    async componentWillMount () {
      token = await GET_TOKEN.getToken()
      this.setState({ token })
    }

    render () {
      let { token, mustLogin } = this.state
      let localize = Localize(AppConfig.languages)
      let notification = {
        type: 'is-danger',
        status: false,
        message: 'Error, default message.'
      }
      return (
        <Content>
          <LoginAlert
            show={mustLogin}
            localize={localize}
            close={() => this.setState({ mustLogin: !this.state.mustLogin })} />
          <ReduxComponent
            {...this.props}
            notification={notification}
            localize={localize}
            isLogin={!!token}
            alertLogin={() => this.setState({ mustLogin: true })} />
        </Content>
      )
    }
  }
  return withRedux(store)(ReduxContainer)
}
