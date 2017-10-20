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
import Router from 'next/router'
/** including container */
import { SummTransType, SummTransTypeMessage, BalanceDecreases, BalanceIncreases } from './History'
/** including component */
import Content from '../../Components/Content'
import Notification from '../../Components/Notification'
import MyImage from '../../Components/MyImage'
/** including actions */
import * as saldoActions from '../../actions/saldo'
/** including custom lib */
import RupiahFormat from '../../Lib/RupiahFormat'
import Promo from '../../Lib/Promo'

class TransactionDetail extends Component {
  constructor (props) {
    super(props)
    this.state = {
      id: props.query.id,
      transType: props.query.transType,
      saldoHistoryDetail: props.saldoHistoryDetail || null,
      balanceDetail: {
        active: false,
        show: () => this.balanceDetailShow()
      },
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
      this.submitting = { ...this.submitting, saldoHistoryDetail: false }
      if (isError(saldoHistoryDetail)) {
        this.setState({ notification: notifError(saldoHistoryDetail.message) })
      }
      if (isFound(saldoHistoryDetail)) {
        this.setState({ saldoHistoryDetail })
      }
    }
  }

  balanceDetailShow () {
    this.setState({ balanceDetail: { ...this.state.balanceDetail, active: !this.state.balanceDetail.active } })
  }
}

const TransactionDetailContent = ({ transType, saldoHistoryDetail, balanceDetail }) => {
  let IndexOfSummTransType = SummTransType.indexOf(transType)
  let TransTypeMessage = SummTransTypeMessage[IndexOfSummTransType]
  let TransDate = null
  let isPaid = transType === SummTransType[0]
  let isRefund = transType === SummTransType[1]
  // let isCommission = transType === SummTransType[3]
  let isTopup = transType === SummTransType[4]
  let isWithdraw = transType === SummTransType[5]
  let amount = 0
  let refundNumber = 0
  let balanceUsed = 0

  /** PAID / paid transaction  */
  if (isPaid) {
    TransDate = moment.unix(saldoHistoryDetail.historyDetail.transaction.date).format('dddd, Do MMMM YY')
    amount = saldoHistoryDetail.historyDetail.bucket.total_bill
    balanceUsed = saldoHistoryDetail.historyDetail.bucket.wallet
  }

  /** RFND / refund transaction  */
  if (isRefund) {
    TransDate = moment.unix(saldoHistoryDetail.historyDetail.transaction.date).format('dddd, Do MMMM YY')
    amount = saldoHistoryDetail.historyDetail.transaction.amount
    refundNumber = saldoHistoryDetail.historyDetail.refund.refund_number
  }

  /** TPUP / topup transaction */
  if (isTopup) {
    TransDate = moment.unix(saldoHistoryDetail.historyDetail.date).format('dddd, Do MMMM YY')
    amount = saldoHistoryDetail.historyDetail.amount
  }

  /** WTHD / withdraw transaction */
  if (isWithdraw) {
    TransDate = moment.unix(saldoHistoryDetail.historyDetail.transaction.date).format('dddd, Do MMMM YY')
    amount = saldoHistoryDetail.historyDetail.transaction.amount
  }

  return (
    <Content>
      <section className='section is-paddingless has-shadow'>
        <div className='payment-detail margin-less'>
          <ul>
            <List title='Jenis Transaksi' data={TransTypeMessage} />
            <List title='Tanggal Transaksi' data={TransDate} />
            {
              isPaid &&
              <WrapperList>
                <List
                  title='Total Tagihan'
                  data={`Rp ${RupiahFormat(amount)}`}
                  colapse={balanceDetail} />
                <ListDetail {...balanceDetail} {...saldoHistoryDetail.historyDetail} />
              </WrapperList>
            }
            { isWithdraw && <List title='Jumlah Penarikan' data={<BalanceDecreases amount={amount} />} /> }
            { isWithdraw && <List title='Metode Pembayaran' data='Transfer Bank' /> }
            { isTopup && <List title='Jumlah Top-up Saldo' data={<BalanceIncreases amount={amount} />} /> }
            { isTopup && <List title='Metode Pembayaran' data={'null'} /> }
            { isRefund && <List title='Uang Yang Anda Terima' data={<BalanceIncreases amount={amount} />} /> }
            { isRefund && <List title='Nomor Refund' data={refundNumber} /> }
          </ul>
        </div>
      </section>
      { isPaid && <WrapperList><List title='Saldo yang digunakan' data={`Rp ${RupiahFormat(balanceUsed)}`} /> </WrapperList> }
      { isPaid && <PaidInformation {...saldoHistoryDetail.historyDetail} />}
      { isWithdraw && <WithdrawInformation {...saldoHistoryDetail.historyDetail} />}
      { isTopup && <TopupInformation {...saldoHistoryDetail.historyDetail} />}
      { isRefund && <RefundInformation {...saldoHistoryDetail.historyDetail} /> }
    </Content>
  )
}

