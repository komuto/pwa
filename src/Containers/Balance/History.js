/**
 * Safei Muslim
 * Yogyakarta , 4 Oktober 2017
 * PT Skyshi Digital Indonesa
 */

/** including dependencies */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import _ from 'lodash'
import Router from 'next/router'
import NProgress from 'nprogress'
import InfiniteScroll from 'react-infinite-scroller'
/** including component */
import Content from '../../Components/Content'
import Notification from '../../Components/Notification'
import Loading from '../../Components/Loading'
import DatePicker from '../../Components/DatePicker'
import { Navbar } from '../Navbar'
/** including actions */
import * as saldoActions from '../../actions/saldo'
/** including custom lib */
import RupiahFormat from '../../Lib/RupiahFormat'

class History extends Component {
  constructor (props) {
    super(props)
    /** define state */
    this.state = {
      saldoHistory: null,
      hasMore: true,
      datepicker: {
        isActive: false,
        date: new Date(),
        selected: null // start_at, end_at
      },
      filter: {
        isActive: false
      },
      params: {
        page: 1,
        limit: 10,
        filter: []
      },
      notification: props.notification
    }
    /** define submitting status, status when they call or not [TRUE, FALSE] */
    this.submitting = {
      saldoHistory: false,
      isFilter: false
    }

    /** setup moment localize to id */
    moment.locale('id')
  }

  render () {
    const { saldoHistory, notification } = this.state
    const { isFound } = this.props
    let params = {
      navbar: {
        searchBoox: false,
        path: '/',
        callBack: () => Router.push('/balance'),
        textPath: 'Riwayat Saldo',
        filterBalance: {
          show: true,
          value: this.state.params.filter.length,
          press: (e) => this.filterPress(e)
        }
      }
    }

    return (
      <Content>
        <Navbar {...params} />
        <Notification
          type='is-danger'
          isShow={notification.status}
          activeClose
          onClose={() => this.setState({notification: {status: false, message: ''}})}
          message={notification.message} />
        { (saldoHistory && isFound(saldoHistory)) &&
          <HistoryContent
            {...this.state}
            submitting={this.submitting}
            handleLoadMore={() => this.handleLoadMore()}
            summTransSelected={(e, type) => this.summTransSelected(e, type)}
            datePickerPress={(e, selected) => this.datePickerPress(e, selected)}
            filterPress={(e) => this.filterPress(e)}
            submitPress={() => this.submitPress()} />
        }
        {
          this.state.datepicker.isActive &&
          <DatePicker
            {...this.state.datepicker}
            datePickerPress={(e, selected) => this.datePickerPress(e, selected)}
            selectedDatePicker={(date) => this.selectedDatePicker(date)} />
        }
      </Content>
    )
  }

  componentDidMount () {
    /** set submitting balance true then call get balance api */
    this.submitting = { ...this.submitting, saldoHistory: true }
    NProgress.start()
    this.props.getSaldoHistory({})
  }

  componentWillReceiveProps (nextProps) {
    const { saldoHistory } = nextProps
    const { isFetching, isError, isFound, notifError } = this.props
    /**
     * handling state get balance,
     * only when fetching is FALSE and submitting TRUE
     */
    if (!isFetching(saldoHistory) && this.submitting.saldoHistory) {
      NProgress.done()
      this.submitting = { ...this.submitting, saldoHistory: false }
      if (isError(saldoHistory)) {
        this.setState({ notification: notifError(saldoHistory.message) })
      }
      if (isFound(saldoHistory)) {
        // handling when user press filter
        if (this.submitting.isFilter) {
          this.submitting = { ...this.submitting, isFilter: false }
          this.setState({
            saldoHistory,
            filter: { ...this.state.filter, isActive: false },
            hasMore: saldoHistory.history.length >= this.state.params.limit
          })
        } else {
          // handling when user press pagination / default
          let history = null
          if (this.state.saldoHistory) {
            history = saldoHistory.history.concat(this.state.saldoHistory.history)
          } else {
            history = saldoHistory.history
          }
          this.setState({
            saldoHistory: { ...saldoHistory, history },
            hasMore: saldoHistory.history.length >= this.state.params.limit
          })
        }
      }
    }
  }

