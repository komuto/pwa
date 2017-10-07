/**
 * Safei Muslim
 * Yogyakarta , 7 Oktober 2017
 * PT Skyshi Digital Indonesa
 */

/** including dependencies */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import Nprogress from 'nprogress'
/** including container */
import { SummTransType, SummTransTypeMessage, BalanceDecreases, BalanceIncreases } from './History'
/** including component */
import Content from '../../Components/Content'
import Notification from '../../Components/Notification'
/** including actions */
import * as saldoActions from '../../actions/saldo'
/** including custom lib */
import RupiahFormat from '../../Lib/RupiahFormat'

class TransactionDetail extends Component {
  constructor (props) {
    super(props)
    this.state = {
      id: props.query.id,
      transType: props.query.transType,
      saldoHistoryDetail: props.saldoHistoryDetail || null,
      notification: props.notification
    }

    this.submitting = {
      saldoHistoryDetail: false
    }

    moment.locale('id')
  }

  render () {
    const { saldoHistoryDetail, notification } = this.state
    const { isFound } = this.props
    return (
      <Content>
        <Notification
          type='is-danger'
          isShow={notification.status}
          activeClose
          onClose={() => this.setState({notification: {status: false, message: ''}})}
          message={notification.message} />
        {
            isFound(saldoHistoryDetail) && <TransactionDetailContent {...this.state} />
          }
      </Content>
    )
  }

  componentDidMount () {
    let { id } = this.state
    Nprogress.start()
    this.submitting = { ...this.submitting, saldoHistoryDetail: true }
    this.props.getSaldoHistoryDetail({ id })
  }

  componentWillReceiveProps (nextProps) {
    const { saldoHistoryDetail } = nextProps
    const { isFetching, isError, isFound, notifError } = this.props
    /** handling state saldoHistoryDetail */
    if (!isFetching(saldoHistoryDetail) && this.submitting.saldoHistoryDetail) {
      Nprogress.done()
      console.log({saldoHistoryDetail})
      this.submitting = { ...this.submitting, saldoHistoryDetail: false }
      if (isError(saldoHistoryDetail)) {
        this.setState({ notification: notifError(saldoHistoryDetail.message) })
      }
      if (isFound(saldoHistoryDetail)) {
        this.setState({ saldoHistoryDetail })
      }
    }
  }
}

const TransactionDetailContent = ({ transType, saldoHistoryDetail }) => {
  let IndexOfSummTransType = SummTransType.indexOf(transType)
  let TransTypeMessage = SummTransTypeMessage[IndexOfSummTransType]
  let TransDate = null
  let isWithdraw = transType === SummTransType[5]
  let isTopup = transType === SummTransType[4]
  let amount = 0

  /** WTHD / withdraw transaction */
  if (isWithdraw) {
    TransDate = moment.unix(saldoHistoryDetail.historyDetail.transaction.date).format('dddd, Do MMMM YY')
    amount = saldoHistoryDetail.historyDetail.transaction.amount
  }

  /** TPUP / topup transaction */
  if (isTopup) {
    TransDate = moment.unix(saldoHistoryDetail.historyDetail.date).format('dddd, Do MMMM YY')
    amount = saldoHistoryDetail.historyDetail.amount
  }
  return (
    <Content>
      <section className='section is-paddingless has-shadow'>
        <div className='payment-detail margin-less'>
          <ul>
            <List title='Jenis Transaksi' data={TransTypeMessage} />
            <List title='Tanggal Transaksi' data={TransDate} />
            { isWithdraw && <List title='Jumlah Penarikan' data={<BalanceDecreases amount={amount} />} /> }
            { isWithdraw && <List title='Metode Pembayaran' data='Transfer Bank' /> }
            { isTopup && <List title='Jumlah Top-up Saldo' data={<BalanceIncreases amount={amount} />} /> }
            { isTopup && <List title='Metode Pembayaran' data={'null'} /> }
          </ul>
        </div>
      </section>
      { isWithdraw && <WithdrawInformation {...saldoHistoryDetail.historyDetail} />}
      { isTopup && <TopupInformation {...saldoHistoryDetail.historyDetail} />}
    </Content>
  )
}

const WithdrawInformation = ({ bankAccount }) => (
  <WrapperList title='Info Rekening Tujuan'>
    <List title='Bank' data={`Bank ${bankAccount.bank.name}`} />
    <List title='Nomor Rekening' data={bankAccount.holder_account_number} />
    <List title='Pemilik Akun' data={bankAccount.holder_name} />
  </WrapperList>
)

const TopupInformation = ({ amount }) => (
  <WrapperList title='Detail Pembayaran'>
    <List title='Harga saldo nominal' data={`null`} />
    <List title='Kode unik' data={`null`} />
    <List title='Total' data={`Rp ${RupiahFormat(amount)}`} />
  </WrapperList>
)

const WrapperList = ({ title, children }) => (
  <section className='section is-paddingless has-shadow sm-margin'>
    <div className='container is-fluid'>
      <div className='title'>
        <h3>{ title }</h3>
      </div>
    </div>
    <div className='payment-detail margin-less'>
      <ul>
        { children }
      </ul>
    </div>
  </section>
)

const List = ({ title, data }) => (
  <li>
    <div className='columns is-mobile is-multiline no-margin-bottom'>
      <div className='column is-one-third'>
        <div className='rating-content is-left'>
          <span className='semi-bold'>{ title }</span>
        </div>
      </div>
      <div className='column'>
        <div className='rating-content is-left has-text-right'>
          <span>
            {data}
          </span>
        </div>
      </div>
    </div>
  </li>
)

const mapStateToProps = (state) => ({
  saldoHistoryDetail: state.saldoHistoryDetail
})

const mapDispatchToProps = (dispatch) => ({
  getSaldoHistoryDetail: (params) => dispatch(saldoActions.getSaldoHistoryDetail(params))
})

export default connect(mapStateToProps, mapDispatchToProps)(TransactionDetail)
