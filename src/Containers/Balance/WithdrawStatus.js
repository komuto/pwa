/**
 * Safei Muslim
 * Yogyakarta , 3 Oktober 2017
 * PT Skyshi Digital Indonesa
 */

/** including dependencies */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
/** including component */
import Content from '../../Components/Content'
import Notification from '../../Components/Notification'
import { Waiting, Success, Failed } from './TopupStatus'
/** including actions */
import * as saldoActions from '../../actions/saldo'
/** including custom lib */
import RupiahFormat from '../../Lib/RupiahFormat'

class WithdrawStatus extends Component {
  constructor (props) {
    super(props)
    /** define state */
    this.state = {
      withdrawStatus: props.withdrawStatus || null,
      notification: props.notification
    }
    /** define submitting status, status when they call or not [TRUE, FALSE] */
    this.submitting = {
      withdrawStatus: false
    }
    /** setup moment localize to id */
    moment.locale('id')
  }

  render () {
    const { withdrawStatus, notification } = this.state
    const { isFound } = this.props

    console.log(withdrawStatus)
    return (
      <Content>
        <Notification
          type='is-danger'
          isShow={notification.status}
          activeClose
          onClose={() => this.setState({notification: {status: false, message: ''}})}
          message={notification.message} />
        { isFound(withdrawStatus) && <WithdrawContent {...this.state} /> }
      </Content>
    )
  }

  componentDidMount () {
    /** set submitting withdrawStatus true then call get withdrawStatus api */
    this.submitting = { ...this.submitting, withdrawStatus: true }
    this.props.getWithdrawStatus({})
  }

  componentWillReceiveProps (nextProps) {
    const { withdrawStatus } = nextProps
    const { isFetching, isError, isFound, notifError } = this.props

    /**
     * handling state get withdrawStatus,
     * only when fetching is FALSE and submitting TRUE
     */
    if (!isFetching(withdrawStatus) && this.submitting.withdrawStatus) {
      this.submitting = { ...this.submitting, withdrawStatus: false }
      if (isError(withdrawStatus)) {
        this.setState({ notification: notifError(withdrawStatus.message) })
      }
      if (isFound(withdrawStatus)) {
        this.setState({ withdrawStatus })
      }
    }
  }
}

/** content from this component */
const WithdrawContent = ({ withdrawStatus }) => {
  return (
    <Content>
      {
        withdrawStatus.statuses.map((s, i) => {
          let createDate = moment.unix(s.created_at).format('Do MMMM YY')
          let statusTopup = [<Waiting />, <Success />, <Failed />][s.status]
          return (
            <section key={i} className='section is-paddingless has-shadow xs-margin-top'>
              <div className='payment-detail saldo-history'>
                <ul>
                  <li>
                    <div className='columns is-mobile is-multiline no-margin-bottom'>
                      <div className='column'>
                        <div className='label-text is-left'>
                          <span>{`${s.bank_account.bank.name}-${s.bank_account.holder_account_number}`}</span>
                        </div>
                      </div>
                      <div className='column'>
                        <div className='is-left has-text-right'>
                          <strong>+Rp { RupiahFormat(s.amount) } </strong>
                        </div>
                      </div>
                    </div>
                    <div className='invoice-saldo pull-status'>
                      <div className='columns is-mobile is-multiline no-margin-bottom'>
                        <div className='column'>
                          <div className='is-left'>
                            <span>{createDate}</span>
                          </div>
                        </div>
                        <div className='column'>
                          <div className='has-text-right'>
                            { statusTopup }
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </section>
          )
        })
      }
    </Content>
  )
}

/** function get state from redux */
const mapStateToProps = (state) => ({
  withdrawStatus: state.withdrawStatus
})

/** function get actions from redux */
const mapDispatchToPtops = (dispatch) => ({
  getWithdrawStatus: (params) => dispatch(saldoActions.getWithdrawStatus(params))
})

/** connecting componet with redux */
export default connect(mapStateToProps, mapDispatchToPtops)(WithdrawStatus)