  submitPress () {
    this.submitting = { ...this.submitting, saldoHistory: true, isFilter: true }
    this.props.getSaldoHistory({...this.state.params, page: 1})
  }

  /** load more history */
  handleLoadMore () {
    if (!this.submitting.saldoHistory) {
      let { params } = this.state
      params.page += 1
      this.submitting = { ...this.submitting, saldoHistory: true }
      this.props.getSaldoHistory(this.state.params)
      this.setState({ params })
    }
  }

  /** filter press */
  filterPress (e) {
    if (!e.target.className.includes('sortButton')) return
    this.setState({
      filter: {
        ...this.state.filter,
        isActive: !this.state.filter.isActive
      }
    })
  }

  /** datepicker press */
  datePickerPress (e, selected) {
    e.preventDefault()
    this.setState({
      datepicker: {
        ...this.state.datepicker,
        isActive: !this.state.datepicker.isActive,
        selected
      }
    })
  }

  /** summary transaction selected */
  summTransSelected (e, type) {
    e.preventDefault()
    let { params } = this.state
    if (this.isSummTransSelected(type)) {
      params.filter = this.removeSummTransSelected(type)
    } else {
      params.filter.push(type)
    }
    this.setState({ params })
  }

  /** check trans type is selected */
  isSummTransSelected (type) {
    return _.includes(this.state.params.filter, type)
  }

  /** remove selected params filter */
  removeSummTransSelected (type) {
    return _.without(this.state.params.filter, type)
  }

  /** selected date from datepicker */
  selectedDatePicker (date) {
    // formating date to timestamp
    let formatingDate = moment(date).format('YYYYMMDD')
    let timestampDate = moment(formatingDate).unix()
    // set state params start_at/end_at
    let { datepicker, params } = this.state
    params[datepicker.selected] = timestampDate
    // set state
    this.setState({
      params,
      datepicker: { ...this.state.datepicker, isActive: false, date }
    })
  }
}

/** histoty content */
const HistoryContent = ({ params, saldoHistory, submitting, handleLoadMore, hasMore, filter, summTransSelected, datePickerPress, filterPress, submitPress }) => {
  return (
    <Content>
      <InfiniteScroll
        pageStart={0}
        loadMore={_.debounce(handleLoadMore, 250)}
        hasMore={hasMore}
        loader={<Loading size={12} color='#ef5656' className='is-fullwidth has-text-centered' />}>
        {
        saldoHistory.history.map((history, index) => {
          return <List key={index} {...history} transType={history.trans_type} />
        })
      }
      </InfiniteScroll>
      <FilterContent
        params={params}
        filter={filter}
        submitting={submitting}
        summTransSelected={(e, type) => summTransSelected(e, type)}
        datePickerPress={(e, selected) => datePickerPress(e, selected)}
        filterPress={(e) => filterPress(e)}
        submitPress={() => submitPress()} />
    </Content>
  )
}

