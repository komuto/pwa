/**
 * Safei Muslim
 * Yogyakarta , 3 Oktober 2017
 * PT Skyshi Digital Indonesa
 */

/** including dependencies */
import React, { Component } from 'react'
import { connect } from 'react-redux'
/** including component */
import Content from '../../Components/Content'
import Section from '../../Components/Section'
import List from '../../Components/List'
import CategoriesWrap from '../../Components/CategoriesWrap'
import Notification from '../../Components/Notification'
/** including actions */
import * as saldoActions from '../../actions/saldo'
/** including custom lib */
import RupiahFormat from '../../Lib/RupiahFormat'
import Midtrans from '../../Lib/Midtrans'

class Topup extends Component {
  constructor (props) {
    super(props)
    /** define state */
    this.state = {
      nominals: props.nominals || null,
      notification: props.notification
    }
    /** define submitting status, status when they call or not [TRUE, FALSE] */
    this.submitting = {
      nominals: false,
      saldoToken: false
    }
  }

  render () {
    const { nominals, notification } = this.state
    const { isFound } = this.props
    return (
      <Content>
        <Notification
          type='is-danger'
          isShow={notification.status}
          activeClose
          onClose={() => this.setState({notification: {status: false, message: ''}})}
          message={notification.message} />
        { isFound(nominals) && <TopupContent {...this.state} getSaldoToken={(p) => this.getSaldoToken(p)} /> }
      </Content>
    )
  }

  componentDidMount () {
    /** set submitting nominals true then call get nominals api */
    this.submitting = { ...this.submitting, nominals: true }
    this.props.getNominals()
  }

  componentWillReceiveProps (nextProps) {
    const { nominals, saldoToken } = nextProps
    const { isFetching, isError, isFound, notifError } = this.props

    /** handling state get nominals */
    if (!isFetching(nominals) && this.submitting.nominals) {
      this.submitting = { ...this.submitting, nominals: false }
      if (isError(nominals)) {
        this.setState({ notification: notifError(nominals.message) })
      }
      if (isFound(nominals)) {
        this.setState({ nominals })
      }
    }

    /** handling state getSaldoToken */
    if (!isFetching(saldoToken) && this.submitting.saldoToken) {
      this.submitting = { ...this.submitting, saldoToken: false }
      if (isError(saldoToken)) {
        this.setState({ notification: notifError(saldoToken.message) })
      }
      if (isFound(saldoToken)) {
        Midtrans({...saldoToken, type: 'balance'})
        this.setState({ saldoToken })
      }
    }
  }

  /** get token for topup saldo */
  getSaldoToken ({ id }) {
    this.submitting = { ...this.submitting, saldoToken: true }
    this.props.getSaldoToken({ id, platform: 'pwa' })
  }
}

/** content from this component */
const TopupContent = ({ nominals, getSaldoToken }) => {
  return (
    <Section>
      <CategoriesWrap>
        {
        nominals.nominals.map((n, i) => {
          return <List onClick={() => getSaldoToken(n)} key={i} name={`Rp ${RupiahFormat(n.amount)}`} />
        })
      }
      </CategoriesWrap>
    </Section>
  )
}
/** function get state from redux */
const mapStateToProps = (state) => ({
  nominals: state.nominals,
  saldoToken: state.saldoToken
})

/** function get actions from redux */
const mapDispatchToPtops = (dispatch) => ({
  getNominals: () => dispatch(saldoActions.getNominals()),
  getSaldoToken: (params) => dispatch(saldoActions.getSaldoToken(params))
})

/** connecting componet with redux */
export default connect(mapStateToProps, mapDispatchToPtops)(Topup)