const PaidInformation = ({ orders }) => (
  <WrapperList title='Daftar barang yang di beli'>
    {
      orders.map((order, index) => {
        let lengthItem = order.items.length
        return (
          <section key={index} className='section is-paddingless has-shadow'>
            <div className='payment-detail step-pay'>
              <ul>
                <li>
                  <div className='columns is-mobile is-multiline no-margin-bottom'>
                    <div className='column'>
                      <div className='label-text is-left top-middle'>
                        <span>Sports Station</span>
                      </div>
                    </div>
                  </div>
                  {
                    order.items.map((item, index) => {
                      return (
                        <div key={index} onClick={() =>
                          Router.push(
                            `/product-detail?id=${item.product.id}`,
                            `/product-detail/${item.product.id}`
                          )} className='columns is-mobile is-multiline no-margin-bottom'>
                          <div className='column'>
                            <div className='box'>
                              <div className='media'>
                                {
                                  index < 4 &&
                                  <div className='media-left'>
                                    <figure className='image list-transaction sm'>
                                      <a><MyImage src={item.product.image} alt='Image' /></a>
                                    </figure>
                                  </div>
                                }
                                {
                                  index === 4 &&
                                  <div className='media-left'>
                                    <figure className='image list-transaction plus3'>
                                      <span>+{lengthItem - 5}</span>
                                      <a><MyImage src={item.product.image} alt='Image' /></a>
                                    </figure>
                                  </div>
                                }
                                {
                                  lengthItem < 3 &&
                                  <div className='media-content middle'>
                                    <div className='content'>
                                      <h4>{item.product.name}</h4>
                                      <div className='right-top'>
                                        <span className='icon-arrow-right' />
                                      </div>
                                    </div>
                                  </div>
                                }
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    })
                  }
                </li>
              </ul>
            </div>
          </section>
        )
      }

    )}
  </WrapperList>
)

const RefundInformation = ({ refund }) => (
  <WrapperList title='Daftar barang yang di refund'>
    { refund.items.map((item, index) => <LisProduct key={index} {...item} />) }
  </WrapperList>
)

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
    {
      title &&
      <div className='container is-fluid'>
        <div className='title'>
          <h3>{ title }</h3>
        </div>
      </div>
    }
    <div className='payment-detail margin-less'>
      <ul>
        { children }
      </ul>
    </div>
  </section>
)

const List = ({ title, data, colapse }) => (
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
          { colapse && <a onClick={() => colapse.show()} className='detail-collapsed'>Detail <span className={`icon-arrow-down blue ${colapse.active && 'top'}`} /></a> }
        </div>
      </div>
    </div>
  </li>
)

const LisProduct = (product) => (
  <li>
    <div className='columns is-mobile is-multiline no-margin-bottom'>
      <div className='column'>
        <div className='box'>
          <div className='media'>
            <div className='media-left'>
              <figure className='image list-transaction sm'>
                <a>
                  <MyImage src={product.product_image} alt='Image' />
                </a>
              </figure>
            </div>
            <div className='media-content middle'>
              <div className='content'>
                <h4>{product.product_name}</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </li>
)

const ListDetail = ({ active, bucket }) => {
  let totalPayment = bucket.total_bill
  let promoCode = '-'
  let pricePromo = 0

  if (bucket.promo) {
    promoCode = bucket.promo.promo_code
    pricePromo = Promo({ ...bucket, totalPayment })
  }
  return (
    <li className='collapsed' style={{ display: active ? 'block' : 'none' }}>
      <div className='payment-detail step-pay'>
        <ul className='detail-transaction'>
          <li>
            <ul className='total-pay'>
              <li>
                <div className='columns is-mobile is-multiline no-margin-bottom'>
                  <div className='column'>
                    <div className='label-text is-left'>
                      <span>
                          Total Belanja
                        </span>
                    </div>
                  </div>
                  <div className='column is-one-third'>
                    <div className='has-text-right'>
                      <span>Rp { RupiahFormat(totalPayment) }</span>
                    </div>
                  </div>
                </div>
                <div className='columns is-mobile is-multiline no-margin-bottom'>
                  <div className='column'>
                    <div className='label-text is-left'>
                      <span className='pay-code'>
                          Kode Voucher { promoCode }
                      </span>
                    </div>
                  </div>
                  <div className='column is-one-third'>
                    <div className='has-text-right'>
                      <span className='pay-code'> - Rp { RupiahFormat(pricePromo) }</span>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div className='columns is-mobile is-multiline no-margin-bottom'>
                  <div className='column'>
                    <div className='label-text is-left'>
                      <span>
                          Sisa Pembayaran
                        </span>
                    </div>
                  </div>
                  <div className='column is-one-third'>
                    <div className='has-text-right'>
                      <span>Rp {RupiahFormat(totalPayment - pricePromo)}</span>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </li>
  )
}

const mapStateToProps = (state) => ({
  saldoHistoryDetail: state.saldoHistoryDetail
})

const mapDispatchToProps = (dispatch) => ({
  getSaldoHistoryDetail: (params) => dispatch(saldoActions.getSaldoHistoryDetail(params))
})

export default connect(mapStateToProps, mapDispatchToProps)(TransactionDetail)
