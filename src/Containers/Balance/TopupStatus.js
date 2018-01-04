/**
 * Safei Muslim
 * Yogyakarta , 3 Oktober 2017
 * PT Skyshi Digital Indonesa
 */

/** including dependencies */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import _ from 'lodash'
import NProgress from 'nprogress'
import InfiniteScroll from 'react-infinite-scroller'
/** including component */
import Content from '../../Components/Content'
import Section from '../../Components/Section'
import Notification from '../../Components/Notification'
import Loading from '../../Components/Loading'
/** including actions */
import * as saldoActions from '../../actions/saldo'
/** including custom lib */
import RupiahFormat from '../../Lib/RupiahFormat'

class TopupStatus extends Component {
  constructor (props) {
    super(props)
    /** define state */
    this.state = {
      hasMore: false,
      topupStatus: null,
      notification: props.notification,
      params: {
        page: 1,
        limit: 10
      }
    }
    /** define submitting status, status when they call or not [TRUE, FALSE] */
    this.submitting = {
      topupStatus: false
    }
    /** setup moment localize to id */
    moment.locale('id')
  }

  render () {
    const { topupStatus, notification } = this.state
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
          (topupStatus && isFound(topupStatus)) &&
          <TopupContent
            {...this.state}
            handleLoadMore={() => this.handleLoadMore()} />
        }
      </Content>
    )
  }

  /** load more history */
  handleLoadMore () {
    if (!this.submitting.topupStatus) {
      let { params } = this.state
      params.page += 1
      this.submitting = { ...this.submitting, topupStatus: true }
      this.props.getTopupStatus(this.state.params)
      this.setState({ params })
    }
  }

  componentDidMount () {
    /** set submitting topupStatus true then call get topupStatus api */
    NProgress.start()
    this.submitting = { ...this.submitting, topupStatus: true }
    this.props.getTopupStatus(this.state.params)
  }

  componentWillReceiveProps (nextProps) {
    const { topupStatus } = nextProps
    const { isFetching, isError, isFound, notifError } = this.props

    /**
     * handling state get topupStatus,
     * only when fetching is FALSE and submitting TRUE
     */
    if (!isFetching(topupStatus) && this.submitting.topupStatus) {
      NProgress.done()
      this.submitting = { ...this.submitting, topupStatus: false }
      if (isError(topupStatus)) {
        this.setState({ notification: notifError(topupStatus.message) })
      }
      if (isFound(topupStatus)) {
        let hasMore = topupStatus.statuses.length >= 9
        if (this.state.topupStatus) {
          let statuses = topupStatus.statuses
          topupStatus.statuses = this.state.topupStatus.statuses.concat(statuses)
        }
        this.setState({ topupStatus, hasMore })
      }
    }
  }
}

/** content from this component */
const TopupContent = ({ topupStatus, handleLoadMore, hasMore }) => {
  return (
    <Section>
      <WrapperList>
        <InfiniteScroll
          pageStart={0}
          loadMore={_.debounce(handleLoadMore, 250)}
          hasMore={hasMore}
          loader={<Loading size={12} color='#ef5656' className='is-fullwidth has-text-centered' />}>
          {
            topupStatus.statuses.map((status, index) => {
              return <List key={index} {...status} />
            })
          }
        </InfiniteScroll>
      </WrapperList>
    </Section>
  )
}

/** list of topupContent content */
const List = ({ amount, created_at, status }) => {
  let createDate = moment.unix(created_at).format('Do MMM YY')
  let statusTopup = [<Waiting />, <Success />, <Failed />][status]
  return (
    <li>
      <div className='columns is-mobile is-multiline no-margin-bottom'>
        <div className='column'>
          <div className=''>
            <span>{createDate}</span>
          </div>
        </div>
        <div className='column'>
          <div className='has-text-centered'>
            <strong>Rp {RupiahFormat(amount)}</strong>
          </div>
        </div>
        <div className='column'>
          <div className='has-text-right'>
            {statusTopup}
          </div>
        </div>
      </div>
    </li>
  )
}

/** function get state from redux */
const mapStateToProps = (state) => ({
  topupStatus: state.topupStatus
})

/** function get actions from redux */
const mapDispatchToPtops = (dispatch) => ({
  getTopupStatus: (params) => dispatch(saldoActions.getTopupStatus(params))
})

/** list wrapper */
export const WrapperList = (props) => <ul className='status-saldo-list'>{ props.children }</ul>
/** waiting status */
export const Waiting = () => <strong className='text-waiting'><span className='icon-waiting-saldo' />Menunggu</strong>
/**  success status */
export const Success = () => <strong className='text-green'><span className='icon-success-saldo' />Sukses</strong>
/** failed status */
export const Failed = () => <strong className='text-red'><span className='icon-failed-saldo' />Gagal</strong>
/** connecting componet with redux */
export default connect(mapStateToProps, mapDispatchToPtops)(TopupStatus)