const FilterContent = ({ params, filter, submitting, summTransSelected, datePickerPress, filterPress, submitPress }) => {
  let startAt = getStartAt(params)
  let endAt = getEndAt(params)
  return (
    <div className='sort-option sortButton' onClick={(e) => filterPress(e)} style={{ display: filter.isActive ? 'block' : 'none' }}>
      <div className='sort-list edit-data-delivery edit sortButton'>
        <form className='form edit'>
          <div className='filter-option active '>
            <div className='sort-list check-list middle item-select'>
              <div className='field'>
                <label className='label'>Jenis Mutasi Saldo</label>
                {
                SummTransTypeMessage.map((type, index) => {
                  let IndexOfSummTransTypeMessage = SummTransTypeMessage.indexOf(type)
                  let value = SummTransTypeEndPointFormat[IndexOfSummTransTypeMessage]
                  let isSelected = _.includes(params.filter, value)
                  return (
                    <label key={index} onClick={(e) => summTransSelected(e, value)} className='checkbox'>
                      <span className={`input-wrapper ${isSelected && 'checked'}`}>
                        <input type='checkbox' />
                      </span>
                      <strong>{ type }</strong>
                    </label>
                  )
                })
              }
              </div>
              <div className='field' onClick={(e) => datePickerPress(e, 'start_at')}>
                <label className='label'>Tanggal Awal</label>
                <p className='control detail-address'>
                  <span className='location-label js-option'>{ startAt }</span>
                </p>
              </div>
              <div className='field' onClick={(e) => datePickerPress(e, 'end_at')}>
                <label className='label'>Tanggal Akhir</label>
                <p className='control detail-address'>
                  <span className='location-label js-option'>{ endAt }</span>
                </p>
              </div>
              <div className='field' onClick={() => !submitting.saldoHistory && submitPress()}>
                <a className={`button is-primary is-large is-fullwidth ${submitting.saldoHistory && 'is-loading'}`}>Terapkan Filter</a>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

/** List of history content */
const List = ({id, amount, last_saldo, date, transType}) => {
  let IndexOfSummTransType = SummTransType.indexOf(transType)
  let TransTypeMessage = SummTransTypeMessage[IndexOfSummTransType]
  let TransDate = moment.unix(date).format('Do MMM YY')
  let Amount = isDecreasses(transType) ? <BalanceDecreases amount={amount} /> : <BalanceIncreases amount={amount} />
  return (
    <section onClick={() =>
      Router.push(
        `/balance?type=history&status=detail&id=${id}&transType=${transType}`,
        `/balance/history/detail/${id}/${transType}`
      )} className='section is-paddingless has-shadow xs-margin-top'>
      <div className='payment-detail saldo-history'>
        <ul>
          <li>
            <div className='columns is-mobile is-multiline no-margin-bottom'>
              <div className='column'>
                <div className='label-text is-left'>
                  <span>{ TransTypeMessage } </span>
                </div>
              </div>
              <div className='column'>
                <div className='is-left has-text-right'>
                  { Amount }
                  <span className='icon-arrow-right' />
                </div>
              </div>
            </div>
            <div className='invoice-saldo'>
              <div className='columns is-mobile is-multiline no-margin-bottom'>
                <div className='column'>
                  <div className='is-left'>
                    <span>{ TransDate }</span>
                  </div>
                </div>
              </div>
              <div className='columns is-mobile is-multiline no-margin-bottom'>
                <div className='column'>
                  <div className='is-left'>
                    <span>Sisa Saldo: Rp { RupiahFormat(last_saldo) }</span>
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </section>
  )
}

/** generate start at date */
const getStartAt = (params) => { return (params.start_at) ? dateFormatID(params.start_at) : 'Pilih Tanggal' }

/** generate end date */
const getEndAt = (params) => { return (params.end_at) ? dateFormatID(params.end_at) : 'Pilih Tanggal' }

/** format indonesian date */
const dateFormatID = (date) => { return moment.unix(date).format('Do MMM YYYY') }
// const dateFormatID = (date) => { return moment.unix(date).format('dddd[,] Do MMMM YYYY') }

/** is trans decreasses or incresses ?  */
const isDecreasses = (transType) => { return transType === 'PAID' || transType === 'WTHD' }

/** trans decreasses content  */
export const BalanceDecreases = ({amount}) => <strong className='text-red'>-Rp { RupiahFormat(amount) } </strong>

/** trans incresses content  */
export const BalanceIncreases = ({amount}) => <strong className='text-green'>+Rp { RupiahFormat(amount) } </strong>

/** summary transaction type
 * PAYMENT: 'PAID',
 * REFUND: 'RFND',
 * SELLING: 'SELL',
 * FEE: 'SFEE',
 * TOPUP: 'TPUP',
 * WITHDRAW: 'WTHD',
 */
export const SummTransType = ['SFEE', 'SELL', 'RFND', 'TPUP', 'PAID', 'WTHD']
/** summary transaction type for end point format */
export const SummTransTypeEndPointFormat = ['commission', 'sale', 'refund', 'topup', 'buy', 'withdraw']
/** summary transaction type message */
export const SummTransTypeMessage = ['Komisi Reseller', 'Dana Penjualan Barang', 'Dana Refund Barang', 'Top Up Saldo', 'Pembelian Barang', 'Penarikan Saldo']
/** function get state from redux */
const mapStateToProps = (state) => ({
  saldoHistory: state.saldoHistory
})

/** function get actions from redux */
const mapDispatchToPtops = (dispatch) => ({
  getSaldoHistory: (params) => dispatch(saldoActions.getSaldoHistory(params))
})

/** connecting componet with redux */
export default connect(mapStateToProps, mapDispatchToPtops)(History)
