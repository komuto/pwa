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
import * as handlingState from '../Services/Status'
let clientTask = null
export default function reduxWrapper (ReduxComponent) {
  class ReduxContainer extends Component {
    static async getInitialProps ({ req, isServer, query }) {
      console.log('req: ', req)
      let token = await GET_TOKEN.getToken()
      if (isServer) {
        // /const rootTask = sagaMiddleware.run(dataSaga)
        sagaMiddleware.run(dataSaga)
        return {query, token}
      } else {
        return {query, token}
      }
    }

    constructor (props) {
      super(props)
      if (!clientTask) {
        clientTask = sagaMiddleware.run(dataSaga)
      }
      this.state = {
        token: props.token,
        mustLogin: false
      }
    }

    async componentDidMount () {
      if (!this.state.token) {
        let token = await GET_TOKEN.getToken()
        this.setState({ token })
      }
    }

    render () {
      let { token, mustLogin } = this.state
      let localize = Localize(AppConfig.languages)
      let notification = {
        type: 'is-danger',
        status: false,
        message: 'Error, default message.'
      }

      console.log(this.props)

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
            alertLogin={() => this.setState({ mustLogin: true })} />
        </Content>
      )
    }
  }
  return withRedux(store)(ReduxContainer)
}
