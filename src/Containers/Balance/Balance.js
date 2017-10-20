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
import Card, { WrapperList } from '../../Components/Card'
import CardList from '../../Components/CardList'
import Notification from '../../Components/Notification'
/** including actions */
import * as userActions from '../../actions/user'
/** including custom lib */
import RupiahFormat from '../../Lib/RupiahFormat'

class Balance extends Component {
  constructor (props) {
    super(props)
    /** define state */
    this.state = {
      balance: props.balance || null,
      notification: props.notification
    }
    /** define submitting status, status when they call or not [TRUE, FALSE] */
    this.submitting = {
      balance: false
    }
  }

  render () {
    const { balance, notification } = this.state
    const { isFound } = this.props
    return (
      <Content>
        { isFound(balance) && <BalancePanel {...this.state} /> }
        <Notification
          type='is-danger'
          isShow={notification.status}
          activeClose
          onClose={() => this.setState({notification: {status: false, message: ''}})}
          message={notification.message} />
        { isFound(balance) && <BalanceContent {...this.state} /> }
      </Content>
    )
  }

  componentDidMount () {
    /** set submitting balance true then call get balance api */
    this.submitting = { ...this.submitting, balance: true }
    this.props.getBalance()
  }

  componentWillReceiveProps (nextProps) {
    const { balance } = nextProps
    const { isFetching, isError, isFound, notifError } = this.props

    /**
     * handling state get balance,
     * only when fetching is FALSE and submitting TRUE
     */
    if (!isFetching(balance) && this.submitting.balance) {
      this.submitting = { ...this.submitting, balance: false }
      if (isError(balance)) {
        this.setState({ notification: notifError(balance.message) })
      }
      if (isFound(balance)) {
        this.setState({ balance })
      }
    }
  }
}

/** panel component from this component */
const BalancePanel = (props) => {
  const { balance } = props
  return (
    <div className='saldo-panel'>
      <p>Rp { RupiahFormat(balance.balance.user_balance) }</p>
    </div>
  )
}

/** content from this component */
const BalanceContent = (props) => {
  return (
    <Content>
      <Card title='Isi Ulang'>
        <WrapperList>
          <CardList className='icon-wallet-add' title='Isi Ulang Saldo' url='/balance?type=topup' as='/balance/topup' />
          <CardList className='icon-status-add' title='Status Pengisian' url='/balance?type=topup&status=history' as='/balance/topup/history' />
        </WrapperList>
      </Card>
      <Card title='Penarikan Saldo'>
        <WrapperList>
          <CardList className='icon-wallet-pull' title='Tarik Saldo' url='/balance?type=withdraw' as='/balance/withdraw' />
          <CardList className='icon-status-pull' title='Status Penarikan Saldo' url='/balance?type=withdraw&status=history' as='/balance/withdraw/history' />
        </WrapperList>
      </Card>
      <Card>
        <WrapperList>
          <CardList className='icon-history' title='History Saldo' url='/balance?type=history' as='/balance/history' />
        </WrapperList>
      </Card>
    </Content>
  )
}
/** function get state from redux */
const mapStateToProps = (state) => ({
  balance: state.balance
})

/** function get actions from redux */
const mapDispatchToProps = (dispatch) => ({
  getBalance: () => dispatch(userActions.getBalance())
})

/** connecting componet with redux */
export default connect(mapStateToProps, mapDispatchToProps)(Balance)
